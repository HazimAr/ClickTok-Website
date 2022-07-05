import {
  Avatar,
  HStack,
  Table,
  Text,
  TableContainer,
  Thead,
  Tr,
  Th,
} from "@chakra-ui/react";
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
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Guild</Th>
                <Th isNumeric>Conversions</Th>
              </Tr>
            </Thead>
            {leaderboards.map((guild) => (
              <Guild {...guild} />
            ))}
          </Table>
        </TableContainer>
      </ContainerInside>
    </Container>
  );
}

export function Guild(guild: LeaderboardGuild) {
  return (
    <HStack>
      <Avatar size="sm" src={guild.icon} name={guild.name} />
      <Text>{guild.name}</Text>
      <Text>{guild.conversions}</Text>
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
