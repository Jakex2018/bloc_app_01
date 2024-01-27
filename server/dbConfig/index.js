import mongoose from "mongoose";

export const dbConnect = async() => {
  try {
    const connection= await mongoose.connect(process.env.MONGODB_URL)
    console.log('DB CONNECT')
  } catch (error) {
    console.log("DB error" + error)
  }
}
