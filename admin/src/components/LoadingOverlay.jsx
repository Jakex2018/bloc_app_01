/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { LoadingOverlay } from "@mantine/core";

export default function Loading({ visible, toggle }) {
  // Note that position: relative is required
  return (
    <LoadingOverlay
      visible={visible}
      zIndex={1000}
      overlayProps={{ radius: "sm", blur: 2 }}
      loaderProps={{ color: "blue", type: "bars" }}
    />
  );
}
