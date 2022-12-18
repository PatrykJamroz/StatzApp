import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useApp } from '../AppContext';

export function Activities() {
  const appContext = useApp();
  const rows = appContext.activities;
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'type', headerName: 'Type', width: 150 },
    {
      field: 'max_speed',
      headerName: 'Max speed [kph]',
      width: 125,
      valueFormatter: (params) => Math.round(params.value * 3.6)
    },
    { field: 'max_heartrate', headerName: 'Max HR [bpm]', width: 110 },
    { field: 'max_watts', headerName: 'Max watts [W]', width: 110 },
    {
      field: 'distance',
      headerName: 'Distance [km]',
      width: 110,
      valueFormatter: (params) => (params.value / 1000).toFixed(1)
    },
    {
      field: 'total_elevation_gain',
      headerName: 'Elevation gain [m]',
      width: 135,
      valueFormatter: (params) => Math.round(params.value)
    },
    {
      field: 'start_date',
      headerName: 'Date',
      width: 100,
      valueFormatter: (params) => new Date(params.value).toISOString().split('T')[0]
    },
    {
      field: 'id',
      headerName: 'Actions',
      width: 130,
      renderCell: (params) => (
        <Button
          variant="text"
          href={`https://www.strava.com/activities/${params.value}`}
          size="small"
          target="_blank">
          Go to activity
        </Button>
      )
    }
  ];

  return (
    <>
      <Button
        variant="outlined"
        onClick={appContext.fetchActivities}
        disabled={appContext.isFetchingActivities}>
        Fetch Activitites
      </Button>
      <div style={{ height: 632, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          loading={appContext.isFetchingActivities}
        />
      </div>
    </>
  );
}
