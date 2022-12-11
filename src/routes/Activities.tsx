import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useApp } from '../AppContext';

export function Activities() {
  const appContext = useApp();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    appContext.getActivities();
    setIsLoading(false);
  }, []);

  const rows = appContext.activities;
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 100, sortable: false },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'name', headerName: 'Name', width: 300 },
    {
      field: 'max_speed',
      headerName: 'Max speed',
      width: 110,
      valueFormatter: (params: any) => Math.round(params.value * 3.6)
    },
    { field: 'max_heartrate', headerName: 'Max HR', width: 90 },
    { field: 'max_watts', headerName: 'Max watts', width: 110 }
  ];

  return (
    <div style={{ height: 632, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} loading={isLoading} />
    </div>
  );
}
