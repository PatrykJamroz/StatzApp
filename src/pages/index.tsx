import LoginButton from "@/components/LoginButton";
import Link from "next/link";
import { getSession, GetSessionParams, useSession } from "next-auth/react";
import { User } from "@/components/User";
import { StravaAthlete } from "@/models/strava";

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
  const res = await fetch(
    `https://www.strava.com/api/v3/athlete?access_token=${accessToken}`
  );
  const athlete: StravaAthlete = await res.json();
  console.log({ session });
  return {
    props: { athlete },
  };
}
