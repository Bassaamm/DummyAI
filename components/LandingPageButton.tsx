import { useRouter } from "next/navigation";

export default function LandingPageButton({
  isSignedIn,
}: {
  isSignedIn?: boolean;
}) {
  const router = useRouter();

  return (
    <div className="px-6">
      <button
        onClick={() =>
          isSignedIn ? router.push("/dashboard") : router.push("/signin")
        }
        className="mt-6 w-full max-w-sm rounded-xl bg-gradient-to-r from-indigo-500  from-10% via-sky-500 via-30% to-emerald-500 to-90% py-4 text-2xl  font-bold text-white md:mt-16 "
      >
        Get started
      </button>
    </div>
  );
}
