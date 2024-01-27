import { useParams } from "react-router";
///import { useStoreTheme } from "../store/useStore";
import { useEffect, useState } from "react";
import { popular, posts } from "../utils/blogData";
import { Link } from "react-router-dom";
import { PopularPost, PopularWritter } from "../component";
import Markdown from "markdown-to-jsx";
import PostComments from "../component/postComment/PostComment";

const BlogDetail = () => {
  ///const { setisLoading } = useStoreTheme();
  const { id } = useParams();
  const [post /* setPost*/] = useState(posts[1]);

  useEffect(() => {
    if (id) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [id]);
  if (!post) {
    return (
      <div className="w-full h-full py-8 flex items-center justify-center">
        <span className="text-xl text-slate-500">Loading...</span>
      </div>
    );
  }
  return (
    <div className="w-full px-0 md:px-10 py-8 2xl:px-20">
      <div className="w-full flex flex-col-reverse md:flex-row gap-2 gap-y-5 items-center">
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white">
            {post.title}
          </h1>
          <div className="w-full flex items-center">
            <span className="flex-1 font-semibold text-rose-600">
              {post?.cat}
            </span>
            <span className="flex flex-1 dark:text-gray-400 text-slate-700 items-baseline text-2xl">
              {post?.views?.length || 0}
              <span className="text-base text-rose-600">Views</span>
            </span>
          </div>
          <Link
            to={`/writer/${post?.user?._id}`}
            className="flex gap-3 items-center"
          >
            <img
              src={post?.user?.image}
              alt={post?.user?.name}
              className="object-cover w-12 h-12 rounded-full"
            />
            <div>
              <p className="text-slate-800 dark:text-white font-semibold">
                {post?.user?.name}
              </p>
              <span
                className="text-slate-600 font-semibold dark.text-slate-300
              "
              >
                {new Date(post?.createdAt).toDateString()}
              </span>
            </div>
          </Link>
        </div>
        <img
          src={post?.img}
          alt={post?.title}
          className="w-full md:w-1/2 h-auto md:h-[360px] 2xl:h-[460px] rounded"
        />
      </div>
      <div className="w-full md:flex-row flex flex-col gap-10 2xl:gap-x-28 mt-10">
        {/*LEFT*/}
        <div className="w-full md:w-2/3 flex flex-col text-black dark:text-gray-500">
          {post?.desc && (
            <Markdown
              options={{ wrapper: "article" }}
              className="leading-[3rem] text-base 2xl:text-[20px]"
            >
              {post?.desc}
            </Markdown>
          )}

          <div className="w-full">{<PostComments postId={id}/>}</div>
        </div>
        {/*Right*/}
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

export default BlogDetail;
