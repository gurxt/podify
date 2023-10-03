import { Model, ObjectId, Schema, model } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  verified: boolean;
  avatar?: { url: string; publicId: string };
  tokens: string[];
  favorites: ObjectId[];
  followers: ObjectId[];
  following: ObjectId[];
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true 
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: Object,
    url: String,
    publicId: String
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: "Audio"
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  tokens: [String]
}, { timestamps: true });

export default model("User", userSchema) as Model<IUser>;
