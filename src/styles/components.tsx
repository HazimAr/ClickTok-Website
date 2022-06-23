import type { ComponentStyleConfig } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: "bold",
    textTransform: "uppercase",
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
      bg: "primary",
      color: "white",
      boxShadow: "2px 2px 2px 1px ",
      _hover: { transform: "scale(1.05)", boxShadow: "none" },
    },
    secondary: {
      bg: "secondary",
      color: "primary",
      _hover: { bg: "primary", color: "secondary" },
    },
    accent: {
      bg: "accent",
      color: "white",
      _hover: { transform: "scale(1.05)" },
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
