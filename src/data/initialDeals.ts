import { Deal, Interaction, Stakeholder, Competitor, Objection, ActionItem, MemoryNode, MemoryRelation } from '../types/deal';

export const INITIAL_DEALS: Deal[] = [
  {
    id: 'deal-acme-001',
    name: 'Enterprise SaaS Infrastructure Expansion',
    company: 'Acme Global Inc.',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80',
    arr: 480000,
    stage: 'Pricing & Legal',
    winProbability: 82,
    healthScore: 88,
    healthStatus: 'healthy',
    expectedCloseDate: '2026-10-15',
    owner: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'Enterprise Account Executive'
    },
    description: 'Migration of 40+ microservices to automated AI-driven observability and deal intelligence workflows across North America & EMEA.',
    tags: ['Multi-Year', 'AWS Marketplace', 'SOC2 Compliant', 'Enterprise AI'],
    lastActivity: '2 hours ago',
    memoryCount: 24
  },
  {
    id: 'deal-apex-002',
    name: 'Fraud Detection AI Platform Deployment',
    company: 'Apex Financial Services',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&h=120&q=80',
    arr: 750000,
    stage: 'Executive Review',
    winProbability: 60,
    healthScore: 58,
    healthStatus: 'risk',
    expectedCloseDate: '2026-11-01',
    owner: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'Senior Strategic Director'
    },
    description: 'Real-time transaction fraud decision engine powered by persistent graph neural networks and instant risk scoring.',
    tags: ['High ARR', 'Custom SLA', 'Competitive Trap', 'Sub-50ms Latency'],
    lastActivity: 'Yesterday',
    memoryCount: 31
  },
  {
    id: 'deal-health-003',
    name: 'EHR Workflow & AI Assistant Integration',
    company: 'HealthPlus Systems Network',
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=120&h=120&q=80',
    arr: 320000,
    stage: 'Evaluation',
    winProbability: 70,
    healthScore: 74,
    healthStatus: 'warning',
    expectedCloseDate: '2026-12-10',
    owner: {
      name: 'Marcus Brody',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'Healthcare Enterprise AE'
    },
    description: 'Automating clinical documentation, physician note digestion, and prior-authorization request processing across 12 regional hospitals.',
    tags: ['HIPAA Compliant', 'BAA Required', 'Epic Integration'],
    lastActivity: '3 days ago',
    memoryCount: 19
  }
];

export const INITIAL_STAKEHOLDERS: Record<string, Stakeholder[]> = {
  'deal-acme-001': [
    {
      id: 'sh-101',
      dealId: 'deal-acme-001',
      name: 'Marcus Vance',
      title: 'Chief Technology Officer',
      role: 'Economic Buyer',
      sentiment: 'Positive',
      influence: 'High',
      keyQuotes: [
        '"If the sub-100ms latency benchmarks hold up in production, I am ready to approve the master agreement."',
        '"We cannot afford downtime during Black Friday traffic spikes."'
      ],
      lastContactDate: '2026-09-24',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80'
    },
    {
      id: 'sh-102',
      dealId: 'deal-acme-001',
      name: 'Sarah Lin',
      title: 'VP of Platform Engineering',
      role: 'Champion',
      sentiment: 'Strong Support',
      influence: 'High',
      keyQuotes: [
        '"DealMind has already saved our team 8 hours a week during testing."',
        '"I am actively pushing Marcus to prioritize this line item for Q4 budget."'
      ],
      lastContactDate: '2026-09-26',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80'
    },
    {
      id: 'sh-103',
      dealId: 'deal-acme-001',
      name: 'David Sterling',
      title: 'Head of Global Procurement',
      role: 'Blocker',
      sentiment: 'Skeptical',
      influence: 'Medium',
      keyQuotes: [
        '"We require a minimum 15% multi-year discount and AWS Private Offer routing."',
        '"Your payment terms of Net-30 need to match our standard Net-60 corporate policy."'
      ],
      lastContactDate: '2026-09-22',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80'
    },
    {
      id: 'sh-104',
      dealId: 'deal-acme-001',
      name: 'Priya Sharma',
      title: 'Chief Information Security Officer',
      role: 'Technical Evaluator',
      sentiment: 'Neutral',
      influence: 'High',
      keyQuotes: [
        '"Pending the final SOC2 Type II audit report for the persistent memory store."',
        '"Zero data retention outside encrypted isolated tenancy is mandatory."'
      ],
      lastContactDate: '2026-09-20',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80'
    }
  ],
  'deal-apex-002': [
    {
      id: 'sh-201',
      dealId: 'deal-apex-002',
      name: 'Victoria Hastings',
      title: 'Chief Risk Officer',
      role: 'Economic Buyer',
      sentiment: 'Skeptical',
      influence: 'High',
      keyQuotes: [
        '"Palantir offered us $200k in free deployment credits. How does your TCO compare?"',
        '"We cannot compromise on sub-50ms latency under high fraud spikes."'
      ],
      lastContactDate: '2026-09-25',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80'
    },
    {
      id: 'sh-202',
      dealId: 'deal-apex-002',
      name: 'Jonathan Vance',
      title: 'VP of Financial AI Risk',
      role: 'Champion',
      sentiment: 'Positive',
      influence: 'Medium',
      keyQuotes: [
        '"Your persistent memory graph allows us to trace complex laundering networks 5x faster than Palantir."'
      ],
      lastContactDate: '2026-09-25',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80'
    },
    {
      id: 'sh-203',
      dealId: 'deal-apex-002',
      name: 'Counsel Robert Thorne',
      title: 'General Counsel & Risk Lead',
      role: 'Blocker',
      sentiment: 'Hostile',
      influence: 'High',
      keyQuotes: [
        '"Standard liability cap of 1x annual contract value is insufficient for banking breach risks."'
      ],
      lastContactDate: '2026-09-21',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120&q=80'
    }
  ]
};

