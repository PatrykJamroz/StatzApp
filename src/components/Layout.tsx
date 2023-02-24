import React, { ReactNode } from "react";
import { Navbar } from "./Navbar";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
}
export function Layout(props: LayoutProps): JSX.Element {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
}
