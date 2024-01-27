import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const Logo = ({ type }) => {
  return (
    <div className="">
      <Link
        to='/'
        className={`text-2xl font-semibold ${type && "text-black dark:text-white text-4xl"}`}
      >
        Blog
        <span className={`text-3xl text-rose-600 ${type && 'text-rose-600 text-4xl'}`}>Wave</span>
      </Link>
    </div>
  );
};

export default Logo;
