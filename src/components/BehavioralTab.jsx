import { useState } from 'react';
import { useBehavioralNotes } from '../hooks/useBehavioralNotes';
import { MessageCircle, Plus, Trash2 } from 'lucide-react';

const STAR_FIELDS = [
  { key: 'situation', label: 'Situation' },
  { key: 'task', label: 'Task' },
  { key: 'action', label: 'Action' },
  { key: 'result', label: 'Result' },
];

export function BehavioralTab() {
  const { prompts, customPrompts, notes, setNote, addCustomPrompt, removeCustomPrompt } = useBehavioralNotes();
  const [newStoryQuestion, setNewStoryQuestion] = useState('');

  const handleAddStory = () => {
    addCustomPrompt(newStoryQuestion);
    setNewStoryQuestion('');
  };

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
          <div className="flex items-start justify-between gap-2 px-4 py-3 border-b border-zinc-800/50 text-zinc-100 font-medium bg-zinc-900/30">
            <h3 className="min-w-0 flex-1">{prompt}</h3>
            {customPrompts.includes(prompt) && (
              <button
                type="button"
                onClick={() => removeCustomPrompt(prompt)}
                className="shrink-0 p-1 rounded text-zinc-400 hover:text-red-400 hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Remove this story"
                aria-label="Remove this story"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
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

      {/* Add your story - same card design */}
      <section className="bg-zinc-900/50 rounded-lg border border-zinc-800/50 overflow-hidden border-dashed">
        <h3 className="px-4 py-3 border-b border-zinc-800/50 text-zinc-400 font-medium bg-zinc-900/30">
          Add your own story
        </h3>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Story question</label>
            <textarea
              value={newStoryQuestion}
              onChange={(e) => setNewStoryQuestion(e.target.value)}
              placeholder="e.g. Tell me about a time you delivered under a tight deadline."
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 resize-y"
            />
          </div>
          <button
            type="button"
            onClick={handleAddStory}
            disabled={!newStoryQuestion.trim()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:opacity-50 disabled:pointer-events-none"
          >
            <Plus className="w-4 h-4" />
            Add your story
          </button>
        </div>
      </section>
    </div>
  );
}
