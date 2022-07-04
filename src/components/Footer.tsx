import { HStack, VStack } from "@chakra-ui/react";
import EnhancedChakraLink from "./EnhancedChakraLink";

export default function footer() {
  return (
    <VStack as="footer" py={4}>
      <HStack>
        <EnhancedChakraLink href="/privacy">Privacy Policy </EnhancedChakraLink>{" "}
        <p>|</p>
        <EnhancedChakraLink href="/terms">Terms Of Use</EnhancedChakraLink>
        
      </HStack>
      {/* <Link
        href="https://hazim.tech"
        _hover={{
          textDecor: "underline",
        }}
        isExternal
      >
        Designed & Developed with<span>💖</span>
        by: <span style={{ fontWeight: "bold" }}>Hazim Arafa</span>
      </Link> */}
      <EnhancedChakraLink href="https://forms.gle/4FfMCWTj4mSJinAu5" target="_blank">Data Removal Request</EnhancedChakraLink>
    </VStack>
  );
}
