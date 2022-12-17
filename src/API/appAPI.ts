import axios from 'axios';
import { Activity, Athlete } from '../models/Strava';

export const getAthlete = async (): Promise<Athlete> => {
  return axios.get('/api/athlete').then(({ data }) => data);
};

export const getActivities = async (): Promise<Activity[]> => {
  return axios.get('/api/activities').then(({ data }) => data);
};
