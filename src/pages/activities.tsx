import { getSession, GetSessionParams } from "next-auth/react";
import { StravaActivity } from "@/models/Strava";

export default function Activities({
  activities,
}: {
  activities: StravaActivity;
}) {
  return (
    <div>
      Activities
      <>{JSON.stringify(activities)}</>
    </div>
  );
}

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { destination: "/" } };
  }
  const accessToken = session?.accessToken;

  try {
    const res = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?per_page=30&page=1&access_token=${accessToken}`
    );
    const activities = await res.json();
    return {
      props: { activities },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/",
        statusCode: 307,
      },
    };
  }
}
