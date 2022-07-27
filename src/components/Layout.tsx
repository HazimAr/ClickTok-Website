import {
  useDisclosure,
  useColorModeValue,
  Flex,
  Icon,
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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FaBell,
  FaCrown,
  // FaRecycle
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
// import { HiViewBoards } from "react-icons/hi";
import { MdHome, MdLogout } from "react-icons/md";
import { BsGearFill, BsGraphUp } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import EnhancedChakraLink from "./EnhancedChakraLink";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import axios from "axios";
import { API, META } from "config";
import Head from "next/head";
import {
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
} from "@chakra-ui/icons";

export default function DashboardLayout({ children = null }) {
  const sidebar = useDisclosure();
  const color = useColorModeValue("gray.600", "gray.300");
  const router = useRouter();
  const { data, status } = useSession();

  useEffect(() => {
    if (!router.query.guildId) return;
    if (status == "loading") return;
    if (status == "unauthenticated") {
      router.push("/login");
      return;
    }
    axios
      .get(`${API}/guilds/${router.query.guildId}`, {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      })
      .catch(() => router.push("/dashboard"));
  }, [status, router]);

  const NavItem = (props) => {
    const { icon, children, href, ...rest } = props;
    return (
      <Flex
        as={EnhancedChakraLink}
        href={`/dashboard/${router.query.guildId}${href}`}
        // this right here is called im fucking lazy and i don't wanna refractor this bullshit of a code
        bg={
          router.asPath.split("/")[router.asPath.split("/").length - 1] ==
            router.query.guildId && !href.substring(1, href.length)
            ? "gray.100"
            : href.substring(1, href.length) ==
              router.asPath.split("/")[router.asPath.split("/").length - 1]
            ? "gray.100"
            : "transparent"
        }
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color="inherit"
        _dark={{
          color: "gray.400",
          // this right here is called im fucking lazy and i don't wanna refractor this bullshit of a code
          bg:
            router.asPath.split("/")[router.asPath.split("/").length - 1] ==
              router.query.guildId && !href.substring(1, href.length)
              ? "gray.900"
              : href.substring(1, href.length) ==
                router.asPath.split("/")[router.asPath.split("/").length - 1]
              ? "gray.900"
              : "transparent",
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
        <NavItem href="" icon={MdHome}>
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
        {/* <NavItem href="/convert" icon={FaRecycle}>
          Convert
        </NavItem> */}
        <NavItem href="/settings" icon={BsGearFill}>
          Settings
        </NavItem>
      </Flex>
    </Box>
  );
  const title = router.asPath.split("/")[router.asPath.split("/").length - 1];

  return (
    <>
      <Head>
        <title>
          {title.charAt(0).toUpperCase() + title.substring(1)} | {META.title}
        </title>
      </Head>
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
            {/* <InputGroup
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
            </InputGroup> */}

            <Flex align="center" cursor="pointer" gap={4} ml="auto">
              {/* <Icon color="gray.500" as={FaBell} cursor="pointer" /> */}
              <Button
                as={EnhancedChakraLink}
                href={`/dashboard/${router.query.guildId}/premium`}
              >
                Upgrade to Premium
              </Button>
              <Menu>
                <MenuButton
                  as={Avatar}
                  aria-label="Options"
                  size="sm"
                  name={data?.user.name}
                  src={data?.user.image}
                />
                <MenuList>
                  <EnhancedChakraLink href="/dashboard">
                    <MenuItem icon={<AddIcon />}>
                      Choose Another Server
                    </MenuItem>
                  </EnhancedChakraLink>
                  <EnhancedChakraLink
                    href={`/dashboard/${router.query.guildId}/premium`}
                  >
                    <MenuItem icon={<FaCrown />}>Get Premium</MenuItem>
                  </EnhancedChakraLink>
                  <MenuItem
                    icon={<MdLogout />}
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          <Box as="main" p={8}>
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
}
