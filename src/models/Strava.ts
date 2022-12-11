export interface Athlete {
  id: number;
  firstname: string;
  lastname: string;
  bio: string;
  profile: string;
}

export interface Activity {
  id: number;
  max_heartrate: number;
  max_speed: number;
  name: string;
  type: string;
  start_date_local: string;
}
