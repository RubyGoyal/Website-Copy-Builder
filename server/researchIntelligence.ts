// Comprehensive Domain Intelligence & Research Grounding Engine for Embee Software
// Provides real-time query parsing, keyword contextualization, and competitive gap discovery across all 48 solution pillars.

export interface BenchmarkPage {
  title: string;
  uri: string;
  category: 'competitor' | 'hyperscaler' | 'regulatory' | 'case_study';
  domain?: string;
  takeaway: string;
  rankIndex?: number;
  isSynthetic: boolean;
}

export interface ResearchInsightPoint {
  category: 'Competitor Blindspot' | 'Buyer Anxiety & Objection' | 'Indian Regulatory Reality' | 'Technical Architecture & SLA' | 'Value Hook';
  point: string;
  copywritingApplication: string;
}

export interface ResearchOutput {
  query: string;
  summary: string;
  rankingThemes: string[];
  competitorGaps: string[];
  searchSources: { title: string; uri: string }[];
  rawText: string;
  isQuotaLimited?: boolean;
  benchmarkPages?: BenchmarkPage[];
  detailedInputPoints?: ResearchInsightPoint[];
  pagesAnalyzedCount?: number;
  totalPointsCount?: number;
  researchIsLive?: boolean;
}

function getRawDomainResearch(
  pillarName?: string,
  solutionGroup?: string,
  keywords?: string[],
  query?: string,
  platforms?: string[],
  sections?: string[]
): ResearchOutput {
  const pName = pillarName || 'Enterprise Cloud & IT Solutions';
  const gName = solutionGroup || 'Cloud Solutions';
  const kList = keywords && keywords.length > 0 ? keywords : [`${pName} services`, 'Enterprise IT India'];
  const searchQuery = query || `${pName} ${gName} India`;
  const primaryKw = kList[0] || pName;
  const kwDisplay = kList.slice(0, 3).join(', ');

  const qLower = searchQuery.toLowerCase();
  const pLower = pName.toLowerCase();
  const kStr = kList.join(' ').toLowerCase();
  const combined = `${qLower} ${pLower} ${kStr}`;

  // 1. FinOps & Cloud Cost Optimisation
  if (
    combined.includes('finops') ||
    combined.includes('cost optimis') ||
    combined.includes('cost optimiz') ||
    combined.includes('cloud cost') ||
    combined.includes('billing') ||
    combined.includes('spend')
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) in the Indian enterprise market reveals that top-ranking IT provider pages focus on basic cost calculator checklists and high-level Reserved Instance advice, while failing to offer continuous FinOps Foundation lifecycle governance, automated idle compute cleanup, and contractual 20% to 30% cloud bill reduction commitments.`,
      rankingThemes: [
        'Generic public cloud pricing calculator explanations without enterprise contractual discount structures',
        'Basic recommendations for 1-year and 3-year Azure Reserved Instances without dynamic workload rightsizing',
        'Fragmented third-party FinOps tool pitches that require complex multi-month agent installations',
        'Superficial billing alert configurations that lack automated policy enforcement or department-level chargebacks'
      ],
      competitorGaps: [
        'Guaranteed 20% to 30% recurring cloud spend reduction combining Azure Hybrid Benefit, Savings Plans, and automated storage tiering',
        'Comprehensive FinOps Foundation (Inform, Optimise, Operate) framework with weekly showback and chargeback reports for Indian finance controllers',
        'Continuous tagging enforcement and automated orphan resource decommissioning (unattached Managed Disks, idle Public IPs, zombie snapshots)',
        '35+ years of Indian IT governance ensuring alignment between CIO operational velocity and CFO financial accountability',
        'Dedicated senior FinOps certified architects backed by Embee Software\'s 17 Microsoft advanced specializations'
      ],
      searchSources: [
        { title: `Microsoft Cost Management & FinOps Framework - ${pName}`, uri: 'https://learn.microsoft.com/en-us/azure/cost-management-billing/finops/' },
        { title: 'Azure Hybrid Benefit & Reserved Capacity Savings Guide', uri: 'https://azure.microsoft.com/en-in/pricing/hybrid-benefit/' },
        { title: `Embee Software Cloud Optimisation & Managed Azure - ${pName}`, uri: 'https://embee.co.in/what-we-do/cloud-solutions/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on 20-30% guaranteed FinOps reduction, Azure Hybrid Benefit, and weekly Indian CFO showback reporting.`,
      isQuotaLimited: true
    };
  }

  // 2. Disaster Recovery, Backup & Business Continuity
  if (
    combined.includes('disaster') ||
    combined.includes(' dr ') ||
    combined.includes('backup') ||
    combined.includes('business continuity') ||
    combined.includes('rto') ||
    combined.includes('rpo') ||
    combined.includes('ransomware protect')
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) indicates that top-ranking vendor pages present generic offsite backup definitions and standard tape-to-cloud marketing, completely ignoring Indian data sovereignty mandates, sub-15-minute RTO/RPO SLAs, and automated non-disruptive DR drills between Azure Central India (Pune) and South India (Chennai).`,
      rankingThemes: [
        'Basic backup frequency overviews (daily/weekly) without immutable protection against modern enterprise ransomware',
        'Generic disaster recovery terminology lacking quantifiable Recovery Time Objective (RTO) and Recovery Point Objective (RPO) benchmarks',
        'Siloed backup solutions for on-premises virtual machines that ignore cloud-native workloads and SaaS application data',
        'High-level disaster recovery testing advice that overlooks the disruption caused to production manufacturing or core banking systems'
      ],
      competitorGaps: [
        'Dual-region sovereign disaster recovery pairing Azure Central India (Pune) and South India (Chennai) ensuring full Indian regulatory compliance',
        'Sub-15-minute RTO and near-zero RPO with automated, non-disruptive quarterly failover drills validated via Azure Site Recovery (ASR)',
        'Immutable air-gapped backup vaults and multi-user authorization (MUA) providing guaranteed defense against insider threats and ransomware',
        'End-to-end business continuity architecture covering SAP HANA, critical ERP databases, and Microsoft 365 tenant data',
        '24x7 emergency failover activation managed by 500+ certified Indian engineers with 35+ years of mission-critical experience'
      ],
      searchSources: [
        { title: 'Azure Sovereign Business Continuity & Disaster Recovery in India', uri: 'https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-overview' },
        { title: 'RBI & SEBI Business Continuity and Disaster Recovery Directives for Financial Entities', uri: 'https://www.rbi.org.in/' },
        { title: `Embee Software Backup, Business Continuity & Disaster Recovery - ${pName}`, uri: 'https://embee.co.in/what-we-do/cloud-solutions/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on Pune-Chennai dual-region DR, sub-15 min RTO/RPO, immutable ransomware vaults, and RBI/SEBI compliance.`,
      isQuotaLimited: true
    };
  }

  // 3. DevOps, Kubernetes & Containerization
  if (
    combined.includes('devops') ||
    combined.includes('kubernetes') ||
    combined.includes('aks') ||
    combined.includes('container') ||
    combined.includes('ci/cd') ||
    combined.includes('docker') ||
    combined.includes('microservice')
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) shows that competing IT pages discuss generic CI/CD pipelines and abstract open-source Docker benefits, failing to provide production Azure Kubernetes Service (AKS) enterprise landing zones, GitOps governance, and automated container security scans required by Indian enterprise engineering teams.`,
      rankingThemes: [
        'Generic descriptions of Jenkins or GitLab pipelines without cloud-native Azure DevOps and GitHub Enterprise integration',
        'Introductory containerization tutorials that ignore multi-tenant cluster networking, ingress controllers, and subnet sizing',
        'Basic microservices buzzwords lacking real-world container image vulnerability scanning and secret management (Azure Key Vault)',
        'Overly developer-centric documentation without operational SRE observability, autoscaling policies, and FinOps node pool management'
      ],
      competitorGaps: [
        'Production-ready AKS Enterprise Landing Zones incorporating Azure CNI networking, private API endpoints, and Pod Identity',
        'Turnkey GitHub Actions and Azure DevOps CI/CD pipelines with automated SAST/DAST security gates and GitOps deployment with ArgoCD',
        'Integrated container security with Microsoft Defender for Containers and Trivy scanning within Azure Container Registry (ACR)',
        'Cost-efficient autoscaling utilizing Azure Spot node pools and Virtual Nodes (KEDA) to slash container compute costs by up to 50%',
        'Proven microservices delivery with verified customer implementations including high-concurrency dealer portals and manufacturing apps'
      ],
      searchSources: [
        { title: 'Azure Kubernetes Service (AKS) Enterprise Architecture Guide', uri: 'https://learn.microsoft.com/en-us/azure/aks/architecture-overview' },
        { title: 'GitHub Enterprise & Azure DevOps Enterprise CI/CD Governance', uri: 'https://azure.microsoft.com/en-in/solutions/devops/' },
        { title: `Embee Software DevOps & Container Modernization - ${pName}`, uri: 'https://embee.co.in/what-we-do/cloud-solutions/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on secure AKS landing zones, GitHub CI/CD pipelines, container FinOps, and 35+ years of enterprise delivery.`,
      isQuotaLimited: true
    };
  }

  // 4. Cloud Migration & Modernization Services
  if (
    combined.includes('migration') ||
    combined.includes('migrate') ||
    combined.includes('modernization') ||
    combined.includes('modernisation') ||
    combined.includes('lift and shift') ||
    combined.includes('landing zone') ||
    combined.includes('rehost')
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) reveals that top-ranking cloud migration pages in India rely on high-level wave planning templates and generic lift-and-shift checklists, while completely omitting zero-downtime database cutover architectures, Indian DPDP Act compliance, and sovereign data residency in Pune, Chennai, and Mumbai.`,
      rankingThemes: [
        'Standard 6R migration framework explanations (Rehost, Refactor, Rearchitect, etc.) without workload-specific execution roadmaps',
        'Generic Total Cost of Ownership (TCO) calculators that do not account for Indian bandwidth egress and local storage tax structures',
        'Basic Azure Migrate tool demonstrations lacking deep SQL Server, Oracle, and SAP HANA migration automation',
        'Superficial post-migration managed services promises without guaranteed uptime SLAs or immediate FinOps rightsizing'
      ],
      competitorGaps: [
        'Zero-downtime database and application cutover frameworks verified through dry-run staging and automated delta replication',
        'Sovereign enterprise landing zones compliant with the Digital Personal Data Protection (DPDP) Act 2023 and CERT-In mandates',
        '100% data residency inside sovereign Microsoft Azure India datacentres (Central India Pune, South India Chennai, West India Mumbai)',
        'Direct track record migrating core enterprise workloads for prominent Indian brands like Cement Corporation of India and Hy-Tech',
        '17 Microsoft advanced specializations and 500+ certified engineers ensuring white-glove architecture reviews and immediate deployment'
      ],
      searchSources: [
        { title: 'Azure Migration and Modernization Program (AMMP) Execution Guide', uri: 'https://azure.microsoft.com/en-in/programs/azure-migration-and-modernization-program/' },
        { title: 'Microsoft Cloud Adoption Framework (CAF) for Azure India', uri: 'https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/' },
        { title: `Embee Software Cloud Migration & Modernization - ${pName}`, uri: 'https://embee.co.in/what-we-do/cloud-solutions/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on zero-downtime cutovers, DPDP Act compliance, Indian Azure regions, and 17 Microsoft advanced specializations.`,
      isQuotaLimited: true
    };
  }

  // 5. Identity and Access Management / Microsoft Entra
  if (
    combined.includes('identity') ||
    combined.includes('access management') ||
    combined.includes('iam') ||
    combined.includes('entra') ||
    combined.includes('active directory') ||
    combined.includes('conditional access') ||
    combined.includes('mfa') ||
    combined.includes('sso') ||
    combined.includes('zero trust identity') ||
    combined.includes('pim')
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) in the Indian enterprise market highlights that competing vendor pages promote standard single sign-on (SSO) and basic Multi-Factor Authentication (MFA) setups, while failing to address Privileged Identity Management (PIM), automated employee offboarding, and Zero Trust conditional access for hybrid Indian workforces.`,
      rankingThemes: [
        'Basic Microsoft Entra ID (formerly Azure AD) feature lists without enterprise policy enforcement designs',
        'Standard MFA setup guides that fail to address SMS OTP vulnerability in India and FIDO2/passwordless authentication',
        'High-level Zero Trust philosophy statements without concrete Conditional Access device compliance policies',
        'Manual user lifecycle management that exposes organizations to lingering access from resigned staff and third-party vendors'
      ],
      competitorGaps: [
        'Granular Privileged Identity Management (PIM) with Just-In-Time (JIT) access, approval workflows, and mandatory session auditing',
        'Context-aware Conditional Access policies enforcing compliant device health, geo-fencing (restricting logins to India/authorized regions), and risk-based step-up authentication',
        'Automated HR-driven user lifecycle provisioning and instant offboarding integrated with enterprise HRMS systems (SAP, Darwinbox, Workday)',
        'Alignment with the Digital Personal Data Protection (DPDP) Act 2023 for strict access governance over employee and customer personal data',
        'Senior identity architects with Microsoft Security specializations and 35+ years of directory integration across hybrid environments'
      ],
      searchSources: [
        { title: 'Microsoft Entra Identity Governance and Privileged Access Guide', uri: 'https://learn.microsoft.com/en-us/entra/id-governance/' },
        { title: 'Zero Trust Identity Architecture & Conditional Access Best Practices', uri: 'https://www.microsoft.com/en-in/security/business/zero-trust' },
        { title: `Embee Software Security & Identity Solutions - ${pName}`, uri: 'https://embee.co.in/what-we-do/cybersecurity/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on Microsoft Entra PIM, context-aware Conditional Access, automated HR lifecycle deprovisioning, and DPDP Act compliance.`,
      isQuotaLimited: true
    };
  }

  // 6. Threat and Vulnerability Management (VAPT)
  if (
    combined.includes('vulnerability') ||
    combined.includes('vapt') ||
    combined.includes('penetration testing') ||
    combined.includes('threat management') ||
    combined.includes('attack surface')
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) indicates that Indian VAPT provider pages deliver static PDF vulnerability reports and automated scan outputs, without providing contextual risk prioritisation, developer remediation coaching, or alignment with CERT-In and RBI cybersecurity inspection standards.`,
      rankingThemes: [
        'Commoditized automated Nessus or Qualys scan exports packaged as complete vulnerability assessments',
        'Standard OWASP Top 10 web application testing checklists lacking deep business logic flaw exploitation',
        'Generic severity scoring (CVSS) that fails to account for an Indian enterprise\'s specific asset exposure or business criticality',
        'Point-in-time annual penetration tests that leave networks completely unmonitored during the intervening 364 days'
      ],
      competitorGaps: [
        'Continuous Risk-Based Vulnerability Management (RBVM) prioritizing real-world exploitability over theoretical scanner outputs',
        'Comprehensive manual penetration testing targeting cloud infrastructure, APIs, Active Directory, and internal network segments',
        'Formal alignment with CERT-In directives, RBI Cyber Security Framework, and SEBI cyber resilience guidelines',
        'Direct developer and infrastructure remediation workshops with clear code-level patches rather than unhelpful scanner jargon',
        '35+ years of enterprise trust backed by certified Indian ethical hackers and Microsoft Security advanced specializations'
      ],
      searchSources: [
        { title: 'CERT-In National Cybersecurity Guidelines & Empaneled Auditing Frameworks', uri: 'https://www.cert-in.org.in/' },
        { title: 'Microsoft Defender Vulnerability Management Enterprise Blueprint', uri: 'https://learn.microsoft.com/en-us/defender-vulnerability-management/' },
        { title: `Embee Software Threat and Vulnerability Management - ${pName}`, uri: 'https://embee.co.in/what-we-do/cybersecurity/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on continuous risk-based VAPT, manual exploitation, CERT-In/RBI compliance, and hands-on remediation support.`,
      isQuotaLimited: true
    };
  }

  // 7. Managed Detection and Response (MDR / SOC)
  if (
    combined.includes('soc') ||
    combined.includes('mdr') ||
    combined.includes('managed detection') ||
    combined.includes('sentinel') ||
    combined.includes('siem') ||
    combined.includes('soar') ||
    combined.includes('incident response')
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) in India shows that competing MSSP pages emphasize tool licensing and ticket forwarders, while completely failing to provide a genuine 24x7 India-based SOC, sub-15-minute response SLAs, and automated playbooks for CERT-In's mandatory 6-hour incident reporting window.`,
      rankingThemes: [
        'High-level SOC marketing that acts merely as an alert-forwarding helpdesk without proactive threat hunting',
        'Generic SIEM log collection pricing models that penalize organizations with unpredictable ingestion overage fees',
        'Global threat feeds disconnected from targeted ransomware and phishing campaigns affecting Indian enterprises',
        'Vague response SLAs that define "response" as ticket generation rather than active threat containment'
      ],
      competitorGaps: [
        'True 24x7x365 India-based Security Operations Center (SOC) staffed by certified L1/L2/L3 security analysts',
        'Sub-15-minute Mean Time to Contain (MTTC) with automated SOAR playbooks isolating infected endpoints instantly',
        'Direct alignment with CERT-In mandatory 6-hour cybersecurity incident reporting workflows and forensic log retention',
        'Turnkey Microsoft Sentinel and Microsoft Defender XDR integration delivering end-to-end telemetry from endpoint to cloud',
        'Transparent predictable monthly engagement backed by 500+ certified Indian engineers and 35+ years of operational excellence'
      ],
      searchSources: [
        { title: 'CERT-In Mandatory 6-Hour Incident Notification Directions', uri: 'https://www.cert-in.org.in/directions2022.jsp' },
        { title: 'Microsoft Sentinel Cloud-Native SIEM/SOAR Architecture', uri: 'https://azure.microsoft.com/en-in/products/microsoft-sentinel/' },
        { title: `Embee Software Managed Detection and Response (MDR) - ${pName}`, uri: 'https://embee.co.in/what-we-do/cybersecurity/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on 24x7 India SOC, sub-15 min containment, CERT-In 6-hour compliance, and Microsoft Sentinel/XDR depth.`,
      isQuotaLimited: true
    };
  }

  // 8. Cloud & Infra Security / Defender for Cloud
  if (
    combined.includes('cloud and infra') ||
    combined.includes('cloud security') ||
    combined.includes('defender for cloud') ||
    combined.includes('cspm') ||
    combined.includes('cwpp')
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) demonstrates that top-ranking IT security pages focus on basic firewall configurations and antimalware extensions, while omitting Cloud Security Posture Management (CSPM), multi-cloud workload protection, and automated regulatory compliance scorecards.`,
      rankingThemes: [
        'Perimeter network firewall setup guides that ignore container and serverless application security',
        'Generic multi-cloud security marketing without concrete policy definitions for Azure, AWS, and on-premises environments',
        'Superficial Secure Score discussions that do not provide step-by-step remediation roadmaps for enterprise infrastructure',
        'Point security products that create fragmented dashboards and overwhelm IT teams with uncurated alert fatigue'
      ],
      competitorGaps: [
        'Continuous Cloud Security Posture Management (CSPM) via Microsoft Defender for Cloud with automated misconfiguration remediation',
        'Unified protection across hybrid environments using Azure Arc to enforce identical security baselines on-premises and in Azure',
        'Built-in compliance benchmarking mapped directly to ISO 27001, DPDP Act 2023, and RBI cybersecurity regulations',
        'Agentless container and Kubernetes security scanning integrated directly with Azure Kubernetes Service and CI/CD pipelines',
        'Deep architectural guidance from senior Indian cloud security architects with 35+ years of infrastructure experience'
      ],
      searchSources: [
        { title: 'Microsoft Defender for Cloud Architecture & Multi-Cloud CSPM', uri: 'https://learn.microsoft.com/en-us/azure/defender-for-cloud/' },
        { title: 'Azure Arc Hybrid Infrastructure Security Best Practices', uri: 'https://learn.microsoft.com/en-us/azure/azure-arc/' },
        { title: `Embee Software Cloud and Infra Security - ${pName}`, uri: 'https://embee.co.in/what-we-do/cybersecurity/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on Defender for Cloud CSPM, Azure Arc hybrid governance, automated remediation, and DPDP Act compliance.`,
      isQuotaLimited: true
    };
  }

  // 9. Cyber Advisory & DPDP Act Compliance
  if (
    combined.includes('cyber advisory') ||
    combined.includes('dpdp') ||
    combined.includes('data protection') ||
    combined.includes('ciso') ||
    combined.includes('privacy') ||
    (gName === 'Cybersecurity' && combined.includes('advisory'))
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) reveals that legal and consulting firms offer abstract legal opinions on the Digital Personal Data Protection (DPDP) Act 2023, but fail completely on the technical implementation: automated data discovery, consent management, Azure sovereign hosting, and verifiable technical controls.`,
      rankingThemes: [
        'High-level legal interpretations of DPDP Act 2023 penalties (up to ₹250 crore) without technical compliance steps',
        'Generic corporate governance checklists that do not integrate with Microsoft Purview or enterprise databases',
        'Abstract Virtual CISO offerings that lack hands-on engineering execution and incident response capabilities',
        'One-size-fits-all privacy templates that do not reflect Indian enterprise operational structures and vendor ecosystems'
      ],
      competitorGaps: [
        'Technical implementation of the DPDP Act 2023 using Microsoft Purview for automated Data Principal personal data discovery and classification',
        'Verifiable consent architecture, data subject access request (DSAR) automation, and compliant data retention policies',
        'Virtual CISO advisory providing board-level cybersecurity roadmaps backed by 500+ Indian engineers for hands-on execution',
        'Audit-ready frameworks aligned with CERT-In 6-hour incident directives and RBI/SEBI information security circulars',
        '35+ years of trusted enterprise delivery across India\'s largest manufacturing, financial, and retail corporations'
      ],
      searchSources: [
        { title: 'MeitY Digital Personal Data Protection (DPDP) Act 2023 Official Text & Guidelines', uri: 'https://www.meity.gov.in/data-protection-framework' },
        { title: 'Microsoft Purview DPDP Act 2023 Compliance & Data Governance Blueprint', uri: 'https://learn.microsoft.com/en-us/purview/' },
        { title: `Embee Software Cyber Advisory & Governance - ${pName}`, uri: 'https://embee.co.in/what-we-do/cybersecurity/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on technical DPDP Act implementation, Microsoft Purview data discovery, vCISO advisory, and CERT-In alignment.`,
      isQuotaLimited: true
    };
  }

  // 10. Microsoft 365 Business & Enterprise Plans / Licensing
  if (
    combined.includes('licensing') ||
    combined.includes('business and enterprise') ||
    combined.includes('m365 plans') ||
    combined.includes('enterprise plans') ||
    combined.includes('ea true-up') ||
    combined.includes('e3') ||
    combined.includes('e5')
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) indicates that competing Microsoft reseller pages act as transactional SKU order-takers, advertising standard retail pricing without conducting license profile rationalization, Microsoft 365 E3-to-E5 ROI modeling, or Enterprise Agreement (EA) renewal optimization for Indian enterprises.`,
      rankingThemes: [
        'Static pricing matrices comparing Business Basic, Standard, Premium, and E3/E5 without workload fit analysis',
        'Pushing full E5 upgrades without assessing whether E3 + security add-ons achieve the exact same outcome at lower cost',
        'Lack of inactive license discovery and automated offboarding reclaiming wasted monthly subscriptions',
        'Generic reseller checkout portals without dedicated account management or certified technical deployment support'
      ],
      competitorGaps: [
        'Comprehensive Microsoft 365 License Profile Assessment identifying unused, duplicate, and over-licensed subscriptions to save 15% to 25%',
        'Strategic Enterprise Agreement (EA) and Cloud Solution Provider (CSP) tiering designed to maximize Microsoft incentives for Indian organizations',
        'Step-up ROI blueprints evaluating security consolidation (retiring third-party Antivirus, MDM, and email filters into M365 E5)',
        'White-glove license allocation governance, automated joiner-mover-leaver workflows, and quarterly true-up reviews',
        'Premier Microsoft Frontier Partner and Microsoft Solutions Partner status with 35+ years of trusted advisory'
      ],
      searchSources: [
        { title: 'Microsoft 365 Enterprise Licensing and Security Comparison Guide', uri: 'https://www.microsoft.com/en-in/microsoft-365/enterprise' },
        { title: 'Microsoft CSP & Enterprise Agreement Optimization Advisory', uri: 'https://learn.microsoft.com/en-us/partner-center/' },
        { title: `Embee Software Microsoft 365 Licensing & Plans - ${pName}`, uri: 'https://embee.co.in/what-we-do/modern-workplace/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on 15-25% license cost savings, third-party tool consolidation into E5, and Microsoft Frontier Partner status.`,
      isQuotaLimited: true
    };
  }

  // 11. Microsoft 365 Migration Services (Tenant-to-Tenant & Legacy Platforms)
  if (
    combined.includes('migration') &&
    (gName === 'Modern Workplace' || combined.includes('tenant-to-tenant') || combined.includes('notes') || combined.includes('exchange'))
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) shows that IT providers treat workplace migrations as simple mailbox exports, omitting legacy archive conversions (HCL/Lotus Notes, Zimbra, Google Workspace), SharePoint folder restructuring, and zero-loss cutover during corporate mergers and acquisitions.`,
      rankingThemes: [
        'Basic IMAP and staged Exchange migration guides that cause user credential prompts and calendar sync failures',
        'Generic Google Workspace to Microsoft 365 checklists that ignore shared drives, permissions, and Google Forms conversion',
        'Neglect of complex legacy systems like Lotus Notes/Domino databases, on-premises file servers, and personal PST archives',
        'Vague weekend cutover promises without automated staging dry runs, rollback contingencies, or Monday morning floor support'
      ],
      competitorGaps: [
        'Zero-downtime Tenant-to-Tenant and legacy platform migration methodologies backed by specialized cutover tooling',
        'Proven conversion frameworks for HCL/Lotus Notes, Zimbra, Exchange On-Premises, and Google Workspace to modern M365',
        'Automated permissions mapping, metadata preservation, and version history retention for SharePoint and OneDrive',
        'VIP white-glove executive cutover support and Monday morning floor assistance across Indian office locations',
        '35+ years of enterprise migration pedigree handling tens of thousands of mailboxes without a single byte of data loss'
      ],
      searchSources: [
        { title: 'Microsoft 365 Tenant-to-Tenant Migration Architecture Guide', uri: 'https://learn.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-tenant-to-tenant-migrations' },
        { title: 'Legacy Mailbox & File System Cutover Playbook for Enterprise', uri: 'https://learn.microsoft.com/en-us/exchange/mailbox-migration/' },
        { title: `Embee Software Microsoft 365 Migration Services - ${pName}`, uri: 'https://embee.co.in/what-we-do/modern-workplace/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on zero-loss tenant-to-tenant and HCL Notes cutovers, permissions preservation, and white-glove on-site support.`,
      isQuotaLimited: true
    };
  }

  // 12. Managed Modern Work & Security (24x7) / Intune & Endpoint
  if (
    combined.includes('managed modern work') ||
    combined.includes('intune') ||
    combined.includes('endpoint management') ||
    combined.includes('byod') ||
    (gName === 'Modern Workplace' && combined.includes('managed'))
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) reveals that Indian desktop support companies focus on traditional ticketing and manual machine formatting, while failing to offer unified cloud-based Microsoft Intune management, zero-touch Autopilot provisioning, and secure BYOD policy enforcement.`,
      rankingThemes: [
        'Traditional Level 1 helpdesk services with long ticket turnaround times and manual remote desktop sessions',
        'Outdated imaging techniques (Ghost, WDS) that require devices to be physically shipped to IT headquarters for staging',
        'Lax Mobile Device Management (MDM) that risks personal privacy on employee smartphones or causes user backlash',
        'Lack of real-time endpoint telemetry, patch compliance reporting, and proactive application vulnerability updates'
      ],
      competitorGaps: [
        'Zero-touch Windows Autopilot deployment shipping pre-configured laptops directly from manufacturer to employee doorstep',
        'Microsoft Intune Mobile Application Management (MAM) securing corporate data on BYOD devices without wiping personal photos',
        'Automated third-party application patching, BitLocker encryption management, and compliance enforcement via Microsoft Defender',
        '24x7x365 multi-channel service desk (Teams, email, phone) providing sub-15-minute response times for Indian enterprise users',
        'National support presence across 10+ operational hubs in India backed by 500+ certified engineers'
      ],
      searchSources: [
        { title: 'Windows Autopilot & Microsoft Intune Deployment Strategy', uri: 'https://learn.microsoft.com/en-us/mem/autopilot/windows-autopilot' },
        { title: 'Microsoft Intune MAM for Enterprise BYOD Mobile Security', uri: 'https://learn.microsoft.com/en-us/mem/intune/apps/app-protection-policy' },
        { title: `Embee Software Managed Modern Work & Security - ${pName}`, uri: 'https://embee.co.in/what-we-do/modern-workplace/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on Windows Autopilot zero-touch delivery, Intune BYOD protection, and 24x7 service desk SLA support.`,
      isQuotaLimited: true
    };
  }

  // 13. Microsoft 365 Backup and Recovery
  if (
    combined.includes('365 backup') ||
    combined.includes('office 365 backup') ||
    (gName === 'Modern Workplace' && combined.includes('backup'))
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) demonstrates that vendor pages fail to educate Indian leaders on Microsoft's Shared Responsibility Model, leaving organizations mistakenly assuming that native Microsoft 365 recycle bins protect against ransomware, malicious insider deletions, or legal audit freezes.`,
      rankingThemes: [
        'Marketing third-party backup tools with confusing per-user pricing that balloons as mailboxes grow',
        'Confusing native recycle bin retention periods (30 to 93 days) with enterprise immutable long-term compliance backup',
        'Omitting Teams chat, channel files, Planner tasks, and SharePoint site collection metadata from backup scope',
        'Unrealistic restore claims that fail under disaster conditions due to Microsoft API throttling during mass recoveries'
      ],
      competitorGaps: [
        'Clarification of Microsoft\'s Shared Responsibility Model ensuring immutable, air-gapped protection independent of tenant credentials',
        'Point-in-time granular recovery for mailboxes, OneDrive, SharePoint libraries, and complete Microsoft Teams channel structures',
        'Dedicated high-throughput restore mechanisms bypassing API throttling during catastrophic ransomware incidents',
        'Compliance-grade long-term archival satisfying Indian tax, Companies Act, and DPDP Act data preservation requirements',
        '35+ years of enterprise data management and backup administration delivered across Indian mid-market and enterprise accounts'
      ],
      searchSources: [
        { title: 'Microsoft 365 Shared Responsibility Model & Backup Guidance', uri: 'https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility' },
        { title: 'Enterprise Ransomware Protection & Immutable Backup Architecture', uri: 'https://learn.microsoft.com/en-us/security/compass/ransomware-protection' },
        { title: `Embee Software Microsoft 365 Backup & Recovery - ${pName}`, uri: 'https://embee.co.in/what-we-do/modern-workplace/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on Shared Responsibility clarity, granular Teams/SharePoint restore, immutable air-gapped vaults, and regulatory compliance.`,
      isQuotaLimited: true
    };
  }

  // 14. Employee Experience, Adoption & Microsoft Viva
  if (
    combined.includes('viva') ||
    combined.includes('employee experience') ||
    combined.includes('change management') ||
    combined.includes('adoption')
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) highlights that competing system integrators focus purely on technical license activation, neglecting Prosci-aligned organizational change management, frontline worker communication, and employee burnout analytics via Microsoft Viva.`,
      rankingThemes: [
        'Technical feature overviews of Viva modules (Connections, Insights, Learning, Goals) without business use cases',
        'Superficial adoption claims measuring license assignment rather than daily active usage and workflow transformation',
        'Lack of custom internal communication strategies tailored for diverse, multilingual Indian workforces and plant personnel',
        'Ignoring executive dashboards that connect workplace collaboration habits directly to employee retention and output'
      ],
      competitorGaps: [
        'Structured Prosci-certified Change Management methodology ensuring 85%+ user adoption across business units',
        'Microsoft Viva Connections intranet experiences accessible on mobile devices for factory, branch, and field employees',
        'Viva Insights privacy-protected organizational analytics uncovering collaboration bottlenecks and employee burnout trends',
        'Tailored role-based training programs and gamified champion networks embedded within Indian customer teams',
        'Proven modern workplace transformations with documented enterprise adoption across 3,500+ Indian customer organizations'
      ],
      searchSources: [
        { title: 'Microsoft Viva Employee Experience Platform Architecture', uri: 'https://learn.microsoft.com/en-us/viva/' },
        { title: 'Microsoft Adoption & Organizational Change Management Framework', uri: 'https://adoption.microsoft.com/' },
        { title: `Embee Software Employee Experience & Microsoft Viva - ${pName}`, uri: 'https://embee.co.in/what-we-do/modern-workplace/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on Prosci change management, Viva mobile experiences for frontline workers, and executive collaboration analytics.`,
      isQuotaLimited: true
    };
  }

  // 15. Microsoft Teams Phone / Enterprise VoIP & TRAI Compliance
  if (
    combined.includes('teams phone') ||
    combined.includes('operator connect') ||
    combined.includes('direct routing') ||
    combined.includes('trai') ||
    combined.includes('voip') ||
    combined.includes('pbx') ||
    combined.includes('telephony')
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) reveals that telecom providers and IT integrators pitch generic cloud PBX replacements, while completely omitting Telecom Regulatory Authority of India (TRAI) toll bypass compliance, domestic Session Border Controller (SBC) routing, and Operator Connect deployment.`,
      rankingThemes: [
        'Standard cloud PBX feature checklists (call transfer, voicemail, auto-attendant) without regulatory grounding',
        'Overlooking strict TRAI regulations prohibiting the mixing of domestic PSTN and international VoIP calls (toll bypass rules)',
        'Generic hardware IP phone sales without certified Microsoft Teams Rooms and mobile softphone optimization',
        'Fragmented vendor management between local telecom operators (Airtel, Tata Tele, Jio) and Microsoft licensing'
      ],
      competitorGaps: [
        '100% TRAI-compliant telephony architecture preventing toll bypass via certified Direct Routing SBCs and Operator Connect',
        'Unified single-vendor management bridging Indian telco carrier circuits with Microsoft Teams Phone licenses',
        'Substantial cost reduction retiring expensive on-premises PBX hardware, PRI lines, and separate desk phones',
        'Seamless calling experience across laptops, mobile devices, and Teams-certified executive meeting room systems',
        'Senior voice and network engineers with 35+ years of enterprise telecom and Microsoft integration expertise'
      ],
      searchSources: [
        { title: 'TRAI Telecommunications Regulations & Enterprise Voice Guidance', uri: 'https://www.trai.gov.in/' },
        { title: 'Microsoft Teams Phone Direct Routing & Operator Connect Architecture', uri: 'https://learn.microsoft.com/en-us/microsoftteams/direct-routing-landing-page' },
        { title: `Embee Software Microsoft Teams Phone Solutions - ${pName}`, uri: 'https://embee.co.in/what-we-do/modern-workplace/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on TRAI toll bypass compliance, Indian telco integration, PBX retirement, and Microsoft Teams Phone depth.`,
      isQuotaLimited: true
    };
  }

  // 16. Audio-Visual Solutions & Microsoft Teams Rooms
  if (
    combined.includes('audio-visual') ||
    combined.includes('teams rooms') ||
    combined.includes('boardroom') ||
    combined.includes('av integration')
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) indicates that traditional AV integrators sell hardware-heavy proprietary conference room setups that suffer from complex wiring, poor remote participant inclusivity, and zero remote fleet monitoring.`,
      rankingThemes: [
        'Proprietary hardware sales with expensive proprietary control processors and vendor lock-in',
        'Inadequate acoustic and lighting design resulting in echo and poor visibility during hybrid leadership meetings',
        'Lack of one-touch join simplicity, forcing IT support to physically configure boardrooms before every meeting',
        'Absence of centralized cloud device management, diagnostics, and automated software patching'
      ],
      competitorGaps: [
        'Certified Microsoft Teams Rooms (MTR) systems on Windows and Android featuring one-touch join and intelligent camera framing',
        'Acoustic engineering and display optimization designed specifically for Indian enterprise boardrooms and town halls',
        'Centralized cloud management via Teams Rooms Pro Management portal with automated health alerts and self-healing',
        'End-to-end turnkey deployment encompassing hardware procurement, certified cabling, user training, and AMC support',
        '35+ years of enterprise infrastructure delivery supporting India\'s leading industrial and financial institutions'
      ],
      searchSources: [
        { title: 'Microsoft Teams Rooms Systems Architecture and Hardware Certification', uri: 'https://learn.microsoft.com/en-us/microsoftteams/rooms/' },
        { title: 'Hybrid Workplace AV Standards & Meeting Room Inclusivity', uri: 'https://adoption.microsoft.com/en-us/microsoft-teams-rooms/' },
        { title: `Embee Software Audio-Visual Solutions - ${pName}`, uri: 'https://embee.co.in/what-we-do/it-infrastructure/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on certified Teams Rooms, one-touch join, centralized cloud fleet monitoring, and turnkey AV integration.`,
      isQuotaLimited: true
    };
  }

  // 17. Intelligent Surveillance & AI Video Analytics
  if (
    combined.includes('surveillance') ||
    combined.includes('cctv') ||
    combined.includes('video analytics') ||
    combined.includes('intelligent surveillance')
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) shows that security vendors focus on passive CCTV camera installations and local NVR recording, neglecting edge AI video analytics, facial recognition governance under the DPDP Act 2023, and cloud storage optimization.`,
      rankingThemes: [
        'Commodity IP camera hardware sales without intelligent threat or anomaly detection software',
        'Passive recording that requires human security guards to manually review hours of footage after an incident occurs',
        'High bandwidth consumption caused by streaming uncompressed raw video across slow enterprise WAN connections',
        'Neglect of data privacy compliance, biometric data storage regulations, and Indian legal video retention periods'
      ],
      competitorGaps: [
        'AI-powered edge analytics detecting perimeter intrusion, PPE compliance (hard hats, safety vests), and smoke/fire in real-time',
        'Strict compliance with the Digital Personal Data Protection (DPDP) Act 2023 regarding video surveillance privacy and signage',
        'Smart hybrid cloud storage leveraging Azure Video Indexer and local edge buffering to minimize enterprise bandwidth costs',
        'Unified integration with enterprise access control, building management systems (BMS), and automated alert broadcasts',
        'Nationwide installation and maintenance network across Indian manufacturing plants, corporate offices, and warehouses'
      ],
      searchSources: [
        { title: 'Azure Video Indexer & Edge AI Video Analytics Architecture', uri: 'https://learn.microsoft.com/en-us/azure/azure-video-indexer/' },
        { title: 'MeitY Digital Personal Data Protection Act 2023 Video Data Compliance', uri: 'https://www.meity.gov.in/' },
        { title: `Embee Software Intelligent Surveillance - ${pName}`, uri: 'https://embee.co.in/what-we-do/it-infrastructure/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on edge AI video analytics, DPDP Act biometric compliance, bandwidth optimization, and plant safety monitoring.`,
      isQuotaLimited: true
    };
  }

  // 18. Data Engineering & Microsoft Fabric
  if (
    combined.includes('fabric') ||
    combined.includes('data engineering') ||
    combined.includes('onelake') ||
    combined.includes('synapse') ||
    combined.includes('databricks') ||
    combined.includes('lakehouse')
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) reveals that data analytics consultancies push fragmented data stacks (separate data lakes, ETL tools, and warehouses), while failing to guide Indian enterprises on Microsoft Fabric OneLake unification, capacity planning, and sovereign data residency in Pune/Chennai.`,
      rankingThemes: [
        'Generic big data buzzwords without actionable architectural blueprints for mid-market and enterprise budgets',
        'Fragmented multi-vendor software stacks requiring separate licenses for Spark, SQL warehouses, and pipeline orchestrators',
        'High data movement egress costs and duplicate storage caused by maintaining multiple siloed data warehouses',
        'Weak data governance and access controls that violate Indian data localization and DPDP Act mandates'
      ],
      competitorGaps: [
        'Unified SaaS data architecture using Microsoft Fabric OneLake to eliminate data movement and reduce compute spend',
        'End-to-end modern data pipelines integrating on-premises SAP, legacy databases, and cloud applications into Delta Parquet tables',
        'Automated governance, lineage tracking, and row-level security using Microsoft Purview embedded within Fabric',
        'Sovereign Indian cloud data processing anchored entirely within Microsoft Azure Central India (Pune) and South India (Chennai)',
        'Senior data engineering consultants with Microsoft Fabric credentials and 35+ years of enterprise data warehousing delivery'
      ],
      searchSources: [
        { title: 'Microsoft Fabric OneLake Unified Data Analytics Architecture', uri: 'https://learn.microsoft.com/en-us/fabric/' },
        { title: 'Modern Lakehouse Architecture & Delta Parquet Best Practices', uri: 'https://azure.microsoft.com/en-in/solutions/data-lake/' },
        { title: `Embee Software Data Engineering & Microsoft Fabric - ${pName}`, uri: 'https://embee.co.in/what-we-do/ai-analytics/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on Microsoft Fabric OneLake unification, SAP data pipelines, Purview data governance, and sovereign Azure regions.`,
      isQuotaLimited: true
    };
  }

  // 19. Advanced Analytics & Power BI
  if (
    combined.includes('power bi') ||
    combined.includes('advanced analytics') ||
    combined.includes('business intelligence') ||
    combined.includes('dax') ||
    combined.includes('dashboard')
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) shows that BI agencies focus on creating visually appealing charts in Power BI desktop files, without building enterprise semantic models, DAX query performance optimization, or automated data refresh pipelines.`,
      rankingThemes: [
        'Showcasing superficial mock dashboards that do not connect to live operational ERP or CRM systems',
        'Overly complex DAX calculations that cause report timeouts and slow performance for concurrent business users',
        'Uncontrolled proliferation of unmanaged .pbix files leading to conflicting metric definitions across departments',
        'Lack of mobile-responsive report designs for Indian CXOs and field sales managers who consume BI on smartphones'
      ],
      competitorGaps: [
        'Certified Power BI Enterprise Semantic Models providing a single source of truth across finance, sales, and supply chain',
        'High-performance DAX optimization and direct query caching slashing report load times from minutes to sub-second responses',
        'Power BI Premium and Fabric Capacity governance preventing report throttling and controlling monthly licensing expenses',
        'Mobile-first executive dashboards tailored for quick decision-making on smartphones and tablets',
        'Proven BI delivery across marquee Indian enterprises including tire manufacturing dealer portals and cement production'
      ],
      searchSources: [
        { title: 'Power BI Enterprise Semantic Modeling & Performance Best Practices', uri: 'https://learn.microsoft.com/en-us/power-bi/guidance/' },
        { title: 'Microsoft Fabric & Power BI Capacity Management Framework', uri: 'https://learn.microsoft.com/en-us/power-bi/enterprise/' },
        { title: `Embee Software Advanced Analytics & Power BI - ${pName}`, uri: 'https://embee.co.in/what-we-do/ai-analytics/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on enterprise semantic models, DAX query tuning, mobile-first CXO dashboards, and proven Indian manufacturing cases.`,
      isQuotaLimited: true
    };
  }

  // 20. Copilot & AI Strategy / Readiness / Governance
  if (
    combined.includes('copilot') &&
    (combined.includes('strategy') || combined.includes('readiness') || combined.includes('governance') || combined.includes('adoption'))
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) indicates that IT providers rush to sell Microsoft 365 Copilot licenses, completely ignoring the critical risk of internal data oversharing, lack of Purview sensitivity labeling, and absent user adoption frameworks.`,
      rankingThemes: [
        'Superficial AI marketing promising instant productivity boosts without addressing technical tenant readiness',
        'Neglect of SharePoint oversharing where employees uncover confidential executive payroll and appraisal documents via Copilot',
        'Lack of concrete ROI metrics and business KPI benchmarks for Indian CFOs investing in $30/user/month subscriptions',
        'Generic prompt engineering tip sheets that fail to teach real-world finance, HR, and legal enterprise workflows'
      ],
      competitorGaps: [
        'Comprehensive Microsoft Copilot Readiness Assessment identifying and remediating SharePoint permissions and oversharing',
        'Microsoft Purview Information Protection blueprints deploying automatic sensitivity labeling and data loss prevention (DLP)',
        'Measurable business use case accelerators across finance, supply chain, and customer service to demonstrate ROI in 60 days',
        'Structured change management training ensuring 80%+ daily active Copilot usage across Indian business departments',
        'Premier Microsoft Frontier Partner and Solutions Partner status with certified Copilot deployment specialists'
      ],
      searchSources: [
        { title: 'Microsoft 365 Copilot Technical Readiness & Data Governance Guide', uri: 'https://learn.microsoft.com/en-us/copilot/microsoft-365/' },
        { title: 'Microsoft Purview Data Security & Oversharing Prevention Blueprint', uri: 'https://learn.microsoft.com/en-us/purview/ai-microsoft-purview' },
        { title: `Embee Software Copilot & AI Advisory - ${pName}`, uri: 'https://embee.co.in/what-we-do/copilot-agentic-ai/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on Copilot readiness, Purview oversharing audits, executive ROI modeling, and Microsoft Frontier Partner credentials.`,
      isQuotaLimited: true
    };
  }

  // 21. Agentic AI & Copilot Studio
  if (
    combined.includes('copilot studio') ||
    combined.includes('agentic') ||
    combined.includes('agent development') ||
    combined.includes('autonomous agent') ||
    combined.includes('ai agent')
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) reveals that software agencies present simple FAQ chatbots as "AI agents", failing to provide multi-step autonomous workflows, enterprise ERP/CRM tool execution, and guardrailed human-in-the-loop review.`,
      rankingThemes: [
        'Basic Q&A conversational bots branded as advanced autonomous agents without backend API execution capabilities',
        'Unsafe agent prototypes that hallucinate policies and lack strict enterprise authentication and access controls',
        'Isolated custom AI scripts built on fragile open-source frameworks without enterprise lifecycle support',
        'Neglect of telemetry, prompt evaluation benchmarks, and token cost governance for production workloads'
      ],
      competitorGaps: [
        'Production autonomous agents built on Microsoft Copilot Studio and Azure AI Foundry connecting directly to SAP, Salesforce, and SQL',
        'Robust human-in-the-loop approval gates ensuring sensitive transactions (invoice approvals, vendor cutovers) require staff sign-off',
        'Enterprise security and compliance compliant with the DPDP Act 2023, ensuring agent outputs respect user identity and permissions',
        'Continuous agent lifecycle management including automated testing, drift detection, and response accuracy monitoring',
        'Senior AI engineers with proven track record delivering production enterprise solutions across Indian industry verticals'
      ],
      searchSources: [
        { title: 'Microsoft Copilot Studio Enterprise Autonomous Agents Architecture', uri: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/' },
        { title: 'Azure AI Foundry Multi-Agent Workflows & Responsible AI Governance', uri: 'https://learn.microsoft.com/en-us/azure/ai-studio/' },
        { title: `Embee Software Agentic AI & Copilot Studio - ${pName}`, uri: 'https://embee.co.in/what-we-do/copilot-agentic-ai/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on Copilot Studio autonomous agents, ERP API execution, human-in-the-loop governance, and DPDP Act alignment.`,
      isQuotaLimited: true
    };
  }

  // 22. Portal Development & SharePoint Intranets
  if (
    combined.includes('portal') ||
    combined.includes('sharepoint') ||
    combined.includes('intranet') ||
    (gName === 'Business Applications' && combined.includes('portal'))
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) shows that web development firms build static PHP or WordPress portals that create security vulnerabilities, lack integration with Active Directory, and fail to provide mobile accessibility for Indian field workforces.`,
      rankingThemes: [
        'Generic web portals that require duplicate user credentials and lack single sign-on (SSO) with enterprise systems',
        'Cluttered document repositories with broken search capabilities and zero automated document retention policies',
        'High maintenance costs caused by custom codebases that break during routine software and browser updates',
        'Neglect of mobile-responsive dealer and distributor portals that operate smoothly on low-bandwidth Indian cellular networks'
      ],
      competitorGaps: [
        'Enterprise SharePoint Online intranets and custom portals seamlessly integrated with Microsoft Entra ID and M365 security',
        'High-concurrency B2B dealer and vendor portals with proven delivery (e.g. MRF Tyre World dealer portal connecting 6,000+ dealers nationwide)',
        'Intelligent enterprise search, automated document approval workflows, and granular permission-based content targeting',
        'Responsive progressive web application (PWA) architecture designed to perform reliably on 4G/5G mobile connections',
        '35+ years of software delivery across India\'s largest manufacturing, pharmaceutical, and retail enterprises'
      ],
      searchSources: [
        { title: 'Microsoft SharePoint Modern Intranet Architecture & Best Practices', uri: 'https://learn.microsoft.com/en-us/sharepoint/modern-experience-overview' },
        { title: 'Enterprise Dealer & Vendor Portal Security Architecture on Azure', uri: 'https://azure.microsoft.com/en-in/solutions/apps/' },
        { title: `Embee Software Portal Development & Enterprise Collaboration - ${pName}`, uri: 'https://embee.co.in/what-we-do/business-applications/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on modern SharePoint portals, verified MRF 6,000+ dealer case study, Entra ID SSO, and low-code scalability.`,
      isQuotaLimited: true
    };
  }

  // 23. Custom Application Development & Power Apps / Low Code
  if (
    combined.includes('power apps') ||
    combined.includes('custom application') ||
    combined.includes('power automate') ||
    combined.includes('workflow automation') ||
    (gName === 'Business Applications' && combined.includes('application'))
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) indicates that traditional custom software developers propose multi-year, budget-heavy development cycles, ignoring low-code Power Platform rapid delivery, Center of Excellence (CoE) governance, and native integration with SAP and Microsoft 365.`,
      rankingThemes: [
        'Lengthy custom coding proposals with high upfront consulting fees and 12-to-18 month delivery roadmaps',
        'Unmanaged citizen developer sprawl creating shadow IT applications without security reviews or backup strategies',
        'Fragile point-to-point API integrations that fail when underlying databases or ERP systems are patched',
        'Overlooking mobile camera, barcode scanning, and GPS geotagging features essential for Indian factory and logistics workflows'
      ],
      competitorGaps: [
        'Rapid low-code Power Apps and Power Automate delivery delivering production enterprise applications in 4 to 8 weeks',
        'Power Platform Center of Excellence (CoE) governance establishing Data Loss Prevention (DLP) policies and environment tiering',
        'Turnkey factory and supply chain workflow digitization (e.g., Perfetti Van Melle factory automation for gate pass and invoice approvals)',
        'Bi-directional enterprise connectors syncing seamlessly with SAP Business One, SAP S/4HANA, and SQL Server',
        '35+ years of enterprise application engineering supported by certified Microsoft Power Platform specialists'
      ],
      searchSources: [
        { title: 'Microsoft Power Platform Center of Excellence (CoE) Governance Guide', uri: 'https://learn.microsoft.com/en-us/power-platform/guidance/coe/starter-kit' },
        { title: 'Enterprise Workflow Automation & Power Automate Best Practices', uri: 'https://learn.microsoft.com/en-us/power-automate/' },
        { title: `Embee Software Custom Application Development - ${pName}`, uri: 'https://embee.co.in/what-we-do/business-applications/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on 4-8 week Power Apps delivery, CoE governance, Perfetti Van Melle factory proof, and SAP connectors.`,
      isQuotaLimited: true
    };
  }

  // 24. SAP Business One (SQL / HANA)
  if (
    combined.includes('sap business one') ||
    combined.includes('sap b1') ||
    combined.includes('sap business suite')
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) reveals that local SAP resellers push on-premises server boxes or generic hosting providers that lack SAP HANA certified cloud architectures, high availability clustering, and automated backup for Indian manufacturing plants.`,
      rankingThemes: [
        'Pushing on-premises server purchases with heavy capital expenditure and vulnerable local physical backups',
        'Uncertified public cloud deployments that lead to severe SAP HANA memory bottlenecks and unexpected application crashes',
        'Generic database administration lacking dedicated SAP basis tuning and patch maintenance schedules',
        'Failure to integrate SAP B1 directly with modern GST e-invoicing, e-way bills, and automated banking APIs'
      ],
      competitorGaps: [
        'Premier SAP Gold Partner status with 35+ years of proven enterprise deployment and support across Indian industry',
        'Certified SAP on Microsoft Azure deployment architecture ensuring 99.9% uptime, SSD performance, and scalable memory sizing',
        'Turnkey GST e-invoicing, e-way bill automation, and Indian statutory compliance integration built directly into the ERP',
        'Verified customer case studies including Cement Corporation of India (CCI) and Hy-Tech streamlining manufacturing operations',
        'Round-the-clock basis administration, automated daily snapshots, and zero-downtime maintenance windows'
      ],
      searchSources: [
        { title: 'SAP on Microsoft Azure Certified Infrastructure & Sizing Guide', uri: 'https://azure.microsoft.com/en-in/solutions/sap/' },
        { title: 'SAP Business One Cloud Architecture Best Practices', uri: 'https://www.sap.com/india/products/erp/business-one.html' },
        { title: `Embee Software SAP Business One Solutions - ${pName}`, uri: 'https://embee.co.in/what-we-do/enterprise-platforms/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on SAP Gold Partner status, Azure SAP HANA certified hosting, CCI & Hy-Tech customer proof, and GST automation.`,
      isQuotaLimited: true
    };
  }

  // 25. SAP S/4HANA & Rise with SAP / Grow with SAP
  if (
    combined.includes('s/4hana') ||
    combined.includes('rise with sap') ||
    combined.includes('grow with sap') ||
    combined.includes('sap ecc') ||
    (gName === 'Enterprise Platforms' && combined.includes('sap'))
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) in the Indian enterprise market highlights that large legacy system integrators offer rigid multi-year S/4HANA migration programs with massive consulting overhead, neglecting agile cutover frameworks, Azure infrastructure optimization, and sovereign DR between Pune and Chennai.`,
      rankingThemes: [
        'Monolithic multi-year implementation roadmaps that freeze operational change and strain enterprise capital budgets',
        'Generic Rise with SAP marketing that does not clarify infrastructure ownership, SLA boundaries, and Microsoft Azure synergies',
        'High risk during brownfield database conversions leading to prolonged production manufacturing plant downtimes',
        'Vague disaster recovery commitments that fail to test SAP HANA System Replication (HSR) across Indian geographic regions'
      ],
      competitorGaps: [
        'SAP Gold Partner and Microsoft Solutions Partner delivering unified S/4HANA infrastructure and migration roadmaps',
        'Near-zero downtime cutover validated through dry-run staging environments and SAP HANA System Replication (HSR)',
        'Sovereign dual-region disaster recovery between Azure Central India (Pune) and South India (Chennai) with RPO = 0',
        'Up to 35% ongoing infrastructure cost reduction utilizing Azure Hybrid Benefit and Reserved Instances',
        'Dedicated senior Indian SAP basis architects and Azure engineers with 35+ years of enterprise modernization delivery'
      ],
      searchSources: [
        { title: 'SAP on Azure S/4HANA Architecture & Migration Framework', uri: 'https://azure.microsoft.com/en-in/solutions/sap/' },
        { title: 'Rise with SAP on Microsoft Azure Enterprise Deployment Guide', uri: 'https://learn.microsoft.com/en-us/azure/virtual-machines/workloads/sap/get-started' },
        { title: `Embee Software SAP S/4HANA & Enterprise Platforms - ${pName}`, uri: 'https://embee.co.in/what-we-do/enterprise-platforms/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on SAP Gold Partner credentials, zero-downtime cutover, Pune-Chennai dual-region DR, and Azure Hybrid Benefit.`,
      isQuotaLimited: true
    };
  }

  // 26. SAP Signavio & LeanIX
  if (
    combined.includes('signavio') ||
    combined.includes('leanix') ||
    combined.includes('process mining') ||
    combined.includes('enterprise architecture')
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) indicates that niche consulting firms offer academic enterprise architecture diagrams and process maps, while failing to connect process mining directly to actionable ERP modernization and measurable operational cost savings.`,
      rankingThemes: [
        'Theoretical enterprise architecture modeling that remains disconnected from day-to-day IT operations',
        'Manual process mapping workshops that take months to complete and become outdated immediately upon publication',
        'Lack of automated process mining extracting event logs directly from live SAP ERP and supply chain databases',
        'Failure to prioritize process bottlenecks based on quantifiable financial impact and customer delivery delays'
      ],
      competitorGaps: [
        'Automated process mining with SAP Signavio revealing real-world transaction bottlenecks and deviations across sales and procurement',
        'Comprehensive IT landscape rationalization with LeanIX identifying redundant software licenses and unsupported legacy servers',
        'Data-driven business case modeling for SAP S/4HANA modernization backed by actual process discovery metrics',
        'Accelerated process optimization delivering tangible cycle-time reductions in order-to-cash and procure-to-pay within 90 days',
        'SAP Gold Partner depth combining strategic enterprise architecture consulting with hands-on technical execution'
      ],
      searchSources: [
        { title: 'SAP Signavio Process Transformation Suite Architecture Guide', uri: 'https://www.sap.com/india/products/business-process-management.html' },
        { title: 'LeanIX Enterprise Architecture & Continuous Landscape Governance', uri: 'https://www.leanix.net/' },
        { title: `Embee Software SAP Signavio & LeanIX Practice - ${pName}`, uri: 'https://embee.co.in/what-we-do/enterprise-platforms/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on automated SAP Signavio process mining, LeanIX IT rationalization, 90-day cycle-time reduction, and SAP Gold Partner depth.`,
      isQuotaLimited: true
    };
  }

  // 27. Data Center Transformation & HCI
  if (
    combined.includes('data center') ||
    combined.includes('datacenter') ||
    combined.includes('azure stack hci') ||
    combined.includes('hyperconverged')
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) demonstrates that hardware vendors continue promoting traditional 3-tier architectures (separate servers, SAN storage, and Fibre Channel switches), completely overlooking hybrid Azure Stack HCI, cloud governance, and edge manufacturing resilience.`,
      rankingThemes: [
        'Hardware-heavy hardware refresh cycles with long procurement lead times and high cooling/power costs in Indian facilities',
        'Complex multi-vendor management where server, storage, and networking vendors blame each other during outages',
        'Siloed on-premises infrastructure that cannot burst workloads to the cloud or participate in unified identity management',
        'Neglect of edge computing needs at manufacturing plants and remote factory locations with intermittent internet connectivity'
      ],
      competitorGaps: [
        'Hyperconverged Infrastructure (HCI) transformation using Azure Stack HCI to unify compute, storage, and software-defined networking',
        'Seamless hybrid management via Azure Arc bringing cloud services (Azure SQL, Azure Monitor) directly to on-premises data centers',
        'Resilient edge plant architectures maintaining local operational continuity even during wide-area network disconnects',
        'Substantial 40% reduction in data center footprint, power consumption, and hardware maintenance contract costs',
        '35+ years of systems integration and data center infrastructure leadership across Indian enterprise IT'
      ],
      searchSources: [
        { title: 'Azure Stack HCI Architecture & Hybrid Cloud Best Practices', uri: 'https://learn.microsoft.com/en-us/azure-stack/hci/' },
        { title: 'Microsoft Azure Arc Hybrid Data Center Modernization Framework', uri: 'https://azure.microsoft.com/en-in/products/azure-arc/' },
        { title: `Embee Software Data Center Transformation - ${pName}`, uri: 'https://embee.co.in/what-we-do/it-infrastructure/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on Azure Stack HCI, Azure Arc hybrid governance, factory edge resilience, and 40% footprint reduction.`,
      isQuotaLimited: true
    };
  }

  // 28. Networking & Security / SD-WAN
  if (
    combined.includes('networking') ||
    combined.includes('sd-wan') ||
    combined.includes('expressroute') ||
    combined.includes('virtual wan')
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) highlights that telecom carriers sell expensive, rigid MPLS circuits with long provisioning times, while failing to provide intelligent SD-WAN dynamic path selection, Azure ExpressRoute connectivity, and Secure Access Service Edge (SASE) integration.`,
      rankingThemes: [
        'Promoting costly legacy MPLS contracts with slow bandwidth upgrades and lack of application-aware dynamic routing',
        'Complex branch office network configurations that require skilled on-site engineers for every routing change',
        'Direct Internet breakout at remote branches without integrated cloud firewall protection, exposing the enterprise network',
        'Lack of end-to-end latency monitoring for mission-critical cloud applications like Microsoft 365 and SAP on Azure'
      ],
      competitorGaps: [
        'Intelligent SD-WAN deployment delivering dynamic path selection, automated failover, and up to 45% reduction in telecom circuit costs',
        'Dedicated high-speed Azure ExpressRoute integration connecting Indian enterprise headquarters directly to Microsoft datacentres',
        'Unified Secure Access Service Edge (SASE) and cloud-delivered Next-Gen Firewall (NGFW) protecting all branch offices',
        'Centralized cloud network orchestration with zero-touch provisioning for rapid new branch office onboarding',
        '35+ years of enterprise network integration and telecom carrier management across 10+ operational hubs in India'
      ],
      searchSources: [
        { title: 'Azure Virtual WAN & Enterprise SD-WAN Global Architecture', uri: 'https://learn.microsoft.com/en-us/azure/virtual-wan/' },
        { title: 'Azure ExpressRoute Network Architecture in India (Mumbai, Chennai)', uri: 'https://learn.microsoft.com/en-us/azure/expressroute/' },
        { title: `Embee Software Networking & Security Practice - ${pName}`, uri: 'https://embee.co.in/what-we-do/it-infrastructure/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on intelligent SD-WAN, Azure ExpressRoute, SASE branch security, and 45% telecom cost reduction.`,
      isQuotaLimited: true
    };
  }

  // 29. Managed Cloud Services & 24x7 NOC/SOC Operations
  if (
    gName === 'Managed Services' ||
    combined.includes('managed cloud') ||
    combined.includes('managed infrastructure') ||
    combined.includes('noc') ||
    combined.includes('managed services')
  ) {
    return {
      query: searchQuery,
      summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) in the Indian enterprise market reveals that traditional managed service providers (MSPs) operate as passive ticket loggers with slow response times, while failing to provide proactive FinOps optimization, hybrid Azure Arc governance, and financially backed 99.95% uptime guarantees.`,
      rankingThemes: [
        'Traditional ITIL ticket-logging helpdesks with rigid Level 1 triage that delay critical incident resolution',
        'Generic server monitoring tools generating hundreds of false alarms without automated root-cause analysis',
        'Siloed management of on-premises hardware, virtualization, and public clouds causing visibility blind spots',
        'Opaque monthly retainer billing models that do not tie fees to cost reductions, performance gains, or business outcomes'
      ],
      competitorGaps: [
        'Unified hybrid infrastructure governance using Azure Arc across on-premises datacentres, edge factories, and Azure',
        '24x7 Network Operations Center (NOC) and Security Operations Center (SOC) staffed by 500+ certified Indian engineers',
        'Financially backed 99.95% uptime guarantees with proactive health monitoring and automated fault remediation',
        'Continuous FinOps cost governance delivering guaranteed 20% to 30% reduction in monthly cloud waste',
        'Nationwide Indian physical and remote presence with 10+ operational hubs ensuring rapid on-site emergency support'
      ],
      searchSources: [
        { title: `Embee Software Managed IT & Cloud Operations - ${pName}`, uri: 'https://embee.co.in/what-we-do/managed-services/' },
        { title: 'Azure Arc Hybrid & Multi-Cloud Infrastructure Management Guide', uri: 'https://azure.microsoft.com/en-in/products/azure-arc/' },
        { title: 'ITIL 4 Continuous Service Modernization Framework', uri: 'https://www.axelos.com/' }
      ],
      rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on 24x7 NOC/SOC, Azure Arc hybrid governance, guaranteed 99.95% uptime, and continuous FinOps.`,
      isQuotaLimited: true
    };
  }

  // 30. Default: Cloud Advisory & Consulting / General Cloud Solutions
  return {
    query: searchQuery,
    summary: `Competitive landscape analysis for "${searchQuery}" (Keywords: ${kwDisplay}) in the Indian enterprise market reveals that top-ranking IT consulting pages rely on high-level digital transformation buzzwords, failing to address the Digital Personal Data Protection (DPDP) Act 2023, data residency in Microsoft Azure India regions, and verifiable zero-downtime migration frameworks.`,
    rankingThemes: [
      `Broad ${pName.toLowerCase()} and cloud modernization overviews using generic industry marketing jargon`,
      'Standard hybrid and multi-cloud messaging that omits concrete licensing optimization and Azure Hybrid Benefit models',
      'Generic cybersecurity and governance statements lacking alignment with Indian regulatory frameworks (RBI, SEBI, IRDAI)',
      'High-level case study summaries without named Indian enterprise customers or quantified cutover benchmarks'
    ],
    competitorGaps: [
      'Architectures tailored for enterprise workloads across hybrid and cloud environments in India',
      'Sub-hour Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO) with zero-downtime cutover guarantees for enterprise workloads',
      'Transparent 3-year Total Cost of Ownership (TCO) modeling leveraging Azure Hybrid Benefit and Reserved Instances',
      'Direct access to 500+ certified Indian engineers backed by 17 Microsoft advanced specializations and 35+ years of operational experience'
    ],
    searchSources: [
      { title: `Microsoft Azure Sovereign Cloud Architecture India - ${pName}`, uri: 'https://azure.microsoft.com/en-in/solutions/' },
      { title: 'MeitY Digital Personal Data Protection (DPDP) Act 2023 Compliance Framework', uri: 'https://www.meity.gov.in/data-protection-framework' },
      { title: `Enterprise Cloud Solutions Advisory & Governance - ${pName}`, uri: 'https://embee.co.in/what-we-do/' }
    ],
    rawText: `Domain research prepared for Embee Software pillar: ${pName} targeting [${kwDisplay}]. Differentiators focused on sovereign Indian compliance, 17 Microsoft advanced specializations, zero-downtime cutovers, and 35+ years of delivery.`,
    isQuotaLimited: true
  };
}

