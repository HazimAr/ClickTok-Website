import {
  Heading,
  HStack,
  VStack,
  Text,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import Container from "@components/Container";
import ContainerInside from "@components/ContainerInside";
import { ReactElement, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";

const Download = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>TikTok Downloader | ClickTok</title>
        <meta
          property="og:description"
          content="Download TikTok videos from the web!"
        />
        <meta
          itemProp="description"
          content="Download TikTok videos from the web!"
        />
      </Head>
      <Container py={40}>
        <ContainerInside as={VStack} justify="center" spacing={4}>
          <Heading size="3xl" as="h1">
            TikTok Downloader
          </Heading>
          <Text maxW="50ch" textAlign="center">
            The easiest way to download TikTok videos.
          </Text>
          <HStack spacing={4}></HStack>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!checkValidTikTokUrl(url))
                return toast({
                  title: "Invalid URL",
                  description: "Please enter a valid TikTok URL.",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              setLoading(true);

              router.push(`/v/${await getIdFromUrl(url)}`);
            }}
          >
            <VStack>
              <Input
                placeholder="Enter TikTok video URL"
                minW="300px"
                onChange={(e) => setUrl(e.target.value)}
                isRequired
                _placeholder={{ color: "white" }}
              />
              <Button type="submit" isLoading={loading}>
                Download
              </Button>
            </VStack>
          </form>
        </ContainerInside>
      </Container>
    </>
  );
};

Download.getLayout = (page: ReactElement) => {
  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  );
};

export default Download;

function checkValidTikTokUrl(url) {
  let regex =
    /(http:|https:\/\/)?(www\.)?tiktok\.com\/(@.{1,24})\/video\/(\d{15,30})/;
  let match = url.match(regex);
  if (match) return true;

  regex = /(http:|https:\/\/)?((?!ww)\w{2})\.tiktok.com\/(\w{5,15})/;
  match = url.match(regex);
  if (match) return true;

  regex = /(http:|https:\/\/)?(www\.)?tiktok.com\/t\/(\w{5,15})/;
  match = url.match(regex);
  if (match) return true;

  regex = /(http:|https:\/\/)?m\.tiktok\.com\/v\/(\d{15,30})/;
  match = url.match(regex);
  if (match) return true;

  regex = /(http:|https:\/\/)?(www)?\.tiktok\.com\/(.*)item_id=(\d{5,30})/;
  match = url.match(regex);
  if (match) return true;

  return false;
}

// Usage:
// Text field someone can put tiktok link wether short or long
// if long search for id in the url and can redirect to /v/:id
// if id is not there use the client to make request to get the video id
// this will save on requests from the server example url "https://abstract.land/api/proxy/tiktok.com/t/ZSd3XPeS1/?k=1"
// "abstract.land/api/proxy/" is a cors bypass just make get request to the url and get the video from final url (or Location header)

async function getId(url: string, regex: RegExp) {
  let match = url.match(regex);
  if (!match) return null;
  let id = match[match.length - 1];

  if (isNaN(parseInt(id)) && url.length > 5) {
    id = await axios
      .get(url)
      .then(async (response) => {
        return await getIdFromUrl(response.request.res.responseUrl);
      })
      .catch(() => null);
  }
  return id;
}

async function getIdFromUrl(url: string) {
  let regex =
    /(http:|https:\/\/)?(www\.)?tiktok\.com\/(@.{1,24})\/video\/(\d{15,30})/;
  let id = await getId(url, regex);
  if (id) return id;

  regex = /(http:|https:\/\/)?((?!ww)\w{2})\.tiktok.com\/(\w{5,15})/;
  id = await getId(url, regex);
  // get real id from tiktok
  if (id) return id;

  regex = /(http:|https:\/\/)?(www\.)?tiktok.com\/t\/(\w{5,15})/;
  id = await getId(url, regex);
  // get real id from tiktok
  if (id) return id;

  regex = /(http:|https:\/\/)?m\.tiktok\.com\/v\/(\d{15,30})/;
  id = await getId(url, regex);
  if (id) return id;

  regex = /(http:|https:\/\/)?(www)?\.tiktok\.com\/(.*)item_id=(\d{5,30})/;
  id = await getId(url, regex);
  if (id) return id;

  return null;
}
