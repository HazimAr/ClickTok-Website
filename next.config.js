module.exports = {
  // 3x Faster refresh 5x Faster builds
  // Rust compiler
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/invite",
        destination:
          "https://discord.com/api/oauth2/authorize?client_id=990688037853872159&permissions=8&scope=bot%20applications.commands",
        permanent: true,
      },
      {
        source: "/support",
        destination: "https://discord.com/invite/yTan2juCBD",
        permanent: true,
      },
    ];
  },
};
