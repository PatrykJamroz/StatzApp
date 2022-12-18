import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { Activity, Athlete } from './models/Strava';
import { getActivities, getAthlete } from './API/appAPI';

interface AppContextProviderProps {
  children: React.ReactNode;
}

interface AppContextValue {
  athlete: Athlete | null;
  isLoading: boolean;
  activities: Activity[];
  fetchActivities(): Promise<void>;
  isFetchingActivities: boolean;
  lastSyncDate: string | null;
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
  const [isFetchingActivities, setIsFetchingActivitites] = useState(false);
  const [lastSyncDate, setLastSyncDate] = useState<string | null>(() => {
    const lastSyncDate = localStorage.getItem('lastSync');
    if (lastSyncDate) {
      return JSON.parse(lastSyncDate);
    }
    return null;
  });

  const athleteFetched = React.useRef(false);

  const fetchAthlete = async () => {
    try {
      const athleteData = await getAthlete();
      setAthlete(athleteData);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchActivities = async () => {
    const todayDate = new Date();
    const formattedDate = todayDate.toUTCString();
    try {
      setIsFetchingActivitites(true);
      const activitiesData = await getActivities();
      setActivities(activitiesData);
      setLastSyncDate(formattedDate);
      localStorage.setItem('activities', JSON.stringify(activitiesData));
      localStorage.setItem('lastSync', JSON.stringify(formattedDate));
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetchingActivitites(false);
    }
  };

  useEffect(() => {
    if (athleteFetched.current) return;
    athleteFetched.current = true;
    fetchAthlete();
  }, []);

  const appContextValue: AppContextValue = {
    athlete,
    isLoading,
    activities,
    fetchActivities,
    isFetchingActivities,
    lastSyncDate
  };

  return <AppContext.Provider value={appContextValue}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within a AppContextProvider');
  }
  return context;
}
