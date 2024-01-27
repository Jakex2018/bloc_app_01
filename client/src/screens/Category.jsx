import { useState } from "react";
import { Card, Pagination, PopularPost, PopularWritter } from "../component";
import { popular, posts } from "../utils/blogData";

const Category = () => {
  const query = new URLSearchParams(window.location.search).get("cat");
  const numPages = 20;
  const [/*page,*/ setPage] = useState(0);
  if (posts < 1)
    return (
      <div className="w-full h-full px-8 flex place-items-center justify-center">
        <span className="text-lg text-slate-500 dark:text-white">
          No Post Available
        </span>
      </div>
    );

  const handlePageChange = (value) => {
    setPage(value);
  };
  return (
    <div className="px-0 2xl:px-20">
      <div className="py-5">
        <h2 className="text-white fw-semibold text-4xl 2xl:text-5xl">
          {query}
        </h2>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-10 mt-5 2xl:gap-20">
        {/*LEFT*/}
        <div className="w-full md:w-2/3 flex flex-col gap-10 gap-y-20">
          {posts.map((post, index) => (
            <Card key={post._id} index={index} post={post} />
          ))}
          <div>
            <Pagination totalPages={numPages} onPageChange={handlePageChange} />
          </div>
        </div>
        {/*RIGHT*/}
        <div className="w-full md:w-2/3 flex flex-col gap-10">
          {/*Popular post */}
          <PopularPost posts={popular?.posts} />
          {/*Popular writter*/}
          <PopularWritter data={popular?.writers} />
        </div>
      </div>
    </div>
  );
};

export default Category;
