import { Box, Link } from '@mui/material';
import Typography from '@mui/material/Typography';

export function About() {
  return (
    <Box
      sx={{
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
      }}>
      <Typography variant="body1">Author: Patryk Jamróz</Typography>
      <Link sx={{ marginBottom: '15px' }} href="mailto:jamroz.patryk@gmail.com">
        jamroz.patryk@gmail.com
      </Link>
      <div>
        <a href="https://github.com/PatrykJamroz">
          <img alt="github profile" src="/GitHub_Logo.png" width={100} />
        </a>
      </div>
    </Box>
  );
}
