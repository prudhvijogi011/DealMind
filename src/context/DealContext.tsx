import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Deal,
  Interaction,
  Stakeholder,
  Competitor,
  Objection,
  ActionItem,
  MemoryNode,
  MemoryRelation
} from '../types/deal';
import {
  INITIAL_DEALS,
  INITIAL_STAKEHOLDERS,
  INITIAL_COMPETITORS,
  INITIAL_OBJECTIONS,
  INITIAL_INTERACTIONS,
  INITIAL_ACTION_ITEMS,
  INITIAL_MEMORY_NODES,
  INITIAL_MEMORY_RELATIONS
} from '../data/initialDeals';

interface DealContextType {
  deals: Deal[];
  activeDeal: Deal;
  activeDealId: string;
  setActiveDealId: (id: string) => void;
  stakeholders: Stakeholder[];
  competitors: Competitor[];
  objections: Objection[];
  interactions: Interaction[];
  actionItems: ActionItem[];
  memoryNodes: MemoryNode[];
  memoryRelations: MemoryRelation[];
  
  // Actions
  ingestMeetingTranscript: (
    title: string,
    type: Interaction['type'],
    rawText: string,
    participantsStr: string
  ) => { newFacts: string[]; newMemories: MemoryNode[] };
  
  addDeal: (dealData: Omit<Deal, 'id' | 'memoryCount' | 'lastActivity'>) => void;
  updateDeal: (id: string, updates: Partial<Deal>) => void;
  deleteDeal: (id: string) => void;
  addStakeholder: (stakeholder: Omit<Stakeholder, 'id' | 'dealId'>) => void;
  addCompetitor: (competitor: Omit<Competitor, 'id' | 'dealId'>) => void;
  addObjection: (objection: Omit<Objection, 'id' | 'dealId'>) => void;
  updateObjectionStatus: (id: string, status: Objection['status']) => void;
  toggleActionItem: (id: string) => void;
  addActionItem: (title: string, assignee: string, dueDate: string, priority: ActionItem['priority']) => void;
  resetDemoData: () => void;
}

const STORAGE_KEY = 'dealmind_intelligence_v1';

const DealContext = createContext<DealContextType | undefined>(undefined);

