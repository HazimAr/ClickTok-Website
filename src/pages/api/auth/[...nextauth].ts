import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: "990688037853872159",
      clientSecret: process.env.DISCORD_SECRET,
      authorization:
        "https://discord.com/api/oauth2/authorize?scope=identify+email+guilds",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
