import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "title": "SentinelBox",
      "subtitle": "Intelligent Sandbox for Secure AI Agent Execution",
      "description": "An intelligent, rootless Linux sandbox built for AI Agents. It intercepts system calls using Seccomp-BPF and uses the Model Context Protocol (MCP) to provide semantic, natural-language feedback for self-repair.",
      "github": "View on GitHub",
      "demo": "Watch Demo",
      "features": {
        "title": "The Sentinel Core",
        "isolation": "Advanced Isolation",
        "isolation_desc": "Linux Namespaces, OverlayFS, and pivot_root for robust physical isolation.",
        "security": "Security Sentinel",
        "security_desc": "Rust-powered monitor using Seccomp User Notification for high-performance syscall filtering.",
        "telemetry": "Real-time Telemetry",
        "telemetry_desc": "eBPF & Cgroup v2 integration for millisecond-level resource tracking.",
        "semantic": "Semantic Feedback",
        "semantic_desc": "Translates cryptic kernel errors into natural language feedback for AI agents."
      },
      "architecture": {
        "title": "System Architecture",
        "desc": "A decoupled, multi-layered architecture designed for stability and extensibility.",
        "overview": "System Overview",
        "isolation": "Kernel Isolation",
        "monitor": "Rust Monitor",
        "logic": "Semantic Logic",
        "metrics": "Real-time Metrics",
        "performance": "Performance Metrics",
        "audit": "Security Audit",
        "flow": "eBPF Data Flow"
      },
      "innovation": {
        "title": "Actionable Feedback",
        "desc": "We bridge the gap between low-level system failures and AI reasoning via the Model Context Protocol.",
        "raw": "Raw Signal",
        "cause": "Kernel Cause",
        "feedback": "Semantic Feedback",
        "interception": "Interception",
        "level": "Kernel Level",
        "ai": "AI Feedback",
        "loop": "Self-Repair Loop Integration"
      },
      "labels": {
        "protection": "Protection",
        "sentinel": "Active Sentinel",
        "infrastructure": "Resource Monitor",
        "health": "System Integrity",
        "explore": "Explore",
        "technical": "Technical Resources",
        "reach": "Reach Out",
        "support": "Email Support",
        "oss": "Open Source",
        "privacy": "Privacy Policy",
        "terms": "Terms of Service",
        "audit": "Security Audit",
        "live_demo": "Live Demo",
        "wiki": "Technical Wiki",
        "report_pdf": "Senior Project Report"
      },
      "report": "Final Report",
      "download_report": "Download Report",
      "loop": {
        "execute": "Execute",
        "execute_desc": "AI runs code",
        "fail": "Fail",
        "fail_desc": "Security block",
        "feedback": "Feedback",
        "feedback_desc": "Semantic info",
        "repair": "Repair",
        "repair_desc": "Self-Correction"
      },
      "footer": "© 2026 Ming Chen. All Rights Reserved.\nProfessional Sandbox Solutions for the AI Era."
    }
  },
  zh: {
    translation: {
      "title": "SentinelBox",
      "subtitle": "專為 AI Agent 設計的智能安全沙盒",
      "description": "一個專為 AI Agent 打造的智能 Rootless Linux 沙盒。透過 Seccomp-BPF 攔截系統調用，並利用 Model Context Protocol (MCP) 提供語義化的自然語言反饋，協助 AI 實現自主修復。",
      "github": "前往 GitHub",
      "demo": "查看系統展示",
      "features": {
        "title": "哨兵核心技術",
        "isolation": "進階隔離技術",
        "isolation_desc": "利用 Linux Namespaces、OverlayFS 與 pivot_root 實現強大的物理隔離。",
        "security": "安全哨兵",
        "security_desc": "基於 Rust 的監控器，採用 Seccomp User Notification 實現高效能系統調用過濾。",
        "telemetry": "即時遙測",
        "telemetry_desc": "整合 eBPF 與 Cgroup v2，實現毫秒級資源追蹤。",
        "semantic": "語義化反饋",
        "semantic_desc": "將晦澀難懂的內核錯誤轉化為 AI Agent 可理解的自然語言反饋。"
      },
      "architecture": {
        "title": "系統架構圖",
        "desc": "解耦的多層架構設計，確保系統的穩定性與擴展性。",
        "overview": "系統概覽",
        "isolation": "內核隔離",
        "monitor": "Rust 監控器",
        "logic": "語義邏輯",
        "metrics": "即時數據",
        "performance": "性能指標",
        "audit": "安全審計",
        "flow": "eBPF 數據流"
      },
      "innovation": {
        "title": "可執行的語義反饋",
        "desc": "我們透過 Model Context Protocol 橋接了底層系統故障與 AI 推理之間的鴻溝。",
        "raw": "原始信號",
        "cause": "內核原因",
        "feedback": "語義化反饋",
        "interception": "攔截信號",
        "level": "內核層級",
        "ai": "AI 語義反饋",
        "loop": "整合自修復閉環"
      },
      "labels": {
        "protection": "系統防護",
        "sentinel": "哨兵模式已啟動",
        "infrastructure": "資源監控層",
        "health": "系統完整性驗證",
        "explore": "探索導覽",
        "technical": "技術資源",
        "reach": "聯絡我們",
        "support": "技術諮詢",
        "oss": "開源專案",
        "live_demo": "系統展示",
        "wiki": "技術維基",
        "report_pdf": "專案報告書"
      },
      "report": "期末報告書",
      "download_report": "下載技術報告",
      "loop": {
        "execute": "執行",
        "execute_desc": "AI 運行代碼",
        "fail": "失敗",
        "fail_desc": "觸發安全攔截",
        "feedback": "反饋",
        "feedback_desc": "語義化診斷",
        "repair": "修復",
        "repair_desc": "系統自動修復"
      },
      "footer": "© 2026 Ming Chen. All Rights Reserved.\nProfessional Sandbox Solutions for the AI Era."
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie']
    }
  });

export default i18n;
