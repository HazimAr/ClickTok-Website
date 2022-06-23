import { Heading, Link } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <>
      <Heading as="h1">404 Page not Found</Heading>
      <Heading as="h3">Not sure what you were looking for here.</Heading>
      <Link href="/">Go back home</Link>
    </>
  );
}
