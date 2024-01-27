import Users from "../models/userModel.js";
import Verification from "../models/emailVerifyModel.js";
import { createJWT, compareString } from "../utils/index.js";
import { sendVerificationEmail } from "../utils/send_email.js";
import Followers from "../models/followersModel.js";
export const OPTVerification = async (req, res) => {
  const { userId, otp } = req.params;
  try {
    const result = await Verification.findOne({ userId });
    const { expiresAt, token } = result;

    //token expired
    if (expiresAt < Date.now()) {
      await Verification.findOneAndDelete({ userId });
      const message = "Verification token has expired";
      res.status(404).json({
        message,
      });
    } else {
      const isMatch = await compareString(otp, token);
      if (isMatch) {
        await Promise.all([
          Users.findOneAndUpdate({ _id: userId }, { emailVerify: true }),
          Verification.findOneAndDelete({ userId }),
        ]);
      }
      const message = "Email verified successfully";
      res.status(200).json({ message });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const resendOPT = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Verification.findOneAndDelete({ userId: id });
    const user = await Users.findById(id);
    user.password = undefined;
    const token = createJWT(user?._id);
    if (user?.accountType === "writer") {
      sendVerificationEmail(user, res, token);
    } else
      res.status(404).json({
        message: "Acount Type has not been writter",
      });
  } catch (error) {
    console.log(error);
    res.status(404).json("Something went wrong");
  }
};

export const followWritter = async (req, res) => {
  const { id } = req.params;
  const followersId = req.body.user.userId;
  const check = await Followers.findOne({ followersId });
  if (check)
    return res.status(201).json({
      success: false,
      message: "You`re already following this writter",
    });
  const writer = await Users.findById(id);
  const newFollower = await Followers.create({
    followersId,
    writerId: id,
  });
  writer?.followers?.push(newFollower?._id);
  await Users.findByIdAndUpdate(id, writer, { new: true });
  res.status(201).json({
    success: true,
    message: "You`re now following: " + writer?.name,
  });
  try {
  } catch (error) {
    console.log(error);
    res.status(404).json("Something went wrong");
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, image } = req.body;
    if (!(firstName || lastName)) {
      return next("Please Provide all fields");
    }
    const { userId } = req.body.user;
    const updateUser = {
      name: firstName + " " + lastName,
      image,
      _id: userId,
    };
    const user = await Users.findByIdAndUpdate(userId, updateUser, {
      new: true,
    });
    const token = createJWT(user?._id);
    user.password = undefined;
    res.status(200).json({
      success: true,
      message: "User Updated successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json("Something went wrong");
  }
};
export const getWritter = async (req, res) => {
  try {
    const { id } = req.params;
    const getUser = await Users.findById(id).populate({
      path: "followers",
      select: "followersId",
    });
    if (!getUser) {
      return res.status(200).send({
        success: false,
        message: "Writer not found",
      });
    }
    getUser.password = undefined;
    res.status(200).json({
      success: true,
      data: getUser,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json("Something went wrong");
  }
};
