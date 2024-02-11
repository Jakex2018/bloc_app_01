/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  Drawer,
  Menu,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import useStore from "../store";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  MdArrowForward,
  AiOutlineLogout,
  BiMenu,
  IconTrash,
  FaFacebook,
  FaInstagram,
  FaTwitterSquare,
  FaYoutube,
  FaUser,
} from "../assets/index.js";
import Logo from "./Logo.jsx";
import { clsx } from "clsx";

import { useDisclosure } from "@mantine/hooks";
import Sidebar from "./Sidebar.jsx";

const MobileDrawer = ({ theme }) => {
  const { user } = useStore();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Sidebar close={close} />
        <div className="w-full mt-12">
          <UserMenu user={user?.user} theme={theme} />
        </div>
        <Button
          className={theme ? "text-white" : "text-slate-800"}
          onClick={open}
        >
          <BiMenu className="text-xl" />
        </Button>
      </Drawer>
      <Button
        className={theme ? "text-white" : "text-slate-800"}
        onClick={open}
      >
        <BiMenu className="text-xl" />
      </Button>
    </>
  );
};

const UserMenu = ({ user, theme }) => {
  const navigate = useNavigate();
  const { signOut } = useStore();
  const handleSignOut = () => {
    localStorage.removeItem("user");
    signOut();
  };
  return ( 
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          className={clsx(
            "flex items-center",
            theme ? "text-gray-400" : "text-black"
          )}
        >
          <img src={user?.image} alt="" className="w-8 h-8 rounded-full" />
          <div className="flex flex-col items-start ml-1">
            <p className="font-medium">{user.name}</p>
            <span className="text-sm font-normal">{user.accountType}</span>
          </div>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item
          left={<FaUser style={{ width: rem(14), height: rem(14) }} />}
        >
          login
        </Menu.Item>
        <Menu.Item
          leftSection={
            <AiOutlineLogout style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={() => handleSignOut()}
        >
          Sign Out
        </Menu.Item>
        <Menu.Divider>
          <Menu.Label>Danger Zone</Menu.Label>
          <Menu.Item
            leftSection={
              <IconTrash style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={() => {}}
          >
            Delete Account
          </Menu.Item>
        </Menu.Divider>
      </Menu.Dropdown>
    </Menu>
  );
};

const Navbar = () => {
  const { colorScheme } = useMantineColorScheme();
  const { user, signInModal, setSignInModal } = useStore((state) => state);
  const location = useLocation();
  const theme = colorScheme === "dark";
  const handleLogin = () => {
    location.pathname === "/auth" && setSignInModal(!signInModal);
  };
  return (
    <div className="w-full fixed top-0 bg-transparent z-50 flex flex-row px-4 md:px-6 py-4 md:py-5 items-center justify-between gap-4 shadow">
      {user && (
        <div className="block lg:hidden">
          <MobileDrawer theme={theme} />
        </div>
      )}
      <div className="hidden lg:flex gap-2 text-[20px]">
        <Link to="/" className="text-red-600">
          <FaYoutube />
        </Link>
        <Link to="/" className="text-blue-600">
          <FaFacebook />
        </Link>
        <Link to="/" className="text-rose-600">
          <FaInstagram />
        </Link>
        <Link to="/" className="text-blue-400">
          <FaTwitterSquare />
        </Link>
      </div>
      <Logo type="signin" />
      <div className="flex gap-14 items-center">
        <div className="flex gap-2 items-center">
          {user?.token ? (
            <UserMenu user={user?.user} theme={theme} />
          ) : (
            <Link
              to="/auth"
              onClick={handleLogin}
              className={clsx(
                "flex items-center rounded-full gap-2 2xl:mr-10 text-base",
                theme ? "text-black" : "text-white"
              )}
            >
              <span>Login</span>
              <MdArrowForward />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
