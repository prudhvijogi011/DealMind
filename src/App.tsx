import React, { useState } from 'react';
import { DealProvider, useDealContext } from './context/DealContext';
import { Navbar } from './components/Navbar';
import { Sidebar, NavTab } from './components/Sidebar';
import { PipelineDashboard } from './components/PipelineDashboard';
import { DealWorkspace } from './components/DealWorkspace';
import { MemoryNetworkView } from './components/MemoryNetworkView';
import { AIDealAssistant } from './components/AIDealAssistant';
import { PreMeetingBriefing } from './components/PreMeetingBriefing';
import { IngestTranscriptModal } from './components/IngestTranscriptModal';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('pipeline');
  const [isIngestModalOpen, setIsIngestModalOpen] = useState(false);
  const { memoryNodes } = useDealContext();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar onOpenIngestModal={() => setIsIngestModalOpen(true)} />

      {/* Main Content Layout with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          memoryCount={memoryNodes.length}
        />

        {/* Viewport Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeTab === 'pipeline' && (
            <PipelineDashboard setActiveTab={setActiveTab} />
          )}

          {activeTab === 'workspace' && (
            <DealWorkspace />
          )}

          {activeTab === 'memory' && (
            <MemoryNetworkView />
          )}

          {activeTab === 'assistant' && (
            <AIDealAssistant />
          )}

          {activeTab === 'briefing' && (
            <PreMeetingBriefing />
          )}

          {activeTab === 'ingest' && (
            <div className="space-y-6">
              <div className="text-center max-w-lg mx-auto py-12 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400">
                  <span className="text-2xl font-bold">⚡</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-100">Hindsight Ingestion Studio</h2>
                <p className="text-sm text-slate-400">
                  Ingest raw meeting transcripts, call notes, or email threads to automatically extract facts and connect Hindsight memory nodes.
                </p>
                <button
                  onClick={() => setIsIngestModalOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-indigo-600/25 transition-all"
                >
                  Launch Ingestion Wizard
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Ingest Modal Popup */}
      <IngestTranscriptModal
        isOpen={isIngestModalOpen}
        onClose={() => setIsIngestModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <DealProvider>
      <AppContent />
    </DealProvider>
  );
}
