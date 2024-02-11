/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Button, Group, TextInput, useMantineColorScheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useInputState } from "@mantine/hooks";
import { useEffect, useState } from "react";
import PasswordStrength from "./PasswordStrength";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { BiImage } from "react-icons/bi";
import { uploadFile } from "../utils/index.js";
import { useSignup } from "../hooks/auth-hook";

// eslint-disable-next-line react/prop-types
const SignUpForm = ({ isSignin, setIsSignin, toggle, toast, setFormClose }) => {
  const { mutate } = useSignup(toast, toggle);
  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "light";
  const [strength, setStrength] = useState(0);
  const [file, setFile] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [passValue, setPassValue] = useInputState("");
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      firstName: (value) =>
        value.length < 3 ? "First Name is too short" : null,
      lastName: (value) => (value.length < 2 ? "Last Name is too short" : null),
    },
  });
  const handleSubmit = async (value) => {
    if (!isSignin && strength < 90) return;
    setFormClose(true);
    console.log(file)
    const res = mutate({
      ...value,
      password: passValue,
      image: fileURL,
      accountType: "writer",
    });
  };

  useEffect(() => {
    file && uploadFile(setFileURL, file);
  }, [file]);
  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex flex-col gap-3"
    >
      <div className="w-full flex gap-2">
        <TextInput
          label="First Name"
          withAsterisk
          className="w-full"
          placeholder="First Name"
          {...form.getInputProps("firstName")}
        />
        <TextInput
          label="Last Name"
          withAsterisk
          className="w-full"
          placeholder="Last Name"
          {...form.getInputProps("lastName")}
        />
      </div>
      <TextInput
        label="Email Address"
        withAsterisk
        placeholder="your@email.com"
        {...form.getInputProps("email")}
      />
      <PasswordStrength
        value={passValue}
        setValue={setPassValue}
        setStrength={setStrength}
        isSignin={false}
      />
      <Group className="w-full flex justify-between" mt="md">
        <div className="flex flex-col items-center justify-between">
          <label
            htmlFor="imgUpload"
            className={clsx(
              "flex items-center gap-1 text-base cursor-pointer",
              theme ? "text-gray-500" : "text-gray-700"
            )}
          >
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              id="imgUpload"
              data-max-size="5120"
              accept=".jpg, .png, .jpeg"
            />
            <BiImage />
            <span>Picture</span>
          </label>
        </div>
        <Button
          type="submit"
          className={clsx(theme ? "bg-blue-600" : "bg-black")}
        >
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default SignUpForm;
