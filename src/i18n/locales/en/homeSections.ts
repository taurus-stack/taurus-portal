// English locale · homeSections (Overview/Features/Architecture/Solutions/Testimonials).
// Fully translated, P3. Icons / SVG paths / step letters are kept verbatim.
export default {
  // ===== P1 compat keys (flat) for old t('homeSection.*') calls =====
  overviewLabel: 'Overview',
  overviewTitle: 'The real unified distributed operations platform',
  featuresLabel: 'Core features',
  featuresTitle: 'Ten core capabilities covering the full operations lifecycle',
  featuresDesc:
    'From host onboarding to application deployments, from automation to secure access control, Taurus Stack ships an enterprise-grade unified operations solution.',
  archLabel: 'Architecture',
  archTitle: 'Microservice architecture, modular by design',
  archDesc:
    'Six core modules, each responsible for its own domain, collaborating over standardised protocols to build a true distributed, unified operations platform.',
  archAdvantagesTitle: 'Six product advantages',
  archAdvantagesDesc:
    'From architecture choices to defensive security, every detail in Taurus Stack is shaped against enterprise-grade production standards.',
  archSecurityLabel: 'Security architecture',
  securityTitle: 'Defence-in-depth security, enterprise-grade trust',
  securityDesc:
    'Layered security from the network to the application layer — built to meet strict regulatory requirements in finance and the public sector.',
  solutionsLabel: 'Solutions',
  solutionsTitle: 'Deeply rooted in each industry, truly fit for the scenario',
  solutionsDesc:
    'Tailored operations solutions for customers across industries, so technology truly serves business outcomes.',
  testimonialsLabel: 'Customer stories',
  testimonialsTitle: 'Feedback from real use cases',
  testimonialsDesc:
    'Teams of all sizes build their operations stack on Taurus Stack — raising standardization, automation and security together.',
  contactLabel: 'Contact us',
  contactHeroTitle: 'Start your intelligent operations journey',
  contactHeroDesc:
    'Book a product demo by filling in the form. Our solutions experts will reach out within one business day with a tailored plan for your environment.',
  scheduleFormTitle: 'Book a product demo',
  scheduleFormDesc:
    'Fill in the fields below and an expert will walk you through the platform one-on-one.',

  // ===== P2 deep structure =====
  overviewParagraph1:
    'Taurus Stack is an enterprise-grade, distributed, unified operations management platform built on a microservice architecture. It covers the full landscape: host inventory, automation, application deployments, monitoring & alerting, and secure authentication. It helps organizations raise the standardization, automation and security posture of their operations work.',
  overviewParagraph2:
    'Six core modules work together — from the front-end console to the backend services, from remote executors to host daemons, from authentication to scheduling — assembling a complete enterprise-grade operations technology stack.',
  painPoints: {
    p1: {
      title: 'Fragmented tools',
      desc: 'Host inventory, deployments, monitoring and alerting all live in silos — data doesn’t flow and processes break.',
    },
    p2: {
      title: 'Upgrades hurt the business',
      desc: 'Upgrading agents or host daemons used to force business restarts — long downtime windows and high risk.',
    },
    p3: {
      title: 'Visible security gaps',
      desc: 'Operations channels lacked strong auth and encryption, audit trails were incomplete, and compliance was hard to prove.',
    },
  },
  metrics: {
    m1: { value: '< 1s', trend: 'downtime', label: 'Zero-downtime upgrades' },
    m2: { value: '6', trend: 'modules', label: 'Unified capabilities' },
    m3: { value: '100%', trend: 'mTLS', label: 'Transport encryption' },
    m4: { value: '3 tiers', trend: 'RBAC', label: 'Granular permissions' },
  },
  modules: {
    web: { step: 'W', name: 'Taurus Web', desc: 'Vue 3 + Element Plus management console' },
    backend: { step: 'B', name: 'Taurus Backend', desc: 'Django core API service' },
    executor: { step: 'E', name: 'Taurus Executor', desc: 'gRPC remote command executor' },
    supervisor: { step: 'S', name: 'Taurus Supervisor', desc: 'Generic process supervisor daemon' },
    auth: { step: 'A', name: 'Taurus Auth', desc: 'Macaroon ticket-based authentication' },
    scheduler: { step: 'C', name: 'Taurus Scheduler', desc: 'Distributed task scheduler' },
  },

  // ============= Features =============
  features: {
    f1: {
      iconClass: 'automation',
      title: 'Host lifecycle management',
      desc: 'End-to-end host onboarding approvals, state tracking and certificate management keep every onboarded host trustworthy and controlled.',
      iconPath:
        'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
      points: [
        'One-time registration tokens + IP allow-lists',
        'Heartbeat monitoring with online / offline tracking',
        'Certificate lifecycle and revocation management',
        'Host grouping and tag management',
      ],
    },
    f2: {
      iconClass: 'monitor',
      title: 'Automation operations center',
      desc: 'High-performance remote command execution over gRPC with real-time streaming output and interactive shell sessions.',
      iconPath:
        'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      points: [
        'Remote command execution · real-time streaming output',
        'Script template library (Shell / Python)',
        'Secure file transfer (upload / download)',
        'Interactive shell sessions',
        'Bulk operations and group execution',
      ],
    },
    f3: {
      iconClass: 'logs',
      title: 'Workflow engine',
      desc: 'Visual multi-step workflow orchestration turns complex operations scenarios into standardized, reusable, automated pipelines.',
      iconPath:
        'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
      points: [
        'Visual multi-step workflow composer',
        'Execution tracking with live state display',
        'Retry on failure and exception handling',
        'Historical run audit and playback',
      ],
    },
    f4: {
      iconClass: 'orchestration',
      title: 'Scheduled task orchestration',
      desc: 'Distributed scheduling service with Cron-expression based scheduled tasks, complex dependency graphs and failure alerting.',
      iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      points: [
        'Cron-expression scheduled tasks',
        'Distributed, highly-available deployment',
        'Task dependencies and orchestration',
        'Execution history recording and failure alerting',
      ],
    },
    f5: {
      iconClass: 'asset',
      title: 'Program deployment & management',
      desc: 'Remote program installation with full lifecycle management, policy-driven bulk distribution, and one-click start/stop/restart.',
      iconPath: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12',
      points: [
        'Remote program install and uninstall',
        'Version management and upgrade policies',
        'Policy-driven bulk distribution',
        'Start / Stop / Restart commands',
        'Program configuration file management',
      ],
    },
    f6: {
      iconClass: 'tenant',
      title: 'Generic process supervisor',
      desc: 'A lightweight generic process-supervisor daemon that manages any program for its entire lifecycle, with zero-downtime upgrades.',
      iconPath:
        'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      points: [
        'Manage any executable program',
        'Zero-downtime upgrades (< 1 s interruption)',
        'Crash auto-recovery and restart',
        'Automatic rollback on failed upgrades',
        'State recovery after power loss + heartbeat reporting',
      ],
    },
    f7: {
      iconClass: 'monitor',
      title: 'Monitoring & alerting',
      desc: 'Full-scope host and program state monitoring with real-time anomaly alerting — keeps business services stable.',
      iconPath:
        'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      points: [
        'CPU / memory / disk / network / load collectors',
        'Program state monitoring and anomaly alerting',
        'Heartbeat reporting and offline detection',
        'Multi-channel alert notifications',
      ],
    },
    f8: {
      iconClass: 'automation',
      title: 'Secure authentication framework',
      desc: 'Multi-layered protection spanning network to application layers, meeting the stringent requirements of regulated industries.',
      iconPath:
        'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      points: [
        'mTLS mutual TLS authentication',
        'Macaroon one-time discharge tickets',
        'JWT authentication + IP allow-lists',
        'Request rate limits + HMAC-SHA256 signatures',
        'Certificate revocation + Fernet encrypted secrets',
      ],
    },
    f9: {
      iconClass: 'logs',
      title: 'RBAC access control',
      desc: 'Fine-grained role-based access control with three-tier permissions and multi-tenant data isolation.',
      iconPath:
        'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      points: [
        'Menu / button / field-level permissions',
        'Role-based access control (RBAC)',
        'Multi-tenant data isolation',
        'Flexible permission composition and inheritance',
      ],
    },
    f10: {
      iconClass: 'orchestration',
      title: 'Auditing & logging',
      desc: 'A complete operational audit and logging story that satisfies classified-protection and internal enterprise audit requirements.',
      iconPath:
        'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      points: [
        'Complete operational audit log',
        'Login log and session trace',
        'Host-side action log collection',
        'End-to-end ticket issuance audit trail',
        'Log retention and compliance export',
      ],
    },
  },

  // ============= Architecture =============
  advantages: {
    a1: {
      icon: 'teal',
      iconSymbol: '↔',
      title: 'Truly distributed architecture',
      desc: 'Multiple server nodes with automatic failover; offline clients keep running their current programs.',
    },
    a2: {
      icon: 'blue',
      iconSymbol: '⚡',
      title: 'Zero-downtime upgrades',
      desc: 'Client-component upgrade interruption < 1 second — the business never notices.',
    },
    a3: {
      icon: 'violet',
      iconSymbol: '⚙',
      title: 'Generic process management',
      desc: 'Supervisor can manage any executable program — not just Taurus-owned components.',
    },
    a4: {
      icon: 'teal',
      iconSymbol: '🔒',
      title: 'Enterprise-grade security',
      desc: 'Multi-layer defence from network to application layer, built for regulated industries.',
    },
    a5: {
      icon: 'blue',
      iconSymbol: '🎯',
      title: 'Fine-grained permissions',
      desc: 'Menu / button / field three-tier RBAC with multi-tenant data isolation.',
    },
    a6: {
      icon: 'violet',
      iconSymbol: '🖥',
      title: 'Cross-platform support',
      desc: 'Linux (x86_64 / arm64) and macOS — deploy the client with a single command.',
    },
  },

  layers: {
    l1: {
      label: 'Presentation',
      nodes: [
        { name: 'Taurus Web', icon: '🎨' },
        { name: 'Vue 3 + TS', icon: '📐' },
        { name: 'Element Plus', icon: '🧩' },
        { name: 'fast-crud', icon: '⚡' },
      ],
    },
    l2: {
      label: 'Edge / Gateway',
      nodes: [
        { name: 'Nginx proxy', icon: '🔀' },
        { name: 'HTTP / REST', icon: '🌐' },
        { name: 'WebSocket', icon: '📡' },
        { name: 'JWT authentication', icon: '🪙' },
      ],
    },
    l3: {
      label: 'Services',
      nodes: [
        { name: 'Taurus Backend', icon: '🏛️' },
        { name: 'Taurus Auth', icon: '🔐' },
        { name: 'Taurus Scheduler', icon: '⏱️' },
        { name: 'Celery Beat + Worker', icon: '🥬' },
      ],
    },
    l4: {
      label: 'Data',
      nodes: [
        { name: 'MySQL / MariaDB', icon: '🗄️' },
        { name: 'Redis cache', icon: '⚡' },
        { name: 'APScheduler + election', icon: '📨' },
        { name: 'Fernet encryption', icon: '🔒' },
      ],
    },
    l5: {
      label: 'Clients',
      nodes: [
        { name: 'Taurus Executor', icon: '🏃' },
        { name: 'Taurus Supervisor', icon: '🛡️' },
        { name: 'gRPC + mTLS', icon: '🔗' },
        { name: 'HMAC signatures', icon: '✍️' },
      ],
    },
  },

  securityPoints: {
    s1: {
      title: 'Three-tier security model',
      desc: 'IP allow-list → rate limits → JWT / Macaroon verification — defence in depth, one layer at a time.',
    },
    s2: {
      title: 'mTLS mutual authentication',
      desc: 'Service-to-service calls use mutual TLS — both ends prove their identity before any byte flows.',
    },
    s3: {
      title: 'One-time discharge tickets',
      desc: 'A Macaroon token model prevents command replay — every instruction is signed with a unique ticket.',
    },
    s4: {
      title: 'Certificate revocation list',
      desc: 'CRL reacts to incidents in real time — compromised certificates are invalidated in seconds.',
    },
    s5: {
      title: 'Encrypted sensitive configuration',
      desc: 'Fernet symmetric encryption stores sensitive secrets; the key lives outside the config repo.',
    },
    s6: {
      title: 'Complete audit trail',
      desc: 'Operations, login and ticket issuance are audited end-to-end — pass classified-protection reviews first try.',
    },
  },

  // ============= Solutions =============
  solutions: {
    finance: {
      name: 'Financial services',
      title: 'Compliance-ready, secure and reliable',
      desc: 'For banks, securities firms and insurers: a unified operations solution built for strict regulation. Complete audit chains, mTLS encrypted transport and granular permissions keep your core systems stable around the clock, 7×24.',
      stats: [
        { value: '99.99%', label: 'Platform availability' },
        { value: '< 1s', label: 'Upgrade interruption' },
        { value: '100%', label: 'Ops audit coverage' },
        { value: 'mTLS', label: 'Transport encryption' },
      ],
      tag: 'Finance pack',
      visualList: [
        'MLPS Tier III compliant · end-to-end audit trail',
        'mTLS mutual auth · one-time discharge tickets',
        'Granular RBAC · multi-tenant isolation',
      ],
      features: [
        {
          title: 'Compliance & audit',
          desc: 'Complete operation / login / ticket audit logs — passes MLPS Tier III and financial regulator requirements.',
        },
        {
          title: 'mTLS encrypted transport',
          desc: 'Mutual TLS inter-service auth and HMAC-SHA256 request signatures prevent replay and tampering.',
        },
        {
          title: 'Granular permissions',
          desc: 'Menu / button / field 3-tier RBAC enforces separation of duties and least privilege.',
        },
        {
          title: 'Change control',
          desc: 'One-time tickets + approval workflows make every change auditable and traceable.',
        },
      ],
    },
    internet: {
      name: 'Internet companies',
      title: 'Scale to large clusters, automate efficiently',
      desc: 'Helps internet teams build a cloud-native operations stack: manage large host fleets from a single pane, raise automation rates and free engineering teams to ship product, while zero-downtime upgrades preserve business continuity.',
      stats: [
        { value: 'Thousands', label: 'Hosts under one roof' },
        { value: '85%+', label: 'Ops automation rate' },
        { value: '< 1s', label: 'Zero-downtime upgrades' },
        { value: '50%', label: 'Personnel cost saved' },
      ],
      tag: 'Internet pack',
      visualList: [
        'Manage large host clusters from a single control plane',
        'Automation-first workflow orchestration',
        'Bulk program deployments and version management',
      ],
      features: [
        {
          title: 'Large-scale host management',
          desc: 'Distributed architecture scales horizontally — onboarding thousands of hosts for bulk operations.',
        },
        {
          title: 'Workflow automation',
          desc: 'Visual workflow orchestration turns complex ops scenarios into standardized, automated, reusable pipelines.',
        },
        {
          title: 'Zero-downtime upgrades',
          desc: 'Supervisor client upgrades interrupt for < 1 s — business processes never feel a thing.',
        },
        {
          title: 'Generic process hosting',
          desc: 'Manage monitoring agents, log collectors, business processes — anything that runs as an executable.',
        },
      ],
    },
    government: {
      name: 'Government / SOEs',
      title: 'On-premise, secure and sovereign',
      desc: 'Full support for on-premise private deployments keeps data sovereign and controllable. Multi-tenant isolation fits the tiered management needs of group-sized organisations; domestic-hardware adaptation is ready for government-cloud and state-owned enterprise controls.',
      stats: [
        { value: 'On-premise', label: 'Deployment model' },
        { value: 'Multi-tenant', label: 'Tiered management' },
        { value: 'End-to-end', label: 'Audit traceability' },
        { value: 'Xinchuang', label: 'Ecosystem ready' },
      ],
      tag: 'Xinchuang pack',
      visualList: [
        'On-premise · data sovereignty maintained',
        'Multi-tenant isolation · tiered access and delegation',
        'Domestic-hardware adaptation · Xinchuang compatible',
      ],
      features: [
        {
          title: 'On-premise deployment',
          desc: 'All features ship as a private installation — data stays fully inside the organisation, under your control.',
        },
        {
          title: 'Multi-tenant isolation',
          desc: 'Multi-tenant architecture for group-sized organisations with hard data isolation and fine delegation.',
        },
        {
          title: 'Domestic-hardware adaptation',
          desc: 'Runs on domestic operating systems and CPU architectures (arm64); compatible with the Xinchuang ecosystem.',
        },
        {
          title: 'MLPS and crypto-compliance',
          desc: 'Satisfies MLPS Tier III and Commercial Cryptography Application Security Evaluation requirements.',
        },
      ],
    },
    manufacturing: {
      name: 'Manufacturing',
      title: 'Factory-floor server ops — resilient when offline',
      desc: 'Remote operations solution for factory servers and edge nodes. Bulk program deployment and version management, plus offline-tolerant recovery, keep production-line servers and edge nodes steady.',
      stats: [
        { value: '−30%', label: 'Failure rate reduction' },
        { value: '< 1s', label: 'Upgrade interruption' },
        { value: 'Offline-safe', label: 'Fault tolerance' },
        { value: 'Bulk', label: 'Program distribution' },
      ],
      tag: 'Manufacturing pack',
      visualList: [
        'Remote operations for industrial servers',
        'Bulk program deployments and version control',
        'Offline resilience with auto-recovery on reconnect',
      ],
      features: [
        {
          title: 'Unified production-line management',
          desc: 'Onboard every factory production server into one pane — monitoring and bulk ops in a single step.',
        },
        {
          title: 'Bulk program distribution',
          desc: 'Policy-driven bulk deployments and version management — release efficiency improves dramatically.',
        },
        {
          title: 'Offline-tolerant runtime',
          desc: 'Offline clients continue running their current programs; once the link returns, state syncs automatically.',
        },
        {
          title: 'Zero-downtime production upgrades',
          desc: 'Production program upgrades interrupt for < 1 s — never miss a beat on the line.',
        },
      ],
    },
  },

  // ============= Testimonials =============
  testimonials: {
    t1: {
      quote:
        "We used to run ops with Ansible plus in-house scripts scattered everywhere — nobody dared touch them. With Taurus Stack every operation is a standardized workflow; new team members get productive fast. And Supervisor's zero-downtime upgrades? We no longer need to schedule 3am windows for agent updates.",
      name: 'Mr. Chen',
      title: 'Head of Operations',
      company: 'City commercial bank · Tech Dept (typical use case)',
      avatar: 'CG',
    },
    t2: {
      quote:
        'We have 200+ production-line servers scattered across multiple sites. Before we literally had to drive to every factory to roll out a new release. With Taurus Stack program deployment and policy distribution the same release now lands on every line with a single click — upgrade interruption is under a second, and production keeps ticking.',
      name: 'Mr. Li',
      title: 'IT Manager',
      company: 'Large manufacturing group (typical use case)',
      avatar: 'LG',
    },
    t3: {
      quote:
        'Security is what matters most to us. The combination of mTLS mutual auth, one-time discharge tickets and IP allow-lists in Taurus Stack removed our long-held concern over operations-channel safety. Audit trails are also thorough — we passed the classified-protection review in one go.',
      name: 'Director Wang',
      title: 'CISO',
      company: 'Securities firm (typical use case)',
      avatar: 'WZ',
    },
  },
  clients: [
    'Finance · Banking',
    'Finance · Securities',
    'Finance · Insurance',
    'Manufacturing · Group',
    'Energy',
    'Government cloud',
    'State-owned enterprise',
    'Internet',
    'E-commerce',
    'Gaming',
  ],
}
