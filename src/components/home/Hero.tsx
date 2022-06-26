import { Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Container from "@components/Container";
import ContainerInside from "@components/ContainerInside";
import EnhancedChakraLink from "@components/EnhancedChakraLink";

export default function Hero() {
  return (
    <Container py={40}>
      <ContainerInside as={VStack} justify="center" spacing={4}>
        <Heading size="3xl" as="h1">
          ClickTok
        </Heading>
        <Text maxW="50ch" textAlign="center">
          ClickTok is a simple Discord bot that allows you to embed Tiktok
          videos easily in Discord server.
        </Text>
        <HStack spacing={4}>
          <Button as={EnhancedChakraLink} href="/invite" isExternal>
            Invite Bot
          </Button>
          <Button
            as={EnhancedChakraLink}
            href="/support"
            variant="accent"
            isExternal
          >
            Support
          </Button>
        </HStack>
      </ContainerInside>
    </Container>
  );
}