export const INITIAL_COMPETITORS: Record<string, Competitor[]> = {
  'deal-acme-001': [
    {
      id: 'comp-101',
      dealId: 'deal-acme-001',
      name: 'Datadog Enterprise',
      threatLevel: 'Medium',
      positioningStrategy: 'Datadog is pushing their existing log analytics footprint to up-sell APM, but lacks persistent deal memory & AI context graph.',
      strengths: ['Existing contract with DevOps team', 'Unified dashboard for log metrics'],
      weaknesses: ['Extremely high egress cost', 'Stateless AI assistant lacks deal context', 'No real-time stakeholder sentiment tracking'],
      status: 'Active Evaluation'
    },
    {
      id: 'comp-102',
      dealId: 'deal-acme-001',
      name: 'Gong / Revenue AI',
      threatLevel: 'Low',
      positioningStrategy: 'Gong is evaluating call transcripts for sales coaching, but cannot integrate into Acme infrastructure operational telemetry.',
      strengths: ['Strong call recording brand'],
      weaknesses: ['No persistent memory architecture (Hindsight)', 'Cannot run on-premise / isolated cloud'],
      status: 'Ruled Out'
    }
  ],
  'deal-apex-002': [
    {
      id: 'comp-201',
      dealId: 'deal-apex-002',
      name: 'Palantir Foundry',
      threatLevel: 'High',
      positioningStrategy: 'Palantir is aggressively bundling $200k forward-deployed engineering credits to win Victoria Hastings.',
      strengths: ['Massive brand equity in government & banking', 'Forward deployed engineers on-site'],
      weaknesses: ['10x higher deployment cost after year 1', 'Complex proprietary ontology requiring dedicated headcount'],
      status: 'Primary Contender'
    }
  ]
};

