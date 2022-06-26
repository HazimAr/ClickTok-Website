import { HStack, Link, VStack } from "@chakra-ui/react";
import EnhancedChakraLink from "./EnhancedChakraLink";

export default function footer() {
  return (
    <VStack as="footer">
      <HStack>
        <EnhancedChakraLink href="/privacy">Privacy Policy </EnhancedChakraLink>{" "}
        <p>|</p>
        <EnhancedChakraLink href="/terms">Terms Of Use</EnhancedChakraLink>
      </HStack>
      <Link
        href="https://hazim.tech"
        _hover={{
          textDecor: "underline",
        }}
        isExternal
      >
        Designed & Developed with<span>💖</span>
        by: <span style={{ fontWeight: "bold" }}>Hazim Arafa</span>
      </Link>
    </VStack>
  );
}
