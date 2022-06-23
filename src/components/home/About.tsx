import { Button, Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import Container from "@components/Container";
import ContainerInside from "@components/ContainerInside";
import EnhancedChakraLink from "@components/EnhancedChakraLink";

const data = [
  {
    title: "Easily embed Tiktok videos",
    description:
      "QuickTok is a simple Discord bot that allows you to embed Tiktok videos easily in Discord server.",
    button: "Start Embedding",
    img: "/embed.gif",
  },
  {
    title: "View all the info about a video",
    description:
      "QuickTok is a simple Discord bot that allows you to embed Tiktok videos easily in Discord server.",
    button: "Start Viewing",
    img: "/view.gif",
  },
  {
    title: "Download the video straight to your computer",
    description:
      "QuickTok is a simple Discord bot that allows you to embed Tiktok videos easily in Discord server.",
    button: "Start Downloading",
    img: "/download.png",
  },
];

export default function () {
  return (
    <Container py={10}>
      <ContainerInside>
        {data.map((item, index) => (
          <Section
            key={item.title}
            title={item.title}
            description={item.description}
            button={item.button}
            img={item.img}
            index={index}
          />
        ))}
      </ContainerInside>
    </Container>
  );
}

function Section({ title, description, button, img, index }) {
  return (
    <HStack
      justify="space-between"
      spacing={0}
      flexDir={index % 2 == 0 ? "row" : "row-reverse"}
      py={20}
    >
      <Stack w="50%" px={5}>
        <Heading>{title}</Heading>
        <Text>{description}</Text>
        <Button
          w="fit-content"
          as={EnhancedChakraLink}
          href="/invite"
          isExternal
        >
          {button}
        </Button>
      </Stack>
      <Image src={img} w="50%" px={5} />
    </HStack>
  );
}

// embed
// View info
// Download Videos
