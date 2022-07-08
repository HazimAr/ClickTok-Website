import {
  Button,
  Heading,
  HStack,
  Stack,
  Image,
  SimpleGrid,
  VStack,
  Box,
} from "@chakra-ui/react";
import Container from "@components/Container";
import ContainerInside from "@components/ContainerInside";
import Header from "@components/Header";
import axios from "axios";
import { unstable_getServerSession } from "next-auth";
import { Guild } from "types";
import { authOptions } from "../api/auth/[...nextauth]";

const Dashboard = ({ guilds }) => {
  return (
    <Container>
      <ContainerInside>
        <SimpleGrid columns={3} gap={4}>
          {guilds.map((guild: Guild) => (
            <Guild key={guild.id} {...guild} />
          ))}
        </SimpleGrid>
      </ContainerInside>
    </Container>
  );
};

function Guild(guild: Guild) {
  return (
    <VStack
      p={4}
      backgroundImage={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      position="relative"
      _before={{
        content: "''",
        top: 0,
        position: "absolute",
        width: "100%",
        height: "100%",
        backdropFilter: "blur(10px)",
      }}
    >
      <Image
        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}
        alt={guild.name}
        w="75px"
        borderRadius="100%"
        border="2px"
      />
      <Heading size="sm">{guild.name}</Heading>
      <Button>Go</Button>
    </VStack>
  );
}

Dashboard.getLayout = (page) => {
  return (
    <>
      <Header />
      {page}
    </>
  );
};

export default Dashboard;

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session?.user) {
    res.writeHead(307, {
      location: "/login",
    });
    res.end();
    return { props: {} };
  }

  const { data: guilds } = await axios.get(
    "https://discord.com/api/v10/users/@me/guilds",
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  console.log(guilds);
  return {
    props: { guilds },
  };
}
