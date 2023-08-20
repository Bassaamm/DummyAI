import { UserButton } from "@clerk/nextjs";
import MobileSideBar from "./sideBar/MobileSideBar";
import "../app/globals.css";
export default function Navbar({ limitCounter }: { limitCounter: number }) {
  return (
    <div className=" flex w-full items-center justify-between px-5 ">
      <MobileSideBar limitCounter={limitCounter} />
      <div className="h-20 w-20 pt-6">
        {" "}
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
