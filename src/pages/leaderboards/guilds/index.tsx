import { Avatar, HStack } from "@chakra-ui/react";
import Container from "@components/Container";
import ContainerInside from "@components/ContainerInside";
import axios from "axios";
import { API } from "config";
import type { LeaderboardGuild } from "types";

export default function GuildsLeaderboard({
  leaderboards,
}: {
  leaderboards: LeaderboardGuild[];
}) {
  return (
    <Container>
      <ContainerInside>
        {leaderboards.map((guild) => (
          <Guild {...guild} />
        ))}
      </ContainerInside>
    </Container>
  );
}

export function Guild(guild: LeaderboardGuild) {
  return (
    <HStack>
      <Avatar size="sm" src={guild.icon} name={guild.name} />
    </HStack>
  );
}

export async function getStaticProps() {
  const { data: leaderboards } = await axios.get(`${API}/leaderboards/guilds`);

  return {
    props: {
      leaderboards,
    },
  };
}
