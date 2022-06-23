import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import Container from "@components/Container";
import ContainerInside from "@components/ContainerInside";
import EnhancedChakraLink from "@components/EnhancedChakraLink";

export default function Hero() {
  return (
    <Container>
      <ContainerInside as={VStack}>
        <Heading size="3xl">QuickTok</Heading>
        <Text maxW="50ch" textAlign="center">
          QuickTok is a simple Discord bot that allows you to embed Tiktok
          videos in Discord channels.
        </Text>
        <Button as={EnhancedChakraLink} href="/invite" isExternal>
          Invite Bot
        </Button>
      </ContainerInside>
    </Container>
  );
}
