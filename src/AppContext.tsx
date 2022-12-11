import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Athlete } from './models/Strava';

interface AppContextProviderProps {
  children: React.ReactNode;
}

interface AppContextValue {
  athlete: Athlete | null;
  isLoading: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const getAthlete = async () => {
    await axios
      .get('/api/athlete')
      .then(({ data }) => setAthlete(data))
      .catch((e: any) => {
        console.error(e);
        setAthlete(null);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    getAthlete();
  }, []);

  const appContextValue: AppContextValue = { athlete, isLoading };

  return <AppContext.Provider value={appContextValue}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within a AppContextProvider');
  }
  return context;
}
