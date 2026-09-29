import React from 'react';
import {
  LayoutDashboard,
  Target,
  Brain,
  Bot,
  FileText,
  Sparkles,
  Zap,
  ShieldCheck,
  Building
} from 'lucide-react';

export type NavTab = 'pipeline' | 'workspace' | 'memory' | 'assistant' | 'briefing' | 'ingest';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  memoryCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, memoryCount }) => {
  const navItems: { id: NavTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'pipeline', label: 'Pipeline & Deals', icon: LayoutDashboard },
    { id: 'workspace', label: 'Deal Workspace', icon: Target },
    { id: 'memory', label: 'Hindsight Memory Graph', icon: Brain, badge: `${memoryCount}` },
    { id: 'assistant', label: 'AI Deal Assistant', icon: Bot, badge: 'AI' },
    { id: 'briefing', label: 'Pre-Meeting Briefing', icon: FileText },
    { id: 'ingest', label: 'Ingestion Studio', icon: Zap }
  ];

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-slate-950 flex flex-col justify-between shrink-0 hidden md:flex">
      {/* Top Brand Header */}
      <div>
        <div className="h-16 px-5 flex items-center border-b border-slate-800/80">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Brain className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <h1 className="font-bold text-base text-slate-100 tracking-tight flex items-center gap-1.5">
                DealMind
                <span className="text-[10px] bg-indigo-950 border border-indigo-500/40 text-indigo-300 px-1.5 py-0.2 rounded font-mono uppercase">
                  Agent
                </span>
              </h1>
              <p className="text-[10px] text-slate-400 font-medium">Persistent Memory Sales AI</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1.5">
          <div className="px-3 py-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Sales Intelligence Modules
          </div>

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs md:text-sm transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600/90 to-violet-600/80 text-white shadow-md shadow-indigo-600/20 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-indigo-950/80 border border-indigo-500/30 text-indigo-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Info */}
      <div className="p-4 m-3 rounded-2xl bg-gradient-to-b from-indigo-950/30 to-slate-900/60 border border-indigo-500/20">
        <div className="flex items-center space-x-2 text-indigo-300 text-xs font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>Hindsight Core Active</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Continuously accumulating meeting knowledge, stakeholder sentiment, and deal risks.
        </p>
        <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800/80 pt-2">
          <span>Version 2.4</span>
          <span className="text-emerald-400 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
            <span>Synced</span>
          </span>
        </div>
      </div>
    </aside>
  );
};
