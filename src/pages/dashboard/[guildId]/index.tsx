import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Card from "@components/Card";
import EnhancedChakraLink from "@components/EnhancedChakraLink";
import DashboardLayout from "@components/Layout";
import { useRouter } from "next/router";

export default function GuildHome() {
  const router = useRouter();
  return (
    <DashboardLayout>
      <Stack spacing={8}>
        <Card isLoaded>
          <Flex justify="center" align="center">
            <div>
              <Heading>Notifications</Heading>
              <Text>Recieve live notifications from any creator you want.</Text>
            </div>
            <Button
              ml="auto"
              as={EnhancedChakraLink}
              href={`/dashboard/${router.query.guildId}/notifications`}
            >
              Setup Notifications
            </Button>
          </Flex>
        </Card>
        <Card isLoaded>
          <Flex justify="center" align="center">
            <div>
              <Heading>Statistics</Heading>
              <Text>
                Setup channels to update with live statistics of any creator.
              </Text>
            </div>
            <Button
              ml="auto"
              as={EnhancedChakraLink}
              href={`/dashboard/${router.query.guildId}/statistics`}
            >
              Setup Statistics
            </Button>
          </Flex>
        </Card>
        <Card isLoaded>
          <Flex justify="center" align="center">
            <div>
              <Heading>Settings</Heading>
              <Text>
                Configure server settings to fit the needs of your discord
                server.
              </Text>
            </div>
            <Button
              ml="auto"
              as={EnhancedChakraLink}
              href={`/dashboard/${router.query.guildId}/settings`}
            >
              Configure Settings
            </Button>
          </Flex>
        </Card>
      </Stack>
    </DashboardLayout>
  );
}
