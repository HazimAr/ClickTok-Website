import { Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import Container from "@components/Container";
import ContainerInside from "@components/ContainerInside";
import { useRef } from "react";
import { useCountUp } from "react-countup";
import { FaRecycle, FaServer, FaUserAlt } from "react-icons/fa";

export default function Statistics({ users, converted, guilds }) {
  return (
    <Container bg="white" py={4}>
      <ContainerInside
        as={HStack}
        flexDir={{ base: "column", md: "row" }}
        justify="space-evenly"
        spacing={0}
        gap={{ base: 8, md: 0 }}
        color="accent"
      >
        <Statistic value={users} label="Users" icon={FaUserAlt} />

        <Statistic
          value={converted}
          label="TikToks Converted"
          icon={FaRecycle}
        />

        <Statistic value={guilds} label="Discord Servers" icon={FaServer} />
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
    <VStack>
      <Icon as={icon} boxSize={16} color="primary" />
      <Text>{label}</Text>
      <Heading ref={ref}></Heading>
    </VStack>
  );
}
