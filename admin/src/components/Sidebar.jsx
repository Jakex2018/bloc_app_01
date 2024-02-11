/* eslint-disable react/prop-types */
import {
  ActionIcon,
  Stack,
  Tooltip,
  UnstyledButton,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { mockData } from "../utils";
import clsx from "clsx";
import { IconSun } from "@tabler/icons-react";
import { IconMoon } from "@tabler/icons-react";

const NavbarLink = ({ icon: Icon, label, active, onClick }) => {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        className={clsx(
          "flex items-center gap-2 px-4 py-1.5 rounded-full",
          active ? "bg-black text-white" : ""
        )}
        data-active={active || undefined}
        onClick={onClick}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
        {label}
      </UnstyledButton>
    </Tooltip>
  );
};

const Sidebar = ({ close = () => {} }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname?.slice(1);
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const handleClick = (to) => {
    close();
    navigate(to);
  };
  const links = mockData.map((link, index) => (
    <NavbarLink
      {...link}
      key={index}
      active={link.to === path}
      onClick={() => handleClick(link.to)}
    />
  ));
  return (
    <nav className="h-full flex flex-col gap-5 border-t mt-5 border-slate-700 px-6 2xl:px-14">
      <p className="py-2">Menu</p>
      <Stack justify="center" gap={10}>
        {links}
      </Stack>
      <ActionIcon
        onClick={() => {
          setColorScheme(colorScheme === "light" ? "dark" : "light");
        }}
        variant="default"
        size="xl"
        aria-aria-label="Toggle color scheme"
        className="w-full rounded-full mt-10"
      >
        {colorScheme === "dark" ? (
          <IconSun stroke={0.5} />
        ) : (
          <IconMoon stroke={0.5} />
        )}
      </ActionIcon>
    </nav>
  );
};

export default Sidebar;
