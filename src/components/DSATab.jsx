import { useState, useMemo, useEffect } from 'react';
import { LayoutList, Layers, RotateCcw, ChevronDown, ChevronUp, ChevronsUpDown, ChevronsDownUp } from 'lucide-react';
import { INITIAL_QUESTIONS } from '../data/questions';
import { useDsaProgress } from '../hooks/useDsaProgress';
import { ProgressBar } from './ProgressBar';
import { QuestionTimer } from './QuestionTimer';

function formatTimeSpent(seconds) {
  if (seconds === 0) return '—';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const difficultyColors = {
  Easy: 'text-green-400 bg-green-400/20',
  Medium: 'text-yellow-400 bg-yellow-400/20',
  Hard: 'text-red-400 bg-red-400/20',
};

const DIFFICULTY_ORDER = { Easy: 0, Medium: 1, Hard: 2 };

function filterAndSortQuestions(questions, getProgressById, difficultyFilter, statusFilter, sortBy) {
  let list = questions.filter((q) => {
    if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false;
    const prog = getProgressById(q.id);
    if (statusFilter === 'completed' && !prog.completed) return false;
    if (statusFilter === 'pending' && prog.completed) return false;
    return true;
  });

  if (sortBy === 'difficulty-asc') {
    list = [...list].sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty]);
  } else if (sortBy === 'difficulty-desc') {
    list = [...list].sort((a, b) => DIFFICULTY_ORDER[b.difficulty] - DIFFICULTY_ORDER[a.difficulty]);
  } else if (sortBy === 'completed-first') {
    list = [...list].sort((a, b) => {
      const ac = getProgressById(a.id).completed ? 1 : 0;
      const bc = getProgressById(b.id).completed ? 1 : 0;
      return bc - ac;
    });
  } else if (sortBy === 'pending-first') {
    list = [...list].sort((a, b) => {
      const ac = getProgressById(a.id).completed ? 1 : 0;
      const bc = getProgressById(b.id).completed ? 1 : 0;
      return ac - bc;
    });
  }
  return list;
}

function groupByCategory(questions) {
  const order = [];
  const map = new Map();
  for (const q of questions) {
    if (!map.has(q.category)) {
      order.push(q.category);
      map.set(q.category, []);
    }
    map.get(q.category).push(q);
  }
  return order.map((cat) => ({ category: cat, questions: map.get(cat) }));
}

