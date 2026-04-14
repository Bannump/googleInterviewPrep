import { useState, useRef, useEffect } from 'react';
import { useBehavioralNotes } from '../hooks/useBehavioralNotes';
import { MessageCircle, Plus, Trash2, ChevronUp, ChevronDown, Search } from 'lucide-react';

const STAR_FIELDS = [
  { key: 'situation', label: 'Situation' },
  { key: 'task', label: 'Task' },
  { key: 'action', label: 'Action' },
  { key: 'result', label: 'Result' },
];

export function BehavioralTab() {
  const { prompts, customPrompts, notes, setNote, addCustomPrompt, removeCustomPrompt, reorderPrompts } = useBehavioralNotes();
  const [newStoryQuestion, setNewStoryQuestion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchContainerRef = useRef(null);

  const handleAddStory = () => {
    addCustomPrompt(newStoryQuestion);
    setNewStoryQuestion('');
  };

  const filteredPrompts = searchQuery.trim()
    ? prompts.filter((p) => p.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    : prompts;

  const scrollToPrompt = (index) => {
    const el = document.getElementById(`story-${index}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setDropdownOpen(false);
    setSearchQuery('');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      <div className="flex items-center gap-2 text-zinc-400 mb-4 sm:mb-6">
        <MessageCircle className="w-5 h-5 text-blue-400" />
        <p className="text-sm">
          Use the STAR method (Situation, Task, Action, Result) for each prompt. Notes are saved automatically.
        </p>
      </div>

      {/* Search bar + dropdown: click opens dropdown with all questions; typing filters; select scrolls to question */}
      <div ref={searchContainerRef} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setDropdownOpen(true);
            }}
            onFocus={() => setDropdownOpen(true)}
            placeholder="Search or jump to a story question..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50"
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
            aria-label="Search behavioral questions"
          />
        </div>
        {dropdownOpen && (
          <ul
            className="absolute z-10 left-0 right-0 mt-1 max-h-60 overflow-auto rounded-lg border border-zinc-800 bg-zinc-900 shadow-xl py-1"
            role="listbox"
          >
            {filteredPrompts.length === 0 ? (
              <li className="px-4 py-3 text-zinc-500 text-sm" role="option">No questions match</li>
            ) : (
              filteredPrompts.map((prompt, idxInFiltered) => {
                const globalIndex = prompts.indexOf(prompt);
                return (
                  <li
                    key={prompt}
                    role="option"
                    tabIndex={0}
                    className="px-4 py-2.5 text-zinc-200 text-sm cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800 focus:outline-none focus:ring-inset focus:ring-1 focus:ring-blue-500"
                    onClick={() => scrollToPrompt(globalIndex)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        scrollToPrompt(globalIndex);
                      }
                    }}
                  >
                    {prompt}
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>

      {prompts.map((prompt, index) => (
        <section
          id={`story-${index}`}
          key={prompt}
          className="bg-zinc-900/50 rounded-lg border border-zinc-800/50 overflow-hidden scroll-mt-4"
        >
          <div className="flex items-start justify-between gap-2 px-4 py-3 border-b border-zinc-800/50 text-zinc-100 font-medium bg-zinc-900/30">
            <div className="flex items-center gap-1 min-w-0 flex-1">
              <span className="flex shrink-0 items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => reorderPrompts(index, index - 1)}
                  disabled={index === 0}
                  className="p-1 rounded text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 disabled:opacity-30 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Move up"
                  aria-label="Move up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => reorderPrompts(index, index + 1)}
                  disabled={index === prompts.length - 1}
                  className="p-1 rounded text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 disabled:opacity-30 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Move down"
                  aria-label="Move down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </span>
              <h3 className="min-w-0 flex-1">{prompt}</h3>
            </div>
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
              <div key={key} className="flex items-start gap-3">
                <label className="w-20 shrink-0 text-sm font-bold text-zinc-400 pt-2 text-right">{label}</label>
                <textarea
                  value={notes[prompt]?.[key] ?? ''}
                  onChange={(e) => setNote(prompt, key, e.target.value)}
                  placeholder={`Your ${label.toLowerCase()}...`}
                  rows={3}
                  className="flex-1 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 resize-y"
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
