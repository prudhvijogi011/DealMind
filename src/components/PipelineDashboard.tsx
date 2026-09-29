import React, { useState } from 'react';
import { useDealContext } from '../context/DealContext';
import { NavTab } from './Sidebar';
import { DealStage, HealthStatus } from '../types/deal';
import {
  DollarSign,
  TrendingUp,
  Brain,
  AlertTriangle,
  ShieldAlert,
  Clock,
  ChevronRight,
  Building2,
  FileText,
  Plus,
  Search,
  Trash2,
  Edit3,
  X
} from 'lucide-react';

interface PipelineDashboardProps {
  setActiveTab: (tab: NavTab) => void;
}

export const PipelineDashboard: React.FC<PipelineDashboardProps> = ({ setActiveTab }) => {
  const { deals, setActiveDealId, activeDealId, addDeal, updateDeal, deleteDeal } = useDealContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New deal form state
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [arr, setArr] = useState<number>(150000);
  const [stage, setStage] = useState<DealStage>('Discovery');
  const [winProb, setWinProb] = useState<number>(50);
  const [healthScore, setHealthScore] = useState<number>(75);
  const [healthStatus, setHealthStatus] = useState<HealthStatus>('healthy');
  const [ownerName, setOwnerName] = useState('Sarah Jenkins');

  const filteredDeals = deals.filter(d => {
    const matchesSearch = d.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || d.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const totalArr = deals.reduce((acc, d) => acc + d.arr, 0);
  const avgWinProb = deals.length > 0
    ? Math.round(deals.reduce((acc, d) => acc + d.winProbability, 0) / deals.length)
    : 0;
  const totalMemories = deals.reduce((acc, d) => acc + d.memoryCount, 0);
  const atRiskCount = deals.filter(d => d.healthStatus === 'risk').length;

  const handleSelectDeal = (id: string, targetTab: NavTab = 'workspace') => {
    setActiveDealId(id);
    setActiveTab(targetTab);
  };

  const handleCreateDealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !name.trim()) return;

    addDeal({
      company,
      name,
      arr: Number(arr),
      stage,
      winProbability: Number(winProb),
      healthScore: Number(healthScore),
      healthStatus,
      expectedCloseDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      owner: {
        name: ownerName,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        role: 'Senior AE'
      },
      description: `Enterprise engagement with ${company}`,
      tags: ['Enterprise', 'SaaS', 'Hindsight Tracked'],
      logo: '🏢'
    });

    // Reset form
    setCompany('');
    setName('');
    setArr(150000);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800/80 p-6 rounded-2xl">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2">
            Active Sales Pipeline & Deal Intelligence
            <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full font-mono">
              Hindsight Memory Engine
            </span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Real-time memory graph tracking customer interactions, objections, decision criteria, and deal health.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs md:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Enterprise Deal</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Pipeline */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Pipeline Value</p>
              <h3 className="text-2xl font-extrabold text-slate-100 mt-2 font-mono">
                ${(totalArr / 1000).toFixed(0)}k <span className="text-xs font-sans text-slate-400 font-normal">ARR</span>
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            <span>{deals.length} Enterprise Opportunities</span>
          </div>
        </div>

        {/* Avg Win Probability */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Win Probability</p>
              <h3 className="text-2xl font-extrabold text-slate-100 mt-2 font-mono">{avgWinProb}%</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-xs text-slate-400">
            Weighted value: <span className="text-slate-200 font-mono font-semibold">${((totalArr * (avgWinProb / 100)) / 1000).toFixed(0)}k</span>
          </div>
        </div>

        {/* Persistent Memories */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Hindsight Memories</p>
              <h3 className="text-2xl font-extrabold text-indigo-300 mt-2 font-mono">{totalMemories}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Brain className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-xs text-purple-300 font-medium flex items-center">
            <span className="w-2 h-2 rounded-full bg-purple-400 mr-1.5 animate-pulse"></span>
            <span>Retained across meetings</span>
          </div>
        </div>

        {/* Risk Alerts */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">At-Risk Opportunities</p>
              <h3 className="text-2xl font-extrabold text-amber-400 mt-2 font-mono">{atRiskCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-xs text-amber-300">
            Requires executive intervention
          </div>
        </div>
      </div>

      {/* Filter & Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search deals by company or opportunity name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Stage Filter:</span>
          <select
            value={stageFilter}
            onChange={e => setStageFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Stages ({deals.length})</option>
            <option value="Discovery">Discovery</option>
            <option value="Evaluation">Evaluation</option>
            <option value="Pricing & Legal">Pricing & Legal</option>
            <option value="Executive Review">Executive Review</option>
            <option value="Closed Won">Closed Won</option>
            <option value="Closed Lost">Closed Lost</option>
          </select>
        </div>
      </div>

      {/* Active Deals Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-400" />
            Enterprise Deals Overview ({filteredDeals.length})
          </h3>
          <span className="text-xs text-slate-400">Click any deal card to launch intelligence workspace</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {filteredDeals.map(deal => {
            const isSelected = deal.id === activeDealId;
            return (
              <div
                key={deal.id}
                onClick={() => handleSelectDeal(deal.id)}
                className={`glass-panel p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:scale-[1.01] ${
                  isSelected
                    ? 'border-indigo-500/80 shadow-xl shadow-indigo-600/10 bg-slate-900/90'
                    : 'border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <select
                        value={deal.stage}
                        onClick={e => e.stopPropagation()}
                        onChange={e => {
                          e.stopPropagation();
                          updateDeal(deal.id, { stage: e.target.value as DealStage });
                        }}
                        className="text-[10px] uppercase tracking-wider font-semibold text-indigo-300 bg-indigo-950/80 border border-indigo-700/50 px-2 py-0.5 rounded focus:outline-none cursor-pointer"
                      >
                        <option value="Discovery">Discovery</option>
                        <option value="Evaluation">Evaluation</option>
                        <option value="Pricing & Legal">Pricing & Legal</option>
                        <option value="Executive Review">Executive Review</option>
                        <option value="Closed Won">Closed Won</option>
                        <option value="Closed Lost">Closed Lost</option>
                      </select>

                      <select
                        value={deal.healthStatus}
                        onClick={e => e.stopPropagation()}
                        onChange={e => {
                          e.stopPropagation();
                          updateDeal(deal.id, { healthStatus: e.target.value as HealthStatus });
                        }}
                        className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded border focus:outline-none cursor-pointer ${
                          deal.healthStatus === 'healthy'
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                            : deal.healthStatus === 'warning'
                            ? 'bg-amber-950 text-amber-400 border-amber-800'
                            : 'bg-rose-950 text-rose-400 border-rose-800'
                        }`}
                      >
                        <option value="healthy">Healthy</option>
                        <option value="warning">Warning</option>
                        <option value="risk">High Risk</option>
                      </select>
                    </div>

                    <h4 className="text-lg font-bold text-slate-100 mt-2.5 hover:text-indigo-300 transition-colors">
                      {deal.company}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{deal.name}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-extrabold text-emerald-400 font-mono">
                      ${(deal.arr / 1000).toFixed(0)}k
                    </div>
                    <div className="text-[10px] text-slate-400">ARR</div>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        if (confirm(`Delete deal ${deal.company}?`)) {
                          deleteDeal(deal.id);
                        }
                      }}
                      className="mt-1 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Delete deal"
                    >
                      <Trash2 className="w-3.5 h-3.5 inline" />
                    </button>
                  </div>
                </div>

                {/* Health & Win Probability Bar */}
                <div className="mt-5 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-medium">Health Score & Win Probability</span>
                    <span className="font-mono font-bold text-slate-200">{deal.healthScore}% Health • {deal.winProbability}% Win</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full transition-all duration-500 ${
                        deal.healthStatus === 'healthy'
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                          : deal.healthStatus === 'warning'
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                          : 'bg-gradient-to-r from-rose-500 to-red-400'
                      }`}
                      style={{ width: `${deal.healthScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Hindsight Memory Tag Bar */}
                <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center space-x-1.5 text-purple-300 font-medium">
                    <Brain className="w-3.5 h-3.5 text-purple-400" />
                    <span>{deal.memoryCount} Memories Retained</span>
                  </div>
                  <div className="flex items-center space-x-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{deal.lastActivity}</span>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="mt-4 pt-3 border-t border-slate-800/40 flex items-center justify-between gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectDeal(deal.id, 'workspace');
                    }}
                    className="flex-1 text-center py-2 px-3 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Deal Workspace</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectDeal(deal.id, 'briefing');
                    }}
                    className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Briefing</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hindsight Memory Risk & Executive Insights Feed */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800/80">
        <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          Hindsight Memory Insights & Executive Alerts
        </h3>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-amber-200">Apex Financial Services</span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-950 border border-amber-800 px-2 py-0.5 rounded">High Risk</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Legal Lead (Counsel Robert Thorne) demanded unlimited liability breach indemnity. Palantir offering $200k forward-deployed engineering credits.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex items-start gap-3">
            <Brain className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-indigo-200">Acme Global Inc.</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">Close Ready</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Procurement (David Sterling) agreed in principle to Net-30 payment schedule if 12% multi-year discount is processed via AWS Marketplace.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal to Create New Deal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                Create New Enterprise Deal
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDealSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nexus Technology Corp"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Opportunity Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Enterprise AI Platform License"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">ARR ($ USD)</label>
                  <input
                    type="number"
                    step="10000"
                    required
                    value={arr}
                    onChange={e => setArr(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Stage</label>
                  <select
                    value={stage}
                    onChange={e => setStage(e.target.value as DealStage)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Discovery">Discovery</option>
                    <option value="Evaluation">Evaluation</option>
                    <option value="Pricing & Legal">Pricing & Legal</option>
                    <option value="Executive Review">Executive Review</option>
                    <option value="Closed Won">Closed Won</option>
                    <option value="Closed Lost">Closed Lost</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Win Prob (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={winProb}
                    onChange={e => setWinProb(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Health Score</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={healthScore}
                    onChange={e => setHealthScore(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Health Status</label>
                  <select
                    value={healthStatus}
                    onChange={e => setHealthStatus(e.target.value as HealthStatus)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="healthy">Healthy</option>
                    <option value="warning">Warning</option>
                    <option value="risk">Risk</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20"
                >
                  Create Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
