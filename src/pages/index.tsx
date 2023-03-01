import { getSession, GetSessionParams, useSession } from "next-auth/react";
import { User } from "@/components/User";
import { StravaAthlete } from "@/models/Strava";
import { getAthlete } from "@/api/StravaAPI";
import { SignIn } from "@/components/SignIn";

interface HomeProps {
  athlete: StravaAthlete | null;
}
export default function Home(props: HomeProps) {
  const { data: session } = useSession();
  return (
    <>
      {session && props.athlete ? <User athlete={props.athlete} /> : <SignIn />}
    </>
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
