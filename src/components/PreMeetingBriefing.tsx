import React, { useState } from 'react';
import { useDealContext } from '../context/DealContext';
import {
  FileText,
  Printer,
  Copy,
  Check,
  Brain,
  Building2,
  Users,
  ShieldAlert,
  Swords,
  CheckSquare,
  HelpCircle,
  Sparkles,
  Calendar,
  AlertTriangle
} from 'lucide-react';

export const PreMeetingBriefing: React.FC = () => {
  const { activeDeal, stakeholders, objections, competitors, actionItems, memoryNodes } = useDealContext();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const briefText = `PRE-MEETING EXECUTIVE BRIEFING: ${activeDeal.company}\n` +
      `ARR: $${(activeDeal.arr / 1000).toFixed(0)}k | Stage: ${activeDeal.stage} | Health: ${activeDeal.healthScore}/100\n\n` +
      `EXECUTIVE SUMMARY:\n` +
      `Migration of 40+ microservices to automated AI-driven observability workflows. Hindsight engine indexing ${memoryNodes.length} deal facts.\n\n` +
      `KEY ATTENDEES & SENTIMENT:\n` +
      stakeholders.map(s => `- ${s.name} (${s.title}): ${s.sentiment} (${s.role})`).join('\n') + `\n\n` +
      `OPEN OBJECTIONS TO ADDRESS:\n` +
      objections.filter(o => o.status !== 'Resolved').map(o => `- ${o.issue} [${o.severity}] -> Counter: ${o.counterStrategy}`).join('\n') + `\n\n` +
      `RECOMMENDED AGENDA:\n` +
      `1. Review sub-100ms latency POC benchmark results with Sarah Lin.\n` +
      `2. Present ISO-27001 interim security pack to CISO Priya Sharma.\n` +
      `3. Confirm 12% multi-year discount & Net-30 AWS Private Offer terms with David Sterling.`;

    navigator.clipboard.writeText(briefText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action Bar Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-slate-800/80">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-400" />
            Pre-Meeting Intelligence Briefing
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Auto-synthesized executive preparation document powered by accumulated Hindsight persistent memories.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 font-semibold text-xs px-3.5 py-2 rounded-xl transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Briefing'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-lg shadow-indigo-600/20 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Brief Document Container */}
      <div className="glass-panel p-8 rounded-2xl border border-slate-800/80 space-y-8 bg-slate-950/90 text-slate-100 printable-area">
        {/* Document Header */}
        <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-400 bg-indigo-950 border border-indigo-800 px-2.5 py-0.5 rounded">
              Confidential Sales Intelligence Brief
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-2">{activeDeal.company}</h1>
            <p className="text-sm text-slate-400 mt-0.5">{activeDeal.name}</p>
          </div>

          <div className="text-left md:text-right space-y-1 text-xs">
            <div className="text-slate-400">Target ARR: <strong className="text-emerald-400 font-mono text-sm">${(activeDeal.arr / 1000).toFixed(0)}k</strong></div>
            <div className="text-slate-400">Deal Stage: <strong className="text-slate-200">{activeDeal.stage}</strong></div>
            <div className="text-slate-400">Health Index: <strong className="text-indigo-300 font-mono">{activeDeal.healthScore}/100</strong></div>
            <div className="text-purple-300 font-mono flex items-center justify-start md:justify-end gap-1 mt-1">
              <Brain className="w-3.5 h-3.5 text-purple-400" />
              <span>{memoryNodes.length} Memories Retained</span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            1. Executive Deal Summary
          </h3>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
            {activeDeal.description} Current evaluation is in the <strong>{activeDeal.stage}</strong> phase with a win probability of <strong>{activeDeal.winProbability}%</strong>. Hindsight engine has indexed {memoryNodes.length} key facts from past technical demos and procurement calls.
          </p>
        </div>

        {/* Attendees & Persona Breakdown */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            2. Expected Meeting Attendees & Sentiment Map
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stakeholders.map(sh => (
              <div key={sh.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-100 text-sm">{sh.name}</span>
                    <span className="text-slate-400 block">{sh.title}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    sh.sentiment === 'Strong Support' || sh.sentiment === 'Positive' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                    sh.sentiment === 'Neutral' ? 'bg-slate-800 text-slate-300' :
                    'bg-amber-950 text-amber-400 border border-amber-800'
                  }`}>
                    {sh.sentiment}
                  </span>
                </div>
                <div className="text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800/60 italic">
                  {sh.keyQuotes[0]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unresolved Objections & Counter Tactics */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            3. Key Objections & Counter Tactics
          </h3>

          <div className="space-y-3">
            {objections.map(obj => (
              <div key={obj.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 text-sm">{obj.issue}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    obj.status === 'Open' ? 'bg-rose-950 text-rose-400 border border-rose-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  }`}>
                    {obj.status}
                  </span>
                </div>
                <p className="text-indigo-300 font-medium">Counter Tactic: <span className="text-slate-300 font-normal">{obj.counterStrategy}</span></p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Discussion Agenda */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            4. Recommended Discussion Agenda & Strategy
          </h3>

          <ol className="space-y-2 list-decimal list-inside text-xs md:text-sm text-slate-300 bg-indigo-950/20 p-4 rounded-xl border border-indigo-800/40">
            <li className="font-medium"><strong>Validate Technical Benchmark Success:</strong> Confirm sub-100ms latency test results with Champion Sarah Lin.</li>
            <li className="font-medium"><strong>Address Security Audit Checkpoint:</strong> Deliver interim ISO-27001 pack to CISO Priya Sharma and set date for final SOC2 report.</li>
            <li className="font-medium"><strong>Finalize Commercial Terms:</strong> Confirm 12% discount & Net-30 terms with Procurement Head David Sterling via AWS Marketplace Private Offer.</li>
          </ol>
        </div>

        {/* Pending Commitments Checklist */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-emerald-400" />
            5. Outstanding Action Items Checklist
          </h3>

          <div className="space-y-2">
            {actionItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="text-slate-200 font-semibold">{item.title}</span>
                <span className="text-slate-400">Owner: {item.assignee} | Due: {item.dueDate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
