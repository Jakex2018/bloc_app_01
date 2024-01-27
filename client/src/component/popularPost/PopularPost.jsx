import { Link } from "react-router-dom";
import { CATEGORIES } from "../../utils/blogData";
/* eslint-disable react/prop-types */
const PopularPost = ({ posts }) => {
  const Card = ({ post }) => {
    let catColor = "";
    CATEGORIES.map((category) => {
      if (category.label === post?.cat) {
        catColor = category?.color;
      }
      return null;
    });
    return (
      <div className="flex gap-3 items-center mb-5">
        <img
          src={post?.img}
          alt=""
          className="rounded-full w-12 h-12 object-cover"
        />
        <div className="w-full flex flex-col gap-1">
          <span
            className={`${catColor} w-fit rounded-full text-white px-4 py-0.5 text-[12px] 2xl:text-sm`}
          >
            {post?.cat}
          </span>
          <Link
            to={`/${post?.slug}/${post?._id}`}
            className="text-black dark:text-white"
          >
            {post?.title}
          </Link>
          <div className="flex gap-2 text-sm">
            <span className="font-medium">{post?.user?.name}</span>
            <span className="text-gray-600 text-sm">
              {new Date(post?.createdAt).toDateString()}
            </span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <p className="font-semibold dark:text-white text-black text-[18px] 2xl::text-3xl mb-5">
        Popular Posts
      </p>
      {posts.map((post) => (
        <Card post={post} key={post?._id} />
      ))}
    </div>
  );
};

export default PopularPost;
