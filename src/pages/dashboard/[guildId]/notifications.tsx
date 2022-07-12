import {
  Button,
  Center,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Switch,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Card from "@components/Card";
import DashboardLayout from "@components/Layout";
import axios from "axios";
import { API } from "config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function Notifications() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [channels, setChannels] = useState([]);
  const { isOpen, onClose, onToggle } = useDisclosure();
  const { data: session } = useSession();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (!session?.accessToken) return;
    axios
      .get(`${API}/guilds/${router.query.guildId}/subscriptions`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => setSubscriptions(response.data));
    axios
      .get(`${API}/guilds/${router.query.guildId}/channels`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => setChannels(response.data));
  }, [session]);

  return (
    <DashboardLayout>
      <Heading as="h1" flex="1" mb={10}>
        TikTok Notifications
      </Heading>
      <Card isLoaded>
        <HStack>
          <Heading size="md" flex="1">
            Subscriptions
          </Heading>
          <Heading size="md">{subscriptions.length}/1</Heading>
        </HStack>

        {subscriptions.map((subscription) => (
          <HStack key={subscription.id}>
            <Heading size="md" flex="1">
              {subscription.name}
            </Heading>
            <Button
              size="sm"
              colorScheme="red"
              onClick={() => {
                axios
                  .delete(
                    `${API}/guilds/${router.query.guildId}/subscriptions/${subscription.id}`,
                    {
                      headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                      },
                    }
                  )
                  .then(() => {
                    toast({
                      title: "Subscription deleted",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                    setSubscriptions(
                      subscriptions.filter((s) => s.id !== subscription.id)
                    );
                  })
                  .catch(({ data }) => {
                    toast({
                      title: "Error",
                      description: data.message,
                      status: "error",
                      duration: 5000,
                      isClosable: true,
                    });
                  });
              }}
            >
              Delete
            </Button>
          </HStack>
        ))}

        <Center>
          <Button variant="outline" onClick={onToggle}>
            <FaPlus />
          </Button>
        </Center>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Subscribe To A Creator</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <label>The creator to subscribe to</label>
            <Input placeholder="Creator Username (NOT DISPLAY NAME)" mb={4} />

            <label>Channel the notification will send in</label>
            <Select mb={4}>
              {channels.map((channel) => (
                <option value={channel?.id}># {channel?.name}</option>
              ))}
            </Select>
            <HStack justify="space-between">
              <Tooltip
                label="Enable video previews on notifications."
                aria-label="A tooltip"
              >
                Previews
              </Tooltip>
              <Switch />
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              // onClick={() => {
              //   axios.post(`${API}/subscriptions`, {
              //     channelId: channels[0].id,
              //     creatorUsername: "",
              //   });
              // }}

              type="submit"
            >
              Subscribe
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
}
