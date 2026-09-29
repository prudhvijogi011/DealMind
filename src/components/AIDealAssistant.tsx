import React, { useState, useRef, useEffect } from 'react';
import { useDealContext } from '../context/DealContext';
import { ChatMessage } from '../types/deal';
import {
  Bot,
  User,
  Send,
  Sparkles,
  Brain,
  ShieldAlert,
  Swords,
  DollarSign,
  CheckCircle,
  Clock,
  HelpCircle,
  Lightbulb,
  FileText
} from 'lucide-react';

export const AIDealAssistant: React.FC = () => {
  const { activeDeal, memoryNodes, objections, competitors, stakeholders, interactions } = useDealContext();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `Hello Alex! I am your DealMind Intelligence Agent for **${activeDeal.company}**.\n\nI have indexed **${memoryNodes.length} persistent memory nodes** from your past meetings, calls, and email exchanges. How can I assist you with this opportunity?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Suggested prompt pills
  const promptPills = [
    "What are the customer's main objections?",
    "Which competitors are being considered?",
    "Who is involved in the decision?",
    "What pricing discounts or terms were discussed?",
    "Prepare me for my next meeting"
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // Simulate AI synthesis & Hindsight Memory Recall after 800ms
    setTimeout(() => {
      const { responseText, recalledMemories } = generateAIResponse(query);
      const assistantMsg: ChatMessage = {
        id: `msg-asst-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        memoriesRecalled: recalledMemories
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 900);
  };

  // AI Response Generator based on active deal state
  const generateAIResponse = (query: string): { responseText: string; recalledMemories: ChatMessage['memoriesRecalled'] } => {
    const qLower = query.toLowerCase();
    const recalledMemories: ChatMessage['memoriesRecalled'] = [];

    // 1. Objections query
    if (qLower.includes('objection') || qLower.includes('concern') || qLower.includes('risk') || qLower.includes('issue')) {
      const openObjs = objections.filter(o => o.status === 'Open');
      memoryNodes.filter(n => n.category === 'Objection').forEach(n => {
        recalledMemories.push({
          nodeId: n.id,
          label: n.label,
          category: n.category,
          confidence: n.confidence,
          sourceSnippet: n.details
        });
      });

      let text = `Based on Hindsight persistent memory for **${activeDeal.company}**, here are the primary customer objections:\n\n`;
      objections.forEach((o, i) => {
        text += `**${i + 1}. ${o.issue}** (${o.severity} severity)\n- **Raised By:** ${o.raisedBy}\n- **Counter Strategy:** ${o.counterStrategy}\n- **Status:** ${o.status}\n\n`;
      });
      text += `💡 **Recommended Next Step:** Schedule a security review call with CISO Priya Sharma to address the pending SOC2 Type II audit documentation.`;
      return { responseText: text, recalledMemories };
    }

    // 2. Competitors query
    if (qLower.includes('competitor') || qLower.includes('datadog') || qLower.includes('palantir') || qLower.includes('gong') || qLower.includes('battlecard')) {
      memoryNodes.filter(n => n.category === 'Competitor').forEach(n => {
        recalledMemories.push({
          nodeId: n.id,
          label: n.label,
          category: n.category,
          confidence: n.confidence,
          sourceSnippet: n.details
        });
      });

      let text = `Here is the competitor intelligence retrieved from meeting records for **${activeDeal.company}**:\n\n`;
      competitors.forEach((c, i) => {
        text += `**${i + 1}. ${c.name}** (${c.threatLevel} Threat • ${c.status})\n- **Strategy:** ${c.positioningStrategy}\n- **Their Weaknesses to Attack:** ${c.weaknesses.join(', ')}\n\n`;
      });
      text += `🎯 **Key Positioning:** Highlight our persistent Hindsight memory architecture vs. competitors' stateless AI assistants.`;
      return { responseText: text, recalledMemories };
    }

    // 3. Stakeholders / Decision Makers query
    if (qLower.includes('stakeholder') || qLower.includes('who') || qLower.includes('decision') || qLower.includes('buyer') || qLower.includes('champion')) {
      memoryNodes.filter(n => n.category === 'Stakeholder').forEach(n => {
        recalledMemories.push({
          nodeId: n.id,
          label: n.label,
          category: n.category,
          confidence: n.confidence,
          sourceSnippet: n.details
        });
      });

      let text = `Stakeholder Sentiment Breakdown for **${activeDeal.company}**:\n\n`;
      stakeholders.forEach((s, i) => {
        text += `• **${s.name}** (${s.title})\n  - **Role:** ${s.role} | **Sentiment:** ${s.sentiment}\n  - **Key Quote:** ${s.keyQuotes[0] || 'No quote'}\n\n`;
      });
      return { responseText: text, recalledMemories };
    }

    // 4. Pricing / Discounts query
    if (qLower.includes('price') || qLower.includes('discount') || qLower.includes('term') || qLower.includes('aws') || qLower.includes('cost')) {
      memoryNodes.filter(n => n.category === 'Pricing').forEach(n => {
        recalledMemories.push({
          nodeId: n.id,
          label: n.label,
          category: n.category,
          confidence: n.confidence,
          sourceSnippet: n.details
        });
      });

      const text = `**Pricing & Deal Terms Summary for ${activeDeal.company}**:\n\n` +
        `• **Target ARR:** $${(activeDeal.arr / 1000).toFixed(0)}k ARR\n` +
        `• **Procurement Stance:** David Sterling requested a 15% multi-year discount and AWS Marketplace routing.\n` +
        `• **Agreed Strategy:** Offer 12% discount in exchange for Net-30 payment terms and 2 customer case study commitments.\n` +
        `• **Channel:** AWS Private Offer routing approved.`;
      return { responseText: text, recalledMemories };
    }

    // 5. Default / Prep query
    memoryNodes.slice(0, 3).forEach(n => {
      recalledMemories.push({
        nodeId: n.id,
        label: n.label,
        category: n.category,
        confidence: n.confidence,
        sourceSnippet: n.details
      });
    });

    const defaultText = `I have analyzed the deal history for **${activeDeal.company}** ($${(activeDeal.arr / 1000).toFixed(0)}k ARR):\n\n` +
      `• **Deal Health:** ${activeDeal.healthScore}/100 (${activeDeal.healthStatus.toUpperCase()})\n` +
      `• **Key Focus:** Resolve Procurement discount terms with David Sterling ($12% Net-30 compromise) and finalize SOC2 security pack with CISO Priya Sharma.\n` +
      `• **Champion:** Sarah Lin (VP Platform Engineering) is actively advocating for deployment.\n\n` +
      `You can generate a full Pre-Meeting Briefing from the navigation bar or ask any specific questions!`;

    return { responseText: defaultText, recalledMemories };
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col glass-panel rounded-2xl border border-slate-800/80 overflow-hidden">
      {/* Assistant Header */}
      <div className="h-16 px-6 border-b border-slate-800/80 bg-slate-950 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-indigo-600/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              AI Deal Assistant
              <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.2 rounded font-mono">
                Hindsight Memory Connected
              </span>
            </h3>
            <p className="text-xs text-slate-400">Contextual answers generated from past meeting transcripts & notes</p>
          </div>
        </div>
      </div>

      {/* Messages Stream Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 max-w-3xl ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse space-x-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-900 border border-slate-800 text-purple-400'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div className="space-y-3">
              <div
                className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white font-medium shadow-lg shadow-indigo-600/10'
                    : 'bg-slate-900 border border-slate-800/80 text-slate-200'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div
                  className={`text-[10px] mt-2 font-mono ${
                    msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {/* Recalled Memories Drawer (Assistant Only) */}
              {msg.memoriesRecalled && msg.memoriesRecalled.length > 0 && (
                <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/40 space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                    <span>Hindsight Engine Recalled {msg.memoriesRecalled.length} Memory Chunks</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {msg.memoriesRecalled.map((mem, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px]">
                        <div className="flex items-center justify-between font-semibold text-slate-200">
                          <span className="truncate">{mem.label}</span>
                          <span className="text-[9px] text-emerald-400 font-mono">{mem.confidence}%</span>
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{mem.sourceSnippet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-purple-400">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
              <span>Querying Hindsight Persistent Memory Store...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-6 py-2 bg-slate-950/80 border-t border-slate-800/60 flex items-center space-x-2 overflow-x-auto">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Lightbulb className="w-3 h-3 text-amber-400" /> Prompts:
        </span>
        {promptPills.map((pill, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(pill)}
            className="text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-indigo-500/50 px-3 py-1 rounded-full transition-all shrink-0"
          >
            {pill}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-3"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            placeholder={`Ask DealMind anything about ${activeDeal.company}...`}
            className="flex-1 bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white p-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
