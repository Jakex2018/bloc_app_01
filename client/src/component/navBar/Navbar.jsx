/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitterSquare,
  FaYoutube,
} from "react-icons/fa";
import { Button, Logo } from "../index";
import { links } from "../../utils";
import SwitchTheme from "../SwitchTheme";
import { useState } from "react";
import { MobileMenu } from "../index";
import { useStoreTheme } from "../../store/useStore";
import { getInitials } from "../../utils/index.js";
const Navbar = () => {
  const navigate=useNavigate()
  const { user, signOut } = useStoreTheme((state) => state);
  const [showProfile, setShowProfile] = useState(false);
  const handleOut = () => {
    localStorage.removeItem("userInfo");
    signOut();
    navigate("/login")
  };
  return (
    <div className="flex flex-col md:flex-row items-center w-full py-5 justify-between gap-4 md:gap-0">
      <div className="flex md:hidden gap-2 md:flex-row text-[20px] items-center">
        <Link to="/" className="text-red-600">
          <FaYoutube />
        </Link>
        <Link to="/" className="text-blue-600">
          <FaFacebook />
        </Link>
        <Link to="/" className="text-rose-600">
          <FaInstagram />
        </Link>
        <Link to="/" className="text-blue-600">
          <FaTwitterSquare />
        </Link>
      </div>
      <Logo type="dsd" />
      <div className="hidden md:flex gap-14 items-center">
        <ul className="flex gap-8 text-base text-black dark:text-white">
          {links.map((link) => (
            <Link to={link.path} key={link.id}>
              {link.title}
            </Link>
          ))}
        </ul>
        <SwitchTheme />
        <div className="flex gap-1 items-center cursor-pointer">
          {user?.token ? (
            <div
              className="relative"
              onClick={() => setShowProfile((prev) => !prev)}
            >
              <div className="flex gap-2 items-center cursor-pointer">
                {user?.user.image ? (
                  <img
                    src={user?.user.image}
                    className="w-8 h-8 rounded-full"
                    alt=""
                  />
                ) : (
                  <span className="text-white w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    {getInitials(user?.user.name)}
                  </span>
                )}
                <span className="font-medium text-black dark:text-gray-500 uppercase">
                  {user?.user?.name?.split(" ")[0]}
                </span>
              </div>
              {showProfile && (
                <div className="absolute bg-white dark:bg-[#2f2d30] py-6 px-6 flex flex-col shadow-2xl z-50 right-0 gap-3 rounded">
                  <span className="dark:text-white">Profile</span>
                  <span
                    className="border-t border-slate-300 text-rose-700"
                    onClick={handleOut}
                  >
                    Logout
                  </span>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <Button
                label="Sign in"
                styles="flex items-center justify-center bg-black dark:bg-rose-600 text-white dark:text-white text-white px-4 py-1.5 rounded-full"
              />
            </Link>
          )}
        </div>
      </div>
      <div className="block md:hidden">
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;

///import { useStoreTheme } from "../../store/useStore";

/*function getInitials(fullName) {
    const names = fullName.split(" ");
    const initials = names.splice(0, 5).map((name) => name[0].toUpperCase());
    const initialsSTR = initials.join("");
    return initialsSTR;
  }*/
