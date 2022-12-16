import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, Athlete } from './models/Strava';

interface AppContextProviderProps {
  children: React.ReactNode;
}

interface AppContextValue {
  athlete: Athlete | null;
  isLoading: boolean;
  activities: Activity[];
  getActivities(): Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [activities, setActivities] = useState<Activity[]>(() => {
    const activitiesInLocalStorage = localStorage.getItem('activities');
    if (activitiesInLocalStorage) {
      return JSON.parse(activitiesInLocalStorage);
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(true);
  const athleteFetched = React.useRef(false);
  const getAthlete = async () => {
    axios
      .get('/api/athlete')
      .then(({ data }) => setAthlete(data))
      .catch((e: any) => {
        console.error(e);
        setAthlete(null);
      });
    setIsLoading(false);
  };

  const getActivities = async () => {
    try {
      const activitiesData = await axios.get('/api/activities');
      setActivities(activitiesData.data);
      localStorage.setItem('activities', JSON.stringify(activitiesData));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (athleteFetched.current) return;
    athleteFetched.current = true;
    getAthlete();
  }, []);

  const appContextValue: AppContextValue = { athlete, isLoading, activities, getActivities };

  return <AppContext.Provider value={appContextValue}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within a AppContextProvider');
  }
  return context;
}
