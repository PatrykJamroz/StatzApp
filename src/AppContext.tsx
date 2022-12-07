import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { User } from './models/User';
import axios from 'axios';

interface AppContextProviderProps {
  children: React.ReactNode;
}

interface AppContextValue {
  user: User | null;
  ping(): void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const userPromise = await fetch('/athlete');
    // const userPromise = await fetch('/athlete');
    console.log({ userPromise });
    const loggedUser = await userPromise.json();
    console.log({ loggedUser });
    setUser(loggedUser);
  };

  // const ping = async () => {
  //   console.log('click');
  //   const pingPromise = await fetch('/api/ping');
  //   console.log({ pingPromise });
  //   const maybePong = await pingPromise.json();
  //   console.log({ maybePong });
  //   return;
  // };

  const ping = async () => {
    console.log('test');
    axios
      .get('/api/ping')
      .then((data) => console.log({ test2: data }))
      .catch((e) => console.error(e));
    // console.log({ pingPromise });
    // const maybePong = await pingPromise.json();
    // console.log({ maybePong });
    // return;
  };

  useEffect(() => {
    fetchUser();
    // ping();
  }, []);

  const appContextValue: AppContextValue = { user, ping };

  return <AppContext.Provider value={appContextValue}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within a AppContextProvider');
  }
  return context;
}
