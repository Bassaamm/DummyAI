import { RxDashboard } from "react-icons/rx";
export default function Header({
  pageName,
  description,
}: {
  pageName: string;
  description: string;
}) {
  return (
    <>
      <div className="mx-8 flex items-center gap-5">
        <span>
          <RxDashboard size="50" />
        </span>
        <div className="flex flex-col items-start pt-3">
          {" "}
          <span className="text-4xl font-semibold">{pageName}</span>
          <span className="mt-1 pl-1 text-base font-light text-gray-500">
            {description}
          </span>
        </div>
      </div>
    </>
  );
}
