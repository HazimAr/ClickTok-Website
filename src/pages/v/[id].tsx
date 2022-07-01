import {
  Avatar,
  Button,
  Divider,
  Heading,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Container from "@components/Container";
import ContainerInside from "@components/ContainerInside";
import EnhancedChakraLink from "@components/EnhancedChakraLink";
import { NextPageContext } from "next";
import Head from "next/head";
import { FaMusic } from "react-icons/fa";

export default function ({ video }) {
  return (
    <>
      <Head>
        <title>
          {video
            ? `Check out ${video.author.name}'s video!`
            : "Error Loading Video"}{" "}
          | ClickTok
        </title>
        <meta
          property="og:title"
          content={`${
            video
              ? `Check out ${video.author.name}'s video!`
              : "Error Loading Video"
          } | ClickTok`}
        />
        <meta
          property="og:description"
          content={
            video
              ? video.description
              : "This can be due to TikTok taking down the video or the video being deleted."
          }
        />
      </Head>
      <Container py={10}>
        <ContainerInside as={Stack} w="400px">
          {video ? (
            <>
              <VStack>
                <video
                  src={video.url}
                  width="75%"
                  controls
                  style={{ borderRadius: "10px" }}
                />
              </VStack>
              <Text>{video.description}</Text>
              <HStack>
                <Icon as={FaMusic} />
                <Text>{video.music}</Text>
              </HStack>
              <Divider />
              <HStack py={2}>
                <Avatar src={video.author.icon} name={video.author.name} />
                <Stack spacing={0}>
                  <Heading fontSize="lg">{video.author.username}</Heading>
                  <Text>
                    {video.author.name} •{" "}
                    {new Date(video.created * 1000).toLocaleDateString()}
                  </Text>
                </Stack>
              </HStack>
              <Divider />
              <HStack>
                <Button
                  as={Link}
                  onClick={() => {
                    downloadVideo(video.url, video.author, video.id);
                  }}
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
            </>
          ) : (
            <>
              <Heading>Oh no! It seems that this video is unavailable.</Heading>
              <Text>
                This can be due to TikTok taking down the video or the video
                being deleted.
              </Text>
              <Button as={EnhancedChakraLink} href="/">
                Back Home
              </Button>
            </>
          )}
        </ContainerInside>
      </Container>
    </>
  );
}

async function downloadVideo(
  videoUrl: RequestInfo | URL,
  authorName: string,
  videoId: string
) {
  const res = await fetch(videoUrl);
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = `${authorName}-${videoId} (clicktok.xyz).mp4`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}

export async function getServerSideProps({ query }: NextPageContext) {
  const id = query.id;

  const video = await (
    await fetch(`https://api2.musical.ly/aweme/v1/aweme/detail/?aweme_id=${id}`)
  ).json();

  if (!video?.aweme_detail)
    return {
      props: { video: null },
    };
  return {
    props: {
      video: {
        url: video.aweme_detail.video.download_addr.url_list[0],
        description: video.aweme_detail.desc,
        music: video.aweme_detail.music.title,
        author: {
          name: video.aweme_detail.author.nickname,
          username: video.aweme_detail.author.unique_id,
          icon: video.aweme_detail.author.avatar_thumb.url_list[0],
        },
        id: video.aweme_detail.aweme_id,
        created: video.aweme_detail.create_time,
      },
    },
  };
}
