import { Heading, HStack, Switch, Text } from "@chakra-ui/react";
import Card from "@components/Card";
import DashboardLayout from "@components/Layout";

export default function Leaderboard() {
  return (
    <DashboardLayout>
      <Heading fontSize="xl" mb={10}>
        Leaderboard Settings
      </Heading>
      <Card>
        <HStack>
          <Heading fontSize="lg" flex="1">
            Make my server's leaderboard public
          </Heading>
          <Switch size="lg" />
        </HStack>
        <Text fontSize="sm">
          Enabling this option will allow your leaderboard to be seen by anyone
          who has the link, or by searching your server on Google.
        </Text>
      </Card>
    </DashboardLayout>
  );
}
