import FeatureButton from "./components/FeatureButton";
export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-center text-2xl font-bold md:text-4xl">Hey</h2>
      </div>
      <p className="text-center">Let AI help you with </p>
      <div className="mt-10 space-y-8 px-4 md:px-20 lg:px-32">
        <FeatureButton />
      </div>
    </div>
  );
}
