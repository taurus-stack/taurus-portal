// 正體中文 · homeSections（概覽 / 核心功能 / 技術架構 / 解決方案 / 客戶案例），P3 完整翻譯。
// iconClass / iconPath / step 字母 / 顏色 / icon 表情符號等保留原文。
export default {
  // ===== P1 相容鍵（扁平），供舊 t('homeSection.*') 使用 =====
  overviewLabel: '產品概述',
  overviewTitle: '真正的分散式一體化維運平台',
  featuresLabel: '核心功能',
  featuresTitle: '十大核心能力，覆蓋維運全場景',
  featuresDesc:
    '從主機納管到程式部署，從自動化維運到安全鑑權，Taurus 提供企業級一體化維運解決方案。',
  archLabel: '技術架構',
  archTitle: '微服務架構，模組化設計',
  archDesc: '六大核心模組各司其職，透過標準化協定協同運作，建構真正的分散式一體化維運平台。',
  archAdvantagesTitle: '六大產品優勢',
  archAdvantagesDesc: 'Taurus 從架構設計到安全防護，每一個細節都以企業級生產規格打磨。',
  archSecurityLabel: '安全架構',
  securityTitle: '多層次安全防護，企業級可信保障',
  securityDesc: '從網路層到應用層建構縱深防禦體系，滿足金融、政府等強監管產業的安全要求。',
  solutionsLabel: '解決方案',
  solutionsTitle: '深耕產業，理解場景',
  solutionsDesc: '為不同產業客戶量身打造維運解決方案，讓技術真正服務於營運目標。',
  testimonialsLabel: '客戶案例',
  testimonialsTitle: '典型使用場景回饋',
  testimonialsDesc: '眾多企業選擇 Taurus 建構其維運體系，實現維運標準化、自動化與安全化。',
  clientsLabel: '服務各產業客戶',
  contactLabel: '聯絡我們',
  contactHeroTitle: '開啟您的智慧維運旅程',
  contactHeroDesc:
    '填寫右側表單預約產品展示，解決方案專家將於 1 個工作天內與您聯繫，為您訂做專屬的維運規劃。',
  scheduleFormTitle: '預約產品展示',
  scheduleFormDesc: '填寫下方資訊，專家將為您一對一解說產品功能。',

  // ===== P2 深層結構 =====
  overviewParagraph1:
    'Taurus 是一款企業級分散式一體化維運管理平台，採用微服務架構，覆蓋主機管理、自動化維運、程式部署、監控告警與安全鑑權等完整場景，協助企業落實維運作業的標準化、自動化與安全化。',
  overviewParagraph2:
    '六大核心模組協同運作，從前端主控台到後端服務、從執行器到常駐守護程序、從鑑權到排程，組成完備的企業級維運技術堆疊。',
  painPoints: {
    p1: {
      title: '維運工具碎片化',
      desc: '主機管理、部署、監控、告警各自為政，資料不互通、流程常常中斷。',
    },
    p2: {
      title: '升級影響營運',
      desc: 'Agent 或常駐程式升級需要重啟服務，中斷時間長、風險高。',
    },
    p3: {
      title: '安全短板明顯',
      desc: '維運通道缺乏強鑑權與加密，審計不完整，難以滿足法規要求。',
    },
  },
  metrics: {
    m1: { value: '< 1s', trend: '中斷', label: '零停機升級' },
    m2: { value: '6', trend: '大模組', label: '一體化能力' },
    m3: { value: '100%', trend: 'mTLS', label: '通訊加密' },
    m4: { value: '3 級', trend: 'RBAC', label: '細粒度權限' },
  },
  modules: {
    web: { step: 'W', name: 'Taurus Web', desc: 'Vue 3 + Element Plus 管理主控台' },
    backend: { step: 'B', name: 'Taurus Backend', desc: 'Django 核心 API 服務' },
    executor: { step: 'E', name: 'Taurus Executor', desc: 'gRPC 遠端命令執行器' },
    supervisor: { step: 'S', name: 'Taurus Supervisor', desc: '通用程序常駐守護' },
    auth: { step: 'A', name: 'Taurus Auth', desc: 'Macaroon 票據鑑權' },
    scheduler: { step: 'C', name: 'Taurus Scheduler', desc: '分散式作業排程' },
  },

  // ============= 核心功能 =============
  features: {
    f1: {
      iconClass: 'automation',
      title: '主機生命週期管理',
      desc: '完整的主機註冊審批、狀態追蹤與憑證管理，確保每台接入主機可信、可控。',
      iconPath:
        'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
      points: [
        '一次性註冊權杖 + IP 白名單',
        '心跳監控與線上 / 離線狀態追蹤',
        '憑證生命週期管理與吊銷',
        '主機分組與標籤管理',
      ],
    },
    f2: {
      iconClass: 'monitor',
      title: '自動化維運中心',
      desc: '基於 gRPC 的高效能遠端命令執行，支援即時串流輸出與互動式 Shell 工作階段。',
      iconPath:
        'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      points: [
        '遠端命令執行 · 即時串流輸出',
        '腳本模板管理（Shell / Python）',
        '安全檔案傳輸（上傳 / 下載）',
        '互動式 Shell 工作階段',
        '批次作業與分組執行',
      ],
    },
    f3: {
      iconClass: 'logs',
      title: '工作流程引擎',
      desc: '多步驟視覺化工作流程編排，將複雜維運場景轉化為標準化、可重複使用的自動化管線。',
      iconPath:
        'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
      points: [
        '多步驟工作流程視覺化編排',
        '執行追蹤與即時狀態展示',
        '失敗重試與異常處理',
        '歷史執行審計與回溯',
      ],
    },
    f4: {
      iconClass: 'orchestration',
      title: '排程作業編排',
      desc: '分散式排程服務，基於 Cron 運算式的定期任務，支援複雜相依與失敗告警。',
      iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      points: [
        'Cron 運算式定期任務',
        '分散式排程，高可用部署',
        '任務相依與編排',
        '執行歷程記錄與失敗告警',
      ],
    },
    f5: {
      iconClass: 'asset',
      title: '程式部署與管理',
      desc: '遠端程式安裝與完整生命週期管理，原則驅動的批次程式發佈，一鍵啟停重啟。',
      iconPath: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12',
      points: [
        '遠端程式安裝與解除安裝',
        '版本管理與升級原則',
        '原則驅動的批次發佈',
        '啟動 / 停止 / 重新啟動指令',
        '程式設定檔管理',
      ],
    },
    f6: {
      iconClass: 'tenant',
      title: '通用程序守護',
      desc: '輕量通用程序守護程序，管理任意程式的完整生命週期，支援零停機升級。',
      iconPath:
        'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      points: [
        '管理任何可執行程式',
        '零停機升級（中斷 < 1 秒）',
        '崩潰自動復原與重啟',
        '升級失敗自動回滾',
        '斷電狀態復原 + 心跳上報',
      ],
    },
    f7: {
      iconClass: 'monitor',
      title: '監控與告警',
      desc: '全方位主機與程式狀態監控，異常即時告警，保障服務穩定執行。',
      iconPath:
        'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      points: [
        'CPU / 記憶體 / 磁碟 / 網路 / 負載蒐集',
        '程式狀態監控與異常告警',
        '心跳上報與離線偵測',
        '多管道告警通知',
      ],
    },
    f8: {
      iconClass: 'automation',
      title: '安全鑑權體系',
      desc: '從網路層到應用層的多層次安全防護，滿足金融、政府等強監管產業要求。',
      iconPath:
        'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      points: [
        'mTLS 雙向 TLS 鑑權',
        'Macaroon 一次性票據',
        'JWT 鑑權 + IP 白名單',
        '請求限流 + HMAC-SHA256 簽章',
        '憑證吊銷 + Fernet 加密機密',
      ],
    },
    f9: {
      iconClass: 'logs',
      title: 'RBAC 權限控制',
      desc: '細粒度基於角色的存取控制，支援三級權限與多租戶資料隔離。',
      iconPath:
        'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      points: [
        '選單級 / 按鈕級 / 欄位級權限',
        '基於角色的存取控制（RBAC）',
        '多租戶資料隔離',
        '彈性的權限組合與繼承',
      ],
    },
    f10: {
      iconClass: 'orchestration',
      title: '審計與日誌',
      desc: '完整的操作審計與日誌體系，滿足等保法規與企業內部稽核要求。',
      iconPath:
        'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      points: [
        '完整操作審計日誌',
        '登入日誌與工作階段追蹤',
        '主機端操作日誌彙整',
        '票據核發全鏈路追蹤',
        '日誌留存與法規匯出',
      ],
    },
  },

  // ============= 產品介面速覽 =============
  screenshotsLabel: '產品介面速覽',
  screenshotsTitle: '真實產品介面，所見即所得',
  screenshotsDesc:
    '精選 Taurus Web 管理控制台核心介面截圖，涵蓋主機管理、遠端執行、工作流編排等核心運維場景。',
  screenshotsCta: '查看完整產品介面',
  screenshots: {
    items: [
      {
        file: 'home.png',
        title: '運維總覽',
        desc: '主機線上狀態、任務執行概覽與告警資訊一屏掌控',
      },
      {
        file: 'run-command.png',
        title: '遠端命令執行',
        desc: '基於 gRPC 的高效能遠端命令執行，即時串流輸出',
      },
      {
        file: 'script-library.png',
        title: '腳本庫管理',
        desc: '腳本版本管理、分類標籤與參數化模板',
      },
      {
        file: 'job-management.png',
        title: '工作流編排',
        desc: '可視化工作流編排，多步驟任務統一排程',
      },
      {
        file: 'execution-records.png',
        title: '執行記錄',
        desc: '全量執行歷史檢索，支援按主機、腳本、時間篩選',
      },
      {
        file: 'my-host.png',
        title: '主機管理',
        desc: '主機資產納管、分組標籤與線上狀態統一管理',
      },
    ],
  },

  // ============= 技術架構 =============
  advantages: {
    a1: {
      icon: 'teal',
      iconSymbol: '↔',
      title: '真正的分散式架構',
      desc: '多個 Server 節點自動故障轉移；離線用戶端可繼續執行當前程式。',
    },
    a2: {
      icon: 'blue',
      iconSymbol: '⚡',
      title: '零停機升級',
      desc: '用戶端元件升級總中斷時間 < 1 秒，營運完全無感。',
    },
    a3: {
      icon: 'violet',
      iconSymbol: '⚙',
      title: '通用程序管理',
      desc: 'Supervisor 可管理任意可執行程式，不限於 Taurus 本身的元件。',
    },
    a4: {
      icon: 'teal',
      iconSymbol: '🔒',
      title: '企業級安全',
      desc: '從網路層到應用層的多層安全防護，滿足強監管產業要求。',
    },
    a5: {
      icon: 'blue',
      iconSymbol: '🎯',
      title: '細粒度權限',
      desc: '選單 / 按鈕 / 欄位三級 RBAC，支援多租戶資料隔離。',
    },
    a6: {
      icon: 'violet',
      iconSymbol: '🖥',
      title: '跨平台相容',
      desc: '支援 Linux（x86_64 / arm64）與 macOS，用戶端一鍵部署。',
    },
  },

  layers: {
    l1: {
      label: '前端層',
      nodes: [
        { name: 'Taurus Web', icon: '🎨' },
        { name: 'Vue 3 + TS', icon: '📐' },
        { name: 'Element Plus', icon: '🧩' },
        { name: 'fast-crud', icon: '⚡' },
      ],
    },
    l2: {
      label: '閘道層',
      nodes: [
        { name: 'Nginx 代理', icon: '🔀' },
        { name: 'HTTP / REST', icon: '🌐' },
        { name: 'WebSocket', icon: '📡' },
        { name: 'JWT 鑑權', icon: '🪙' },
      ],
    },
    l3: {
      label: '服務層',
      nodes: [
        { name: 'Taurus Backend', icon: '🏛️' },
        { name: 'Taurus Auth', icon: '🔐' },
        { name: 'Taurus Scheduler', icon: '⏱️' },
        { name: 'Celery Beat + Worker', icon: '🥬' },
      ],
    },
    l4: {
      label: '資料層',
      nodes: [
        { name: 'MySQL / MariaDB', icon: '🗄️' },
        { name: 'Redis 快取', icon: '⚡' },
        { name: 'APScheduler 選舉', icon: '📨' },
        { name: 'Fernet 加密', icon: '🔒' },
      ],
    },
    l5: {
      label: '用戶端層',
      nodes: [
        { name: 'Taurus Executor', icon: '🏃' },
        { name: 'Taurus Supervisor', icon: '🛡️' },
        { name: 'gRPC + mTLS', icon: '🔗' },
        { name: 'HMAC 簽章', icon: '✍️' },
      ],
    },
  },

  securityPoints: {
    s1: {
      title: '三層安全模型',
      desc: 'IP 白名單 → 請求限流 → JWT / Macaroon 驗證，縱深防禦層層把關。',
    },
    s2: {
      title: 'mTLS 雙向鑑權',
      desc: '服務間通訊採用雙向 TLS 鑑權，確認通訊雙方身分皆可信。',
    },
    s3: {
      title: '一次性票據',
      desc: 'Macaroon 權杖機制防止指令重送攻擊，每條指令都簽發唯一票據。',
    },
    s4: {
      title: '憑證吊銷清單',
      desc: 'CRL 即時反應安全事件，可疑憑證秒級失效。',
    },
    s5: {
      title: '敏感設定加密',
      desc: 'Fernet 對稱加密儲存敏感機密，金鑰與設定分離管理。',
    },
    s6: {
      title: '完整審計鏈路',
      desc: '操作、登入、票據全鏈路審計，通過等保三級要求。',
    },
  },

  // ============= 解決方案 =============
  solutions: {
    finance: {
      name: '金融產業',
      title: '等保合規，安全穩定可靠',
      desc: '面向銀行、證券、保險等金融機構，提供滿足強監管要求的一體化維運解決方案。完整審計鏈路、mTLS 加密通訊與細粒度權限控制，保障核心營運系統 7×24 穩定運行。',
      stats: [
        { value: '99.99%', label: '平台可用性' },
        { value: '< 1s', label: '升級中斷時間' },
        { value: '100%', label: '操作審計覆蓋' },
        { value: 'mTLS', label: '通訊加密' },
      ],
      tag: '金融方案',
      visualList: [
        '等保三級合規 · 完整審計鏈路',
        'mTLS 雙向鑑權 · 一次性票據',
        '細粒度 RBAC · 多租戶隔離',
      ],
      features: [
        {
          title: '等保合規審計',
          desc: '完整操作 / 登入 / 票據審計日誌，滿足等保三級及金融法規要求。',
        },
        {
          title: 'mTLS 加密通訊',
          desc: '服務間雙向 TLS 鑑權與 HMAC-SHA256 請求簽章，杜絕重放與竄改。',
        },
        {
          title: '細粒度權限',
          desc: '選單 / 按鈕 / 欄位三級 RBAC，實現職責分離與最小權限原則。',
        },
        {
          title: '安全變更管控',
          desc: '一次性票據 + 審批流程，所有變更皆可追溯、可稽核。',
        },
      ],
    },
    internet: {
      name: '網際網路企業',
      title: '大規模叢集，自動化高效維運',
      desc: '協助網際網路企業建構面對雲原生的維運體系：大規模主機叢集統一管理，自動化維運提升團隊效率，零停機升級保障營運連續，讓技術團隊專注於產品創新。',
      stats: [
        { value: '千台級', label: '主機統一納管' },
        { value: '85%+', label: '維運自動化率' },
        { value: '< 1s', label: '零停機升級' },
        { value: '50%', label: '人力成本節省' },
      ],
      tag: '網際網路方案',
      visualList: ['大規模主機叢集統一管理', '工作流程自動化編排', '程式批次部署與版本管理'],
      features: [
        {
          title: '大規模主機管理',
          desc: '分散式架構水平擴展，支援數千台主機統一納管與批次操作。',
        },
        {
          title: '工作流程自動化',
          desc: '視覺化工作流程編排，將複雜維運場景標準化、自動化、可重複使用。',
        },
        {
          title: '零停機升級',
          desc: 'Supervisor 用戶端升級中斷 < 1 秒，營運程序完全無感。',
        },
        {
          title: '通用程序託管',
          desc: '統一管理監控代理、日誌彙整、營運程序等任意可執行程式。',
        },
      ],
    },
    government: {
      name: '政府 / 國營事業',
      title: '私有雲部署，安全自主可控',
      desc: '全面支援私有雲部署，資料安全可控。多租戶隔離契合集團型組織分級管理需求，國產化介面卡就緒，符合政務雲與國營事業維運管控規範。',
      stats: [
        { value: '私有雲', label: '部署模式' },
        { value: '多租戶', label: '分級管理' },
        { value: '全鏈路', label: '審計追蹤' },
        { value: '信創', label: '適配就緒' },
      ],
      tag: '信創方案',
      visualList: [
        '私有雲部署 · 資料自主可控',
        '多租戶隔離 · 分級分權管理',
        '國產化適配 · 信創生態相容',
      ],
      features: [
        {
          title: '私有雲部署',
          desc: '全功能私有雲部署，資料完全留存在企業內部，自主可控。',
        },
        {
          title: '多租戶隔離',
          desc: '面向集團型組織的多租戶架構，資料隔離、權限精細、統一管控。',
        },
        {
          title: '國產化適配',
          desc: '支援國產作業系統與處理器架構（arm64），信創生態相容。',
        },
        {
          title: '等保密評合規',
          desc: '滿足等保三級與商用密碼應用安全性評估要求。',
        },
      ],
    },
    manufacturing: {
      name: '製造業',
      title: '工業伺服器維運，離線也可靠',
      desc: '面向製造業廠房伺服器與邊緣節點的遠端維運解決方案。程式批次部署與版本管理，搭配離線容錯機制，保障產線伺服器及邊緣節點穩定運行。',
      stats: [
        { value: '30%', label: '故障率下降' },
        { value: '< 1s', label: '升級中斷' },
        { value: '離線可用', label: '容錯能力' },
        { value: '批次', label: '程式發佈' },
      ],
      tag: '製造方案',
      visualList: ['工業伺服器遠端維運管理', '程式批次部署與版本管控', '離線場景容錯與自動復原'],
      features: [
        {
          title: '產線伺服器統一管理',
          desc: '工廠產線伺服器集中納管，狀態監控與批次操作一次到位。',
        },
        {
          title: '程式批次發佈',
          desc: '基於原則的程式批次部署與版本管理，發佈效率大幅提升。',
        },
        {
          title: '離線容錯機制',
          desc: '用戶端離線時可繼續執行當前程式，網路恢復後自動同步狀態。',
        },
        {
          title: '零停機程式升級',
          desc: '產線程式升級中斷 < 1 秒，不影響生產節奏。',
        },
      ],
    },
  },

  // ============= 客戶案例 =============
  testimonials: {
    t1: {
      quote:
        '以前我們用 Ansible 加一堆自製腳本做維運，腳本散落各地沒人敢改。導入 Taurus 之後，所有維運作業都走工作流程，新人也能快速上手；最驚豔的是 Supervisor 零停機升級，Agent 升級再也不用排凌晨窗口了。',
      name: '陳工程師',
      title: '維運負責人',
      company: '某城商銀 · 科技部（典型場景）',
      avatar: 'CG',
    },
    t2: {
      quote:
        '我們有 200 多台產線伺服器，以前推一個新版本得派人全台各廠現場跑一圈。用了 Taurus 程式部署與原則發佈，新版本一鍵推到全部產線，升級中斷不到 1 秒，產線完全不受影響。',
      name: '李工程師',
      title: 'IT 經理',
      company: '某大型製造集團（典型場景）',
      avatar: 'LG',
    },
    t3: {
      quote:
        '安全是我們最看重的。Taurus 的 mTLS 雙向鑑權、一次性票據、IP 白名單這套組合拳，徹底解決我們對維運通道安全的顧慮；審計日誌也非常完整，等保測評一次就過關。',
      name: '王總監',
      title: '資安總監',
      company: '某證券公司（典型場景）',
      avatar: 'WZ',
    },
  },
  clients: [
    '金融 · 銀行',
    '金融 · 證券',
    '金融 · 保險',
    '製造 · 集團',
    '能源',
    '政務雲',
    '國營事業',
    '網際網路',
    '電商',
    '遊戲',
  ],
}
