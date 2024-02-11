import Users from "../models/userModel.js";
import { sendVerificationEmail } from "../utils/send_email.js";
import { compareString, createJWT, hashString } from "../utils/index.js";
export const register = async (req, res, next) => {
  const { firstName, lastName, email, password, image, accountType, provider } =
    req.body;
  try {
    if (!(firstName || lastName || email || password))
      return next("Provide Required Fields");
    if (accountType === "writer" && !image)
      return next("Please provide profile image");
    const userExist = await Users.findOne({
      email,
    });
    if (userExist) return next("This email already exits");
    const hashPassword = await hashString(password);
    const user = await Users.create({
      name: firstName + " " + lastName,
      email,
      password: !provider ? hashPassword : "",
      image,
      accountType,
      provider,
    });

    user.password = undefined;
    ///if (!user) return next("Error Credentials, Please Try Again");
    const token = createJWT(user?._id);
    if (accountType === "writer") {
      sendVerificationEmail(user, res, token);
    } else {
      res.status(200).json({
        success: true,
        message: "Account created successfully",
        user,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const googleSignup = async (req, res) => {
  try {
    const { name, email, image, emailVerified } = req.body;
    const userExist = await Users.findOne({
      email,
    });
    if (userExist) return next("This email already exits");
    const user = Users.create({
      name,
      email,
      image,
      provider: "Google",
      emailVerified,
    });
    user.password = undefined;
    const token = createJWT(user._id);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) return next("Please Provide User Credentials");
    const user = await Users.findOne({ email }).select("+password");
    if (!user) return next("Invalid email or password");
    if (user.provider === "Google" && !password) {
      const token = createJWT(user?._id);
      return res.status(200).json({
        success: true,
        message: "Login successfully",
        user,
        token,
      });
    }

    const isMatch = await compareString(password, user?.password);
    if (!isMatch) return next("Invalid email or password");
    if (user?.accountType === "Writer" && !user?.emailVerify)
      return next("Please verify your email address");
    user.password = undefined;
    const token = createJWT(user?._id);
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

/*
if (accountType === "writer") {
    sendVerificationEmail(user, res, token);
  } else {
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user,
      token,
    });
  }
*/
