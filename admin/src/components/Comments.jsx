/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import NoProfile from "../assets/profile.png";
import { toast } from "sonner";
import useStore from "../store";
import useCommentStore from "../store/comments";
import { Modal } from "@mantine/core";
import { useCommentPost, useDeleteComment} from "../hooks/post-hook";
import { useEffect } from "react";

const Comments = () => {
  const { setOpen, openComment, commentId } = useCommentStore();
  const { user } = useStore();
  const { data, mutate } = useCommentPost();
  const handleClose = () => {
    setOpen(false);
  };
  const useDelete = useDeleteComment(user?.token);
  const handleDelete = (id) => {
    useDelete.mutate({ id, postId: commentId });
  };
  useEffect(() => {
    mutate(commentId);
  }, [commentId]);
  return (
    <Modal
      opened={openComment}
      onClose={handleClose}
      title={`Comments(${data?.data?.length})`}
      centered
    >
      <div className="w-full h-full pb-6">
        <div className="w-full h-full flex flex-col gap-6 px-2">
          {data?.data?.map(({ _id, user, desc, post, createdAt }) => {
            <div key={_id} className="w-full flex g<ap-4">
              <img
                src={user?.image || NoProfile}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="w-full">
                <div className="w-full flex justify-between">
                  <div className="w-full flex items-center gap-2">
                    <p className="text-slate-600 dark:text-gray-500 text-xs font-medium">
                      {user.name}
                    </p>
                    <span className="text-slate-700 dark:text-gray-500 text-xs italic">
                      {new Date(createdAt).toDateString()}
                    </span>
                  </div>
                  <span
                    onClick={() => handleDelete(_id)}
                    className="text-sm text-red-600 cursor-pointer"
                  >
                    Delete
                  </span>
                </div>
                <span className="text-sm to-gray-700 dark:text-gray-500">
                  {desc}
                </span>
              </div>
            </div>;
          })}
        </div>
      </div>
    </Modal>
  );
};

export default Comments;
