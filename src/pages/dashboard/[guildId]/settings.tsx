import { Heading, HStack, Switch, Text, useToast } from "@chakra-ui/react";
import Card from "@components/Card";
import DashboardLayout from "@components/Layout";
import axios from "axios";
import { API } from "config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const data = {
  autoEmbed: {
    label: "Auto Embed",
    description:
      "Automatically embed TikToks in the message if they are found. (Default: true)",
  },
  deleteOrigin: {
    label: "Delete Origin",
    description:
      "Delete the original message if a TikTok is found in it after sending the embed. (Default: false)",
  },
  suppressEmbed: {
    label: "Supress Embed",
    description:
      "Remove the original embed discord gives when a TikTok link is found in a message. (Default: true)",
  },
};


export default function Settings() {
  const [settings, setSettings] = useState({
    autoEmbed: true,
    deleteOrigin: false,
    suppressEmbed: true,
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
  function Setting({ name }) {
    return (
      <Card my={4}>
        <HStack>
          <Heading fontSize="lg" flex="1">
            {data[name].label}
          </Heading>
          <Switch
            size="lg"
            isChecked={settings[name]}
            onChange={async () => {
              setSettings((old) => ({ ...old, [name]: !old[name] }));
              axios
                .post(
                  `${API}/guilds/${router.query.guildId}/settings`,
                  { ...settings, [name]: !settings[name] },
                  {
                    headers: {
                      Authorization: `Bearer ${session.accessToken}`,
                    },
                  }
                )
                .then(() => {
                  toast({
                    title: "Success",
                    description: "Server settings updated.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                })
                .catch(() => {
                  setSettings(settings);
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
        <Text fontSize="sm">{data[name].description}</Text>
      </Card>
    );
  }
  return (
    <DashboardLayout>
      <Heading fontSize="xl" mb={10} flex={1}>
        Server Settings
      </Heading>
      {Object.keys(settings).map((key) => {
        if (!data[key]) return;
        return <Setting key={key} name={key} />;
      })}
    </DashboardLayout>
  );
}
