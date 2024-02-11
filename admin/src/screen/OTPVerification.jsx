/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Paper, PinInput, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import useStore from "../store";
import { useResend, useVerification } from "../hooks/auth-hook";
import Loading from "../components/LoadingOverlay";
const OTPVerification = () => {
  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "light";
  const navigate = useNavigate();
  const optData = JSON.parse(localStorage.getItem("otp_data"));
  const [visible, { toggle }] = useDisclosure(false);
  const [seconds, setSeconds] = useState(120);
  const { user } = useStore((state) => state);
  const { mutate, isPending } = useVerification(toast, toggle);
  const [countdown, setCountdown] = useState(null);
  const resendOTP = useResend(toast, toggle);
  //if (!optData?.isOTPLevel) navigate("/auth");
  //if (user?.emailVerified) navigate("/");
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const handleResendOTP = () => {
    resendOTP.mutate(optData.id);
  };
  const handleSubmit = (value) => {
    mutate({ id: optData.id, otp: value });
  };

  useEffect(() => {
    setCountdown(
      setInterval(() => {
        setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000)
    );
    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(countdown);
    }
  }, [seconds, countdown]);

  return (
    <div
      className={clsx(
        "w-full h-screen flex flex-col items-center justify-center",
        theme
          ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#302943] via-slate-900 to-black"
          : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#fff] via-blue-50 to-white"
      )}
    >
      <Paper
        shadow="lg"
        p="xl"
        className={clsx(theme ? "bg-[#0e1627]" : "bg-white")}
      >
        <div className="flex flex-col items-center justify-center mb-6">
          <p
            className={clsx(
              "text-2xl font-semibold text-center",
              theme ? "text-gray-400" : "text-slate-700"
            )}
          >
            OTV Verification
          </p>
          <span
            className={clsx(
              "text-sm mb-3",
              theme ? "text-gray-400" : "text-slate-700"
            )}
          >
            Please OPT code sent to your mail.
          </span>
          <PinInput
            oneTimeCode
            autoFocus={true}
            type="number"
            length={6}
            size="xl"
            onComplete={(value) => handleSubmit(value)}
          />
          <div className="pt-5 flex items-center justify-center gap-3 text-base">
            {seconds === 0 ? (
              <a
                onClick={() => handleResendOTP()}
                className="text-base text-blue-600 underline cursor-pointer"
              >
                Resend
              </a>
            ) : (
              <>
                <p>OTP will expire in:</p>
                <span className="text-rose-600 font-semibold">
                  {formatTime(seconds)}
                </span>
              </>
            )}
          </div>
        </div>
        <Loading visible={isPending || resendOTP.isPending} />
        <Toaster richColors />
      </Paper>
    </div>
  );
};

export default OTPVerification;
