import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-[100dvh] w-full items-center  justify-center bg-slate-900 px-20">
      <SignIn />
    </div>
  );
}
