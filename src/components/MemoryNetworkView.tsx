import React, { useState } from 'react';
import { useDealContext } from '../context/DealContext';
import { MemoryCategory, MemoryNode } from '../types/deal';
import {
  Brain,
  Filter,
  CheckCircle,
  Zap,
  Users,
  ShieldAlert,
  DollarSign,
  Swords,
  FileCheck,
  Calendar,
  Sparkles,
  Search,
  Layers,
  ArrowRight
} from 'lucide-react';

export const MemoryNetworkView: React.FC = () => {
  const { activeDeal, memoryNodes, memoryRelations, interactions } = useDealContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(memoryNodes[0]?.id || null);

  const filteredNodes = selectedCategory === 'ALL'
    ? memoryNodes
    : memoryNodes.filter(n => n.category.toUpperCase() === selectedCategory.toUpperCase());

  const selectedNode = memoryNodes.find(n => n.id === selectedNodeId) || memoryNodes[0];

  const sourceInteraction = selectedNode
    ? interactions.find(i => i.id === selectedNode.sourceInteractionId)
    : null;

  // Category Icon helper
  const getCategoryIcon = (category: MemoryCategory) => {
    switch (category) {
      case 'Stakeholder': return Users;
      case 'Objection': return ShieldAlert;
      case 'Pricing': return DollarSign;
      case 'Competitor': return Swords;
      case 'Requirement': return FileCheck;
      default: return Brain;
    }
  };

  // Category Color helper
  const getCategoryBadgeClass = (category: MemoryCategory) => {
    switch (category) {
      case 'Stakeholder': return 'bg-indigo-950 text-indigo-300 border-indigo-700/60';
      case 'Objection': return 'bg-rose-950 text-rose-300 border-rose-700/60';
      case 'Pricing': return 'bg-emerald-950 text-emerald-300 border-emerald-700/60';
      case 'Competitor': return 'bg-amber-950 text-amber-300 border-amber-700/60';
      case 'Requirement': return 'bg-purple-950 text-purple-300 border-purple-700/60';
      default: return 'bg-slate-900 text-slate-300 border-slate-700';
    }
  };

  const getCategoryNodeBorder = (category: MemoryCategory) => {
    switch (category) {
      case 'Stakeholder': return 'border-indigo-500 shadow-indigo-500/30 text-indigo-400';
      case 'Objection': return 'border-rose-500 shadow-rose-500/30 text-rose-400';
      case 'Pricing': return 'border-emerald-500 shadow-emerald-500/30 text-emerald-400';
      case 'Competitor': return 'border-amber-500 shadow-amber-500/30 text-amber-400';
      case 'Requirement': return 'border-purple-500 shadow-purple-500/30 text-purple-400';
      default: return 'border-slate-500 text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900 border border-slate-800/80 p-6 rounded-2xl">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-400 animate-pulse" />
            Hindsight Persistent Memory Network
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Visual knowledge graph of retained deal facts, objections, pricing constraints, and stakeholder relationships for <strong className="text-slate-200">{activeDeal.company}</strong>.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-purple-300 bg-purple-950/60 border border-purple-800/60 px-3.5 py-2 rounded-xl">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Hindsight Core: {memoryNodes.length} Persistent Chunks Linked</span>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <Filter className="w-3 h-3 text-indigo-400" /> Filter:
        </span>
        {['ALL', 'STAKEHOLDER', 'OBJECTION', 'PRICING', 'COMPETITOR', 'REQUIREMENT'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Graph & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Visual Node Network Graph */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800/80 min-h-[480px] flex flex-col justify-between relative overflow-hidden bg-slate-950/90">
          {/* Subtle Canvas Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d15_1px,transparent_1px),linear-gradient(to_bottom,#1f293d15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

          <div className="relative z-10 flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-400" />
              Interactive Memory Graph (Click node to inspect detail)
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Showing {filteredNodes.length} nodes</span>
          </div>

          {/* Node Grid Layout */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-auto py-6">
            {filteredNodes.map(node => {
              const Icon = getCategoryIcon(node.category);
              const isSelected = selectedNode?.id === node.id;
              const borderClass = getCategoryNodeBorder(node.category);

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`glass-panel p-4 rounded-2xl border cursor-pointer transition-all duration-300 hover:scale-105 flex items-start space-x-3 ${borderClass} ${
                    isSelected ? 'ring-2 ring-purple-400 bg-slate-900 shadow-xl' : 'bg-slate-900/60 opacity-90'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded border ${getCategoryBadgeClass(node.category)}`}>
                        {node.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{node.confidence}%</span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-100 mt-1.5 truncate">{node.label}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{node.details}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Graph Legend */}
          <div className="relative z-10 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Category Key:</span>
            <span className="flex items-center gap-1.5 text-indigo-400"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Stakeholders</span>
            <span className="flex items-center gap-1.5 text-rose-400"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Objections</span>
            <span className="flex items-center gap-1.5 text-emerald-400"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Pricing</span>
            <span className="flex items-center gap-1.5 text-amber-400"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Competitors</span>
          </div>
        </div>

        {/* Right Column: Hindsight Memory Inspector Panel */}
        {selectedNode ? (
          <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-900 to-indigo-950/20 space-y-5">
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase border ${getCategoryBadgeClass(selectedNode.category)}`}>
                {selectedNode.category} Node
              </span>
              <div className="text-xs text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Recall Score: <strong className="text-purple-300 font-mono">{selectedNode.recallCount}x</strong></span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-100">{selectedNode.label}</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                {selectedNode.details}
              </p>
            </div>

            {/* Confidence & Timestamp */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono">
              <div>
                <span className="text-slate-400">Confidence Metric:</span>
                <div className="text-emerald-400 font-bold mt-0.5">{selectedNode.confidence}% Match</div>
              </div>
              <div>
                <span className="text-slate-400">Recorded Date:</span>
                <div className="text-slate-200 font-bold mt-0.5">{selectedNode.timestamp}</div>
              </div>
            </div>

            {/* Source Interaction Tracing */}
            {sourceInteraction && (
              <div className="space-y-2 pt-3 border-t border-slate-800/80">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  Origin Meeting Trace
                </div>
                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/50 text-xs">
                  <div className="font-bold text-slate-200">{sourceInteraction.title}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{sourceInteraction.summary}</div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 flex items-center justify-center text-slate-400 text-xs">
            Select a memory node from the graph to inspect details.
          </div>
        )}
      </div>
    </div>
  );
};
