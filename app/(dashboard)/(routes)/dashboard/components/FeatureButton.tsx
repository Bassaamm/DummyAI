"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import { list } from "@/app/data/dashboardList";
export default function FeatureButton() {
  const router = useRouter();
  return list.map((feature) => {
    if (feature === undefined) return;
    const Icon = feature?.icon;
    const linkhref: string = feature.href;

    return (
      <>
        {feature?.name === "Dashboard" ||
        feature?.name === "Settings" ? null : (
          <div
            onClick={() => router.push(linkhref)}
            className={cn(
              "flex cursor-pointer gap-4 rounded-2xl border-2  p-4 text-lg font-semibold",
              feature.color ? feature?.color : "",
              feature?.broderColor ? feature?.broderColor : "",
              feature?.bgColor ? `hover:${feature?.bgColor}` : "",
            )}
          >
            <span>
              <Icon size="1.5rem" />
            </span>
            <span>{feature.name}</span>
          </div>
        )}
      </>
    );
  });
}
