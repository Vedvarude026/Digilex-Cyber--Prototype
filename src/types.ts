export type ActiveTab = 
  | 'overview'
  | 'risk-intelligence'
  | 'assets'
  | 'vulnerabilities'
  | 'threat-intel'
  | 'remediation'
  | 'fund-optimizer'
  | 'what-if'
  | 'forecasting'
  | 'compliance'
  | 'audit-trail'
  | 'reports'
  | 'copilot'
  | 'settings';

export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface Asset {
  id: string;
  name: string;
  type: string;
  ipAddress: string;
  environment: 'Production' | 'Staging' | 'Development' | 'Corporate Network';
  criticality: RiskLevel;
  owner: string;
  dataClassification: 'PCI-DSS' | 'PII/Sensitive' | 'Confidential' | 'Internal Use' | 'Restricted Financial';
  vulnerabilitiesCount: number;
  eal: number; // in INR Raw (e.g., 19200000 = 1.92 Cr)
  assetValue: number; // Estimated value in INR
}

export interface Vulnerability {
  cveId: string;
  assetId: string;
  assetName: string;
  cvssScore: number;
  cvssSeverity: RiskLevel;
  exploitStatus: 'ACTIVE' | 'PROOF_OF_CONCEPT' | 'UNPROVEN' | 'WEAPONIZED';
  knownExploited: boolean;
  patchAvailable: boolean;
  isCloudAsset: boolean;
  isInternetFacing: boolean;
  eal: number; // Expected Annual Loss in INR
  remediationCost: number; // Cost to patch/mitigate in INR
  rosi: number; // Return on Security Investment (e.g., 28.4x)
  priority: 'Fix Immediately' | 'High Priority' | 'Recommended' | 'Monitor';
  description: string;
  discoveredDate: string;
}

export interface TopRiskPriority {
  rank: number;
  assetName: string;
  cveId: string;
  cvssScore: number;
  likelihood: 'High' | 'Medium' | 'Critical';
  eal: number;
  remediationCost: number;
  rosi: number;
  action: string;
  trend30d?: {
    value: string;
    isIncrease: boolean;
    isNegativeImpact: boolean;
  };
}

export interface OptimizationItem {
  id: string;
  action: string;
  assetName: string;
  cveId?: string;
  cost: number;
  riskReduction: number;
  rosi: number;
  priority: 'Fix First' | 'High Priority' | 'Recommended' | 'Lower Priority';
  category: 'Patching' | 'Access Control' | 'Monitoring' | 'Endpoint' | 'Cloud';
  defaultSelected: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  object: string;
  previousState: string;
  newState: string;
  eventHash: string;
  status: 'Verified' | 'Pending';
}

export interface ComplianceControl {
  id: string;
  finding: string;
  controlGap: string;
  iso27001: string;
  nistCsf: string;
  certIn: string;
  status: 'Needs Attention' | 'Compliant' | 'In Progress' | 'Non-Compliant';
  riskLevel: RiskLevel;
}

export interface ThreatFeedItem {
  id: string;
  title: string;
  severity: RiskLevel;
  description: string;
  affectedAssetsCount: number;
  potentialEal: number;
  threatType: 'Active Exploit' | 'Zero-Day' | 'Ransomware Campaign' | 'Credential Leak';
  targetSectors: string[];
  dateAdded: string;
}

export interface ReportTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  lastGenerated: string;
  status: 'Ready' | 'Generating' | 'Scheduled';
  size: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  codeSnippet?: string;
  recommendations?: string[];
  ealImpact?: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  eventType: string;
  actionSummary: string;
  details: string;
  cryptographicHash: string;
}
