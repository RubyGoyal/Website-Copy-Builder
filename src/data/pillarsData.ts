import { PillarData, CaseStudy, PromptConfig } from '../types';

export const ALL_PILLARS: PillarData[] = [
  // 1. CLOUD SOLUTIONS (6 Pillars)
  {
    g: "Cloud Solutions",
    p: "Cloud Advisory, Assessment & Azure Landing Zones",
    s: "Iqbal Baliwala and Aman Singhal",
    sec: [
      "Cloud Advisory & Architectural Consulting",
      "Cloud Assessment & Readiness Workshop",
      "Azure Landing Zone Design & Governance"
    ],
    pl: [
      "Microsoft Azure",
      "Azure Landing Zones",
      "Azure Arc",
      "Azure Resource Manager / Bicep",
      "Terraform",
      "Azure Policy"
    ],
    a: [
      "Azure Well-Architected and Migration Assessment",
      "Azure Landing Zone Assessment",
      "Cloud Cost Optimisation Assessment",
      "Zero Trust Architecture Review"
    ],
    k: [
      "Azure consulting services",
      "Azure advisory services",
      "Azure landing zone consulting",
      "Microsoft Azure consulting India",
      "Cloud assessment services"
    ],
    cs: [
      {
        c: "Cement Corporation of India (CCI)",
        h: "Cement Corporation of India Modernizes Operations with SAP Business One and Octane HRMS on Azure Cloud, Achieving Unified Management and Enhanced Visibility",
        m: ["Unified multi-location operations across cement manufacturing facilities", "Zero unplanned disruption during core ERP cutover"],
        q: null
      },
      {
        c: "MRF",
        h: "Embee Empowers 6K+ Dealers of MRF Tyres with a Customized Dealer Portal Application Built on Azure Cloud with Intelligent Search and Discovery Capabilities",
        m: ["Empowered 6,000+ dealers nationwide", "High-concurrency catalogue search and automated ordering"],
        q: null
      }
    ]
  },
  {
    g: "Cloud Solutions",
    p: "Cloud Migration & Modernization (VMware Exit, Windows/SQL EOS)",
    s: "Iqbal Baliwala and Aman Singhal",
    sec: [
      "VMware to Azure Migration Accelerator",
      "Windows Server & SQL Server EOS Modernization",
      "Database Modernization to Azure Managed Instances",
      "Application Containerization & Modernization"
    ],
    pl: [
      "Microsoft Azure",
      "Azure Migrate",
      "Azure VMware Solution (AVS)",
      "Azure SQL Managed Instance",
      "Azure Kubernetes Service (AKS)",
      "Azure App Service"
    ],
    a: [
      "Azure Migration Assessment",
      "VMware Exit & TCO Assessment",
      "Application Modernisation Assessment",
      "Windows and SQL EOS Modernization Assessment"
    ],
    k: [
      "Azure migration services India",
      "VMware exit Azure",
      "SQL Server end of support migration",
      "Windows Server EOS Azure modernization",
      "Cloud migration partner India"
    ],
    cs: [
      {
        c: "Thermax",
        h: "Thermax, an Energy Industry Leader, Migrated to the Azure Cloud for Improved Visibility, Cost Optimization, and Workloads Modernization",
        m: ["Modernised IoT application infrastructure on Microsoft Azure", "Zero downtime workload cutover across mission-critical instances"],
        q: "The collaboration with Thermax to modernize their IoT application infrastructure on Azure stands as a testament to our expertise in cloud transformations."
      },
      {
        c: "Hy-Tech",
        h: "Hy-Tech Streamlines Manufacturing Operations and Boosts Real-Time Data Availability with SAP Business One HANA on Azure",
        m: ["Real-time data availability for plant operations", "Zero data loss during SAP HANA cutover"],
        q: null
      }
    ]
  },
  {
    g: "Cloud Solutions",
    p: "DevOps, GitHub & Cloud-Native Engineering (AKS)",
    s: "Iqbal Baliwala and Aman Singhal",
    sec: [
      "Kubernetes & AKS Architecture",
      "GitHub Enterprise & Actions CI/CD",
      "GitHub Copilot for Enterprise Developers",
      "Infrastructure as Code & GitOps"
    ],
    pl: [
      "Azure Kubernetes Service (AKS)",
      "GitHub Enterprise",
      "GitHub Actions",
      "GitHub Copilot",
      "Terraform / Bicep",
      "Azure Container Registry"
    ],
    a: [
      "Application Modernisation Assessment",
      "DevOps Maturity & Toolchain Assessment",
      "Kubernetes Health and Cost Review"
    ],
    k: [
      "DevOps consulting services India",
      "Azure Kubernetes consulting",
      "GitHub Enterprise partner India",
      "Cloud-native application modernization",
      "AKS managed services"
    ],
    cs: [
      {
        c: "MRF",
        h: "Embee Empowers 6K+ Dealers of MRF Tyres with a Customized Dealer Portal Application Built on Azure Cloud",
        m: ["Accelerated build and deployment pipelines by 60%", "Unified containerized portal serving nationwide dealer network"],
        q: null
      }
    ]
  },
  {
    g: "Cloud Solutions",
    p: "Backup, Business Continuity & Disaster Recovery",
    s: "Iqbal Baliwala and Aman Singhal",
    sec: [
      "Azure Site Recovery (ASR) Implementation",
      "Immutable Cloud Backup & Ransomware Isolation",
      "Cross-Region Disaster Recovery Architecture",
      "RTO/RPO SLA Testing & Drills"
    ],
    pl: [
      "Azure Backup",
      "Azure Site Recovery",
      "Azure Archive Storage",
      "Azure NetApp Files",
      "Microsoft Defender for Cloud"
    ],
    a: [
      "DR Readiness Assessment",
      "Business Continuity Maturity Assessment",
      "Backup and Ransomware Resilience Review"
    ],
    k: [
      "Azure disaster recovery services",
      "Business continuity consulting India",
      "Cloud backup and recovery",
      "Azure Site Recovery implementation",
      "Immutable cloud backup DPDP"
    ],
    cs: [
      {
        c: "Cement Corporation of India (CCI)",
        h: "Cement Corporation of India Modernizes Operations with SAP Business One and Octane HRMS on Azure Cloud",
        m: ["Sub-hour RTO and automated database failovers across Azure India regions", "100% data integrity across all disaster drills"],
        q: null
      }
    ]
  },
  {
    g: "Cloud Solutions",
    p: "Cloud Optimisation & FinOps",
    s: "Iqbal Baliwala and Aman Singhal",
    sec: [
      "Azure FinOps Governance & Tagging Baselines",
      "Rightsizing & Idle Resource Elimination",
      "Reserved Instance & Savings Plan Portfolio Optimization",
      "Continuous Cost Anomaly Detection"
    ],
    pl: [
      "Azure Cost Management",
      "Azure Advisor",
      "Microsoft Fabric FinOps Hub",
      "Power BI FinOps Dashboards"
    ],
    a: [
      "Azure Cost Optimisation Assessment",
      "FinOps Maturity Assessment",
      "Azure Licensing and Hybrid Benefit Audit"
    ],
    k: [
      "Azure FinOps services India",
      "Cloud cost optimization consulting",
      "Azure cloud spend reduction",
      "FinOps advisory Microsoft Azure",
      "Cloud cost governance India"
    ],
    cs: [
      {
        c: "Thermax",
        h: "Thermax Migrated to Azure for Improved Visibility, Cost Optimization, and Workload Modernization",
        m: ["25-35% ongoing compute cost savings through continuous optimization", "Zero performance impact on critical workloads"],
        q: "Witnessing the tangible benefits in scalability, efficiency, and cost-saving for Thermax has been incredible."
      }
    ]
  },
  {
    g: "Cloud Solutions",
    p: "Managed Azure Services (24x7)",
    s: "Iqbal Baliwala and Aman Singhal",
    sec: [
      "24x7x365 Infrastructure NOC & Monitoring",
      "Automated Patching, Backup & Health Auditing",
      "Incident Management & Tier-3 Escalation Support",
      "Continuous Compliance & Security Hardening"
    ],
    pl: [
      "Microsoft Azure",
      "Azure Monitor",
      "Azure Arc",
      "Microsoft Sentinel",
      "Azure Lighthouse"
    ],
    a: [
      "Azure Health & SLA Assessment",
      "Cloud Operations Readiness Review",
      "Well-Architected Review"
    ],
    k: [
      "Managed Azure services India",
      "24x7 Azure NOC support",
      "Managed cloud operations partner",
      "Azure infrastructure management services",
      "Azure MSP India"
    ],
    cs: [
      {
        c: "Hy-Tech",
        h: "Hy-Tech Streamlines Manufacturing Operations with SAP Business One HANA on Azure",
        m: ["24x7 enterprise uptime across manufacturing plants", "Sub-15 minute response time SLA"],
        q: null
      }
    ]
  },

  // 2. COPILOT & AGENTIC AI (6 Pillars)
  {
    g: "Copilot & Agentic AI",
    p: "Copilot & AI Strategy Advisory",
    s: "Nirajkumar Pandey",
    sec: [
      "AI Strategy, Advisory, and Executive Envisioning",
      "Copilot Readiness, Security, and Licensing Advisory",
      "Copilot Envisioning Workshop and Proof of Value",
      "Adoption and change management enablement",
      "Microsoft Purview DSPM and data remediation",
      "Enterprise ERP and cross-platform grounding",
      "Agentic AI architecture, latency, and model governance"
    ],
    pl: [
      "Microsoft 365 Copilot",
      "Copilot Studio",
      "Microsoft Purview DSPM",
      "Microsoft Graph Connectors",
      "Microsoft Entra ID"
    ],
    a: [
      "Copilot & AI Readiness Assessment",
      "Microsoft 365 Tenant Health & Security Assessment",
      "Copilot Business Case & PoV Assessment"
    ],
    k: [
      "Microsoft 365 Copilot consulting India",
      "Copilot strategy advisory",
      "Copilot readiness assessment India",
      "Microsoft AI Solutions partner",
      "Enterprise Copilot adoption advisory"
    ],
    cs: [
      {
        c: "Greenlam Industries Limited",
        h: "Greenlam Industries Limited Fortifies Security Posture and Optimizes Costs with Microsoft Security Solutions",
        m: ["Established strict data governance and identity baseline prior to AI enablement", "Eliminated over-sharing risks across SharePoint and Teams"],
        q: null
      }
    ]
  },
  {
    g: "Copilot & Agentic AI",
    p: "Microsoft 365 Copilot Deployment & Enablement",
    s: "Nirajkumar Pandey",
    sec: [
      "M365 Copilot Technical Rollout & Tenant Configuration",
      "App-by-App Enablement (Teams, Word, Excel, PowerPoint, Outlook)",
      "Copilot Chat Secure Enterprise Onboarding",
      "Licensing Provisioning & Network Performance Optimization"
    ],
    pl: [
      "Microsoft 365 Copilot",
      "Microsoft Teams",
      "Microsoft Outlook",
      "Word, Excel, PowerPoint",
      "Microsoft Purview"
    ],
    a: [
      "Copilot Deployment Readiness Assessment",
      "Tenant Technical Prerequisites Audit",
      "Employee Experience Assessment"
    ],
    k: [
      "Microsoft Copilot deployment partner India",
      "M365 Copilot implementation services",
      "Copilot rollout accelerator",
      "Microsoft 365 Copilot setup services"
    ],
    cs: [
      {
        c: "Perfetti Van Melle India",
        h: "Perfetti Van Melle India reduces material dispatch approval time by 35% and saves $17,000 annually with Microsoft Solutions",
        m: ["Rapid multi-site rollout with zero user friction", "35% faster processing workflows"],
        q: null
      }
    ]
  },
  {
    g: "Copilot & Agentic AI",
    p: "Copilot Adoption, Governance & Data Readiness",
    s: "Nirajkumar Pandey",
    sec: [
      "Information Hygiene & Over-Sharing Elimination",
      "Microsoft Purview DSPM & Sensitivity Labeling",
      "Role-Based Champion Networks & Prompt Engineering Labs",
      "Copilot Consumption Governance & ROI Tracking"
    ],
    pl: [
      "Microsoft Purview DSPM",
      "Microsoft Viva Insights",
      "Copilot Dashboard",
      "SharePoint Advanced Management"
    ],
    a: [
      "Copilot Adoption & Data Readiness Assessment",
      "Data Governance & Over-sharing Review",
      "Prompt Maturity & ROI Assessment"
    ],
    k: [
      "Copilot adoption services India",
      "Copilot data readiness Purview",
      "Copilot change management training",
      "AI governance Microsoft 365"
    ],
    cs: [
      {
        c: "SBI Life",
        h: "SBI Life Insurance Transforms Digital Workplace with Microsoft 365, Enhancing Collaboration and Security for 24,000+ Employees",
        m: ["Role-based training and adoption curriculum across 24,000 employees", "Zero regulatory exposure across sensitive financial customer data"],
        q: null
      }
    ]
  },
  {
    g: "Copilot & Agentic AI",
    p: "Agentic AI & Copilot Studio",
    s: "Nirajkumar Pandey",
    sec: [
      "Autonomous Copilot Studio Agent Architecture",
      "Enterprise System Grounding (SAP, Salesforce, SQL)",
      "Multi-Agent Workflow Orchestration & Human-in-the-Loop",
      "Agent Guardrails, Latency & Security Policies"
    ],
    pl: [
      "Microsoft Copilot Studio",
      "Power Platform",
      "Azure AI Foundry",
      "Microsoft Graph Connectors",
      "Dataverse"
    ],
    a: [
      "Agent Design & Governance Assessment",
      "Copilot Studio Use Case Feasibility Review",
      "Agentic AI Architecture Review"
    ],
    k: [
      "Copilot Studio agent development India",
      "Agentic AI enterprise consulting",
      "Autonomous AI agents Microsoft",
      "Custom Copilot Studio agents",
      "AI agent orchestration India"
    ],
    cs: [
      {
        c: "Godrej",
        h: "Godrej Transforms Document Management with AI-Powered Document Quest Bot, Reducing Search Time by 72%",
        m: ["Reduced search time by 72% with enterprise conversational AI", "Saved 20-30 minutes per user daily"],
        q: null
      }
    ]
  },
  {
    g: "Copilot & Agentic AI",
    p: "GitHub Copilot & Engineering Productivity",
    s: "Nirajkumar Pandey",
    sec: [
      "GitHub Copilot Enterprise Deployment & Policy Configuration",
      "Developer Onboarding & Secure Prompt Best Practices",
      "CI/CD Integration & Automated Code Reviews",
      "Code Quality, Telemetry & Velocity Measurement"
    ],
    pl: [
      "GitHub Copilot Enterprise",
      "GitHub Enterprise Cloud",
      "Visual Studio / VS Code",
      "Azure DevOps"
    ],
    a: [
      "Developer Productivity & AI Tooling Assessment",
      "GitHub Copilot Security & IP Protection Review",
      "Software Engineering Modernization Audit"
    ],
    k: [
      "GitHub Copilot partner India",
      "GitHub Copilot enterprise implementation",
      "Engineering productivity consulting",
      "AI developer tools rollout"
    ],
    cs: [
      {
        c: "MRF",
        h: "Embee Empowers 6K+ Dealers of MRF Tyres with Custom Portal Built on Azure",
        m: ["50% faster feature releases using modern development practices", "High-concurrency portal performance"],
        q: null
      }
    ]
  },
  {
    g: "Copilot & Agentic AI",
    p: "Managed Copilot & Agent Lifecycle Services",
    s: "Nirajkumar Pandey",
    sec: [
      "Continuous Agent Performance & Latency Monitoring",
      "Prompt Drift Detection & Knowledge Base Re-indexing",
      "Agent Access Governance & Model Risk Audits",
      "Tier-3 Technical Support for Custom Copilot Connectors"
    ],
    pl: [
      "Microsoft Copilot Studio",
      "Microsoft 365 Copilot",
      "Microsoft Purview Audit",
      "Power Platform Admin Center"
    ],
    a: [
      "AI Agent Managed Operations Review",
      "Copilot Lifecycle & Consumption Audit",
      "Model Risk and Security Governance Assessment"
    ],
    k: [
      "Managed Copilot lifecycle services",
      "Copilot Studio managed support India",
      "AI agent maintenance partner",
      "Enterprise Copilot operations support"
    ],
    cs: [
      {
        c: "Perfetti Van Melle EMEA",
        h: "Perfetti Van Melle EMEA Digitizes Freight Shipment Planning with Microsoft Power Platform, Saving $14K Annually",
        m: ["Ongoing automation lifecycle management across 10+ factory sites", "Zero downtime during quarterly platform updates"],
        q: null
      }
    ]
  },

  // 3. DATA & AI (6 Pillars)
  {
    g: "Data & AI",
    p: "Data & AI Strategy and Advisory",
    s: "Tapas",
    sec: [
      "Enterprise Data Estate Discovery & Vision",
      "Data Governance & Sovereign Compliance Roadmap",
      "Modern Data Platform Architectural Blueprint",
      "AI Use Case Discovery & Value Prioritization Matrix"
    ],
    pl: [
      "Microsoft Fabric",
      "Azure Databricks",
      "Azure Synapse",
      "Microsoft Purview",
      "Power BI"
    ],
    a: [
      "Data Estate Modernization Assessment",
      "AI Readiness & Use Case Prioritization Assessment",
      "Data Governance & Purview Review"
    ],
    k: [
      "Data and AI strategy consulting India",
      "Enterprise data advisory services",
      "Microsoft Fabric strategy partner",
      "Data modernization roadmap",
      "AI use case discovery"
    ],
    cs: [
      {
        c: "Cement Corporation of India (CCI)",
        h: "Cement Corporation of India Modernizes Operations with Unified Management on Azure Cloud",
        m: ["Unified multi-plant telemetry across manufacturing locations", "Executive analytics delivered to leadership in real time"],
        q: null
      }
    ]
  },
  {
    g: "Data & AI",
    p: "Data Engineering & Modernization (Microsoft Fabric, Azure Databricks)",
    s: "Tapas",
    sec: [
      "Lakehouse & Medallion Architecture Implementation",
      "Legacy Data Warehouse to Microsoft Fabric Migration",
      "Batch & Real-Time Streaming Data Pipelines",
      "OneLake Storage Unification & Data Mesh Design"
    ],
    pl: [
      "Microsoft Fabric",
      "OneLake",
      "Azure Databricks",
      "Azure Data Factory",
      "Delta Lake",
      "Spark"
    ],
    a: [
      "Microsoft Fabric Migration Assessment",
      "Data Pipeline & Lakehouse Health Assessment",
      "Legacy Warehouse Modernization Review"
    ],
    k: [
      "Microsoft Fabric consulting India",
      "Azure Databricks consulting partner",
      "Data engineering services India",
      "Lakehouse modernization Microsoft Fabric",
      "OneLake implementation services"
    ],
    cs: [
      {
        c: "Hy-Tech",
        h: "Hy-Tech Streamlines Manufacturing Operations and Boosts Real-Time Data Availability with SAP Business One HANA on Azure",
        m: ["Real-time data ingestion for manufacturing performance telemetry", "Single unified data model eliminating reporting silos"],
        q: null
      }
    ]
  },
  {
    g: "Data & AI",
    p: "Advanced Analytics & Business Intelligence (Power BI)",
    s: "Tapas",
    sec: [
      "Executive Power BI Dashboards & Semantic Models",
      "Direct Lake Connectivity on Microsoft Fabric",
      "Self-Service BI Governance & Workspace Management",
      "Predictive Analytics & Forecasting Models"
    ],
    pl: [
      "Power BI",
      "Power BI Premium / Fabric Capacity",
      "DAX / Power Query",
      "Azure Analysis Services"
    ],
    a: [
      "Power BI Health & Performance Assessment",
      "Self-Service BI Governance Assessment",
      "Fabric Semantic Model Review"
    ],
    k: [
      "Power BI consulting India",
      "Enterprise business intelligence services",
      "Power BI dashboard development",
      "Fabric Direct Lake Power BI partner",
      "Advanced analytics consulting"
    ],
    cs: [
      {
        c: "Perfetti Van Melle EMEA",
        h: "Perfetti Van Melle EMEA Digitizes Freight Shipment Planning, Saving $14K Annually",
        m: ["Interactive operational dashboards reducing vendor decision cycle by 45%", "Real-time cost visualization across global freight routes"],
        q: null
      }
    ]
  },
  {
    g: "Data & AI",
    p: "Generative AI Solutions (Azure AI Foundry & Azure OpenAI)",
    s: "Tapas",
    sec: [
      "Private Enterprise RAG & Semantic Search Architecture",
      "Azure OpenAI Model Fine-Tuning & Prompt Safety Guardrails",
      "Azure AI Foundry Multi-Model Orchestration",
      "Document Intelligence & Structured Extraction"
    ],
    pl: [
      "Azure AI Foundry",
      "Azure OpenAI Service",
      "Azure AI Search",
      "Azure Document Intelligence",
      "LangChain / Semantic Kernel"
    ],
    a: [
      "Generative AI Feasibility & PoV Assessment",
      "AI Model Safety & Guardrails Assessment",
      "Azure OpenAI Architecture Review"
    ],
    k: [
      "Azure OpenAI consulting India",
      "Azure AI Foundry partner",
      "Generative AI enterprise solutions India",
      "Enterprise RAG architecture consulting",
      "Private GenAI implementation"
    ],
    cs: [
      {
        c: "Godrej",
        h: "Godrej Transforms Document Management with AI-Powered Document Quest Bot, Reducing Search Time by 72%",
        m: ["Reduced search time across enterprise document archives by 72%", "Secure semantic retrieval across confidential corporate files"],
        q: null
      }
    ]
  },
  {
    g: "Data & AI",
    p: "Industry Data Solutions & Accelerators",
    s: "Tapas",
    sec: [
      "Manufacturing & Shop-Floor IoT Analytics",
      "BFSI Risk, Fraud & Regulatory Reporting Frameworks",
      "Retail & FMCG Demand Forecasting Accelerators",
      "Healthcare & Pharma Clinical Data Insights"
    ],
    pl: [
      "Microsoft Fabric Industry Solutions",
      "Azure IoT Hub",
      "Power Platform",
      "Azure Synapse"
    ],
    a: [
      "Industry Data Accelerator Fitment Assessment",
      "Manufacturing Telemetry & OEE Audit",
      "BFSI Regulatory Reporting Review"
    ],
    k: [
      "Industry data solutions India",
      "Manufacturing analytics solutions",
      "BFSI analytics accelerators",
      "Retail supply chain intelligence",
      "FMCG predictive analytics"
    ],
    cs: [
      {
        c: "Perfetti Van Melle India",
        h: "Perfetti Van Melle India reduces material dispatch approval time by 35% with Microsoft Solutions",
        m: ["40-45% reduction in vendor finalization time", "$14,000 annual operational savings"],
        q: null
      }
    ]
  },
  {
    g: "Data & AI",
    p: "Managed Data & AI Services",
    s: "Tapas",
    sec: [
      "24x7 Data Pipeline & Lakehouse Monitoring",
      "Power BI Semantic Model Refresh & Capacity Governance",
      "Model Drift & AI Prompt Performance Monitoring",
      "Continuous Data Quality & SLA Management"
    ],
    pl: [
      "Microsoft Fabric",
      "Azure Databricks",
      "Power BI Service",
      "Azure Monitor"
    ],
    a: [
      "Data Platform Managed Services Review",
      "Fabric Capacity Optimization Audit",
      "Continuous Data SLA Assessment"
    ],
    k: [
      "Managed Data services India",
      "Managed Microsoft Fabric support",
      "Power BI managed services",
      "Data pipeline 24x7 monitoring",
      "Managed AI operations India"
    ],
    cs: [
      {
        c: "Hy-Tech",
        h: "Hy-Tech Streamlines Operations with Real-Time Data Availability on Azure",
        m: ["Continuous data pipeline health monitoring", "Zero data sync downtime across core SAP databases"],
        q: null
      }
    ]
  },

  // 4. MODERN WORKPLACE (6 Pillars)
  {
    g: "Modern Workplace",
    p: "Modern Work Advisory & Consulting",
    s: "Pavan Verma and Vijay R Pandey",
    sec: [
      "Hybrid Workplace Strategy & Architecture",
      "Collaboration Modernization (Teams, SharePoint, OneDrive)",
      "Zero Trust Modern Work Security & Purview Baselines",
      "Workplace Licensing Optimization & ROI Modeling"
    ],
    pl: [
      "Microsoft 365",
      "Microsoft Teams Platform",
      "Microsoft Purview",
      "Microsoft Entra ID"
    ],
    a: [
      "Microsoft 365 Tenant Health & Security Assessment (Em365 IQ)",
      "Modern Work Readiness Assessment",
      "Workplace Licensing & TCO Audit"
    ],
    k: [
      "Modern work consulting India",
      "Microsoft 365 advisory services",
      "Workplace modernization consulting",
      "Digital workplace partner India",
      "Microsoft 365 consulting"
    ],
    cs: [
      {
        c: "Greenlam Industries Limited",
        h: "Greenlam Industries Limited Fortifies Security Posture and Optimizes Costs with Microsoft Solutions",
        m: ["30-40% reduction in licensing management overhead", "Seamless collaboration across corporate locations"],
        q: null
      }
    ]
  },
  {
    g: "Modern Workplace",
    p: "Microsoft Business and Enterprise Plans",
    s: "Pavan Verma and Vijay R Pandey",
    sec: [
      "Microsoft 365 E3/E5 & Business Premium Architecture",
      "Security & Compliance Suite Enablement (Defender, Purview, Entra)",
      "Cloud Solution Provider (CSP) Flexible Commercial Governance",
      "Licensing Rightsizing & True-Up Advisory"
    ],
    pl: [
      "Microsoft 365 E3 / E5",
      "Microsoft 365 Business Premium",
      "Enterprise Mobility + Security (EMS E5)",
      "Windows 11 Enterprise"
    ],
    a: [
      "Microsoft 365 Licensing Optimization Assessment",
      "M365 E5 Security & Compliance Fitment Review",
      "Business Premium Transition Assessment"
    ],
    k: [
      "Microsoft 365 enterprise plans India",
      "M365 E5 partner India",
      "Microsoft 365 Business Premium consulting",
      "Microsoft CSP partner India",
      "Microsoft licensing optimization"
    ],
    cs: [
      {
        c: "Angel One",
        h: "Angel One Modernizes IT Infrastructure with Microsoft 365, Enhancing Security and Streamlining Operations for 24.7 million Customers",
        m: ["Unified Microsoft 365 enterprise security architecture across 4,500 endpoints", "Simplified licensing management with significant cost savings"],
        q: null
      }
    ]
  },
  {
    g: "Modern Workplace",
    p: "Microsoft 365 Migration Services (Tenant-to-Tenant & Legacy Platforms)",
    s: "Pavan Verma and Vijay R Pandey",
    sec: [
      "Legacy Mail Migration (HCL Notes, Zimbra, Exchange On-Premises)",
      "M&A Tenant-to-Tenant Consolidation & Domain Cutover",
      "SharePoint & File Server to Cloud Document Migration",
      "Zero-Downtime Staging & User Coexistence"
    ],
    pl: [
      "Microsoft 365",
      "Exchange Online",
      "SharePoint Online",
      "OneDrive for Business",
      "Quest Migration Suite"
    ],
    a: [
      "Migration Readiness & Discovery Assessment",
      "Tenant-to-Tenant Consolidation Review",
      "M365 Tenant Health Assessment (Em365 IQ)"
    ],
    k: [
      "Microsoft 365 migration services India",
      "Tenant to tenant migration Microsoft 365",
      "HCL Notes to Office 365 migration",
      "Email migration services India",
      "Exchange online migration partner"
    ],
    cs: [
      {
        c: "SBI Life",
        h: "SBI Life Insurance Transforms Digital Workplace with Microsoft 365, Migrating 24,000+ Employees",
        m: [
          "Migrated 24,000 users and 16 TB of data from legacy HCL Notes to Microsoft 365",
          "Zero business disruption across 24,000 employees nationwide"
        ],
        q: null
      }
    ]
  },
  {
    g: "Modern Workplace",
    p: "Managed Modern Work & Security Services (24x7)",
    s: "Pavan Verma and Vijay R Pandey",
    sec: [
      "24x7 Modern Workplace Helpdesk & Tenant Administration",
      "Microsoft Intune Mobile Device & Endpoint Management",
      "Identity Protection & Conditional Access Monitoring",
      "Continuous Tenant Security Posture Management"
    ],
    pl: [
      "Microsoft 365",
      "Microsoft Intune",
      "Microsoft Defender XDR",
      "Microsoft Entra ID Plan 2"
    ],
    a: [
      "Microsoft 365 Tenant Health & Security Assessment (Em365 IQ)",
      "Zero Trust Identity & Access Assessment",
      "Modern Workplace Operations Review"
    ],
    k: [
      "Managed Microsoft 365 services India",
      "24x7 Modern Workplace support",
      "M365 managed security services",
      "Intune endpoint management India",
      "Microsoft 365 managed partner"
    ],
    cs: [
      {
        c: "Angel One",
        h: "Angel One Modernizes IT Infrastructure with Microsoft 365, Eliminating Password Vulnerabilities",
        m: ["Managed device security across 4,500 enterprise endpoints", "Continuous identity threat containment"],
        q: null
      }
    ]
  },
  {
    g: "Modern Workplace",
    p: "Microsoft 365 Backup and Recovery",
    s: "Pavan Verma and Vijay R Pandey",
    sec: [
      "Automated Cloud Backup for Exchange, Teams, SharePoint & OneDrive",
      "Point-in-Time Recovery & Ransomware Defense",
      "Regulatory Audit Log Archiving & Long-Term Retention",
      "Granular Mailbox & Site Collection Restore Drills"
    ],
    pl: [
      "Microsoft 365 Backup Storage",
      "Veeam Backup for Microsoft 365",
      "Azure Archive Storage",
      "Microsoft Purview eDiscovery"
    ],
    a: [
      "M365 Data Protection & Recovery Assessment",
      "Sovereign Backup Compliance Audit",
      "Tenant Ransomware Resilience Review"
    ],
    k: [
      "Microsoft 365 backup services India",
      "Teams and SharePoint cloud backup",
      "M365 disaster recovery partner",
      "Exchange online backup solutions",
      "Microsoft 365 ransomware protection"
    ],
    cs: [
      {
        c: "Cement Corporation of India (CCI)",
        h: "Cement Corporation of India Modernizes Operations on Cloud",
        m: ["100% reliable backup protection across all enterprise communication channels", "Rapid granular recovery tested regularly"],
        q: null
      }
    ]
  },
  {
    g: "Modern Workplace",
    p: "Employee Experience, Adoption & Change Management (Microsoft Viva)",
    s: "Pavan Verma and Vijay R Pandey",
    sec: [
      "Microsoft Viva Suite Implementation (Insights, Connections, Learning)",
      "Role-Based Adoption Frameworks & Change Management",
      "Executive Internal Communications & Company Intranets",
      "Productivity & Well-Being Analytics Dashboards"
    ],
    pl: [
      "Microsoft Viva",
      "Viva Insights",
      "Viva Connections",
      "SharePoint Syntex",
      "Microsoft Teams"
    ],
    a: [
      "Employee Experience & Adoption Assessment",
      "Viva Suite Feasibility Assessment",
      "Digital Culture Maturity Review"
    ],
    k: [
      "Microsoft Viva consulting India",
      "Employee experience platform partner",
      "Modern workplace change management",
      "Microsoft Viva implementation services",
      "Workplace adoption consulting"
    ],
    cs: [
      {
        c: "SBI Life",
        h: "SBI Life Insurance Transforms Digital Workplace with Microsoft 365",
        m: ["Achieved 95%+ active tool adoption within 60 days of rollout", "Structured champion networks across regional branches"],
        q: null
      }
    ]
  },

  // 5. CYBERSECURITY (5 Pillars)
  {
    g: "Cybersecurity",
    p: "Cyber Advisory",
    s: "Suhas Desai",
    sec: [
      "Cyber Risk Governance & Virtual CISO Advisory",
      "Compliance Frameworks (DPDP Act 2023, CERT-In, RBI, SEBI)",
      "Zero Trust Security Strategy & Architecture Blueprints",
      "Incident Response Runbook & Crisis Preparedness"
    ],
    pl: [
      "Microsoft Sentinel",
      "Microsoft Purview",
      "Microsoft Defender XDR",
      "Microsoft Entra ID"
    ],
    a: [
      "Cyber Risk Assessment",
      "DPDP Act 2023 Compliance & Privacy Assessment",
      "Zero Trust Maturity Review",
      "Cloud Security Assessment"
    ],
    k: [
      "Cybersecurity consulting India",
      "DPDP Act compliance advisory",
      "Virtual CISO services India",
      "Cyber risk assessment partner",
      "CERT-In compliance advisory"
    ],
    cs: [
      {
        c: "NIA",
        h: "EMBEE SOFTWARE | Customer Case Study",
        m: ["A track record of 95% customer retention across 2,500+ customers", "Zero-day security posture established for greenfield international airport"],
        q: "Standing up a full SOC from scratch is a once-in-an-airport opportunity and Embee Software made sure we got it right the first time."
      }
    ]
  },
  {
    g: "Cybersecurity",
    p: "Threat and Vulnerability Management",
    s: "Suhas Desai",
    sec: [
      "Continuous Vulnerability Assessment & Prioritization",
      "Vulnerability Assessment & Penetration Testing (VAPT)",
      "Automated Patch & Configuration Remediation Orchestration",
      "Cloud Infrastructure Entitlement & Misconfiguration Management"
    ],
    pl: [
      "Microsoft Defender Vulnerability Management",
      "Microsoft Defender for Cloud",
      "Tenable / Qualys",
      "Azure Policy"
    ],
    a: [
      "Vulnerability Assessment & Penetration Testing (VAPT)",
      "Cyber Risk Assessment",
      "Attack Surface Reduction Review"
    ],
    k: [
      "Vulnerability management services India",
      "VAPT services Microsoft",
      "Enterprise threat management India",
      "Continuous vulnerability scanning",
      "Attack surface management"
    ],
    cs: [
      {
        c: "Flipkart",
        h: "Flipkart Gains 100% Visibility and Reduces Data Leakage Risk with Microsoft Security Solutions",
        m: ["100% endpoint vulnerability discovery", "Proactive mitigation of data leakage vectors across large-scale estate"],
        q: null
      }
    ]
  },
  {
    g: "Cybersecurity",
    p: "Identity and Access Management",
    s: "Suhas Desai",
    sec: [
      "Zero Trust Conditional Access & Phishing-Resistant MFA",
      "Privileged Identity Management (PIM / PAM)",
      "Identity Governance, Access Reviews & Lifecycle Workflows",
      "Single Sign-On (SSO) & Multi-Cloud Identity Federation"
    ],
    pl: [
      "Microsoft Entra ID Plan 2",
      "Entra Identity Governance",
      "Entra Privileged Identity Management",
      "Windows Hello for Business"
    ],
    a: [
      "Zero Trust Identity & Access Assessment",
      "IAM Risk & Privilege Creep Assessment",
      "Conditional Access Architecture Review"
    ],
    k: [
      "Identity and Access Management services India",
      "Microsoft Entra consulting partner",
      "Zero Trust IAM implementation",
      "Privileged Identity Management PIM",
      "Enterprise SSO Entra ID"
    ],
    cs: [
      {
        c: "Angel One",
        h: "Angel One Modernizes IT Infrastructure with Microsoft Security Solutions",
        m: ["Implemented Windows Hello for Business for 4,500+ endpoints", "Eliminated password attack vectors across fintech platform"],
        q: null
      },
      {
        c: "Greenlam Industries Limited",
        h: "Greenlam Industries Limited Fortifies Security Posture with Microsoft Security",
        m: ["Reduced unauthorized access attempts by over 80% with Entra ID Plan 2"],
        q: null
      }
    ]
  },
  {
    g: "Cybersecurity",
    p: "Managed Detection and Response",
    s: "Suhas Desai",
    sec: [
      "24x7x365 Eyes-on-Glass Security Operations Centre (SOC)",
      "Proactive Threat Hunting & MITRE ATT&CK Mapping",
      "SOAR Automated Incident Containment Playbooks",
      "Statutory CERT-In 6-Hour Incident Reporting Runbooks"
    ],
    pl: [
      "Microsoft Sentinel SIEM/SOAR",
      "Microsoft Defender XDR",
      "Microsoft Copilot for Security",
      "Azure Network Watcher"
    ],
    a: [
      "Red Teaming and SOC Maturity Assessment",
      "Cloud Security Assessment",
      "Threat Hunting & Detection Coverage Review"
    ],
    k: [
      "Managed Detection and Response India",
      "MDR services Microsoft Sentinel",
      "24x7 SOC services India",
      "Managed SIEM SOAR partner",
      "CERT-In incident response provider"
    ],
    cs: [
      {
        c: "AmiCorp Group",
        h: "AmiCorp Group Achieves Unified Security Visibility and Enhanced Threat Protection with Microsoft Sentinel",
        m: ["Unified threat detection and 24x7 automated containment across global offices", "Sub-15 minute mean time to detect"],
        q: null
      },
      {
        c: "NIA",
        h: "EMBEE SOFTWARE | Customer Case Study",
        m: ["Zero-day threat visibility from day one of greenfield airport launch", "Sub-15 minute MTTD and automated SOAR playbooks"],
        q: "From day one, we had unified visibility, automated response, and a security architecture built to scale."
      }
    ]
  },
  {
    g: "Cybersecurity",
    p: "Cloud and Infra Security",
    s: "Suhas Desai",
    sec: [
      "Cloud Security Posture Management (CSPM)",
      "Cloud Workload Protection (CWPP) across Hybrid & Multi-Cloud",
      "Network Micro-Segmentation & Sovereign Boundary Controls",
      "DevSecOps & Container Image Vulnerability Scanning"
    ],
    pl: [
      "Microsoft Defender for Cloud",
      "Azure Firewall & WAF",
      "Microsoft Sentinel",
      "Microsoft Purview"
    ],
    a: [
      "Cloud Security Assessment",
      "Azure Security Benchmark Review",
      "Container & Microservices Security Audit"
    ],
    k: [
      "Cloud security services India",
      "CSPM CWPP Microsoft Defender",
      "Azure infrastructure security partner",
      "Hybrid cloud security consulting",
      "DevSecOps Azure consulting"
    ],
    cs: [
      {
        c: "Flipkart",
        h: "Flipkart Internet Private Limited Reduces Data Leakage Risk with Microsoft Security",
        m: ["Unified infrastructure protection across hybrid estate", "100% compliance with security baselines"],
        q: null
      }
    ]
  },

  // 6. BUSINESS APPLICATIONS (5 Pillars)
  {
    g: "Business Applications",
    p: "Business Application Development (Power platform.sharepoint, teams, custom, mobile app development)",
    s: "Practice Lead",
    sec: [
      "Power Apps Low-Code / Pro-Dev Enterprise Solutions",
      "Automated Power Automate Workflows & RPA",
      "Custom Native & Cross-Platform Mobile Applications",
      "Collaborative Microsoft Teams Business Applications"
    ],
    pl: [
      "Microsoft Power Apps",
      "Power Automate",
      "Microsoft Dataverse",
      "SharePoint Framework (SPFx)",
      "React Native / Flutter"
    ],
    a: [
      "Power Platform Architecture & Governance Assessment",
      "Legacy Application Modernization Assessment",
      "Business Process Automation Review"
    ],
    k: [
      "Power Platform development India",
      "Power Apps consulting partner",
      "Custom business application development",
      "Enterprise low-code development India",
      "Power Automate workflow consulting"
    ],
    cs: [
      {
        c: "Perfetti Van Melle India",
        h: "Perfetti Van Melle India reduces material dispatch approval time by 35% with Power Platform Digital Gate Pass Solution",
        m: ["35% reduction in material dispatch approval time", "$17,000 annual operational savings"],
        q: null
      }
    ]
  },
  {
    g: "Business Applications",
    p: "Portal Development (Sharepoint, power platform, custom)",
    s: "Practice Lead",
    sec: [
      "Enterprise Intranet & Dealer Portals (SharePoint Online / SPFx)",
      "External Power Pages Partner & Customer Portals",
      "Custom Scalable Web Portals on Azure App Services",
      "High-Concurrency Search & Catalog Navigation"
    ],
    pl: [
      "SharePoint Online",
      "Power Pages",
      "Azure App Service",
      "Azure Cognitive Search",
      "Microsoft Entra External ID"
    ],
    a: [
      "Enterprise Portal Health & UX Assessment",
      "SharePoint Architecture & Modernization Review",
      "External Portal Security & Scalability Audit"
    ],
    k: [
      "SharePoint portal development India",
      "Power Pages consulting partner",
      "Enterprise dealer portal development",
      "Custom customer portal Azure",
      "Intranet development services"
    ],
    cs: [
      {
        c: "MRF",
        h: "Embee Empowers 6K+ Dealers of MRF Tyres with Custom Dealer Portal Application on Azure Cloud",
        m: ["Empowered 6,000+ dealers nationwide with real-time order placement", "High-concurrency search across 10,000+ SKU catalogue"],
        q: null
      }
    ]
  },
  {
    g: "Business Applications",
    p: "AI Agents Development",
    s: "Practice Lead",
    sec: [
      "Custom Enterprise Autonomous Agents",
      "Copilot Studio & Azure OpenAI Custom Agents",
      "Multi-Agent Collaborative Workflows & Tool Calling",
      "Enterprise System Actions & API Orchestration"
    ],
    pl: [
      "Copilot Studio",
      "Azure AI Foundry",
      "Power Platform",
      "Microsoft Graph API",
      "Semantic Kernel"
    ],
    a: [
      "AI Agent Feasibility & ROI Assessment",
      "Agentic Workflow Discovery Assessment",
      "Model Guardrails & Security Review"
    ],
    k: [
      "AI agents development India",
      "Enterprise autonomous agents Microsoft",
      "Copilot Studio custom agents",
      "Agentic workflow development",
      "AI agent orchestration partner"
    ],
    cs: [
      {
        c: "Godrej",
        h: "Godrej Transforms Document Management with AI-Powered Document Quest Bot",
        m: ["Reduced search time by 72% with automated conversational retrieval", "20-30 minutes saved daily per user"],
        q: null
      }
    ]
  },
  {
    g: "Business Applications",
    p: "Application Migration & Modernisation",
    s: "Practice Lead",
    sec: [
      "Legacy Monolith to Microservices & Serverless Architecture",
      "Mainframe & On-Premises Web Application Refactoring",
      "API Management & Enterprise Integration Architecture",
      "DevSecOps Pipelines & Automated Regression Testing"
    ],
    pl: [
      "Azure App Service",
      "Azure Functions",
      "Azure API Management",
      "Azure Kubernetes Service (AKS)",
      "Cosmos DB"
    ],
    a: [
      "Application Modernisation Assessment",
      "Cloud-Native Refactoring Feasibility Review",
      "API Governance & Architecture Assessment"
    ],
    k: [
      "Application modernization services India",
      "Legacy app cloud migration",
      "Microservices refactoring Azure",
      "Enterprise app modernization partner",
      "Serverless architecture consulting"
    ],
    cs: [
      {
        c: "Thermax",
        h: "Thermax Migrated IoT Application Infrastructure to Azure Cloud for Modernization and Cost Optimization",
        m: ["Modernized IoT application estate with sub-second telemetry ingestion", "Scalable cloud-native architecture"],
        q: "Witnessing the tangible benefits in scalability, efficiency, and cost-saving for Thermax has been incredible."
      }
    ]
  },
  {
    g: "Business Applications",
    p: "Industry Solutions & Accelerators",
    s: "Practice Lead",
    sec: [
      "Manufacturing Quality & Digital Gate Pass Accelerators",
      "Supply Chain Dispatch & Logistics Planning Platforms",
      "Healthcare Patient Onboarding & Regulatory Form Engines",
      "Pharma Batch Tracking & Audit Trail Solutions"
    ],
    pl: [
      "Microsoft Power Platform",
      "Azure AI",
      "Microsoft Dataverse",
      "Power BI"
    ],
    a: [
      "Industry Accelerator Fitment Assessment",
      "Supply Chain Process Automation Review",
      "Manufacturing Operations Digitalization Audit"
    ],
    k: [
      "Industry business solutions India",
      "Manufacturing digital workflow accelerator",
      "Power Platform industry solutions",
      "Supply chain automation solutions",
      "Pharma digital compliance workflow"
    ],
    cs: [
      {
        c: "Perfetti Van Melle EMEA",
        h: "Perfetti Van Melle EMEA Digitizes Freight Shipment Planning with Microsoft Power Platform",
        m: ["40-45% reduction in vendor finalization time", "$14,000 annual operational savings"],
        q: null
      }
    ]
  },

  // 7. ENTERPRISE PLATFORMS (5 Pillars)
  {
    g: "Enterprise Platforms",
    p: "SAP Business One (SQL, HANA)",
    s: "Practice Lead",
    sec: [
      "SAP Business One on Azure Cloud Architecture",
      "SAP B1 HANA In-Memory Database Modernization",
      "Add-on Integration (Octane HRMS, Dealer Portals, WMS)",
      "High-Availability Failover & Automated Backup SLAs"
    ],
    pl: [
      "SAP Business One",
      "SAP HANA",
      "Microsoft Azure",
      "Azure Virtual Machines",
      "Azure NetApp Files"
    ],
    a: [
      "SAP on Azure Readiness Assessment",
      "SAP Business One Performance & Sizing Assessment",
      "SAP B1 HANA Migration Review"
    ],
    k: [
      "SAP Business One partner India",
      "SAP B1 HANA on Azure",
      "SAP Business One cloud migration",
      "SAP Gold Partner India",
      "SAP Business One implementation"
    ],
    cs: [
      {
        c: "Cement Corporation of India (CCI)",
        h: "Cement Corporation of India Modernizes Operations with SAP Business One and Octane HRMS on Azure Cloud",
        m: ["Unified multi-plant manufacturing operations nationwide", "Zero unplanned disruption during core ERP cutover"],
        q: null
      },
      {
        c: "Hy-Tech",
        h: "Hy-Tech Streamlines Manufacturing Operations with SAP Business One HANA on Azure",
        m: ["Sub-second in-memory query performance on SAP HANA", "Continuous high-availability disaster recovery replication"],
        q: null
      }
    ]
  },
  {
    g: "Enterprise Platforms",
    p: "SAP S/4HANA, Rise with SAP",
    s: "Practice Lead",
    sec: [
      "RISE with SAP on Microsoft Azure Landing Zone Design",
      "ECC 6.0 to SAP S/4HANA Cloud Transformation Roadmap",
      "Infrastructure & Network Peering for Azure & SAP Cloud",
      "Business Process Redesign & Change Enablement"
    ],
    pl: [
      "SAP S/4HANA Cloud",
      "RISE with SAP",
      "Microsoft Azure",
      "Azure ExpressRoute",
      "SAP Business Technology Platform (BTP)"
    ],
    a: [
      "RISE with SAP Readiness Assessment",
      "S/4HANA Migration & TCO Assessment",
      "SAP Infrastructure Sizing Review"
    ],
    k: [
      "RISE with SAP partner India",
      "SAP S/4HANA migration services",
      "RISE with SAP Azure consulting",
      "SAP ECC to S/4HANA transition",
      "Enterprise SAP cloud transformation"
    ],
    cs: [
      {
        c: "Cement Corporation of India (CCI)",
        h: "Cement Corporation of India Modernizes Operations on Azure Cloud",
        m: ["Enterprise ERP modernization with high-availability Azure architecture", "Seamless multi-plant supply chain transparency"],
        q: null
      }
    ]
  },
  {
    g: "Enterprise Platforms",
    p: "SAP S/4HANA, Grow with SAP",
    s: "Practice Lead",
    sec: [
      "GROW with SAP for Mid-Market Enterprises",
      "Cloud ERP Rapid Implementation & Clean Core Architecture",
      "Pre-Configured Best Practices & Industry Standard Workflows",
      "Integration with Microsoft 365, Power BI & Teams"
    ],
    pl: [
      "SAP S/4HANA Cloud Public Edition",
      "GROW with SAP",
      "SAP BTP",
      "Microsoft Azure"
    ],
    a: [
      "GROW with SAP Mid-Market Readiness Assessment",
      "Cloud ERP Fit-to-Standard Assessment",
      "Clean Core Architecture Review"
    ],
    k: [
      "GROW with SAP partner India",
      "SAP public cloud ERP implementation",
      "Mid-market SAP S/4HANA cloud",
      "GROW with SAP consulting",
      "Clean core SAP ERP India"
    ],
    cs: [
      {
        c: "Hy-Tech",
        h: "Hy-Tech Boosts Real-Time Data Availability with SAP ERP on Azure",
        m: ["Rapid implementation cycle meeting aggressive manufacturing production deadlines", "Unified financial and supply chain management"],
        q: null
      }
    ]
  },
  {
    g: "Enterprise Platforms",
    p: "SAP Business Suite",
    s: "Practice Lead",
    sec: [
      "SAP ERP Central Component (ECC) Cloud Modernization",
      "SAP CRM, SCM, and SRM Cloud Hosting & Managed Operations",
      "Performance Optimization & Database Storage Rightsizing",
      "Security Hardening & Segregation of Duties (SoD)"
    ],
    pl: [
      "SAP Business Suite",
      "SAP ECC 6.0",
      "Microsoft Azure",
      "Azure NetApp Files",
      "SAP Solution Manager"
    ],
    a: [
      "SAP Business Suite Health & Performance Assessment",
      "SAP ECC Cloud Hosting Review",
      "SAP Security & Compliance Audit"
    ],
    k: [
      "SAP Business Suite consulting India",
      "SAP ECC hosting on Azure",
      "SAP managed operations partner",
      "SAP ERP optimization services",
      "SAP Gold Partner"
    ],
    cs: [
      {
        c: "Cement Corporation of India (CCI)",
        h: "Cement Corporation of India Modernizes Operations on Azure",
        m: ["Unified multi-location operations across manufacturing facilities", "Sub-hour recovery time objectives"],
        q: null
      }
    ]
  },
  {
    g: "Enterprise Platforms",
    p: "SAP Signavio and LeanIX",
    s: "Practice Lead",
    sec: [
      "Business Process Mining & Bottleneck Analysis (Signavio)",
      "Enterprise Architecture & Application Portfolio Mapping (LeanIX)",
      "ERP Transformation Roadmapping & Clean Core Governance",
      "Process Simulation & Value Realization Tracking"
    ],
    pl: [
      "SAP Signavio Process Transformation Suite",
      "SAP LeanIX",
      "SAP BTP",
      "Microsoft Power BI"
    ],
    a: [
      "Business Process Mining Assessment (Signavio)",
      "Enterprise Architecture Modernization Review (LeanIX)",
      "ERP Transformation Value Assessment"
    ],
    k: [
      "SAP Signavio partner India",
      "SAP LeanIX enterprise architecture consulting",
      "Business process mining SAP",
      "ERP transformation advisory Signavio",
      "Application portfolio management LeanIX"
    ],
    cs: [
      {
        c: "Perfetti Van Melle EMEA",
        h: "Perfetti Van Melle EMEA Digitizes Freight Planning with Process Automation",
        m: ["Identified and removed cross-system bottlenecks across shipment operations", "40-45% reduction in vendor turnaround time"],
        q: null
      }
    ]
  },

  // 8. IT INFRASTRUCTURE (5 Pillars)
  {
    g: "IT Infrastructure",
    p: "Data Center Transformation & Hybrid Cloud (Azure Local, HCI)",
    s: "Practice Lead",
    sec: [
      "Azure Local (Azure Stack HCI) Edge & On-Premises Modernization",
      "Legacy Hyper-V / VMware Data Center Consolidation",
      "Hybrid Cloud Management via Azure Arc",
      "Software-Defined Storage & High-Availability Clustering"
    ],
    pl: [
      "Azure Local (Azure Stack HCI)",
      "Azure Arc",
      "Microsoft Azure",
      "Windows Server Software-Defined",
      "Dell / HPE / Lenovo Certified HCI"
    ],
    a: [
      "Data Center Modernization & TCO Assessment",
      "Azure Local / HCI Feasibility Assessment",
      "Azure Arc Hybrid Readiness Review"
    ],
    k: [
      "Data center transformation India",
      "Azure Local consulting",
      "Azure Stack HCI partner India",
      "Hybrid cloud infrastructure consulting",
      "Data center consolidation services"
    ],
    cs: [
      {
        c: "Thermax",
        h: "Thermax Migrated to Azure Cloud for Workloads Modernization",
        m: ["Eliminated legacy on-premises hardware refresh cycles", "Unified hybrid monitoring via Azure"],
        q: null
      }
    ]
  },
  {
    g: "IT Infrastructure",
    p: "Enterprise Networking (SD-WAN, Wi-Fi & SASE)",
    s: "Practice Lead",
    sec: [
      "Software-Defined WAN (SD-WAN) Multi-Branch Connectivity",
      "Secure Access Service Edge (SASE) & Zero Trust Network Access",
      "Enterprise High-Density Wi-Fi 6/7 Architecture",
      "Azure Virtual WAN & ExpressRoute Dedicated Peering"
    ],
    pl: [
      "Azure Virtual WAN",
      "Azure ExpressRoute",
      "Cisco / Fortinet / Aruba SD-WAN",
      "Zscaler / Microsoft Entra Internet Access"
    ],
    a: [
      "Enterprise Network Health & Bandwidth Assessment",
      "SD-WAN & SASE Transition Assessment",
      "Cloud Connectivity & ExpressRoute Latency Review"
    ],
    k: [
      "Enterprise SD-WAN services India",
      "SASE implementation partner",
      "Azure ExpressRoute consulting",
      "Enterprise Wi-Fi architecture India",
      "Zero Trust network access ZTNA"
    ],
    cs: [
      {
        c: "MRF",
        h: "Embee Empowers 6K+ Dealers of MRF Tyres on Azure Cloud",
        m: ["High-speed, low-latency secure connectivity across 6,000+ national locations", "Zero connectivity bottlenecks during peak hours"],
        q: null
      }
    ]
  },
  {
    g: "IT Infrastructure",
    p: "System Integration & End-User Computing",
    s: "Practice Lead",
    sec: [
      "Azure Virtual Desktop (AVD) & Windows 365 Cloud PC",
      "Unified Endpoint Management (Microsoft Intune)",
      "Hardware Lifecycle Management & Zero-Touch Deployment",
      "Enterprise Identity & Multi-OS Device Governance"
    ],
    pl: [
      "Azure Virtual Desktop (AVD)",
      "Windows 365 Cloud PC",
      "Microsoft Intune",
      "Windows Autopilot",
      "Microsoft Entra ID"
    ],
    a: [
      "End-User Computing & VDI Assessment",
      "Windows 365 & AVD Feasibility Review",
      "Zero-Touch Deployment Readiness Audit"
    ],
    k: [
      "Azure Virtual Desktop consulting India",
      "Windows 365 Cloud PC partner",
      "End-user computing services",
      "System integration services India",
      "Microsoft Intune device management"
    ],
    cs: [
      {
        c: "Angel One",
        h: "Angel One Modernizes IT Infrastructure with Microsoft 365 across 4,500 Endpoints",
        m: ["Zero-touch modern provisioning for 4,500+ secure endpoints", "Unified endpoint compliance governance"],
        q: null
      }
    ]
  },
  {
    g: "IT Infrastructure",
    p: "Audio-Visual & Meeting Room Solutions (Microsoft Teams Rooms)",
    s: "Practice Lead",
    sec: [
      "Microsoft Teams Rooms (MTR) Design & Hardware Integration",
      "Executive Boardroom & Training Facility AV Automation",
      "Smart Acoustic Tuning, Dual Displays & Intelligent Cameras",
      "Proactive Remote Room Monitoring & Lifecycle SLA"
    ],
    pl: [
      "Microsoft Teams Rooms (MTR)",
      "Teams Rooms Pro Management Portal",
      "Logitech / Poly / Crestron / Neat MTR Certified Hardware",
      "Microsoft Teams"
    ],
    a: [
      "Meeting Room AV & Teams Rooms Readiness Assessment",
      "Acoustic & Video Feasibility Review",
      "Hybrid Workplace Meeting Experience Audit"
    ],
    k: [
      "Microsoft Teams Rooms partner India",
      "Teams Rooms installation services",
      "Boardroom audio visual solutions India",
      "Hybrid meeting room solutions",
      "MTR managed support partner"
    ],
    cs: [
      {
        c: "SBI Life",
        h: "SBI Life Insurance Transforms Collaboration for 24,000+ Employees",
        m: ["Standardized meeting room experience across executive branches", "Instant one-touch join hybrid collaboration"],
        q: null
      }
    ]
  },
  {
    g: "IT Infrastructure",
    p: "Intelligent Surveillance & Physical Security",
    s: "Practice Lead",
    sec: [
      "AI-Powered IP Video Surveillance & Edge Analytics",
      "Enterprise Access Control & Biometric Verification",
      "Centralized Command and Control Center Architecture",
      "Cloud Video Storage, Retention & Compliance Governance"
    ],
    pl: [
      "Azure IoT Edge",
      "Azure Video Indexer",
      "Enterprise VMS Platforms (Milestone, Genetec)",
      "IP CCTV Cameras & Access Control Hardware"
    ],
    a: [
      "Physical Security & Surveillance Audit",
      "Smart Edge Video Analytics Assessment",
      "Command Center Feasibility Review"
    ],
    k: [
      "Enterprise surveillance solutions India",
      "Intelligent video analytics consulting",
      "Physical security system integration",
      "Command and control center solutions",
      "AI CCTV surveillance partner"
    ],
    cs: [
      {
        c: "NIA",
        h: "EMBEE SOFTWARE | Customer Case Study",
        m: ["Centralized security operations and situational awareness across vast terminal campus", "24x7 automated anomaly alerting"],
        q: "From day one, we had unified visibility, automated response, and a security architecture built to scale."
      }
    ]
  },

  // 9. MANAGED SERVICES (6 Pillars)
  {
    g: "Managed Services",
    p: "Managed Cloud & FinOps (Azure)",
    s: "Iqbal Baliwala and Aman Singhal",
    sec: [
      "24x7x365 Cloud Infrastructure Monitoring & Incident Remediation",
      "Continuous FinOps Governance & Cost Anomaly Alerting",
      "Automated OS Patching, Backup & DR Verification",
      "Quarterly Well-Architected Reviews & SLA Governance"
    ],
    pl: [
      "Microsoft Azure",
      "Azure Monitor",
      "Azure Cost Management",
      "Azure Lighthouse",
      "Microsoft Sentinel"
    ],
    a: [
      "Azure Managed Services Fitment Assessment",
      "FinOps & Cost Optimization Assessment",
      "Cloud Operations Maturity Review"
    ],
    k: [
      "Managed Azure services India",
      "Azure FinOps managed partner",
      "24x7 managed cloud support",
      "Cloud managed service provider India",
      "Azure MSP services"
    ],
    cs: [
      {
        c: "Thermax",
        h: "Thermax Achieved Operational Visibility and Cost Optimization with Azure",
        m: ["Continuous 24x7 SLA support for enterprise IoT estate", "25-35% sustained infrastructure spend reduction"],
        q: "Witnessing the tangible benefits in scalability, efficiency, and cost-saving for Thermax has been incredible."
      }
    ]
  },
  {
    g: "Managed Services",
    p: "Managed Modern Workplace (24x7)",
    s: "Pavan Verma and Vijay R Pandey",
    sec: [
      "24x7 User Helpdesk & Microsoft 365 Tenant Administration",
      "Continuous Device Management & Intune Compliance Audits",
      "Collaboration App Governance (Teams, SharePoint, OneDrive)",
      "VIP User Priority Support & SLA Escalation"
    ],
    pl: [
      "Microsoft 365",
      "Microsoft Teams",
      "Microsoft Intune",
      "Windows 11 Enterprise"
    ],
    a: [
      "Modern Workplace Service Desk Assessment",
      "Microsoft 365 Tenant Health Review (Em365 IQ)",
      "Zero Trust Modern Work Audit"
    ],
    k: [
      "Managed Modern Workplace services India",
      "Microsoft 365 managed helpdesk",
      "24x7 workplace support provider",
      "M365 tenant managed administration",
      "Intune managed services"
    ],
    cs: [
      {
        c: "Angel One",
        h: "Angel One Modernizes IT Infrastructure with Microsoft 365 for 24.7 Million Customers",
        m: ["24x7 endpoint management across 4,500 enterprise users", "Sub-15 minute average resolution time for critical tickets"],
        q: null
      }
    ]
  },
  {
    g: "Managed Services",
    p: "Managed Security Services (SOC)",
    s: "Suhas Desai",
    sec: [
      "24x7x365 Eyes-on-Glass Security Operations Centre (SOC) in India",
      "Continuous Threat Hunting & MITRE ATT&CK Matrix Alignment",
      "Automated SOAR Incident Containment Playbooks",
      "Statutory CERT-In 6-Hour Reporting Compliance"
    ],
    pl: [
      "Microsoft Sentinel",
      "Microsoft Defender XDR",
      "Microsoft Purview",
      "Microsoft Copilot for Security"
    ],
    a: [
      "SOC Maturity & Red Team Assessment",
      "Managed Security Services Fitment Review",
      "CERT-In & DPDP Compliance Audit"
    ],
    k: [
      "Managed Security Services Provider India",
      "MSSP Microsoft Sentinel India",
      "24x7 SOC services provider",
      "Managed detection and response SOC",
      "CERT-In compliant SOC partner"
    ],
    cs: [
      {
        c: "AmiCorp Group",
        h: "AmiCorp Group Achieves Unified Security Visibility and Enhanced Threat Protection with Microsoft Sentinel",
        m: ["Unified 24x7 security monitoring across worldwide branch network", "Sub-15 minute detection SLA"],
        q: null
      },
      {
        c: "NIA",
        h: "EMBEE SOFTWARE | Customer Case Study",
        m: ["Greenfield airport enterprise 24x7 SOC stood up from scratch", "Zero security breaches from inception"],
        q: "From day one, we had unified visibility, automated response, and a security architecture built to scale."
      }
    ]
  },
  {
    g: "Managed Services",
    p: "Managed Infrastructure & NOC",
    s: "Practice Lead",
    sec: [
      "24x7 Network & Server Operations Center (NOC)",
      "Proactive Uptime, Bandwidth & Latency Telemetry",
      "Hardware Fault Management & On-Site Field Dispatch",
      "Automated Firmware Updates & Configuration Backups"
    ],
    pl: [
      "Azure Monitor",
      "SolarWinds / PRTG",
      "Cisco / Fortinet NOC",
      "Windows Server / Linux"
    ],
    a: [
      "Infrastructure NOC Maturity Assessment",
      "Network Operations SLA Review",
      "Enterprise Uptime & Resiliency Audit"
    ],
    k: [
      "Managed infrastructure services India",
      "24x7 NOC services provider",
      "Network operations center partner",
      "Enterprise IT infrastructure management",
      "Server NOC support India"
    ],
    cs: [
      {
        c: "Cement Corporation of India (CCI)",
        h: "Cement Corporation of India Modernizes Operations on Azure Cloud",
        m: ["24x7 NOC monitoring across distributed plants", "99.95% infrastructure SLA delivery"],
        q: null
      }
    ]
  },
  {
    g: "Managed Services",
    p: "Managed Applications & Data Platforms",
    s: "Tapas",
    sec: [
      "24x7 ERP & Business Application Application Management Services (AMS)",
      "Database Administration (SAP HANA, SQL Server, PostgreSQL)",
      "Continuous Data Pipeline Health & ETL Error Remediation",
      "Minor Enhancements & Change Request Delivery"
    ],
    pl: [
      "SAP Business One",
      "Microsoft Fabric",
      "Azure SQL Database",
      "Power Platform"
    ],
    a: [
      "Application AMS Operations Assessment",
      "Database Health & Optimization Review",
      "Data Platform Managed Services Audit"
    ],
    k: [
      "Application managed services AMS India",
      "SAP AMS services partner",
      "Managed data platform support",
      "24x7 database administration services",
      "Enterprise application support"
    ],
    cs: [
      {
        c: "Hy-Tech",
        h: "Hy-Tech Streamlines Operations with Real-Time Data Availability on Azure",
        m: ["Ongoing SAP AMS support with zero unscheduled downtime", "Continuous database tuning and performance optimization"],
        q: null
      }
    ]
  },
  {
    g: "Managed Services",
    p: "Enterprise Service Desk (24x7)",
    s: "Pavan Verma and Vijay R Pandey",
    sec: [
      "Multi-Channel 24x7 IT Service Desk (Phone, Email, Teams, Portal)",
      "ITIL-Aligned Incident, Service Request & Problem Management",
      "First-Contact Resolution (FCR) Optimization via Knowledge Bases",
      "Real-Time CSAT Telemetry & Transparent Executive Reporting"
    ],
    pl: [
      "ServiceNow / Jira Service Management",
      "Microsoft Teams",
      "Power BI Service Desk Analytics",
      "Microsoft Entra ID"
    ],
    a: [
      "Service Desk Maturity Assessment",
      "ITIL Process Optimization Review",
      "First-Contact Resolution Benchmarking Audit"
    ],
    k: [
      "Enterprise service desk India",
      "24x7 IT service desk outsourcing",
      "ITIL managed help desk provider",
      "Multi-channel IT service desk",
      "Enterprise IT support desk"
    ],
    cs: [
      {
        c: "SBI Life",
        h: "SBI Life Insurance Transforms Workplace for 24,000+ Employees",
        m: ["24,000 users supported nationwide with high customer satisfaction", "Rapid first-call resolution for all workplace requests"],
        q: null
      }
    ]
  }
];

