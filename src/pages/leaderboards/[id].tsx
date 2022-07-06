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
          <Table colorScheme="blackAlpha" size="lg" variant="striped">
            <Thead>
              <Tr>
                <Th fontSize={24}>#</Th>
                <Th></Th>
                <Th fontSize={24}>User</Th>
                <Th fontSize={24} isNumeric>
                  Conversions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {leaderboards.map((user, index) => (
                <Tr>
                  <Td fontSize={18}>{index + 1}</Td>
                  <User {...user} />
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </ContainerInside>
    </Container>
  );
}

export async function getServerSideProps({ query }) {
  const { data: leaderboards } = await axios.get(
    `${API}/leaderboards/${query.id}`
  );

  return {
    props: {
      leaderboards,
    },
  };
}

export function User(guild: LeaderboardGuildUser) {
  return (
    <>
      <Td>
        <Avatar size="lg" src={guild.avatarURL} name={guild.username} />
      </Td>
      <Td>
        <Text fontSize={20}>{guild.username}</Text>
      </Td>
      <Td isNumeric>
        <Text fontSize={20}>{guild.conversions}</Text>
      </Td>
    </>
  );
}

// export async function getStaticPaths() {
//   const { data: leaderboards } = await axios.get(`${API}/leaderboards`);

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
