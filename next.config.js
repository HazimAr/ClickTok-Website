module.exports = {
  // 3x Faster refresh 5x Faster builds
  // Rust compiler
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/invite",
        destination:
          "https://discord.com/api/oauth2/authorize?client_id=1001767923842556036&permissions=274878032912&scope=bot%20applications.commands",
        permanent: true,
      },
      {
        source: "/support",
        destination: "https://discord.gg/tg2QTMEc9g",
        permanent: true,
      },
    ];
  },
};
