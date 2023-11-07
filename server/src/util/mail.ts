import { emailTemplate } from '#/mail/template';
import email_token_model from '#/models/email_token_model';
import path from 'path';
import nodemailer from 'nodemailer'

const generateMailTransporter = () => {
 const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  });

  return transport
}

interface IProfile {
  name: string;
  email: string;
  userId: string;
}

export const sendVerificationMail = async (token: string, profile: IProfile) => {
  const transport = generateMailTransporter();

  const { name, email, userId } = profile;

  await email_token_model.create({
    owner: userId,
    token
  });

  transport.sendMail({
    to: email,
    from: process.env.VERIFICATION_EMAIL,
    html: emailTemplate({ 
      title: token, 
      message: "Here is your OTP token: ", 
      logo: "cid:logo"
    }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../mail/logo.png"),
        cid: "logo" 
      }
    ]
  });
}

interface IOptions {
  email: string;
  link: string;
}

export const sendResetPasswordLink = async (options: IOptions) => {
  const transport = generateMailTransporter();

  const { email, link } = options;

  transport.sendMail({
    to: email,
    from: process.env.VERIFICATION_EMAIL,
    html: emailTemplate({ 
      title: email, 
      message: `Reset password: ${link}`,
      logo: "cid:logo"
    }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../mail/logo.png"),
        cid: "logo" 
      }
    ]
  });
}