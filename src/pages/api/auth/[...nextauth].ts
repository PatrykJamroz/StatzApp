import NextAuth, { Session, User } from "next-auth";
import StravaProvider from "next-auth/providers/strava";
import { StravaAthlete } from "@/models/strava";

interface Token {
  id: string;
  accessToken: string;
  exp: number;
}
export const authOptions = {
  providers: [
    StravaProvider({
      clientId: process.env.STRAVA_CLIENT_ID ?? "",
      clientSecret: process.env.STRAVA_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: ["profile:read_all", "activity:read_all"].join(","),
        },
      },
    }),
  ],
  callbacks: {
    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: Token;
      user: User;
    }) {
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: Token;
      user: Session["user"];
      account: {
        provider: "strava";
        type: "oauth";
        expires_at: number;
        refresh_token: string;
        access_token: string;
        athlete: StravaAthlete;
      };
    }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};
//TODO fix typing
//@ts-ignore
export default NextAuth(authOptions);
