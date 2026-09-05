// English locale · views (Product / Solutions / Docs / Download / About).
// Strictly aligned with the key schema of each view component: ProductView.vue / SolutionsView.vue /
// DocsView.vue / DownloadView.vue / AboutView.vue.
export default {
  product: {
    label: 'Product Features',
    title: 'Six Core Modules Building a Truly Enterprise-Grade Ops Stack',
    subtitle:
      'Taurus Stack uses a microservice architecture where each of the six modules plays its own role. From the web console to backend services, from command executors to process supervisors, from authentication to scheduling — they collaborate via standardized protocols and cover every critical scenario of enterprise operations.',
    ctaTitle: 'Want to Learn More About Integrating Any Module?',
    ctaDesc:
      'Book a product demo and our experts will walk you through the most suitable deployment and integration plan tailored to your environment.',
    ctaButton: 'Book a Product Demo',
    stackTitle: 'Technology Stack Overview',
    metrics: {
      m1: { value: '6', label: 'Core Modules' },
      m2: { value: '10+', label: 'Core Capabilities' },
      m3: { value: '< 1s', label: 'Zero-Downtime Upgrade' },
      m4: { value: '100%', label: 'mTLS Encrypted Communication' },
    },
    moduleCards: {
      web: {
        name: 'Taurus Web',
        subtitle: 'Vue 3 + Element Plus Enterprise Console',
        tag: 'Frontend · taurus-web',
        icon: '🖥️',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
        desc: 'A modern management console built on Vue 3 + TypeScript + Element Plus + fast-crud. Covers permission management, host management, script library, visual workflow, batch execution, program deployment, and full audit logs. Responsive UI with built-in i18n and theme switching.',
        stack: ['Vue 3', 'TypeScript', 'Pinia', 'Element Plus', 'fast-crud', 'Vite'],
        features: [
          {
            title: 'Three Management Consoles',
            desc: 'RBAC permissions, host onboarding, and one-click script library CRUD',
          },
          {
            title: 'Visual Workflow',
            desc: 'DAG drag-and-drop orchestration with instant node parameter preview',
          },
          {
            title: 'Layered Batch Results',
            desc: 'On-demand rendering of 100+ host execution results — no browser crashes',
          },
          {
            title: 'Multi-Language & Themes',
            desc: 'Built-in zh-CN / EN / zh-TW + Light / Dark themes',
          },
        ],
        repoDir: 'taurus-web',
        port: '8081',
      },
      backend: {
        name: 'Taurus Backend',
        subtitle: 'Django 4.2 + dvadmin Core API Service',
        tag: 'Backend · taurus-backend',
        icon: '⚙️',
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
        desc: 'Core API service based on Django 4.2 + Django REST framework (dvadmin), hosting all ops business models including users, RBAC, hosts, scripts, programs, execution records, and workflows. Exposes HTTP/REST + WebSocket streaming externally, communicates with Executor via gRPC internally, and talks to Supervisor with signed HTTP.',
        stack: ['Django 4.2', 'DRF', 'dvadmin', 'Celery', 'drf-spectacular'],
        features: [
          {
            title: 'dvadmin 3-Level RBAC',
            desc: 'Fine-grained menu-level / button-level / field-level permissions',
          },
          { title: 'Celery Async Queue', desc: 'Beat + Worker asynchronous task processing' },
          {
            title: 'Fernet Encrypted Storage',
            desc: 'Symmetric Fernet encryption for sensitive config fields',
          },
          { title: 'run_scheduler_worker', desc: 'Consumes Redis ScriptTask queue' },
        ],
        repoDir: 'taurus-backend',
        port: '8000',
      },
      executor: {
        name: 'Taurus Executor',
        subtitle: 'gRPC Efficient Remote Command Executor',
        tag: 'Client · taurus-executor',
        icon: '🚀',
        gradient: 'linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)',
        desc: 'gRPC client executor deployed on target hosts, with mutual mTLS verification with the Backend. Responsible for executing remote commands and scripts, file upload/download, and interactive shell. Macaroon one-time tickets authenticate each instruction to prevent replay. stdout/stderr are streamed back in real time.',
        stack: ['Python 3.12', 'gRPC', 'Protobuf', 'PyInstaller'],
        features: [
          {
            title: 'Mutual mTLS',
            desc: 'Private key permission 600, issued by CA root certificate',
          },
          {
            title: 'Macaroon One-Time Ticket',
            desc: 'Unique credential per instruction, anti-replay',
          },
          {
            title: 'Real-Time Command Streaming',
            desc: 'WebSocket pushes stdout/stderr to frontend',
          },
          { title: 'Interactive Shell', desc: 'Full PTY allocation' },
        ],
        repoDir: 'taurus-executor',
      },
      supervisor: {
        name: 'Taurus Supervisor',
        subtitle: 'General Process Supervisor + Zero-Downtime Upgrade',
        tag: 'Supervisor · taurus-supervisor',
        icon: '🛡️',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
        desc: 'Lightweight general-purpose process supervisor (asyncio single-process event loop) that can host any executable. Supports zero-downtime upgrade (< 1 s), automatic crash recovery, automatic rollback on upgrade failure, and power-off state recovery. Uses HMAC-SHA256 signatures with Backend to prevent replay.',
        stack: ['asyncio', 'systemd', 'PyInstaller'],
        features: [
          {
            title: 'Host Any Process',
            desc: 'Proxies, log collectors, business processes — all supported',
          },
          {
            title: 'Zero-Downtime Upgrade',
            desc: 'Interrupt < 1s, business processes completely unaware',
          },
          {
            title: 'host_id Three-Source Consistency',
            desc: 'config / state / systemd env strictly consistent',
          },
          { title: 'Signed Callback', desc: 'HMAC-SHA256 anti-replay' },
        ],
        repoDir: 'taurus-supervisor',
      },
      auth: {
        name: 'Taurus Auth',
        subtitle: 'Macaroon Ticket + Fernet Encryption Auth Service',
        tag: 'Auth · taurus-auth',
        icon: '🔐',
        gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
        desc: 'Independently deployed authentication and authorization service (Django standalone, port 8001). Responsible for generating Macaroon one-time execution tickets, managing CA and CRL, and centrally hosting Fernet encryption master keys. Executors must first obtain a one-time ticket from Auth before executing commands, ensuring the command chain is auditable and non-replayable.',
        stack: ['Django 4.2', 'Macaroon', 'Fernet', 'pyOpenSSL'],
        features: [
          { title: 'Macaroon One-Time Ticket', desc: 'Prevents command replay' },
          { title: 'CA + CRL', desc: 'Root certificate management, instant revocation via CRL' },
          {
            title: 'Fernet Master Key Hosting',
            desc: 'Centralized encryption master key management',
          },
          { title: 'End-to-End Audit', desc: 'Tickets traceable across the full chain' },
        ],
        repoDir: 'taurus-auth',
        port: '8001',
      },
      scheduler: {
        name: 'Taurus Scheduler',
        subtitle: 'APScheduler + Redis Active-Standby Election Scheduling Service',
        tag: 'Scheduler · taurus-scheduler',
        icon: '📅',
        gradient: 'linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)',
        desc: 'Independent scheduling service based on APScheduler. Scans MySQL every 10 seconds for ScriptTask records with enabled=True and registers them as Cron Jobs. Redis Leader Election ensures high availability with automatic failover on single-node failure. On execution, writes a record and pushes to the Redis queue for Backend workers to consume and dispatch to Executor via gRPC; if the queue is unreachable, falls back to HTTP callback to Backend.',
        stack: ['APScheduler', 'Redis', 'MySQL'],
        features: [
          { title: 'Cron Expression', desc: 'Full Cron support via APScheduler' },
          { title: 'Leader Election', desc: 'Single-active, no duplicate triggers' },
          { title: 'Health Check 9101', desc: 'Easy for K8s / systemd to probe' },
          { title: 'Dual-Path Dispatch', desc: 'Redis queue + HTTP fallback' },
        ],
        repoDir: 'taurus-scheduler',
        port: '9101',
      },
    },
    showcase: {
      label: 'Product UI',
      title: 'Real Product Interface — What You See Is What You Get',
      desc: 'Below are real screenshots of the Taurus Web management console, covering core ops scenarios such as host management, batch execution, script library, workflow orchestration, and execution records.',
      categories: [
        {
          key: 'dashboard',
          name: 'Overview Dashboard',
          screenshots: [
            {
              file: 'home.png',
              title: 'Ops Overview',
              desc: 'Host online status, task execution summary, and alerts on a single screen',
            },
          ],
        },
        {
          key: 'host',
          name: 'Host Management',
          screenshots: [
            {
              file: 'my-host.png',
              title: 'My Hosts',
              desc: 'Host asset onboarding, grouping & tags, and unified online status management',
            },
            {
              file: 'registration-token.png',
              title: 'Registration Token',
              desc: 'One-time registration token + IP whitelist for secure host onboarding',
            },
            {
              file: 'heartbeat-hosts.png',
              title: 'Heartbeat Hosts',
              desc: 'Real-time heartbeat reporting with second-level online/offline detection',
            },
            {
              file: 'heartbeat-record.png',
              title: 'Heartbeat Records',
              desc: 'Complete heartbeat history for anomaly backtracking and auditing',
            },
          ],
        },
        {
          key: 'execution',
          name: 'Execution Center',
          screenshots: [
            {
              file: 'run-command.png',
              title: 'Remote Command',
              desc: 'High-performance gRPC-based remote command execution with real-time streaming output',
            },
            {
              file: 'run-script.png',
              title: 'Script Execution',
              desc: 'Shell / Python script template execution with batch dispatch support',
            },
            {
              file: 'run-detail.png',
              title: 'Execution Detail',
              desc: 'Per-host execution results with layered display and on-demand stdout/stderr loading',
            },
            {
              file: 'rerun.png',
              title: 'Rerun',
              desc: 'One-click rerun for failed hosts with precise retry in partial-success scenarios',
            },
          ],
        },
        {
          key: 'script',
          name: 'Script Library',
          screenshots: [
            {
              file: 'script-library.png',
              title: 'Script Library',
              desc: 'Script versioning, category tags, and parameterized templates',
            },
          ],
        },
        {
          key: 'records',
          name: 'Execution Records',
          screenshots: [
            {
              file: 'execution-records.png',
              title: 'Execution Records',
              desc: 'Full execution history search with filters by host, script, and time',
            },
            {
              file: 'execution-log.png',
              title: 'Execution Logs',
              desc: 'Complete stdout/stderr log retention for audit and compliance',
            },
          ],
        },
        {
          key: 'workflow',
          name: 'Workflow',
          screenshots: [
            {
              file: 'job-management.png',
              title: 'Job Management',
              desc: 'Visual workflow orchestration with unified multi-step task scheduling',
            },
            {
              file: 'job-exec-detail.png',
              title: 'Job Execution Detail',
              desc: 'Overall job execution progress and real-time per-node status tracking',
            },
            {
              file: 'job-node-exec-detail.png',
              title: 'Node Execution Detail',
              desc: 'Deep dive into single-node execution logs and results',
            },
          ],
        },
        {
          key: 'program',
          name: 'Program Management',
          screenshots: [
            {
              file: 'program-commands.png',
              title: 'Program Commands',
              desc: 'Remote program install, start/stop/restart, and batch config dispatch',
            },
          ],
        },
      ],
    },
  },

  solutions: {
    label: 'Solutions',
    title: 'Deep Industry Scenarios — Making Technology Truly Serve the Business',
    heroTagline:
      'Providing differentiated ops solutions for four industries: finance, internet, government/state enterprises, and manufacturing.',
    ctaTitle: 'Do You Have a More Specific Industry Scenario to Discuss?',
    ctaDesc: 'Contact us to get complete whitepapers and reference solutions for each industry.',
    ctaButton: 'Contact Us',
  },

  docs: {
    label: 'Documentation',
    title: 'One-Stop Documentation: From Quick Start to Production Deployment',
    intro:
      'We recommend reading in the order Quick Start → Architecture → Deployment Guide. Check the FAQ first if you encounter any issues.',
    faqLabel: 'FAQ',
    faqTitle: 'Questions You Might Have',
    sections: {
      quickStart: {
        icon: '⚡',
        title: 'Quick Start',
        desc: 'Use conda taurus environment + pnpm to start the frontend and backend development environment locally with one command. Recommended for first-time experience and development debugging.',
        linkLabel: 'Open Quick Start →',
        bullets: [
          { label: 'Prerequisites', tag: 'Node 20+ / conda taurus / MySQL + Redis' },
          { label: 'taurus-backend', tag: 'poetry install → runserver 8000' },
          { label: 'taurus-portal', tag: 'pnpm dev · 8082' },
          { label: 'taurus-web', tag: 'pnpm dev · 8081' },
          { label: 'Experience Flow', tag: 'Host → Script → Batch Execution' },
        ],
      },
      architecture: {
        icon: '🏗️',
        title: 'Architecture Overview',
        desc: 'Explains in detail how the six modules collaborate via standardized protocols: mTLS / signatures / Macaroon tickets / Redis queues / active-standby election. A must-read before deployment.',
        linkLabel: 'Open Architecture Overview →',
        bullets: [
          { label: 'Web → Backend', tag: 'HTTP REST + JWT' },
          { label: 'Backend → Executor', tag: 'gRPC + Mutual mTLS' },
          { label: 'Backend → Supervisor', tag: 'HTTP + HMAC-SHA256' },
          { label: 'Scheduler Chain', tag: 'MySQL → Redis → Worker → gRPC' },
          { label: 'Auth Independent Service', tag: 'HTTP + Signed Tickets' },
        ],
      },
      deployment: {
        icon: '🚀',
        title: 'Deployment Guide',
        desc: 'From single-node Docker Compose PoC to production-grade layered high-availability deployment (multiple Backend instances + Redis Sentinel + MySQL master-slave + Nginx), covering networking, certificates, and systemd.',
        linkLabel: 'Open Deployment Guide →',
        bullets: [
          { label: 'Certificate Permissions', tag: 'CA private key root read-only / client 600' },
          { label: 'Scheduler Election', tag: 'Redis Leader Election' },
          { label: 'Supervisor host_id', tag: 'Three-source consistency' },
          { label: 'Nginx SPA', tag: 'try_files + gzip + security headers' },
          { label: 'systemd Service', tag: 'ExecStart / Restart=always' },
        ],
      },
      apiReference: {
        icon: '📡',
        title: 'API Reference',
        desc: 'taurus-backend already integrates drf-spectacular. After starting, directly access /api/docs/ (Swagger UI) or /api/redoc/ (ReDoc).',
        linkLabel: 'Visit Swagger UI →',
        bullets: [
          { label: '/api/docs/', tag: 'Swagger UI interactive' },
          { label: '/api/redoc/', tag: 'ReDoc static view' },
          { label: '/api/schema/', tag: 'OpenAPI 3.0 JSON' },
          { label: 'Authentication', tag: 'Bearer JWT Token' },
          { label: 'Rate Limiting', tag: 'Anonymous POST 60/min · IP' },
        ],
      },
    },
    faq1: {
      q: 'What is the essential difference between Taurus Stack and Ansible / SaltStack?',
      a: 'Ansible/Salt focuses on "execution" itself, while Taurus Stack is an integrated ops platform. Beyond remote execution, it also provides built-in host lifecycle + certificate management, a general process supervisor (systemd-like but with hosting-level capabilities + zero-downtime upgrade), visual workflows, script library version management, program batch deployment distribution, multiple layers of security (mTLS + Macaroon + signatures), and a complete audit and permission system. It is more like an all-in-one replacement for "Ansible + Supervisor + Rundeck + Foreman".',
    },
    faq2: {
      q: 'How does Supervisor achieve interrupt < 1s for zero-downtime upgrades?',
      a: 'Supervisor uses a three-step process: "atomic in-place replacement of the executable + hot-start of the new process + graceful exit of the old process": Step 1 downloads the new version to a temporary path (after hash verification succeeds); Step 2 atomically renames and overwrites the old binary; Step 3 forks a new child process, and when the new child reports a ready signal, sends SIGTERM to the old process with a 1-second grace period. Because it replaces the supervisor\'s own binary rather than the hosted business process, the business process is completely unaware — the total interruption is just the supervisor switch gap, < 1s.',
    },
    faq3: {
      q: 'How are mTLS certificates deployed and rotated? What if a certificate is leaked?',
      a: 'The root CA private key is stored only on the offline media of ops administrators. For issuing certificates, the cert/key client pair under the certs/sdk/ directory is used, with file permission forced to 600. Client certificates are issued by taurus-auth and written to the CRL. If a host private key is leaked: ① Revoke the certificate in taurus-auth → CRL is distributed in seconds; ② Backend executor registration endpoint immediately rejects the host; ③ Push a certificate update command through Supervisor to reissue (with HOST_ID verification). The entire rotation process does not affect other hosts.',
    },
    faq4: {
      q: 'How does the scheduled task scheduler ensure high availability without duplicate triggers?',
      a: 'Uses a "APScheduler + Redis Leader Election" dual guarantee: 1) taurus-scheduler can be deployed in multiple instances, but only the Leader instance actually scans ScriptTask and registers Jobs via Redis Redlock election; 2) each execution writes a ScriptExecution record with a unique key, and the Backend Worker side ensures each execution is dispatched only once through unique constraints and select_for_update; 3) if the Leader fails, the standby takes over within 15 seconds, and avoids duplicate execution through idempotency of execution records.',
    },
    faq5: {
      q: 'How many hosts can be batch executed at most? Will the frontend lag?',
      a: 'The frontend architecture scales horizontally, so thousands of hosts in batch execution have no bottleneck. On the frontend side, both taurus-web and taurus-portal batch result pages follow "on-demand loading + layered rendering": by default only the aggregated summary (success/failure/interrupt counts) is rendered, sub-tasks are collapsed and paginated by default, and large stdout/stderr text is only loaded and rendered after clicking "View". So batch execution across 100+ hosts will not cause the browser to crash or freeze.',
    },
    faq6: {
      q: 'Can I use only some modules? For example, just Supervisor to protect business processes?',
      a: 'Absolutely. All six Taurus Stack modules can be deployed independently and enabled as needed: ① Only enable Supervisor → as a general process supervisor + zero-downtime upgrade tool; ② Only enable Executor + Backend → as a remote command execution platform; ③ Only enable Scheduler + Backend → as a distributed scheduled task scheduler. Non-dependent module registration and health checks can be turned off via environment variable switches. Modules are decoupled via standard protocols and are not forced to be bundled.',
    },
  },

  download: {
    label: 'Download',
    title: 'Get Taurus Stack · From Source Code to Binary',
    introTip:
      'All source repositories use the AGPLv3 license. For production environments, we recommend completing mTLS certificate initialization via the certs/ directory before starting.',
    repoLink: 'https://github.com/taurus-ops/taurus-stack',
    repoButton: 'GitHub Source Repository',
    docsButton: 'Read Deployment Guide First',
    composeLabel: 'Docker Compose All-in-One',
    composeTitle: 'Quick One-Click Start',
    composeDesc:
      'Only for PoC / Demo scenarios. For production, follow the documentation for layered high-availability deployment.',
    composeWarn:
      'Note: All-in-One Compose includes local persistent volumes for MySQL + Redis containers. Do NOT use directly for production.',
    composeLink: 'Download Full docker-compose.yml →',
    modules: {
      web: {
        icon: '🖥️',
        name: 'Taurus Web',
        tag: 'Vue 3 Console',
        gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
        desc: 'Management backend interface (workstation for ops personnel). Supports zh-CN / English / zh-TW, responsive UI.',
        installMethods: [
          { label: 'Source Development', cmd: 'pnpm install && pnpm dev   # 8081' },
          {
            label: 'Docker Run',
            cmd: 'docker run -d -p 8081:80 taurusops/taurus-web:latest',
            tag: 'Production',
          },
        ],
      },
      backend: {
        icon: '⚙️',
        name: 'Taurus Backend',
        tag: 'Django Core API',
        gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        desc: 'Core API service. Recommended conda taurus + poetry, production uses gunicorn + nginx.',
        installMethods: [
          {
            label: 'Source Startup',
            cmd: 'poetry install && poetry run python manage.py runserver 0.0.0.0:8000',
          },
          {
            label: 'Docker Run',
            cmd: 'docker run -d -p 8000:8000 --env-file .env taurusops/taurus-backend:latest',
            tag: 'Production',
          },
        ],
      },
      executor: {
        icon: '🚀',
        name: 'Taurus Executor',
        tag: 'gRPC Client',
        gradient: 'linear-gradient(135deg, #22c55e, #06b6d4)',
        desc: 'Deployed to every target host. Recommended PyInstaller single-file binary, no Python runtime dependency.',
        installMethods: [
          {
            label: 'Source Build',
            cmd: 'poetry run pyinstaller taurus-executor.spec   # dist/taurus-executor',
          },
          {
            label: 'Distribute to Host',
            cmd: 'scp dist/taurus-executor root\\@host:/usr/local/bin/',
          },
        ],
      },
      supervisor: {
        icon: '🛡️',
        name: 'Taurus Supervisor',
        tag: 'asyncio Supervisor',
        gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
        desc: 'General process supervisor. PyInstaller single-file binary + systemd registration script for auto-start at boot.',
        installMethods: [
          { label: 'Source Build', cmd: 'poetry run pyinstaller taurus-supervisor.spec' },
          {
            label: 'Register as Service',
            cmd: 'sudo bash scripts/register.sh --force',
            tag: 'systemd',
          },
        ],
      },
      auth: {
        icon: '🔐',
        name: 'Taurus Auth',
        tag: 'Django Independent Service',
        gradient: 'linear-gradient(135deg, #6366f1, #a855f7)',
        desc: 'Macaroon tickets + CRL + Fernet master key, runs as an independent Django process on port 8001.',
        installMethods: [
          { label: 'Source Startup', cmd: 'poetry run python manage.py runserver 0.0.0.0:8001' },
          { label: 'Docker Run', cmd: 'docker compose up -d taurus-auth' },
        ],
      },
      scheduler: {
        icon: '📅',
        name: 'Taurus Scheduler',
        tag: 'APScheduler Independent',
        gradient: 'linear-gradient(135deg, #14b8a6, #0ea5e9)',
        desc: 'APScheduler + Redis Leader Election, independent scheduling service, health check port 9101.',
        installMethods: [
          { label: 'Source Startup', cmd: 'poetry run python -m taurus_scheduler' },
          { label: 'Docker Run', cmd: 'docker compose up -d taurus-scheduler' },
        ],
      },
    },
    compose: [
      '# Only for PoC / Demo. For production, follow the deployment guide for layered high availability.',
      'services:',
      '  taurus-backend:',
      '    image: taurusops/taurus-backend:latest',
      '    ports: ["8000:8000"]',
      '  taurus-web:',
      '    image: taurusops/taurus-web:latest',
      '    ports: ["8081:80"]',
      '  taurus-portal:',
      '    image: taurusops/taurus-portal:latest',
      '    ports: ["8082:80"]',
      '  mysql:',
      '    image: mysql:8.0',
      '  redis:',
      '    image: redis:7-alpine',
    ],
  },

  about: {
    label: 'About Us',
    title: 'Open Source Project Built for Enterprise-Grade Ops',
    heroTagline:
      'Taurus Stack is a community-driven open-source distributed integrated ops platform.',
    valuesLabel: 'Core Values',
    valuesTitle: '4 Things We Believe In',
    roadmapLabel: 'Project Timeline',
    roadmapTitle: 'Milestones from Inception to v1.0',
    roadmapDesc: 'Polishing each module in phases, targeting 1.0 GA + plugin ecosystem in H1 2027.',
    licenseLabel: 'Open Source License',
    licenseTitle: 'AGPLv3 — Free for Commercial Use, But Copyleft Required',
    licenseSubtitle: 'Enterprise production scenarios can consider a dual-license option.',
    licenseLinkHref: 'https://www.gnu.org/licenses/agpl-3.0.html',
    licenseLinkLabel: 'Read the Full AGPLv3 License',
    licenseConsultLabel: 'Consult Dual-License Options',
    contribLabel: 'Contribution Guide',
    contribTitle: "Let's Make the Ops Platform Stronger Together",
    contribDesc:
      'All forms of contribution are welcome: code, documentation, bug reports, best practice sharing.',
    contactLabel: 'Contact Us',
    contactTitle: 'Get in Touch With Us',
    contactDesc:
      'The following are placeholders. Real channels will be added before the official launch.',
    values: {
      v1: {
        num: '01',
        title: 'Security First',
        desc: 'Every command must go through authentication, authorization, and auditing. Security is never optional — enabled by default, strict by default.',
        c1: '#2dd4bf',
        c2: '#14b8a6',
      },
      v2: {
        num: '02',
        title: 'Zero-Perceptual Evolution',
        desc: 'Client upgrades, program releases, config changes — they should be as imperceptible as "breathing". Zero downtime is not an advanced feature; it is the baseline.',
        c1: '#38bdf8',
        c2: '#0ea5e9',
      },
      v3: {
        num: '03',
        title: 'Modular Decoupling',
        desc: 'Six modules collaborate via standard protocols. You don\'t need the "full suite" — any single module can be introduced independently. Compose freely, reject lock-in.',
        c1: '#a78bfa',
        c2: '#8b5cf6',
      },
      v4: {
        num: '04',
        title: 'Community Building',
        desc: 'Taurus Stack is built for the community. Any enterprise, individual, or team is free to use, contribute, and redistribute.',
        c1: '#fbbf24',
        c2: '#f59e0b',
      },
    },
    roadmap: {
      ms1: {
        year: '2024 H2',
        title: 'Project Inception & Architecture Prototype',
        desc: 'Completed six-module architecture design and communication protocol finalization (mTLS, Macaroon tickets, HMAC signatures, CRL), produced the first POC.',
        highlight: 'true',
      },
      ms2: {
        year: '2025 H1',
        title: 'Web + Backend MVP',
        desc: 'Frontend and backend MVP of the management console made usable: five basic modules — RBAC, host onboarding, script library, execution records — all run through; Backend and Executor gRPC channel established with verified real-time streaming.',
        highlight: 'true',
      },
      ms3: {
        year: '2025 H2',
        title: 'Workflow + Program Deployment + Authentication',
        desc: 'Launched visual workflow editor; program batch deployment entered production verification; taurus-auth released with Macaroon + CRL fully verified in financial customer environments.',
        highlight: 'true',
      },
      ms4: {
        year: '2026 H1',
        title: 'Distributed Scheduling + Zero-Downtime Supervision',
        desc: 'taurus-scheduler Leader Election officially released; taurus-supervisor production-verified zero-downtime upgrade < 1s, hosted process count exceeded 10000.',
        highlight: 'true',
      },
      ms5: {
        year: '2026 H2',
        title: 'Portal & Ecosystem Refinement (Current)',
        desc: 'taurus-portal official website launched, three-language i18n + theme switching; engineering standards established.',
        highlight: 'false',
      },
      ms6: {
        year: '2027 H1',
        title: 'v1.0 GA + Plugin Ecosystem',
        desc: 'Official 1.0 GA release, plugin SDK opened externally: custom notification channels, authentication sources, workflow nodes.',
        highlight: 'false',
      },
    },
    license: {
      col1Title: '✅ AGPLv3 Core Rights',
      col1Points: [
        'Personal and Commercial Use: Completely Free',
        'Internal Deployment and SaaS: Allowed (but Copyleft required)',
        'Modified Source Code: Must retain copyright and license notices',
        'Derivative Work Distribution: Must be disclosed under the same license',
      ],
      col2Title: '⚠️ Copyleft Restrictions',
      col2Points: [
        'Providing Network Services Externally: Modified source code must be disclosed',
        'Secondary Closed-Source Commercial Use: Not allowed',
        'Removing Copyright / License Notices: Not allowed',
        'Enterprise SLA or Custom Features: Welcome to inquire about dual-license options',
      ],
    },
    contributions: {
      c1: {
        icon: '💻',
        title: 'Contribute Code',
        desc: 'Fork → Feature branch → Pass lint + type-check + project unit tests → Submit PR. CI automatically runs builds and E2E smoke tests.',
        steps: [
          'Fork GitHub repository',
          'git checkout -b feat/xxx',
          'pnpm lint & pnpm type-check',
          'Submit PR and tick CLA',
        ],
      },
      c2: {
        icon: '📝',
        title: 'Improve Documentation',
        desc: 'Documentation is a first-class citizen: typos, missing steps, unclear examples — directly edit docs/ or README.*.md and submit a PR.',
        steps: [
          'Locate the corresponding file under docs/',
          'Write Markdown following existing style',
          'Preview locally with mkdocs serve',
          'Submit PR',
        ],
      },
      c3: {
        icon: '🐞',
        title: 'Report Bugs',
        desc: 'Any abnormal behavior, interface errors, or security issues — please submit via the GitHub Issue template, including reproduction steps, log screenshots, and version information.',
        steps: [
          'Open Issues → New Issue',
          'Select Bug template',
          'Fill in version / environment / reproduction steps',
          'Attach log screenshots',
        ],
      },
      c4: {
        icon: '🌟',
        title: 'Share Best Practices',
        desc: 'Your experience, integration cases, deployment scripts, and monitoring templates summarized from real ops scenarios are valuable community assets.',
        steps: [
          'Markdown case + architecture diagram',
          'Create docs/practices/xxx.md',
          'Include reproducible example config',
          'Submit PR and @community reviewers',
        ],
      },
    },
    contactCards: {
      cc1: {
        icon: '📞',
        title: 'Phone Consultation',
        desc: 'TODO: Enterprise service hotline to be added before official launch',
        badge: 'Business Hours',
      },
      cc2: {
        icon: '✉️',
        title: 'Email Contact',
        desc: 'TODO: Business email to be added before official launch',
        badge: 'Business Cooperation',
      },
      cc3: {
        icon: '💬',
        title: 'Online Support',
        desc: 'TODO: IM channel to be added before official launch',
        badge: 'Community Support',
      },
      cc4: {
        icon: '🏢',
        title: 'Company Address',
        desc: 'TODO: Actual office address to be added before official launch',
        badge: 'Visit Reservation',
      },
    },
  },
}
