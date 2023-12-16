import password_token_model from '#/models/password_token_model';
import User from '#/models/user_model';
import { RequestHandler } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

export const isValidPasswordResetToken: RequestHandler = async (
  req,
  res,
  next
) => {
  const { token, userId } = req.body;

  const resetToken = await password_token_model.findOne({ owner: userId });
  if (!resetToken)
    return res
      .status(403)
      .json({ error: 'Unauthorized access, invalid token!' });

  const matched = await resetToken.compareToken(token);
  if (!matched)
    return res
      .status(403)
      .json({ error: 'Unauthorized access, invalid token!' });

  next();
};

export const mustAuth: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.split('Bearer ')[1];
  if (!token) return res.status(403).json({ error: 'Unauthorized user.' });
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not set in the environment');
    process.exit(1);
  }

  const payload = verify(token, process.env.JWT_SECRET) as JwtPayload;
  const id = payload.userId;

  const user = await User.findOne({ _id: id, tokens: token });
  if (!user) return res.status(403).json({ error: 'Unauthorized request!' });

  req.user = {
    id: user._id,
    name: user.name,
    email: user.email,
    verified: user.verified,
    avatar: user.avatar?.url,
    followers: user.followers.length,
    following: user.following.length,
  };

  next();
};

export const isVerified: RequestHandler = (req, res, next) => {
  if (!req.user.verified)
    return res.status(403).json({ error: 'Please verify email account.' });
  next();
};
