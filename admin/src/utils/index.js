import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "./firebase";
///import * as Mantine from "@mantine/core";
import * as TablerIcons from "@tabler/icons-react";
import * as IconsBS from "react-icons/bs";
import { FaUser, FaUserCog } from "react-icons/fa";

export function createSlug(title) {
  // Convert the title to lowercase
  const slug = title.toLowerCase();

  // Replace non-alphanumeric characters with hyphens
  const hyphenatedSlug = slug.replace(/[^a-z0-9]+/g, "-");

  // Remove any leading or trailing hyphens
  const trimmedSlug = hyphenatedSlug.trim("-");

  return trimmedSlug;
}

export const API_URI = "http://localhost:3000";
export default function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export const uploadFile = (setFileURL, file) => {
  const storage = getStorage(app);
  const name = new Date().getTime() + file.name;
  const storageRef = ref(storage, name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      console.error(error);
      // Manejar el error, por ejemplo, mostrando un mensaje al usuario
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("Successfully uploaded");
        setFileURL(downloadURL);
      });
    }
  );
};

export const iconsAnalytics = {
  user: FaUserCog,
  view: IconsBS.BsEye,
  post: IconsBS.BsPostcardHeart,
  users: FaUser,
};

export const mockData = [
  {
    icon: TablerIcons.IconGauge,
    label: "Dashboard",
    to: "dashboard",
  },
  {
    icon: TablerIcons.IconDeviceDesktopAnalytics,
    label: "Analytics",
    to: "analytics",
  },
  {
    icon: TablerIcons.IconCalendarStats,
    label: "Content",
    to: "content",
  },
  {
    icon: TablerIcons.IconUser,
    label: "Followers",
    to: "followers",
  },
  {
    icon: IconsBS.BsPencil,
    label: "Create Post",
    to: "write",
  },
  {
    icon: TablerIcons.IconSettings,
    label: "Settings",
  },
];

export function getInitials(fullName) {
  const names = fullName.split("");

  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
  const initialsStr = initials.join("");
  return initialsStr;
}

export const updateURL = ({ page, navigate, location }) => {
  const params = new URLSearchParams();
  if (page && page > 1) {
    params.set("page", page);
  }
  const newURL = `${location.pathname}?${params.toString()}`;
  navigate(newURL, { replace: true });
  return newURL;
};
