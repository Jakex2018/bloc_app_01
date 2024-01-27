import { useState } from "react";
import { Logo, Button, Divider, Inputbox } from "../component/index";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const user = {};
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  if (user.token) window.location.replace("/");

  const handleChangeLogin = (e) => {
    const name= e.target.name;
    const value= e.target.value;
    setData({ ...data, [name]: value });
  };
  const googleLogin = async () => {};
  const handleSubmit = async () => {};
  return (
    <div className="flex w-full h-[100vh]">
      <div className="hidden md:flex flex-col gap-y-4 w-2/5 min-h-screen bg-black items-center justify-center">
        <Logo type="login" />
        <span className="text-xl font-semibold text-white">Welcome, back!</span>
      </div>
      <div className="bg-white h-full w-full md:w-2/3 dark:bg-gradient-to-b flex via-[#071b3e] to-black items-center from-black md:dark:bg-gradient-to-r md:px-20 lg:px-40">
        <div className="w-full flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="block mb-10 md:hidden">
            <Logo type="login" />
          </div>
          <div className="max-w-md w-full space-y-8">
            <div className="">
              <h2 className="mt-6 text-black text-center font-semibold text-2xl md:text-3xl dark:text-white ">
                Sign in to your account
              </h2>
            </div>
            <Button
              label="Sign in with google"
              type="button"
              onClick={() => {}}
              icon={<FcGoogle />}
              styles="w-full flex flex-row-reverse gap-4 bg-white dark:bg-transparent dark:text-white rounded-full px-5 py-2.5 text-black border border-gray-300"
            />
            <Divider label="or sign in with email" />
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col rounded-md shadow-sm -space-y-px gap-5">
                <Inputbox
                  label="Email Address"
                  name="email"
                  type="text"
                  placeholder="you@example.com"
                  value={data?.email}
                  onChange={handleChangeLogin}
                />
                <Inputbox
                  label="Password"
                  name="password"
                  type="text"
                  placeholder="Enter your password"
                  value={data?.password}
                  onChange={handleChangeLogin}
                />
                <Button
                  label="Sign in"
                  styles="group dark:bg-rose-800 mt-8 dark:text-white bg-black px-5 py-2.5 w-full relative flex justify-center border border-transparent text-sm font-medium rounded-full hover:bg-rose-700 focus:outline-none "
                  onClick={() => googleLogin()}
                  type="submit"
                />
              </div>
            </form>
            <div className=" flex items-center justify-center text-gray-600 dark:text-gray-300">
              <p>
                Don`t have an account?{""}
                <Link to="/signup" className="text-rose-800 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
