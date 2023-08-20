import Image from "next/image";

export function Empty({ label }: { label: string }) {
  return (
    <div className="mt-4 flex h-full flex-col items-center justify-center ">
      <div className="relative h-72 w-72">
        <Image src="/pngwing.png" fill alt="Empty" />
      </div>
      <p className=" mt-2 pr-4 text-lg font-semibold text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
