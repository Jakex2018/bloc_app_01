/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Button,
  Menu,
  Table,
  useMantineColorScheme,
  Pagination,
} from "@mantine/core";
import ConfirmDialog from "../components/ConfirmDialog";
import { useDisclosure } from "@mantine/hooks";
import useStore from "../store";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useActionPost, useContent, useDeletePost } from "../hooks/post-hook";
import formatNumber, { updateURL } from "../utils";
import clsx from "clsx";
import { AiOutlineEye } from "./index";
import moment from "moment";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { MdMessage, MdOutlineDeleteOutline } from "react-icons/md";
import Loading from "../components/LoadingOverlay";
import Comments from "../components/Comments";
import useCommentStore from "../store/comments";
const Content = () => {
  const { colorScheme } = useMantineColorScheme();
  const { user } = useStore();
  const [visible, { toggle }] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);
  const useAction = useActionPost(toast, user?.token);
  const { data, isPending, mutate } = useContent(toast, toggle, user?.token);
  const useDeleted = useDeletePost(toast, user?.token);
  const { setOpen, commentId, setCommentId } = useCommentStore();

  const [select, setSelect] = useState("");
  const [type, setType] = useState(null);
  const [status, setStatus] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);

  const theme = colorScheme === "light";
  const navigate = useNavigate();
  const location = useLocation();

  const fetchContent = async () => {
    updateURL({ page, navigate, location });
    mutate(page);
  };
  useEffect(() => {
    fetchContent();
  }, [page]);
  const handleComment =(id, size) => {
    if (size === 0) {
      setCommentId(id);
      setOpen(true);
    }
  };
  const handlePerformAction = (value, id, status) => {
    setSelect(id);
    setType(value);
    setStatus(status);
    open();
  };
  const handleAction = () => {
    switch (type) {
      case "delete":
        useDeleted.mutate(select);
        break;
      case "status":
        useAction.mutate({ id: select, status });
        break;
    }
    fetchContent();
    close();
  };
  return (
    <>
      <div className="w-full h-full flex flex-col">
        <p
          className={clsx(
            "text-lg pb-1 font-semibold",
            theme ? "text-black" : "text-white"
          )}
        >
          Content ({" "}
          <span>
            {data?.data?.length * data?.page +
              "of" +
              data?.totalPost +
              " records"}
          </span>
          )
        </p>
        <Table highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Post Title</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Views</Table.Th>
              <Table.Th>Comments</Table.Th>
              <Table.Th>Post Date</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody className="cursor-pointer">
            {data?.data?.length > 0 &&
              data.data.map((el) => (
                <Table.Tr
                  key={el._id}
                  className={theme ? "to-gray-400" : "to-slate-600"}
                >
                  <Table.Td>
                    <img
                      src={el.img}
                      alt={el.title}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p className="text-base">{el.title}</p>
                  </Table.Td>
                  <Table.Td>{el?.cat}</Table.Td>
                  <Table.Td>
                    <div>
                      <AiOutlineEye size={18} />
                      {formatNumber(el?.views?.length)}
                    </div>
                  </Table.Td>
                  <Table.Td
                    onClick={() => handleComment(el?._id, el?.comments?.length)}
                  >
                    <div>
                      <MdMessage size={18} className="text-slate-500" />
                      {formatNumber(el?.comments?.length)}
                    </div>
                  </Table.Td>
                  <Table.Td>{moment(el?.createdAt).fromNow()}</Table.Td>
                  <Table.Td>
                    <span
                      className={`${
                        el?.status
                          ? "bg-green-700 text-white"
                          : "bg-red-700 text-white"
                      }${
                        colorScheme === "dark"
                          ? "bg-opacity-30"
                          : "bg-opacity-70"
                      } rounded-full font-semibold px-4 py-1.5`}
                    >
                      {el?.status === true ? "Active" : "Disabled"}
                    </span>
                  </Table.Td>
                  <Table.Td width={5}>
                    <Menu
                      transitionProps={{
                        transition: "rotate-right",
                        duration: 150,
                      }}
                      shadow="lg"
                      width={200}
                    >
                      <Menu.Target>
                        <Button>
                          <BiDotsVerticalRounded
                            className={
                              colorScheme === "dark"
                                ? "text-white text-lg"
                                : "text-slate-900 text-lg"
                            }
                          />
                        </Button>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          leftSection={<AiOutlineSetting />}
                          onClick={() =>
                            handlePerformAction("status", el?._id, !el?.status)
                          }
                        >
                          {el?.status ? "Disable" : "Enable"}
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Label>Danger Zone</Menu.Label>
                        <Menu.Item
                          color="red"
                          leftSection={<MdOutlineDeleteOutline />}
                          onClick={() => handlePerformAction("delete", el?._id)}
                        >
                          Delete Post
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table>
        <div className="w-full h-full flex items-center justify-center mt-8">
          <Pagination
            total={data?.page}
            siblings={1}
            defaultValue={data?.page}
            color="red"
            withEdges
            onChange={(value) => setPage(value)}
          />
          ;
        </div>
        <Loading visible={isPending} />
        <Toaster richColors />
      </div>
      <ConfirmDialog
        message="Are you sure you want perform this action?"
        opened={opened}
        close={close}
        handleClick={handleAction}
      />
      <Comments/>
      {/*{commentId && <Comments />}*/}
    </>
  );
};

export default Content;
