import { extendTheme } from "@chakra-ui/react";
import { Button, Link } from "./components";

const theme = extendTheme({
  colors: {
    primary: "hsl(209, 61%, 50%)",
    secondary: "hsl(259, 72%, 69%)",
    accent: "hsl(0, 0%, 10%)",
    bg: "linear-gradient(45deg, hsl(209, 61%, 50%) 0%, hsl(259,72%, 69%) 100%)",
    // bg: "hsl(211, 100%, 6%)",
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
        background: "bg",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
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
