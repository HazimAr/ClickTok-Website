import {
  Avatar,
  HStack,
  Table,
  Text,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
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
            <Tbody>
              {leaderboards.map((guild) => (
                <Guild {...guild} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </ContainerInside>
    </Container>
  );
}

export function Guild(guild: LeaderboardGuild) {
  return (
    <Tr>
      <Td>
        <Avatar size="sm" src={guild.icon} name={guild.name} />
      </Td>
      <Td>
        <Text>{guild.name}</Text>
      </Td>
      <Td>
        <Text>{guild.conversions}</Text>
      </Td>
    </Tr>
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
