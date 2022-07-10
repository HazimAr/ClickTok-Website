import { Box, Skeleton } from "@chakra-ui/react";

export default function Card({ children = null, isLoaded = false, ...props }) {
  return (
    <Skeleton isLoaded={isLoaded} rounded="lg">
      <Box
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        p={6}
        rounded="lg"
        {...props}
      >
        {children}
      </Box>
    </Skeleton>
  );
}
