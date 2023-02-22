import NextAuth, { Session, User } from "next-auth";
import StravaProvider from "next-auth/providers/strava";
import { StravaAthlete } from "@/models/Strava";
import * as process from "process";

interface Token {
  id: string;
  accessToken: string;
  accessTokenExpires: number;
  refreshToken: string;
  error?: string;
}

async function refreshToken(token: Token): Promise<Token> {
  try {
    const url =
      "https://www.strava.com/oauth/token?" +
      new URLSearchParams({
        client_id: process.env.STRAVA_CLIENT_ID ?? "",
        client_secret: process.env.STRAVA_CLIENT_SECRET ?? "",
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (err) {
    console.log(err);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
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
        expires_in: number;
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
        token.accessTokenExpires = Date.now() + account.expires_in * 1000;
        token.refreshToken = account.refresh_token;
      }
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
      return refreshToken(token);
    },
  },
};
//TODO fix typing
//@ts-ignore
export default NextAuth(authOptions);
