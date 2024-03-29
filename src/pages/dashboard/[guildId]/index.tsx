import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
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
          <Flex
            justify="center"
            align="center"
            flexDir={{ base: "column", md: "row" }}
            textAlign={{ base: "center", md: "left" }}
            gap={2}
          >
            <Box>
              <Heading>Notifications</Heading>
              <Text>Recieve live notifications from any creator you want.</Text>
            </Box>
            <Button
              ml={{ base: "none", md: "auto" }}
              as={EnhancedChakraLink}
              href={`/dashboard/${router.query.guildId}/notifications`}
            >
              Setup Notifications
            </Button>
          </Flex>
        </Card>
        <Card isLoaded>
          <Flex
            justify="center"
            align="center"
            flexDir={{ base: "column", md: "row" }}
            textAlign={{ base: "center", md: "left" }}
            gap={2}
          >
            <div>
              <Heading>Statistics</Heading>
              <Text>
                Setup channels to update with live statistics of any creator.
              </Text>
            </div>
            <Button
              ml={{ base: "none", md: "auto" }}
              as={EnhancedChakraLink}
              href={`/dashboard/${router.query.guildId}/statistics`}
            >
              Setup Statistics
            </Button>
          </Flex>
        </Card>
        <Card isLoaded>
          <Flex
            justify="center"
            align="center"
            flexDir={{ base: "column", md: "row" }}
            textAlign={{ base: "center", md: "left" }}
            gap={2}
          >
            <div>
              <Heading>Settings</Heading>
              <Text>
                Configure server settings to fit the needs of your discord
                server.
              </Text>
            </div>
            <Button
              ml={{ base: "none", md: "auto" }}
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
