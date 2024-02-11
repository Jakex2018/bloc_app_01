/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useStoreTheme } from "../store/useStore";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateURL } from "../utils";
import { toast } from "sonner";
export const API_URL = "http://localhost:3000";

export const usePosts = ({ writerId }) => {
  const { setisLoading } = useStoreTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [category, setCategory] = useState(searchParams.get("cat") || "");
  const [posts, setPosts] = useState([]);
  const [numPages, setNumPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      updateURL({ page, navigate, location, cat: category });
      setisLoading(true);
      try {
        const { data } = await axios.get(
          `${API_URL}/posts?cat${category}&page=${page}&writerId=${
            writerId || ""
          }`
        );
        setPosts(data?.data || []);
        setNumPages(data?.numPages);
      } catch (error) {
        toast.error("Something went wrong");
        const err = error?.response?.data || error?.message;
        console.log(error);
        return err;
      } finally {
        setisLoading(false);
      }
    };
    window, scrollTo({ top: 0, left: 0, behavior: "smooth" });
    fetchPosts();
  }, [page, writerId]);
  return {
    page,
    posts,
    numPages,
    setPage,
  };
};
