/* eslint-disable react/prop-types */
import {AiOutlineArrowRight} from 'react-icons/ai'
import Markdown from "markdown-to-jsx";
import { Link } from "react-router-dom";

const Card = ({ post }) => {
  return (
    <div className="w-full flex flex-col gap-8 items-center rounded md:flex-row">
      <Link to={`/${post?.slug}/${post?._id}`} className="w-full md:w-2/4 h-64">
        <img
          src={post?.img}
          alt={post?.title}
          className="h-full w-full object-cover rounded"
        />
      </Link>
      <div className="w-full md:w-2/4 flex flex-col gap-3">
        <div className="flex gap-2">
          <span className="text-gray-600 text-sm">
            {new Date(post?.createdAt).toDateString()}
          </span>
          <span className="text-rose-600 font-semibold text-sm">
            {post?.cat}
          </span>
        </div>
        <h6 className="dark:text-white text-black font-serif text-xl 2xl:text-3xl">
          {post?.title}
        </h6>
        <div className="dark:text-slate-500 text-justify flex-1 overflow-hidden text-sm">
          <Markdown options={{ wrapper: "article" }}>
            {post?.desc?.slice(0, 250) + "..."}
          </Markdown>
        </div>
        <Link to={`/${post?.slug}/${post?._id}`} className='text-black dark:text-white flex flex-row items-center gap-3'>
          <span className="text-black dark:text-white">Read More</span>
          <AiOutlineArrowRight/>
        </Link>
      </div>
    </div>
  );
};

export default Card;
