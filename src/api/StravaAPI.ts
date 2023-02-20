import { StravaActivity, StravaAthlete } from "@/models/Strava";

export async function getAthlete(accessToken: string): Promise<StravaAthlete> {
  const res = await fetch(
    `https://www.strava.com/api/v3/athlete?access_token=${accessToken}`
  );
  const athlete: StravaAthlete = await res.json();
  return athlete;
}

export async function getActivities(
  accessToken: string
): Promise<StravaActivity[]> {
  const res = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?per_page=30&page=1&access_token=${accessToken}`
  );
  const activities: StravaActivity[] = await res.json();
  return activities;
}