export function getSiblingPillars(groupName: string, currentPillarName: string): string[] {
  return ALL_PILLARS
    .filter(p => p.g === groupName && p.p !== currentPillarName)
    .map(p => p.p);
}

export function formatCaseStudiesBlock(caseStudies: CaseStudy[]): string {
  if (!caseStudies || caseStudies.length === 0) {
    return "(none provided — write the proof section around the assessment and the delivery approach instead, and say nothing about a customer)";
  }
  return caseStudies.map(cs => {
    let text = `- Customer: ${cs.c}\n  Headline: ${cs.h}`;
    if (cs.m && cs.m.length > 0) {
      text += `\n  Metrics: ${cs.m.join("; ")}`;
    }
    if (cs.q) {
      text += `\n  Quote: "${cs.q}"`;
    }
    return text;
  }).join("\n");
}

export function buildSharedBrief(config: PromptConfig): string {
  const csBlock = formatCaseStudiesBlock(config.matchedCaseStudies);
  const siblingsList = config.siblingPillars.join("; ") || "none";
  const researchText = config.researchBriefText?.trim() || 
    "(no research run — do not claim competitive knowledge you do not have)";

  return `PILLAR PAGE: ${config.pillarName}
SOLUTION GROUP: ${config.solutionGroup}
INTERNAL OWNER: ${config.internalOwner || "unassigned"}
SCOPE: Dedicated single standalone landing page for "${config.pillarName}".
CRITICAL SINGLE-PAGE REQUIREMENT: Write strictly for ONE standalone landing page for this exact topic. Do NOT combine multiple sub-pages, separate service lines, or sister topics into a merged multi-page document automatically.
PLATFORMS IN THIS GROUP: ${config.platforms.join("; ") || "none listed"}
ASSESSMENTS: None. The assessments section has been removed for now. Do NOT include an assessment section.
TARGET KEYWORDS: ${config.targetKeywords.join("; ") || "derive from the pillar name"}

BRAND AND STYLE RULES (non negotiable):
- Always write "Embee Software" in full. Never just "Embee".
- Microsoft relationship is "Microsoft Frontier Partner" and "Microsoft Solutions Partner". NEVER write "Microsoft Gold Partner". SAP relationship is "SAP Gold Partner".
- NEVER use an em dash or an en dash anywhere. Use a comma, a colon, or restructure the sentence. This applies to every line of output.
- Indian English spelling: optimisation, prioritised, organisation, centre.
- Tagline: "Making IT Easier".
- Lead with the business outcome, never the product. Every conversation starts with a business problem and ends with the proposed solution.
- NEVER invent a statistic, customer name, award or credential. If a figure would help but is not in the facts below, write a clear placeholder like [X certified engineers] so it can be filled in.
- Embee Software serves organisations of every size, from SMB through to large enterprise, across India and beyond. Never describe Embee Software as a small or boutique firm.

COMPANY FACTS (strictly verified):
- Embee Software Pvt Ltd, embee.co.in
- 40+ years of experience across Indian enterprise IT
- 3,500+ customers served
- 1,000+ employees, including 500+ certified technical engineers and architects
- 10+ locations across India
- 18 Microsoft Advanced Specializations
- Microsoft Solutions Partner; Microsoft Frontier Partner
- SAP Gold Partner
- 2024 Microsoft India & South Asia Partner of the Year for Modern Work
- Octane HRMS: 100K+ users
- Market is India

REAL CUSTOMER PROOF (Use ONLY these. Never invent metrics or unverified outcomes):
${csBlock}

COMPETITIVE CONTEXT (NEVER name any competitor on the page):
HCLTech, Infosys, Wipro, TCS, Tech Mahindra, LTIMindtree, Softchoice, Team Computers, IFI Techsolutions.
Differentiation is expressed only as what to look for in an evaluation partner.

SIBLING PILLARS IN THIS GROUP (for Section 8 Related Solutions):
${siblingsList}

RESEARCH BRIEF (may be empty, if so say nothing that depends on it):
${researchText}`;
}

