export default function loading() {
  return (
    <div className="flex h-[100vh] w-full items-center justify-center pb-28">
      <div
        className="inline-block h-20 w-20 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
