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
import Footer from "@components/Footer";
import Header from "@components/Header";
import { NextPageContext } from "next";
import Head from "next/head";
import { ReactElement } from "react";
import { FaMusic } from "react-icons/fa";

const videoId = ({ video }) => {
  return (
    <>
      <Head>
        <title>
          {`${
            video
              ? `Check out ${video.author.name}'s video!`
              : "Error Loading Video"
          }
          | ClickTok`}
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
        <meta name="theme-color" content="#9B77E9" />

        <meta property="og:video" content={video?.url} />
        <meta property="og:video:secure_url" content={video?.url} />
        <meta property="og:video:type" content="video/mp4" />
        <meta property="og:video:width" content="300" />
        <meta property="og:video:height" content="533" />
      </Head>
      <Container py={10}>
        <ContainerInside as={Stack} w="400px">
          {video ? (
            <>
              <VStack>
                <video
                  src={video.url}
                  width="300"
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
              <HStack
                py={2}
                as={Link}
                href={`https://tiktok.com/@${video.author.username}`}
                isExternal
                _hover={{ color: "white", textDecor: "underline" }}
              >
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
                    downloadVideo(video.url, video.author.username, video.id);
                  }}
                >
                  Download Video
                </Button>
                <Button
                  as={Link}
                  onClick={() => {
                    downloadAudio(video.music, video.author.username, video.id);
                  }}
                >
                  Download Audio
                </Button>
              </HStack>
              <Button
                variant="accent"
                as={Link}
                isExternal
                href={`https://m.tiktok.com/v/${video.id}`}
              >
                View
              </Button>
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
};

videoId.getLayout = (page: ReactElement) => {
  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  );
};

export default videoId;

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

async function downloadAudio(
  audioUrl: RequestInfo | URL,
  authorName: string,
  videoId: string
) {
  const res = await fetch(audioUrl);
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = `${authorName}-${videoId} (clicktok.xyz).mp3`;
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
        audio: video.aweme_detail.music.play_url.url_list[0],
        description: video.aweme_detail.desc,
        music: video.aweme_detail.music?.title || "N/A",
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
