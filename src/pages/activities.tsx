import { getSession, GetSessionParams } from "next-auth/react";
import { StravaActivity } from "@/models/Strava";
import { getActivities } from "@/api/StravaAPI";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

export default function Activities({
  activities,
}: {
  activities: StravaActivity[];
}) {
  const rows: GridRowsProp = activities;
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 300 },
    { field: "type", headerName: "Type", width: 150 },
    {
      field: "max_speed",
      headerName: "Max speed [kph]",
      width: 125,
      valueFormatter: (params) => Math.round(params.value * 3.6),
    },
    { field: "max_heartrate", headerName: "Max HR [bpm]", width: 110 },
    { field: "max_watts", headerName: "Max watts [W]", width: 110 },
    {
      field: "distance",
      headerName: "Distance [km]",
      width: 110,
      valueFormatter: (params) => (params.value / 1000).toFixed(1),
    },
    {
      field: "total_elevation_gain",
      headerName: "Elevation gain [m]",
      width: 135,
      valueFormatter: (params) => Math.round(params.value),
    },
    {
      field: "start_date",
      headerName: "Date",
      width: 100,
      valueFormatter: (params) =>
        new Date(params.value).toISOString().split("T")[0],
    },
  ];

  return (
    <div style={{ height: 631 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        sx={{ color: "white" }}
      />
    </div>
  );
}

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { destination: "/" } };
  }
  const accessToken = session?.accessToken;

  try {
    const activities = await getActivities(accessToken);
    return {
      props: { activities },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/",
        statusCode: 307,
      },
    };
  }
}
