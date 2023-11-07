import password_token_model from "#/models/password_token_model";
import { RequestHandler } from "express";

export const isValidPasswordResetToken: RequestHandler = async (req, res, next) => {
  const { token, userId } = req.body;

  const resetToken = await password_token_model.findOne({ owner: userId });
  if (!resetToken) return res.status(403).json({ error: "Unauthorized access, invalid token!" });

  const matched = await resetToken.compareToken(token);
  if (!matched) return res.status(403).json({ error: "Unauthorized access, invalid token!" });

  next();
}