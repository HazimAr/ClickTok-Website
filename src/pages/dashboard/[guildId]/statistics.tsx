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
import { InputControl, SelectControl } from "formik-chakra-ui";
import * as Yup from "yup";
import { QuestionIcon } from "@chakra-ui/icons";
import { VoiceChannel } from "discord.js";

export default function Statistics() {
  const [statistic, setStatistic] = useState({
    id: "",
    creator: "",
    followers: "",
    likes: "",
    videos: "",
  });
  const [statistics, setStatistics] = useState([]);
  const [channels, setChannels] = useState<VoiceChannel[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (!session?.accessToken) return;
    if (!router.query.guildId) return;
    axios
      .get(`${API}/guilds/${router.query.guildId}/statistics`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => setStatistics(response.data))
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "Could not load statistics",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
    axios
      .get(`${API}/guilds/${router.query.guildId}/channels/voice`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => setChannels(response.data));
  }, [session, router]);
  console.log(statistics);
  return (
    <DashboardLayout>
      <Heading as="h1" mb={10}>
        TikTok Statistics
      </Heading>
      <Card isLoaded>
        <HStack mb={5}>
          <Heading size="md" flex="1">
            Statistics
          </Heading>

          <Tooltip label="Premium members get unlimited statistics" mr={4}>
            <HStack>
              <Heading size="md">{statistics.length}/1</Heading>
              <Icon as={QuestionIcon} />
            </HStack>
          </Tooltip>
        </HStack>
        <Stack mb={10}>
          {statistics.map((statistic) => {
            return (
              <HStack
                key={statistic.id}
                bg="blackAlpha.400"
                p={4}
                rounded="lg"
                flexDir={{ base: "column", md: "row" }}
              >
                <HStack flex="1">
                  <Heading size="md">@{statistic.creator}</Heading>

                </HStack>

                <HStack pt={{ base: 4, md: 0 }}>
                  <Button
                    onClick={() => {
                      setStatistic(statistic);
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
                          `${API}/guilds/${router.query.guildId}/statistic/${statistic.id}`,
                          {
                            headers: {
                              Authorization: `Bearer ${session.accessToken}`,
                            },
                          }
                        )
                        .then(() => {
                          toast({
                            title: "Statistic deleted",
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                          });
                          setStatistics(
                            statistics.filter((s) => s.id !== statistic.id)
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
              if (statistics.length >= 1)
                return toast({
                  title: "Error",
                  description:
                    "You have reached your maximum notifications. If you would like more, please upgrade to premium.",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              setStatistic({
                id: "",
                creator: "",
                followers: "",
                likes: "",
                videos: "",
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
            initialValues={statistic}
            validationSchema={Yup.object({
              creator: Yup.string().required(),
              followers: Yup.string().nullable(),
              likes: Yup.string().nullable(),
              videos: Yup.string().nullable(),
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              axios
                .post(
                  `${API}/guilds/${router.query.guildId}/statistics`,
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
                      "Your statistics has successfully been setup. Clicktok will update the statistics every 10 minutes due to discord limitations. If the statistics are not updated within 10 minutes, please contact support.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                  onClose();

                  if (updated) {
                    setStatistics(
                      statistics.map((s) => (s.id === values.id ? values : s))
                    );
                  } else {
                    setStatistics([...statistics, values]);
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
                <ModalHeader>Creator Statistics</ModalHeader>
                <ModalCloseButton />
                <ModalBody as={Stack} spacing={4}>
                  <InputControl
                    name="creator"
                    label="Creator:"
                    inputProps={{
                      placeholder: "Creator Username EX: (khaby.lame)",
                      value: statistic.creator,
                    }}
                    onChange={(e) =>
                      setStatistic({
                        ...statistic,
                        // @ts-ignore
                        creator: e.target.value,
                      })
                    }
                    isRequired
                  />

                  <SelectControl
                    name="followers"
                    label="The followers channel:"
                    selectProps={{
                      placeholder: "Select Channel",
                      value: statistic.followers,
                    }}
                    onChange={(e) =>
                      setStatistic({
                        ...statistic,
                        // @ts-ignore
                        followers: e.target.value,
                      })
                    }
                  >
                    {channels.map((channel) => (
                      <option key={channel.id} value={channel.id}>
                        {channel.name}
                      </option>
                    ))}
                  </SelectControl>

                  <SelectControl
                    name="likes"
                    label="The likes channel:"
                    selectProps={{
                      placeholder: "Select Channel",
                      value: statistic.likes,
                    }}
                    onChange={(e) =>
                      setStatistic({
                        ...statistic,
                        // @ts-ignore
                        likes: e.target.value,
                      })
                    }
                  >
                    {channels.map((channel) => (
                      <option key={channel.id} value={channel.id}>
                        {channel.name}
                      </option>
                    ))}
                  </SelectControl>

                  <SelectControl
                    name="videos"
                    label="The videos channel:"
                    selectProps={{
                      placeholder: "Select Channel",
                      value: statistic.videos,
                    }}
                    onChange={(e) =>
                      setStatistic({
                        ...statistic,
                        // @ts-ignore
                        videos: e.target.value,
                      })
                    }
                  >
                    {channels.map((channel) => (
                      <option key={channel.id} value={channel.id}>
                        {channel.name}
                      </option>
                    ))}
                  </SelectControl>
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