export const INITIAL_OBJECTIONS: Record<string, Objection[]> = {
  'deal-acme-001': [
    {
      id: 'obj-101',
      dealId: 'deal-acme-001',
      category: 'Security',
      issue: 'Pending SOC2 Type II compliance audit report for persistent memory store.',
      counterStrategy: 'Provide interim ISO-27001 certificate & schedule deep security Q&A session with CISO Priya Sharma on Tuesday.',
      status: 'Mitigated',
      severity: 'Critical',
      raisedBy: 'Priya Sharma (CISO)'
    },
    {
      id: 'obj-102',
      dealId: 'deal-acme-001',
      category: 'Pricing',
      issue: 'Procurement demanding 15% discount for 3-year term & AWS Private Offer billing.',
      counterStrategy: 'Offer 12% discount in exchange for Net-30 payment terms and 2 customer case study commitments.',
      status: 'Open',
      severity: 'Moderate',
      raisedBy: 'David Sterling (Head of Procurement)'
    },
    {
      id: 'obj-103',
      dealId: 'deal-acme-001',
      category: 'Integration',
      issue: 'DevOps team requested zero-downtime microservice sidecar deployment proof.',
      counterStrategy: 'Conducted live benchmark test showing 0ms drop in throughput during failover test.',
      status: 'Resolved',
      severity: 'Minor',
      raisedBy: 'Sarah Lin (VP Engineering)'
    }
  ],
  'deal-apex-002': [
    {
      id: 'obj-201',
      dealId: 'deal-apex-002',
      category: 'Competitor',
      issue: 'Palantir offering $200k credits to lock out competition.',
      counterStrategy: 'Present 3-Year TCO analysis demonstrating DealMind saves $1.2M over Palantir by avoiding proprietary engineering lock-in.',
      status: 'Open',
      severity: 'Critical',
      raisedBy: 'Victoria Hastings (CRO)'
    },
    {
      id: 'obj-202',
      dealId: 'deal-apex-002',
      category: 'Security',
      issue: 'Legal demanding unlimited breach indemnity clause for bank transaction streams.',
      counterStrategy: 'Propose capped liability at 3x ACV backed by cyber insurance certificate.',
      status: 'Open',
      severity: 'Critical',
      raisedBy: 'Counsel Robert Thorne'
    }
  ]
};

export const INITIAL_INTERACTIONS: Record<string, Interaction[]> = {
  'deal-acme-001': [
    {
      id: 'int-101',
      dealId: 'deal-acme-001',
      title: 'Executive Alignment & Architecture Review',
      date: '2026-09-24',
      type: 'meeting',
      summary: 'Marcus Vance confirmed tech evaluation passed. Sarah Lin praised memory recall. Procurement raised pricing terms.',
      rawText: 'Marcus Vance (CTO): "We reviewed the technical report prepared by Sarah Lin. The persistent memory architecture is significantly faster than our previous stateless vector setup. However, our security team under Priya Sharma must complete the SOC2 audit before final sign-off." David Sterling from Procurement noted that they expect a 15% multi-year discount if we process the transaction via AWS Marketplace.',
      extractedFacts: [
        'Marcus Vance approves technical evaluation based on sub-100ms benchmarks',
        'Priya Sharma requires SOC2 Type II audit completion',
        'David Sterling demands 15% discount for 3-year commitment',
        'Transaction must route through AWS Marketplace'
      ],
      memoryNodesCreated: ['mem-101', 'mem-102', 'mem-103', 'mem-104'],
      participants: ['Marcus Vance', 'Sarah Lin', 'David Sterling', 'Alex Rivera']
    },
    {
      id: 'int-102',
      dealId: 'deal-acme-001',
      title: 'Procurement & Pricing Negotiation Call',
      date: '2026-09-22',
      type: 'pricing_call',
      summary: 'Discussed AWS Marketplace private offer terms, seat count flex clause, and Net-30 payment schedule.',
      rawText: 'David Sterling: "Our policy requires Net-60 unless there is a price incentive. If DealMind provides 12% discount on multi-year ARR, we can agree to Net-30 and co-marketing rights."',
      extractedFacts: [
        'David Sterling open to Net-30 with 12% discount',
        'Co-marketing & press release case study agreed in principle'
      ],
      memoryNodesCreated: ['mem-105', 'mem-106'],
      participants: ['David Sterling', 'Alex Rivera']
    },
    {
      id: 'int-103',
      dealId: 'deal-acme-001',
      title: 'Technical Proof of Concept Demo',
      date: '2026-09-15',
      type: 'demo',
      summary: 'Live stress test on 40 microservices with synthetic load peak. 0% packet loss.',
      rawText: 'Sarah Lin: "The zero-downtime sidecar integration passed our engineering team sprint goals with flying colors. We logged 99.999% uptime during load simulation."',
      extractedFacts: [
        'Zero-downtime sidecar validated by platform team',
        'Sarah Lin becomes key deal Champion'
      ],
      memoryNodesCreated: ['mem-107'],
      participants: ['Sarah Lin', 'Priya Sharma', 'Alex Rivera']
    }
  ]
};

