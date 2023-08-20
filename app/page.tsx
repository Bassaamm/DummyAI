"use client";

import LandingPageButton from "@/components/LandingPageButton";
import LandingPageHeader from "@/components/LandingPageHeader";
import Testmo from "@/components/Testmo";
import { Button } from "@/components/ui/button";
import { UserButton, useAuth } from "@clerk/nextjs";
import TypewriterComponent from "typewriter-effect";

export default function LandingPage() {
  const { isSignedIn } = useAuth();

  return (
    <div className=" min-h-screen w-full bg-slate-900 text-center ">
      <LandingPageHeader isSignedIn={isSignedIn} />
      <main>
        <div className="mt-20 flex w-full flex-col items-center justify-center gap-8  px-4  text-white/95">
          <p className="text-2xl font-bold md:text-4xl ">
            YourMate AI is Here to provide you the help you need
          </p>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-clip-text px-12  py-1 text-center text-lg  font-semibold text-transparent transition-all md:text-3xl">
          <span className="text-center">Lend you help like if it was </span>
          <TypewriterComponent
            options={{
              strings: ["BATMAN.", "SPIDERMAN.", "SUPERMAN.", "CATMAN."],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </main>
      <LandingPageButton isSignedIn={isSignedIn} />
      <Testmo />
    </div>
  );
}
