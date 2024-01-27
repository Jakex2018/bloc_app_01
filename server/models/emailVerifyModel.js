import mongoose from "mongoose";
const EmailVerifySchema = new mongoose.Schema({
  userId: String,
  token: String,
  createdAt: Date,
  expiresAt: Date,
});
const EmailVerify = mongoose.model("EmailVerify", EmailVerifySchema);

export default EmailVerify
