import mongoose, { Schema } from "mongoose";

const followersModelSchema = new mongoose.Schema(
  {
    followersId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    writerId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

const Followers = new mongoose.model("Followers", followersModelSchema);

export default Followers;
