import { PillarData, CaseStudy, PromptConfig } from '../types';

export const ALL_PILLARS: PillarData[] = [
  {
    g: "Cloud Solutions",
    p: "Cloud Advisory & Consulting",
    s: "Iqbal Baliwala and Aman Singhal",
    sec: [
      "Cloud Advisory & Consulting",
      "Cloud Assessment and workshop"
    ],
    pl: [
      "Microsoft Azure",
      "Azure Kubernetes",
      "Azure Arc",
      "Azure VMware Services",
      "Github and Github Copilot",
      "Azure Virtual Desktop",
      "AWS",
      "SAP on Azure",
      "Azure SQL DB, PostGreSQL, CosmosDB"
    ],
    a: [
      "Azure Migration Assessment",
      "Azure Cost Optimisation Assessment",
      "Azure Security Assessment",
      "Azure AI Readiness Assessment",
      "Application Modernisation Assessment",
      "Azure Landing Zone Assessment",
      "DR Readiness Assessment",
      "Well-Architected Review"
    ],
    k: [
      "Azure consulting services",
      "Azure advisory services",
      "Microsoft Azure consulting",
      "Azure cloud consulting services",
      "Microsoft Fabric Consulting",
      "Azure AI Foundry",
      "Microsoft AI Solutions"
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
        h: "Embee Empowers 6K+ Dealers of MRF Tyres with a Customized Dealer Portal Application- MRF Tyre World Built on Azure Cloud with Intelligent Search and Discovery Capabilitie",
        m: ["Empowered 6,000+ dealers nationwide", "High-concurrency catalogue search and automated ordering"],
        q: null
      },
      {
        c: "Hy-Tech",
        h: "Hy-Tech Streamlines Manufacturing Operations and Boosts Real-Time Data Availability with SAP Business One HANA on Azure",
        m: ["Real-time data availability for manufacturing plant operations"],
        q: null
      },
      {
        c: "AmiCorp Group",
        h: "AmiCorp Group Achieves Unified Security Visibility and Enhanced Threat Protection with Microsoft Sentinel",
        m: ["Centralised log analytics and 24x7 threat detection across multiple global territories"],
        q: null
      }
    ]
  },
  {
    g: "Cloud Solutions",
    p: "Cloud Migration & Modernization Services",
    s: "Iqbal Baliwala and Aman Singhal",
    sec: ["Data and App Modernization Services"],
    pl: [
      "Microsoft Azure",
      "Azure Kubernetes",
      "Azure Arc",
      "Azure VMware Services",
      "Github and Github Copilot",
      "Azure Virtual Desktop",
      "AWS",
      "SAP on Azure",
      "Azure SQL DB, PostGreSQL, CosmosDB"
    ],
    a: [
      "Azure Migration Assessment",
      "Azure Cost Optimisation Assessment",
      "Azure Security Assessment",
      "Azure AI Readiness Assessment",
      "Application Modernisation Assessment",
      "Azure Landing Zone Assessment",
      "DR Readiness Assessment",
      "Well-Architected Review"
    ],
    k: [
      "Azure Migration Services",
      "Microsoft Azure Migration",
      "Cloud Migration to Azure",
      "Azure Cloud Migration Services",
      "Application Modernisation Assessment"
    ],
    cs: [
      {
        c: "Thermax",
        h: "Thermax, an Energy Industry Leader, Migrated to the Azure Cloud for Improved Visibility, Cost Optimization, and Workloads Modernization",
        m: ["Modernised IoT application infrastructure on Microsoft Azure", "Improved operational visibility and workload resilience"],
        q: "The collaboration with Thermax to modernize their IoT application infrastructure on Azure stands as a testament to our expertise in cloud transformations. Witnessing the tangible benefits in scalability, efficiency, and cost-saving for Thermax has been incredible."
      },
      {
        c: "Cement Corporation of India (CCI)",
        h: "Cement Corporation of India Modernizes Operations with SAP Business One and Octane HRMS on Azure Cloud, Achieving Unified Management and Enhanced Visibility",
        m: ["Unified management and enhanced operational visibility"],
        q: null
      },
      {
        c: "Hy-Tech",
        h: "Hy-Tech Streamlines Manufacturing Operations and Boosts Real-Time Data Availability with SAP Business One HANA on Azure",
        m: ["Real-time data availability across shop floor and headquarters"],
        q: null
      }
    ]
  },
  {
    g: "Cloud Solutions",
    p: "Security & Identity",
    s: "Iqbal Baliwala and Aman Singhal",
    sec: ["Zero Trust Security", "Identity Governance", "Cloud Workload Protection"],
    pl: [
      "Microsoft Azure",
      "Azure Kubernetes",
      "Azure Arc",
      "Azure VMware Services",
      "Microsoft Entra ID",
      "Microsoft Sentinel",
      "Microsoft Defender for Cloud"
    ],
    a: [
      "Azure Security Assessment",
      "Zero Trust Identity & Access Assessment",
      "Well-Architected Review"
    ],
    k: [
      "Identity and Access Management Services",
      "Microsoft Security Consulting",
      "Microsoft Entra Consulting",
      "Azure Security Assessment",
      "Zero Trust Implementation"
    ],
    cs: [
      {
        c: "Angel One",
        h: "Angel One Modernizes IT Infrastructure with Microsoft 365, Enhancing Security and Streamlining Operations for 24.7 million Customers",
        m: [
          "Implemented Windows Hello for Business for over 4,500 endpoints, eliminating password-related vulnerabilities",
          "Secured operations serving 24.7 million financial customers"
        ],
        q: null
      },
      {
        c: "AmiCorp Group",
        h: "AmiCorp Group Achieves Unified Security Visibility and Enhanced Threat Protection with Microsoft Sentinel",
        m: ["Unified security telemetry across global offices"],
        q: null
      }
    ]
  },
  {
    g: "Cloud Solutions",
    p: "Backup, Business Continuity & Disaster Recovery",
    s: "Iqbal Baliwala and Aman Singhal",
    sec: ["Azure Site Recovery", "Immutable Cloud Backups", "Cross-Region BCDR"],
    pl: [
      "Microsoft Azure",
      "Azure Backup",
      "Azure Site Recovery",
      "Azure Archive Storage"
    ],
    a: [
      "DR Readiness Assessment",
      "Azure Landing Zone Assessment",
      "Well-Architected Review"
    ],
    k: [
      "Disaster Recovery Services",
      "Business Continuity Solutions",
      "Backup and Disaster Recovery",
      "Azure Disaster Recovery",
      "Cloud Backup Solutions"
    ],
    cs: [
      {
        c: "Cement Corporation of India (CCI)",
        h: "Cement Corporation of India Modernizes Operations with SAP Business One and Octane HRMS on Azure Cloud, Achieving Unified Management and Enhanced Visibility",
        m: ["Automated geo-redundant backups for critical ERP databases"],
        q: null
      },
      {
        c: "Hy-Tech",
        h: "Hy-Tech Streamlines Manufacturing Operations and Boosts Real-Time Data Availability with SAP Business One HANA on Azure",
        m: ["Sub-hour RTO and continuous data snapshot replication on Azure"],
        q: null
      }
    ]
  },
  {
    g: "Cloud Solutions",
    p: "Cloud Optimisation & Managed Azure Services",
    s: "Iqbal Baliwala and Aman Singhal",
    sec: ["Azure FinOps", "24x7 Infrastructure Monitoring", "Capacity Governance"],
    pl: [
      "Microsoft Azure",
      "Azure Cost Management",
      "Azure Monitor",
      "Azure Arc"
    ],
    a: [
      "Azure Cost Optimisation Assessment",
      "Well-Architected Review",
      "Azure Landing Zone Assessment"
    ],
    k: [
      "Azure FinOps services",
      "Cloud cost optimisation India",
      "Managed Azure Services",
      "Azure cloud cost governance"
    ],
    cs: [
      {
        c: "Thermax",
        h: "Thermax, an Energy Industry Leader, Migrated to the Azure Cloud for Improved Visibility, Cost Optimization, and Workloads Modernization",
        m: ["Tangible cost savings and architectural efficiency through proactive Azure optimization"],
        q: "Witnessing the tangible benefits in scalability, efficiency, and cost-saving for Thermax has been incredible."
      }
    ]
  },
  {
    g: "Cloud Solutions",
    p: "DevOps, Containerization & Automation",
    s: "Iqbal Baliwala and Aman Singhal",
    sec: ["CI/CD Pipeline Engineering", "Kubernetes Management", "Infrastructure as Code"],
    pl: [
      "Azure Kubernetes Service (AKS)",
      "Azure DevOps",
      "GitHub & GitHub Copilot",
      "Terraform / Bicep"
    ],
    a: [
      "Application Modernisation Assessment",
      "Azure AI Readiness Assessment",
      "Well-Architected Review"
    ],
    k: [
      "DevOps Services",
      "Azure DevOps Services",
      "Cloud Automation Services",
      "Azure Kubernetes consulting India"
    ],
    cs: [
      {
        c: "MRF",
        h: "Embee Empowers 6K+ Dealers of MRF Tyres with a Customized Dealer Portal Application- MRF Tyre World Built on Azure Cloud with Intelligent Search and Discovery Capabilitie",
        m: ["Automated zero-downtime microservices deployments on Azure"],
        q: null
      }
    ]
  },
  {
    g: "Cloud Solutions",
    p: "Data, BI & AI Services",
    s: "Iqbal Baliwala and Aman Singhal",
    sec: [
      "Business Intelligence, Data Lake and Analytics",
      "AI, AI Apps and Agentic AI"
    ],
    pl: [
      "Microsoft Fabric",
      "Azure Databricks",
      "Azure OpenAI",
      "Power BI",
      "Azure SQL / Cosmos DB"
    ],
    a: [
      "Azure AI Readiness Assessment",
      "Data Analytics Assessment",
      "Well-Architected Review"
    ],
    k: [
      "Microsoft Fabric Consulting",
      "Azure AI Foundry",
      "Microsoft AI Solutions",
      "Azure Databricks Consulting",
      "Azure OpenAI Services"
    ],
    cs: [
      {
        c: "Perfetti Van Melle India",
        h: "Perfetti Van Melle India reduces material dispatch approval time by 35% and saves $17,000 annually with Microsoft Power Platform Digital Gate Pass Solution",
        m: [
          "Reduces material dispatch approval time by 35%",
          "Saves $17,000 annually",
          "Deployed within 8 weeks across 10+ manufacturing locations"
        ],
        q: "The Microsoft Power Platform solution has transformed our material management processes completely. We've moved from reactive, manual tracking to proactive, automated workflows that give us complete visibility across all of our facilities."
      }
    ]
  },
  {
    g: "Modern Workplace",
    p: "Microsoft Business and Enterprise Plans",
    s: "Pavan Verma and Vijay R Pandey",
    sec: ["Licence Optimisation & Tenant Governance (M365 FinOps)"],
    pl: [
      "Microsoft 365 (Modern Work)",
      "Microsoft Security",
      "Microsoft Intune / Windows 365 & AVD",
      "Microsoft Teams Platform (Rooms & Phone)",
      "Microsoft Purview"
    ],
    a: [
      "Microsoft 365 Tenant Health & Security Assessment (Em365 IQ)",
      "Licence Optimisation & Cost Assessment (E3 to E5 / ME7)",
      "Copilot / AI Readiness Assessment"
    ],
    k: [
      "Microsoft 365 Enterprise plans India",
      "M365 licensing optimisation",
      "Microsoft Solutions Partner Modern Work",
      "Microsoft 365 tenant governance"
    ],
    cs: [
      {
        c: "Greenlam Industries Limited",
        h: "Greenlam Industries Limited Fortifies Security Posture and Optimizes Costs with Microsoft Security Solutions",
        m: [
          "Reduced third-party licensing and management costs by approximately 30-40% through Microsoft ecosystem consolidation",
          "Reduced unauthorized access attempts by over 80% via Microsoft Entra ID Plan 2",
          "Gained 100% visibility into unsanctioned cloud apps (Shadow IT)"
        ],
        q: null
      },
      {
        c: "SBI Life",
        h: "SBI Life Insurance Transforms Digital Workplace with Microsoft 365, Enhancing Collaboration and Security for 24,000+ Employees",
        m: [
          "Migrated 24,000 users from HCL Notes to Office 365 using Quest tools",
          "Transferred 16 TB of enterprise data with zero business disruption"
        ],
        q: null
      }
    ]
  },
  {
    g: "Modern Workplace",
    p: "Modern Work Advisory & Consulting",
    s: "Pavan Verma and Vijay R Pandey",
    sec: ["Workplace Strategy & Roadmap", "Collaboration Architecture", "Compliance & Governance"],
    pl: [
      "Microsoft 365 (Modern Work)",
      "Microsoft Security",
      "Microsoft Teams Platform",
      "Microsoft Purview"
    ],
    a: [
      "Microsoft 365 Tenant Health & Security Assessment (Em365 IQ)",
      "Copilot / AI Readiness Assessment",
      "Zero Trust Identity & Access Assessment"
    ],
    k: [
      "Modern Work consulting services India",
      "Microsoft 365 advisory services",
      "Workplace modernization consulting"
    ],
    cs: [
      {
        c: "Greenlam Industries Limited",
        h: "Greenlam Industries Limited Fortifies Security Posture and Optimizes Costs with Microsoft Security Solutions",
        m: ["30-40% reduction in licensing management overhead"],
        q: null
      }
    ]
  },
  {
    g: "Modern Workplace",
    p: "Microsoft 365 Migration Services (Tenant-to-Tenant & Legacy Platforms)",
    s: "Pavan Verma and Vijay R Pandey",
    sec: ["Legacy Mail Migration (Notes/Zimbra/Exchange)", "Tenant-to-Tenant Consolidation", "SharePoint & OneDrive Migration"],
    pl: [
      "Microsoft 365",
      "Quest Migration Suite",
      "SharePoint Online",
      "OneDrive for Business"
    ],
    a: [
      "Migration Readiness & Discovery Assessment",
      "Microsoft 365 Tenant Health & Security Assessment (Em365 IQ)"
    ],
    k: [
      "Microsoft 365 Migration Services India",
      "HCL Notes to Office 365 migration",
      "Tenant to tenant migration Microsoft 365",
      "Email migration services India"
    ],
    cs: [
      {
        c: "SBI Life",
        h: "SBI Life Insurance Transforms Digital Workplace with Microsoft 365, Enhancing Collaboration and Security for 24,000+ Employees",
        m: [
          "Migrated 24,000 users and 16 TB of data from legacy HCL Notes to Microsoft 365",
          "Zero business disruption across 24,000 employees"
        ],
        q: null
      }
    ]
  },
  {
    g: "Modern Workplace",
    p: "Managed Modern Work & Security Services (24x7)",
    s: "Pavan Verma and Vijay R Pandey",
    sec: ["24x7 Service Desk & Admin Support", "Endpoint Management (Intune)", "Security Operations Center"],
    pl: [
      "Microsoft 365",
      "Microsoft Defender XDR",
      "Microsoft Intune",
      "Microsoft Sentinel"
    ],
    a: [
      "Microsoft 365 Tenant Health & Security Assessment (Em365 IQ)",
      "Zero Trust Identity & Access Assessment"
    ],
    k: [
      "Managed Microsoft 365 services India",
      "24x7 Modern Workplace support",
      "M365 managed security services"
    ],
    cs: [
      {
        c: "Angel One",
        h: "Angel One Modernizes IT Infrastructure with Microsoft 365, Enhancing Security and Streamlining Operations for 24.7 million Customers",
        m: [
          "Eliminated password vulnerabilities across 4,500 endpoints",
          "Unified device security governance"
        ],
        q: null
      }
    ]
  },
  {
    g: "Modern Workplace",
    p: "Microsoft 365 Backup and Recovery",
    s: "Pavan Verma and Vijay R Pandey",
    sec: ["Exchange, Teams & SharePoint Backup", "Ransomware Air-Gap Protection", "Granular Restore"],
    pl: ["Microsoft 365 Backup Storage", "Veeam for M365", "Azure Blob Storage"],
    a: [
      "Data Security & Compliance Assessment (DLP / Insider Risk)",
      "Microsoft 365 Tenant Health & Security Assessment (Em365 IQ)"
    ],
    k: [
      "Microsoft 365 backup services India",
      "Office 365 ransomware protection",
      "M365 disaster recovery"
    ],
    cs: [
      {
        c: "Greenlam Industries Limited",
        h: "Greenlam Industries Limited Fortifies Security Posture and Optimizes Costs with Microsoft Security Solutions",
        m: ["Unified data recovery and loss prevention across enterprise tenants"],
        q: null
      }
    ]
  },
  {
    g: "Modern Workplace",
    p: "Employee Experience, Adoption & Change Management (Microsoft Viva)",
    s: "Pavan Verma and Vijay R Pandey",
    sec: ["Viva Connections & Engage", "Viva Insights & Learning", "Adoption & Change Framework"],
    pl: ["Microsoft Viva", "Microsoft Teams", "SharePoint Online"],
    a: [
      "Copilot / AI Readiness Assessment",
      "Microsoft 365 Tenant Health & Security Assessment (Em365 IQ)"
    ],
    k: [
      "Microsoft Viva consulting India",
      "Modern workplace adoption change management",
      "Employee experience platform Microsoft"
    ],
    cs: [
      {
        c: "SBI Life",
        h: "SBI Life Insurance Transforms Digital Workplace with Microsoft 365, Enhancing Collaboration and Security for 24,000+ Employees",
        m: ["Rapid user adoption across 24,000 pan-India insurance personnel"],
        q: null
      }
    ]
  },
  {
    g: "AI & Analytics",
    p: "AI Strategy, Advisory & Services",
    s: "Tapas",
    sec: ["GenAI Roadmap & Envisioning", "Use Case Prioritisation", "AI Governance & Ethics"],
    pl: ["Azure AI Foundry", "Microsoft Fabric", "Azure OpenAI"],
    a: [
      "AI readiness assessment",
      "AI & Analytics Use case discovery & prioritization",
      "GenAI consulting & POCs"
    ],
    k: [
      "AI strategy consulting India",
      "Enterprise GenAI advisory",
      "Azure OpenAI consulting",
      "Microsoft AI Solutions partner"
    ],
    cs: [
      {
        c: "Godrej",
        h: "Godrej Transforms Document Management with AI-Powered \"Document Quest\" Bot, Reducing Search Time by 72%",
        m: [
          "Reduced manual effort in document search and query resolution by 72%",
          "Saved 20-30 minutes per user per day in HR, Finance and Legal departments"
        ],
        q: null
      }
    ]
  },
  {
    g: "AI & Analytics",
    p: "Data Engineering & Modernization",
    s: "Tapas",
    sec: ["Data Lakehouse Architecture", "ETL & Pipeline Modernization", "Unified Storage with OneLake"],
    pl: ["Microsoft Fabric", "Azure Databricks", "Azure Synapse", "Azure Data Factory"],
    a: [
      "Data strategy & architecture",
      "Data Analytics Assessment",
      "Data migration & integration"
    ],
    k: [
      "Microsoft Fabric Implementation",
      "Azure Databricks Consulting",
      "Data engineering services India",
      "Microsoft Fabric Partner"
    ],
    cs: [
      {
        c: "Flipkart",
        h: "Flipkart Internet Private Limited Gains 100% Visibility and Reduces Data Leakage Risk with Microsoft Security Solutions",
        m: [
          "Enabled monitoring of sensitive data usage on Windows 10/11 endpoints without agents",
          "100% visibility into data flows and unsanctioned applications"
        ],
        q: null
      }
    ]
  },
  {
    g: "AI & Analytics",
    p: "Managed Services",
    s: "Tapas",
    sec: ["Data Pipeline Operations", "Lakehouse Capacity Management", "Model Monitoring & Drift Detection"],
    pl: ["Microsoft Fabric", "Azure Databricks", "Azure Machine Learning"],
    a: [
      "Data governance & quality",
      "Forecasting & optimization"
    ],
    k: [
      "Managed data services India",
      "Managed BI and analytics",
      "Fabric capacity managed services"
    ],
    cs: [
      {
        c: "Perfetti Van Melle India",
        h: "Perfetti Van Melle India reduces material dispatch approval time by 35% and saves $17,000 annually with Microsoft Power Platform Digital Gate Pass Solution",
        m: ["Operational continuity across 10+ facilities with automated workflows"],
        q: "We've moved from reactive, manual tracking to proactive, automated workflows that give us complete visibility across all of our facilities."
      }
    ]
  },
  {
    g: "AI & Analytics",
    p: "Advanced Analytics & BI",
    s: "Tapas",
    sec: ["Executive Dashboards", "Predictive Modelling", "Self-Service Power BI Enablement"],
    pl: ["Power BI", "Microsoft Fabric", "Azure Analysis Services"],
    a: [
      "Data Analytics Assessment",
      "Forecasting & optimization"
    ],
    k: [
      "Power BI consulting services India",
      "Advanced business analytics Microsoft",
      "Fabric Power BI implementation"
    ],
    cs: [
      {
        c: "Perfetti Van Melle India",
        h: "Perfetti Van Melle India reduces material dispatch approval time by 35% and saves $17,000 annually with Microsoft Power Platform Digital Gate Pass Solution",
        m: ["100% transparency across 10+ factory locations and real-time dispatch reporting"],
        q: null
      }
    ]
  },
  {
    g: "AI & Analytics",
    p: "Industry Solutions",
    s: "Tapas",
    sec: ["Manufacturing & Supply Chain Analytics", "BFSI Risk & Compliance Intelligence", "Retail & FMCG Analytics"],
    pl: ["Microsoft Fabric", "Azure AI Foundry", "Power Platform"],
    a: [
      "AI & Analytics Use case discovery & prioritization",
      "Forecasting & optimization"
    ],
    k: [
      "Industry AI solutions India",
      "Manufacturing analytics solutions",
      "FMCG digital supply chain analytics"
    ],
    cs: [
      {
        c: "Perfetti Van Melle EMEA",
        h: "Perfetti Van Melle EMEA Digitizes Freight Shipment Planning with Microsoft Power Platform, Achieving 40-45% Reduction in Vendor Finalization Time and $14K Annual Savings",
        m: [
          "40-45% reduction in time to finalize monthly shipment vendors",
          "80%+ annexure approval turnaround within a week",
          "$14,000 annual operational savings"
        ],
        q: null
      }
    ]
  },
  {
    g: "Cybersecurity",
    p: "Cyber Advisory",
    s: "Suhas Desai",
    sec: ["Cyber Risk Governance", "Compliance Frameworks (DPDP, CERT-In, RBI)", "Virtual CISO Advisory"],
    pl: ["Microsoft Sentinel", "Microsoft Purview", "Microsoft Defender"],
    a: [
      "Cyber risk assessment",
      "Cloud Security Assessment",
      "Red Teaming and SOC Maturity assessment"
    ],
    k: [
      "Cybersecurity consulting India",
      "DPDP Act compliance advisory",
      "Cyber risk assessment services",
      "Virtual CISO services India"
    ],
    cs: [
      {
        c: "NIA",
        h: "EMBEE SOFTWARE | Customer Case Study",
        m: ["A track record of 95% customer retention across 2,500+ customers"],
        q: "Standing up a full SOC from scratch is a once-in-an-airport opportunity and Embee Software made sure we got it right the first time. From day one, we had unified visibility, automated response, and a security architecture built to scale."
      }
    ]
  },
  {
    g: "Cybersecurity",
    p: "Threat and Vulnerability Management",
    s: "Suhas Desai",
    sec: ["Continuous Vulnerability Assessment", "Penetration Testing (VAPT)", "Remediation Orchestration"],
    pl: ["Microsoft Defender Vulnerability Management", "Tenable / Qualys", "Microsoft Defender for Cloud"],
    a: [
      "Vulnerabilty assessment",
      "Cyber risk assessment"
    ],
    k: [
      "Vulnerability assessment India",
      "Enterprise threat management services",
      "VAPT services Microsoft"
    ],
    cs: [
      {
        c: "Flipkart",
        h: "Flipkart Internet Private Limited Gains 100% Visibility and Reduces Data Leakage Risk with Microsoft Security Solutions",
        m: ["Continuous endpoint vulnerability discovery and data leak mitigation"],
        q: null
      }
    ]
  },
  {
    g: "Cybersecurity",
    p: "Identity and Access Management",
    s: "Suhas Desai",
    sec: ["Conditional Access & MFA", "Privileged Identity Management (PIM)", "Identity Governance & Lifecycle"],
    pl: ["Microsoft Entra ID Plan 2", "Entra Identity Governance", "Windows Hello for Business"],
    a: [
      "IAM Risk Assessment",
      "Zero Trust Identity & Access Assessment"
    ],
    k: [
      "Identity and Access Management Services",
      "Microsoft Entra Consulting",
      "Zero Trust Implementation",
      "Identity Governance Solutions"
    ],
    cs: [
      {
        c: "Angel One",
        h: "Angel One Modernizes IT Infrastructure with Microsoft 365, Enhancing Security and Streamlining Operations for 24.7 million Customers",
        m: [
          "Implemented Windows Hello for Business across 4,500+ endpoints",
          "Eliminated password attack vectors for fintech operations"
        ],
        q: null
      },
      {
        c: "Greenlam Industries Limited",
        h: "Greenlam Industries Limited Fortifies Security Posture and Optimizes Costs with Microsoft Security Solutions",
        m: ["Reduced unauthorized access attempts by over 80% with Entra ID Plan 2"],
        q: null
      }
    ]
  },
  {
    g: "Cybersecurity",
    p: "Managed Detection and Response",
    s: "Suhas Desai",
    sec: ["24x7 Threat Hunting", "SOAR Automated Playbooks", "Incident Response & Forensics"],
    pl: ["Microsoft Sentinel", "Microsoft Defender XDR", "Microsoft Copilot for Security"],
    a: [
      "Red Teaming and SOC Maturity assessment",
      "Cloud Security Assessment"
    ],
    k: [
      "Managed Detection and Response India",
      "MDR services Microsoft Sentinel",
      "24x7 SOC services India"
    ],
    cs: [
      {
        c: "AmiCorp Group",
        h: "AmiCorp Group Achieves Unified Security Visibility and Enhanced Threat Protection with Microsoft Sentinel",
        m: ["Unified threat detection and 24x7 automated containment"],
        q: null
      },
      {
        c: "NIA",
        h: "EMBEE SOFTWARE | Customer Case Study",
        m: ["Zero-day threat visibility from day one of greenfield airport launch"],
        q: "From day one, we had unified visibility, automated response, and a security architecture built to scale."
      }
    ]
  },
  {
    g: "Cybersecurity",
    p: "Cloud and Infra Security",
    s: "Suhas Desai",
    sec: ["Cloud Security Posture Management (CSPM)", "Cloud Workload Protection (CWPP)", "Network Micro-segmentation"],
    pl: ["Defender for Cloud", "Azure Firewall", "Microsoft Purview"],
    a: [
      "Cloud Security Assessment",
      "Cyber risk assessment"
    ],
    k: [
      "Cloud security services India",
      "Azure infrastructure security",
      "Defender for Cloud implementation"
    ],
    cs: [
      {
        c: "Greenlam Industries Limited",
        h: "Greenlam Industries Limited Fortifies Security Posture and Optimizes Costs with Microsoft Security Solutions",
        m: ["100% visibility into unsanctioned cloud apps (Shadow IT)"],
        q: null
      }
    ]
  },
  {
    g: "Business Applications",
    p: "Portal Development",
    s: "Dipankar and Ashish Kothari",
    sec: ["Document Management System (DMS)", "Dealer & Vendor Portals", "Intranet & Employee Portals"],
    pl: ["SharePoint Online", "Power Pages", "Power Platform", "Microsoft Teams"],
    a: ["Portal Architecture Discovery", "DMS Migration Assessment"],
    k: [
      "SharePoint portal development India",
      "Enterprise intranet services",
      "Document Management System SharePoint"
    ],
    cs: [
      {
        c: "MRF",
        h: "Embee Empowers 6K+ Dealers of MRF Tyres with a Customized Dealer Portal Application- MRF Tyre World Built on Azure Cloud with Intelligent Search and Discovery Capabilitie",
        m: ["Custom portal for 6,000+ tire dealers nationwide with real-time stock access"],
        q: null
      },
      {
        c: "Godrej",
        h: "Godrej Transforms Document Management with AI-Powered \"Document Quest\" Bot, Reducing Search Time by 72%",
        m: ["Reduced manual effort in document search by 72%"],
        q: null
      }
    ]
  },
  {
    g: "Business Applications",
    p: "Migration Services (On-Premises to Online, Tenant-to-Tenant)",
    s: "Dipankar and Ashish Kothari",
    sec: ["SharePoint On-Prem to SharePoint Online", "File Share to OneDrive/SPO", "Legacy Workflow Migration"],
    pl: ["SharePoint Online", "ShareGate", "Power Automate"],
    a: ["Migration Discovery Workshop", "SharePoint Health Check"],
    k: [
      "SharePoint migration services India",
      "On-premises to SharePoint Online",
      "Tenant-to-tenant SharePoint migration"
    ],
    cs: [
      {
        c: "SBI Life",
        h: "EMBEE SOFTWARE | Customer Case Study",
        m: ["Migrated 21,000 user mailboxes and 16 TB of enterprise data with zero business disruption"],
        q: null
      }
    ]
  },
  {
    g: "Business Applications",
    p: "Custom Application Development",
    s: "Dipankar and Ashish Kothari",
    sec: [
      "Custom Workflow Development",
      "Application & Flow Development",
      "Native Mobile Apps Development",
      "Plugins & Extension Development"
    ],
    pl: ["Power Apps", "Power Automate", "Power Virtual Agents", "Dataverse"],
    a: ["Power Platform Governance & ROI Assessment"],
    k: [
      "Power Apps development company India",
      "Custom business workflow automation",
      "Power Platform consulting India"
    ],
    cs: [
      {
        c: "Perfetti Van Melle India",
        h: "Perfetti Van Melle India reduces material dispatch approval time by 35% and saves $17,000 annually with Microsoft Power Platform Digital Gate Pass Solution",
        m: [
          "Reduced material dispatch approval time by 35%",
          "Saved $17,000 annually",
          "Deployed within 8 weeks across 10+ manufacturing locations"
        ],
        q: "The Microsoft Power Platform solution has transformed our material management processes completely."
      }
    ]
  },
  {
    g: "Business Applications",
    p: "Agent Development (Standalone & Autonomous)",
    s: "Dipankar and Ashish Kothari",
    sec: ["Autonomous Process Agents", "Customer Service Agents", "ERP Integration Connectors"],
    pl: ["Copilot Studio", "Power Automate", "Azure AI Foundry"],
    a: ["Agentic AI Readiness Review"],
    k: [
      "AI agent development India",
      "Microsoft Copilot Studio agent developers",
      "Autonomous workflow agents"
    ],
    cs: [
      {
        c: "Godrej",
        h: "Godrej Transforms Document Management with AI-Powered \"Document Quest\" Bot, Reducing Search Time by 72%",
        m: ["Automated document search and query answering with 72% time reduction"],
        q: null
      }
    ]
  },
  {
    g: "Business Applications",
    p: "Industry Solutions",
    s: "Dipankar and Ashish Kothari",
    sec: ["Function Wise Apps", "Industry Vertical Apps"],
    pl: ["Power Platform", "SharePoint Online", "Dataverse"],
    a: ["Business Process Modernisation Assessment"],
    k: [
      "Industry application development India",
      "Logistics workflow automation Power Apps",
      "Manufacturing digital gate pass"
    ],
    cs: [
      {
        c: "Perfetti Van Melle EMEA",
        h: "Perfetti Van Melle EMEA Digitizes Freight Shipment Planning with Microsoft Power Platform, Achieving 40-45% Reduction in Vendor Finalization Time and $14K Annual Savings",
        m: [
          "40-45% reduction in vendor finalization time",
          "80%+ annexure turnaround within one week",
          "$14,000 annual operational savings"
        ],
        q: null
      }
    ]
  },
  {
    g: "Enterprise Platforms",
    p: "SAP Business One (SQL, HANA)",
    s: "Rahul Kumar",
    sec: ["SAP B1 Implementation", "HANA on Azure Cloud Migration", "Octane HRMS Integration"],
    pl: ["SAP Business One HANA", "SAP Business One SQL", "Microsoft Azure for SAP"],
    a: ["SAP B1 Cloud Readiness Assessment", "SAP B1 Health Check"],
    k: [
      "SAP Business One partner India",
      "SAP B1 on Azure",
      "SAP Gold Partner India",
      "SAP Business One HANA implementation"
    ],
    cs: [
      {
        c: "Cement Corporation of India (CCI)",
        h: "Cement Corporation of India Modernizes Operations with SAP Business One and Octane HRMS on Azure Cloud, Achieving Unified Management and Enhanced Visibility",
        m: ["Unified management across factories with SAP B1 and Octane HRMS on Azure"],
        q: null
      },
      {
        c: "Hy-Tech",
        h: "Hy-Tech Streamlines Manufacturing Operations and Boosts Real-Time Data Availability with SAP Business One HANA on Azure",
        m: ["Real-time reporting and inventory tracking with SAP B1 HANA on Azure"],
        q: null
      }
    ]
  },
  {
    g: "Enterprise Platforms",
    p: "SAP S/4HANA, Rise with SAP",
    s: "Rahul Kumar",
    sec: ["Greenfield & Brownfield S/4HANA", "Rise with SAP Managed Cloud", "S/4HANA Migration to Azure"],
    pl: ["SAP S/4HANA", "Rise with SAP", "Microsoft Azure for SAP"],
    a: ["SAP S/4HANA Migration Readiness Assessment"],
    k: [
      "Rise with SAP on Azure India",
      "SAP S/4HANA migration services",
      "SAP Gold Partner enterprise"
    ],
    cs: [
      {
        c: "Cement Corporation of India (CCI)",
        h: "Cement Corporation of India Modernizes Operations with SAP Business One and Octane HRMS on Azure Cloud, Achieving Unified Management and Enhanced Visibility",
        m: ["Operational modernisation with SAP enterprise platform on Azure"],
        q: null
      }
    ]
  },
  {
    g: "Enterprise Platforms",
    p: "SAP S/4HANA, Grow with SAP",
    s: "Rahul Kumar",
    sec: ["Mid-Market Cloud ERP", "Pre-Configured Industry Best Practices", "Rapid Deployment Services"],
    pl: ["Grow with SAP", "SAP S/4HANA Cloud Public Edition"],
    a: ["Grow with SAP Fit-to-Standard Assessment"],
    k: [
      "Grow with SAP partner India",
      "SAP S/4HANA public cloud",
      "Mid-market SAP ERP implementation"
    ],
    cs: [
      {
        c: "Hy-Tech",
        h: "Hy-Tech Streamlines Manufacturing Operations and Boosts Real-Time Data Availability with SAP Business One HANA on Azure",
        m: ["Rapid manufacturing go-live with high availability"],
        q: null
      }
    ]
  },
  {
    g: "Enterprise Platforms",
    p: "SAP Business Suite",
    s: "Rahul Kumar",
    sec: ["ECC 6.0 Maintenance & Modernization", "Database Migration to HANA", "High Availability Architecture"],
    pl: ["SAP ECC 6.0", "SAP NetWeaver", "Azure Virtual Machines"],
    a: ["SAP Infrastructure Modernization Review"],
    k: [
      "SAP on Azure migration India",
      "SAP ECC modernization",
      "SAP disaster recovery Azure"
    ],
    cs: [
      {
        c: "Cement Corporation of India (CCI)",
        h: "Cement Corporation of India Modernizes Operations with SAP Business One and Octane HRMS on Azure Cloud, Achieving Unified Management and Enhanced Visibility",
        m: ["Unified management and high availability infrastructure"],
        q: null
      }
    ]
  },
  {
    g: "Enterprise Platforms",
    p: "SAP Signavio and LeanIX",
    s: "Rahul Kumar",
    sec: ["Business Process Mining", "Enterprise Architecture Management", "Transformation Governance"],
    pl: ["SAP Signavio", "SAP LeanIX"],
    a: ["Process Mining Readiness Assessment"],
    k: [
      "SAP Signavio consulting India",
      "SAP LeanIX enterprise architecture",
      "Business process transformation"
    ],
    cs: [
      {
        c: "Hy-Tech",
        h: "Hy-Tech Streamlines Manufacturing Operations and Boosts Real-Time Data Availability with SAP Business One HANA on Azure",
        m: ["End-to-end manufacturing process mapping and optimization"],
        q: null
      }
    ]
  },
  {
    g: "IT Infrastructure",
    p: "Data Center Transformation",
    s: "Uday Bhanu",
    sec: ["Hyperconverged Infrastructure (HCI)", "Data Center Consolidation", "Hybrid Cloud Migration"],
    pl: ["Microsoft Azure", "HPE", "Dell EMC", "Cisco", "VMware"],
    a: ["Data Center Modernization Assessment", "Infrastructure TCO Review"],
    k: [
      "Data Center Transformation India",
      "Hybrid infrastructure modernization",
      "Hyperconverged infrastructure partner"
    ],
    cs: [
      {
        c: "Angel One",
        h: "Angel One Modernizes IT Infrastructure with Microsoft 365, Enhancing Security and Streamlining Operations for 24.7 million Customers",
        m: ["Transformed enterprise infrastructure supporting millions of trading users"],
        q: null
      }
    ]
  },
  {
    g: "IT Infrastructure",
    p: "Networking & Security",
    s: "Uday Bhanu",
    sec: ["Software-Defined WAN (SD-WAN)", "Zero Trust Network Access", "Next-Gen Firewall Implementation"],
    pl: ["Cisco", "Fortinet", "Palo Alto Networks", "Sophos", "Azure Virtual WAN"],
    a: ["Network Architecture & Security Audit"],
    k: [
      "Enterprise networking services India",
      "SD-WAN deployment services",
      "Network security integrator India"
    ],
    cs: [
      {
        c: "SBI Life",
        h: "SBI Life Insurance Transforms Digital Workplace with Microsoft 365, Enhancing Collaboration and Security for 24,000+ Employees",
        m: ["High-speed secure branch connectivity across pan-India offices"],
        q: null
      }
    ]
  },
  {
    g: "IT Infrastructure",
    p: "System Integration Services",
    s: "Uday Bhanu",
    sec: ["Multi-Vendor Hardware Integration", "Virtualization & Storage Clustering", "IT Estate Turnkey Rollouts"],
    pl: ["Lenovo", "Dell EMC", "HPE", "IBM", "Veritas"],
    a: ["IT Infrastructure Health Audit"],
    k: [
      "System integration services India",
      "Enterprise IT infrastructure partner",
      "Turnkey hardware integration"
    ],
    cs: [
      {
        c: "Angel One",
        h: "Angel One Modernizes IT Infrastructure with Microsoft 365, Enhancing Security and Streamlining Operations for 24.7 million Customers",
        m: ["Standardized IT estate for rapid customer expansion"],
        q: null
      }
    ]
  },
  {
    g: "IT Infrastructure",
    p: "Audio-Visual Solutions",
    s: "Uday Bhanu",
    sec: ["Teams Rooms & Boardroom Systems", "Acoustic & Video Optimization", "Smart Workplace Display Panels"],
    pl: ["Microsoft Teams Rooms", "Logitech", "Poly", "Crestron"],
    a: ["Modern Meeting Room Assessment"],
    k: [
      "Microsoft Teams Rooms setup India",
      "Enterprise AV integration",
      "Smart boardroom solutions"
    ],
    cs: [
      {
        c: "Godrej",
        h: "Godrej Transforms Document Management with AI-Powered \"Document Quest\" Bot, Reducing Search Time by 72%",
        m: ["Modernized collaborative environments across hybrid teams"],
        q: null
      }
    ]
  },
  {
    g: "IT Infrastructure",
    p: "Intelligent Surveillance",
    s: "Uday Bhanu",
    sec: ["AI-Powered Video Analytics", "Centralised IP Surveillance", "Edge Storage & Monitoring"],
    pl: ["Axis Communications", "Hikvision Enterprise", "Milestone VMS"],
    a: ["Physical Security & Surveillance Audit"],
    k: [
      "Intelligent surveillance solutions India",
      "AI video analytics enterprise",
      "Centralized CCTV infrastructure"
    ],
    cs: [
      {
        c: "Cement Corporation of India (CCI)",
        h: "Cement Corporation of India Modernizes Operations with SAP Business One and Octane HRMS on Azure Cloud, Achieving Unified Management and Enhanced Visibility",
        m: ["Plant surveillance and central security visibility"],
        q: null
      }
    ]
  },
  {
    g: "Managed Services",
    p: "Managed Cloud Services",
    s: "Nirmalya",
    sec: ["24x7 Cloud Operations", "Patch Management & Backup Monitoring", "Incident Escalation & SLA Guarantees"],
    pl: ["Microsoft Azure", "AWS", "Azure Arc"],
    a: ["Cloud Managed Services Readiness Review"],
    k: [
      "Managed Cloud Services India",
      "24x7 Azure Managed Services",
      "Cloud operations SLA support"
    ],
    cs: [
      {
        c: "Angel One",
        h: "Angel One Modernizes IT Infrastructure with Microsoft 365, Enhancing Security and Streamlining Operations for 24.7 million Customers",
        m: ["24x7 mission-critical workload uptime"],
        q: null
      }
    ]
  },
  {
    g: "Managed Services",
    p: "Managed Modern Workplace",
    s: "Nirmalya",
    sec: ["M365 Tenant Admin as a Service", "Zero Trust Identity & Device Lifecycle", "VIP User White-Glove Support"],
    pl: ["Microsoft 365", "Microsoft Intune", "Windows 365"],
    a: ["Modern Workplace Operations Audit"],
    k: [
      "Managed modern workplace India",
      "M365 white glove support",
      "End-user computing managed services"
    ],
    cs: [
      {
        c: "SBI Life",
        h: "SBI Life Insurance Transforms Digital Workplace with Microsoft 365, Enhancing Collaboration and Security for 24,000+ Employees",
        m: ["Continuous administration and VIP support for 24,000 users"],
        q: null
      }
    ]
  },
  {
    g: "Managed Services",
    p: "Managed Infrastructure",
    s: "Nirmalya",
    sec: ["On-Premises Server & Storage Management", "Network NOC 24x7", "Preventive Hardware Maintenance"],
    pl: ["HPE", "Dell EMC", "Cisco", "VMware"],
    a: ["Infrastructure Operations Maturity Review"],
    k: [
      "Managed IT infrastructure India",
      "24x7 NOC services India",
      "Enterprise server management"
    ],
    cs: [
      {
        c: "AmiCorp Group",
        h: "AmiCorp Group Achieves Unified Security Visibility and Enhanced Threat Protection with Microsoft Sentinel",
        m: ["Continuous infrastructure health and alert management"],
        q: null
      }
    ]
  },
  {
    g: "Managed Services",
    p: "Managed Security",
    s: "Nirmalya",
    sec: ["Security Operations Center (SOC)", "XDR Alert Triage & Containment", "Vulnerability Remediation Tracking"],
    pl: ["Microsoft Sentinel", "Microsoft Defender XDR"],
    a: ["SOC Maturity Review"],
    k: [
      "Managed Security Services India",
      "MSSP Microsoft India",
      "Managed SOC provider"
    ],
    cs: [
      {
        c: "NIA",
        h: "EMBEE SOFTWARE | Customer Case Study",
        m: ["Unified visibility and automated response for new greenfield airport"],
        q: "Standing up a full SOC from scratch is a once-in-an-airport opportunity and Embee Software made sure we got it right the first time."
      }
    ]
  },
  {
    g: "Managed Services",
    p: "Managed System Integration",
    s: "Nirmalya",
    sec: [
      "Copilot & AI Agent Enablement (M365 Copilot, Copilot Studio, Agent 365)",
      "Copilot Adoption",
      "Agentic AI Development",
      "Copilot Enablement"
    ],
    pl: ["Microsoft 365 Copilot", "Copilot Studio", "Power Platform"],
    a: ["AI Agent Managed Operations Review"],
    k: [
      "Managed Copilot services India",
      "AI Agent enablement managed partner",
      "Copilot Studio lifecycle support"
    ],
    cs: [
      {
        c: "Perfetti Van Melle India",
        h: "Perfetti Van Melle India reduces material dispatch approval time by 35% and saves $17,000 annually with Microsoft Power Platform Digital Gate Pass Solution",
        m: ["Ongoing automation lifecycle management across 10+ factory sites"],
        q: null
      }
    ]
  },
  {
    g: "Copilot & Agentic AI",
    p: "Copilot & AI Strategy Advisory",
    s: "Nirajkumar Pandey",
    sec: [
      "AI Strategy, Advisory & Executive Envisioning",
      "Copilot Readiness, Security & Licensing Advisory",
      "Copilot Envisioning Workshop & Proof of Value (PoV)"
    ],
    pl: [
      "Microsoft 365 Copilot",
      "Copilot Studio",
      "Agent 365",
      "Microsoft Fabric",
      "Azure AI"
    ],
    a: [
      "Copilot & AI Readiness Assessment",
      "Microsoft 365 Tenant Health & Security Assessment",
      "Copilot PoV & Business Case Assessment",
      "Copilot Deployment Readiness Assessment"
    ],
    k: [
      "Microsoft 365 Copilot consulting India",
      "Copilot readiness assessment",
      "Copilot strategy advisory",
      "Microsoft AI Solutions partner"
    ],
    cs: [
      {
        c: "Greenlam Industries Limited",
        h: "Greenlam Industries Limited Fortifies Security Posture and Optimizes Costs with Microsoft Security Solutions",
        m: ["Established data governance and identity baseline prior to AI enablement"],
        q: null
      }
    ]
  },
  {
    g: "Copilot & Agentic AI",
    p: "Copilot Deployment & Enablement",
    s: "Nirajkumar Pandey",
    sec: [
      "M365 Copilot Deployment Accelerator",
      "Agent Solution Deployment Accelerator",
      "Copilot Chat Deployment & Enablement",
      "Copilot Studio Agent Discovery, Design & Deployment",
      "Microsoft 365 E7 & Agent 365 Enablement"
    ],
    pl: [
      "Microsoft 365 Copilot",
      "Copilot Studio",
      "Teams",
      "Outlook",
      "Word",
      "Excel",
      "PowerPoint"
    ],
    a: [
      "Copilot Deployment Readiness Assessment",
      "Agent Design & Governance Assessment"
    ],
    k: [
      "Microsoft Copilot deployment partner India",
      "Copilot Studio deployment accelerator",
      "M365 Copilot implementation"
    ],
    cs: [
      {
        c: "Perfetti Van Melle India",
        h: "Perfetti Van Melle India reduces material dispatch approval time by 35% and saves $17,000 annually with Microsoft Power Platform Digital Gate Pass Solution",
        m: ["Rapid 8-week low-code and digital assistant deployment"],
        q: null
      }
    ]
  },
  {
    g: "Copilot & Agentic AI",
    p: "Copilot Adoption & Governance",
    s: "Nirajkumar Pandey",
    sec: [
      "Copilot Adoption & Change Management",
      "Role-Based Workshops & User Training",
      "AI Governance, Security & Compliance for Copilot",
      "Copilot Cowork & Consumption Governance"
    ],
    pl: [
      "Microsoft Viva",
      "Copilot Dashboard",
      "Microsoft Purview",
      "Microsoft Entra"
    ],
    a: [
      "Adoption & Employee Experience Assessment",
      "Persona & Scenario Readiness Assessment",
      "Copilot Chat Adoption Assessment"
    ],
    k: [
      "Microsoft Copilot adoption services India",
      "Copilot change management training",
      "AI governance Purview Copilot"
    ],
    cs: [
      {
        c: "SBI Life",
        h: "SBI Life Insurance Transforms Digital Workplace with Microsoft 365, Enhancing Collaboration and Security for 24,000+ Employees",
        m: ["Role-based training and smooth rollout across 24,000 financial services employees"],
        q: null
      }
    ]
  },
  {
    g: "Copilot & Agentic AI",
    p: "Agentic AI & Copilot Studio",
    s: "Nirajkumar Pandey",
    sec: [
      "Pre-Built Enterprise Agents & Accelerators",
      "Industry-Specific AI Agents"
    ],
    pl: [
      "Copilot Studio",
      "Power Platform",
      "Azure AI Foundry",
      "Agent SDK",
      "Dataverse"
    ],
    a: [
      "Agent Design & Governance Assessment",
      "Copilot & AI Readiness Assessment"
    ],
    k: [
      "Copilot Studio agent development India",
      "Agentic AI enterprise solutions",
      "Autonomous Copilot agents"
    ],
    cs: [
      {
        c: "Godrej",
        h: "Godrej Transforms Document Management with AI-Powered \"Document Quest\" Bot, Reducing Search Time by 72%",
        m: [
          "Reduced manual effort by 72% with an AI-powered conversational agent",
          "20-30 minutes saved per user every day"
        ],
        q: null
      }
    ]
  },
  {
    g: "Copilot & Agentic AI",
    p: "Managed Copilot & Agent Lifecycle Services",
    s: "Nirajkumar Pandey",
    sec: [
      "Managed Copilot & Agent Lifecycle Services",
      "Prompt Optimization & Performance Monitoring",
      "Model Guardrails & Access Governance"
    ],
    pl: [
      "Microsoft 365 Copilot",
      "Copilot Studio",
      "Microsoft Purview",
      "Power Platform Admin Center"
    ],
    a: [
      "Copilot PoV & Business Case Assessment",
      "Agent Design & Governance Assessment"
    ],
    k: [
      "Managed Copilot lifecycle services",
      "Copilot Studio managed support India",
      "AI Agent performance monitoring"
    ],
    cs: [
      {
        c: "Perfetti Van Melle EMEA",
        h: "Perfetti Van Melle EMEA Digitizes Freight Shipment Planning with Microsoft Power Platform, Achieving 40-45% Reduction in Vendor Finalization Time and $14K Annual Savings",
        m: ["Continuous optimization of business agent flows and $14K annual cost savings"],
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
SECTIONS UNDER THIS PILLAR: ${config.sections.join("; ") || "none listed"}
PLATFORMS IN THIS GROUP: ${config.platforms.join("; ") || "none listed"}
ASSESSMENTS TO FEATURE: ${config.assessments.join("; ") || "none mapped, propose one relevant assessment"}
TARGET KEYWORDS: ${config.targetKeywords.join("; ") || "derive from the pillar name"}
PRIMARY AUDIENCE: ${config.primaryAudience}
COMPANY SIZE: ${config.companySize}
EMPHASISE: ${config.emphasiseAngle || "no specific angle given"}

BRAND AND STYLE RULES (non negotiable):
- Always write "Embee Software" in full. Never just "Embee".
- Microsoft relationship is "Microsoft Frontier Partner" and "Microsoft Solutions Partner". NEVER write "Microsoft Gold Partner". SAP relationship is "SAP Gold Partner".
- NEVER use an em dash or an en dash anywhere. Use a comma, a colon, or restructure the sentence. This applies to every line of output.
- Indian English spelling: optimisation, prioritised, organisation, centre.
- Tagline: "Making IT Easier".
- Lead with the business outcome, never the product. The internal mandate is: every conversation starts with a business problem and ends with the proposed solution.
- NEVER invent a statistic, customer name, award or credential. If a figure would help but is not in the facts below, write a clear placeholder like [X certified Azure architects] so it can be filled in. A placeholder is correct. An invented number is not.
- Embee Software serves organisations of every size, from SMB through to large enterprise, across India and beyond. Never describe Embee Software as a small, boutique or mid-market-only firm, and never imply it cannot serve large enterprises.

COMPANY FACTS. Use these exact figures and never invent variants.
NEVER state a founding year. Say "35+ years of experience", never "since 19xx".
- Embee Software Pvt Ltd, embee.co.in
- 35+ years of experience
- 3,500+ customers
- 1,000+ employees, including 500+ technical engineers and professionals
- 10+ locations across India
- 17 Microsoft advanced specializations
- Microsoft Solutions Partner; Microsoft Frontier Partner
- SAP Gold Partner
- 2024 Microsoft India & South Asia Partner of the Year, Modern Work
- Microsoft Fabric Featured Partner
- Octane HRMS: 100K+ users
- Market is India

REAL CUSTOMER PROOF. Use ONLY these. Never invent a customer, a metric or a quote.
If none of the case studies below genuinely fits this pillar, write the proof section around the assessment and the delivery approach instead, and say nothing about a customer. A fabricated outcome is worse than no outcome.
${csBlock}

COMPETITIVE CONTEXT (for your understanding only, NEVER name any of these on the page):
HCL Technologies, Infosys, NTT Data, Wipro, TCS, Tech Mahindra, LTIMindtree, Softchoice, Silver Touch, Team Computers, IFI Techsolutions, Rishabh Software.
The landing page must NEVER name a competitor, never compare Embee Software to a named company, and never position Embee Software as an alternative to anyone by name.
Differentiation is expressed only as what to look for in a partner.

DESIGN AND POSITIONING REFERENCES (internal only, never named on the page):
IBM is the north star. HCLTech is the primary design reference. Hexaware is secondary.

SIBLING PILLARS IN THIS GROUP (use for the Related Solutions section):
${siblingsList}

RESEARCH BRIEF (may be empty, if so say nothing that depends on it):
${researchText}`;
}

export const LANDING_PAGE_PROMPT_TEMPLATE = `You are writing the definitive landing page for an Indian B2B IT services company.
This must be the best page on the internet for this solution, more useful, more
specific and more complete than anything the competitors listed below have published.

[[INSERT THE SHARED BRIEF HERE]]

OUTPUT: finished landing page copy ONLY. No SEO notes, no meta tags, no schema, no
design instructions, no commentary, no explanation of your choices. This goes straight
to stakeholders as a copy document.

FORMAT, Markdown, structured so a stakeholder can see the page shape at a glance:
- # for the H1 (exactly one)
- ## for each major section heading
- ### for sub-sections and for each FAQ question
- **Eyebrow:** text on its own line where a small label sits above a heading
- Normal paragraphs for body copy
- - bullets only where a list genuinely reads better than prose
- A Markdown table for the comparison section
- > **CTA:** button text · supporting line for every call to action, on its own line
- --- between major sections
Do not wrap the whole thing in a code fence. No title page, preamble or sign-off.

HARD RULES:
1. ONE H1. It names the service plainly and includes the primary keyword. Never
   "has never been easier" or similar empty phrasing.
2. The first 60 words define the service, name who it is for, and say what Embee
   Software specifically does. No "in today's rapidly evolving landscape" openings. Ever.
3. Section headings are the questions a real buyer asks, for example "What does an
   Azure migration involve?", not "Our Approach" or "Why Choose Us".
4. EVERY claim carries a specific: a number, a named product, a named customer, a
   timeframe or a version. Delete any sentence that could appear on a competitor's
   site unchanged.
5. Write for Indian buyers explicitly. Name India. Address data residency (Azure India
   regions) and the compliance regime that applies, DPDP Act 2023, and RBI, SEBI or
   IRDAI if the audience is regulated.
6. Address the reader's actual decision. A CIO wants risk, timeline and business case.
   A CISO wants threat surface, compliance and evidence. An IT manager wants what
   breaks and who fixes it at 2am.
7. Include a "What to look for in a partner" table or short pointer list. This is where
   differentiation lives. Frame it as the criteria a buyer should apply when evaluating
   ANY partner, with Embee Software's position against each. NEVER name a competitor.
   Never write "unlike the big firms", "unlike large SIs", or anything implying Embee
   Software is smaller or an underdog. Embee Software serves every company size.
8. Answer the strongest objection head on, without naming or alluding to any competitor.
8a. NEVER mention pricing, cost figures, rate cards, GST, licence costs or budget ranges
   anywhere on the page. If a buyer question is about cost, answer it in terms of what
   drives cost, scope, estate volume, licensing model, and route to the assessment.
9. Include the assessment as a real section. Only its NAME is given to you. Design the
   rest from industry best practice and what is genuinely feasible for a Microsoft
   partner: what it examines (4 to 6 concrete areas), a realistic duration, what the
   buyer receives at the end (name the actual deliverables), and who should be in the
   room. Make it feel like consulting, not a lead form. No price, and do not claim it
   is free unless that is stated in the brief.
10. Weave the target keywords in naturally. If a keyword cannot be used without sounding
   forced, leave it out.
11. Include at least one element only Embee Software could publish: a real delivery
   detail, a migration timeline, or a named customer outcome from the case studies
   supplied. If none fits, use a placeholder in square brackets rather than inventing one.
12. Do not use asterisks, hyphens or dashes decoratively in the prose. No em dashes, no
   en dashes, no " - " as a connector. Write clean sentences.

REQUIRED SECTIONS, in this order. This structure is approved, follow it.
1. Breadcrumb line: Home > What we do > [Solution group] > [Pillar name]
2. HERO: eyebrow, one H1, a sub headline of 20 to 30 words that leads with the outcome,
   a primary CTA, a secondary CTA, and a trust strip of four short credential items.
3. THE PROBLEM WE SOLVE: three or four buyer pain points, in the buyer's own words.
4. OUTCOMES WE DELIVER: around six business outcomes, each one specific.
5. WHAT THIS ENGAGEMENT COVERS: six service components with a line each.
6. HOW WE ENGAGE: the delivery phases, named, with realistic durations.
7. WHAT YOU RECEIVE: the actual deliverables, split into documents and built assets.
8. PLATFORMS AND TECHNOLOGIES: what is used, named specifically.
9. WHAT TO LOOK FOR IN A PARTNER: the differentiation table or pointers per rule 7.
10. PROOF: a named customer and a specific outcome from the case studies supplied.
11. THE ASSESSMENT: designed per rule 9, with its own CTA.
12. FAQ: six to eight questions a buyer genuinely asks, each answered in 40 to 80 words.
13. RELATED SOLUTIONS: three or four sibling pillars from the list in the brief, each
    with its name and a single line saying what it covers and when a reader should go
    there. This section exists for internal linking, so make each line genuinely useful.
14. CLOSING CTA.

Length: 1,400 to 2,200 words. Depth over padding, every paragraph earns its place.`;

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

8. FAQPAGE SCHEMA: complete JSON-LD for the 6 FAQs. State clearly that answers must match the visible copy word for word.

9. BREADCRUMBLIST SCHEMA: complete JSON-LD matching the visible breadcrumb.

10. INTERNAL LINKING PLAN: five outbound links with exact anchor text (group hub, two sibling pillars, one success story, one blog post) and three inbound links that must exist before publish, naming the pages that should carry them.

11. IMAGE REQUIREMENTS: for each image on the page: file name, alt text, format, max size. Note that any diagram carrying an argument needs that argument in body text too.

12. TECHNICAL CHECKLIST: self-referencing canonical, index/follow verification, sitemap inclusion (flag that ~540 current pages are missing from the sitemap, so verify rather than assume), Core Web Vitals targets, server-side rendering requirement, no duplicated desktop/mobile DOM blocks, and every statistic present in served HTML rather than injected by JavaScript.

13. Do not include any pricing, cost or GST guidance anywhere.

14. CANNIBALISATION WATCH: name the other pillars in this structure that could compete with this page for the same keyword, and state how to prevent it (canonical, or scope the other page differently).`;

export const DESIGNER_PROMPT_TEMPLATE = `You are giving a skilled in-house designer starting direction for this landing page. They will do their own research and visual work, you are pointing, not prescribing.

[[INSERT THE SHARED BRIEF HERE]]

OUTPUT: short, practical notes in Markdown. Use ## for each numbered area below and keep the prose tight. Under 500 words total. Do not specify colours, fonts, exact spacing or anything the designer owns.
Do NOT use em dashes or en dashes anywhere. Use colons or commas.

COVER:
1. PAGE RHYTHM: the section order and roughly how each should feel (dense, airy, scannable), noting where a reader is likely to drop off.
2. HERO: what the hero must communicate in three seconds, and what to avoid. Note that any statistic shown must be present in the HTML, not counted up by JavaScript from zero, because that is currently broken sitewide.
3. THE COMPARISON TABLE: how to make it readable on mobile without hiding rows.
4. THE ASSESSMENT SECTION: this is the primary conversion moment. Suggest how to make it feel valuable rather than like a lead-capture form.
5. PROOF: how to present a named customer outcome so the number carries.
6. DIAGRAM OPPORTUNITY: the one concept on this page worth illustrating, and what it should show.
7. MOBILE: the two things most likely to break on a phone for this page specifically.
8. REFERENCES: two or three named public pages worth looking at for this pattern, and what specifically to take from each.`;
