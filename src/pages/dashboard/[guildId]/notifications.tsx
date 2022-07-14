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
    id: "",
    preview: true,
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
    if (!router.query.guildId) return;
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
  }, [session, router]);

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

          <Tooltip label="Premium members get unlimited notifications" mr={4}>
            <HStack>
              <Heading size="md">{notifications.length}/1</Heading>
              <Icon as={QuestionIcon} />
            </HStack>
          </Tooltip>
        </HStack>
        <Stack mb={10}>
          {notifications.map((notification) => {
            const roleColor = roles.find(
              (role) => role.id === notification.role
            )?.color;
            return (
              <HStack
                key={notification.id}
                bg="blackAlpha.400"
                p={4}
                rounded="lg"
                flexDir={{ base: "column", md: "row" }}
              >
                <HStack flex="1">
                  <Heading size="md">@{notification.creator}</Heading>
                  <Heading size="md">
                    #
                    {channels.find(
                      (channel) => channel.id == notification.channel
                    )?.name || "Loading..."}
                  </Heading>
                  {roleColor && (
                    <Heading
                      size="md"
                      color={`#${roles
                        .find((role) => role.id == notification.role)
                        ?.color?.toString(16)}`}
                      bg={
                        roleColor != 0
                          ? `#${roles
                              .find((role) => role.id == notification.role)
                              ?.color?.toString(16)}44`
                          : "blackAlpha.400"
                      }
                      p={2}
                      rounded="lg"
                    >
                      @
                      {roles.find((role) => role.id == notification.role)
                        ?.name || "Loading..."}
                    </Heading>
                  )}
                </HStack>

                <HStack pt={{ base: 4, md: 0 }}>
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
                            notifications.filter(
                              (s) => s.id !== notification.id
                            )
                          );
                        })
                        .catch(({ response }) => {
                          toast({
                            title: "Error",
                            description:
                              response.data.message ||
                              "Something went wrong. If this keeps happening, please contact support.",
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                          });
                        });
                    }}
                  >
                    Delete
                  </Button>
                </HStack>
              </HStack>
            );
          })}
        </Stack>
        <Center>
          <Button
            variant="outline"
            onClick={() => {
              if (notifications.length >= 1)
                return toast({
                  title: "Error",
                  description:
                    "You have reached your maximum notifications. If you would like more, please upgrade to premium.",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              setNotification({
                creator: "",
                channel: "",
                id: "",
                preview: true,
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
              preview: Yup.boolean(),
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
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
                  const updated = values.id && true;
                  toast({
                    title: "Created",
                    description:
                      "Your notification has successfully been setup. Clicktok will send the notification up to 1 minute after a video has been posted.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                  onClose();

                  if (updated) {
                    setNotifications(
                      notifications.map((s) =>
                        s.id === values.id ? values : s
                      )
                    );
                  } else {
                    setNotifications([...notifications, values]);
                  }
                })
                .catch(({ response }) => {
                  toast({
                    title: "Error",
                    description:
                      response.data.message ||
                      "Something went wrong. If this keeps happening, please contact support.",
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
                    }}
                    onChange={(e) =>
                      setNotification({
                        ...notification,
                        // @ts-ignore
                        creator: e.target.value,
                      })
                    }
                    isRequired
                  />

                  <SelectControl
                    name="channel"
                    label="Channel to send in:"
                    selectProps={{
                      placeholder: "Select Channel",
                      value: notification.channel,
                    }}
                    onChange={(e) =>
                      setNotification({
                        ...notification,
                        // @ts-ignore
                        channel: e.target.value,
                      })
                    }
                    isRequired
                  >
                    {channels.map((channel) => (
                      <option key={channel.id} value={channel.id}>
                        #{channel.name}
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
                      }}
                      onChange={(e) => {
                        setNotification({
                          ...notification,
                          // @ts-ignore
                          preview: e.target.value,
                        });
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
