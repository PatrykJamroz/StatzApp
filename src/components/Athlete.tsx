import { Avatar, Box } from '@mui/material';
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
    <Box
      sx={{
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
      }}>
      <Avatar
        alt={`${athlete.firstname} ${athlete.lastname}`}
        src={athlete.profile}
        sx={{ width: 125, height: 125, margin: '0 auto' }}
      />
      <Typography variant="h4">{`${athlete.firstname} ${athlete.lastname}`}</Typography>
      <Typography variant="h5">{athlete.bio}</Typography>
    </Box>
  );
}
