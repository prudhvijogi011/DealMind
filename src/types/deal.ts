export type DealStage = 'Discovery' | 'Evaluation' | 'Pricing & Legal' | 'Executive Review' | 'Closed Won' | 'Closed Lost';
export type HealthStatus = 'healthy' | 'warning' | 'risk';

export interface Deal {
  id: string;
  name: string;
  company: string;
  logo: string;
  arr: number; // Annual Recurring Revenue in USD
  stage: DealStage;
  winProbability: number; // 0 - 100
  healthScore: number; // 0 - 100
  healthStatus: HealthStatus;
  expectedCloseDate: string;
  owner: {
    name: string;
    avatar: string;
    role: string;
  };
  description: string;
  tags: string[];
  lastActivity: string;
  memoryCount: number;
}

export interface Interaction {
  id: string;
  dealId: string;
  title: string;
  date: string;
  type: 'meeting' | 'email' | 'call' | 'pricing_call' | 'demo';
  summary: string;
  rawText: string;
  extractedFacts: string[];
  memoryNodesCreated: string[];
  participants: string[];
}

export interface Stakeholder {
  id: string;
  dealId: string;
  name: string;
  title: string;
  role: 'Economic Buyer' | 'Champion' | 'Blocker' | 'Technical Evaluator' | 'Procurement' | 'End User';
  sentiment: 'Strong Support' | 'Positive' | 'Neutral' | 'Skeptical' | 'Hostile';
  influence: 'High' | 'Medium' | 'Low';
  keyQuotes: string[];
  lastContactDate: string;
  avatar: string;
}

export interface Competitor {
  id: string;
  dealId: string;
  name: string;
  threatLevel: 'High' | 'Medium' | 'Low';
  positioningStrategy: string;
  strengths: string[];
  weaknesses: string[];
  status: 'Active Evaluation' | 'Ruled Out' | 'Primary Contender';
}

export interface Objection {
  id: string;
  dealId: string;
  category: 'Pricing' | 'Security' | 'Integration' | 'Timeline' | 'Feature Gap' | 'Competitor';
  issue: string;
  counterStrategy: string;
  status: 'Open' | 'Mitigated' | 'Resolved';
  severity: 'Critical' | 'Moderate' | 'Minor';
  raisedBy: string;
}

export interface ActionItem {
  id: string;
  dealId: string;
  title: string;
  assignee: string;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
  memorySourceId?: string;
}

export type MemoryCategory = 'Stakeholder' | 'Objection' | 'Competitor' | 'Pricing' | 'Requirement' | 'Commitment';

export interface MemoryNode {
  id: string;
  dealId: string;
  label: string;
  category: MemoryCategory;
  confidence: number; // 0 - 100
  sourceInteractionId: string;
  timestamp: string;
  recallCount: number;
  details: string;
}

export interface MemoryRelation {
  id: string;
  sourceId: string;
  targetId: string;
  label: string; // e.g. "raised objection", "evaluating competitor", "demands discount"
  strength: number; // 0.1 to 1.0
}

export interface Briefing {
  dealId: string;
  dealName: string;
  generatedAt: string;
  summary: string;
  attendeeAnalysis: {
    name: string;
    role: string;
    sentiment: string;
    focusArea: string;
  }[];
  keyObjectionsToAddress: {
    issue: string;
    counterStrategy: string;
    severity: string;
  }[];
  competitorAlerts: {
    name: string;
    threat: string;
    talkingPoint: string;
  }[];
  recommendedTalkingPoints: string[];
  pendingCommitmentsChecklist: {
    task: string;
    owner: string;
    due: string;
  }[];
  riskAlerts: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  memoriesRecalled?: {
    nodeId: string;
    label: string;
    category: string;
    confidence: number;
    sourceSnippet: string;
  }[];
}
