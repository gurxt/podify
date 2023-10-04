import { IUser } from "#/util/types/user_types";
import User from '#/models/user_model';
import { Response } from 'express';
import nodemailer from 'nodemailer';
import { generateToken } from "#/util/generate_token";
import emailToken from "#/models/email_token_model";

export const create = async (req: IUser, res: Response) => {
  const { email, password, name } = req.body;

  const user = await User.create({ email, password, name });

  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  });

  const token = generateToken();  
  await emailToken.create({
    owner: user._id,
    token
  });

  transport.sendMail({
    to: user.email,
    from: 'auth@myapp.com',
    html: `<h1>Your OTP: <u>${token}</u></h1>`
  });

  res.status(201).json({ user });
}