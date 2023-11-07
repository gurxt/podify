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
  email: string;
  userId: string;
}

export const sendVerificationMail = async (token: string, profile: IProfile) => {
  const transport = generateMailTransporter();

  const { email, userId } = profile;

  await email_token_model.create({
    owner: userId,
    token
  });

  transport.sendMail({
    to: email,
    from: process.env.VERIFICATION_EMAIL,
    html: emailTemplate({ 
      header: "Account Verification",
      title: token, 
      message: "Here is your OTP token: ", 
      logo: "cid:logo",
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
      header: "Reset Your Password",
      message: `Reset password by clicking the link ${link}`, 
      title: `${link}`,
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

interface IEmail {
  email: string;
}

export const sendPasswordResetSuccessEmail = async (options: IEmail) => {
  const transport = generateMailTransporter();

  const { email } = options;

  transport.sendMail({
    to: email,
    from: process.env.VERIFICATION_EMAIL,
    html: emailTemplate({ 
      header: "Password Reset Result",
      message: "Password successfully updated", 
      title: ``,
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