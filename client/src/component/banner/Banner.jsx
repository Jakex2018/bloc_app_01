/* eslint-disable react/prop-types */
import Markdown from "markdown-to-jsx";
import { Link } from "react-router-dom";

const Banner = ({ post }) => {
  return (
    <div className="w-full mb-16">
      <div className="relative w-full h-[500px] 2xl:h-[600px] flex px-0 lg:px-20">
        <Link to={`/${post?.slug}/${post?._id}`} className="w-full">
          <img
            src={post?.img}
            alt=""
            className="w-full md:w-3/4 h-64 md:h-[420px] 2xl:h-[560px] rounded"
          />
        </Link>
        <div className="absolute flex flex-col md:right-10 bottom-10 md:bottom-2 w-full md:w-2/4 lg:w-1/3 2xl:w-[480px] bg-white dark:bg-[#05132b] shadow-2xl rounded-[5px] gap-3 p-4">
          <Link to={`/${post?.slug}/${post?._id}`}>
            <h2 className="text-black dark:text-white font-semibold text-[20px]">
              {post?.title?.slice(0, 60) + "..."}
            </h2>
          </Link>
          <div className="flex overflow-hidden dark:text-slate-500 text-sm text-justify text-gray-600">
            <Markdown options={{ wrapper: "article" }}>
              {post?.desc?.slice(0, 220) + "...."}
            </Markdown>
          </div>
          <Link
            to={`/${post?.slug}/${post?._id}`}
            className="bg-rose-600 rounded-full text-sm w-fit px-4 py-1 bg-opacity-20 cursor-pointer text-rose-700"
          >
            Read more...
          </Link>
          <Link
            to={`/writer/${post?.user?._id}`}
            className="flex gap-3 mt-5 mb-2 items-center"
          >
            <img
              src={post?.user?.image}
              className="object-cover w-10 h-10 rounded-full"
              alt={"User Profile"}
            />
            <span className="font-medium text-gray-700 dark:text-slate-400">
              {post?.user?.name}
            </span>
            <span className="text-gray-500 dark:text-gray-600">
              {new Date(post?.createdAt).toDateString()}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
