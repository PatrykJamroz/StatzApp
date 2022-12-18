import { CircularProgress, Grid } from '@mui/material';
import { Athlete } from '../components/Athlete';
import { useApp } from '../AppContext';
import { Authorization } from '../components/Authorization';

export function Profile(): JSX.Element {
  const appContext = useApp();
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      {appContext.isLoading ? (
        <CircularProgress />
      ) : (
        <div>{!appContext.athlete ? <Authorization /> : <Athlete />}</div>
      )}
    </Grid>
  );
}
