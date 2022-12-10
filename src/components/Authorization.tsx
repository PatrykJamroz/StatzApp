import { Button } from '@mui/material';

export function Authorization() {
  const login = () => {
    window.open('http://localhost:8080/auth/strava', '_self');
  };
  return (
    <Button onClick={login} variant="outlined">
      <img alt="authorize" src="btn_strava_connectwith_orange.png" />
    </Button>
  );
}
