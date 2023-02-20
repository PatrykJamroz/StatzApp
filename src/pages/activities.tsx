import { getSession, GetSessionParams } from "next-auth/react";
import { StravaActivity } from "@/models/Strava";
import { getActivities } from "@/api/StravaAPI";

export default function Activities({
  activities,
}: {
  activities: StravaActivity;
}) {
  return (
    <div>
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
    const activities = await getActivities(accessToken);
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
