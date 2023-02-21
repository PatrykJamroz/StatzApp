import { getSession, GetSessionParams } from "next-auth/react";
import { StravaActivity } from "@/models/Strava";
import { getAllActivities } from "@/api/StravaAPI";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useState } from "react";

export default function Activities({ accessToken }: { accessToken: string }) {
  const [activities, setActivities] = useState<StravaActivity[]>(() => {
    const activitiesInLocalStorage = localStorage.getItem("activities");
    if (activitiesInLocalStorage) {
      return JSON.parse(activitiesInLocalStorage);
    }
    return [];
  });
  const [isFetchingActivities, setIsFetchingActivitites] = useState(false);
  const [lastSyncDate, setLastSyncDate] = useState<string | null>(() => {
    const lastSyncDate = localStorage.getItem("lastSync");
    if (lastSyncDate) {
      return JSON.parse(lastSyncDate);
    }
    return null;
  });

  const handleFetchActivities = async () => {
    setIsFetchingActivitites(true);

    const todayDate = new Date();
    const formattedDate = todayDate.toUTCString();

    const fetchedActivities = await getAllActivities(accessToken);

    setActivities(fetchedActivities);
    localStorage.setItem("activities", JSON.stringify(fetchedActivities));

    setLastSyncDate(formattedDate);
    localStorage.setItem("lastSync", JSON.stringify(formattedDate));

    setIsFetchingActivitites(false);
  };

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
    <div>
      {isFetchingActivities ? (
        <>Fetching your activities, it may take a while...</>
      ) : (
        <button disabled={isFetchingActivities} onClick={handleFetchActivities}>
          fetch activities
        </button>
      )}
      <>{`Last sync: ${lastSyncDate}`}</>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        sx={{ color: "white", height: 631 }}
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

  return {
    props: { accessToken },
  };
}
