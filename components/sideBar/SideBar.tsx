"use client";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { list } from "@/app/data/dashboardList";
import { useState } from "react";
import FreeCounterNum from "../FreeCounterNum";

export default function SideBar({ limitCounter }: { limitCounter: number }) {
  const pathName = usePathname();

  return (
    <div className="flex h-full flex-auto flex-col justify-between overflow-scroll bg-slate-900">
      <div className={cn("flex h-full flex-col  gap-4 py-4")}>
        <div className="flex-1  px-3 py-2">
          {" "}
          <Link href="/" className="mb-14 flex items-center pl-3">
            <div className="relative  mr-4 h-11 w-11">
              <Image
                alt="logo"
                fill
                src="/download.png"
                className="rounded-full"
              />
            </div>
            <h1 className="text-2xl font-bold text-white">YourMate</h1>
          </Link>
          <div className="ml-4 space-y-4 px-4">
            {list.map((route) => {
              if (route === undefined) return;
              const linkhref: string = route.href;
              const Icon = route.icon;
              return (
                <Link
                  key={route.name}
                  href={linkhref}
                  className={`group flex w-full justify-start  rounded-lg p-3  text-lg font-semibold text-gray-200 hover:scale-110 hover:bg-blue-500  hover:text-white hover:transition  
          ${pathName === route.href ? "bg-slate-600" : ""}`}
                >
                  <div className="flex items-center gap-4 ">
                    <span className={route.color}>
                      <Icon size="1.75rem" />
                    </span>
                    {route.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mx-6 my-6 text-center text-lg text-white">
        <FreeCounterNum limitCounter={limitCounter} />
      </div>
    </div>
  );
}
