export interface CaseStudy {
  c: string; // customer
  h: string; // headline
  m: string[]; // metrics
  q: string | null; // quote
}

export interface PillarData {
  g: string; // Solution Group
  p: string; // Pillar Page Name
  s: string; // Internal Owner (SPOC)
  sec: string[]; // Sections under this pillar
  pl: string[]; // Platforms in this group
  a: string[]; // Assessments to feature
  k: string[]; // Target keywords
  cs: CaseStudy[]; // Matched case studies
}

export type PrimaryAudience = 
  | 'CIO/CTO'
  | 'CISO'
  | 'IT manager'
  | 'mixed CxO and IT leadership';

export type CompanySize = 
  | 'SMB'
  | 'mid-market'
  | 'enterprise'
  | 'all sizes';

export interface PromptConfig {
  pillarName: string;
  solutionGroup: string;
  internalOwner: string;
  sections: string[];
  platforms: string[];
  assessments: string[];
  targetKeywords: string[];
  primaryAudience: PrimaryAudience;
  companySize: CompanySize;
  emphasiseAngle: string;
  matchedCaseStudies: CaseStudy[];
  siblingPillars: string[];
  researchBriefText?: string;
  includeSearchGrounding?: boolean;
}

export interface ResearchInsight {
  query: string;
  summary: string;
  rankingThemes: string[];
  competitorGaps: string[];
  searchSources: { title: string; uri: string }[];
  rawText?: string;
  isQuotaLimited?: boolean;
}

export interface RuleViolation {
  rule: string;
  severity: 'error' | 'warning';
  description: string;
  count: number;
  matches?: string[];
}

export interface AuditReport {
  passed: boolean;
  score: number; // 0 - 100
  wordCount: number;
  h1Count: number;
  h1Text?: string;
  violations: RuleViolation[];
  sectionChecklist: { name: string; found: boolean }[];
  stats: {
    hasNoEmDash: boolean;
    hasNoEnDash: boolean;
    hasProperBrandName: boolean;
    hasValidMicrosoftPartner: boolean;
    hasNoPricing: boolean;
    hasIndianSpelling: boolean;
  };
}

export interface GenerationResult {
  landingCopy?: string;
  seoNotes?: string;
  designerNotes?: string;
  research?: ResearchInsight;
  timestamp: string;
}

export interface SeoCheckItem {
  name: string;
  category: 'technical' | 'content' | 'ai_geo' | 'schema' | 'entities';
  status: 'pass' | 'warning' | 'fail';
  score: number;
  maxScore: number;
  detail: string;
  recommendation?: string;
}

export interface KeywordAnalysis {
  keyword: string;
  count: number;
  density: number; // percentage e.g. 1.2%
  inH1: boolean;
  inH2: boolean;
  inFirst100Words: boolean;
  inFaq: boolean;
  status: 'optimal' | 'low' | 'high';
}

export interface SeoAuditScore {
  traditionalScore: number; // 0 - 100
  aiSeoScore: number; // 0 - 100 (Generative Engine Optimization / GEO)
  overallScore: number; // 0 - 100
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  wordCount: number;
  targetWordCountMin: number;
  targetWordCountMax: number;
  readingTimeMinutes: number;
  readingEaseScore: number; // Flesch Reading Ease approx 0 - 100
  keywords: KeywordAnalysis[];
  schemaValidation: {
    hasServiceSchema: boolean;
    hasFaqSchema: boolean;
    hasBreadcrumbSchema: boolean;
    hasValidJson: boolean;
  };
  checks: SeoCheckItem[];
  topRecommendations: string[];
}

export interface ChildClusterArticle {
  title: string;
  slug: string;
  intent: 'Informational' | 'Commercial' | 'Comparative';
  funnelStage: 'TOFU' | 'MOFU' | 'BOFU';
  targetKeyword: string;
  inboundAnchorText: string;
  description: string;
}

export interface TopicClusterData {
  pillarTitle: string;
  solutionGroup: string;
  parentUrl: string;
  pillarUrl: string;
  siblingPillars: { name: string; url: string; recommendedAnchor: string }[];
  childArticles: ChildClusterArticle[];
  schemaBreadcrumb: { name: string; item: string }[];
}

export interface LeadGenStrategyData {
  assessmentName: string;
  leadMagnetTitle: string;
  valueProposition: string;
  targetDeliverables: string[];
  formFields: { label: string; name: string; type: string; required: boolean; placeholder?: string; options?: string[] }[];
  autoresponderEmail: {
    subject: string;
    preheader: string;
    bodyMarkdown: string;
  };
  salesDiscoveryQuestions: string[];
}

