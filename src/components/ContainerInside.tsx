import { Box } from "@chakra-ui/react"

export default function ContainerInside({ children, ...props }) {
  return (
    <Box maxW="7xl" w="100%" px={6} {...props}>
      {children}
    </Box>
  )
}
