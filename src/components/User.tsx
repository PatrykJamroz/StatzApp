import { useApp } from '../AppContext';
import axios from 'axios';
import { useState } from 'react';

export function User(): JSX.Element | null {
  const appContext = useApp();

  if (!appContext.user) {
    return null;
  }

  const [activities, setActivities] = useState({});

  const fectchActivites = () => axios.get('/activities').then(({ data }) => setActivities(data));

  return (
    <>
      <p>User data</p>
      <button type="button" onClick={appContext.ping}>
        Ping
      </button>
      {JSON.stringify(appContext.user)}
      <button type="button" onClick={fectchActivites}>
        fetch activties
      </button>
      {JSON.stringify(activities)}
    </>
  );
}
