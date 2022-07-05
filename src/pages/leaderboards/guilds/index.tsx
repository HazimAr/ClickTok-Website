import {
  Avatar,
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
          <Table colorScheme="blackAlpha" size="lg" variant="striped">
            <Thead>
              <Tr>
                <Th fontSize={24}>#</Th>
                <Th></Th>
                <Th fontSize={24}>Guild</Th>
                <Th fontSize={24} isNumeric>
                  Conversions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {leaderboards.map((guild, index) => (
                <Tr>
                  <Td fontSize={18}>{index + 1}</Td>
                  <Guild {...guild} />
                </Tr>
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
    <>
      <Td>
        <Avatar size="lg" src={guild.icon} name={guild.name} />
      </Td>
      <Td>
        <Text fontSize={20}>{guild.name}</Text>
      </Td>
      <Td isNumeric>
        <Text fontSize={20}>{guild.conversions}</Text>
      </Td>
    </>
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