// Helper to construct 18 to 20 benchmark pages tailored to Solution Group and Pillar
export function buildBenchmarkPages(
  pName: string,
  gName: string,
  keywords: string[] = [],
  query: string = ''
): BenchmarkPage[] {
  const kw = keywords[0] || pName;
  const kwLower = kw.toLowerCase();
  const pLower = pName.toLowerCase();
  const gLower = gName.toLowerCase();
  const combined = `${pLower} ${gLower} ${kwLower} ${query.toLowerCase()}`;

  const getRawPages = (): Array<Omit<BenchmarkPage, 'isSynthetic'>> => {
    // 1. Cybersecurity Group
    if (gName === 'Cybersecurity' || combined.includes('security') || combined.includes('soc') || combined.includes('siem') || combined.includes('sentinel') || combined.includes('zero trust')) {
    return [
      {
        rankIndex: 1,
        title: `TCS Cyber Defense Suite & Managed SOC Services - ${pName}`,
        uri: 'https://www.tcs.com/what-we-do/services/cybersecurity',
        domain: 'tcs.com',
        category: 'competitor',
        takeaway: 'Focuses on global enterprise SIEM monitoring; leaves out local Indian Tier-3 SOC analyst availability and practical CERT-In 6-hour reporting automation.'
      },
      {
        rankIndex: 2,
        title: `Infosys Cyber Next Platform & Managed Detection - ${pName}`,
        uri: 'https://www.infosys.com/services/cyber-security.html',
        domain: 'infosys.com',
        category: 'competitor',
        takeaway: 'Emphasizes proprietary platform licensing; lacks native Microsoft Sentinel, Defender XDR correlation, and multi-tenant Indian cost tiers.'
      },
      {
        rankIndex: 3,
        title: `Wipro CyberSecurists & Managed Threat Defense - ${pName}`,
        uri: 'https://www.wipro.com/cybersecurity/',
        domain: 'wipro.com',
        category: 'competitor',
        takeaway: 'Pitches multi-year transformation retainers for Fortune 500; ignores mid-market Indian enterprises needing rapid 2-week SOC onboarding.'
      },
      {
        rankIndex: 4,
        title: `HCLTech CyberSecurity Services & Zero Trust - ${pName}`,
        uri: 'https://www.hcltech.com/cybersecurity',
        domain: 'hcltech.com',
        category: 'competitor',
        takeaway: 'Standard global threat feed integration; lacks DPDP Act 2023 data fiduciary compliance blueprints and local audit support.'
      },
      {
        rankIndex: 5,
        title: `Tata Communications Managed Security & SASE Services`,
        uri: 'https://www.tatacommunications.com/services/security/',
        domain: 'tatacommunications.com',
        category: 'competitor',
        takeaway: 'Heavily network and perimeter-focused; lacks deep identity governance (Microsoft Entra PIM) and endpoint threat hunting.'
      },
      {
        rankIndex: 6,
        title: `LTIMindtree Cyber Security & Cloud Defense`,
        uri: 'https://www.ltimindtree.com/services/cyber-security/',
        domain: 'ltimindtree.com',
        category: 'competitor',
        takeaway: 'Generic threat assessment checklists without automated playbooks or guaranteed sub-15 minute MTTD SLAs.'
      },
      {
        rankIndex: 7,
        title: `Cloud4C Managed SOC & Cloud Threat Protection India`,
        uri: 'https://www.cloud4c.com/services/managed-security-services',
        domain: 'cloud4c.com',
        category: 'competitor',
        takeaway: 'Tool reseller positioning with basic L1 alerting; lacks proactive red-teaming and 24x7 India-based Cyber Defense Center (CDC) response.'
      },
      {
        rankIndex: 8,
        title: `Quick Heal Seqrite Enterprise Security Solutions`,
        uri: 'https://www.seqrite.com/',
        domain: 'seqrite.com',
        category: 'competitor',
        takeaway: 'Endpoint antivirus perspective; lacks cloud-native SIEM/SOAR scalability, identity isolation, and cloud workload protection.'
      },
      {
        rankIndex: 9,
        title: 'Microsoft Learn: Microsoft Sentinel Architecture & SIEM Best Practices',
        uri: 'https://learn.microsoft.com/en-us/azure/sentinel/sentinel-overview',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Prescriptive hyperscaler technical standards for log ingestion, automated SOAR playbooks, and cost-effective analytics rules.'
      },
      {
        rankIndex: 10,
        title: 'Microsoft Defender XDR Unified Security Operations Guide',
        uri: 'https://learn.microsoft.com/en-us/microsoft-365/security/defender/',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Cross-domain telemetry correlation connecting endpoints, identities, cloud apps, and emails to disrupt attacks in real time.'
      },
      {
        rankIndex: 11,
        title: 'Microsoft Entra Zero Trust Identity & Conditional Access Deployment Plan',
        uri: 'https://learn.microsoft.com/en-us/entra/identity/',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Architectural blueprint for phishing-resistant MFA, continuous access evaluation, and just-in-time Privileged Identity Management.'
      },
      {
        rankIndex: 12,
        title: 'Azure Security Benchmark (ASB) v3 for Sovereign India Regions',
        uri: 'https://learn.microsoft.com/en-us/security/benchmark/azure/',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Security baseline controls mapped to Central India (Pune) and South India (Chennai) sovereign cloud zones.'
      },
      {
        rankIndex: 13,
        title: 'Microsoft Threat Intelligence & South Asia Threat Landscape',
        uri: 'https://www.microsoft.com/en-us/security/business/threat-intelligence',
        domain: 'microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Active state-sponsored and cybercrime threat actor profiling targeting Indian manufacturing, banking, and critical infrastructure.'
      },
      {
        rankIndex: 14,
        title: 'CERT-In Cyber Security Directions under Section 70B (Mandatory 6-Hr Reporting)',
        uri: 'https://www.cert-in.org.in/',
        domain: 'cert-in.org.in',
        category: 'regulatory',
        takeaway: 'Statutory mandate requiring mandatory incident notification within 6 hours and 180-day secure system log maintenance.'
      },
      {
        rankIndex: 15,
        title: 'MeitY Digital Personal Data Protection (DPDP) Act 2023 Guidelines',
        uri: 'https://www.meity.gov.in/data-protection-framework',
        domain: 'meity.gov.in',
        category: 'regulatory',
        takeaway: 'Enforces strict data fiduciary obligations, principal rights, and penalties up to ₹250 crore for inadequate safeguards.'
      },
      {
        rankIndex: 16,
        title: 'RBI Cyber Security Framework & IT Governance Directions for Banks & NBFCs',
        uri: 'https://www.rbi.org.in/',
        domain: 'rbi.org.in',
        category: 'regulatory',
        takeaway: 'Requires board-level cyber metrics, continuous red-teaming, unannounced third-party audits, and sub-15 minute SOC escalations.'
      },
      {
        rankIndex: 17,
        title: 'SEBI Advisory on Cloud Security & Cyber Resilience for Financial Intermediaries',
        uri: 'https://www.sebi.gov.in/',
        domain: 'sebi.gov.in',
        category: 'regulatory',
        takeaway: 'Mandates sovereign encryption key custody, air-gapped immutable backup vaults, and quarterly external VAPT audits.'
      },
      {
        rankIndex: 18,
        title: 'Embee Cyber Defense Center (CDC) Operational Benchmark: Sub-15 Min MTTD',
        uri: 'https://embee.co.in/what-we-do/cybersecurity/',
        domain: 'embee.co.in',
        category: 'case_study',
        takeaway: 'Live Indian enterprise benchmark: 24x7x365 security monitoring protecting 200+ enterprise clients with 500+ certified engineers.'
      },
      {
        rankIndex: 19,
        title: 'Enterprise Case: Zero Trust Deployment for 12,000 Hybrid Users',
        uri: 'https://embee.co.in/case-studies/',
        domain: 'embee.co.in',
        category: 'case_study',
        takeaway: 'Eliminated lateral threat movements, consolidated 4 disparate endpoint agents into Microsoft Defender, and automated CERT-In compliance.'
      }
    ];
  }

  // 2. Modern Workplace Group
  if (gName === 'Modern Workplace' || combined.includes('copilot') || combined.includes('teams') || combined.includes('intune') || combined.includes('sharepoint') || combined.includes('exchange') || combined.includes('workplace')) {
    return [
      {
        rankIndex: 1,
        title: `Wipro Digital Workplace & Copilot Advisory - ${pName}`,
        uri: 'https://www.wipro.com/infrastructure/digital-workplace-services/',
        domain: 'wipro.com',
        category: 'competitor',
        takeaway: 'Focuses on massive global enterprise seat migrations; lacks pragmatic user adoption frameworks and Indian telecom compliance.'
      },
      {
        rankIndex: 2,
        title: `Infosys Wingspan & Modern Workplace Transformation - ${pName}`,
        uri: 'https://www.infosys.com/services/digital-workplace.html',
        domain: 'infosys.com',
        category: 'competitor',
        takeaway: 'Abstract digital workplace concepts; lacks tenant-level security assessments, data sanitization, and Copilot readiness indexing.'
      },
      {
        rankIndex: 3,
        title: `TCS Cognix for Workspace & Collaboration Services`,
        uri: 'https://www.tcs.com/what-we-do/services/cognitive-business-operations/cognix',
        domain: 'tcs.com',
        category: 'competitor',
        takeaway: 'Focuses on automated ticket routing; leaves out specialized Microsoft 365 license rightsizing and Indian PSTN calling setups.'
      },
      {
        rankIndex: 4,
        title: `HCLTech WorkPlace+ & Microsoft 365 Managed Services`,
        uri: 'https://www.hcltech.com/digital-workplace',
        domain: 'hcltech.com',
        category: 'competitor',
        takeaway: 'Standard desktop virtualization pitch; fails to provide hands-on executive enablement and departmental Copilot prompt playbooks.'
      },
      {
        rankIndex: 5,
        title: `Softcell Technologies Microsoft 365 & Security Services`,
        uri: 'https://www.softcell.com/',
        domain: 'softcell.com',
        category: 'competitor',
        takeaway: 'Licensing transaction partner model; lacks dedicated adoption specialists and post-deployment ROI measurement dashboards.'
      },
      {
        rankIndex: 6,
        title: `Team Computers Enterprise Modern Work & Collaboration`,
        uri: 'https://www.teamcomputers.com/',
        domain: 'teamcomputers.com',
        category: 'competitor',
        takeaway: 'Hardware and license bundling; lacks deep SharePoint taxonomy re-architecture and Purview data classification.'
      },
      {
        rankIndex: 7,
        title: `Redington Cloud Solutions & Microsoft Workplace`,
        uri: 'https://redingtongroup.com/india/',
        domain: 'redingtongroup.com',
        category: 'competitor',
        takeaway: 'Distributor-led fulfillment without end-to-end change management or specialized frontline worker enablement.'
      },
      {
        rankIndex: 8,
        title: `Microland Smart Workplace & Endpoint Management`,
        uri: 'https://www.microland.com/digital/digital-workplace',
        domain: 'microland.com',
        category: 'competitor',
        takeaway: 'Generic device management checklists; lacks granular BYOD conditional access policies aligned with Indian privacy rules.'
      },
      {
        rankIndex: 9,
        title: 'Microsoft 365 Copilot Architecture & Semantic Index Security Guide',
        uri: 'https://learn.microsoft.com/en-us/microsoft-365-copilot/microsoft-365-copilot-overview',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Official architecture explaining tenant boundaries, permissions inheritance, and preventing oversharing before deployment.'
      },
      {
        rankIndex: 10,
        title: 'Microsoft Teams Phone Operator Connect & Direct Routing Architecture',
        uri: 'https://learn.microsoft.com/en-us/microsoftteams/operator-connect-overview',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Cloud telephony topology integrating PSTN calling with Microsoft Teams while adhering to local regulatory constraints.'
      },
      {
        rankIndex: 11,
        title: 'Microsoft Intune Zero-Touch Endpoint Management & MAM Baselines',
        uri: 'https://learn.microsoft.com/en-us/mem/intune/fundamentals/',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Unified endpoint management for Windows, Android, and iOS ensuring data containment without personal privacy invasion.'
      },
      {
        rankIndex: 12,
        title: 'Microsoft Purview Data Security & Sensitivity Labels for M365',
        uri: 'https://learn.microsoft.com/en-us/purview/purview',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Automated labeling and DLP policies preventing sensitive corporate data from leaking into unapproved generative models.'
      },
      {
        rankIndex: 13,
        title: 'Microsoft Viva Employee Experience & Knowledge Management Guide',
        uri: 'https://learn.microsoft.com/en-us/viva/',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Analytics and communication architecture driving continuous digital tool engagement across distributed workforces.'
      },
      {
        rankIndex: 14,
        title: 'TRAI Telephony Interconnect Regulations & Toll Bypass Compliance in India',
        uri: 'https://www.trai.gov.in/',
        domain: 'trai.gov.in',
        category: 'regulatory',
        takeaway: 'Strict telecom directives forbidding the bridging of private enterprise IP networks with public PSTN networks to bypass toll charges.'
      },
      {
        rankIndex: 15,
        title: 'Department of Telecommunications (DoT) Unified License Guidelines for Enterprise VoIP',
        uri: 'https://dot.gov.in/',
        domain: 'dot.gov.in',
        category: 'regulatory',
        takeaway: 'Statutory compliance requirements for enterprise voice routing and location-based routing (LBR) inside Indian borders.'
      },
      {
        rankIndex: 16,
        title: 'MeitY DPDP Act 2023 Guidelines on Workplace Employee Data Privacy',
        uri: 'https://www.meity.gov.in/data-protection-framework',
        domain: 'meity.gov.in',
        category: 'regulatory',
        takeaway: 'Regulates corporate surveillance, MDM telemetry access, and employee consent mechanisms for personal mobile devices.'
      },
      {
        rankIndex: 17,
        title: 'CERT-In Advisory on Securing Remote Working & Collaboration Infrastructure',
        uri: 'https://www.cert-in.org.in/',
        domain: 'cert-in.org.in',
        category: 'regulatory',
        takeaway: 'Mandatory configuration baselines for corporate SaaS collaboration tools, session timeouts, and MFA enforcement.'
      },
      {
        rankIndex: 18,
        title: 'Embee Modern Work Track Record: Microsoft Partner of the Year 2024 (Modern Work)',
        uri: 'https://embee.co.in/awards/',
        domain: 'embee.co.in',
        category: 'case_study',
        takeaway: 'Recognized as Microsoft Modern Work Partner of the Year with 100,000+ active enterprise seats successfully migrated.'
      },
      {
        rankIndex: 19,
        title: 'Enterprise Copilot Adoption Study: 3.2x Productivity Gain for Indian Conglomerate',
        uri: 'https://embee.co.in/case-studies/',
        domain: 'embee.co.in',
        category: 'case_study',
        takeaway: 'Deployed 1,500 Copilot licenses with custom department prompt libraries, driving 87% weekly active tool adoption.'
      }
    ];
  }

  // 3. AI & Analytics Group
  if (gName === 'AI & Analytics' || combined.includes('fabric') || combined.includes('power bi') || combined.includes('analytics') || combined.includes('openai') || combined.includes('synapse') || combined.includes('lakehouse')) {
    return [
      {
        rankIndex: 1,
        title: `TCS Datom Data Governance & AI Transformation - ${pName}`,
        uri: 'https://www.tcs.com/what-we-do/services/data-and-analytics',
        domain: 'tcs.com',
        category: 'competitor',
        takeaway: 'Large-scale proprietary data maturity assessments; leaves out fast 30-day Microsoft Fabric Lakehouse proofs of value.'
      },
      {
        rankIndex: 2,
        title: `Infosys Topaz Generative AI Platform - ${pName}`,
        uri: 'https://www.infosys.com/services/generative-ai.html',
        domain: 'infosys.com',
        category: 'competitor',
        takeaway: 'Heavy bespoke platform marketing; lacks turnkey Azure OpenAI private tenant deployments with Indian sovereign data residency.'
      },
      {
        rankIndex: 3,
        title: `Wipro Holmes AI & Automation Solutions`,
        uri: 'https://www.wipro.com/analytics/',
        domain: 'wipro.com',
        category: 'competitor',
        takeaway: 'Focuses on legacy predictive modeling; ignores modern Unified OneLake architectures and Power BI Fabric capacity governance.'
      },
      {
        rankIndex: 4,
        title: `LTIMindtree Canvas AI & Data Engineering Services`,
        uri: 'https://www.ltimindtree.com/services/data-analytics/',
        domain: 'ltimindtree.com',
        category: 'competitor',
        takeaway: 'Multi-cloud data warehouse rehosting; lacks native Microsoft Fabric Featured Partner credentials and direct solution design.'
      },
      {
        rankIndex: 5,
        title: `Fractal Analytics Enterprise AI Services`,
        uri: 'https://fractal.ai/',
        domain: 'fractal.ai',
        category: 'competitor',
        takeaway: 'Pure-play data science consulting; lacks end-to-end Azure cloud infrastructure, network peering, and managed NOC support.'
      },
      {
        rankIndex: 6,
        title: `Tiger Analytics Advanced Analytics & AI`,
        uri: 'https://www.tigeranalytics.com/',
        domain: 'tigeranalytics.com',
        category: 'competitor',
        takeaway: 'Bespoke Python model building; lacks turnkey business user self-service BI governance and Power BI semantic modeling.'
      },
      {
        rankIndex: 7,
        title: `LatentView Analytics Business Insights Practice`,
        uri: 'https://www.latentview.com/',
        domain: 'latentview.com',
        category: 'competitor',
        takeaway: 'Marketing analytics orientation; misses deep SAP ERP and operational shop-floor data ingestion pipelines.'
      },
      {
        rankIndex: 8,
        title: `Hexaware Tensai Generative AI & Automation`,
        uri: 'https://hexaware.com/services/data-and-analytics/',
        domain: 'hexaware.com',
        category: 'competitor',
        takeaway: 'Standard automation buzzwords; lacks rigorous enterprise data sanitization and semantic index permission checks.'
      },
      {
        rankIndex: 9,
        title: 'Microsoft Fabric OneLake Architecture & Lakehouse Best Practices',
        uri: 'https://learn.microsoft.com/en-us/fabric/onelake/onelake-overview',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Unified SaaS data lake removing data copies, delta parquet standards, and shortcuts connecting multi-cloud sources.'
      },
      {
        rankIndex: 10,
        title: 'Azure OpenAI Service Enterprise Architecture & Private Networking',
        uri: 'https://learn.microsoft.com/en-us/azure/ai-services/openai/overview',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Architectural blueprint for private endpoints, customer-managed encryption keys, and zero model training on customer data.'
      },
      {
        rankIndex: 11,
        title: 'Power BI Enterprise Deployment & Fabric Capacity Governance Guide',
        uri: 'https://learn.microsoft.com/en-us/power-bi/guidance/',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Prescriptive models for semantic model reuse, Direct Lake mode performance, and workspace lifecycle management.'
      },
      {
        rankIndex: 12,
        title: 'Azure Synapse Analytics & Real-Time Intelligence Architecture',
        uri: 'https://learn.microsoft.com/en-us/azure/synapse-analytics/',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'High-concurrency data streaming and telemetry analytics handling millions of events per second.'
      },
      {
        rankIndex: 13,
        title: 'Microsoft Responsible AI Principles & AI Safety Guardrails',
        uri: 'https://www.microsoft.com/en-us/ai/responsible-ai',
        domain: 'microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Safety standards covering fairness, reliability, transparency, privacy, and automated content filtering.'
      },
      {
        rankIndex: 14,
        title: 'IndiaAI Mission Governance Framework & Enterprise Guidelines',
        uri: 'https://indiaai.gov.in/',
        domain: 'indiaai.gov.in',
        category: 'regulatory',
        takeaway: 'National guidelines promoting sovereign compute, ethical AI deployment, and safety benchmarks for Indian businesses.'
      },
      {
        rankIndex: 15,
        title: 'MeitY Advisory on Generative AI Models & Data Principal Protections',
        uri: 'https://www.meity.gov.in/',
        domain: 'meity.gov.in',
        category: 'regulatory',
        takeaway: 'Mandatory disclosures regarding synthetic content generation and prohibition against unauthorized training on citizen data.'
      },
      {
        rankIndex: 16,
        title: 'Reserve Bank of India (RBI) Guidance on AI/ML Applications in Financial Services',
        uri: 'https://www.rbi.org.in/',
        domain: 'rbi.org.in',
        category: 'regulatory',
        takeaway: 'Enforces algorithmic explainability, audit trails for automated credit/risk decisions, and data localization.'
      },
      {
        rankIndex: 17,
        title: 'SEBI Circular on AI/ML System Audits and Regulatory Reporting for Stock Brokers',
        uri: 'https://www.sebi.gov.in/',
        domain: 'sebi.gov.in',
        category: 'regulatory',
        takeaway: 'Mandatory half-yearly reporting on AI/ML usage, cybersecurity safeguards, and bias testing.'
      },
      {
        rankIndex: 18,
        title: 'Embee Featured Partner Benchmark: Microsoft Fabric Center of Excellence',
        uri: 'https://embee.co.in/what-we-do/ai-analytics/',
        domain: 'embee.co.in',
        category: 'case_study',
        takeaway: 'Recognized Microsoft Fabric Featured Partner delivering end-to-end lakehouse architectures for top Indian enterprises.'
      },
      {
        rankIndex: 19,
        title: 'Enterprise Manufacturing Supply Chain Dashboard Benchmark',
        uri: 'https://embee.co.in/case-studies/thermax',
        domain: 'embee.co.in',
        category: 'case_study',
        takeaway: 'Unified real-time IoT factory telemetry with Power BI Direct Lake mode, slashing reporting latency from 6 hours to 4 minutes.'
      }
    ];
  }

  // 4. Business Applications Group
  if (gName === 'Business Applications' || combined.includes('dynamics') || combined.includes('crm') || combined.includes('power apps') || combined.includes('hrms') || combined.includes('octane') || combined.includes('erp')) {
    return [
      {
        rankIndex: 1,
        title: `Sonata Software Microsoft Dynamics 365 Practice - ${pName}`,
        uri: 'https://www.sonata-software.com/services/dynamics-365',
        domain: 'sonata-software.com',
        category: 'competitor',
        takeaway: 'Pitches long-term global consulting retainers; lacks agile deployment templates and integrated HRMS IP like Octane.'
      },
      {
        rankIndex: 2,
        title: `Hexaware Enterprise Applications & Dynamics 365 - ${pName}`,
        uri: 'https://hexaware.com/services/enterprise-applications/',
        domain: 'hexaware.com',
        category: 'competitor',
        takeaway: 'Focuses on global offshore support; omits Indian statutory GST e-Invoicing integration and local payroll localization.'
      },
      {
        rankIndex: 3,
        title: `Birlasoft Digital Enterprise Solutions & CRM`,
        uri: 'https://www.birlasoft.com/services/enterprise-solutions',
        domain: 'birlasoft.com',
        category: 'competitor',
        takeaway: 'Heavy manufacturing focus; lacks deep Power Platform Center of Excellence (CoE) citizen developer governance.'
      },
      {
        rankIndex: 4,
        title: `Alletec Microsoft Dynamics Implementation Services India`,
        uri: 'https://www.alletec.com/',
        domain: 'alletec.com',
        category: 'competitor',
        takeaway: 'Traditional ERP customizer; lacks modern Microsoft 365 Copilot in Dynamics CRM integration and automated testing.'
      },
      {
        rankIndex: 5,
        title: `KPMG India Microsoft Business Applications Practice`,
        uri: 'https://home.kpmg/in/en/home/services.html',
        domain: 'kpmg.com',
        category: 'competitor',
        takeaway: 'High-cost advisory firm; lacks day-to-day managed support and cost-effective technical execution teams.'
      },
      {
        rankIndex: 6,
        title: `PwC India Dynamics 365 & Power Platform Consulting`,
        uri: 'https://www.pwc.in/',
        domain: 'pwc.in',
        category: 'competitor',
        takeaway: 'Strategic management consulting orientation; leaves out rapid 6-week turnaround for departmental process apps.'
      },
      {
        rankIndex: 7,
        title: `Tata Technologies Enterprise Business Systems`,
        uri: 'https://www.tatatechnologies.com/',
        domain: 'tatatechnologies.com',
        category: 'competitor',
        takeaway: 'Automotive CAD/PLM focus; misses cross-industry finance, supply chain, and human capital workflows.'
      },
      {
        rankIndex: 8,
        title: `Yash Technologies Enterprise Transformation & CRM`,
        uri: 'https://www.yash.com/',
        domain: 'yash.com',
        category: 'competitor',
        takeaway: 'Multi-vendor system integrator; lacks deep direct Microsoft partner specializations and proprietary HRMS integration.'
      },
      {
        rankIndex: 9,
        title: 'Microsoft Dynamics 365 FastTrack Implementation Framework',
        uri: 'https://learn.microsoft.com/en-us/dynamics365/fasttrack/',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Official engineering-led methodology ensuring solution architecture validation, performance baselining, and smooth go-live.'
      },
      {
        rankIndex: 10,
        title: 'Microsoft Power Platform Center of Excellence (CoE) Starter Kit Architecture',
        uri: 'https://learn.microsoft.com/en-us/power-platform/guidance/coe/starter-kit',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Governance framework providing DLP policies, tenant app catalogs, telemetry, and citizen developer guardrails.'
      },
      {
        rankIndex: 11,
        title: 'Microsoft Dataverse Enterprise Security & Role-Based Access Control',
        uri: 'https://learn.microsoft.com/en-us/power-apps/maker/data-platform/data-platform-intro',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Granular column-level, row-level, and hierarchical security architecture for mission-critical enterprise applications.'
      },
      {
        rankIndex: 12,
        title: 'Dynamics 365 Finance & Operations Localisation for India (GST & TDS)',
        uri: 'https://learn.microsoft.com/en-us/dynamics365/finance/localizations/india/india-tax-engine',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Official Microsoft configuration rules for India Tax Engine (GTE), E-Way bills, and E-Invoicing integration.'
      },
      {
        rankIndex: 13,
        title: 'Power Automate Enterprise Process Mining & RPA Best Practices',
        uri: 'https://learn.microsoft.com/en-us/power-automate/process-mining-overview',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Bottleneck discovery and automated workflow triggers connecting legacy desktop software with modern cloud APIs.'
      },
      {
        rankIndex: 14,
        title: 'Goods and Services Tax Network (GSTN) E-Invoicing Statutory Directives',
        uri: 'https://einvoice1.gst.gov.in/',
        domain: 'einvoice1.gst.gov.in',
        category: 'regulatory',
        takeaway: 'Mandatory statutory requirement for real-time B2B e-invoice generation and IRN validation via official NIC APIs.'
      },
      {
        rankIndex: 15,
        title: 'Ministry of Corporate Affairs (MCA) Audit Trail / Edit Log Mandate',
        uri: 'https://www.mca.gov.in/',
        domain: 'mca.gov.in',
        category: 'regulatory',
        takeaway: 'Indian Companies Act requirement mandating immutable, un-tamperable audit trails for every financial transaction in ERP.'
      },
      {
        rankIndex: 16,
        title: 'Employees Provident Fund Organisation (EPFO) Statutory Payroll Compliance',
        uri: 'https://www.epfindia.gov.in/',
        domain: 'epfindia.gov.in',
        category: 'regulatory',
        takeaway: 'Statutory calculations, Electronic Challan cum Return (ECR) generation, and PF trust accounting rules.'
      },
      {
        rankIndex: 17,
        title: 'MeitY DPDP Act 2023 Employee Records & Consent Governance Guidelines',
        uri: 'https://www.meity.gov.in/data-protection-framework',
        domain: 'meity.gov.in',
        category: 'regulatory',
        takeaway: 'Standards for handling corporate payroll data, employee biometric markers, and HRMS access logs legally.'
      },
      {
        rankIndex: 18,
        title: 'Embee Octane HRMS Benchmark: 100,000+ Active Users Managed',
        uri: 'https://embee.co.in/what-we-do/business-applications/',
        domain: 'embee.co.in',
        category: 'case_study',
        takeaway: 'Proprietary enterprise HRMS IP delivering full statutory Indian payroll, leave, attendance, and performance management.'
      },
      {
        rankIndex: 19,
        title: 'Enterprise Case: Automated Order-to-Cash Workflow with Dynamics 365',
        uri: 'https://embee.co.in/case-studies/',
        domain: 'embee.co.in',
        category: 'case_study',
        takeaway: 'Accelerated invoice processing by 74% and eliminated manual entry errors across 35 manufacturing plant locations.'
      }
    ];
  }

  // 5. Enterprise Platforms Group (SAP, Linux, Oracle)
  if (gName === 'Enterprise Platforms' || combined.includes('sap') || combined.includes('hana') || combined.includes('linux') || combined.includes('red hat') || combined.includes('oracle')) {
    return [
      {
        rankIndex: 1,
        title: `TCS SAP Practice & Cloud Migration Services - ${pName}`,
        uri: 'https://www.tcs.com/what-we-do/services/enterprise-applications/sap',
        domain: 'tcs.com',
        category: 'competitor',
        takeaway: 'Focuses on multi-year global enterprise S/4HANA transformations; lacks agility and direct senior architect access for Indian mid-market.'
      },
      {
        rankIndex: 2,
        title: `Infosys SAP S/4HANA Cloud Transformation - ${pName}`,
        uri: 'https://www.infosys.com/services/sap.html',
        domain: 'infosys.com',
        category: 'competitor',
        takeaway: 'Pitches proprietary pre-configured templates; lacks deep Azure M-series infrastructure tuning and sub-minute HANA failover design.'
      },
      {
        rankIndex: 3,
        title: `Wipro SAP S/4HANA CoE & Managed Platform Services`,
        uri: 'https://www.wipro.com/applications/sap/',
        domain: 'wipro.com',
        category: 'competitor',
        takeaway: 'Global system integrator focus; omits local Indian plant-level zero-downtime cutover guarantees during manufacturing cycles.'
      },
      {
        rankIndex: 4,
        title: `HCLTech Enterprise Applications & SAP on Cloud`,
        uri: 'https://www.hcltech.com/enterprise-applications/sap',
        domain: 'hcltech.com',
        category: 'competitor',
        takeaway: 'Large infrastructure outsourcing model; lacks combined SAP Gold Partner and Microsoft Solutions Partner dual expertise.'
      },
      {
        rankIndex: 5,
        title: `NTT DATA SAP Practice India`,
        uri: 'https://www.nttdata.com/global/en/services/sap',
        domain: 'nttdata.com',
        category: 'competitor',
        takeaway: 'Heavy datacentre hosting focus; lacks cloud-native FinOps governance and Azure NetApp Files IOPS optimization.'
      },
      {
        rankIndex: 6,
        title: `Bristlecone Supply Chain & SAP Modernization`,
        uri: 'https://www.bcone.com/',
        domain: 'bcone.com',
        category: 'competitor',
        takeaway: 'Pure supply chain niche; misses comprehensive enterprise landing zones, Active Directory integration, and network peering.'
      },
      {
        rankIndex: 7,
        title: `Kaar Technologies SAP Services India`,
        uri: 'https://www.kaartech.com/',
        domain: 'kaartech.com',
        category: 'competitor',
        takeaway: 'Standard SAP implementation partner; lacks multi-tier Azure cloud architectural specializations and 24x7 NOC management.'
      },
      {
        rankIndex: 8,
        title: `Highbar Technocrat SAP Infrastructure Practice`,
        uri: 'https://highbartechnocrat.com/',
        domain: 'highbartechnocrat.com',
        category: 'competitor',
        takeaway: 'Construction industry orientation; lacks cross-industry manufacturing and BFSI mission-critical SAP expertise.'
      },
      {
        rankIndex: 9,
        title: 'Microsoft Azure Architecture Center: SAP S/4HANA on Azure Reference Guide',
        uri: 'https://learn.microsoft.com/en-us/azure/architecture/reference-architectures/sap/sap-s4hana',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Official high-availability blueprint using Pacemaker clustering, Azure NetApp Files, and sub-second disk IOPS tuning.'
      },
      {
        rankIndex: 10,
        title: 'SAP on Azure Certified Infrastructure: M-series & Mv2 Virtual Machines',
        uri: 'https://learn.microsoft.com/en-us/azure/virtual-machines/workloads/sap/hana-vm-operations',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Certified hardware baselines supporting multi-terabyte in-memory SAP HANA production workloads in Central India.'
      },
      {
        rankIndex: 11,
        title: 'SUSE & Red Hat Enterprise Linux for SAP Solutions on Azure',
        uri: 'https://learn.microsoft.com/en-us/azure/virtual-machines/workloads/sap/high-availability-guides-suse',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Enterprise Linux clustering, fencing agents (SBD/Azure Fence Agent), and kernel parameter tuning for database resilience.'
      },
      {
        rankIndex: 12,
        title: 'SAP Landscape Management (LaMa) on Microsoft Azure Guide',
        uri: 'https://learn.microsoft.com/en-us/azure/virtual-machines/workloads/sap/sap-lama-overview',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Automated system cloning, refresh, and non-disruptive disaster recovery testing for mission-critical SAP estates.'
      },
      {
        rankIndex: 13,
        title: 'Oracle Database on Azure Virtual Machines Architecture',
        uri: 'https://learn.microsoft.com/en-us/azure/virtual-machines/workloads/oracle/oracle-overview',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Oracle Data Guard configuration, premium SSD v2 storage striping, and licensing compliance optimization.'
      },
      {
        rankIndex: 14,
        title: 'Ministry of Corporate Affairs (MCA) Companies (Accounts) Rules (Audit Trail)',
        uri: 'https://www.mca.gov.in/',
        domain: 'mca.gov.in',
        category: 'regulatory',
        takeaway: 'Strict statutory mandate requiring software to retain complete, unalterable log trails for every accounting entry.'
      },
      {
        rankIndex: 15,
        title: 'MeitY DPDP Act 2023 Guidelines for Core Enterprise ERP Data',
        uri: 'https://www.meity.gov.in/data-protection-framework',
        domain: 'meity.gov.in',
        category: 'regulatory',
        takeaway: 'Mandatory data localization, principal rights indexing, and access controls for customer and vendor ERP master data.'
      },
      {
        rankIndex: 16,
        title: 'National Critical Information Infrastructure Protection Centre (NCIIPC) Guidelines',
        uri: 'https://nciipc.gov.in/',
        domain: 'nciipc.gov.in',
        category: 'regulatory',
        takeaway: 'Security controls and physical/logical isolation standards for enterprise systems designated as critical infrastructure.'
      },
      {
        rankIndex: 17,
        title: 'CERT-In Incident Response Guidelines for Enterprise Database Systems',
        uri: 'https://www.cert-in.org.in/',
        domain: 'cert-in.org.in',
        category: 'regulatory',
        takeaway: 'Prescribed procedures for isolating compromised database clusters and reporting forensic evidence within statutory timelines.'
      },
      {
        rankIndex: 18,
        title: 'Embee SAP Gold Partner Track Record: Cement Corporation of India Cutover',
        uri: 'https://embee.co.in/case-studies/cci',
        domain: 'embee.co.in',
        category: 'case_study',
        takeaway: 'Migrated mission-critical SAP Business One onto Azure with zero data loss and uninterrupted manufacturing dispatch operations.'
      },
      {
        rankIndex: 19,
        title: 'Hy-Tech Manufacturing Real-Time SAP HANA Cloud Deployment',
        uri: 'https://embee.co.in/case-studies/hy-tech',
        domain: 'embee.co.in',
        category: 'case_study',
        takeaway: 'Upgraded infrastructure to certified Azure M-series VMs, accelerating monthly financial closing by 68%.'
      }
    ];
  }

  // 6. IT Infrastructure & Managed Services Group
  if (gName === 'IT Infrastructure & Managed Services' || combined.includes('managed') || combined.includes('noc') || combined.includes('network') || combined.includes('sd-wan') || combined.includes('hybrid') || combined.includes('infrastructure')) {
    return [
      {
        rankIndex: 1,
        title: `Microland Managed IT Infrastructure Services - ${pName}`,
        uri: 'https://www.microland.com/digital/digital-infrastructure',
        domain: 'microland.com',
        category: 'competitor',
        takeaway: 'Traditional L1/L2 ticketing helpdesk; lacks proactive architectural governance and direct integration with customer FinOps goals.'
      },
      {
        rankIndex: 2,
        title: `Netmagic / NTT India Hybrid Infrastructure Management - ${pName}`,
        uri: 'https://services.global.ntt/en-us/solutions/cloud-infrastructure',
        domain: 'services.global.ntt',
        category: 'competitor',
        takeaway: 'Colocation datacentre orientation; lacks deep native Microsoft Azure Lighthouse multi-tenant management and modernization.'
      },
      {
        rankIndex: 3,
        title: `CtrlS Managed Datacentre & Cloud Operations`,
        uri: 'https://www.ctrls.in/managed-services',
        domain: 'ctrls.in',
        category: 'competitor',
        takeaway: 'Hosting-centric SLAs; lacks holistic hybrid cloud orchestration using Azure Arc across edge and manufacturing plants.'
      },
      {
        rankIndex: 4,
        title: `Sify Technologies Managed Cloud & Network Services`,
        uri: 'https://www.sifytechnologies.com/cloud-services/',
        domain: 'sifytechnologies.com',
        category: 'competitor',
        takeaway: 'Telecom bandwidth vendor approach; lacks deep Microsoft 17 advanced specializations and workload-level optimization.'
      },
      {
        rankIndex: 5,
        title: `Nxtra by Airtel Managed Cloud Infrastructure`,
        uri: 'https://www.nxtra.com/',
        domain: 'nxtra.com',
        category: 'competitor',
        takeaway: 'Datacentre facility lease model; omits deep application monitoring, database performance tuning, and DevOps pipeline support.'
      },
      {
        rankIndex: 6,
        title: `Tata Communications Managed Cloud & SD-WAN`,
        uri: 'https://www.tatacommunications.com/services/cloud/',
        domain: 'tatacommunications.com',
        category: 'competitor',
        takeaway: 'Focuses on international MPLS circuits; misses agile, localized Indian enterprise cloud infrastructure consulting.'
      },
      {
        rankIndex: 7,
        title: `CMS IT Services Infrastructure Management`,
        uri: 'https://www.cmsitservices.com/',
        domain: 'cmsitservices.com',
        category: 'competitor',
        takeaway: 'On-premises hardware maintenance roots; lacks cloud-native SRE automation, container orchestration, and Sentinel integration.'
      },
      {
        rankIndex: 8,
        title: `Trimax IT Managed Network & Cloud Services`,
        uri: 'https://www.trimaxit.com/',
        domain: 'trimaxit.com',
        category: 'competitor',
        takeaway: 'Government infrastructure focus; lacks commercial enterprise agility and transparent quarterly review cadences.'
      },
      {
        rankIndex: 9,
        title: 'Azure Lighthouse Architecture for Cross-Tenant MSP Management',
        uri: 'https://learn.microsoft.com/en-us/azure/lighthouse/overview',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Secure delegated resource management allowing 24x7 NOC engineers to manage customer workloads without sharing permanent passwords.'
      },
      {
        rankIndex: 10,
        title: 'Azure Arc Hybrid Infrastructure Management & Governance Guide',
        uri: 'https://learn.microsoft.com/en-us/azure/azure-arc/overview',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Unified control plane applying Azure Policy, Defender, and monitoring across on-premises VMware, edge servers, and multi-cloud.'
      },
      {
        rankIndex: 11,
        title: 'Azure Monitor & Log Analytics Enterprise Observability Architecture',
        uri: 'https://learn.microsoft.com/en-us/azure/azure-monitor/overview',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Proactive metrics, distributed tracing, automated alert routing, and custom dashboards for end-to-end visibility.'
      },
      {
        rankIndex: 12,
        title: 'Azure ExpressRoute & Redundant Peering Architecture for India',
        uri: 'https://learn.microsoft.com/en-us/azure/expressroute/expressroute-introduction',
        domain: 'learn.microsoft.com',
        category: 'hyperscaler',
        takeaway: 'Private dedicated network connections bypassing public internet with active-active redundant circuits across Pune and Mumbai.'
      },
      {
        rankIndex: 13,
        title: 'ITIL 4 Service Management & Continual Service Improvement Standard',
        uri: 'https://www.axelos.com/certifications/itil-service-management',
        domain: 'axelos.com',
        category: 'hyperscaler',
        takeaway: 'Global standard for incident, problem, change, and service request governance aligned with business value.'
      },
      {
        rankIndex: 14,
        title: 'Telecommunications Act 2023 & Leased Line Regulatory Guidelines',
        uri: 'https://dot.gov.in/',
        domain: 'dot.gov.in',
        category: 'regulatory',
        takeaway: 'Statutory rules governing private enterprise data networks, leased lines, and cross-office interconnection.'
      },
      {
        rankIndex: 15,
        title: 'CERT-In System Log Maintenance & Retention Directives (180 Days)',
        uri: 'https://www.cert-in.org.in/',
        domain: 'cert-in.org.in',
        category: 'regulatory',
        takeaway: 'Mandatory requirement for NOC/SOC providers to maintain timestamped, synchronized, and tamper-proof operational logs.'
      },
      {
        rankIndex: 16,
        title: 'MeitY Cloud Service Provider (CSP) Accreditation & Audit Standards',
        uri: 'https://www.meity.gov.in/',
        domain: 'meity.gov.in',
        category: 'regulatory',
        takeaway: 'Security and operational norms governing cloud infrastructure hosting Indian public sector and regulated enterprise data.'
      },
      {
        rankIndex: 17,
        title: 'Bureau of Indian Standards (BIS) IS/ISO/IEC 20000 IT Service Management',
        uri: 'https://www.bis.gov.in/',
        domain: 'bis.gov.in',
        category: 'regulatory',
        takeaway: 'National standards defining service level agreements, capacity management, and business relationship management.'
      },
      {
        rankIndex: 18,
        title: 'Embee 24x7 NOC/SOC Track Record: 500+ Certified Engineers Across 10+ Hubs',
        uri: 'https://embee.co.in/what-we-do/managed-services/',
        domain: 'embee.co.in',
        category: 'case_study',
        takeaway: '35+ years of operational governance delivering 99.95% uptime SLAs for 3,500+ Indian enterprise customers.'
      },
      {
        rankIndex: 19,
        title: 'Enterprise Manufacturing High-Availability Infrastructure Benchmark',
        uri: 'https://embee.co.in/case-studies/',
        domain: 'embee.co.in',
        category: 'case_study',
        takeaway: 'Consolidated multi-location factory infrastructure into unified Azure Arc managed landing zone, reducing unplanned outages by 92%.'
      }
    ];
  }

  // 7. Default: Cloud Solutions (FinOps, Disaster Recovery, Migration, AKS, Infrastructure)
  return [
    {
      rankIndex: 1,
      title: `TCS Cloud Practice & Azure Consulting Services - ${pName}`,
      uri: 'https://www.tcs.com/what-we-do/services/cloud',
      domain: 'tcs.com',
      category: 'competitor',
      takeaway: 'Focuses on global enterprise multi-year migrations; leaves out local Indian mid-market agility and direct access to senior solution architects.'
    },
    {
      rankIndex: 2,
      title: `Infosys Cobalt Cloud Enterprise Services - ${pName}`,
      uri: 'https://www.infosys.com/services/cloud-cobalt.html',
      domain: 'infosys.com',
      category: 'competitor',
      takeaway: 'Emphasizes proprietary catalog tools; omits deep Microsoft 17 advanced specializations and contractual sub-hour cutover guarantees.'
    },
    {
      rankIndex: 3,
      title: `Wipro FullStride Cloud Services & Migration`,
      uri: 'https://www.wipro.com/cloud/',
      domain: 'wipro.com',
      category: 'competitor',
      takeaway: 'Pitches massive transformation retainers; ignores specific DPDP Act 2023 compliance nuances and local Indian data sovereignty.'
    },
    {
      rankIndex: 4,
      title: `HCLTech CloudSMART & Azure Engineering Solutions`,
      uri: 'https://www.hcltech.com/cloud',
      domain: 'hcltech.com',
      category: 'competitor',
      takeaway: 'Highlights global delivery centers; lacks dedicated Indian night-shift SOC and local regional data center low-latency connectivity.'
    },
    {
      rankIndex: 5,
      title: `LTIMindtree Infinity Cloud Operations & Modernization`,
      uri: 'https://www.ltimindtree.com/solutions/cloud/',
      domain: 'ltimindtree.com',
      category: 'competitor',
      takeaway: 'Generic workload rehosting templates; fails to address Indian GST billing and local currency optimization.'
    },
    {
      rankIndex: 6,
      title: `Cloud4C Managed Azure & Disaster Recovery Services`,
      uri: 'https://www.cloud4c.com/services/azure-managed-services',
      domain: 'cloud4c.com',
      category: 'competitor',
      takeaway: 'Standard SLA claims; lacks direct Microsoft Partner of the Year credentials and proprietary enterprise IP.'
    },
    {
      rankIndex: 7,
      title: `Minfy Cloud Migration & FinOps Practice`,
      uri: 'https://minfytech.com/services/cloud-finops',
      domain: 'minfytech.com',
      category: 'competitor',
      takeaway: 'Basic third-party cost tooling; lacks continuous FinOps Foundation showback governance and tagging automation.'
    },
    {
      rankIndex: 8,
      title: `Microland Managed Azure Infrastructure & Migration`,
      uri: 'https://www.microland.com/digital/cloud',
      domain: 'microland.com',
      category: 'competitor',
      takeaway: 'Generic L1/L2 ticketing helpdesk; lacks proactive architectural reviews and Azure Hybrid Benefit TCO modeling.'
    },
    {
      rankIndex: 9,
      title: 'Microsoft Learn: Azure Well-Architected Framework Guide',
      uri: 'https://learn.microsoft.com/en-us/azure/well-architected/',
      domain: 'learn.microsoft.com',
      category: 'hyperscaler',
      takeaway: 'Official architectural pillars for reliability, security, cost optimization, operational excellence, and performance.'
    },
    {
      rankIndex: 10,
      title: 'Microsoft Cloud Adoption Framework (CAF) for Azure India',
      uri: 'https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/',
      domain: 'learn.microsoft.com',
      category: 'hyperscaler',
      takeaway: 'Standard cloud migration methodologies, landing zone blueprints, and governance matrices.'
    },
    {
      rankIndex: 11,
      title: 'Microsoft Azure India Regions & Sovereign Architecture',
      uri: 'https://azure.microsoft.com/en-in/explore/global-infrastructure/geographies/#india',
      domain: 'azure.microsoft.com',
      category: 'hyperscaler',
      takeaway: 'Central India (Pune), South India (Chennai), and West India (Mumbai) latency, availability zones, and pairing benchmarks.'
    },
    {
      rankIndex: 12,
      title: 'FinOps Foundation & Azure Cost Management Framework Guide',
      uri: 'https://learn.microsoft.com/en-us/azure/cost-management-billing/finops/',
      domain: 'learn.microsoft.com',
      category: 'hyperscaler',
      takeaway: 'Inform, Optimise, and Operate lifecycle standards for enterprise cloud financial governance.'
    },
    {
      rankIndex: 13,
      title: 'Azure Site Recovery Dual-Region Sovereign Disaster Recovery Architecture',
      uri: 'https://learn.microsoft.com/en-us/azure/site-recovery/',
      domain: 'learn.microsoft.com',
      category: 'hyperscaler',
      takeaway: 'Recovery Time Objective (RTO) and Recovery Point Objective (RPO) technical specifications and replication runbooks.'
    },
    {
      rankIndex: 14,
      title: 'MeitY Digital Personal Data Protection (DPDP) Act 2023 Framework',
      uri: 'https://www.meity.gov.in/data-protection-framework',
      domain: 'meity.gov.in',
      category: 'regulatory',
      takeaway: 'Mandates strict data fiduciary obligations, principal rights, and local sovereign data handling.'
    },
    {
      rankIndex: 15,
      title: 'Reserve Bank of India (RBI) Master Direction on IT Outsourcing & BCDR (2023)',
      uri: 'https://www.rbi.org.in/',
      domain: 'rbi.org.in',
      category: 'regulatory',
      takeaway: 'Enforces stringent business continuity, sub-4-hour RTO, and unannounced audit rights for Indian financial entities.'
    },
    {
      rankIndex: 16,
      title: 'SEBI Advisory on Cloud Security & BCDR Framework for Market Entities',
      uri: 'https://www.sebi.gov.in/',
      domain: 'sebi.gov.in',
      category: 'regulatory',
      takeaway: 'Mandatory quarterly disaster recovery drills and sovereign encryption key management.'
    },
    {
      rankIndex: 17,
      title: 'CERT-In Cyber Security Directions under Section 70B (Log Retention & Reporting)',
      uri: 'https://www.cert-in.org.in/',
      domain: 'cert-in.org.in',
      category: 'regulatory',
      takeaway: 'Requires mandatory 6-hour incident reporting and 180-day secure system log maintenance.'
    },
    {
      rankIndex: 18,
      title: 'Embee Track Record: Thermax Enterprise IoT & Cloud Transformation Case',
      uri: 'https://embee.co.in/case-studies/thermax',
      domain: 'embee.co.in',
      category: 'case_study',
      takeaway: 'Modernized enterprise workloads on Azure, establishing IoT telemetry visibility, scalability, and 28% cost savings.'
    },
    {
      rankIndex: 19,
      title: 'Cement Corporation of India (CCI) Core ERP Azure Cutover Benchmark',
      uri: 'https://embee.co.in/case-studies/cci',
      domain: 'embee.co.in',
      category: 'case_study',
      takeaway: 'Zero-downtime migration of mission-critical SAP Business One on Azure with uninterrupted cement dispatches.'
    },
    {
      rankIndex: 20,
      title: 'Hy-Tech Manufacturing Real-Time Cloud Deployment & HANA Modernization',
      uri: 'https://embee.co.in/case-studies/hy-tech',
      domain: 'embee.co.in',
      category: 'case_study',
      takeaway: 'Streamlined manufacturing shop-floor data availability with 99.9% uptime on Azure certified compute.'
    }
  ];
  };

  return getRawPages().map(bp => ({
    ...bp,
    isSynthetic: true
  }));
}

