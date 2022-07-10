import { Heading, HStack, Switch, Text, useToast } from "@chakra-ui/react";
import Card from "@components/Card";
import DashboardLayout from "@components/Layout";
import axios from "axios";
import { API } from "config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Settings() {
  const [settings, setSettings] = useState({
    public: true,
    deleteOrigin: false,
    suppressEmbed: true,
    autoEmbed: true,
  });

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
        .then((response) => setSettings(response.data));
    }
  }, [session]);
  function Setting({ key, value, onChange }) {
    return (
      <Card>
        <HStack>
          <Heading fontSize="lg" flex="1">
            Make my server's leaderboard public
          </Heading>
          <Switch
            size="lg"
            isChecked={settings[key]}
            onChange={async () => {
              const temp = settings;
              temp[key] = !temp[key];
              setSettings(temp);
              axios
                .post(`${API}/guilds/${router.query.guildId}/settings`, temp, {
                  headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                  },
                })
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
                  temp[key] = !temp[key];
                  setSettings(temp);
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
    );
  }
  return (
    <DashboardLayout>
      <Heading fontSize="xl" mb={10} flex={1}>
        Server Settings
      </Heading>
      {}
    </DashboardLayout>
  );
}
