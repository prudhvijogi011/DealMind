import React, { useState } from 'react';
import { useDealContext } from '../context/DealContext';
import {
  Building2,
  Calendar,
  Users,
  Swords,
  CheckSquare,
  History,
  TrendingUp,
  Brain,
  ShieldCheck,
  AlertCircle,
  Plus,
  MessageSquare,
  Tag,
  CheckCircle2,
  Clock,
  UserCheck,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Objection } from '@/types/deal';

export const DealWorkspace: React.FC = () => {
  const {
    activeDeal,
    stakeholders,
    competitors,
    objections,
    interactions,
    actionItems,
    memoryNodes,
    updateObjectionStatus,
    addObjection,
    toggleActionItem,
    addActionItem
  } = useDealContext();

  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'overview' | 'timeline' | 'stakeholders' | 'competitors' | 'tasks'>('overview');

  // Modals / Dialog states
  const [showAddObjectionModal, setShowAddObjectionModal] = useState(false);
  const [newObjIssue, setNewObjIssue] = useState('');
  const [newObjCategory, setNewObjCategory] = useState<'Pricing' | 'Security' | 'Integration' | 'Timeline' | 'Feature Gap' | 'Competitor'>('Pricing');
  const [newObjStrategy, setNewObjStrategy] = useState('');
  const [newObjRaisedBy, setNewObjRaisedBy] = useState('');
  const [newObjSeverity, setNewObjSeverity] = useState<'Critical' | 'Moderate' | 'Minor'>('Moderate');

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState(activeDeal.owner.name);
  const [newTaskDueDate, setNewTaskDueDate] = useState('2026-10-05');
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Medium' | 'Low'>('High');

  const [expandedInteractionId, setExpandedInteractionId] = useState<string | null>(null);

  const handleAddObjectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newObjIssue.trim()) return;
    addObjection({
      category: newObjCategory,
      issue: newObjIssue,
      counterStrategy: newObjStrategy,
      status: 'Open',
      severity: newObjSeverity,
      raisedBy: newObjRaisedBy || 'Stakeholder'
    });
    setNewObjIssue('');
    setNewObjStrategy('');
    setNewObjRaisedBy('');
    setShowAddObjectionModal(false);
  };

  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addActionItem(newTaskTitle, newTaskAssignee, newTaskDueDate, newTaskPriority);
    setNewTaskTitle('');
    setShowAddTaskModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 bg-gradient-to-r from-slate-900 via-slate-900/90 to-indigo-950/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <Building2 className="w-7 h-7 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase font-bold text-indigo-400 bg-indigo-950 border border-indigo-800/60 px-2.5 py-0.5 rounded-full">
                  {activeDeal.stage}
                </span>
                <span className="text-xs text-slate-400">• Expected Close: {activeDeal.expectedCloseDate}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-100 mt-1">{activeDeal.company}</h2>
              <p className="text-sm text-slate-400 mt-0.5">{activeDeal.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
            <div>
              <div className="text-xs text-slate-400 font-medium">Annual Revenue</div>
              <div className="text-xl font-extrabold text-emerald-400 font-mono mt-0.5">
                ${(activeDeal.arr / 1000).toFixed(0)}k <span className="text-xs text-slate-400">ARR</span>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Win Probability</div>
              <div className="text-xl font-extrabold text-indigo-300 font-mono mt-0.5">{activeDeal.winProbability}%</div>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Hindsight Memories</div>
              <div className="text-xl font-extrabold text-purple-300 font-mono mt-0.5">{memoryNodes.length}</div>
            </div>
          </div>
        </div>

        {/* Workspace Tab Navigation Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap gap-2">
          {[
            { id: 'overview', label: 'Deal Overview', icon: TrendingUp },
            { id: 'timeline', label: `Timeline & Interactions (${interactions.length})`, icon: History },
            { id: 'stakeholders', label: `Stakeholder Matrix (${stakeholders.length})`, icon: Users },
            { id: 'competitors', label: `Competitors & Objections (${objections.length})`, icon: Swords },
            { id: 'tasks', label: `Commitments & Tasks (${actionItems.length})`, icon: CheckSquare }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeWorkspaceTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveWorkspaceTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeWorkspaceTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Health Score & Description */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800/80">
              <h3 className="text-base font-bold text-slate-100 mb-3">Deal Description & Scope</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{activeDeal.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {activeDeal.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs bg-slate-800 text-slate-300 border border-slate-700/80 px-2.5 py-1 rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Health Score Gauge breakdown */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800/80">
              <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center justify-between">
                <span>Deal Health Diagnostic</span>
                <span className={`text-xs font-bold font-mono px-3 py-1 rounded-full uppercase ${activeDeal.healthStatus === 'healthy' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                    activeDeal.healthStatus === 'warning' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                      'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}>
                  {activeDeal.healthStatus} • {activeDeal.healthScore}/100
                </span>
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300">Technical Champion Engagement</span>
                    <span className="text-emerald-400 font-bold font-mono">92%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300">Executive & Economic Buyer Alignment</span>
                    <span className="text-indigo-400 font-bold font-mono">80%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300">Security & Legal Approval Progress</span>
                    <span className="text-amber-400 font-bold font-mono">65%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Contacts & Quick Hindsight Summary */}
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800/80">
              <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center justify-between">
                <span>Account AE Owner</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </h3>
              <div className="flex items-center space-x-3">
                <img
                  src={activeDeal.owner.avatar}
                  alt={activeDeal.owner.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                />
                <div>
                  <div className="font-bold text-sm text-slate-100">{activeDeal.owner.name}</div>
                  <div className="text-xs text-slate-400">{activeDeal.owner.role}</div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 bg-gradient-to-b from-indigo-950/20 to-slate-900">
              <h3 className="text-base font-bold text-slate-100 mb-3 flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-400" />
                Hindsight Memory Status
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                DealMind has retained <strong className="text-indigo-300 font-mono">{memoryNodes.length} memory facts</strong> across {interactions.length} meetings.
              </p>
              <div className="mt-4 space-y-2">
                {memoryNodes.slice(0, 3).map(mem => (
                  <div key={mem.id} className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between font-semibold text-slate-200">
                      <span>{mem.label}</span>
                      <span className="text-[10px] text-indigo-400 font-mono">{mem.confidence}% confidence</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{mem.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Timeline & Interactions */}
      {activeWorkspaceTab === 'timeline' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-100">Chronological Meeting & Interaction Memory Feed</h3>
            <span className="text-xs text-slate-400">Total {interactions.length} interactions recorded</span>
          </div>

          <div className="space-y-4">
            {interactions.map(int => {
              const isExpanded = expandedInteractionId === int.id;
              return (
                <div key={int.id} className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs uppercase">
                        {int.type}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-100">{int.title}</h4>
                        <div className="flex items-center space-x-3 text-xs text-slate-400 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                            {int.date}
                          </span>
                          <span>• Participants: {int.participants.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedInteractionId(isExpanded ? null : int.id)}
                      className="flex items-center space-x-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold bg-indigo-950/60 border border-indigo-800/50 px-3 py-1.5 rounded-lg self-start md:self-auto"
                    >
                      <span>{isExpanded ? 'Hide Full Transcript' : 'Inspect Transcript & Memory Nodes'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <p className="text-sm text-slate-300 mt-3 bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                    <strong className="text-slate-200">AI Summary:</strong> {int.summary}
                  </p>

                  {/* Extracted Facts & Memory Nodes Bar */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {int.extractedFacts.map((fact, fIdx) => (
                      <span key={fIdx} className="text-xs bg-indigo-950/40 text-indigo-300 border border-indigo-800/40 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                        <Brain className="w-3 h-3 text-indigo-400" />
                        <span>{fact}</span>
                      </span>
                    ))}
                  </div>

                  {/* Expanded Full Raw Text */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
                      <div>
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Raw Meeting Notes / Transcript</div>
                        <pre className="text-xs text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono whitespace-pre-wrap leading-relaxed">
                          {int.rawText}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Stakeholder Matrix */}
      {activeWorkspaceTab === 'stakeholders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-100">Stakeholder Influence & Sentiment Map</h3>
              <p className="text-xs text-slate-400">Track key champions, economic buyers, blockers, and technical evaluators.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {stakeholders.map(sh => (
              <div key={sh.id} className="glass-panel p-6 rounded-2xl border border-slate-800/80 relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={sh.avatar}
                      alt={sh.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/40"
                    />
                    <div>
                      <h4 className="text-base font-bold text-slate-100">{sh.name}</h4>
                      <p className="text-xs text-slate-400">{sh.title}</p>
                    </div>
                  </div>

                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${sh.sentiment === 'Strong Support' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                      sh.sentiment === 'Positive' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' :
                        sh.sentiment === 'Neutral' ? 'bg-slate-800 text-slate-300 border border-slate-700' :
                          sh.sentiment === 'Skeptical' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                            'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}>
                    {sh.sentiment}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  <div>
                    <span className="text-slate-400">Role in Deal:</span>
                    <div className="font-semibold text-indigo-300 mt-0.5">{sh.role}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Influence Power:</span>
                    <div className="font-semibold text-slate-200 mt-0.5">{sh.influence} Influence</div>
                  </div>
                </div>

                {/* Key Quotes extracted by Hindsight */}
                <div className="mt-4 space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Hindsight Extracted Quotes</div>
                  {sh.keyQuotes.map((quote, qIdx) => (
                    <blockquote key={qIdx} className="text-xs italic text-slate-300 bg-indigo-950/20 border-l-2 border-indigo-500 p-2.5 rounded-r-lg">
                      {quote}
                    </blockquote>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Competitors & Objections */}
      {activeWorkspaceTab === 'competitors' && (
        <div className="space-y-8">
          {/* Objections Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-400" />
                  Customer Objections & Counter-Strategies
                </h3>
                <p className="text-xs text-slate-400">Manage security, pricing, and technical hurdles raised during interactions.</p>
              </div>
              <button
                onClick={() => setShowAddObjectionModal(true)}
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Objection</span>
              </button>
            </div>

            <div className="space-y-4">
              {objections.map(obj => (
                <div key={obj.id} className="glass-panel p-5 rounded-2xl border border-slate-800/80">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <span className={`text-xs px-2.5 py-1 rounded-lg font-bold uppercase ${obj.severity === 'Critical' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                          obj.severity === 'Moderate' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                            'bg-slate-800 text-slate-300'
                        }`}>
                        {obj.severity} • {obj.category}
                      </span>
                      <h4 className="text-base font-bold text-slate-100">{obj.issue}</h4>
                    </div>

                    {/* Status Toggle buttons */}
                    <div className="flex items-center space-x-1.5 self-start md:self-auto">
                      {(['Open', 'Mitigated', 'Resolved'] as Objection['status'][]).map(st => (
                        <button
                          key={st}
                          onClick={() => updateObjectionStatus(obj.id, st)}
                          className={`text-xs px-3 py-1 rounded-lg font-semibold transition-all ${obj.status === st
                              ? st === 'Resolved' ? 'bg-emerald-600 text-white' :
                                st === 'Mitigated' ? 'bg-amber-600 text-white' :
                                  'bg-rose-600 text-white'
                              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                            }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-slate-400">
                    Raised by: <strong className="text-slate-200">{obj.raisedBy}</strong>
                  </div>

                  <div className="mt-3 bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs">
                    <span className="font-semibold text-indigo-400">Counter Strategy:</span>
                    <p className="text-slate-200 mt-1">{obj.counterStrategy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competitor Battlecards Section */}
          <div>
            <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Swords className="w-5 h-5 text-indigo-400" />
              Competitor Intelligence & Battlecards
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {competitors.map(comp => (
                <div key={comp.id} className="glass-panel p-6 rounded-2xl border border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-slate-100">{comp.name}</h4>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${comp.threatLevel === 'High' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                        comp.threatLevel === 'Medium' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                          'bg-slate-800 text-slate-300'
                      }`}>
                      {comp.threatLevel} Threat • {comp.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-3 bg-indigo-950/30 p-3 rounded-xl border border-indigo-800/30">
                    <strong className="text-indigo-400">Positioning Strategy:</strong> {comp.positioningStrategy}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="font-semibold text-rose-400">Their Strengths:</span>
                      <ul className="mt-1 space-y-1 list-disc list-inside text-slate-300">
                        {comp.strengths.map((s, idx) => <li key={idx}>{s}</li>)}
                      </ul>
                    </div>

                    <div>
                      <span className="font-semibold text-emerald-400">Our Counter Weaknesses:</span>
                      <ul className="mt-1 space-y-1 list-disc list-inside text-slate-300">
                        {comp.weaknesses.map((w, idx) => <li key={idx}>{w}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Commitments & Action Items */}
      {activeWorkspaceTab === 'tasks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-100">Deal Action Items & Pending Commitments</h3>
              <p className="text-xs text-slate-400">Track promises made to customer stakeholders during meetings.</p>
            </div>
            <button
              onClick={() => setShowAddTaskModal(true)}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Action Item</span>
            </button>
          </div>

          <div className="space-y-3">
            {actionItems.map(item => (
              <div
                key={item.id}
                onClick={() => toggleActionItem(item.id)}
                className={`glass-panel p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${item.status === 'Completed'
                    ? 'border-slate-800/50 opacity-60 bg-slate-950/40'
                    : 'border-slate-800 hover:border-slate-700'
                  }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${item.status === 'Completed' ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-slate-700 hover:border-indigo-400'
                    }`}>
                    {item.status === 'Completed' && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className={`text-sm font-semibold ${item.status === 'Completed' ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                      {item.title}
                    </h4>
                    <div className="flex items-center space-x-3 text-xs text-slate-400 mt-0.5">
                      <span>Owner: {item.assignee}</span>
                      <span>• Due: {item.dueDate}</span>
                    </div>
                  </div>
                </div>

                <span className={`text-[10px] uppercase font-mono px-2.5 py-0.5 rounded font-bold ${item.priority === 'High' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                    item.priority === 'Medium' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                      'bg-slate-800 text-slate-300'
                  }`}>
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Objection Modal */}
      {showAddObjectionModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-slate-100 mb-4">Add Customer Objection</h3>
            <form onSubmit={handleAddObjectionSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Objection Issue / Pushback</label>
                <input
                  type="text"
                  required
                  value={newObjIssue}
                  onChange={e => setNewObjIssue(e.target.value)}
                  placeholder="e.g. Demands sub-50ms latency guarantee in SLA"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                  <select
                    value={newObjCategory}
                    onChange={e => setNewObjCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  >
                    <option value="Pricing">Pricing</option>
                    <option value="Security">Security</option>
                    <option value="Integration">Integration</option>
                    <option value="Timeline">Timeline</option>
                    <option value="Feature Gap">Feature Gap</option>
                    <option value="Competitor">Competitor</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Severity</label>
                  <select
                    value={newObjSeverity}
                    onChange={e => setNewObjSeverity(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  >
                    <option value="Critical">Critical</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Minor">Minor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Raised By (Stakeholder)</label>
                <input
                  type="text"
                  value={newObjRaisedBy}
                  onChange={e => setNewObjRaisedBy(e.target.value)}
                  placeholder="e.g. Priya Sharma (CISO)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Proposed Counter Strategy</label>
                <textarea
                  rows={3}
                  value={newObjStrategy}
                  onChange={e => setNewObjStrategy(e.target.value)}
                  placeholder="e.g. Schedule technical benchmark session and present latency test logs"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddObjectionModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/20"
                >
                  Save Objection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Action Item Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-slate-100 mb-4">Add Action Item Commitment</h3>
            <form onSubmit={handleAddTaskSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Task Deliverable</label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Send updated SOC2 compliance pack to Priya"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Assignee</label>
                  <input
                    type="text"
                    value={newTaskAssignee}
                    onChange={e => setNewTaskAssignee(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newTaskDueDate}
                    onChange={e => setNewTaskDueDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/20"
                >
                  Add Commitment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
