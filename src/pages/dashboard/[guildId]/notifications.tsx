import {
  Button,
  Center,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
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
import { Formik, Form } from "formik";
import { InputControl, SelectControl, SwitchControl } from "formik-chakra-ui";
import * as Yup from "yup";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [channels, setChannels] = useState([]);
  const [roles, setRoles] = useState([]);
  const { isOpen, onClose, onToggle } = useDisclosure();
  const { data: session } = useSession();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (!session?.accessToken) return;
    axios
      .get(`${API}/guilds/${router.query.guildId}/notifications`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => setNotifications(response.data));
    axios
      .get(`${API}/guilds/${router.query.guildId}/channels`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => setChannels(response.data));
    axios
      .get(`${API}/guilds/${router.query.guildId}/roles`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => setRoles(response.data));
  }, [session]);

  return (
    <DashboardLayout>
      <Heading as="h1" flex="1" mb={10}>
        TikTok Notifications
      </Heading>
      <Card isLoaded>
        <HStack>
          <Heading size="md" flex="1">
            Notifications
          </Heading>
          <Heading size="md">{notifications.length}/1</Heading>
        </HStack>

        {notifications.map((notification) => (
          <HStack key={notification.id}>
            <Heading size="md" flex="1">
              {notification.name}
            </Heading>
            <Button
              size="sm"
              colorScheme="red"
              onClick={() => {
                axios
                  .delete(
                    `${API}/guilds/${router.query.guildId}/notifications/${notification.id}`,
                    {
                      headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                      },
                    }
                  )
                  .then(() => {
                    toast({
                      title: "Notification deleted",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                    setNotifications(
                      notifications.filter((s) => s.id !== notification.id)
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
          <Formik
            initialValues={{
              creator: "",
            }}
            validationSchema={Yup.object({
              creator: Yup.string().required(),
              channel: Yup.string().required(),
              role: Yup.string(),
              preview: Yup.boolean(),
            })}
            onSubmit={(values) =>
              axios
                .post(
                  `${API}/guilds/${router.query.guildId}/notifications`,
                  values,
                  {
                    headers: {
                      Authorization: `Bearer ${session.accessToken}`,
                    },
                  }
                )
                .then(() =>
                  toast({
                    title: "Created",
                    description:
                      "Your notification has successfully been setup. Clicktok will send the notification up to 1 minute after the video has been posted.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  })
                )
                .catch(({ data }) => {
                  toast({
                    title: "Error",
                    description: data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                })
            }
          >
            <Form>
              <ModalHeader>Recieve Notifications</ModalHeader>
              <ModalCloseButton />
              <ModalBody as={Stack} spacing={4}>
                <InputControl
                  name="creator"
                  label="Creator:"
                  inputProps={{
                    placeholder: "Creator Username EX: (khaby.lame)",
                  }}
                />

                <SelectControl name="channel" label="Channel to send in:">
                  {channels.map((channel) => (
                    <option value={channel?.id}># {channel?.name}</option>
                  ))}
                </SelectControl>

                <SelectControl
                  name="role"
                  label="Role to ping:"
                  selectProps={{ placeholder: "Don't Ping" }}
                >
                  {roles.map((role) => (
                    <option value={role?.id}>{role?.name}</option>
                  ))}
                </SelectControl>

                <HStack justify="space-between">
                  <Tooltip
                    label="Enable video previews on notifications."
                    aria-label="A tooltip"
                  >
                    Previews
                  </Tooltip>
                  <SwitchControl
                    name="preview"
                    switchProps={{
                      size: "lg",
                      defaultChecked: true,
                    }}
                  />
                </HStack>
              </ModalBody>
              <ModalFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button
                  // onClick={() => {
                  //   axios.post(`${API}/notifications`, {
                  //     channelId: channels[0].id,
                  //     creatorUsername: "",
                  //   });
                  // }}
                  type="submit"
                >
                  Setup Notification
                </Button>
              </ModalFooter>
            </Form>
          </Formik>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
}
