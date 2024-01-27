import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
export const hashString = async (userValue) => {
  try {
    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(userValue, salt);
    return hashPassword;
  } catch (error) {
    console.log(error);
  }
};

export const compareString = async (userPassword, password) => {
  try {
    const isMatch = await bcrypt?.compare(userPassword, password);
    return isMatch;
  } catch (error) {
    console.log(error);
  }
};
export function createJWT(id) {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY environment variable is not set");
  }
  return JWT.sign({ userId: id }, process.env.JWT_SECRET_KEY,{
    expiresIn: "1d",
  });
}

export function generateOTP() {
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number

  let randomNumber;

  randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber;
}