export const DealProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deals, setDeals] = useState<Deal[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_deals`);
    return saved ? JSON.parse(saved) : INITIAL_DEALS;
  });

  const [activeDealId, setActiveDealId] = useState<string>(deals[0]?.id || 'deal-acme-001');

  const [stakeholdersMap, setStakeholdersMap] = useState<Record<string, Stakeholder[]>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_stakeholders`);
    return saved ? JSON.parse(saved) : INITIAL_STAKEHOLDERS;
  });

  const [competitorsMap, setCompetitorsMap] = useState<Record<string, Competitor[]>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_competitors`);
    return saved ? JSON.parse(saved) : INITIAL_COMPETITORS;
  });

  const [objectionsMap, setObjectionsMap] = useState<Record<string, Objection[]>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_objections`);
    return saved ? JSON.parse(saved) : INITIAL_OBJECTIONS;
  });

  const [interactionsMap, setInteractionsMap] = useState<Record<string, Interaction[]>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_interactions`);
    return saved ? JSON.parse(saved) : INITIAL_INTERACTIONS;
  });

  const [actionItemsMap, setActionItemsMap] = useState<Record<string, ActionItem[]>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_actionItems`);
    return saved ? JSON.parse(saved) : INITIAL_ACTION_ITEMS;
  });

  const [memoryNodesMap, setMemoryNodesMap] = useState<Record<string, MemoryNode[]>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_memoryNodes`);
    return saved ? JSON.parse(saved) : INITIAL_MEMORY_NODES;
  });

  const [memoryRelationsMap, setMemoryRelationsMap] = useState<Record<string, MemoryRelation[]>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_memoryRelations`);
    return saved ? JSON.parse(saved) : INITIAL_MEMORY_RELATIONS;
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_deals`, JSON.stringify(deals));
    localStorage.setItem(`${STORAGE_KEY}_stakeholders`, JSON.stringify(stakeholdersMap));
    localStorage.setItem(`${STORAGE_KEY}_competitors`, JSON.stringify(competitorsMap));
    localStorage.setItem(`${STORAGE_KEY}_objections`, JSON.stringify(objectionsMap));
    localStorage.setItem(`${STORAGE_KEY}_interactions`, JSON.stringify(interactionsMap));
    localStorage.setItem(`${STORAGE_KEY}_actionItems`, JSON.stringify(actionItemsMap));
    localStorage.setItem(`${STORAGE_KEY}_memoryNodes`, JSON.stringify(memoryNodesMap));
    localStorage.setItem(`${STORAGE_KEY}_memoryRelations`, JSON.stringify(memoryRelationsMap));
  }, [deals, stakeholdersMap, competitorsMap, objectionsMap, interactionsMap, actionItemsMap, memoryNodesMap, memoryRelationsMap]);

  const activeDeal = deals.find(d => d.id === activeDealId) || deals[0];
  const stakeholders = stakeholdersMap[activeDealId] || [];
  const competitors = competitorsMap[activeDealId] || [];
  const objections = objectionsMap[activeDealId] || [];
  const interactions = interactionsMap[activeDealId] || [];
  const actionItems = actionItemsMap[activeDealId] || [];
  const memoryNodes = memoryNodesMap[activeDealId] || [];
  const memoryRelations = memoryRelationsMap[activeDealId] || [];

  // Simulated Hindsight NLP Ingestion Engine
  const ingestMeetingTranscript = (
    title: string,
    type: Interaction['type'],
    rawText: string,
    participantsStr: string
  ) => {
    const interactionId = `int-${Date.now().toString().slice(-4)}`;
    const participants = participantsStr.split(',').map(s => s.trim()).filter(Boolean);

    // Dynamic NLP fact & memory extraction logic based on transcript content keywords
    const lower = rawText.toLowerCase();
    const extractedFacts: string[] = [];
    const newMemories: MemoryNode[] = [];

    // Fact extraction rules
    if (lower.includes('price') || lower.includes('cost') || lower.includes('discount') || lower.includes('budget') || lower.includes('$')) {
      const fact = 'Pricing discussion logged: budget limits and discount requirements identified.';
      extractedFacts.push(fact);
      newMemories.push({
        id: `mem-${Date.now()}-1`,
        dealId: activeDealId,
        label: 'Pricing Term Requirement',
        category: 'Pricing',
        confidence: 94,
        sourceInteractionId: interactionId,
        timestamp: new Date().toISOString().split('T')[0],
        recallCount: 1,
        details: 'Extracted pricing constraint from recent interaction.'
      });
    }

    if (lower.includes('security') || lower.includes('soc2') || lower.includes('hipaa') || lower.includes('compliance') || lower.includes('audit')) {
      const fact = 'Security & Compliance requirement flagged from stakeholder interaction.';
      extractedFacts.push(fact);
      newMemories.push({
        id: `mem-${Date.now()}-2`,
        dealId: activeDealId,
        label: 'Security & Audit Gate',
        category: 'Objection',
        confidence: 96,
        sourceInteractionId: interactionId,
        timestamp: new Date().toISOString().split('T')[0],
        recallCount: 1,
        details: 'Mandatory security evaluation checkpoint registered in Hindsight memory store.'
      });
    }

    if (lower.includes('competitor') || lower.includes('datadog') || lower.includes('palantir') || lower.includes('salesforce') || lower.includes('gong')) {
      const fact = 'Competitor intelligence detected in transcript.';
      extractedFacts.push(fact);
      newMemories.push({
        id: `mem-${Date.now()}-3`,
        dealId: activeDealId,
        label: 'Competitor Counter-Strategy',
        category: 'Competitor',
        confidence: 91,
        sourceInteractionId: interactionId,
        timestamp: new Date().toISOString().split('T')[0],
        recallCount: 1,
        details: 'Competitor battlecard points linked to deal knowledge graph.'
      });
    }

    // Default fact if non-specific text
    if (extractedFacts.length === 0) {
      extractedFacts.push('General alignment on project timeline and action items.');
      newMemories.push({
        id: `mem-${Date.now()}-def`,
        dealId: activeDealId,
        label: `${title} Alignment`,
        category: 'Requirement',
        confidence: 88,
        sourceInteractionId: interactionId,
        timestamp: new Date().toISOString().split('T')[0],
        recallCount: 1,
        details: 'Key sync points recorded.'
      });
    }

    const newInteraction: Interaction = {
      id: interactionId,
      dealId: activeDealId,
      title,
      date: new Date().toISOString().split('T')[0],
      type,
      summary: `${title} - Ingested ${rawText.slice(0, 120)}...`,
      rawText,
      extractedFacts,
      memoryNodesCreated: newMemories.map(m => m.id),
      participants: participants.length > 0 ? participants : ['Account Executive', 'Key Stakeholders']
    };

    // Update state
    setInteractionsMap(prev => ({
      ...prev,
      [activeDealId]: [newInteraction, ...(prev[activeDealId] || [])]
    }));

    setMemoryNodesMap(prev => ({
      ...prev,
      [activeDealId]: [...(prev[activeDealId] || []), ...newMemories]
    }));

    // Update Deal memory count and last activity
    setDeals(prevDeals =>
      prevDeals.map(d => {
        if (d.id === activeDealId) {
          return {
            ...d,
            memoryCount: d.memoryCount + newMemories.length,
            lastActivity: 'Just now'
          };
        }
        return d;
      })
    );

    return { newFacts: extractedFacts, newMemories };
  };

  const addDeal = (dealData: Omit<Deal, 'id' | 'memoryCount' | 'lastActivity'>) => {
    const newDealId = `deal-${Date.now().toString().slice(-4)}`;
    const newDeal: Deal = {
      ...dealData,
      id: newDealId,
      memoryCount: 0,
      lastActivity: 'Just created'
    };
    setDeals(prev => [newDeal, ...prev]);
    setActiveDealId(newDealId);
  };

  const updateDeal = (id: string, updates: Partial<Deal>) => {
    setDeals(prev =>
      prev.map(d => (d.id === id ? { ...d, ...updates } : d))
    );
  };

  const deleteDeal = (id: string) => {
    setDeals(prev => {
      const remaining = prev.filter(d => d.id !== id);
      if (remaining.length > 0 && activeDealId === id) {
        setActiveDealId(remaining[0].id);
      }
      return remaining;
    });
  };

  const addStakeholder = (stakeholderData: Omit<Stakeholder, 'id' | 'dealId'>) => {
    const newStakeholder: Stakeholder = {
      ...stakeholderData,
      id: `stk-${Date.now()}`,
      dealId: activeDealId
    };
    setStakeholdersMap(prev => ({
      ...prev,
      [activeDealId]: [...(prev[activeDealId] || []), newStakeholder]
    }));
  };

  const addCompetitor = (competitorData: Omit<Competitor, 'id' | 'dealId'>) => {
    const newCompetitor: Competitor = {
      ...competitorData,
      id: `comp-${Date.now()}`,
      dealId: activeDealId
    };
    setCompetitorsMap(prev => ({
      ...prev,
      [activeDealId]: [...(prev[activeDealId] || []), newCompetitor]
    }));
  };

  const addObjection = (objectionData: Omit<Objection, 'id' | 'dealId'>) => {
    const newObj: Objection = {
      ...objectionData,
      id: `obj-${Date.now()}`,
      dealId: activeDealId
    };
    setObjectionsMap(prev => ({
      ...prev,
      [activeDealId]: [newObj, ...(prev[activeDealId] || [])]
    }));
  };

  const updateObjectionStatus = (id: string, status: Objection['status']) => {
    setObjectionsMap(prev => ({
      ...prev,
      [activeDealId]: (prev[activeDealId] || []).map(o => (o.id === id ? { ...o, status } : o))
    }));
  };

  const toggleActionItem = (id: string) => {
    setActionItemsMap(prev => ({
      ...prev,
      [activeDealId]: (prev[activeDealId] || []).map(a =>
        a.id === id
          ? { ...a, status: a.status === 'Completed' ? 'Pending' : 'Completed' }
          : a
      )
    }));
  };

  const addActionItem = (title: string, assignee: string, dueDate: string, priority: ActionItem['priority']) => {
    const newItem: ActionItem = {
      id: `act-${Date.now()}`,
      dealId: activeDealId,
      title,
      assignee,
      dueDate,
      status: 'Pending',
      priority
    };
    setActionItemsMap(prev => ({
      ...prev,
      [activeDealId]: [...(prev[activeDealId] || []), newItem]
    }));
  };

  const resetDemoData = () => {
    localStorage.clear();
    setDeals(INITIAL_DEALS);
    setActiveDealId(INITIAL_DEALS[0].id);
    setStakeholdersMap(INITIAL_STAKEHOLDERS);
    setCompetitorsMap(INITIAL_COMPETITORS);
    setObjectionsMap(INITIAL_OBJECTIONS);
    setInteractionsMap(INITIAL_INTERACTIONS);
    setActionItemsMap(INITIAL_ACTION_ITEMS);
    setMemoryNodesMap(INITIAL_MEMORY_NODES);
    setMemoryRelationsMap(INITIAL_MEMORY_RELATIONS);
  };

  return (
    <DealContext.Provider
      value={{
        deals,
        activeDeal,
        activeDealId,
        setActiveDealId,
        stakeholders,
        competitors,
        objections,
        interactions,
        actionItems,
        memoryNodes,
        memoryRelations,
        ingestMeetingTranscript,
        addDeal,
        updateDeal,
        deleteDeal,
        addStakeholder,
        addCompetitor,
        addObjection,
        updateObjectionStatus,
        toggleActionItem,
        addActionItem,
        resetDemoData
      }}
    >
      {children}
    </DealContext.Provider>
  );
};

export const useDealContext = () => {
  const context = useContext(DealContext);
  if (!context) {
    throw new Error('useDealContext must be used within a DealProvider');
  }
  return context;
};
