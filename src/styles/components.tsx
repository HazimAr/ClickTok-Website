import type { ComponentStyleConfig } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: "bold",
    // textTransform: "uppercase",
    borderRadius: "lg",
  },
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4,
      py: 3,
    },
    md: {
      fontSize: "md",
      px: 6,
      py: 4,
    },
  },
  variants: {
    primary: {
      bg: "white",
      color: "black",
      borderColor: "white",
      borderWidth: "2px",

      _hover: {
        color: "white",
        bg: "hsla(0, 0%, 0%, 0)",
        borderColor: "white",
        borderWidth: "2px",
      },
    },

    secondary: {
      bg: "secondary",
      color: "primary",
      borderColor: "secondary",
      borderWidth: "2px",
      _hover: {
        color: "secondary",
        bg: "hsla(0, 0%, 0%, 0)",
        borderColor: "secondary",
        borderWidth: "2px",
      },
    },
    accent: {
      bg: "accent",
      color: "white",
      borderColor: "accent",
      borderWidth: "2px",
      _hover: {
        color: "accent",
        bg: "hsla(0, 0%, 0%, 0)",
        borderColor: "accent",
        borderWidth: "2px",
      },
    },
  },

  defaultProps: {
    size: "md",
    variant: "primary",
  },
};

export const Link: ComponentStyleConfig = {
  baseStyle: {
    _active: { boxShadow: "none" },
    _focus: { boxShadow: "none" },
    _hover: { textDecoration: "none", color: "primary" },
  },
  sizes: {},
  variants: {},
  defaultProps: {},
};