export const LANDING_PAGE_PROMPT_TEMPLATE = `You are writing the definitive landing page for Embee Software.
You must strictly follow the EXACT 9-SECTION PAGE STRUCTURE, NUMBERING FORMAT, AND PAGE LENGTH below.

[[INSERT THE SHARED BRIEF HERE]]

CRITICAL SINGLE-PAGE REQUIREMENT:
- Write strictly for ONE standalone landing page for this specific topic alone.
- Do NOT combine multiple sub-pages, separate service lines, or sister topics into one merged or multi-product document automatically. Focus only on this single individual offering.

ASSESSMENT SECTION OMISSION:
- Do NOT include an assessments section for now. Proceed directly from Partner Evaluation (Section 6) to Frequently Asked Questions (Section 7), Related Solutions (Section 8), and Closing Next Steps (Section 9).

TONE & READABILITY REQUIREMENTS:
- Write in clear, readable, human, and benefit-driven business language. Avoid overly dense technical jargon, acronym overload, and robotic engineering phrasing. Make it easy to digest for enterprise CIOs, IT leaders, and business executives alike.
- Do NOT mention specific Indian cloud regions (such as Azure Central India in Pune, South India in Chennai, or sub-18ms latency) or force SAP ERP integrations everywhere unless the brief specifically focuses on them. Describe data governance, security, and integrations naturally, flexibly, and tailored to the actual solution.

OUTPUT FORMAT REQUIREMENTS:
- Output FINISHED landing page copy ONLY in Markdown.
- No preamble, no postscript, no commentary, no code fences wrapping the entire document.
- Follow the EXACT heading structure and numbering below (H1, 1. H2:, 1.1 H3:, etc.).
- NEVER use an em dash (—) or an en dash (–). Use a comma, a colon, or restructure the sentence.
- Length: between 1,000 and 1,350 words total. Crisp, readable, high information density, zero fluff, matching the exact depth of the reference structure.

EXACT 9-SECTION STRUCTURE TO PRODUCE:

H1. [Topic / Primary Keyword] Consulting India and [Secondary Angle]

[Opening 2-sentence value proposition defining the service and stating how Embee Software helps Indian enterprises turn this into a practical, secure, and scalable advantage.]

CTA: [Primary Call to Action, e.g. See How It Works / Consult Enterprise Architect]

2024 Microsoft India & South Asia Partner of the Year for Modern Work | Microsoft Frontier Partner and Microsoft Solutions Partner | 18 Microsoft Advanced Specializations

1. H2: What Business Challenges Can [Topic] Help Enterprises Solve?

1.1 H3: [Specific Business Obstacle 1 Headline]
[2-3 concise, readable sentences detailing the obstacle.]

1.2 H3: [Specific Business Obstacle 2 Headline]
[2-3 concise, readable sentences detailing manual friction, delayed handoffs, or visibility gaps.]

1.3 H3: [Specific Business Obstacle 3 Headline]
[2-3 concise, readable sentences detailing siloed information across legacy systems, databases, or fragmented applications.]

1.4 H3: [Specific Business Obstacle 4 Headline]
[2-3 concise, readable sentences detailing adoption, user confidence, or governance gaps limiting ROI.]

2. H2: What Measurable Outcomes Can You Expect from This Advisory Engagement?

2.1 H3: [Outcome 1 Headline]
[1-2 clear sentences on business outcome.]

2.2 H3: [Outcome 2 Headline]
[1-2 clear sentences on business outcome.]

2.3 H3: [Outcome 3 Headline]
[1-2 clear sentences on business outcome.]

2.4 H3: [Outcome 4 Headline]
[1-2 clear sentences on business outcome.]

2.5 H3: [Outcome 5 Headline]
[1-2 clear sentences on business outcome.]

2.6 H3: [Outcome 6 Headline]
[1-2 clear sentences on business outcome.]

3. H2: What Does the [Topic] Engagement Cover?

3.1 H3: [Scope Item 1]
[1-2 readable sentences.]

3.2 H3: [Scope Item 2]
[1-2 readable sentences.]

3.3 H3: [Scope Item 3]
[1-2 readable sentences.]

3.4 H3: [Scope Item 4]
[1-2 readable sentences.]

3.5 H3: [Scope Item 5]
[1-2 readable sentences.]

3.6 H3: [Scope Item 6]
[1-2 readable sentences.]

3.7 H3: [Scope Item 7]
[1-2 readable sentences.]

4. H2: How Does Embee Software Deliver [Topic / Engagement]?

[Phase 1: Discovery & Architecture] ---> [Phase 2: Envisioning & Security] ---> [Phase 3: PoV Validation] ---> [Phase 4: Scaling & Governance]

4.1 H3: Phase 1: [Phase 1 Title]
[1-2 readable sentences.]

4.2 H3: Phase 2: [Phase 2 Title]
[1-2 readable sentences.]

4.3 H3: Phase 3: [Phase 3 Title]
[1-2 readable sentences.]

4.4 H3: Phase 4: [Phase 4 Title]
[1-2 readable sentences.]

5. H2: What Deliverables Will Your Organization Receive?

5.1 H3: Strategic and Governance Documentation
- [Artifact 1 with bold title and clear, readable description]
- [Artifact 2 with bold title and clear, readable description]
- [Artifact 3 with bold title and clear, readable description]
- [Artifact 4 with bold title and clear, readable description]
- [Artifact 5 with bold title and clear, readable description]

5.2 H3: Built Assets and Technical Configurations
- [Asset 1 with bold title and clear, readable description]
- [Asset 2 with bold title and clear, readable description]
- [Asset 3 with bold title and clear, readable description]
- [Asset 4 with bold title and clear, readable description]
- [Asset 5 with bold title and clear, readable description]

6. H2: How to Choose the Right [Topic] Partner

| What to Evaluate | Typical Implementation Partner | Embee’s Transformation-Led Approach |
| :--- | :--- | :--- |
| Business Adoption | Focuses mainly on setup, licenses, and technical rollout. | Helps teams understand where [solution] adds value and how to use it in everyday work. |
| Workshops and Use Case Discovery | May run limited product demos or generic enablement sessions. | Runs business-led workshops to identify real use cases, priority teams, and measurable outcomes. |
| Training and User Confidence | Provides basic handover or standard training material. | Delivers role-based training, prompt guidance, and practical learning sessions for different teams. |
| Change Management | Leaves adoption largely to internal teams after deployment. | Supports communications, champions, feedback loops, and rollout planning to drive real adoption. |
| Ongoing Support | Completes the implementation and transfers support quickly. | Stays engaged after rollout to answer questions, improve usage, and help teams solve adoption blockers. |
| Business Transformation | Measures success by deployment completion. | Measures success by how well people use the solution to save time, improve decisions, and transform work. |

7. H2: Frequently Asked Questions

7.1 H3: How does Embee help enterprises adopt [Solution] securely and confidently?
[Thorough, readable answer paragraph.]

7.2 H3: How does Embee Software ensure data security, privacy, and sovereignty for [Solution]?
[Thorough, accessible answer covering enterprise security perimeters, data boundaries, and regulatory compliance without forcing specific regional datacenters.]

7.3 H3: Can [Solution] connect with our existing enterprise business systems and databases?
[Thorough, readable answer explaining how Embee Software integrates the solution with existing enterprise software, CRM/ERP platforms, databases, and third-party tools via secure APIs and standard connectors without disrupting daily operations.]

7.4 H3: How can we keep sensitive business data protected when using [Solution]?
[Thorough, readable answer covering access controls, sensitivity labels, and role-based permissions.]

7.5 H3: How does Embee Software help organisations manage ongoing adoption, capacity, and platform usage?
[Thorough, readable answer explaining how Embee Software provides ongoing visibility into platform usage, tracking adoption trends and licensing allocations to optimize capacity and keep operational costs aligned with actual business needs.]

7.6 H3: Why should we work with Embee Software instead of handling the [Solution] rollout internally?
[Thorough answer citing 40+ years of experience, 18 Microsoft Advanced Specializations, and recognition as the 2024 Microsoft India & South Asia Partner of the Year for Modern Work.]

8. H2: Related Solutions in the [Solution Group] Portfolio
- [Sibling Pillar 1 Name]
  [1-2 sentences on what it covers and when to choose it.]
- [Sibling Pillar 2 Name]
  [1-2 sentences on what it covers and when to choose it.]
- [Sibling Pillar 3 Name]
  [1-2 sentences on what it covers and when to choose it.]
- [Sibling Pillar 4 Name]
  [1-2 sentences on what it covers and when to choose it.]

9. H2: Secure Your [Topic] Foundation Today

[Punchy 2-sentence executive closing paragraph emphasizing clean data, security, and tangible business outcomes.]

CTA: Connect with our lead strategists to map out your [Topic] roadmap

<Customer Logos>
<Case study>
<Blogs>`;

