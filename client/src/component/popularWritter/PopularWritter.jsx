import { Link } from "react-router-dom";
import { Profile } from "../../assets";
import formatNumber from "../../utils";

/* eslint-disable react/prop-types */
const PopularWritter = ({ data }) => {
  return (
    <div>
      <p className="dark:text-slate-500 text-gray-700 text-xl mb-4 font-bold">
        Popular Writers
      </p>
      {data?.map((item) => (
        <Link
          to={`/writer/${item?._id}`}
          key={item._id}
          className="flex gap-2 items-center mb-5"
        >
          <img
            src={item?.image || Profile}
            alt={item?.name}
            className="object-cover w-12 h-12 rounded-full"
          />
          <div className="flex flex-col gap-1">
            <span className="font-semibold dark:text-slate-500 text-gray-700 text-base">
              {item?.name}
            </span>
            <span className="text-rose-600 flex gap-1">
              {formatNumber(item?.followers)}
              <span className="text-gray-600 font-semibold text-base">
                Followers
              </span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PopularWritter;
