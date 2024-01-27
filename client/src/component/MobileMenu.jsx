import { useState } from "react";
import Logo from "./Logo";
import { links } from "../utils";
import { Link } from "react-router-dom";
import { Profile } from "../assets";
import SwitchTheme from "./SwitchTheme";
import { AiOutlineClose } from "react-icons/ai";

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="flex">
      <button
        onClick={toggleMenu}
        className="lg:hidden p-2 text-gray-600 hover:text-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-fit z-50 flex flex-col items-center justify-center shadow-2xl gap-8 bg-white dark:bg-[#020b19] py-10">
          <Logo type="logo" />
          <ul className="flex flex-col gap-4 text-base text-black dark:text-white">
            {links.map((link) => (
              <Link to={link.path} onClick={toggleMenu} key={link.id}>
                {link.title}
              </Link>
            ))}
          </ul>
          <div className="flex gap-2 items-center cursor-pointer">
            <img src={Profile} className="w-8 h-8 rounded-full" alt="" />
            <span className="text-black dark:text-gray-500 font-semibold">
              Akawasi Akante
            </span>
          </div>
          <button className="bg-black dark:bg-rose-600 hover:bg-rose-700 text-white dark:text-white px-8 py-1.5 rounded-full text-center outline-none">
            Logout
          </button>
          <SwitchTheme />
          <span
            onClick={toggleMenu}
            className="cursor-pointer font-semibold dark:text-white text-dark text-xl"
          >
            <AiOutlineClose />
          </span>
        </div>
      )}
    </div>
  );
};
export default MobileMenu;