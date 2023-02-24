import React from "react";
import Link from "next/link";
import { PoweredByStravaIcon } from "@/components/PoweredByStravaIcon";
import LoginButton from "@/components/LoginButton";

export function Navbar() {
  return (
    <>
      <h3>Strava Statz</h3>
      <LoginButton />
      <Link href={"/"}>User</Link>
      <Link href={"/activities"}>Activities</Link>
      <Link href={"/About"}>About</Link>
      <PoweredByStravaIcon size={30} fill={"#999"} />
    </>
  );
}
