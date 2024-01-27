import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailVerify: { type: Boolean, default: false },

    accountType: { type: String, default: "user" },
    image: { type: String },
    password: { type: String, select: true },
    provider: { type: String, default: "codewave" },
    followers: [{ type: Schema.Types.ObjectId, ref: "Followers" }],
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("Users", userSchema);

export default User;
