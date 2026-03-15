export function ProgressBar({ completed, total }) {
  const pct = total ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="w-full bg-zinc-900/50 rounded-lg p-2.5 sm:p-3 md:p-4 border border-zinc-800/50">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-0 mb-1.5 sm:mb-2">
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-zinc-100">Overall Progress</h2>
        <span className="text-blue-400 font-bold text-sm sm:text-base md:text-lg">
          {completed} / {total} ({pct}%)
        </span>
      </div>
      <div className="w-full bg-zinc-800/50 rounded-full h-2 sm:h-2.5 md:h-3">
        <div
          className="bg-blue-500 h-2 sm:h-2.5 md:h-3 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
