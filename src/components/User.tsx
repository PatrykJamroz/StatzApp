import { StravaAthlete } from "@/models/Strava";
import { useSession } from "next-auth/react";

export function User({ athlete }: { athlete: StravaAthlete }) {
  const { data: session } = useSession();

  if (!athlete || !session) {
    return null;
  }
  return (
    <>
      Signed in as {session.user.name} <br />
      <img
        loading="lazy"
        src={session?.user.image ?? ""}
        width={50}
        height={50}
      />
      <br />
      <h3>{`${athlete.bio} | ${athlete.city} - ${athlete.country}`}</h3>
    </>
  );
}
