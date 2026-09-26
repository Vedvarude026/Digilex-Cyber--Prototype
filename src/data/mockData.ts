import {
  Asset,
  Vulnerability,
  TopRiskPriority,
  OptimizationItem,
  AuditLog,
  AuditEvent,
  ComplianceControl,
  ThreatFeedItem,
  ReportTemplate,
  ChatMessage
} from '../types';

export const ORG_INFO = {
  name: 'Acme Financial Services',
  industry: 'Financial Services & Digital Payments',
  lastCalculation: '08 Sep 2026, 21:42 IST',
  totalEal: 48200000, // ₹4.82 Cr
  ealTrendMonth: 8.4, // +8.4%
  optimizableRisk: 27600000, // ₹2.76 Cr
  currentBudget: 5000000, // ₹50.00 L
  potentialReduction: 18400000, // ₹1.84 Cr
  totalAssets: 54,
  totalVulnerabilities: 247,
  criticalVulns: 12,
  highVulns: 46,
  mediumVulns: 103,
  lowVulns: 86
};

export const SECTOR_RISK_DATA = [
  { sector: 'Payments', eal: 21000000, label: '₹2.10 Cr', percentage: 43.5, color: '#f43f5e' },
  { sector: 'Customer Data', eal: 12500000, label: '₹1.25 Cr', percentage: 25.9, color: '#f97316' },
  { sector: 'Cloud Infra', eal: 8200000, label: '₹82.00 L', percentage: 17.0, color: '#06b6d4' },
  { sector: 'Internal Ops', eal: 4000000, label: '₹40.00 L', percentage: 8.3, color: '#3b82f6' },
  { sector: 'Endpoints', eal: 1500000, label: '₹15.00 L', percentage: 3.1, color: '#10b981' },
  { sector: 'Dev Systems', eal: 1000000, label: '₹10.00 L', percentage: 2.2, color: '#8b5cf6' },
];

export const FORECAST_TRAJECTORY_DATA = [
  { stage: 'Today', unpatched: 48200000, optimized: 48200000, labelUnpatched: '₹4.82 Cr', labelOptimized: '₹4.82 Cr' },
  { stage: '30 Days', unpatched: 51200000, optimized: 40100000, labelUnpatched: '₹5.12 Cr', labelOptimized: '₹4.01 Cr' },
  { stage: '60 Days', unpatched: 57400000, optimized: 34800000, labelUnpatched: '₹5.74 Cr', labelOptimized: '₹3.48 Cr' },
  { stage: '90 Days', unpatched: 64500000, optimized: 29100000, labelUnpatched: '₹6.45 Cr', labelOptimized: '₹2.91 Cr' },
];

export const TOP_RISK_PRIORITIES: TopRiskPriority[] = [
  {
    rank: 1,
    assetName: 'Payment Gateway Server (PAY-GW-PROD-01)',
    cveId: 'CVE-2026-48291',
    cvssScore: 9.8,
    likelihood: 'Critical',
    eal: 19200000, // ₹1.92 Cr
    remediationCost: 500000, // ₹5.00 L
    rosi: 28.4,
    action: 'Patch Immediately',
    trend30d: { value: '+5.2%', isIncrease: true, isNegativeImpact: true }
  },
  {
    rank: 2,
    assetName: 'Customer Database (CUSTOMER-DB-01)',
    cveId: 'CVE-2026-39182',
    cvssScore: 9.1,
    likelihood: 'High',
    eal: 12100000, // ₹1.21 Cr
    remediationCost: 350000, // ₹3.50 L
    rosi: 21.7,
    action: 'Patch + MFA',
    trend30d: { value: '+3.8%', isIncrease: true, isNegativeImpact: true }
  },
  {
    rank: 3,
    assetName: 'AWS Production Cluster (AWS-PROD-01)',
    cveId: 'CVE-2026-11842',
    cvssScore: 8.7,
    likelihood: 'Medium',
    eal: 8200000, // ₹82.00 L
    remediationCost: 200000, // ₹2.00 L
    rosi: 18.2,
    action: 'Restrict Access',
    trend30d: { value: '-2.4%', isIncrease: false, isNegativeImpact: false }
  },
  {
    rank: 4,
    assetName: 'Core Banking API Gateway (CORE-BANK-GW)',
    cveId: 'CVE-2026-50122',
    cvssScore: 8.5,
    likelihood: 'High',
    eal: 4500000, // ₹45.00 L
    remediationCost: 400000, // ₹4.00 L
    rosi: 11.2,
    action: 'Patch & Rate Limit',
    trend30d: { value: '+1.9%', isIncrease: true, isNegativeImpact: true }
  },
  {
    rank: 5,
    assetName: 'SWIFT Middleware Server (SWIFT-MW-01)',
    cveId: 'CVE-2026-28103',
    cvssScore: 8.2,
    likelihood: 'Medium',
    eal: 2800000, // ₹28.00 L
    remediationCost: 300000, // ₹3.00 L
    rosi: 9.3,
    action: 'Network Segmentation',
    trend30d: { value: '-4.1%', isIncrease: false, isNegativeImpact: false }
  }
];

