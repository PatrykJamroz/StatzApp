import { CircularProgress, Grid, Box } from '@mui/material';
import { Athlete } from './components/Athlete';
import { useApp } from './AppContext';
import { Authorization } from './components/Authorization';
import { DrawerAppBar } from './components/DrawerAppBar';

export function App(): JSX.Element {
  const appContext = useApp();

  return (
    <Box
      sx={{
        display: 'flex',
        wordBreak: 'break-word',
        justifyContent: 'center'
      }}>
      <DrawerAppBar>
        {appContext.isLoading ? (
          <CircularProgress />
        ) : (
          <Grid container direction="column" justifyContent="center" alignItems="center">
            {!appContext.athlete ? <Authorization /> : <Athlete />}
          </Grid>
        )}
      </DrawerAppBar>
    </Box>
  );
}
