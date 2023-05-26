import mongoose, { Types } from "mongoose";
import { USERS } from "../app/constants/model-names";
const Schema = mongoose.Schema;

export interface ISystemUser {
  username: string;
  email: string;
  password: string;
  lastToken?: string;
  isActive: boolean;
  role: Types.ObjectId;
}
export const userSchema = new Schema<ISystemUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // select: false,
    },
    role: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    lastToken: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, collection: USERS }
).pre(["find", "findOne", "findOneAndUpdate"], function () {
  this.lean();
});

export const userModel = mongoose.model(USERS, userSchema);
