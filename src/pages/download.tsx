import { Heading, HStack, VStack, Text, Input, Button } from "@chakra-ui/react";
import Container from "@components/Container";
import ContainerInside from "@components/ContainerInside";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Download() {
  const [url, setUrl] = useState("");
  const router = useRouter();
  return (
    <Container py={40}>
      <ContainerInside as={VStack} justify="center" spacing={4}>
        <Heading size="3xl" as="h1">
          QuickTok Downloader
        </Heading>
        <Text maxW="50ch" textAlign="center">
          The easiest way to download TikTok videos.
        </Text>
        <HStack spacing={4}></HStack>
        <Input
          placeholder="Enter TikTok video URL"
          size="md"
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          onClick={async () => {
            axios
              .get(`${location.origin}/api/getId?url=${url}`)
              .then(({ data }) => {
                router.push(`/v/${data.id}`);
              });
          }}
        >
          Download
        </Button>
      </ContainerInside>
    </Container>
  );
}

// Usage:
// Text field someone can put tiktok link wether short or long
// if long search for id in the url and can redirect to /v/:id
// if id is not there use the client to make request to get the video id
// this will save on requests from the server example url "https://abstract.land/api/proxy/tiktok.com/t/ZSd3XPeS1/?k=1"
// "abstract.land/api/proxy/" is a cors bypass just make get request to the url and get the video from final url (or Location header)
