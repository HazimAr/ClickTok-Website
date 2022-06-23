import { extendTheme } from "@chakra-ui/react";
import { Button, Link } from "./components";

const theme = extendTheme({
  colors: {
    primary: "#57f287",
    secondary: "#5865f2",
  },
  components: {
    Button,
    Link,
  },
  styles: {
    global: () => ({
      body: {
        fontFamily:
          "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
        backgroundColor: "secondary",
        color: "white",
      },
      "&::-webkit-scrollbar": {
        width: "0.6em",
      },
      "&::-webkit-scrollbar-track": {
        borderRadius: "0px",
        background: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "primary",
        borderRadius: "50px",
      },
    }),
  },
});

export default theme;
