import { useSession } from "next-auth/react";
import { StravaActivity } from "@/models/Strava";
import { getAllActivities, updateActivities } from "@/api/StravaAPI";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useState } from "react";
import Link from "next/link";

interface ActivitiesProps {
  initialActivities: StravaActivity[];
  initialLastSyncDate: string | null;
}

export default function Activities(props: ActivitiesProps) {
  const { data: session } = useSession();

  const [activities, setActivities] = useState<StravaActivity[]>(() => {
    const activitiesInLocalStorage =
      typeof window !== "undefined" ? localStorage.getItem("activities") : null;
    if (activitiesInLocalStorage) {
      return JSON.parse(activitiesInLocalStorage);
    }
    return props.initialActivities;
  });
  const [isFetchingActivities, setIsFetchingActivitites] = useState(false);
  const [lastSyncDate, setLastSyncDate] = useState<string | null>(() => {
    const lastSyncDate =
      typeof window !== "undefined" ? localStorage.getItem("lastSync") : null;
    if (lastSyncDate) {
      return JSON.parse(lastSyncDate);
    }
    return props.initialLastSyncDate;
  });

  if (!session) {
    return <></>;
  }

  const accessToken = session.accessToken;

  const handleFetchActivities = async () => {
    setIsFetchingActivitites(true);

    try {
      const fetchedActivities =
        activities.length === 0
          ? await getAllActivities(accessToken)
          : await updateActivities(accessToken, activities);

      const todayDate = new Date();
      const formattedDate = todayDate.toUTCString();

      setActivities(fetchedActivities);
      localStorage.setItem("activities", JSON.stringify(fetchedActivities));

      setLastSyncDate(formattedDate);
      localStorage.setItem("lastSync", JSON.stringify(formattedDate));
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetchingActivitites(false);
    }
  };

  const handleClearData = () => {
    localStorage.removeItem("activities");
    localStorage.removeItem("lastSync");
    setActivities([]);
    setLastSyncDate(null);
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
      <Link href={"/"}>Go to user page</Link>
      {isFetchingActivities ? (
        <>Fetching your activities, it may take a while...</>
      ) : (
        <div>
          <button
            disabled={isFetchingActivities}
            onClick={handleFetchActivities}
          >
            fetch activities
          </button>
          <br />
          <button disabled={isFetchingActivities} onClick={handleClearData}>
            clear data
          </button>
        </div>
      )}
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        sx={{ color: "white", height: 631 }}
      />
      {lastSyncDate && <>{`Last sync: ${lastSyncDate}`}</>}
    </div>
  );
}
export async function getStaticProps() {
  return {
    props: { initialActivities: [], initialLastSyncDate: null },
  };
}
