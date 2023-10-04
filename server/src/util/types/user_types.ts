import { Request } from "express";

export interface IUser extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  }
}