/* eslint-disable react/prop-types */
import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import formatNumber, { iconsAnalytics } from "../utils/index.js";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
const Stats = ({ dt }) => {
  const data = [
    {
      title: "TOTAL POST",
      icon: "post",
      value: formatNumber(dt?.totalPost ?? 0),
      diff: 34,
    },
    {
      title: "FOLLOWERS",
      icon: "users",
      value: formatNumber(dt?.followers ?? 0),
      diff: -12,
    },
    {
      title: "TOTAL VIEWS",
      icon: "view",
      value: formatNumber(dt?.totalViews ?? 0),
      diff: 18,
    },
    {
      title: "TOTAL WRITTERS",
      icon: "user",
      value: formatNumber(dt?.totalWritters ?? 0),
      diff: -30,
    },
  ];
  const stats = data?.map((stat) => {
    const Icon = iconsAnalytics[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
    return (
      <Paper withBorder p="md" key={stat?.title}>
        <Group justify="space-between">
          <Text className="capitalize text-sm">{stat.title}</Text>
          <Icon size="1.4rem" stroke={1.5} />
        </Group>
        <Group align="flex-end" gap="xs" mt={25}>
          <Text className="text-2xl 2xl:text-4xl">{stat.value}</Text>
          <Text
            c={stat.diff > 0 ? "teal" : "red"}
            fz="sm"
            fw="500"
            className="font-medium"
          >
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={0.5} />
          </Text>
        </Group>
        <Text fz='xs' c='dimmed'>
            Compare to previous month
        </Text>
      </Paper>
    );
  });
  return <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>;
};

export default Stats;
