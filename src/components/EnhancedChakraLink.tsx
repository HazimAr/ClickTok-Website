import { Link } from "@chakra-ui/react";
import NextLink from "next/link";

export default function EnhancedChakraLink(props: any) {
  return (
    <NextLink href={props.href} passHref>
      <Link
        _active={{ boxShadow: "none" }}
        _focus={{ boxShadow: "none" }}
        _hover={{ textDecoration: "none" }}
        {...props}
      >
        {props.children}
      </Link>
    </NextLink>
  );
}
