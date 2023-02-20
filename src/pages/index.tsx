import LoginButton from "@/components/LoginButton";
import Link from "next/link";
import { getSession, GetSessionParams, useSession } from "next-auth/react";
import { User } from "@/components/User";
import { StravaAthlete } from "@/models/Strava";
import { getAthlete } from "@/api/StravaAPI";

export default function Home({ athlete }: { athlete: StravaAthlete }) {
  const { data: session } = useSession();

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>Strava Statz</h1>
      <LoginButton />
      {session && (
        <>
          <User athlete={athlete} />
          <Link href={"/activities"}>Go to activities</Link>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(
  context: GetSessionParams | undefined
): Promise<{ props: { athlete: StravaAthlete } }> {
  const session = await getSession(context);
  const accessToken = session?.accessToken;
  //TODO fix
  const athlete: StravaAthlete = await getAthlete(accessToken!);
  return {
    props: { athlete },
  };
}
