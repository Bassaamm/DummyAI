"use client";
import { ModalContext } from "@/app/context/ModalContext";
import { Progress } from "@/components/ui/progress";
import { FREE_TIER_LIMIT } from "@/constants";
import { GiUpgrade } from "react-icons/gi";
export default function FreeCounterNum({
  limitCounter,
}: {
  limitCounter: number;
}) {
  const { onOpen } = ModalContext();
  const progressValue = (limitCounter / FREE_TIER_LIMIT) * 100;

  return (
    <div className="m-auto  flex max-w-sm flex-col gap-1 rounded-2xl bg-rose-600 px-8 py-3 ">
      <p className="mx-auto mt-2 font-semibold text-gray-300">
        <span className="pr-3"> {limitCounter} </span> /{" "}
        <span className="pl-2"> {FREE_TIER_LIMIT}</span>
      </p>
      <Progress className="my-3 h-4 " value={progressValue} />

      <button
        onClick={onOpen}
        className="flex items-center justify-center gap-3 rounded-lg  bg-slate-900 px-4 py-2 font-semibold text-white"
      >
        <span>Premium</span>
        <span>
          {" "}
          <GiUpgrade />
        </span>
      </button>
    </div>
  );
}