// Helper to construct 14 to 16 in-depth strategic input points tailored to Solution Group and Pillar
export function buildDetailedInputPoints(
  pName: string,
  gName: string,
  keywords: string[] = [],
  baseGaps: string[] = []
): ResearchInsightPoint[] {
  const kw = keywords[0] || pName;

  if (gName === 'Cybersecurity') {
    return [
      {
        category: 'Competitor Blindspot',
        point: 'Top 15-20 competitor pages pitch generic global threat intelligence feeds without offering an India-based 24x7 SOC or sub-15 minute detection SLAs.',
        copywritingApplication: 'Feature Embee Software\'s certified 24x7x365 Cyber Defense Center (CDC) in India with sub-15-minute MTTD in the Hero section and trust badges.'
      },
      {
        category: 'Competitor Blindspot',
        point: 'Competing MSSPs treat compliance as a post-hoc checkbox, omitting automated workflows for CERT-In 6-hour mandatory breach notifications.',
        copywritingApplication: 'Detail turnkey CERT-In incident notification playbooks and 180-day forensic log retention in the Architecture & Deliverables sections.'
      },
      {
        category: 'Competitor Blindspot',
        point: 'Competitors push disconnected point security tools (antivirus, perimeter firewalls) creating alert fatigue and visibility blindspots.',
        copywritingApplication: 'Position unified Microsoft Sentinel SIEM/SOAR and Defender XDR correlation to deliver single-pane-of-glass threat visibility.'
      },
      {
        category: 'Competitor Blindspot',
        point: 'Incumbent pages fail to offer structured red-teaming or executive cyber risk scoring for board presentations.',
        copywritingApplication: 'Highlight Embee\'s comprehensive 2-week Vulnerability & Threat Assessment (VAPT) with prioritized executive risk matrices.'
      },
      {
        category: 'Buyer Anxiety & Objection',
        point: 'Fear of internal business disruption or false-positive lockouts during strict Zero Trust and MFA rollouts.',
        copywritingApplication: 'Reassure buyers in the FAQ with progressive conditional access staging, persona-based policies, and zero user lockouts.'
      },
      {
        category: 'Buyer Anxiety & Objection',
        point: 'Anxiety over hidden licensing and ingestion costs when streaming petabytes of firewall and server logs into a SIEM.',
        copywritingApplication: 'Emphasize Sentinel cost optimization, basic log tiering, and data transformation rules that slash ingestion fees by up to 40%.'
      },
      {
        category: 'Buyer Anxiety & Objection',
        point: 'Reluctance to trust external vendors with root admin credentials and sensitive corporate telemetry.',
        copywritingApplication: 'Highlight Azure Lighthouse delegated role-based access control where customers retain master key custody and access auditing.'
      },
      {
        category: 'Indian Regulatory Reality',
        point: 'DPDP Act 2023 mandates strict data fiduciary accountability, consent management, and penalties up to ₹250 crore for breaches.',
        copywritingApplication: 'Position DPDP Act readiness blueprints as an integral component of the security architecture in the What You Receive section.'
      },
      {
        category: 'Indian Regulatory Reality',
        point: 'CERT-In directives require mandatory reporting within 6 hours of incident detection and synchronized NTP logging.',
        copywritingApplication: 'Frame automated CERT-In logging as a native operational feature rather than an expensive manual consulting exercise.'
      },
      {
        category: 'Indian Regulatory Reality',
        point: 'RBI and SEBI mandate quarterly external VAPT audits, air-gapped immutable backup vaults, and sub-4-hour recovery for financial entities.',
        copywritingApplication: 'State adherence to RBI and SEBI cloud resilience circulars in the Compliance and Proof sections.'
      },
      {
        category: 'Technical Architecture & SLA',
        point: 'Sub-15 minute Mean Time to Detect (MTTD) and sub-30 minute Mean Time to Respond (MTTR) backed by 500+ certified Indian engineers.',
        copywritingApplication: 'Anchor the "Outcomes We Deliver" section with quantified operational response speed metrics.'
      },
      {
        category: 'Technical Architecture & SLA',
        point: 'Sovereign Microsoft Azure India data residency in Central India (Pune) and South India (Chennai) ensuring zero extraterritorial exposure.',
        copywritingApplication: 'Specify local Indian data centers in the Hero strip and Technical Architecture section.'
      },
      {
        category: 'Technical Architecture & SLA',
        point: '35+ years of Indian IT governance with 17 Microsoft advanced specializations and dedicated senior threat hunters.',
        copywritingApplication: 'Use Embee\'s 35+ year track record to anchor the "What to Look for in a Partner" comparative evaluation table.'
      },
      {
        category: 'Value Hook',
        point: 'Consolidate 5+ fragmented security agents into the native Microsoft Defender stack, slashing licensing costs by 35% while enhancing posture.',
        copywritingApplication: 'Weave this vendor consolidation benefit directly into the Problem & Solution sections.'
      }
    ];
  }

  if (gName === 'Modern Workplace') {
    return [
      {
        category: 'Competitor Blindspot',
        point: 'Competitors focus exclusively on Microsoft 365 license resale without addressing semantic index permissions or data sanitization before Copilot rollout.',
        copywritingApplication: 'Promote Embee\'s Copilot Readiness Assessment to prevent accidental oversharing of executive salaries or board minutes.'
      },
      {
        category: 'Competitor Blindspot',
        point: 'Competing pages ignore Indian telecom regulations (TRAI and DoT) governing VoIP and PSTN interconnectivity for Microsoft Teams Phone.',
        copywritingApplication: 'Highlight 100% TRAI-compliant Teams Phone Operator Connect and Direct Routing without toll bypass penalties in the Platform section.'
      },
      {
        category: 'Competitor Blindspot',
        point: 'Competitors rely on generic video tutorials for training, leading to dismal 20% to 30% user adoption rates after 90 days.',
        copywritingApplication: 'Detail Embee\'s department-specific prompt libraries, champion networks, and hands-on executive coaching in the Deliverables section.'
      },
      {
        category: 'Competitor Blindspot',
        point: 'Vendor pages offer basic Intune enrollment without granular BYOD data containment or mobile application management (MAM).',
        copywritingApplication: 'Emphasize zero-touch Intune deployment with MAM protecting corporate data on personal devices without wiping private photos.'
      },
      {
        category: 'Buyer Anxiety & Objection',
        point: 'CIOs worry that deploying generative AI will leak confidential customer data into public training models.',
        copywritingApplication: 'Reassure buyers in the FAQ that Microsoft Copilot inherits tenant permissions and never uses enterprise data for foundational model training.'
      },
      {
        category: 'Buyer Anxiety & Objection',
        point: 'Fear of employee pushback and productivity dips during complex Exchange or tenant-to-tenant email migrations.',
        copywritingApplication: 'Guarantee zero-downtime cutovers performed over weekends with automated mailbox synchronization and legacy archive migration.'
      },
      {
        category: 'Buyer Anxiety & Objection',
        point: 'Concern over unbudgeted Microsoft 365 licensing costs with unused licenses sitting idle across business units.',
        copywritingApplication: 'Highlight continuous licensing rightsizing that eliminates unassigned or duplicated licenses, reducing monthly spend by 15% to 25%.'
      },
      {
        category: 'Indian Regulatory Reality',
        point: 'TRAI and DoT regulations prohibit the bridging of PSTN and VoIP calls in enterprise networks without licensed telecom gateway routing.',
        copywritingApplication: 'Explain compliant voice routing architecture directly in the Technical Architecture section.'
      },
      {
        category: 'Indian Regulatory Reality',
        point: 'DPDP Act 2023 mandates strict controls over employee personal data on company-managed mobile devices.',
        copywritingApplication: 'Detail Intune MAM policies that safeguard company documents without accessing personal files or location data.'
      },
      {
        category: 'Technical Architecture & SLA',
        point: 'Seamless single-sign-on (SSO) with Microsoft Entra ID, passwordless authentication, and sub-second Conditional Access evaluations.',
        copywritingApplication: 'Feature Entra identity governance in the Technical Specifications section.'
      },
      {
        category: 'Technical Architecture & SLA',
        point: '2024 Microsoft India & South Asia Partner of the Year (Modern Work) with 100,000+ active enterprise seats migrated.',
        copywritingApplication: 'Lead with this official Microsoft recognition in the Hero and Proof sections.'
      },
      {
        category: 'Technical Architecture & SLA',
        point: '99.9% uptime SLA backed by 24x7 Indian workplace support and dedicated technical account managers.',
        copywritingApplication: 'Include uptime commitments in the "Outcomes We Deliver" section.'
      },
      {
        category: 'Value Hook',
        point: 'Achieve 3.2x productivity acceleration across finance, sales, and HR teams through bespoke Copilot workflows.',
        copywritingApplication: 'Incorporate this ROI benchmark into the Hero sub-headline and Executive Summary.'
      }
    ];
  }

  // If live competitor gaps were discovered by Gemini, prioritize them directly as insight points
  if (baseGaps && baseGaps.length >= 3) {
    const livePoints: ResearchInsightPoint[] = baseGaps.map((gap, idx) => ({
      category: idx < 4 ? 'Competitor Blindspot' : 'Buyer Anxiety & Objection',
      point: gap,
      copywritingApplication: `Address this real competitor omission directly in the ${idx % 2 === 0 ? 'Business Challenges' : 'Partner Evaluation'} section.`
    }));

    livePoints.push(
      {
        category: 'Buyer Anxiety & Objection',
        point: `Concern over change management friction and employee adoption bottlenecks during ${pName} rollout.`,
        copywritingApplication: 'Highlight structured user enablement, practical training sessions, and executive alignment.'
      },
      {
        category: 'Technical Architecture & SLA',
        point: 'Architecture built on Microsoft Well-Architected Framework principles with verified enterprise security baselines.',
        copywritingApplication: 'Itemize technical governance and configuration artifacts in the Deliverables section.'
      },
      {
        category: 'Value Hook',
        point: '40+ years of enterprise IT experience, 18 Microsoft Advanced Specializations, and 2024 Microsoft Partner of the Year credentials.',
        copywritingApplication: 'Feature verified partner credentials in the Hero trust strip and Closing proof section.'
      }
    );

    return livePoints;
  }

  // Default / Cloud Solutions / General fallback points
  return [
    {
      category: 'Competitor Blindspot',
      point: `Top competitor pages for ${pName} rely on generic service templates and software licensing, lacking end-to-end consulting and hands-on change management.`,
      copywritingApplication: 'Position Embee Software as a business-first transformation partner that guides teams from initial assessment through production adoption.'
    },
    {
      category: 'Competitor Blindspot',
      point: 'Competing vendor pages pitch disconnected point solutions without integrating with existing enterprise business applications and databases.',
      copywritingApplication: 'Emphasize seamless integration with existing core enterprise systems, CRM/ERP platforms, and data repositories.'
    },
    {
      category: 'Competitor Blindspot',
      point: 'Incumbent IT firms assign rotating junior support teams, creating execution friction and slow incident resolution.',
      copywritingApplication: 'Highlight direct access to 500+ certified engineers with dedicated account leads in the partner evaluation table.'
    },
    {
      category: 'Competitor Blindspot',
      point: 'Competing pages present abstract marketing promises without clear, predictable implementation timelines.',
      copywritingApplication: 'Feature Embee Software\'s structured architecture discovery and roadmap with executive alignment, risk scoring, and a phased execution plan.'
    },
    {
      category: 'Buyer Anxiety & Objection',
      point: 'Fear of operational disruption and lost team productivity during solution rollout.',
      copywritingApplication: 'Reassure readers in the delivery framework with parallel pilot testing, phased rollouts, and verified rollback runbooks.'
    },
    {
      category: 'Buyer Anxiety & Objection',
      point: 'Anxiety over low user adoption and paying for software licenses that employees rarely utilize.',
      copywritingApplication: 'Detail role-based user training, practical prompt and usage guidance, and continuous adoption tracking.'
    },
    {
      category: 'Buyer Anxiety & Objection',
      point: 'Concern over vendor lock-in and opaque proprietary architectures that limit future flexibility.',
      copywritingApplication: 'Reiterate commitment to open standards, Microsoft Well-Architected Framework principles, and full customer IP ownership.'
    },
    {
      category: 'Buyer Anxiety & Objection',
      point: 'Reluctance to modernize due to internal team skill gaps and operational bandwidth constraints.',
      copywritingApplication: 'Highlight comprehensive knowledge transfer, administrative documentation, and co-managed operational support.'
    },
    {
      category: 'Indian Regulatory Reality',
      point: 'Enterprise governance requirements for sensitive corporate records, role-based access control, and audit logging.',
      copywritingApplication: 'Incorporate data security safeguards and compliance blueprints into the scope and architecture sections.'
    },
    {
      category: 'Technical Architecture & SLA',
      point: 'Architecture built on Microsoft Well-Architected Framework principles with clear security perimeters.',
      copywritingApplication: 'Itemize concrete technical deliverables and configuration blueprints in the What You Receive section.'
    },
    {
      category: 'Technical Architecture & SLA',
      point: '40+ years of enterprise IT leadership with 18 Microsoft Advanced Specializations and 2024 Partner of the Year recognition.',
      copywritingApplication: 'Anchor the Proof section and partner evaluation table with verified enterprise credentials.'
    },
    {
      category: 'Value Hook',
      point: 'Measurable time-to-value acceleration and lower ongoing operational overhead through structured delivery and proven accelerators.',
      copywritingApplication: 'Highlight verified operational outcomes and efficiency gains in the Outcomes section.'
    }
  ];
}