export const MOCK_ASSETS: Asset[] = [
  {
    id: 'PAY-GW-PROD-01',
    name: 'PAY-GW-PROD-01',
    type: 'Production Payment Server',
    ipAddress: '10.0.12.45',
    environment: 'Production',
    criticality: 'CRITICAL',
    owner: 'Payments Infra Team',
    dataClassification: 'PCI-DSS',
    vulnerabilitiesCount: 12,
    eal: 19200000,
    assetValue: 150000000
  },
  {
    id: 'CUSTOMER-DB-01',
    name: 'CUSTOMER-DB-01',
    type: 'Core PostgreSQL Database',
    ipAddress: '10.0.21.14',
    environment: 'Production',
    criticality: 'CRITICAL',
    owner: 'Data Engineering',
    dataClassification: 'PII/Sensitive',
    vulnerabilitiesCount: 8,
    eal: 12100000,
    assetValue: 120000000
  },
  {
    id: 'AWS-PROD-01',
    name: 'AWS Production Cluster',
    ipAddress: '10.0.88.100',
    type: 'Cloud Kubernetes Cluster',
    environment: 'Production',
    criticality: 'CRITICAL',
    owner: 'Cloud DevOps',
    dataClassification: 'Restricted Financial',
    vulnerabilitiesCount: 15,
    eal: 8200000,
    assetValue: 80000000
  },
  {
    id: 'CORE-BANK-GW',
    name: 'CORE-BANK-GW-02',
    type: 'REST API Gateway',
    ipAddress: '10.0.12.90',
    environment: 'Production',
    criticality: 'HIGH',
    owner: 'Core Banking Engineering',
    dataClassification: 'Restricted Financial',
    vulnerabilitiesCount: 6,
    eal: 4500000,
    assetValue: 50000000
  },
  {
    id: 'SWIFT-MW-01',
    name: 'SWIFT-MW-01',
    type: 'SWIFT Financial Broker',
    ipAddress: '10.0.15.22',
    environment: 'Production',
    criticality: 'HIGH',
    owner: 'Treasury Systems',
    dataClassification: 'PCI-DSS',
    vulnerabilitiesCount: 5,
    eal: 2800000,
    assetValue: 60000000
  },
  {
    id: 'IAM-AUTH-PROD',
    name: 'IAM-AUTH-PROD-01',
    type: 'Active Directory / Okta Sync',
    ipAddress: '10.0.4.10',
    environment: 'Production',
    criticality: 'HIGH',
    owner: 'Identity & Access Team',
    dataClassification: 'Confidential',
    vulnerabilitiesCount: 4,
    eal: 1800000,
    assetValue: 35000000
  },
  {
    id: 'DEV-LAPTOP-042',
    name: 'DEV-LAPTOP-042',
    type: 'Corporate Endpoint',
    ipAddress: '10.0.45.92',
    environment: 'Corporate Network',
    criticality: 'LOW',
    owner: 'Frontend Dev Team',
    dataClassification: 'Internal Use',
    vulnerabilitiesCount: 3,
    eal: 280000,
    assetValue: 200000
  },
  {
    id: 'STG-K8S-APP-01',
    name: 'STG-K8S-APP-01',
    type: 'Staging Cluster',
    ipAddress: '10.0.90.12',
    environment: 'Staging',
    criticality: 'MEDIUM',
    owner: 'QA Engineering',
    dataClassification: 'Internal Use',
    vulnerabilitiesCount: 9,
    eal: 650000,
    assetValue: 5000000
  },
  {
    id: 'REDIS-CACHE-01',
    name: 'REDIS-CACHE-PROD-01',
    type: 'In-Memory Cache Cluster',
    ipAddress: '10.0.22.88',
    environment: 'Production',
    criticality: 'HIGH',
    owner: 'Performance Engineering',
    dataClassification: 'PCI-DSS',
    vulnerabilitiesCount: 4,
    eal: 1750000,
    assetValue: 25000000
  },
  {
    id: 'KAFKA-MQ-01',
    name: 'KAFKA-STREAM-01',
    type: 'Event Streaming Message Bus',
    ipAddress: '10.0.30.15',
    environment: 'Production',
    criticality: 'CRITICAL',
    owner: 'Core Messaging',
    dataClassification: 'Restricted Financial',
    vulnerabilitiesCount: 7,
    eal: 5100000,
    assetValue: 65000000
  },
  {
    id: 'CORP-VPN-GW',
    name: 'CORP-VPN-GW-01',
    type: 'Enterprise Remote Access VPN',
    ipAddress: '198.51.100.4',
    environment: 'Corporate Network',
    criticality: 'HIGH',
    owner: 'SecOps Network',
    dataClassification: 'Confidential',
    vulnerabilitiesCount: 6,
    eal: 2900000,
    assetValue: 18000000
  },
  {
    id: 'ELK-LOG-SEARCH',
    name: 'ELK-SEARCH-PROD-02',
    type: 'Elasticsearch Telemetry Node',
    ipAddress: '10.0.50.41',
    environment: 'Production',
    criticality: 'MEDIUM',
    owner: 'SOC & Analytics',
    dataClassification: 'Internal Use',
    vulnerabilitiesCount: 5,
    eal: 890000,
    assetValue: 12000000
  },
  {
    id: 'ANALYTICS-DB-01',
    name: 'ANALYTICS-DW-01',
    type: 'Snowflake Analytics Connector',
    ipAddress: '10.0.60.11',
    environment: 'Production',
    criticality: 'MEDIUM',
    owner: 'BI Team',
    dataClassification: 'Confidential',
    vulnerabilitiesCount: 3,
    eal: 720000,
    assetValue: 15000000
  },
  {
    id: 'STG-PAYMENT-01',
    name: 'STG-PAY-SETTLE-01',
    type: 'Staging Payment Gateway',
    ipAddress: '10.0.91.44',
    environment: 'Staging',
    criticality: 'MEDIUM',
    owner: 'Payments QA',
    dataClassification: 'Internal Use',
    vulnerabilitiesCount: 8,
    eal: 420000,
    assetValue: 4000000
  },
  {
    id: 'BUILD-CI-RUNNER-01',
    name: 'JENKINS-WORKER-04',
    type: 'CI/CD Build Slave',
    ipAddress: '10.0.70.19',
    environment: 'Corporate Network',
    criticality: 'LOW',
    owner: 'DevOps Enablement',
    dataClassification: 'Internal Use',
    vulnerabilitiesCount: 11,
    eal: 310000,
    assetValue: 800000
  },
  {
    id: 'EXCHANGE-[#1]',
    name: 'MAIL-EXCHANGE-01',
    type: 'Microsoft Exchange Server',
    ipAddress: '10.0.5.20',
    environment: 'Corporate Network',
    criticality: 'HIGH',
    owner: 'IT Infrastructure',
    dataClassification: 'Confidential',
    vulnerabilitiesCount: 7,
    eal: 2100000,
    assetValue: 22000000
  },
  {
    id: 'BIOMETRIC-GATE-01',
    name: 'BIOMETRIC-ACCESS-01',
    type: 'Physical Access Controller',
    ipAddress: '10.0.99.5',
    environment: 'Corporate Network',
    criticality: 'LOW',
    owner: 'Facilities & Safety',
    dataClassification: 'Internal Use',
    vulnerabilitiesCount: 2,
    eal: 120000,
    assetValue: 300000
  }
];