export const SEO_PROMPT_TEMPLATE = `You are the SEO lead preparing a complete handover pack so a developer and an SEO executive can publish this page correctly without asking a single follow-up question.

[[INSERT THE SHARED BRIEF HERE]]

OUTPUT: a structured handover document in Markdown. Be exact and literal, copy-paste ready values, not advice.
Use ## for each numbered section below, ### for sub-parts, and put every schema block and every tag value inside a fenced code block so it can be copied cleanly. Use tables for keyword lists and the internal linking plan.
Do NOT use em dashes or en dashes anywhere. Use colons or commas.

INCLUDE, in this order:

1. URL SLUG: full path, pattern /what-we-do/{group-slug}/{pillar-slug}/. Lower case, hyphens, max five words, no stop words.

2. PRIMARY KEYWORD: exactly one, chosen for commercial intent over raw volume. State why it beats the alternatives in one line. Then 3-5 SECONDARY keywords. Note explicitly that the primary belongs to this page alone and must not be targeted by any other pillar.

3. TITLE TAG: under 60 characters. Give the character count. Give one alternative.

4. META DESCRIPTION: 140 to 158 characters. Give the character count. Written for a human deciding whether to click. Give one alternative.

5. OG AND TWITTER TAGS: og:title, og:description, og:type, og:url, og:image guidance, twitter:card. og:title MUST match the title tag's claim.

6. HEADING MAP: the exact H1, then every H2 and H3 in order, showing where the primary and secondary keywords sit. Mark the four permitted keyword positions.

7. SERVICE SCHEMA: complete, valid JSON-LD, filled in with real values, not placeholders. Must include @type Service, serviceType, name, description, provider (Embee Software Pvt Ltd, https://embee.co.in/), areaServed India, audience BusinessAudience, and hasOfferCatalog listing the actual sub-offerings.

8. FAQPAGE SCHEMA: complete JSON-LD for the 6 FAQs (7.1 to 7.6). State clearly that answers must match the visible copy word for word.

9. BREADCRUMBLIST SCHEMA: complete JSON-LD matching the visible breadcrumb.

10. INTERNAL LINKING PLAN: five outbound links with exact anchor text (group hub, two sibling pillars, one success story, one blog post) and three inbound links that must exist before publish, naming the pages that should carry them.

11. IMAGE REQUIREMENTS: for each image on the page: file name, alt text, format, max size. Note that any diagram carrying an argument needs that argument in body text too.

12. TECHNICAL CHECKLIST: self-referencing canonical, index/follow verification, sitemap inclusion (flag that ~540 current pages are missing from the sitemap, so verify rather than assume), Core Web Vitals targets, server-side rendering requirement, no duplicated desktop/mobile DOM blocks, and every statistic present in served HTML rather than injected by JavaScript.

13. Do not include any pricing, cost or GST guidance anywhere.

14. CANNIBALISATION WATCH: name the other pillars in this structure that could compete with this page for the same keyword, and state how to prevent it.`;

