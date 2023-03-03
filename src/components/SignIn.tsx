import { ConnectWithStravaIcon } from "@/components/ConnectWithStravaIcon";
import { signIn } from "next-auth/react";

export function SignIn() {
  return (
    <div className={"flex flex-col items-center"}>
      <p className={"text-xl font-semibold text-center mt-1.5 mb-2"}>
        You are not signed in
      </p>
      <button onClick={() => signIn()}>
        <ConnectWithStravaIcon size={48} />
      </button>
    </div>
  );
}
