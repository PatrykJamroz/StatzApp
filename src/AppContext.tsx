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
  getActivities(): void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
    axios
      .get('/api/activities')
      .then(({ data }) => setActivities(data.activitiesData))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
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
