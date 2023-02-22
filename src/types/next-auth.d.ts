import NextAuth, { DefaultSession } from "next-auth";
import { string } from "prop-types";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string;
    user: {
      /** The user's postal address. */
    } & DefaultSession["user"] & { id: string };
  }
}
