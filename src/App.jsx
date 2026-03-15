import { useState } from 'react';
import { Code2, MessageCircle, Info, LogOut } from 'lucide-react';
import { DSATab } from './components/DSATab';
import { BehavioralTab } from './components/BehavioralTab';
import { ProcessOverview } from './components/ProcessOverview';
import { SignInScreen } from './components/SignInScreen';
import { useAuth } from './contexts/AuthContext';

const TABS = [
  { id: 'dsa', label: 'Data Structures & Algorithms', icon: Code2 },
  { id: 'behavioral', label: 'Behavioral Stories', icon: MessageCircle },
];

export default function App() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('dsa');
  const [processOpen, setProcessOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
        <div className="animate-pulse text-zinc-400 text-sm">Loading…</div>
      </div>
    );
  }

  if (!user) {
    return <SignInScreen onSignIn={signInWithGoogle} loading={loading} />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="bg-zinc-950 border-b border-zinc-900/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4">
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h1 className="text-base sm:text-xl md:text-2xl font-bold text-zinc-100 truncate">
                Google Interview Prep
              </h1>
              <p className="text-[10px] sm:text-xs md:text-sm text-zinc-400 mt-0.5">
                <span className="hidden sm:inline">Track DSA and Behavioral progress</span>
                <span className="sm:hidden">DSA • Behavioral</span>
              </p>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setProcessOpen(true)}
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700 text-zinc-100 rounded-lg transition-colors border border-zinc-800 min-h-[40px] sm:min-h-[44px] touch-manipulation"
                aria-label="Open process overview"
              >
                <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                <span className="hidden md:inline text-sm">Process Overview</span>
              </button>
              <div className="flex items-center gap-2 pl-1 border-l border-zinc-800">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt=""
                    className="w-8 h-8 rounded-full border border-zinc-700"
                    referrerPolicy="no-referrer"
                  />
                )}
                <button
                  type="button"
                  onClick={signOut}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                  aria-label="Sign out"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-zinc-800/50">
          <div className="flex gap-0.5 sm:gap-1 md:gap-2 px-2.5 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto min-w-0">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-0 px-2.5 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-2.5 md:py-3 flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 md:gap-2 font-semibold text-xs sm:text-sm md:text-base transition-colors border-b-2 min-h-[40px] sm:min-h-[44px] touch-manipulation overflow-hidden ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-zinc-400 hover:text-zinc-300 active:text-zinc-200'
                  }`}
                  aria-selected={activeTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  role="tab"
                  title={tab.label}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="hidden sm:inline truncate">{tab.label}</span>
                  <span className="sm:hidden text-[11px]">{tab.id === 'dsa' ? 'DSA' : 'Behavioral'}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8">
        <div className="pb-4 sm:pb-0">
          {activeTab === 'dsa' && <DSATab />}
          {activeTab === 'behavioral' && <BehavioralTab />}
        </div>
      </main>

      <ProcessOverview isOpen={processOpen} onClose={() => setProcessOpen(false)} />
    </div>
  );
}
