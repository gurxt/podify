import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: any;
        name: string;
        email: string;
        verified: boolean;
        avatar?: string;
        followers: number;
        following: number;
      };
      token: string;
    }
  }
}

export interface IUser extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}