export const INITIAL_ACTION_ITEMS: Record<string, ActionItem[]> = {
  'deal-acme-001': [
    {
      id: 'act-101',
      dealId: 'deal-acme-001',
      title: 'Send Interim ISO-27001 Security Pack to Priya Sharma',
      assignee: 'Alex Rivera',
      dueDate: '2026-09-28',
      status: 'Pending',
      priority: 'High',
      memorySourceId: 'mem-102'
    },
    {
      id: 'act-102',
      dealId: 'deal-acme-001',
      title: 'Draft AWS Private Offer with 12% discount & Net-30 terms',
      assignee: 'Alex Rivera',
      dueDate: '2026-09-29',
      status: 'In Progress',
      priority: 'High',
      memorySourceId: 'mem-103'
    },
    {
      id: 'act-103',
      dealId: 'deal-acme-001',
      title: 'Schedule Pre-Meeting Executive Sync with Sarah Lin',
      assignee: 'Alex Rivera',
      dueDate: '2026-09-30',
      status: 'Pending',
      priority: 'Medium',
      memorySourceId: 'mem-101'
    }
  ]
};

export const INITIAL_MEMORY_NODES: Record<string, MemoryNode[]> = {
  'deal-acme-001': [
    {
      id: 'mem-101',
      dealId: 'deal-acme-001',
      label: 'Sub-100ms Latency SLA',
      category: 'Requirement',
      confidence: 98,
      sourceInteractionId: 'int-101',
      timestamp: '2026-09-24',
      recallCount: 14,
      details: 'Marcus Vance mandates sub-100ms processing latency during high peak traffic loads.'
    },
    {
      id: 'mem-102',
      dealId: 'deal-acme-001',
      label: 'Pending SOC2 Audit Signoff',
      category: 'Objection',
      confidence: 95,
      sourceInteractionId: 'int-101',
      timestamp: '2026-09-24',
      recallCount: 19,
      details: 'CISO Priya Sharma will not approve legal contract without SOC2 Type II documentation.'
    },
    {
      id: 'mem-103',
      dealId: 'deal-acme-001',
      label: 'AWS Marketplace Private Offer',
      category: 'Pricing',
      confidence: 92,
      sourceInteractionId: 'int-101',
      timestamp: '2026-09-24',
      recallCount: 22,
      details: 'Procurement (David Sterling) requires deal execution via AWS Marketplace to utilize committed cloud spend.'
    },
    {
      id: 'mem-104',
      dealId: 'deal-acme-001',
      label: '12% Discount / Net-30 Compromise',
      category: 'Pricing',
      confidence: 89,
      sourceInteractionId: 'int-102',
      timestamp: '2026-09-22',
      recallCount: 11,
      details: 'Procurement will accept Net-30 payment terms if 12% multi-year discount is granted.'
    },
    {
      id: 'mem-105',
      dealId: 'deal-acme-001',
      label: 'Sarah Lin Platform Champion',
      category: 'Stakeholder',
      confidence: 99,
      sourceInteractionId: 'int-103',
      timestamp: '2026-09-15',
      recallCount: 16,
      details: 'Sarah Lin actively advocates for DealMind internal roll-out across all 40 engineering teams.'
    },
    {
      id: 'mem-106',
      dealId: 'deal-acme-001',
      label: 'Datadog Egress Cost Pushback',
      category: 'Competitor',
      confidence: 87,
      sourceInteractionId: 'int-101',
      timestamp: '2026-09-24',
      recallCount: 8,
      details: 'Acme management frustrated by Datadog bill spikes, creating window for DealMind expansion.'
    }
  ]
};

export const INITIAL_MEMORY_RELATIONS: Record<string, MemoryRelation[]> = {
  'deal-acme-001': [
    { id: 'rel-1', sourceId: 'mem-101', targetId: 'mem-105', label: 'validated by Champion', strength: 0.9 },
    { id: 'rel-2', sourceId: 'mem-102', targetId: 'mem-101', label: 'gates approval of', strength: 0.85 },
    { id: 'rel-3', sourceId: 'mem-103', targetId: 'mem-104', label: 'governs pricing terms', strength: 0.95 },
    { id: 'rel-4', sourceId: 'mem-106', targetId: 'mem-105', label: 'displaces legacy stack', strength: 0.75 }
  ]
};
