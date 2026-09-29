import React from 'react';
import { useDealContext } from '../context/DealContext';
import {
  Brain,
  ChevronDown,
  PlusCircle,
  RotateCcw,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface NavbarProps {
  onOpenIngestModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenIngestModal }) => {
  const { deals, activeDeal, setActiveDealId, resetDemoData, memoryNodes } = useDealContext();

  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between">
      {/* Left: Deal Switcher */}
      <div className="flex items-center space-x-4">
        <div className="relative group">
          <div className="flex items-center space-x-3 bg-slate-900/90 hover:bg-slate-800/80 border border-slate-700/60 rounded-xl px-3.5 py-1.5 cursor-pointer transition-all">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-sm">
              <Building2 className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 flex items-center space-x-1.5">
                <span>Active Deal</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div className="text-sm font-bold text-slate-100 flex items-center space-x-2">
                <span className="truncate max-w-[180px] md:max-w-[240px]">{activeDeal.company}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 transition-transform" />
              </div>
            </div>
          </div>

          {/* Deal Select Dropdown */}
          <div className="absolute top-full left-0 mt-2 w-80 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/80 py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50">
            <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              Select Enterprise Deal
            </div>
            <div className="max-h-64 overflow-y-auto divide-y divide-slate-800/50">
              {deals.map(deal => (
                <button
                  key={deal.id}
                  onClick={() => setActiveDealId(deal.id)}
                  className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between hover:bg-slate-800/70 transition-colors ${
                    deal.id === activeDeal.id ? 'bg-indigo-950/40 border-l-2 border-indigo-500' : ''
                  }`}
                >
                  <div>
                    <div className="font-semibold text-sm text-slate-100">{deal.company}</div>
                    <div className="text-xs text-slate-400 truncate max-w-[190px]">{deal.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-emerald-400">${(deal.arr / 1000).toFixed(0)}k ARR</div>
                    <div className="text-[10px] text-indigo-300 bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-800/50 inline-block mt-0.5">
                      {deal.memoryCount} Memories
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hindsight Engine Status Badge */}
        <div className="hidden lg:flex items-center space-x-2 bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1.5 rounded-full">
          <Brain className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span className="font-medium">Hindsight Engine:</span>
          <span className="font-semibold text-indigo-200">{memoryNodes.length} Deal Memories Connected</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onOpenIngestModal}
          className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs md:text-sm px-3.5 py-1.5 md:px-4 md:py-2 rounded-xl shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Record / Ingest Transcript</span>
        </button>

        <button
          onClick={resetDemoData}
          title="Reset Demo Data"
          className="p-2 text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <div className="h-6 w-px bg-slate-800"></div>

        {/* Profile */}
        <div className="flex items-center space-x-2.5">
          <img
            src={activeDeal.owner.avatar}
            alt={activeDeal.owner.name}
            className="w-8 h-8 rounded-full border border-indigo-500/40 object-cover"
          />
          <div className="hidden md:block text-left">
            <div className="text-xs font-semibold text-slate-200 leading-tight">{activeDeal.owner.name}</div>
            <div className="text-[10px] text-slate-400 leading-tight">Sales AE</div>
          </div>
        </div>
      </div>
    </header>
  );
};
