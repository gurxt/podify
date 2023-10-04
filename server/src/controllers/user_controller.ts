import { IUser } from "#/util/types/user_types";
import User from '#/models/user_model';

export const create = async (req: IUser, res) => {
  const { email, password, name } = req.body;

  const user = await User.create({ email, password, name });
  res.status(201).json({ user });
}