import LoginButton from "@/components/LoginButton";
import Link from "next/link";
import { getSession, GetSessionParams, useSession } from "next-auth/react";
import { User } from "@/components/User";
import { StravaAthlete } from "@/models/Strava";
import { getAthlete } from "@/api/StravaAPI";

interface HomeProps {
  athlete: StravaAthlete | null;
}
export default function Home(props: HomeProps) {
  const { data: session } = useSession();
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>Strava Statz</h1>
      <LoginButton />
      {session && props.athlete && (
        <>
          <User athlete={props.athlete} />
          <Link href={"/activities"}>Go to activities</Link>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(
  context: GetSessionParams | undefined
): Promise<{ props: HomeProps }> {
  const session = await getSession(context);
  const accessToken = session?.accessToken;
  try {
    //TODO fix !
    const athlete: StravaAthlete = await getAthlete(accessToken!);
    return {
      props: { athlete },
    };
  } catch (err) {
    console.error(err);
    return { props: { athlete: null } };
  }
}