export const MOCK_VULNERABILITIES: Vulnerability[] = [
  {
    cveId: 'CVE-2026-48291',
    assetId: 'PAY-GW-PROD-01',
    assetName: 'PAY-GW-PROD-01 (Payment Gateway)',
    cvssScore: 9.8,
    cvssSeverity: 'CRITICAL',
    exploitStatus: 'ACTIVE',
    knownExploited: true,
    patchAvailable: true,
    isCloudAsset: false,
    isInternetFacing: true,
    eal: 19200000,
    remediationCost: 500000,
    rosi: 28.4,
    priority: 'Fix Immediately',
    description: 'Unauthenticated Remote Code Execution in Payment Protocol Handler via Buffer Overflow.',
    discoveredDate: '2026-08-14'
  },
  {
    cveId: 'CVE-2026-39182',
    assetId: 'CUSTOMER-DB-01',
    assetName: 'CUSTOMER-DB-01 (Database)',
    cvssScore: 9.1,
    cvssSeverity: 'CRITICAL',
    exploitStatus: 'WEAPONIZED',
    knownExploited: true,
    patchAvailable: true,
    isCloudAsset: true,
    isInternetFacing: false,
    eal: 12100000,
    remediationCost: 350000,
    rosi: 21.7,
    priority: 'Fix Immediately',
    description: 'SQL Injection leading to arbitrary data exfiltration and database privilege escalation.',
    discoveredDate: '2026-08-20'
  },
  {
    cveId: 'CVE-2026-11842',
    assetId: 'AWS-PROD-01',
    assetName: 'AWS Production Cluster',
    cvssScore: 8.7,
    cvssSeverity: 'HIGH',
    exploitStatus: 'ACTIVE',
    knownExploited: false,
    patchAvailable: true,
    isCloudAsset: true,
    isInternetFacing: true,
    eal: 8200000,
    remediationCost: 200000,
    rosi: 18.2,
    priority: 'High Priority',
    description: 'IMDSv1 Service Exposure allowing SSRF IAM role credential harvesting.',
    discoveredDate: '2026-09-01'
  },
  {
    cveId: 'CVE-2026-50122',
    assetId: 'CORE-BANK-GW',
    assetName: 'CORE-BANK-GW-02',
    cvssScore: 8.5,
    cvssSeverity: 'HIGH',
    exploitStatus: 'PROOF_OF_CONCEPT',
    knownExploited: false,
    patchAvailable: true,
    isCloudAsset: false,
    isInternetFacing: true,
    eal: 4500000,
    remediationCost: 400000,
    rosi: 11.2,
    priority: 'High Priority',
    description: 'JWT Validation Bypass in API Gateway allowing token forgery.',
    discoveredDate: '2026-08-28'
  },
  {
    cveId: 'CVE-2026-28103',
    assetId: 'SWIFT-MW-01',
    assetName: 'SWIFT-MW-01',
    cvssScore: 8.2,
    cvssSeverity: 'HIGH',
    exploitStatus: 'PROOF_OF_CONCEPT',
    knownExploited: false,
    patchAvailable: false,
    isCloudAsset: false,
    isInternetFacing: false,
    eal: 2800000,
    remediationCost: 300000,
    rosi: 9.3,
    priority: 'Recommended',
    description: 'Insecure Deserialization in Java Message Service Middleware.',
    discoveredDate: '2026-09-02'
  },
  {
    cveId: 'CVE-2026-09122',
    assetId: 'IAM-AUTH-PROD',
    assetName: 'IAM-AUTH-PROD-01',
    cvssScore: 7.8,
    cvssSeverity: 'HIGH',
    exploitStatus: 'UNPROVEN',
    knownExploited: false,
    patchAvailable: true,
    isCloudAsset: true,
    isInternetFacing: true,
    eal: 1800000,
    remediationCost: 150000,
    rosi: 8.5,
    priority: 'Recommended',
    description: 'LDAP Injection flaw in Identity Directory search interface.',
    discoveredDate: '2026-08-10'
  },
  {
    cveId: 'CVE-2026-77810',
    assetId: 'DEV-LAPTOP-042',
    assetName: 'DEV-LAPTOP-042',
    cvssScore: 5.4,
    cvssSeverity: 'MEDIUM',
    exploitStatus: 'UNPROVEN',
    knownExploited: false,
    patchAvailable: true,
    isCloudAsset: false,
    isInternetFacing: false,
    eal: 280000,
    remediationCost: 50000,
    rosi: 3.2,
    priority: 'Monitor',
    description: 'Outdated Chromium browser engine with memory safety vulnerability.',
    discoveredDate: '2026-09-05'
  },
  {
    cveId: 'CVE-2026-88192',
    assetId: 'REDIS-CACHE-01',
    assetName: 'REDIS-CACHE-PROD-01',
    cvssScore: 8.9,
    cvssSeverity: 'HIGH',
    exploitStatus: 'WEAPONIZED',
    knownExploited: true,
    patchAvailable: true,
    isCloudAsset: true,
    isInternetFacing: false,
    eal: 1750000,
    remediationCost: 120000,
    rosi: 14.5,
    priority: 'High Priority',
    description: 'Lua Script Injection in Redis Cache allowing unauthorized memory dump.',
    discoveredDate: '2026-08-30'
  },
  {
    cveId: 'CVE-2026-90114',
    assetId: 'KAFKA-MQ-01',
    assetName: 'KAFKA-STREAM-01',
    cvssScore: 9.4,
    cvssSeverity: 'CRITICAL',
    exploitStatus: 'ACTIVE',
    knownExploited: true,
    patchAvailable: true,
    isCloudAsset: true,
    isInternetFacing: false,
    eal: 5100000,
    remediationCost: 300000,
    rosi: 17.0,
    priority: 'Fix Immediately',
    description: 'Kafka Protocol Authorization Bypass enabling topic eavesdropping.',
    discoveredDate: '2026-09-03'
  },
  {
    cveId: 'CVE-2026-33120',
    assetId: 'CORP-VPN-GW',
    assetName: 'CORP-VPN-GW-01',
    cvssScore: 8.1,
    cvssSeverity: 'HIGH',
    exploitStatus: 'PROOF_OF_CONCEPT',
    knownExploited: false,
    patchAvailable: true,
    isCloudAsset: false,
    isInternetFacing: true,
    eal: 2900000,
    remediationCost: 180000,
    rosi: 16.1,
    priority: 'High Priority',
    description: 'Pre-auth Memory Leak in SSL VPN Gateway web portal.',
    discoveredDate: '2026-08-25'
  },
  {
    cveId: 'CVE-2026-10441',
    assetId: 'ELK-LOG-SEARCH',
    assetName: 'ELK-SEARCH-PROD-02',
    cvssScore: 6.8,
    cvssSeverity: 'MEDIUM',
    exploitStatus: 'UNPROVEN',
    knownExploited: false,
    patchAvailable: true,
    isCloudAsset: true,
    isInternetFacing: false,
    eal: 890000,
    remediationCost: 90000,
    rosi: 9.8,
    priority: 'Recommended',
    description: 'Kibana dashboard expression injection vulnerability.',
    discoveredDate: '2026-09-04'
  },
  {
    cveId: 'CVE-2026-66201',
    assetId: 'EXCHANGE-[#1]',
    assetName: 'MAIL-EXCHANGE-01',
    cvssScore: 8.4,
    cvssSeverity: 'HIGH',
    exploitStatus: 'ACTIVE',
    knownExploited: true,
    patchAvailable: true,
    isCloudAsset: false,
    isInternetFacing: true,
    eal: 2100000,
    remediationCost: 220000,
    rosi: 9.5,
    priority: 'Fix Immediately',
    description: 'Exchange Web Services NTLM Relay attack vulnerability.',
    discoveredDate: '2026-08-18'
  },
  {
    cveId: 'CVE-2026-11002',
    assetId: 'ANALYTICS-DB-01',
    assetName: 'ANALYTICS-DW-01',
    cvssScore: 5.2,
    cvssSeverity: 'MEDIUM',
    exploitStatus: 'UNPROVEN',
    knownExploited: false,
    patchAvailable: false,
    isCloudAsset: true,
    isInternetFacing: false,
    eal: 720000,
    remediationCost: 80000,
    rosi: 9.0,
    priority: 'Monitor',
    description: 'Insecure direct object reference in data export staging query.',
    discoveredDate: '2026-09-06'
  },
  {
    cveId: 'CVE-2026-00412',
    assetId: 'BUILD-CI-RUNNER-01',
    assetName: 'JENKINS-WORKER-04',
    cvssScore: 7.2,
    cvssSeverity: 'HIGH',
    exploitStatus: 'PROOF_OF_CONCEPT',
    knownExploited: false,
    patchAvailable: true,
    isCloudAsset: false,
    isInternetFacing: false,
    eal: 310000,
    remediationCost: 40000,
    rosi: 7.7,
    priority: 'Recommended',
    description: 'Jenkins Pipeline Script Security Plugin Sandbox Bypass.',
    discoveredDate: '2026-08-22'
  }
];

