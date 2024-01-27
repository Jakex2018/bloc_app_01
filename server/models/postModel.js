import mongoose, { Schema } from "mongoose";

const postModelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    desc: {
      type: String,
    },
    img: {
      type: String,
    },
    cat: {
      type: String,
    },
    views: [
      {
        type: Schema.Types.ObjectId,
        ref: "Views",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    comments:[
      {
        type: Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Posts = new mongoose.model("Posts", postModelSchema);

export default Posts;
