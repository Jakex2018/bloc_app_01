/* eslint-disable react/prop-types */
import {
  Box,
  Center,
  Group,
  PasswordInput,
  Progress,
  Text,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

function PasswordRequirement({ meets, label }) {
  return (
    <Text component="div" c={meets ? "teal" : "red"} mt={5} size="sm">
      <Center inline>
        {meets ? (
          <IconCheck size="0.8rem" stroke={1.5} />
        ) : (
          <IconX size="0.9rem" stroke={1.5} />
        )}
      </Center>
      <Box ml={7}>{label}</Box>
    </Text>
  );
}
/* eslint-disable react/prop-types */
export const PasswordStrength = ({
  value,
  setValue,
  setStrength,
  isSignin,
}) => {
  const strength = getStrength(value);
  setStrength(strength);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));
  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ section: { transitionDuration: "0ms" } }}
        value={
          value.length > 0 && index === 0
            ? 100
            : strength >= ((index + 1) / 4) * 100
            ? 100
            : 0
        }
        color={strength > 80 ? "teal" : strength > 50 ? "yellow" : "red"}
        key={index}
        size={4}
      />
    ));
  return (
    <div className="w-full">
      <PasswordInput
        value={value}
        onChange={setValue}
        placeholder="your password"
        label="password"
        required
      />
      {!isSignin && (
        <>
          <Group gap={5} grow mt="xs" mb="md">
            {bars}
          </Group>
          <PasswordRequirement
            label="Has at least 6 characters"
            meets={value.length > 5}
          />
          {checks}
        </>
      )}
    </div>
  );
};

export default PasswordStrength;