export const DESIGNER_PROMPT_TEMPLATE = `You are giving a skilled in-house designer starting direction for this landing page. They will do their own research and visual work, you are pointing, not prescribing.

[[INSERT THE SHARED BRIEF HERE]]

OUTPUT: short, practical notes in Markdown. Use ## for each numbered area below and keep the prose tight. Under 500 words total. Do not specify colours, fonts, exact spacing or anything the designer owns.
Do NOT use em dashes or en dashes anywhere. Use colons or commas.

COVER:
1. PAGE RHYTHM: the 9-section rhythm matching the reference structure (challenges -> outcomes -> scope -> phased delivery -> deliverables -> partner table -> FAQs -> related solutions -> closing conversion).
2. HERO: what the hero must communicate in three seconds, and what to avoid. Note that trust credentials (18 Microsoft Advanced Specializations, 2024 Partner of the Year) must be static in HTML.
3. THE COMPARISON TABLE: how to make the 3-column evaluation table legible and high-contrast on mobile without truncating.
4. PHASE FLOW DIAGRAM: styling the 4-phase delivery flowchart ([Phase 1] ---> [Phase 2] ---> [Phase 3] ---> [Phase 4]).
5. PROOF & LOGOS: how to present customer logos, case studies, and blog blocks cleanly in closing Section 9.
6. MOBILE RESPONSIVENESS: critical phone viewport considerations.
7. REFERENCES: design inspiration references (IBM, HCLTech).`;
