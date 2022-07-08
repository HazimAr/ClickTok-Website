import { Button, Heading, Image, SimpleGrid, VStack } from "@chakra-ui/react";
import Container from "@components/Container";
import ContainerInside from "@components/ContainerInside";
import EnhancedChakraLink from "@components/EnhancedChakraLink";
import Header from "@components/Header";
import axios from "axios";
import { API } from "config";
import { NextPageContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { Guild } from "types";
import { authOptions } from "../api/auth/[...nextauth]";

const Dashboard = ({ guilds }) => {
  return (
    <Container>
      <ContainerInside>
        <VStack>
          <Heading mb={10}>Select A Server</Heading>
          <SimpleGrid columns={3} gap={4}>
            {guilds.botGuilds.map((guild: Guild) => (
              <Guild key={guild.id} guild={guild} admin />
            ))}
            {guilds.normalGuilds.map((guild: Guild) => (
              <Guild key={guild.id} guild={guild} />
            ))}
          </SimpleGrid>
        </VStack>
      </ContainerInside>
    </Container>
  );
};

function Guild({ admin = false, guild }: { admin?: boolean; guild: Guild }) {
  return (
    <VStack
      backgroundImage={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      position="relative"
      p={4}
      rounded="lg"
      _before={{
        content: "''",
        top: 0,
        zIndex: 0,
        position: "absolute",
        width: "100%",
        height: "100%",
        backdropFilter: "blur(10px)",
        rounded: "lg",
        background: "rgba(0,0,0,0.5)",
      }}
    >
      <Image
        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}
        alt={guild.name}
        w="75px"
        borderRadius="100%"
        border="2px"
        zIndex={1}
      />
      <Heading size="sm" zIndex={1}>
        {guild.name}
      </Heading>
      <Button
        as={EnhancedChakraLink}
        href={admin ? `/dashboard/${guild.id}` : `/invite?guild_id=${guild.id}`}
        isExternal={!admin}
        variant={admin ? "primary" : "accent"}
      >
        {admin ? "Manage" : "Setup"}
      </Button>
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

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextPageContext["req"] & { cookies: { [key: string]: string } };
  res: NextPageContext["res"];
}) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session?.user) {
    res.writeHead(307, {
      location: "/login",
    });
    res.end();
    return { props: {} };
  }

  const { data } = await axios.get(`${API}/dashboard`, {
    headers: {
      authorization: `Bearer ${session.accessToken}`,
    },
  });

  return {
    props: { guilds: data },
  };
}
