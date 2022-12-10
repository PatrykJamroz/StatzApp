import { Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useApp } from '../AppContext';

export function Athlete(): JSX.Element | null {
  const appContext = useApp();
  const { athlete } = appContext;

  if (!athlete) {
    return null;
  }

  return (
    <>
      <Avatar
        alt={`${athlete.firstname} ${athlete.lastname}`}
        src={athlete.profile}
        sx={{ width: 125, height: 125 }}
      />
      <Typography variant="h4">{`${athlete.firstname} ${athlete.lastname}`}</Typography>
      <Typography variant="h5">{athlete.bio}</Typography>
    </>
  );
}
