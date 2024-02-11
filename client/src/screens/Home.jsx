import { Link } from "react-router-dom";
import { Banner, PopularWritter } from "../component/index";
import { CATEGORIES, popular} from "../utils/blogData";
import { Card, PopularPost, Pagination } from "../component/index";
import { usePosts } from "../hooks/post-hook";
const Home = () => {
  const { posts, numPages, setPage } = usePosts({ writerId: "" });
  const randomIndex = Math.floor(Math.random() * posts.length);
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
    <div className="py-10 2xl::py-5">
      <Banner post={posts[randomIndex]} />
      <div className="px-0 lg:pl-20 2xl:px-20">
        {/*Categories */}
        <div className="mt-6 md:mt-0">
          <p className="font-semibold dark:text-white text-gray-500 text-2xl">
            Popular Categories
          </p>
          <div className="flex flex-wrap gap-8 py-10">
            {CATEGORIES.map((category) => (
              <Link
                to={`/category?cat=${category.label}`}
                key={category.id}
                className={`${category.color} flex items-center justify-center gap-3 font-semibold text-base px-4 py-2 rounded cursor-pointer text-white`}
              >
                {category.icon}
                <span>{category.label}</span>
              </Link>
            ))}
          </div>
        </div>
        {/*Blog posts*/}
        <div className="w-full flex flex-col md:flex-row gap-10 2xl:gap-20">
          {/*left side */}
          <div className="w-full md:w-2/3 flex flex-col gap-10 gap-y-20">
            {posts.map((post, index) => (
              <Card key={post._id} index={index} post={post} />
            ))}
            <div>
              <Pagination
                totalPages={numPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
          {/*right side */}
          <div className="w-full md:w-2/3 flex flex-col gap-10">
            {/*Popular post */}
            <PopularPost posts={popular?.posts} />
            {/*Popular writter*/}
            <PopularWritter data={popular?.writers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
