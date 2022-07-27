import { Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Container from "@components/Container";
import ContainerInside from "@components/ContainerInside";
import EnhancedChakraLink from "@components/EnhancedChakraLink";
import { FaDiscord, FaInfo } from "react-icons/fa";

export default function Hero() {
  return (
    <Container py={40}>
      <ContainerInside as={VStack} justify="center" spacing={4}>
        <Heading size="3xl" as="h1">
          ClickTok
        </Heading>
        <Text maxW="50ch" textAlign="center">
          Embed TikTok videos, receive TikTok notifications, and view TikTok
          stats easily in your server. The Officially VERIFIED TikTok Discord
          bot.
        </Text>
        <HStack spacing={4}>
          <Button
            leftIcon={<FaDiscord />}
            as={EnhancedChakraLink}
            href="/invite"
            isExternal
          >
            Invite Bot
          </Button>
          <Button
            leftIcon={<FaInfo />}
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
