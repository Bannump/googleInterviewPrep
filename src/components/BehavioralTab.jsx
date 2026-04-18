import { useState, useRef, useEffect, useCallback } from 'react';
import { useBehavioralNotes } from '../hooks/useBehavioralNotes';
import {
  MessageCircle, Plus, Trash2, ChevronRight,
  Search, ChevronsDownUp, ChevronsUpDown, GripVertical, Pencil, Check, X,
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
  const { prompts, customPrompts, notes, setNote, addCustomPrompt, deletePrompt, restorePrompt, reorderPrompts, renamePrompt } = useBehavioralNotes();
  const [newStoryQuestion, setNewStoryQuestion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expandedStories, setExpandedStories] = useState(new Set());
  const [flashingStory, setFlashingStory] = useState(null);
  // Drag state
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  // Edit-question state: maps prompt → draft text (null = not editing)
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [editDraft, setEditDraft] = useState('');
  const editInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  // Delete confirmation + undo
  const [confirmingDelete, setConfirmingDelete] = useState(null); // prompt string awaiting confirmation
  const [undoItem, setUndoItem] = useState(null); // { prompt, isCustom, noteData, index }
  const undoTimerRef = useRef(null);

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

  // ── Question editing ─────────────────────────────────────────────────────
  const startEditing = (e, prompt) => {
    e.stopPropagation();
    setEditingPrompt(prompt);
    setEditDraft(prompt);
  };

  const commitEdit = () => {
    if (editingPrompt !== null) {
      renamePrompt(editingPrompt, editDraft);
      setEditingPrompt(null);
      setEditDraft('');
    }
  };

  const cancelEdit = () => {
    setEditingPrompt(null);
    setEditDraft('');
  };

  // Focus the input when edit mode opens
  useEffect(() => {
    if (editingPrompt !== null && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingPrompt]);

  // ── Delete with confirmation + undo ─────────────────────────────────────
  const handleDeleteClick = (e, prompt) => {
    e.stopPropagation();
    setConfirmingDelete(prompt);
  };

  const confirmDelete = () => {
    const prompt = confirmingDelete;
    const isCustom = customPrompts.includes(prompt);
    const noteData = notes[prompt];
    const index = prompts.indexOf(prompt);
    deletePrompt(prompt);
    setConfirmingDelete(null);
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    setUndoItem({ prompt, isCustom, noteData, index });
    undoTimerRef.current = setTimeout(() => setUndoItem(null), 8000);
  };

  const handleUndo = () => {
    if (!undoItem) return;
    restorePrompt(undoItem.prompt, undoItem.isCustom, undoItem.noteData, undoItem.index);
    setUndoItem(null);
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
  };

  // Clean up undo timer on unmount
  useEffect(() => () => { if (undoTimerRef.current) clearTimeout(undoTimerRef.current); }, []);

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
            draggable={editingPrompt !== prompt}
            onDragStart={(e) => editingPrompt !== prompt && handleDragStart(e, index)}
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
              {/* Drag handle */}
              <span
                className="shrink-0 flex items-center cursor-grab active:cursor-grabbing text-zinc-500 hover:text-zinc-300 px-0.5"
                title="Drag to reorder"
                aria-hidden="true"
              >
                <GripVertical className="w-4 h-4" />
              </span>

              {editingPrompt === prompt ? (
                /* ── Inline edit mode ── */
                <div className="flex-1 min-w-0 flex items-center gap-1.5">
                  <input
                    ref={editInputRef}
                    type="text"
                    value={editDraft}
                    onChange={(e) => setEditDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') { e.preventDefault(); commitEdit(); }
                      if (e.key === 'Escape') { e.preventDefault(); cancelEdit(); }
                    }}
                    className="flex-1 min-w-0 px-2 py-1 rounded border border-blue-500 bg-zinc-950 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Edit question text"
                  />
                  <button
                    type="button"
                    onClick={commitEdit}
                    className="shrink-0 p-1 rounded text-green-400 hover:text-green-300 hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title="Save"
                    aria-label="Save question"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="shrink-0 p-1 rounded text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title="Cancel"
                    aria-label="Cancel edit"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* ── Normal mode ── */
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
              )}

              {editingPrompt !== prompt && (
                <>
                  {/* Edit question */}
                  <button
                    type="button"
                    onClick={(e) => startEditing(e, prompt)}
                    className="shrink-0 p-1 rounded text-zinc-400 hover:text-blue-400 hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title="Edit question"
                    aria-label="Edit question"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  {/* Delete */}
                  <button
                    type="button"
                    onClick={(e) => handleDeleteClick(e, prompt)}
                    className="shrink-0 p-1 rounded text-zinc-400 hover:text-red-400 hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title="Remove this story"
                    aria-label="Remove this story"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
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

                {/* Story Flow — full answer as you'd say it in the interview */}
                <div className="pt-2 border-t border-zinc-800/50">
                  <label className="block text-sm font-bold text-zinc-300 mb-2">
                    Story Flow
                    <span className="ml-2 text-xs font-normal text-zinc-500">what you'll actually say in the interview</span>
                  </label>
                  <AutoResizeTextarea
                    value={notes[prompt]?.storyFlow ?? ''}
                    onChange={(e) => setNote(prompt, 'storyFlow', e.target.value)}
                    placeholder="Write out the full story as you'd tell it..."
                    minRows={3}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50"
                  />
                </div>
              </div>
            )}
          </section>
        );
      })}

      {/* Delete confirmation modal */}
      {confirmingDelete !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
        >
          <div className="w-full max-w-sm rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <span className="shrink-0 mt-0.5 p-2 rounded-lg bg-red-500/10">
                <Trash2 className="w-4 h-4 text-red-400" />
              </span>
              <div className="space-y-1 min-w-0">
                <h2 id="delete-dialog-title" className="text-zinc-100 font-semibold text-sm">
                  Delete this story?
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                  "{confirmingDelete}"
                </p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              You can undo this deletion during the current session. Once you refresh or close the tab, it becomes permanent.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setConfirmingDelete(null)}
                className="flex-1 px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-200 text-sm font-medium hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Undo toast */}
      {undoItem !== null && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl max-w-sm w-full mx-4">
          <p className="flex-1 text-zinc-300 text-sm truncate">
            Story deleted
          </p>
          <button
            type="button"
            onClick={handleUndo}
            className="shrink-0 px-3 py-1 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Undo
          </button>
          <button
            type="button"
            onClick={() => setUndoItem(null)}
            className="shrink-0 p-1 rounded text-zinc-500 hover:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

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
