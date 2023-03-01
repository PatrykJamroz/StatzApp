import { StravaAthlete } from "@/models/Strava";
import { useSession } from "next-auth/react";

export function User({ athlete }: { athlete: StravaAthlete }) {
  const { data: session } = useSession();

  if (!athlete || !session) {
    return <>Not signed in</>;
  }
  return (
    <div
      className={"max-w-3xl grid sm:grid-cols-3 grid-cols-1 gap-4 mx-auto p-5 "}
    >
      <div className={"col-span-1 mx-auto sm:col-span-1"}>
        <img
          loading="lazy"
          src={session?.user.image ?? ""}
          height={200}
          width={200}
          alt={"profile photo"}
        />
      </div>
      <div
        className={
          "sm:col-span-2 sm:h-50 h-100 col-span-1 text-center sm:text-left"
        }
      >
        <p className={"text-3xl font-semibold"}>{`${session.user.name}`}</p>
        {(athlete.country || athlete.city) && (
          <p className={"text-lg font-normal"}>
            {`${
              athlete.city ? `${athlete.city}${athlete.country ? "," : ""}` : ""
            } ${athlete.country ? `${athlete.country}` : ""}`}
          </p>
        )}
        <div className={"max-h-24 overflow-auto mb-1.5"}>
          <p className={"text-md"}>{athlete.bio}</p>
        </div>
        <p className={"text-md font-semibold"}>Strava account details:</p>
        <p className={"text-sm"}>
          {`ID: ${athlete.id}, Created at: ${new Date(
            athlete.created_at
          ).toUTCString()}`}
        </p>
      </div>
    </div>
  );
}
