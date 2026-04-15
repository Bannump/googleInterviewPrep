import { useState, useEffect } from 'react';
import { Play, Pause, Square } from 'lucide-react';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function QuestionTimer({ progress, isActive, onStart, onPause, onFinish }) {
  const [liveSeconds, setLiveSeconds] = useState(0);

  const totalElapsed = progress.timeSpent + (progress.runningSince ? liveSeconds : 0);

  useEffect(() => {
    if (!progress.runningSince) {
      setLiveSeconds(0);
      return;
    }
    const start = progress.runningSince;
    const tick = () => setLiveSeconds(Math.floor((Date.now() - start) / 1000));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [progress.runningSince]);

  const isRunning = !!progress.runningSince;

  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <span className="text-blue-400 font-mono text-sm tabular-nums min-w-[3.5rem]">
        {formatTime(totalElapsed)}
      </span>
      {!isRunning && !progress.completed && (
        <button
          type="button"
          onClick={onStart}
          className="p-1.5 rounded border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-blue-500 text-blue-400 transition-colors min-h-[36px] touch-manipulation"
          title="Start timer"
        >
          <Play className="w-4 h-4" />
        </button>
      )}
      {isRunning && (
        <>
          <button
            type="button"
            onClick={onPause}
            className="p-1.5 rounded border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-yellow-500 text-yellow-400 transition-colors min-h-[36px] touch-manipulation"
            title="Pause"
          >
            <Pause className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onFinish}
            className="p-1.5 rounded border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-green-500 text-green-400 transition-colors min-h-[36px] touch-manipulation"
            title="Finish & mark complete"
          >
            <Square className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
}
