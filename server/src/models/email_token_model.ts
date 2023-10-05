import { Model, ObjectId, Schema, model } from "mongoose";
import { hash, compare } from 'bcrypt';

interface IEmailToken {
  owner: ObjectId;
  token: string;
  createdAt: Date; // expire after 1 hour.
}

interface IMethods {
  compareToken(token: string): Promise<boolean>
}

const emailToken = new Schema<IEmailToken, {}, IMethods>({
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

emailToken.pre('save', async function(next) {
  if (this.isModified('token'))
    this.token = await hash(this.token, 10);
  next();
});

emailToken.methods.compareToken = async function(token: string) {
  return await compare(token, this.token);
}

export default model("EmailToken", emailToken) as Model<IEmailToken, {}, IMethods>;