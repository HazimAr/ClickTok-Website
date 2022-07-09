import {
  Button,
  Heading,
  HStack,
  Switch,
  Text,
  useToast,
} from "@chakra-ui/react";
import Card from "@components/Card";
import EnhancedChakraLink from "@components/EnhancedChakraLink";
import DashboardLayout from "@components/Layout";
import axios from "axios";
import { API } from "config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [isPublic, setIsPublic] = useState(true);
  const router = useRouter();
  const toast = useToast();
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.accessToken) {
      axios
        .get(`${API}/guilds/${router.query.guildId}/settings`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
        .then((response) => setIsPublic(response.data.public));
    }
  }, [session]);

  return (
    <DashboardLayout>
      <HStack>
        <Heading fontSize="xl" mb={10} flex={1}>
          Leaderboard Settings
        </Heading>
        <Button
          as={EnhancedChakraLink}
          href={`/leaderboard/${router.query.guildId}`}
        >
          View Leaderboard
        </Button>
      </HStack>
      <Card>
        <HStack>
          <Heading fontSize="lg" flex="1">
            Make my server's leaderboard public
          </Heading>
          <Switch
            size="lg"
            isChecked={isPublic}
            onChange={async () => {
              setIsPublic(!isPublic);
              axios
                .post(
                  `${API}/guilds/${router.query.guildId}/settings`,
                  {
                    public: !isPublic,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${session.accessToken}`,
                    },
                  }
                )
                .then(() => {
                  toast({
                    title: "Success",
                    description: "Leaderboard settings updated.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                })
                .catch(() => {
                  setIsPublic(isPublic);
                  toast({
                    title: "Error",
                    description:
                      "Something went wrong. If this issue persists, contact support.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                });
            }}
          />
        </HStack>
        <Text fontSize="sm">
          Enabling this option will allow your leaderboard to be seen by anyone
          who has the link, or by searching your server on Google.
        </Text>
      </Card>
    </DashboardLayout>
  );
}
