import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitterSquare,
  FaYoutube,
} from "react-icons/fa";
import { Logo } from "../index";
import { links } from "../../utils";
import SwitchTheme from "../SwitchTheme";
import { useState } from "react";
import { Profile } from "../../assets";
import {MobileMenu} from '../index'

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const handleOut = () => {
    localStorage.removeItem("user");
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
          <div
            className="relative"
            onClick={() => setShowProfile((prev) => !prev)}
          >
            <div className="flex gap-2 items-center cursor-pointer">
              <img src={Profile} className="w-8 h-8 rounded-full" alt="" />
              <span className="text-black dark:text-gray-500 font-semibold">
                Akawasi Akante
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
