import { extendTheme } from "@chakra-ui/react";
import { Button, Link } from "./components";

const theme = extendTheme({
  colors: {
    primary: "hsl(139, 86%, 50%)",
    secondary: "hsl(235, 86%, 30%)",
    accent: "hsl(0, 0%, 12%)",
    bg: "hsl(235, 86%, 10%)",
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
        backgroundColor: "bg",
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
