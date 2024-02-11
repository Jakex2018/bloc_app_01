import { Button, Group, TextInput, useMantineColorScheme } from "@mantine/core";
import useStore from "../store";
import { useInputState } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PasswordStrength from "./PasswordStrength";
import clsx from "clsx";
import { useSignin } from "../hooks/auth-hook";

/* eslint-disable react/prop-types */
const LoginForm = ({ isSignin, setIsSignin, toast, setFormClose, toggle }) => {
  const { colorScheme } = useMantineColorScheme();
  const { signIn } = useStore();
  const theme = colorScheme === "light";
  const navigate = useNavigate();
  const { data, isPending, isSuccess, mutate } = useSignin(toast, toggle);
  const [, /*strength*/ setStrength] = useState(0);
  const [passValue, setPassValue] = useInputState("");
  const handleSubmit = async (value) => {
    setFormClose(true);

    mutate({
      ...value,
      password: passValue,
    });

    if (isSuccess) {
      setFormClose(false);
      setTimeout(() => {
        signIn(data);
        navigate("/dashboard");
      }, 2000);
    }
  };
  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex flex-col gap-4"
    >
      <TextInput
        withAsterisk
        label="Email Adress"
        placeholder="your@email.com"
        {...form.getInputProps("email")}
      />
      <PasswordStrength
        value={passValue}
        setValue={setPassValue}
        setStrength={setStrength}
        isSignin={isSignin}
      />
      <Group
        className={clsx(
          "w-full flex",
          isSignin ? "justify-end" : "justify-between"
        )}
        mt="md"
      >
        <Button
          type="submit"
          className={clsx(theme ? "bg-blue-600" : "bg-black")}
        >
          Submit
        </Button>
      </Group>
      <p className="text-sm">
        {isSignin ? "Don`t have an account" : "Already has an account"}
        <span
          className="underline text-blue-600 ml-1 cursor-pointer"
          onClick={() => setIsSignin((prev) => !prev)}
        >
          {isSignin ? "Sign up" : "Sign in"}
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
