import { User } from '#/models/user_model';

export const generateToken = (length = 6): string => {
  let otp = '';

  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }

  return otp;
};

export const formatProfile = (user: User) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    verified: user.verified,
    avatar: user.avatar?.url,
    followers: user.followers.length,
    following: user.following.length,
  };
};
