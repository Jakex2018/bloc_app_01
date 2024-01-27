import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo, Button, Inputbox } from "../component/index";
import { FcGoogle } from "react-icons/fc";

import {BiImage} from 'react-icons/bi'
///import {FcGoogle} from 'react-icons/fc'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Toaster, toast } from "sonner";
const SignupPage = () => {
  const user = {};
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  if (user.token) window.location.replace("/");
  toast.success("Login");
  const [file, setFile] = useState("");
  const [fileURL, /*setFileURL*/] = useState("");

  const handleChangeRegister = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const googleRegister = async () => {};
  const handleSubmit = async () => {};
  return (
    <div className="flex w-full h-[100vh]">
      <div className="hidden md:flex flex-col gap-y-4 w-2/5 min-h-screen bg-black items-center justify-center">
        {fileURL && <img src={fileURL || file} alt="" />}
        <Logo type="login" />
        <span className="text-xl font-semibold text-white">Welcome, back!</span>
      </div>
      <div className="bg-white h-full w-full md:w-2/3 dark:bg-gradient-to-b flex via-[#071b3e] to-black items-center from-black md:dark:bg-gradient-to-r md:px-20 lg:px-40">
        <div className="w-full flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="block mb-10 md:hidden">
            <Logo type="signup" />
          </div>
          <div className="max-w-md w-full space-y-8">
            {showForm && (
              <IoArrowBackCircleSharp
                onClick={() => setShowForm(false)}
                className="text-2xl lg:text-3xl cursor-pointer text-gray-800 dark:text-gray-400"
              />
            )}
            <h2 className="mt-6 text-black text-center font-semibold text-2xl md:text-3xl dark:text-white ">
              Sign up to your account
            </h2>
            {showForm ? (
              <form
                className="max-w-md w-full mt-8 space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 rounded-md shadow-sm -space-y-px gap-5">
                  <div className="grid grid-cols-2 gap-5">
                    <Inputbox
                      label="First Name"
                      name="firstName"
                      type="text"
                      placeholder="Your first name"
                      value={data?.firstName}
                      onChange={handleChangeRegister}
                    />
                    <Inputbox
                      label="Last Name"
                      name="lastName"
                      type="text"
                      placeholder="Your Last Name"
                      value={data?.lastName}
                      onChange={handleChangeRegister}
                    />
                  </div>
                  <Inputbox
                    label="Email Adress"
                    name="email"
                    type="text"
                    placeholder="you@example.com"
                    value={data?.email}
                    onChange={handleChangeRegister}
                  />
                  <Inputbox
                    label="Password"
                    name="password"
                    type="text"
                    placeholder="Enter your password"
                    value={data?.password}
                    onChange={handleChangeRegister}
                  />
                  <div className='flex items-center justify-between py-4'>
                    <label
                      className="flex items-center gap-1 text-base text-black dark:text-gray-500 cursor-pointer"
                      htmlFor="imgUpload"
                    >
                      <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="hidden"
                        id="imgUpload"
                        data-max-size="5120"
                        accept=".jpg, .png, .jpeg"
                      />
                      <BiImage />
                      <span>Picture</span>
                    </label>
                  </div>
                  <Button
                    label="Create Account"
                    styles="group dark:bg-rose-800 mt-8 dark:text-white bg-black px-5 py-2.5 w-full relative flex justify-center border border-transparent text-sm font-medium rounded-full hover:bg-rose-700 focus:outline-none "
                    onClick={() => googleRegister()}
                    type="submit"
                  />
                </div>
              </form>
            ) : (
              <div className="max-w-md w-full space-y-8">
                <Button
                  label="Sign up with google"
                  type="button"
                  onClick={() => {
                    setShowForm(true);
                  }}
                  icon={<FcGoogle />}
                  styles="w-full flex flex-row-reverse gap-4 bg-white dark:bg-transparent dark:text-white rounded-full px-5 py-2.5 text-black border border-gray-300"
                />
              </div>
            )}
            <div className=" flex items-center justify-center text-gray-600 dark:text-gray-300">
              <p>
                Already has an account?{" "}
                <Link to="/login" className="text-rose-800 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster richColors />
    </div>
  );
};

export default SignupPage;
