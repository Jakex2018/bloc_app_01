/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useDisclosure } from "@mantine/hooks";
import { useMantineColorScheme, Button, Modal } from "@mantine/core";
import useStore from "../store";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { MdArrowForward } from "react-icons/md";
import LoginForm from "../components/LoginForm.jsx";
import { Toaster, toast } from "sonner";
import SignUpForm from "../components/SignUpForm.jsx";
import Loading from "../components/LoadingOverlay.jsx";
const StartPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const [visible, { toggle }] = useDisclosure(false);
  const { user, signInModal, setSignInModal } = useStore();

  const [opened, { open, close }] = useDisclosure(signInModal);
  const [isSignin, setIsSignin] = useState(true);
  const [formClose, setFormClose] = useState(false);

  const theme = colorScheme === "light";
  const navigate = useNavigate();
  const location = useLocation();

  let from = location?.state?.from?.pathname || "/";
  useEffect(() => {
    user?.token && navigate(from);
  }, [user]);

  const handleCloseModal = () => {
    close();
    setIsSignin(!signInModal);
  };
  return (
    <div
      className={clsx(
        "w-full h-screen px-0 md:px-4 overflow-hidden",
        theme
          ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#302943] via-slate-900 to-black"
          : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#fff] via-blue-50 to-white"
      )}
    >
      <Navbar />
      <div className="w-full h-full flex flex-col items-center justify-center md:pt-24">
        <div className="w-full 2xl:max-w-3xl flex flex-col items-center justify-center gap-y-10 2xl:-mt-20">
          <span
            className={clsx(
              "hidden md:flex gap-1 py-1 font-semibold px-3 border rounded-full text-sm md:text-base",
              theme
                ? "border-gray-700 text-gray-400"
                : "border-gray-300 text-gray-600"
            )}
          >
            Unleash Your Words, and share with others{" "}
            <Link
              className={clsx(
                "flex gap-1 items-center font-semibold text-[18px]",
                theme ? "text-white" : "to-slate-700"
              )}
            >
              Join Now
              <MdArrowForward />
            </Link>
          </span>
          <h1
            className={clsx(
              "text-4xl 2xl:text-5xl font-bold text-center",
              theme ? "to-gray-400" : "to-slate-700"
            )}
          >
            Join Our Community of Passionate Writers!
          </h1>
          <span
            className={clsx(
              "text-center text-base md:text-[18px]",
              theme ? "text-gray-500" : "text-slate-600"
            )}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </span>
          <div className="flex gap-6 items-center mt-6">
            <Button
              onClick={open}
              className={clsx(
                "text-white rounded h-10 text-sm",
                theme ? "bg-blue-600" : "bg-black"
              )}
            >
              Get Started
            </Button>
            <Link
              to="#"
              className={clsx(
                "flex items-center gap-2 font-semibold",
                theme ? "text-white" : "bg-transparent"
              )}
            >
              Contact
              <MdArrowForward />
            </Link>
          </div>
        </div>
      </div>
      <Modal
        opened={opened || signInModal}
        onClose={formClose ? () => {} : handleCloseModal}
        title="User Authentication"
        centered
      >
        {isSignin ? (
          <LoginForm
            isSignin={isSignin}
            setFormClose={setFormClose}
            setIsSignin={setIsSignin}
            toast={toast}
            toggle={toggle}
          />
        ) : (
          <SignUpForm
            isSignin={isSignin}
            setFormClose={setFormClose}
            setIsSignin={setIsSignin}
            toast={toast}
            toggle={toggle}
          />
        )}
        <Loading visible={visible} />
        <Toaster richColors />
      </Modal>
    </div>
  );
};

export default StartPage;
