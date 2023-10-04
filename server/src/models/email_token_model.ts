  
import { Model, ObjectId, Schema, model } from "mongoose";

interface IEmailToken {
  owner: ObjectId;
  token: string;
  createdAt: Date; // expire after 1 hour.
}

const emailToken = new Schema<IEmailToken>({
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

export default model("EmailToken", emailToken) as Model<IEmailToken>;