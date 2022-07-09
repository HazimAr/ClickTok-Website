import { Box } from "@chakra-ui/react";

export default function Card({ children = null, ...props }) {
  return (
    <Box
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      rounded="lg"
      p={6}
      {...props}
    >
      {children}
    </Box>
  );
}