export const OPTIMIZATION_PORTFOLIO_ITEMS: OptimizationItem[] = [
  {
    id: 'OPT-01',
    action: 'Patch Payment Gateway Server (CVE-2026-48291)',
    assetName: 'PAY-GW-PROD-01',
    cveId: 'CVE-2026-48291',
    cost: 500000, // ₹5.0 L
    riskReduction: 14500000, // ₹1.45 Cr
    rosi: 29.0,
    priority: 'Fix First',
    category: 'Patching',
    defaultSelected: true
  },
  {
    id: 'OPT-02',
    action: 'Enable Multi-Factor Authentication (Privileged DB Roles)',
    assetName: 'CUSTOMER-DB-01',
    cveId: 'CVE-2026-39182',
    cost: 200000, // ₹2.0 L
    riskReduction: 5800000, // ₹58.0 L
    rosi: 29.0,
    priority: 'High Priority',
    category: 'Access Control',
    defaultSelected: true
  },
  {
    id: 'OPT-03',
    action: 'Cloud Access Hardening & IMDSv2 Enforce',
    assetName: 'AWS-PROD-01',
    cveId: 'CVE-2026-11842',
    cost: 200000, // ₹2.0 L
    riskReduction: 4100000, // ₹41.0 L
    rosi: 20.5,
    priority: 'High Priority',
    category: 'Cloud',
    defaultSelected: true
  },
  {
    id: 'OPT-04',
    action: 'Improve SIEM Real-Time Telemetry & SOC Alerts',
    assetName: 'All Critical Production Infra',
    cost: 800000, // ₹8.0 L
    riskReduction: 8200000, // ₹82.0 L
    rosi: 10.25,
    priority: 'Recommended',
    category: 'Monitoring',
    defaultSelected: true
  },
  {
    id: 'OPT-05',
    action: 'API Gateway Rate Limiting & Web Application Firewall Rules',
    assetName: 'CORE-BANK-GW',
    cveId: 'CVE-2026-50122',
    cost: 450000, // ₹4.5 L
    riskReduction: 3800000, // ₹38.0 L
    rosi: 8.44,
    priority: 'Recommended',
    category: 'Access Control',
    defaultSelected: false
  },
  {
    id: 'OPT-06',
    action: 'Deploy Next-Gen EDR Agents Across Workstations & Laptops',
    assetName: 'Corporate Endpoints (500+ Nodes)',
    cost: 1200000, // ₹12.0 L
    riskReduction: 4400000, // ₹44.0 L
    rosi: 3.67,
    priority: 'Lower Priority',
    category: 'Endpoint',
    defaultSelected: false
  },
  {
    id: 'OPT-07',
    action: 'Isolate SWIFT Broker Network Segment',
    assetName: 'SWIFT-MW-01',
    cveId: 'CVE-2026-28103',
    cost: 300000, // ₹3.0 L
    riskReduction: 2100000, // ₹21.0 L
    rosi: 7.0,
    priority: 'Recommended',
    category: 'Access Control',
    defaultSelected: false
  },
  {
    id: 'OPT-08',
    action: 'Third-Party Dependency Vulnerability Scanning Automation',
    assetName: 'CI/CD Pipelines',
    cost: 150000, // ₹1.5 L
    riskReduction: 900000, // ₹9.0 L
    rosi: 6.0,
    priority: 'Lower Priority',
    category: 'Cloud',
    defaultSelected: false
  }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'LOG-2026-9912',
    timestamp: '08 Sep 2026, 21:32:44 IST',
    user: 'security.admin@digilex.demo',
    action: 'Approved Remediation Allocation',
    object: 'CVE-2026-48291 (PAY-GW-PROD-01)',
    previousState: 'Pending Budget Review',
    newState: 'Approved (₹5.00 L Allocated)',
    eventHash: 'SHA256: 7f2a991b4890c2e3d92830f129a8c7b602e1198a72',
    status: 'Verified'
  },
  {
    id: 'LOG-2026-9884',
    timestamp: '08 Sep 2026, 20:15:10 IST',
    user: 'ciso.lead@digilex.demo',
    action: 'Executed Knapsack Fund Optimization',
    object: 'Budget Scenario (₹50.00 L Cap)',
    previousState: 'Unoptimized Portfolio',
    newState: 'Max Risk Reduction: ₹1.84 Cr',
    eventHash: 'SHA256: 3c88102a9e181726a11b239f88c221190d7e63b21',
    status: 'Verified'
  },
  {
    id: 'LOG-2026-9810',
    timestamp: '08 Sep 2026, 18:40:02 IST',
    user: 'system.engine',
    action: 'Automated Threat Intelligence Sync',
    object: 'CISA KEV Catalog & NVD Feed',
    previousState: '245 Active CVEs',
    newState: '247 Active CVEs (+2 New)',
    eventHash: 'SHA256: d8e2912a7791836109927163ef2810a01293b711',
    status: 'Verified'
  },
  {
    id: 'LOG-2026-9721',
    timestamp: '08 Sep 2026, 14:12:30 IST',
    user: 'audit.officer@digilex.demo',
    action: 'Exported Executive Compliance Stamp',
    object: 'CERT-In & NIST CSF Audit Report',
    previousState: 'Draft Status',
    newState: 'Cryptographically Signed',
    eventHash: 'SHA256: a11899120bc71a261a810931e9812739b001e428',
    status: 'Verified'
  }
];

