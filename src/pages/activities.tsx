import { useSession } from "next-auth/react";
import { StravaActivity } from "@/models/Strava";
import { getAllActivities, updateActivities } from "@/api/StravaAPI";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useState } from "react";
import { SignIn } from "@/components/SignIn";

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
    return <SignIn />;
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
    {
      field: "name",
      headerName: "Name",
      width: 300,
      renderCell: (params) => (
        <a
          href={`https://www.strava.com/activities/${params.id}`}
          target={"_blank"}
          rel="noreferrer"
        >
          {params.value}
        </a>
      ),
    },
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
    <div className={"p-5"}>
      {isFetchingActivities ? (
        <>Fetching your activities, it may take a while...</>
      ) : (
        <div
          className={"flex justify-between items-center sm:flex-row flex-col"}
        >
          <div className={"flex gap-1.5 mb-2"}>
            <button
              disabled={isFetchingActivities}
              onClick={handleFetchActivities}
              className={
                "bg-gray-900 rounded p-2 text-gray-400 hover:text-white text-sm  font-semibold"
              }
            >
              Get activities
            </button>
            <br />
            <button
              disabled={isFetchingActivities}
              onClick={handleClearData}
              className={
                "bg-gray-900 rounded p-2 text-gray-400 hover:text-white text-sm  font-semibold"
              }
            >
              Clear activity data
            </button>
          </div>
          {lastSyncDate && (
            <p className={"text-sm"}>{`Last sync: ${lastSyncDate}`}</p>
          )}
        </div>
      )}
      <div className={"justify-center flex"}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          sx={{ height: 631 }}
        />
      </div>
    </div>
  );
}
export async function getStaticProps() {
  return {
    props: { initialActivities: [], initialLastSyncDate: null },
  };
}
