/* eslint-disable react-hooks/exhaustive-deps */
import { useMantineColorScheme } from "@mantine/core";
import { useEffect } from "react";
import useStore from "../store";
import { useDisclosure } from "@mantine/hooks";
import { useAnalytics, useCreatePost } from "../hooks/post-hook";
import { toast, Toaster } from "sonner";
import Stats from "../components/Stats";
import Graph from "../components/Graph";
import clsx from "clsx";
import { RecentFollowerTable, RecentPostTable } from "../components/Table";
import Loading from "../components/LoadingOverlay";

const Dashboard = () => {
  const { colorScheme } = useMantineColorScheme();
  const { user } = useStore();
  const theme = colorScheme === "dark";
  const [visible, { toggle }] = useDisclosure(false);
  const { data, isPending, mutate } = useAnalytics(toast, toggle, user?.token);
  useEffect(() => {
    mutate();
  }, []);
  return (
    <div className="w-full">
      <Stats dt={data} />
      <div className="w-full py-8">
        <p className="py-5 text-base font-medium">
          View Stats for last 28 days
        </p>
        <Graph dt={data?.viewStats} />
      </div>
      <div className="flex flex-col gap-6 md:flex-row py-6 ">
        <div className="w-full md:w-1/3 flex flex-col">
          <span
            className={clsx(
              "py-5 text-base font-medium",
              theme ? "text-white" : "text-slate-600"
            )}
          >
            Recent Followers
          </span>
          <RecentFollowerTable data={data?.lastFollowers} theme={theme} />
        </div>
        <div className="w-full md:w-1/3 flex flex-col">
          <span
            className={clsx(
              "py-5 text-base font-medium",
              theme ? "text-white" : "text-slate-600"
            )}
          >
            Recent Content
          </span>
          <RecentPostTable data={data?.lastPosts} theme={theme} />
        </div>
      </div>
      <Loading visible={isPending} />
      <Toaster richColors />
    </div>
  );
};

export default Dashboard;
