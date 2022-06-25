import { Button, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";
import Container from "@components/Container";
import ContainerInside from "@components/ContainerInside";
import EnhancedChakraLink from "@components/EnhancedChakraLink";
import { NextPageContext } from "next";
import Head from "next/head";

export default function ({ video }) {
  return (
    <>
      <Head>
        <title>{video.author || "Error Loading Video"} | QuickTok</title>
        <meta
          property="og:description"
          content={
            video.author
              ? `Check out ${video.author}'s video!`
              : "This can be due to TikTok taking down the video or the video being deleted."
          }
        />
      </Head>
      <Container py={10}>
        <ContainerInside as={VStack}>
          {video.url ? (
            <>
              <video src={video.url} width="300" controls />
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
  a.download = `${authorName}-${videoId} (quicktok.win).mp4`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
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
        url: video?.aweme_detail?.video?.play_addr?.url_list?.[0] || null,
        author: video?.aweme_detail?.author?.unique_id || null,
        id: video?.aweme_detail?.aweme_id || null,
      },
    },
  };
}
