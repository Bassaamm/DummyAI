import Navbar from "@/components/Navbar";
import SideBar from "@/components/sideBar/SideBar";
import { getApiNum } from "@/lib/apiLimit";
import React from "react";

export default async function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const limitCounter = await getApiNum();
  return (
    <div className="flex h-[100dvh] w-full   ">
      <div className="hidden md:block">
        <SideBar limitCounter={limitCounter} />
      </div>
      <div className=" flex-1 overflow-y-scroll  ">
        <Navbar limitCounter={limitCounter} />
        {children}
      </div>
    </div>
  );
}
