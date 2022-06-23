import { Button, Heading, HStack, Link, VStack } from "@chakra-ui/react";
import Container from "@components/Container";
import ContainerInside from "@components/ContainerInside";
import { NextPageContext } from "next";

export default function ({ video }) {
  return (
    <Container>
      <ContainerInside>
        {video ? (
          <VStack>
            <video src={video.url} controls />
            <HStack>
              <Button
                as={Link}
                href={video.url}
                download={`${video.author}-${video.id} (quicktok.win)`}
              >
                Download Video
              </Button>
              <Button
                variant="accent"
                as={Link}
                isExternal
                href={`https://m.tiktok.com/v/${video.id}`}
              >
                View
              </Button>
            </HStack>
          </VStack>
        ) : (
          <Heading>There was a problem loading the video</Heading>
        )}
      </ContainerInside>
    </Container>
  );
}

export async function getServerSideProps({ query }: NextPageContext) {
  const id = query.id;

  const video = await (
    await fetch(`https://api2.musical.ly/aweme/v1/aweme/detail/?aweme_id=${id}`)
  ).json();

  // if (!video.status_code)
  //   return {
  //     props: {
  //       video: null,
  //     },
  //   };

  return {
    props: {
      video: {
        url: video?.aweme_detail?.video?.play_addr?.url_list?.[0],
        author: video?.aweme_detail?.author?.unique_id,
        id: video?.aweme_detail?.aweme_id,
      },
    },
  };
}
