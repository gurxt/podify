import { Model, ObjectId, Schema, model } from "mongoose";
import { hash, compare } from 'bcrypt';

interface IPasswordReset{
  owner: ObjectId;
  token: string;
  createdAt: Date; // expire after 1 hour.
}

interface IMethods {
  compareToken(token: string): Promise<boolean>
}

const passwordReset = new Schema<IPasswordReset, {}, IMethods>({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    expires: 3600, // 1 hour in seconds.
    default: Date.now()
  }
})

passwordReset.pre('save', async function(next) {
  if (this.isModified('token'))
    this.token = await hash(this.token, 10);
  next();
});

passwordReset.methods.compareToken = async function(token: string) {
  return await compare(token, this.token);
}

export default model("PasswordReset", passwordReset) as Model<IPasswordReset, {}, IMethods>;