export const MOCK_COMPLIANCE_CONTROLS: ComplianceControl[] = [
  {
    id: 'CMP-01',
    finding: 'Unpatched Critical RCE on Internet-Facing Gateway',
    controlGap: 'Patch & Vulnerability Management SLA Deficit',
    iso27001: 'A.12.6.1 (Technical Vulnerability Mgmt)',
    nistCsf: 'PR.IP-12 (Vulnerability Mgmt)',
    certIn: 'Direction 5.1 (24-hr Incident & Patching)',
    status: 'Needs Attention',
    riskLevel: 'CRITICAL'
  },
  {
    id: 'CMP-02',
    finding: 'Missing MFA on Privileged Database Database Roles',
    controlGap: 'Access Control & Authentication Deficit',
    iso27001: 'A.9.4.2 (Secure Authentication)',
    nistCsf: 'PR.AA-01 (MFA Enforce)',
    certIn: 'Direction 4.2 (Privileged Access Logs)',
    status: 'Needs Attention',
    riskLevel: 'HIGH'
  },
  {
    id: 'CMP-03',
    finding: 'IMDSv1 Protocol Active on AWS EC2 Cloud Instances',
    controlGap: 'Cloud Configuration Hardening Deficit',
    iso27001: 'A.10.1.1 (Cryptographic Controls)',
    nistCsf: 'PR.PT-03 (Least Privilege Infra)',
    certIn: 'Direction 6.3 (Cloud Infra Hardening)',
    status: 'In Progress',
    riskLevel: 'HIGH'
  },
  {
    id: 'CMP-04',
    finding: 'SWIFT Network Isolation Verification',
    controlGap: 'Network Segmentation Controls',
    iso27001: 'A.13.1.1 (Network Controls)',
    nistCsf: 'PR.AC-05 (Network Integrity)',
    certIn: 'Direction 3.1 (Core Banking Isolation)',
    status: 'Compliant',
    riskLevel: 'LOW'
  }
];

