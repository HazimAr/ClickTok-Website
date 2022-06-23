import { Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Container from "@components/Container";
import ContainerInside from "@components/ContainerInside";
import EnhancedChakraLink from "@components/EnhancedChakraLink";

export default function Hero() {
  return (
    <Container>
      <ContainerInside as={VStack} justify="center" minH="100vh">
        <Heading size="3xl">QuickTok</Heading>
        <Text maxW="50ch" textAlign="center">
          QuickTok is a simple Discord bot that allows you to embed Tiktok
          videos in Discord channels.
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
