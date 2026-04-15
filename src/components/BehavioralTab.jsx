import { useState, useRef, useEffect, useCallback } from 'react';
import { useBehavioralNotes } from '../hooks/useBehavioralNotes';
import {
  MessageCircle, Plus, Trash2, ChevronDown, ChevronRight,
  Search, ChevronsDownUp, ChevronsUpDown, GripVertical,
} from 'lucide-react';

// Auto-resizing textarea: grows to fit content, never shows an internal scrollbar.
function AutoResizeTextarea({ value, onChange, placeholder, className, minRows = 2 }) {
  const ref = useRef(null);

  const resize = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  // Resize whenever value changes
  useEffect(() => { resize(); }, [value, resize]);

  // Resize after the browser has painted (handles accordion open / font load)
  useEffect(() => {
    const id = requestAnimationFrame(resize);
    return () => cancelAnimationFrame(id);
  }, [resize]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => { onChange(e); resize(); }}
      placeholder={placeholder}
      rows={minRows}
      style={{ resize: 'none', overflow: 'hidden' }}
      className={className}
    />
  );
}

const STAR_FIELDS = [
  { key: 'situation', label: 'Situation' },
  { key: 'task', label: 'Task' },
  { key: 'action', label: 'Action' },
  { key: 'result', label: 'Result' },
];

export function BehavioralTab() {
  const { prompts, notes, setNote, addCustomPrompt, deletePrompt, reorderPrompts } = useBehavioralNotes();
  const [newStoryQuestion, setNewStoryQuestion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expandedStories, setExpandedStories] = useState(new Set());
  const [flashingStory, setFlashingStory] = useState(null);
  // Drag state
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const searchContainerRef = useRef(null);

  // ── Accordion helpers ────────────────────────────────────────────────────
  const toggleStory = (prompt) => {
    setExpandedStories((prev) => {
      const next = new Set(prev);
      if (next.has(prompt)) next.delete(prompt);
      else next.add(prompt);
      return next;
    });
    // Trigger blink: clear first so re-clicking the same card re-runs the animation
    setFlashingStory(null);
    requestAnimationFrame(() => {
      setFlashingStory(prompt);
      setTimeout(() => setFlashingStory(null), 600);
    });
  };
  const expandAll = () => setExpandedStories(new Set(prompts));
  const collapseAll = () => setExpandedStories(new Set());

  // ── Drag-and-drop handlers ───────────────────────────────────────────────
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // ghost image: use the card itself (default browser behaviour)
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) setDragOverIndex(index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      reorderPrompts(draggedIndex, index);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // ── Story search / jump ──────────────────────────────────────────────────
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

      {/* Search bar + Expand / Collapse All */}
      <div className="flex items-center gap-2">
        <div ref={searchContainerRef} className="relative flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setDropdownOpen(true); }}
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
                filteredPrompts.map((prompt) => {
                  const globalIndex = prompts.indexOf(prompt);
                  return (
                    <li
                      key={prompt}
                      role="option"
                      tabIndex={0}
                      className="px-4 py-2.5 text-zinc-200 text-sm cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800 focus:outline-none focus:ring-inset focus:ring-1 focus:ring-blue-500"
                      onClick={() => scrollToPrompt(globalIndex)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollToPrompt(globalIndex); }
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

        <button
          type="button"
          onClick={expandAll}
          title="Expand all"
          aria-label="Expand all stories"
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 text-sm hover:text-zinc-100 hover:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <ChevronsUpDown className="w-4 h-4" />
          <span className="hidden sm:inline">Expand all</span>
        </button>
        <button
          type="button"
          onClick={collapseAll}
          title="Collapse all"
          aria-label="Collapse all stories"
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 text-sm hover:text-zinc-100 hover:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <ChevronsDownUp className="w-4 h-4" />
          <span className="hidden sm:inline">Collapse all</span>
        </button>
      </div>

      {/* Story cards */}
      {prompts.map((prompt, index) => {
        const isExpanded = expandedStories.has(prompt);
        const isDragging = draggedIndex === index;
        const isDropTarget = dragOverIndex === index && draggedIndex !== index;

        return (
          <section
            id={`story-${index}`}
            key={prompt}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={[
              'rounded-lg border overflow-hidden scroll-mt-4 transition-all duration-150',
              isDragging
                ? 'opacity-40 border-zinc-600 bg-zinc-900/50'
                : isDropTarget
                  ? 'border-blue-500 shadow-lg shadow-blue-500/10 bg-zinc-900/50'
                  : 'border-zinc-800/50 bg-zinc-900/50',
            ].join(' ')}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between gap-2 px-3 py-3 text-zinc-100 font-medium bg-zinc-900/30 hover:bg-zinc-800/40 transition-colors${flashingStory === prompt ? ' story-blink' : ''}`}
            >
              {/* Drag handle — only this initiates the drag visually */}
              <span
                className="shrink-0 flex items-center cursor-grab active:cursor-grabbing text-zinc-500 hover:text-zinc-300 px-0.5"
                title="Drag to reorder"
                aria-hidden="true"
              >
                <GripVertical className="w-4 h-4" />
              </span>

              {/* Question title — click to expand/collapse */}
              <button
                type="button"
                className="flex-1 min-w-0 flex items-center gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                onClick={() => toggleStory(prompt)}
                aria-expanded={isExpanded}
              >
                <h3 className="flex-1 min-w-0 text-sm sm:text-base">{prompt}</h3>
                <ChevronRight
                  className={`shrink-0 w-4 h-4 text-zinc-500 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                />
              </button>

              {/* Delete — available for all prompts */}
              <button
                type="button"
                onClick={() => deletePrompt(prompt)}
                className="shrink-0 p-1 rounded text-zinc-400 hover:text-red-400 hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Remove this story"
                aria-label="Remove this story"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Collapsible STAR fields */}
            {isExpanded && (
              <div className="p-4 space-y-4 border-t border-zinc-800/50">
                {STAR_FIELDS.map(({ key, label }) => (
                  <div key={key} className="flex items-start gap-3">
                    <label className="w-20 shrink-0 text-sm font-bold text-zinc-400 pt-2 text-right">
                      {label}
                    </label>
                    <AutoResizeTextarea
                      value={notes[prompt]?.[key] ?? ''}
                      onChange={(e) => setNote(prompt, key, e.target.value)}
                      placeholder={`Your ${label.toLowerCase()}...`}
                      className="flex-1 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}

      {/* Add your own story */}
      <section className="bg-zinc-900/50 rounded-lg border border-zinc-800/50 overflow-hidden border-dashed">
        <h3 className="px-4 py-3 border-b border-zinc-800/50 text-zinc-400 font-medium bg-zinc-900/30">
          Add your own story
        </h3>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Story question</label>
            <AutoResizeTextarea
              value={newStoryQuestion}
              onChange={(e) => setNewStoryQuestion(e.target.value)}
              placeholder="e.g. Tell me about a time you delivered under a tight deadline."
              minRows={2}
              className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50"
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
