import { QuestionIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Heading,
  HStack,
  Stack,
  Switch,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import Card from "@components/Card";
import DashboardLayout from "@components/Layout";
import axios from "axios";
import { API } from "config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function Convert() {
  const toast = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const [channels, setChannels] = useState([]);
  const [settings, setSettings] = useState(null);


  useEffect(() => {
    if (!session?.accessToken) return;
    if (!router.query.guildId) return;
    axios
      .get(`${API}/guilds/${router.query.guildId}/channels`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => setChannels(response.data));
    axios
      .get(`${API}/guilds/${router.query.guildId}/settings`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => setSettings(response.data));
  }, [router, session]);
  console.log(settings);
  console.log(channels);
  return (
    <DashboardLayout>
      <Heading as="h1" mb={10}>
        Convert Settings
      </Heading>
      <Stack spacing={8}>
        <Card isLoaded={settings}>
          <HStack spacing={0} flexDir={{ base: "column", sm: "row" }}>
            <Heading size="md" flex="1">
              Channels
            </Heading>
            <HStack>
              <Tooltip label="Include (Blacklist) / Exclude (whitelist) all channels except the channels listed">
                <QuestionIcon />
              </Tooltip>
              <Heading size="md">Blacklist</Heading>
              <Switch
                size="lg"
                isChecked={settings?.lists?.channels?.whitelist}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setSettings({
                    ...settings,
                    lists: {
                      ...settings?.lists,
                      channels: {
                        ...settings?.lists?.channels,
                        whitelist: !settings?.lists?.channels?.whitelist,
                      },
                    },
                  });
                  axios
                    .post(
                      `${API}/guilds/${router.query.guildId}/settings/lists/channels`,
                      {
                        whitelist: e.target.checked,
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
                        description: "Channel list type updated.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                      });
                    })
                    .catch(() => {
                      setSettings({
                        ...settings,
                        whitelist: !settings.lists.channels.whitelist,
                      });
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
              <Heading size="md">Whitelist</Heading>
            </HStack>
          </HStack>
          <Center>
            <Button variant="outline">
              <FaPlus />
            </Button>
          </Center>
        </Card>
        <Card isLoaded={settings}>
          <HStack spacing={0} flexDir={{ base: "column", sm: "row" }}>
            <Heading size="md" flex="1">
              Roles
            </Heading>
            <HStack>
              <Tooltip label="Include (Blacklist) / Exclude (whitelist) all roles except the roles listed">
                <QuestionIcon />
              </Tooltip>
              <Heading size="md">Blacklist</Heading>
              <Switch
                size="lg"
                isChecked={settings?.lists?.roles?.whitelist}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setSettings({
                    ...settings,
                    lists: {
                      ...settings?.lists,
                      roles: {
                        ...settings?.lists?.roles,
                        whitelist: !settings?.lists?.roles?.whitelist,
                      },
                    },
                  });
                  axios
                    .post(
                      `${API}/guilds/${router.query.guildId}/settings/lists/roles`,
                      {
                        whitelist: e.target.checked,
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
                        description: "Role list type updated.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                      });
                    })
                    .catch(() => {
                      setSettings({
                        ...settings,
                        whitelist: !settings.lists.roles.whitelist,
                      });
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
              <Heading size="md">Whitelist</Heading>
            </HStack>
          </HStack>
        </Card>
        <Card isLoaded={settings}>
          <HStack spacing={0} flexDir={{ base: "column", sm: "row" }}>
            <Heading size="md" flex="1">
              Users
            </Heading>
            <HStack>
              <Tooltip label="Include (Blacklist) / Exclude (whitelist) all users except the users listed">
                <QuestionIcon />
              </Tooltip>
              <Heading size="md">Blacklist</Heading>
              <Switch
                size="lg"
                isChecked={settings?.lists?.users?.whitelist}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setSettings({
                    ...settings,
                    lists: {
                      ...settings?.lists,
                      users: {
                        ...settings?.lists?.users,
                        whitelist: !settings?.lists?.users?.whitelist,
                      },
                    },
                  });
                  axios
                    .post(
                      `${API}/guilds/${router.query.guildId}/settings/lists/users`,
                      {
                        whitelist: e.target.checked,
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
                        description: "User list type updated.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                      });
                    })
                    .catch(() => {
                      setSettings({
                        ...settings,
                        whitelist: !settings.lists.users.whitelist,
                      });
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
              <Heading size="md">Whitelist</Heading>
            </HStack>
          </HStack>
        </Card>
      </Stack>
    </DashboardLayout>
  );
}
