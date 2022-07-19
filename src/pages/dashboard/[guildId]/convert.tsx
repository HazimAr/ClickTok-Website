import { QuestionIcon } from "@chakra-ui/icons";
import { Heading, HStack, Stack, Switch, Tooltip } from "@chakra-ui/react";
import Card from "@components/Card";
import DashboardLayout from "@components/Layout";
import axios from "axios";
import { API } from "config";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Convert() {
  const router = useRouter();
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/guilds/${router.query.guildId}/channels`)
      .then((response) => setChannels(response.data));
  }, []);
  return (
    <DashboardLayout>
      <Heading as="h1" mb={10}>
        Convert Settings
      </Heading>
      <Card as={Stack} spacing={8} isLoaded>
        <HStack spacing={0} flexDir={{ base: "column", sm: "row" }}>
          <Heading size="md" flex="1">
            Channels
          </Heading>
          <HStack>
            <Tooltip label="Include (Blacklist) / Exclude (whitelist) all channels except the channels listed">
              <QuestionIcon />
            </Tooltip>
            <Heading size="md">Blacklist</Heading>
            <Switch size="lg" />
            <Heading size="md">Whitelist</Heading>
          </HStack>
        </HStack>
        <HStack spacing={0} flexDir={{ base: "column", sm: "row" }}>
          <Heading size="md" flex="1">
            Roles
          </Heading>
          <HStack>
            <Tooltip label="Include (Blacklist) / Exclude (whitelist) all roles except the roles listed">
              <QuestionIcon />
            </Tooltip>
            <Heading size="md">Blacklist</Heading>
            <Switch size="lg" />
            <Heading size="md">Whitelist</Heading>
          </HStack>
        </HStack>
        <HStack spacing={0} flexDir={{ base: "column", sm: "row" }}>
          <Heading size="md" flex="1">
            Users
          </Heading>
          <HStack>
            <Tooltip label="Include (Blacklist) / Exclude (whitelist) all users except the users listed">
              <QuestionIcon />
            </Tooltip>
            <Heading size="md">Blacklist</Heading>
            <Switch size="lg" />
            <Heading size="md">Whitelist</Heading>
          </HStack>
        </HStack>
      </Card>
    </DashboardLayout>
  );
}