export const MOCK_AUDIT_EVENTS: AuditEvent[] = [
  {
    id: 'AUD-991',
    timestamp: '2026-09-08 11:24:02 IST',
    actor: 'CISO Office (CISO-USER-01)',
    eventType: 'OPTIMIZATION_EXECUTION',
    actionSummary: 'Executed 0/1 Knapsack Portfolio Allocation (Cap: ₹50.00 L)',
    details: 'Selected 4 remediation actions to eliminate ₹1.84 Crore of annualized expected loss.',
    cryptographicHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  {
    id: 'AUD-988',
    timestamp: '2026-09-08 10:15:44 IST',
    actor: 'SecOps Lead (SECOPS-USER-04)',
    eventType: 'ASSET_DISCOVERY',
    actionSummary: 'Discovered Subnet Asset PAY-SETTLE-GW-03 (10.0.12.199)',
    details: 'Mapped PCI-DSS asset criticality and initialized baseline EAL of ₹38.00 Lakh.',
    cryptographicHash: '8f4e2c91a3b57d60e12f498c301e76b25a09c8d7e6f5a4b3c2d1e0f9a8b7c6d5'
  },
  {
    id: 'AUD-982',
    timestamp: '2026-09-07 16:02:18 IST',
    actor: 'System Automation',
    eventType: 'CVE_FEED_SYNC',
    actionSummary: 'Ingested CISA KEV Catalog Sync (12 Critical CVEs updated)',
    details: 'Recalculated organizational Expected Annual Loss from ₹5.12 Cr to ₹4.82 Cr.',
    cryptographicHash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b'
  }
];

export const MOCK_THREAT_FEEDS: ThreatFeedItem[] = [
  {
    id: 'THREAT-2026-881',
    title: 'CRITICAL ACTIVE EXPLOIT ALERT: Financial Payment Gateway Buffer Overflow',
    severity: 'CRITICAL',
    description: 'Threat actors are actively deploying automated exploitation scripts targeting PCI-DSS payment handlers globally. Zero-day exploit availability confirmed.',
    affectedAssetsCount: 3,
    potentialEal: 23400000, // ₹2.34 Cr
    threatType: 'Active Exploit',
    targetSectors: ['Payments', 'Banking', 'Fintech'],
    dateAdded: '2026-09-08'
  },
  {
    id: 'THREAT-2026-874',
    title: 'Ransomware Group "CyberVortex" Targeting Indian Banking APIs',
    severity: 'HIGH',
    description: 'Active reconnaissance observed scanning JWT authentication endpoints in core banking microservices for token forgery vulnerabilities.',
    affectedAssetsCount: 2,
    potentialEal: 12500000,
    threatType: 'Ransomware Campaign',
    targetSectors: ['Financial Services', 'Broking'],
    dateAdded: '2026-09-07'
  },
  {
    id: 'THREAT-2026-860',
    title: 'AWS Cloud Metadata Credential Harvesting (IMDSv1)',
    severity: 'HIGH',
    description: 'Public GitHub repositories detected leaking automated scanner tools targeting unshielded AWS IMDS endpoints.',
    affectedAssetsCount: 5,
    potentialEal: 8200000,
    threatType: 'Credential Leak',
    targetSectors: ['Cloud Enterprise', 'SaaS'],
    dateAdded: '2026-09-04'
  }
];

export const MOCK_REPORTS: ReportTemplate[] = [
  {
    id: 'REP-EXEC-01',
    title: 'Executive Risk & Financial Exposure Report',
    category: 'Board & C-Suite',
    description: 'Comprehensive financial breakdown of Expected Annual Loss, top risk drivers, and budget optimization recommendations.',
    lastGenerated: '08 Sep 2026',
    status: 'Ready',
    size: '2.4 MB'
  },
  {
    id: 'REP-BOARD-02',
    title: 'Board Security Summary & Investment Portfolio',
    category: 'Board of Directors',
    description: 'High-level 2-page infographic deck showing cyber risk trajectory and ROSI returns per rupee invested.',
    lastGenerated: '01 Sep 2026',
    status: 'Ready',
    size: '1.8 MB'
  },
  {
    id: 'REP-VULN-03',
    title: 'Vulnerability Technical Remediation Ledger',
    category: 'Technical / SecOps',
    description: 'Granular asset-by-asset CVE tracking list sorted by financial impact and patch availability.',
    lastGenerated: '07 Sep 2026',
    status: 'Ready',
    size: '4.1 MB'
  },
  {
    id: 'REP-OPT-04',
    title: 'Knapsack Fund Optimization & ROSI Breakdown',
    category: 'CFO & Finance',
    description: 'Mathematical justification for allocation of ₹50 Lakh security budget across top priority risk mitigations.',
    lastGenerated: '08 Sep 2026',
    status: 'Ready',
    size: '1.9 MB'
  },
  {
    id: 'REP-COMP-05',
    title: 'CERT-In, ISO 27001 & NIST CSF 2.0 Audit Package',
    category: 'Compliance & Audit',
    description: 'Regulatory compliance posture matrix mapped directly to technical control gaps and financial exposure.',
    lastGenerated: '05 Sep 2026',
    status: 'Ready',
    size: '3.5 MB'
  }
];

export const MOCK_INITIAL_CHAT: ChatMessage[] = [
  {
    id: 'MSG-01',
    sender: 'ai',
    text: `Greetings. I am **DIGILEX Copilot**, your executive cyber risk and financial decision intelligence engine.

How can I assist your team today?`,
    timestamp: '21:42 IST'
  }
];
