import { X, Phone, Users } from 'lucide-react';

const STEPS = [
  {
    icon: Phone,
    title: 'Screening',
    desc: '1–2 Technical Phone Screens (DSA / Coding)',
    iconClass: 'bg-blue-500/20 text-blue-400',
  },
  {
    icon: Users,
    title: 'Onsite Loop',
    desc: '3–4 Coding rounds + 1 Googleyness & Leadership (Behavioral)',
    iconClass: 'bg-green-500/20 text-green-400',
  },
];

export function ProcessOverview({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-900 border-l border-zinc-800 z-50 shadow-xl overflow-y-auto"
        aria-label="Interview process overview"
      >
        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-100">Process Overview</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-6">
          <p className="text-zinc-400 text-sm">
            Google’s interview process typically follows these stages. Use this dashboard to prepare for both technical and behavioral rounds.
          </p>
          <div className="space-y-4">
            {STEPS.map(({ icon: Icon, title, desc, iconClass }) => (
              <div
                key={title}
                className="flex gap-3 p-3 rounded-lg border border-zinc-800 bg-zinc-950/50"
              >
                <div className={`p-2 rounded-lg flex-shrink-0 ${iconClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-zinc-100">{title}</h3>
                  <p className="text-sm text-zinc-400 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-100 mb-2">Tips</h3>
            <ul className="text-sm text-zinc-400 space-y-1 list-disc list-inside">
              <li>Practice explaining your approach out loud.</li>
              <li>Clarify constraints and edge cases before coding.</li>
              <li>Use the Behavioral tab to draft STAR stories in advance.</li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
