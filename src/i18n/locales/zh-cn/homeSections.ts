// P2-1 填充：Overview / Features / Architecture / Solutions / Testimonials 的所有长文案 key
// 兼容 P1 旧键 homeSection.*（仍可从 homeSections 顶层访问）
export default {
  // ===== P1 兼容键（老组件 t('homeSection.xxx') 仍用这些值）=====
  overviewLabel: '产品概述',
  overviewTitle: '真正的分布式一体化运维平台',
  featuresLabel: '核心功能',
  featuresTitle: '十大核心能力，覆盖运维全场景',
  featuresDesc:
    '从主机纳管到程序部署，从自动化运维到安全认证，Taurus Stack 提供企业级一体化运维解决方案',
  archLabel: '技术架构',
  archTitle: '微服务架构，模块化设计',
  archDesc: '六大核心模块各司其职，通过标准化协议协同工作，构建真正的分布式一体化运维平台',
  archAdvantagesTitle: '六大产品优势',
  archAdvantagesDesc: 'Taurus Stack 从架构设计到安全防护，每一个细节都以企业级生产标准打磨。',
  archSecurityLabel: '安全架构',
  securityTitle: '多层安全防护，企业级可信保障',
  securityDesc: '从网络层到应用层构建纵深防御体系，满足金融、政务等强监管行业安全要求',
  solutionsLabel: '解决方案',
  solutionsTitle: '深耕行业，理解场景',
  solutionsDesc: '为不同行业客户量身打造运维解决方案，让技术真正服务于业务目标',
  testimonialsLabel: '客户案例',
  testimonialsTitle: '典型用户场景反馈',
  testimonialsDesc: '众多企业选择 Taurus Stack 构建其运维体系，实现运维标准化、自动化与安全化',
  clientsLabel: '服务于各行业客户',
  contactLabel: '联系我们',
  contactHeroTitle: '开启您的智能运维之旅',
  contactHeroDesc:
    '填写右侧表单预约产品演示，我们的解决方案专家将在 1 个工作日内与您联系，为您定制专属的运维方案。',
  scheduleFormTitle: '预约产品演示',
  scheduleFormDesc: '填写以下信息，专家将为您一对一演示产品功能',

  // ===== P2 深层结构键 =====
  overviewParagraph1:
    'Taurus Stack 是一款企业级分布式一体化运维管理平台，采用微服务架构，覆盖主机管理、自动化运维、程序部署、监控告警、安全认证等全场景，帮助企业实现运维工作的标准化、自动化和安全化。',
  overviewParagraph2:
    '六大核心模块协同工作，从前端控制台到后端服务、从执行器到守护进程、从认证到调度，构建完整的企业级运维技术栈。',
  painPoints: {
    p1: { title: '运维工具碎片化', desc: '主机管理、部署、监控、告警各自为政，数据不通、流程断裂' },
    p2: { title: '升级影响业务', desc: 'Agent 或守护进程升级需重启业务，中断时间长、风险高' },
    p3: { title: '安全短板明显', desc: '运维通道缺乏强认证与加密，审计不完整，难以满足合规要求' },
  },
  metrics: {
    m1: { value: '<1s', trend: '中断', label: '零停机升级' },
    m2: { value: '6', trend: '大模块', label: '一体化能力' },
    m3: { value: '100%', trend: 'mTLS', label: '通信加密' },
    m4: { value: '3级', trend: 'RBAC', label: '细粒度权限' },
  },
  modules: {
    web: { step: 'W', name: 'Taurus Web', desc: 'Vue 3 + Element Plus 控制台' },
    backend: { step: 'B', name: 'Taurus Backend', desc: 'Django 核心 API 服务' },
    executor: { step: 'E', name: 'Taurus Executor', desc: 'gRPC 远程命令执行器' },
    supervisor: { step: 'S', name: 'Taurus Supervisor', desc: '通用进程守护进程' },
    auth: { step: 'A', name: 'Taurus Auth', desc: 'Macaroon 票据认证' },
    scheduler: { step: 'C', name: 'Taurus Scheduler', desc: '分布式任务调度' },
  },

  // ============= Features (section header 仍复用 homeSection.features* 老 key) =============
  features: {
    f1: {
      iconClass: 'automation',
      title: '主机生命周期管理',
      desc: '完整的主机注册审批、状态追踪与证书管理，确保每一台接入主机的可信与可控。',
      iconPath:
        'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
      points: [
        '一次性注册令牌 + IP 白名单',
        '心跳监控与在线/离线状态追踪',
        '证书生命周期管理与吊销',
        '主机分组与标签管理',
      ],
    },
    f2: {
      iconClass: 'monitor',
      title: '自动化运维中心',
      desc: '基于 gRPC 的高性能远程命令执行，支持实时流式输出与交互式 Shell 会话。',
      iconPath:
        'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      points: [
        '远程命令执行 · 实时流式输出',
        '脚本模板管理（Shell / Python）',
        '安全文件传输（上传/下载）',
        '交互式 Shell 会话',
        '批量操作与分组执行',
      ],
    },
    f3: {
      iconClass: 'logs',
      title: '工作流引擎',
      desc: '多步骤可视化工作流编排，将复杂运维场景转化为标准化、可复用的自动化流程。',
      iconPath:
        'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
      points: [
        '多步骤工作流可视化编排',
        '执行跟踪与实时状态展示',
        '失败重试与异常处理',
        '执行历史审计与回溯',
      ],
    },
    f4: {
      iconClass: 'orchestration',
      title: '定时任务调度',
      desc: '分布式任务调度服务，基于 Cron 表达式的定时任务，支持复杂依赖与失败告警。',
      iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      points: [
        'Cron 表达式定时任务',
        '分布式调度，高可用部署',
        '任务依赖与编排',
        '执行历史记录与失败告警',
      ],
    },
    f5: {
      iconClass: 'asset',
      title: '程序部署与管理',
      desc: '远程程序安装与全生命周期管理，基于策略的批量程序分发，一键启停重启。',
      iconPath: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12',
      points: [
        '远程程序安装与卸载',
        '版本管理与升级策略',
        '策略驱动的批量分发',
        '启动 / 停止 / 重启指令',
        '程序配置文件管理',
      ],
    },
    f6: {
      iconClass: 'tenant',
      title: '通用进程守护',
      desc: '轻量级通用进程管理守护进程，管理任意程序生命周期，支持零停机升级。',
      iconPath:
        'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      points: [
        '管理任意可执行程序',
        '零停机升级（中断 < 1 秒）',
        '崩溃自动恢复与重启',
        '升级失败自动回滚',
        '断电状态恢复与心跳上报',
      ],
    },
    f7: {
      iconClass: 'monitor',
      title: '监控与告警',
      desc: '全方位主机与程序状态监控，异常实时告警，保障业务稳定运行。',
      iconPath:
        'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      points: [
        'CPU / 内存 / 磁盘 / 网络 / 负载采集',
        '程序状态监控与异常告警',
        '心跳上报与离线检测',
        '多渠道告警通知',
      ],
    },
    f8: {
      iconClass: 'automation',
      title: '安全认证体系',
      desc: '从网络层到应用层的多层安全防护，满足金融、政务等强监管行业要求。',
      iconPath:
        'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      points: [
        'mTLS 双向 TLS 认证',
        'Macaroon 一次性票据',
        'JWT 认证 + IP 白名单',
        '请求限流 + HMAC-SHA256 签名',
        '证书吊销 + Fernet 加密存储',
      ],
    },
    f9: {
      iconClass: 'logs',
      title: 'RBAC 权限控制',
      desc: '细粒度基于角色的访问控制，支持三级权限与多租户数据隔离。',
      iconPath:
        'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      points: [
        '菜单级 / 按钮级 / 字段级权限',
        '基于角色的访问控制（RBAC）',
        '多租户数据隔离',
        '灵活的权限组合与继承',
      ],
    },
    f10: {
      iconClass: 'orchestration',
      title: '审计与日志',
      desc: '完整的操作审计与日志体系，满足等保合规与企业审计要求。',
      iconPath:
        'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      points: [
        '完整操作审计日志',
        '登录日志与会话追踪',
        '主机操作日志收集',
        '票据操作全链路追踪',
        '日志留存与合规导出',
      ],
    },
  },

  // ============= Architecture =============

  advantages: {
    a1: {
      icon: 'teal',
      iconSymbol: '↔',
      title: '真正的分布式架构',
      desc: '多 Server 节点支持故障自动转移，客户端离线可继续运行当前程序。',
    },
    a2: {
      icon: 'blue',
      iconSymbol: '⚡',
      title: '零停机升级',
      desc: '客户端组件升级总中断时间 < 1 秒，业务完全无感知。',
    },
    a3: {
      icon: 'violet',
      iconSymbol: '⚙',
      title: '通用进程管理',
      desc: 'Supervisor 可管理任意可执行程序，不限于 Taurus 自身组件。',
    },
    a4: {
      icon: 'teal',
      iconSymbol: '🔒',
      title: '企业级安全',
      desc: '从网络层到应用层的多层安全防护，满足强监管行业要求。',
    },
    a5: {
      icon: 'blue',
      iconSymbol: '🎯',
      title: '细粒度权限',
      desc: '菜单 / 按钮 / 字段三级 RBAC，支持多租户数据隔离。',
    },
    a6: {
      icon: 'violet',
      iconSymbol: '🖥',
      title: '跨平台兼容',
      desc: '支持 Linux（x86_64 / arm64）和 macOS，客户端一键部署。',
    },
  },

  layers: {
    l1: {
      label: '前端层',
      nodes: [
        { name: 'Taurus Web', icon: '🎨' },
        { name: 'Vue 3 + TS', icon: '📐' },
        { name: 'Element Plus', icon: '🧩' },
        { name: 'fast-crud', icon: '⚡' },
      ],
    },
    l2: {
      label: '接入层',
      nodes: [
        { name: 'Nginx 代理', icon: '🔀' },
        { name: 'HTTP / REST', icon: '🌐' },
        { name: 'WebSocket', icon: '📡' },
        { name: 'JWT 认证', icon: '🪙' },
      ],
    },
    l3: {
      label: '服务层',
      nodes: [
        { name: 'Taurus Backend', icon: '🏛️' },
        { name: 'Taurus Auth', icon: '🔐' },
        { name: 'Taurus Scheduler', icon: '⏱️' },
        { name: 'Celery Beat+Worker', icon: '🥬' },
      ],
    },
    l4: {
      label: '数据层',
      nodes: [
        { name: 'MySQL / MariaDB', icon: '🗄️' },
        { name: 'Redis 缓存', icon: '⚡' },
        { name: 'APScheduler+选举', icon: '📨' },
        { name: 'Fernet 加密', icon: '🔒' },
      ],
    },
    l5: {
      label: '客户端层',
      nodes: [
        { name: 'Taurus Executor', icon: '🏃' },
        { name: 'Taurus Supervisor', icon: '🛡️' },
        { name: 'gRPC + mTLS', icon: '🔗' },
        { name: 'HMAC 签名', icon: '✍️' },
      ],
    },
  },

  securityPoints: {
    s1: {
      title: '三层安全模型',
      desc: 'IP 白名单 → 请求限流 → JWT / Macaroon 验证，纵深防御层层把关',
    },
    s2: { title: 'mTLS 双向认证', desc: '服务间通信采用双向 TLS 认证，确保通信双方身份可信' },
    s3: { title: '一次性票据', desc: 'Macaroon 令牌机制防止命令重放攻击，每条指令唯一票据' },
    s4: { title: '证书吊销列表', desc: 'CRL 即时响应安全事件，可疑证书秒级吊销失效' },
    s5: { title: '敏感配置加密', desc: 'Fernet 对称加密存储敏感配置，密钥分离管理' },
    s6: { title: '完整审计日志', desc: '操作、登录、票据全链路审计，满足等保合规要求' },
  },

  // ============= Solutions =============

  solutions: {
    finance: {
      name: '金融行业',
      title: '满足等保合规，安全稳定可靠',
      desc: '面向银行、证券、保险等金融机构，提供满足强监管要求的一体化运维解决方案。完整审计链路、mTLS 加密通信、细粒度权限控制，保障核心业务系统 7×24 小时稳定运行。',
      stats: [
        { value: '99.99%', label: '平台可用性' },
        { value: '< 1s', label: '升级中断时间' },
        { value: '100%', label: '操作审计覆盖' },
        { value: 'mTLS', label: '通信加密' },
      ],
      tag: '金融方案',
      visualList: [
        '等保三级合规 · 完整审计链路',
        'mTLS 双向认证 · 一次性票据',
        '细粒度 RBAC · 多租户隔离',
      ],
      features: [
        {
          title: '等保合规审计',
          desc: '完整操作、登录、票据审计日志，满足等保三级及金融行业监管要求',
        },
        {
          title: 'mTLS 加密通信',
          desc: '服务间双向 TLS 认证，HMAC-SHA256 请求签名，防止重放与篡改',
        },
        { title: '细粒度权限控制', desc: '菜单/按钮/字段三级 RBAC，职责分离，最小权限原则' },
        { title: '安全变更管控', desc: '一次性票据 + 审批流程，变更操作可追溯可审计' },
      ],
    },
    internet: {
      name: '互联网企业',
      title: '大规模集群，自动化高效运维',
      desc: '助力互联网企业构建面向云原生的运维体系，大规模主机集群统一管理，自动化运维提升团队效率，零停机升级保障业务连续性，让技术团队更专注于业务创新。',
      stats: [
        { value: '千台级', label: '主机统一纳管' },
        { value: '85%+', label: '运维自动化率' },
        { value: '< 1s', label: '零停机升级' },
        { value: '50%', label: '人力成本节省' },
      ],
      tag: '互联网方案',
      visualList: ['大规模主机集群统一管理', '工作流自动化运维编排', '程序批量部署与版本管理'],
      features: [
        { title: '大规模主机管理', desc: '分布式架构水平扩展，支持数千台主机统一纳管与批量操作' },
        { title: '工作流自动化', desc: '可视化工作流编排，将复杂运维场景标准化、自动化、可复用' },
        { title: '零停机升级', desc: 'Supervisor 客户端升级中断 < 1 秒，业务进程完全无感知' },
        { title: '通用进程托管', desc: '统一管理监控代理、日志采集、业务进程等任意程序' },
      ],
    },
    government: {
      name: '政务/央企',
      title: '私有化部署，安全自主可控',
      desc: '全面支持私有化部署，数据安全可控。多租户隔离满足集团型组织分级管理需求，国产化适配就绪，满足政务云及央企运维管控要求。',
      stats: [
        { value: '私有化', label: '部署模式' },
        { value: '多租户', label: '分级管理' },
        { value: '全链路', label: '审计追踪' },
        { value: '信创', label: '适配就绪' },
      ],
      tag: '信创方案',
      visualList: [
        '私有化部署 · 数据自主可控',
        '多租户隔离 · 分级分权管理',
        '国产化适配 · 信创兼容',
      ],
      features: [
        { title: '私有化部署', desc: '全功能私有化部署，数据完全存储在企业内部，自主可控' },
        { title: '多租户隔离', desc: '面向集团型组织的多租户架构，数据隔离、权限精细、统一管控' },
        { title: '国产化适配', desc: '支持国产操作系统与芯片架构（arm64），信创生态兼容' },
        { title: '等保密评合规', desc: '满足等保三级及商用密码应用安全性评估要求' },
      ],
    },
    manufacturing: {
      name: '制造业',
      title: '工业服务器运维，离线也可靠',
      desc: '面向制造业工厂服务器与边缘节点的远程运维方案。程序批量部署与版本管理，离线场景容错机制，保障产线服务器及边缘节点稳定运行。',
      stats: [
        { value: '30%', label: '故障率下降' },
        { value: '< 1s', label: '升级中断' },
        { value: '离线可用', label: '容错能力' },
        { value: '批量', label: '程序分发' },
      ],
      tag: '制造方案',
      visualList: ['工业服务器远程运维管理', '程序批量部署与版本管控', '离线场景容错与自动恢复'],
      features: [
        { title: '产线服务器统一管理', desc: '工厂产线服务器集中纳管，状态监控与批量操作一步到位' },
        { title: '程序批量分发', desc: '基于策略的程序批量部署与版本管理，发布效率大幅提升' },
        { title: '离线容错机制', desc: '客户端离线可继续运行当前程序，网络恢复后自动同步状态' },
        { title: '零停机程序升级', desc: '产线程序升级中断 < 1 秒，不影响生产节拍' },
      ],
    },
  },

  // ============= Testimonials =============

  testimonials: {
    t1: {
      quote:
        '以前我们用 Ansible + 自研脚本做运维，脚本散落在各处没人敢改。用了 Taurus Stack 之后，所有运维操作都通过工作流标准化了，新人也能快速上手。最惊喜的是 Supervisor 零停机升级，Agent 升级再也不用找凌晨窗口了。',
      name: '陈工',
      title: '运维负责人',
      company: '某城商行科技部（典型场景）',
      avatar: 'CG',
    },
    t2: {
      quote:
        '我们有 200 多台产线服务器，以前部署一个新版本要各地现场跑一圈。现在用 Taurus Stack 的程序部署和策略分发，一键就能把新版本推到所有产线，升级过程中断不到 1 秒，产线完全不受影响。',
      name: '李工',
      title: 'IT 经理',
      company: '某大型制造企业（典型场景）',
      avatar: 'LG',
    },
    t3: {
      quote:
        '安全是我们最看重的。Taurus Stack 的 mTLS 双向认证、一次性票据、IP 白名单这套组合拳，彻底解决了我们对运维通道安全的顾虑。审计日志也很完整，等保测评一次就过了。',
      name: '王总监',
      title: '信息安全总监',
      company: '某证券公司（典型场景）',
      avatar: 'WZ',
    },
  },
  clients: [
    '金融 · 银行',
    '金融 · 证券',
    '金融 · 保险',
    '制造 · 集团',
    '能源',
    '政务云',
    '央企',
    '互联网',
    '电商',
    '游戏',
  ],
}
