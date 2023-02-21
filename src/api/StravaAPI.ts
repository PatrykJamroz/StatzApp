import { StravaActivity, StravaAthlete } from "@/models/Strava";

export async function getAthlete(accessToken: string): Promise<StravaAthlete> {
  const res = await fetch(
    `https://www.strava.com/api/v3/athlete?access_token=${accessToken}`
  );
  const athlete: StravaAthlete = await res.json();
  return athlete;
}

export async function getAllActivities(
  accessToken: string
): Promise<StravaActivity[]> {
  let page = 1;
  let activities: StravaActivity[] = [];

  while (true) {
    console.info(`fetching page: ${page}`);
    const res = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?per_page=30&page=${page}&access_token=${accessToken}`
    );
    const fetchedActivities: StravaActivity[] = await res.json();
    page += 1;
    activities.push(...fetchedActivities);
    if (fetchedActivities.length < 30) {
      return activities;
    }
  }
}
