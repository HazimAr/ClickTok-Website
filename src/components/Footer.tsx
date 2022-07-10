import { HStack, VStack, Link } from "@chakra-ui/react";
import EnhancedChakraLink from "./EnhancedChakraLink";

export default function Footer() {
  return (
    <VStack as="footer" py={4}>
      <HStack>
        <EnhancedChakraLink
          href="/privacypolicy.pdf"
          target="_blank"
          _hover={{
            textDecor: "underline",
          }}
        >
          Privacy Policy
        </EnhancedChakraLink>
        <p>|</p>
        <EnhancedChakraLink
          href="/terms.pdf"
          target="_blank"
          _hover={{
            textDecor: "underline",
          }}
        >
          Terms Of Use
        </EnhancedChakraLink>
      </HStack>
      <EnhancedChakraLink
        href="https://forms.gle/4FfMCWTj4mSJinAu5"
        target="_blank"
        _hover={{
          textDecor: "underline",
        }}
      >
        Data Removal Request
      </EnhancedChakraLink>
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
