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
import type { LeaderboardGuildUser } from "types";

export default function GuildUsersLeaderboard({
  leaderboards,
}: {
  leaderboards: LeaderboardGuildUser[];
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
                <User {...guild} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </ContainerInside>
    </Container>
  );
}

export function User(user: LeaderboardGuildUser) {
  return (
    <Tr>
      <Td>
        <Avatar size="sm" src={user.avatarURL} name={user.name} />
      </Td>
      <Td>
        <Text>{user.name}</Text>
      </Td>
      <Td isNumeric>
        <Text>{user.conversions}</Text>
      </Td>
    </Tr>
  );
}

export async function getServerSideProps({ query }) {
  const { data: leaderboards } = await axios.get(
    `${API}/leaderboards/guilds/${query.id}`
  );

  return {
    props: {
      leaderboards,
    },
  };
}

// export async function getStaticPaths() {
//   const { data: leaderboards } = await axios.get(`${API}/leaderboards/guilds`);

//   return {
//     paths: leaderboards.map((guild) => {
//       console.log(guild)
//       return {
//         params: {
//           id: guild?.id || "1",
//         },
//       };
//     }),
//     fallback: "blocking",
//   };
// }
