import { Button, Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import Container from "@components/Container";
import ContainerInside from "@components/ContainerInside";
import EnhancedChakraLink from "@components/EnhancedChakraLink";

const data = [
  {
    title: "Easily embed Tiktok videos",
    description:
      "ClickTok is a simple Discord bot that allows you to embed Tiktok videos easily in your Discord server.",
    button: "Start Embedding",
    img: "/embed.gif",
  },
  {
    title: "View info about a video",
    description:
      "Grab info about a Tiktok video like the title, author, and description.",
    button: "Start Viewing",
    img: "/view.gif",
  },
  {
    title: "Download straight to your computer",
    description: "Download TikTok's for free.",
    button: "Start Downloading",
    href: "/download",
    img: "/download.gif",
  },
];

export default function () {
  return (
    <Container py={10} id="#about">
      <ContainerInside>
        {data.map((item, index) => (
          <Section {...item} index={index} key={item.title} />
        ))}
      </ContainerInside>
    </Container>
  );
}

function Section({ title, description, button, img, index, href = null }) {
  return (
    <HStack
      justify="space-between"
      spacing={0}
      flexDir={{ base: "column", md: index % 2 == 0 ? "row" : "row-reverse" }}
      py={20}
      gap={20}
    >
      <Stack w={{ base: "100%", md: "50%" }}>
        <Heading>{title}</Heading>
        <Text>{description}</Text>
        <Button
          w="fit-content"
          as={EnhancedChakraLink}
          href={href || "/invite"}
          isExternal
        >
          {button}
        </Button>
      </Stack>
      <Image src={img} w={{ base: "100%", md: "50%" }} borderRadius="lg" />
    </HStack>
  );
}
