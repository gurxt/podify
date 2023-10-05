import { IUser } from '#/util/types/user_types';
import User from '#/models/user_model';
import { Response } from 'express';
import { generateToken } from '#/util/generate_token';
import { sendVerificationMail } from '#/util/mail';

export const create = async (req: IUser, res: Response) => {
  const { email, password, name } = req.body;

  const user = await User.create({ email, password, name });

  const token = generateToken();

  sendVerificationMail(token, {
    userId: user._id.toString(),
    name,
    email
  })

  res.status(201).json({ user: { id: user._id, name, email } });
}