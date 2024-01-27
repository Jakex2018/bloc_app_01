import mongoose from "mongoose";
import { Schema } from "mongoose";

const CommentsModelSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Posts",
    },
    desc: { type: String },
  },
  {
    timestamps: true,
  }
);

const Comments = new mongoose.model("Comments", CommentsModelSchema);

export default Comments;
