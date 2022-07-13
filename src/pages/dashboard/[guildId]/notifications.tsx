import {
  Button,
  Center,
  Heading,
  HStack,
  Icon,
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
import { Formik } from "formik";
import { InputControl, SelectControl, SwitchControl } from "formik-chakra-ui";
import * as Yup from "yup";
import { QuestionIcon } from "@chakra-ui/icons";
import { GuildChannel, Role } from "discord.js";

export default function Notifications() {
  const [notification, setNotification] = useState({
    creator: "",
    channel: "",
  });
  const [notifications, setNotifications] = useState([]);
  const [channels, setChannels] = useState<GuildChannel[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <HStack mb={5}>
          <Heading size="md" flex="1">
            Notifications
          </Heading>
          <Heading size="md">{notifications.length}/1</Heading>
        </HStack>
        <Stack mb={10}>
          {notifications.map((notification) => (
            <HStack
              key={notification.id}
              bg="whiteAlpha.100"
              p={4}
              rounded="lg"
            >
              <HStack flex="1">
                <Heading size="md">{notification.creator}</Heading>
                <Heading size="md">{notification.channel}</Heading>
              </HStack>

              <HStack>
                <Button
                  onClick={() => {
                    setNotification(notification);
                    onOpen();
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="accent"
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
            </HStack>
          ))}
        </Stack>
        <Center>
          <Button
            variant="outline"
            onClick={() => {
              setNotification({
                creator: "",
                channel: "",
              });
              onOpen();
            }}
          >
            <FaPlus />
          </Button>
        </Center>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={notification}
            validationSchema={Yup.object({
              creator: Yup.string().required(),
              channel: Yup.string().required(),
              role: Yup.string().nullable(),
              preview: Yup.boolean().nullable(),
            })}
            onSubmit={(values, { setSubmitting }) => {
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
                .then(() => {
                  toast({
                    title: "Created",
                    description:
                      "Your notification has successfully been setup. Clicktok will send the notification up to 1 minute after the video has been posted.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                  onClose();
                })
                .catch(({ data }) => {
                  toast({
                    title: "Error",
                    description: data.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                })
                .finally(() => setSubmitting(false));
            }}
          >
            {({ submitForm, isSubmitting }) => (
              <>
                <ModalHeader>Recieve Notifications</ModalHeader>
                <ModalCloseButton />
                <ModalBody as={Stack} spacing={4}>
                  <InputControl
                    name="creator"
                    label="Creator:"
                    inputProps={{
                      placeholder: "Creator Username EX: (khaby.lame)",
                      value: notification.creator,
                      onChange: (e) =>
                        setNotification({
                          ...notification,
                          creator: e.target.value,
                        }),
                    }}
                    isRequired
                  />

                  <SelectControl
                    name="channel"
                    label="Channel to send in:"
                    selectProps={{ placeholder: "Select Channel" }}
                    isRequired
                  >
                    {channels.map((channel) => (
                      <option key={channel.id} value={channel.id}>
                        # {channel.name}
                      </option>
                    ))}
                  </SelectControl>

                  <SelectControl
                    name="role"
                    label="Role to ping:"
                    selectProps={{ placeholder: "Do Not Ping Any Role" }}
                  >
                    {roles
                      .sort((a, b) => b.rawPosition - a.rawPosition)
                      .map((role) => (
                        <option
                          key={role.id}
                          value={role.id}
                          style={{ color: `#${role.color.toString(16)}` }}
                        >
                          {role.name}
                        </option>
                      ))}
                  </SelectControl>

                  <HStack justify="space-between">
                    <Tooltip
                      label="Enable video previews on notifications."
                      aria-label="A tooltip"
                    >
                      <HStack>
                        <Icon as={QuestionIcon} />
                        <p>Previews</p>
                      </HStack>
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
                  <Button onClick={submitForm} isLoading={isSubmitting}>
                    Submit Notification
                  </Button>
                </ModalFooter>
              </>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
}
