/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useStore from "../store";
import { Pagination, Table, useMantineColorScheme } from "@mantine/core";
import { useFollowers } from "../hooks/followers-hooks";
import { Toaster, toast } from "sonner";
import formatNumber, { getInitials, updateURL } from "../utils";
import Loading from "../components/LoadingOverlay";
import moment from "moment";
const Followers = () => {
  const { colorScheme } = useMantineColorScheme();
  const { user } = useStore();
  const [visible, { toggle }] = useDisclosure(false);
  const { data, isPending, mutate } = useFollowers(toast, toggle, user?.token);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);

  const theme = colorScheme === "dark";
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const fetchFollowers = () => {
      updateURL({ page, navigate, location });
      mutate(page);
    };
    fetchFollowers();
  }, [page]);
  return (
    <div className="w-full flex flex-col">
      <p
        className={`${
          theme ? "text-white" : "text-slate-700"
        } text-lg pb-1 font-semibold`}
      >
        Followers(
        <span className="text-sm">
          {data?.data?.length * data?.page + " of " + data?.total + " records"}
        </span>
        )
      </p>
      <Table highlightOnHover withTableBorder className="flex-1">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Account</Table.Th>
            <Table.Th>Followers</Table.Th>
            <Table.Th>Joined Date</Table.Th>
            <Table.Th>Post Date</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody className="cursor-pointer">
          {data?.data?.length > 0 &&
            data.data.map(({ _id, followersId, createdAt }) => (
              <Table.Tr
                key={_id}
                className={theme ? "to-gray-400" : "to-slate-600"}
              >
                <Table.Td className="flex gap-2 items-center">
                  {followersId.image ? (
                    <img
                      src={followersId?.image}
                      alt={followersId.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <p className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-700 text-white">
                      {getInitials(followersId.name)}
                    </p>
                  )}
                </Table.Td>
                <Table.Td>
                  <p
                    className={`${
                      followersId?.accountType === "user"
                        ? "bg-red-800 text-rose-800"
                        : "bg-blue-800 text-blue"
                    }`}
                  >
                    {followersId?.account}
                  </p>
                </Table.Td>
                <Table.Td>
                  <div className="flex gap-1 items-center">
                    {formatNumber(followersId?.followers.length ?? 0)}
                  </div>
                </Table.Td>
                <Table.Td>{moment(createdAt).fromNow()}</Table.Td>
              </Table.Tr>
            ))}
        </Table.Tbody>
        {data?.data?.length < 1 && <Table.Caption>No Data Found</Table.Caption>}
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
  );
};

export default Followers;
