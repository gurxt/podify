import { Request } from "express";

export interface IVerifyEmail extends Request {
  body: {
    userId: string;
    token: string;
  }
}