export function extractPointsFromRawResearch(rawText: string, pName: string): ResearchInsightPoint[] {
  if (!rawText || rawText.length < 50) return [];

  const points: ResearchInsightPoint[] = [];

  const extractBullets = (regex: RegExp) => {
    const match = rawText.match(regex);
    if (!match) return [];
    return match[1]
      .split('\n')
      .map(l => l.replace(/^[-*•0-9.]+\s*/, '').trim())
      .filter(l => l.length > 15);
  };

  const gaps = extractBullets(/CRITICAL GAPS & OMISSIONS:?([\s\S]*?)(?=BUYER ANXIETIES|TECHNICAL ARCHITECTURE|RESEARCH BRIEF|$)/i);
  const anxieties = extractBullets(/BUYER ANXIETIES & OBJECTIONS:?([\s\S]*?)(?=TECHNICAL ARCHITECTURE|RESEARCH BRIEF|$)/i);
  const techPoints = extractBullets(/TECHNICAL ARCHITECTURE & SLAS:?([\s\S]*?)(?=RESEARCH BRIEF|$)/i);
  const themes = extractBullets(/TOP THEMES COVERED:?([\s\S]*?)(?=CRITICAL GAPS|$)/i);

  gaps.forEach((pt, idx) => {
    points.push({
      category: 'Competitor Blindspot',
      point: pt,
      copywritingApplication: `Address this competitor omission directly in the ${idx % 2 === 0 ? 'Business Challenges' : 'Partner Evaluation'} section.`
    });
  });

  anxieties.forEach(pt => {
    points.push({
      category: 'Buyer Anxiety & Objection',
      point: pt,
      copywritingApplication: 'Directly address and resolve this customer anxiety in the Outcomes and FAQ sections.'
    });
  });

  techPoints.forEach(pt => {
    points.push({
      category: 'Technical Architecture & SLA',
      point: pt,
      copywritingApplication: 'Incorporate these architecture benchmarks into the Delivery Framework and Deliverables sections.'
    });
  });

  themes.forEach(pt => {
    points.push({
      category: 'Competitor Blindspot',
      point: pt,
      copywritingApplication: 'Use to establish baseline solution context and differentiate Embee Software.'
    });
  });

  return points;
}

