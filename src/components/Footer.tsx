import { HStack, VStack } from "@chakra-ui/react";
import EnhancedChakraLink from "./EnhancedChakraLink";

export default function footer() {
  return (
    <VStack as="footer">
      <HStack>
        <EnhancedChakraLink href="/privacy">Privacy Policy </EnhancedChakraLink>{" "}
        <p>|</p>
        <EnhancedChakraLink href="/terms">Terms Of Use</EnhancedChakraLink>
      </HStack>
    </VStack>
  );
}
