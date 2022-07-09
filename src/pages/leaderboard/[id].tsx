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
  Heading,
} from "@chakra-ui/react";
import Container from "@components/Container";
import ContainerInside from "@components/ContainerInside";
import Footer from "@components/Footer";
import Header from "@components/Header";
import axios from "axios";
import { API } from "config";
import type { LeaderboardGuildUser } from "types";

const GuildUsersLeaderboard = ({
  leaderboards,
}: {
  leaderboards: LeaderboardGuildUser[];
}) => {
  return (
    <Container>
      <ContainerInside>
        {leaderboards ? (
          leaderboards?.length ? (
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
          ) : (
            <Heading textAlign="center">
              Convert your first tiktok to view the leaderboard
            </Heading>
          )
        ) : (
          <Heading textAlign="center">No Guild Found</Heading>
        )}
      </ContainerInside>
    </Container>
  );
};
GuildUsersLeaderboard.getLayout = (page) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
);

export default GuildUsersLeaderboard;

export async function getServerSideProps({ query }) {
  const response = await axios
    .get(`${API}/leaderboard/${query.id}`)
    .then((res) => res)
    .catch((e) => e.response);

  if (response.status != 200 || response.status == 204)
    return { props: { leaderboards: 0 } };

  return {
    props: {
      leaderboards: response.data,
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
