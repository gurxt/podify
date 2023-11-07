import { IUser } from '#/util/types/user_types';
import User from '#/models/user_model';
import { RequestHandler, Response } from 'express';
import { generateToken } from '#/util/generate_token';
import { sendPasswordResetSuccessEmail, sendResetPasswordLink, sendVerificationMail } from '#/util/mail';
import { IVerifyEmail } from '#/util/types/verify_email_types';
import emailToken from '#/models/email_token_model';
import { isValidObjectId } from 'mongoose';
import passwordToken from '#/models/password_token_model';
import crypto from 'crypto';

export const createUser: RequestHandler = async (req: IUser, res: Response) => {
  const { email, password, name } = req.body;

  const user = await User.create({ email, password, name });

  const token = generateToken();
  emailToken.create({ owner: user._id, token });

  sendVerificationMail(token, { userId: user._id.toString(), email });

  res.status(201).json({ user: { id: user._id, name, email } });
}

export const verifyEmail: RequestHandler = async (req: IVerifyEmail, res: Response) => {
  const { token, userId } = req.body;
  const verificationToken = await emailToken.findOne({ owner: userId });

  if (!verificationToken) return res.status(403).json({ error: '[ERROR] invalid token.'});

  const matched = await verificationToken.compareToken(token);

  if (!matched) return res.status(403).json({ error: "[ERROR] Token does not match."});

  await User.findByIdAndUpdate(userId, { verified: true });

  await emailToken.findByIdAndDelete(verificationToken._id);

  res.json({ message: "[INFO] your email is verified."});
}

export const reverifyEmail: RequestHandler = async (req: IVerifyEmail, res: Response) => {
  const { userId } = req.body;

  if (!isValidObjectId(userId)) return res.status(403).json({ "error": "invalid request."});

  await emailToken.findOneAndDelete({ owner: userId });

  const user = await User.findById(userId);
  if (!user) return res.status(403).json({ "error": "invalid request."});

  const token = generateToken();
  sendVerificationMail(token, { 
    email: user.email,
    userId: user._id.toString(),
  });

  res.json({ message: "Token sent! Please check your mail."})
}

export const forgetPassword: RequestHandler = async (req, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(403).json({ error: "Account not found!"});

  await passwordToken.findOneAndDelete({ owner: user._id });

  const token = crypto.randomBytes(36).toString('hex');

  await passwordToken.create({ owner: user._id, token });

  const resetLink = 
    `${process.env.PASSWORD_RESET_LINK}?token=${token}&userId=${user._id}`;

  sendResetPasswordLink({ email, link: resetLink });

  res.json({ resetLink});
}

export const grantValid: RequestHandler = async (req, res: Response) => {
  res.json({ valid: true });
}

export const updatePassword: RequestHandler = async (req, res: Response) => {
  const { password, userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(403).json({ error: "Unauthorized access." });

  const matched = await user.comparePassword(password);
  if (matched) return res.status(422).json({ error: "New passowrd must be different."});

  user.password = password;
  await user.save();

  await passwordToken.findOneAndDelete({ owner: user._id });
  sendPasswordResetSuccessEmail({ email: user.email });

  res.json({ message: "Password reset successfully." });
}