import { StravaAthlete } from "@/models/Strava";

export function User({ athlete }: { athlete: StravaAthlete }) {
  if (!athlete) {
    return null;
  }
  return <h3>{`${athlete.bio} | ${athlete.city} - ${athlete.country}`}</h3>;
}
