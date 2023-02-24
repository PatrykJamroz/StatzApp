import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  return (
    <button
      className={
        "block py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:border-0 md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white"
      }
      onClick={() => (session ? signOut() : signIn())}
    >{`Sign ${session ? "out" : "in"}`}</button>
  );
}