function QuestionRow({ q, prog, rowNumber, activeTimer, toggleComplete, startTimer, pauseTimer, finishTimer, resetQuestion, hideCategory }) {
  const isActive = activeTimer && activeTimer.id === q.id;

  const handleTitleClick = () => {
    if (!prog.completed) startTimer(q.id);
  };

  return (
    <tr className="hover:bg-zinc-900/30 transition-colors">
      <td className="px-4 py-3 text-center">
        <input
          type="checkbox"
          checked={prog.completed}
          onChange={() => toggleComplete(q.id)}
          className="rounded border-zinc-700 bg-zinc-900 text-blue-500 focus:ring-blue-500 w-4 h-4"
        />
      </td>
      <td className="px-4 py-3 font-mono text-zinc-400 w-16">{rowNumber}</td>
      <td className="px-4 py-3 min-w-0">
        <a
          href={q.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleTitleClick}
          className="text-zinc-100 hover:text-blue-400 hover:underline font-medium truncate block"
          title={q.title}
        >
          {q.title}
        </a>
      </td>
      {!hideCategory && (
        <td className="px-4 py-3">
          <span className="text-zinc-400 text-sm">{q.category}</span>
        </td>
      )}
      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${difficultyColors[q.difficulty] ?? 'text-zinc-400 bg-zinc-400/20'}`}
        >
          {q.difficulty}
        </span>
      </td>
      <td className="px-4 py-3 text-zinc-400 font-mono text-sm">
        {prog.completed ? formatTimeSpent(prog.timeSpent) : '—'}
      </td>
      <td className="px-4 py-3">
        {!prog.completed ? (
          <QuestionTimer
            progress={prog}
            isActive={isActive}
            onStart={() => startTimer(q.id)}
            onPause={() => pauseTimer(q.id)}
            onFinish={() => finishTimer(q.id)}
          />
        ) : (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-green-400 text-sm">Done</span>
            <button
              type="button"
              onClick={() => resetQuestion(q.id)}
              className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700 text-zinc-100 rounded text-sm transition-colors min-h-[36px] touch-manipulation"
              title="Resolve again"
            >
              <RotateCcw className="w-3.5 h-3.5 inline-block mr-1" />
              Resolve again
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

export function DSATab() {
  const {
    getProgressById,
    toggleComplete,
    startTimer,
    pauseTimer,
    finishTimer,
    resetQuestion,
    activeTimer,
    completedCount,
    total,
  } = useDsaProgress();

  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grouped'
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [expandedCategories, setExpandedCategories] = useState({});

  const filteredSorted = useMemo(
    () => filterAndSortQuestions(INITIAL_QUESTIONS, getProgressById, difficultyFilter, statusFilter, sortBy),
    [getProgressById, difficultyFilter, statusFilter, sortBy]
  );

  const grouped = useMemo(() => (viewMode === 'grouped' ? groupByCategory(filteredSorted) : null), [viewMode, filteredSorted]);

  useEffect(() => {
    if (viewMode === 'grouped' && grouped?.length) {
      setExpandedCategories((prev) => {
        const next = { ...prev };
        grouped.forEach(({ category }) => {
          if (next[category] === undefined) next[category] = false;
        });
        return next;
      });
    }
  }, [viewMode, grouped]);

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };
  const expandAllCategories = () => {
    if (!grouped) return;
    const next = grouped.reduce((acc, { category }) => ({ ...acc, [category]: true }), {});
    setExpandedCategories(next);
  };
  const collapseAllCategories = () => {
    if (!grouped) return;
    const next = grouped.reduce((acc, { category }) => ({ ...acc, [category]: false }), {});
    setExpandedCategories(next);
  };
  const isCategoryExpanded = (category) => expandedCategories[category] === true;

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6">
      <ProgressBar completed={completedCount} total={total} />

      {/* View mode buttons - match Amazon */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => setViewMode('list')}
          className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors min-h-[40px] sm:min-h-[44px] touch-manipulation ${
            viewMode === 'list'
              ? 'bg-blue-600 hover:bg-blue-500 text-zinc-50'
              : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-800'
          }`}
        >
          <LayoutList className="w-4 h-4 inline-block sm:mr-1.5" />
          List
        </button>
        <button
          type="button"
          onClick={() => setViewMode('grouped')}
          className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors min-h-[40px] sm:min-h-[44px] touch-manipulation flex items-center gap-1.5 ${
            viewMode === 'grouped'
              ? 'bg-blue-600 hover:bg-blue-500 text-zinc-50'
              : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          By category
        </button>
      </div>

      {/* Filters - match Amazon row */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1">
          <span className="text-zinc-400 text-xs sm:text-sm">Filter:</span>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-2 bg-zinc-950 border border-zinc-900 rounded-lg text-zinc-100 text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 min-h-[40px] sm:min-h-[44px] touch-manipulation"
          >
            <option value="all">All difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-2 bg-zinc-950 border border-zinc-900 rounded-lg text-zinc-100 text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 min-h-[40px] sm:min-h-[44px] touch-manipulation"
          >
            <option value="all">All status</option>
            <option value="completed">Completed</option>
            <option value="pending">Not completed</option>
          </select>
          <span className="text-zinc-400 text-xs sm:text-sm">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-2 bg-zinc-950 border border-zinc-900 rounded-lg text-zinc-100 text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 min-h-[40px] sm:min-h-[44px] touch-manipulation"
          >
            <option value="default">Default order</option>
            <option value="difficulty-asc">Difficulty: Easy → Hard</option>
            <option value="difficulty-desc">Difficulty: Hard → Easy</option>
            <option value="completed-first">Completed first</option>
            <option value="pending-first">Not completed first</option>
          </select>
        </div>
        <span className="text-zinc-500 text-xs sm:text-sm self-center">
          Showing {filteredSorted.length} of {total}
        </span>
      </div>

      {viewMode === 'list' ? (
        <div className="bg-zinc-900/50 rounded-lg border border-zinc-800/50 overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full table-fixed">
              <colgroup>
                <col className="w-14" />
                <col className="w-16" />
                <col />
                <col className="w-40" />
                <col className="w-28" />
                <col className="w-28" />
                <col className="w-[260px]" />
              </colgroup>
              <thead className="bg-zinc-900/30 border-b border-zinc-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-300 text-center">Done</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-300">#</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-300">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-300">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-300">Difficulty</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-300">Time</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-300">Timer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/30">
                {filteredSorted.map((q, idx) => (
                  <QuestionRow
                    key={q.id}
                    q={q}
                    prog={getProgressById(q.id)}
                    rowNumber={idx + 1}
                    activeTimer={activeTimer}
                    toggleComplete={toggleComplete}
                    startTimer={startTimer}
                    pauseTimer={pauseTimer}
                    finishTimer={finishTimer}
                    resetQuestion={resetQuestion}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={expandAllCategories}
              title="Expand all"
              aria-label="Expand all categories"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 text-sm hover:text-zinc-100 hover:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ChevronsUpDown className="w-4 h-4" />
              <span className="hidden sm:inline">Expand all</span>
            </button>
            <button
              type="button"
              onClick={collapseAllCategories}
              title="Collapse all"
              aria-label="Collapse all categories"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 text-sm hover:text-zinc-100 hover:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ChevronsDownUp className="w-4 h-4" />
              <span className="hidden sm:inline">Collapse all</span>
            </button>
          </div>
          {grouped.map(({ category, questions: groupQuestions }) => (
            <div key={category} className="bg-zinc-900/50 rounded-lg border border-zinc-800/50 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleCategory(category)}
                className="w-full px-4 py-3 bg-zinc-900/30 hover:bg-zinc-900/40 transition-colors flex items-center justify-center relative"
              >
                {(() => {
                  const solvedCount = groupQuestions.filter((q) => getProgressById(q.id).completed).length;
                  return (
                    <h3 className="text-base sm:text-lg font-semibold text-zinc-100 text-center">
                      {category}{' '}
                      <span className="text-sm text-zinc-400 font-normal">
                        ({solvedCount}/{groupQuestions.length} solved)
                      </span>
                    </h3>
                  );
                })()}
                <div className="absolute right-4">
                  {isCategoryExpanded(category) ? (
                    <ChevronUp className="w-5 h-5 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-zinc-400" />
                  )}
                </div>
              </button>
              {isCategoryExpanded(category) && (
                <div className="overflow-x-auto scrollbar-hide">
                  <table className="w-full table-fixed">
                    <colgroup>
                      <col className="w-14" />
                      <col className="w-16" />
                      <col />
                      <col className="w-28" />
                      <col className="w-28" />
                      <col className="w-[260px]" />
                    </colgroup>
                    <thead className="bg-zinc-900/20 border-b border-zinc-800/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-300 text-center">Done</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-300">#</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-300">Title</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-300">Difficulty</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-300">Time</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-300">Timer</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/30">
                      {groupQuestions.map((q, idx) => (
                        <QuestionRow
                          key={q.id}
                          q={q}
                          prog={getProgressById(q.id)}
                          rowNumber={idx + 1}
                          activeTimer={activeTimer}
                          toggleComplete={toggleComplete}
                          startTimer={startTimer}
                          pauseTimer={pauseTimer}
                          finishTimer={finishTimer}
                          resetQuestion={resetQuestion}
                          hideCategory
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
          {grouped.length === 0 && (
            <p className="text-zinc-500 text-center py-8">No questions match the current filters.</p>
          )}
        </div>
      )}
    </div>
  );
}
