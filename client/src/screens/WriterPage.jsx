//import { useParams } from "react-router";
//import { useStoreTheme } from "../store/useStore";
import { popular, posts, writer } from "../utils/blogData";
import formatNumber from "../utils";
import { Profile } from "../assets";
import {
  Button,
  Card,
  Pagination,
  PopularPost,
  PopularWritter,
} from "../component";
///import { FaUserCheck } from "react-icons/fa";
///import { useState } from "react";

const WriterPage = () => {
  // const { user } = useStoreTheme();
  // const { id } = useParams();
  ///const [writer, setWriter] = useState(writer);
  ///const followesId = writer.followers.map((follow) => fetch.followesId);
  if (!writer) {
    return (
      <div className="w-full h-full py-8 items-center justify-center">
        <span className="text-lg text-slate-500">No writer found</span>
      </div>
    );
  }
  const handlePageChange = () => {};
  const numPages = 20;
  return (
    <div className="w-full px-0 md:px-10 py-8 2xl:px-20">
      <div className="w-full items-center flex flex-col md:h-60 md:flex-row gap-5 bg-black dark:bg-gradient-to-r via-[#071b3e] from-[#020b19] to-[#020b19] mt-5 mb-10 rounded-md p-5 md:px-20">
        <img
          src={writer?.image || Profile}
          className="rounded-full h-48 w-48 object-cover border-4 border-slate-400"
          alt=""
        />
        <div className="flex flex-col gap-y-5 md:gap-8 items-center justify-center">
          <h2 className="dark:text-white font-semibold text-4xl 2xl:text-2xl">
            {writer?.name}
          </h2>
          <div className="flex gap-10">
            <div className="flex flex-col items-center">
              <p className="text-gray-300 text-2xl font-semibold">
                {formatNumber(writer?.followers?.length ?? 0)}
              </p>
              <span className="dark:text-slate-500 font-semibold text-gray-700">
                Followers
              </span>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-gray-300 text-2xl font-semibold">
                {formatNumber(posts?.length ?? 0)}
              </p>
              <span className="dark:text-slate-500 font-semibold text-gray-700">
                Post
              </span>
            </div>
          </div>
          <Button
            onClick={() => {}}
            styles="flex items-center justify-center text-slate-800 text-semibold md:mt-4 px-6 py-1 rounded-full bg-white"
            label="Follow"
            type="login"
          />
        </div>
      </div>
      <div className="w-full md:flex-row flex flex-col gap-10 2xl:gap-20 mt-10">
        {/*left side */}
        <div className="w-full md:w-2/3 flex flex-col gap-10 gap-y-20">
          {posts.map((post, index) => (
            <Card key={post._id} index={index} post={post} />
          ))}
          <div>
            <Pagination totalPages={numPages} onPageChange={handlePageChange} />
          </div>
        </div>
        {/*right side */}
        <div className="w-full md:w-2/3 flex flex-col gap-y-12">
          {/*Popular post */}
          <PopularPost posts={popular?.posts} />
          {/*Popular writter*/}
          <PopularWritter data={popular?.writers} />
        </div>
      </div>
    </div>
  );
};

export default WriterPage;
