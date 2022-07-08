import {
  useDisclosure,
  useColorModeValue,
  Flex,
  Icon,
  // Collapse,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
  Avatar,
  Box,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import { FaBell, FaCrown } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

import { HiViewBoards } from "react-icons/hi";
import { MdHome } from "react-icons/md";
import { BsGearFill, BsGraphUp } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import EnhancedChakraLink from "./EnhancedChakraLink";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

export default function DashboardLayout({ children = null }) {
  const sidebar = useDisclosure();
  // const integrations = useDisclosure();
  const color = useColorModeValue("gray.600", "gray.300");
  const router = useRouter();
  const { data } = useSession();

  const NavItem = (props) => {
    const { icon, children, href, ...rest } = props;
    return (
      <Flex
        as={EnhancedChakraLink}
        href={`/dashboard/${router.query.guildId}${href}`}
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color="inherit"
        _dark={{
          color: "gray.400",
        }}
        _hover={{
          bg: "gray.100",
          _dark: {
            bg: "gray.900",
          },
          color: "gray.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      border
      color="inherit"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Image src="/logo.png" alt="ClickTok" maxW="50px" />
        <Text
          fontSize="2xl"
          ml="2"
          color="brand.500"
          _dark={{
            color: "white",
          }}
          fontWeight="semibold"
        >
          ClickTok
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem href="/" icon={MdHome}>
          Home
        </NavItem>
        <NavItem href="/premium" icon={FaCrown}>
          Premium
        </NavItem>
        <NavItem href="/notifications" icon={FaBell}>
          Notifications
        </NavItem>
        <NavItem href="/statistics" icon={BsGraphUp}>
          Statistics
        </NavItem>
        <NavItem href="/leaderboard" icon={HiViewBoards}>
          Leaderboard
        </NavItem>

        {/* <NavItem href="/" icon={HiCode} onClick={integrations.onToggle}>
          Integrations
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={integrations.isOpen && "rotate(90deg)"}
          />
        </NavItem>
        <Collapse in={integrations.isOpen}>
          <NavItem href="/" pl="12" py="2">
            Shopify
          </NavItem>
          <NavItem href="/" pl="12" py="2">
            Slack
          </NavItem>
          <NavItem href="/" pl="12" py="2">
            Zapier
          </NavItem>
        </Collapse> */}
        <NavItem href="/settings" icon={BsGearFill}>
          Settings
        </NavItem>
      </Flex>
    </Box>
  );

  return (
    <Box
      as="section"
      bg="gray.50"
      color="black"
      _dark={{
        bg: "gray.700",
        color: "white",
      }}
      minH="100vh"
    >
      <SidebarContent
        display={{
          base: "none",
          md: "unset",
        }}
      />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box
        ml={{
          base: 0,
          md: 60,
        }}
        transition=".3s ease"
      >
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          borderBottomWidth="1px"
          color="inherit"
          py={4}
        >
          <IconButton
            aria-label="Menu"
            display={{
              base: "inline-flex",
              md: "none",
            }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <InputGroup
            display={{
              base: "none",
              md: "flex",
            }}
            pr="4"
          >
            <InputLeftElement color="gray.500">
              <FiSearch />
            </InputLeftElement>
            <Input placeholder="Search..." border="0px" w="100%" />
          </InputGroup>

          <Flex align="center" cursor="pointer" gap={4}>
            {/* <Icon color="gray.500" as={FaBell} cursor="pointer" /> */}
            <Button>Upgrade to Premium</Button>
            <Avatar size="sm" name={data?.user.name} src={data?.user.image} />
            <Icon as={FiMenu} />
          </Flex>
        </Flex>

        <Box as="main" p="4">
          {children}
        </Box>
      </Box>
    </Box>
  );
}
