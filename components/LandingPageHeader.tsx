import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";

export default function LandingPageHeader({
  isSignedIn,
}: {
  isSignedIn?: boolean;
}) {
  const router = useRouter();

  return (
    <header className="flex justify-between gap-6 px-10 pt-8 text-white transition-all">
      <Link href="/" className=" flex items-center ">
        <div className="relative  mr-4 h-8 w-8 md:h-16 md:w-16">
          <Image alt="logo" fill src="/download.png" className="rounded-full" />
        </div>
        <h1 className="text-lg font-bold  text-white md:text-2xl">YourMate</h1>
      </Link>
      {isSignedIn ? (
        <div className=" flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30%  to-emerald-500 to-90% p-2 text-base font-semibold transition-all md:text-lg">
          <UserButton />
        </div>
      ) : (
        <Button
          className={`rounded-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-base  font-semibold transition-all md:text-lg`}
          onClick={() => router.push("/signin")}
        >
          Sign in or up
        </Button>
      )}
    </header>
  );
}
