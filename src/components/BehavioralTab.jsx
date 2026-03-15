import { useBehavioralNotes } from '../hooks/useBehavioralNotes';
import { MessageCircle } from 'lucide-react';

const STAR_FIELDS = [
  { key: 'situation', label: 'Situation' },
  { key: 'task', label: 'Task' },
  { key: 'action', label: 'Action' },
  { key: 'result', label: 'Result' },
];

export function BehavioralTab() {
  const { prompts, notes, setNote } = useBehavioralNotes();

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      <div className="flex items-center gap-2 text-zinc-400 mb-4 sm:mb-6">
        <MessageCircle className="w-5 h-5 text-blue-400" />
        <p className="text-sm">
          Use the STAR method (Situation, Task, Action, Result) for each prompt. Notes are saved automatically.
        </p>
      </div>
      {prompts.map((prompt) => (
        <section
          key={prompt}
          className="bg-zinc-900/50 rounded-lg border border-zinc-800/50 overflow-hidden"
        >
          <h3 className="px-4 py-3 border-b border-zinc-800/50 text-zinc-100 font-medium bg-zinc-900/30">
            {prompt}
          </h3>
          <div className="p-4 space-y-4">
            {STAR_FIELDS.map(({ key, label }) => (
              <div key={key}>
                <label className="block text-sm text-zinc-400 mb-1">{label}</label>
                <textarea
                  value={notes[prompt]?.[key] ?? ''}
                  onChange={(e) => setNote(prompt, key, e.target.value)}
                  placeholder={`Your ${label.toLowerCase()}...`}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 resize-y"
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
