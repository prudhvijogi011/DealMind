import React, { useState } from 'react';
import { useDealContext } from '../context/DealContext';
import { Interaction, MemoryNode } from '../types/deal';
import {
  Zap,
  X,
  Brain,
  FileText,
  Sparkles,
  CheckCircle2,
  Users,
  Building2,
  Loader2,
  ArrowRight
} from 'lucide-react';

interface IngestTranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IngestTranscriptModal: React.FC<IngestTranscriptModalProps> = ({ isOpen, onClose }) => {
  const { activeDeal, ingestMeetingTranscript } = useDealContext();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<Interaction['type']>('meeting');
  const [participants, setParticipants] = useState('');
  const [rawText, setRawText] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStep, setProgressStep] = useState<number>(0);
  const [result, setResult] = useState<{ newFacts: string[]; newMemories: MemoryNode[] } | null>(null);

  if (!isOpen) return null;

  const handleRunIngestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !rawText.trim()) return;

    setIsProcessing(true);
    setProgressStep(1);

    // Step 1: Parsing tokens
    setTimeout(() => {
      setProgressStep(2);
      // Step 2: Extracting facts & objections
      setTimeout(() => {
        setProgressStep(3);
        // Step 3: Updating Hindsight graph
        setTimeout(() => {
          const res = ingestMeetingTranscript(title, type, rawText, participants);
          setResult(res);
          setIsProcessing(false);
          setProgressStep(4);
        }, 700);
      }, 700);
    }, 700);
  };

  const handleDone = () => {
    setTitle('');
    setParticipants('');
    setRawText('');
    setResult(null);
    setProgressStep(0);
    onClose();
  };

  // Sample pre-fill templates
  const fillSampleTranscript = (sampleType: 'pricing' | 'security' | 'competitor') => {
    if (sampleType === 'pricing') {
      setTitle('Executive Pricing & AWS Marketplace Sync');
      setType('pricing_call');
      setParticipants('David Sterling (Procurement), Alex Rivera (AE)');
      setRawText(
        `David Sterling: "We reviewed your standard software agreement. Acme Procurement policy requires that all enterprise purchases pass through our AWS Marketplace private offer quota to leverage committed cloud spend.\n\n` +
        `If DealMind can offer a 12% multi-year discount on our $480k ARR contract, we will agree to Net-30 payment terms and provide a public case study feature after launch."`
      );
    } else if (sampleType === 'security') {
      setTitle('Security Audit & Compliance Deep Dive');
      setType('meeting');
      setParticipants('Priya Sharma (CISO), Sarah Lin (VP Eng), Alex Rivera');
      setRawText(
        `Priya Sharma (CISO): "We conducted our preliminary security review of DealMind's persistent memory architecture. The zero-data retention model outside isolated tenant bounds satisfies our enterprise privacy standards.\n\n` +
        `However, our legal committee mandates receiving the final SOC2 Type II audit report before signing the master agreement. In the interim, please send the ISO-27001 certificate pack."`
      );
    } else {
      setTitle('Competitive Evaluation Sync with Engineering');
      setType('demo');
      setParticipants('Sarah Lin (VP Eng), Marcus Vance (CTO)');
      setRawText(
        `Sarah Lin: "We stress tested Datadog log intelligence against DealMind during our sprint test. Datadog's egress pricing is expanding our monthly infrastructure costs, whereas DealMind's Hindsight memory engine has reduced note preparation time by 80% for our platform leads.\n\n` +
        `Marcus Vance confirmed that if technical latency remains under 100ms, Acme will select DealMind as primary deal intelligence platform."`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="h-16 px-6 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Zap className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                Hindsight Memory Ingestion Studio
                <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.2 rounded font-mono">
                  Live NLP Pipeline
                </span>
              </h3>
              <p className="text-xs text-slate-400">Ingest raw meeting transcripts & notes into persistent deal memory</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {!result ? (
            <form onSubmit={handleRunIngestion} className="space-y-4">
              {/* Sample Fill Chips */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold">Load Sample Transcripts:</span>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => fillSampleTranscript('pricing')}
                    className="bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-800/60 px-2.5 py-1 rounded-lg transition-all"
                  >
                    Pricing Terms
                  </button>
                  <button
                    type="button"
                    onClick={() => fillSampleTranscript('security')}
                    className="bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-800/60 px-2.5 py-1 rounded-lg transition-all"
                  >
                    SOC2 Security Audit
                  </button>
                  <button
                    type="button"
                    onClick={() => fillSampleTranscript('competitor')}
                    className="bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-800/60 px-2.5 py-1 rounded-lg transition-all"
                  >
                    Competitor Benchmark
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Meeting / Interaction Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Q4 Pricing & Security Alignment Sync"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Interaction Type</label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  >
                    <option value="meeting">Executive Meeting</option>
                    <option value="pricing_call">Pricing Negotiation</option>
                    <option value="demo">Technical Demo / POC</option>
                    <option value="email">Email Correspondence</option>
                    <option value="call">Phone Call</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Participants</label>
                  <input
                    type="text"
                    value={participants}
                    onChange={e => setParticipants(e.target.value)}
                    placeholder="e.g. Marcus Vance, Sarah Lin, Alex Rivera"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Paste Raw Meeting Notes or Transcript</label>
                <textarea
                  rows={5}
                  required
                  value={rawText}
                  onChange={e => setRawText(e.target.value)}
                  placeholder="Paste call notes, audio transcript, or email thread here..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              {/* Ingestion Progress Steps */}
              {isProcessing && (
                <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 space-y-2 text-xs">
                  <div className="flex items-center space-x-2 text-indigo-300 font-semibold">
                    <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                    <span>Hindsight Ingestion Engine Processing...</span>
                  </div>
                  <div className="space-y-1.5 text-slate-400">
                    <div className={progressStep >= 1 ? 'text-emerald-400 flex items-center gap-1.5' : ''}>
                      {progressStep >= 1 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />} 1. Tokenizing transcript text & extracting entity relationships...
                    </div>
                    <div className={progressStep >= 2 ? 'text-emerald-400 flex items-center gap-1.5' : ''}>
                      {progressStep >= 2 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />} 2. Categorizing objections, pricing rules, & competitor traps...
                    </div>
                    <div className={progressStep >= 3 ? 'text-emerald-400 flex items-center gap-1.5' : ''}>
                      {progressStep >= 3 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />} 3. Updating Hindsight persistent memory graph for {activeDeal.company}...
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/25 transition-all disabled:opacity-50"
                >
                  <Brain className="w-4 h-4" />
                  <span>Run Ingestion Pipeline</span>
                </button>
              </div>
            </form>
          ) : (
            /* Results View */
            <div className="space-y-5">
              <div className="flex items-center space-x-3 text-emerald-400 bg-emerald-950/40 border border-emerald-800 p-4 rounded-xl">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-emerald-200">Ingestion Complete!</h4>
                  <p className="text-xs text-emerald-300">Successfully extracted facts and generated Hindsight memory nodes for {activeDeal.company}.</p>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Extracted Key Facts</h5>
                <div className="space-y-2">
                  {result.newFacts.map((fact, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{fact}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">New Hindsight Memory Nodes Connected</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.newMemories.map(mem => (
                    <div key={mem.id} className="p-3 rounded-xl bg-purple-950/20 border border-purple-800/40 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-purple-200">
                        <span>{mem.label}</span>
                        <span className="text-[10px] text-emerald-400 font-mono">{mem.confidence}%</span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{mem.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end pt-3">
                <button
                  onClick={handleDone}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20"
                >
                  Return to Workspace
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