// Master enrichment function to ensure real grounding data is preserved or fallback to synthetic benchmark pages
export function enrichResearchWithBenchmarkPagesAndPoints(
  raw: any,
  pName: string,
  gName: string,
  keywords: string[] = [],
  query?: string
): ResearchOutput {
  const searchQuery = query || raw.query || `${pName} ${gName} India`;
  const rawSources: { title: string; uri: string }[] = raw.searchSources || [];
  const hasLiveSources = Array.isArray(rawSources) && rawSources.length > 0;
  const researchIsLive = Boolean(hasLiveSources);

  // Build strategic input points: prioritize actual live points extracted from Gemini research
  const liveExtracted = extractPointsFromRawResearch(raw.rawText || '', pName);
  const detailedInputPoints: ResearchInsightPoint[] = liveExtracted.length >= 6
    ? liveExtracted
    : buildDetailedInputPoints(pName, gName, keywords, raw.competitorGaps);

  let searchSources: { title: string; uri: string }[] = [];
  let benchmarkPages: BenchmarkPage[] = [];

  if (hasLiveSources) {
    // If raw.searchSources exists and has at least one entry, use raw.searchSources as returned searchSources
    searchSources = rawSources;
    benchmarkPages = rawSources.map((src, idx) => {
      let domain = '';
      try {
        domain = new URL(src.uri.startsWith('http') ? src.uri : `https://${src.uri}`).hostname.replace(/^www\./, '');
      } catch {
        domain = 'web';
      }
      const lowerUri = src.uri.toLowerCase();
      let category: BenchmarkPage['category'] = 'competitor';
      if (lowerUri.includes('microsoft.com') || lowerUri.includes('azure') || lowerUri.includes('aws') || lowerUri.includes('google.com')) {
        category = 'hyperscaler';
      } else if (lowerUri.includes('rbi.org') || lowerUri.includes('cert-in') || lowerUri.includes('meity') || lowerUri.includes('trai.gov') || lowerUri.includes('sebi.gov')) {
        category = 'regulatory';
      } else if (lowerUri.includes('case-stud') || lowerUri.includes('customer') || lowerUri.includes('story')) {
        category = 'case_study';
      }

      return {
        rankIndex: idx + 1,
        title: src.title || `Live Search Source ${idx + 1}`,
        uri: src.uri,
        domain,
        category,
        takeaway: `Cited live source via Google Search Grounding for ${pName} enterprise analysis in India.`,
        isSynthetic: false
      };
    });
  } else {
    // Only use benchmarkPages when raw.searchSources is empty or missing
    const rawBenchmarkPages = buildBenchmarkPages(pName, gName, keywords, searchQuery);
    benchmarkPages = rawBenchmarkPages.map(bp => ({
      ...bp,
      isSynthetic: true
    }));
    searchSources = benchmarkPages.map(bp => ({
      title: bp.title,
      uri: bp.uri
    }));
  }

  // Ensure competitor gaps has at least 6-8 sharp bullets
  const competitorGaps = raw.competitorGaps && raw.competitorGaps.length >= 6
    ? raw.competitorGaps
    : [
        ...(raw.competitorGaps || []),
        ...detailedInputPoints
          .filter(p => p.category === 'Competitor Blindspot')
          .map(p => p.point)
      ].slice(0, 8);

  // Ensure ranking themes has at least 5 clear bullets
  const rankingThemes = raw.rankingThemes && raw.rankingThemes.length >= 5
    ? raw.rankingThemes
    : [
        ...(raw.rankingThemes || []),
        `Standard ${pName} service overviews without localized Indian enterprise SLAs`,
        'Generic pricing calculators and high-level marketing buzzwords disconnected from production governance'
      ].slice(0, 5);

  const pagesAnalyzedCount = searchSources.length;

  return {
    query: searchQuery,
    summary: raw.summary || (researchIsLive
      ? `Real-time search landscape analysis for "${searchQuery}" across ${pagesAnalyzedCount} live citations.`
      : `Template competitive landscape analysis for "${searchQuery}" across ${pagesAnalyzedCount} template references.`),
    rankingThemes,
    competitorGaps,
    searchSources,
    benchmarkPages,
    detailedInputPoints,
    pagesAnalyzedCount,
    totalPointsCount: detailedInputPoints.length,
    rawText: raw.rawText || `Research across ${pagesAnalyzedCount} sources for ${pName}.`,
    isQuotaLimited: raw.isQuotaLimited ?? false,
    researchIsLive
  };
}

export function generateDomainResearch(
  pillarName?: string,
  solutionGroup?: string,
  keywords?: string[],
  query?: string,
  platforms?: string[],
  sections?: string[]
): ResearchOutput {
  const pName = pillarName || 'Enterprise Cloud & IT Solutions';
  const gName = solutionGroup || 'Cloud Solutions';
  const kList = keywords && keywords.length > 0 ? keywords : [`${pName} services`, 'Enterprise IT India'];
  const searchQuery = query || `${pName} ${gName} India`;
  const raw = getRawDomainResearch(pName, gName, kList, searchQuery, platforms, sections);
  return enrichResearchWithBenchmarkPagesAndPoints(raw, pName, gName, kList, searchQuery);
}
