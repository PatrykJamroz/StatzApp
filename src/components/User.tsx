import { StravaAthlete } from "@/models/strava";

export function User({ athlete }: { athlete: StravaAthlete }) {
  if (!athlete) {
    return null;
  }
  return <h3>{`${athlete.bio} | ${athlete.city} - ${athlete.country}`}</h3>;
}
