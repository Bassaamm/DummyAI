"use client";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";

export default function MobileSideBar({
  limitCounter,
}: {
  limitCounter: number;
}) {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(true);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="pt-5 md:hidden">
          <AiOutlineMenuUnfold size="2rem" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SideBar limitCounter={limitCounter} />
      </SheetContent>
    </Sheet>
  );
}
