import { SessionProvider } from "next-auth/react";
const sessionData = require("./session.json");

interface SessionProviderMockProps {
  children: React.ReactNode;
  isSigned?: boolean;
}
export function SessionProviderMock(props: SessionProviderMockProps) {
  return (
    <SessionProvider session={props.isSigned ? sessionData : null}>
      {props.children}
    </SessionProvider>
  );
}
