import mongoose, { Schema } from "mongoose";

const ViewsModelSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Posts",
    },
  },
  {
    timestamps: true,
  }
);

const Views = new mongoose.model("Views", ViewsModelSchema);

export default Views;
