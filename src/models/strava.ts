export interface StravaAthlete {
  id: number;
  bio: string;
  city: string;
  country: string;
}
export interface StravaActivity {
  id: number;
  name: string;
  type: string;
  start_date_local: string;
  max_speed: number;
  average_speed: number;
  max_heartrate: number;
  average_heartrate: number;
  max_watts: number;
  average_watts: number;
  weighted_average_watts: number;
  calories: number;
  distance: number;
  total_elevation_gain: number;
}
