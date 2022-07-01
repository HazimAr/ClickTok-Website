import { Box, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import Container from "@components/Container";
import ContainerInside from "@components/ContainerInside";
import { useRef } from "react";
import { useCountUp } from "react-countup";
import { FaRecycle, FaServer, FaUserAlt } from "react-icons/fa";
import { GoPrimitiveDot } from "react-icons/go";

export default function Statistics({ users, converted, guilds }) {
  return (
    <Container bg="white" py={4}>
      <ContainerInside as={VStack} color="accent">
        <HStack>
          <Text>Live</Text>
          <style>
            {`
              @keyframes blink {
                  0% {
                      box-shadow: 0 0 20px red;
                  }
                  50% {
                      box-shadow: none;
                  }
                  100% {
                      box-shadow: 0 0 20px red;
                  }
              }
            `}
          </style>
          <Box
            boxSize="10px"
            animation="blink 1s linear infinite"
            background="red"
            rounded="50%"
          />
        </HStack>
        <HStack
          flexDir={{ base: "column", md: "row" }}
          spacing={0}
          gap={{ base: 8, md: 0 }}
          w="100%"
          maxW="800px"
        >
          <Statistic value={users} label="Users" icon={FaUserAlt} />

          <Statistic
            value={converted}
            label="TikToks Converted"
            icon={FaRecycle}
          />

          <Statistic value={guilds} label="Discord Servers" icon={FaServer} />
        </HStack>
      </ContainerInside>
    </Container>
  );
}

function Statistic({ icon, label, value }) {
  const ref = useRef(null);
  useCountUp({
    ref,
    start: 0,
    end: value,
    duration: 2,
    useEasing: true,
    separator: ",",
    easingFn: (t, b, c, d) => {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
  });
  //
  return (
    <VStack w="100%">
      <Icon as={icon} boxSize={16} color="primary" />
      <Text>{label}</Text>
      <Heading ref={ref}></Heading>
    </VStack>
  );
}
