import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { 
  Shield, 
  Activity, 
  Play, 
  Download, 
  Globe, 
  Menu, 
  X,
  Lock,
  Monitor,
  Database,
  Maximize2,
  Mail,
  Cpu,
  AlertCircle,
  RefreshCcw,
  CheckCircle2,
  MessageSquare,
  ArrowRight
} from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const architectureImages = [
  "/pic01.png", "/pic02.png", "/pic03.png", "/pic04.png",
  "/pic05.png", "/pic06.png", "/pic07.png", "/pic08.png"
]

const GithubIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

export default function App() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState('hero')
  const [currentStep, setCurrentStep] = useState(0)
  
  const { scrollY } = useScroll()
  const scaleX = useSpring(useScroll().scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024
    if (isMobile && latest > previous && latest > 150) {
      setHidden(true)
      setIsMenuOpen(false)
    } else {
      setHidden(false)
    }
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = ['features', 'innovation', 'architecture', 'demo']
      const current = sections.find(section => {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          return rect.top >= -100 && rect.top <= 400
        }
        return false
      })
      if (current) setActiveSection(current)
      else if (window.scrollY < 300) setActiveSection('hero')
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4)
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')
  }

  const navLinks = [
    { href: '#features', id: 'features', label: t('features.title') },
    { href: '#innovation', id: 'innovation', label: t('innovation.title') },
    { href: '#architecture', id: 'architecture', label: t('architecture.title') },
    { href: '#demo', id: 'demo', label: t('labels.live_demo') },
  ]

  const loopSteps = [
    { id: 'execute', icon: <Play size={32} />, label: i18n.language === 'en' ? 'Execute' : '執行', desc: i18n.language === 'en' ? 'AI runs code' : 'AI 運行代碼', color: 'text-white', bgColor: 'bg-white/5', ringColor: 'ring-white/20' },
    { id: 'fail', icon: <AlertCircle size={32} />, label: i18n.language === 'en' ? 'Fail' : '失敗', desc: i18n.language === 'en' ? 'Security block' : '觸發安全攔截', color: 'text-red-400', bgColor: 'bg-red-500/10', ringColor: 'ring-red-500/30' },
    { id: 'feedback', icon: <RefreshCcw size={32} />, label: i18n.language === 'en' ? 'Feedback' : '反饋', desc: i18n.language === 'en' ? 'Semantic info' : '語義化診斷', color: 'text-amber-400', bgColor: 'bg-amber-500/10', ringColor: 'ring-amber-500/30' },
    { id: 'repair', icon: <CheckCircle2 size={32} />, label: i18n.language === 'en' ? 'Repair' : '修復', desc: i18n.language === 'en' ? 'Self-Correction' : '系統自動修復', color: 'text-primary', bgColor: 'bg-primary/10', ringColor: 'ring-primary/30' },
  ]

  return (
    <div className="min-h-screen bg-dark-bg font-sans text-slate-100">
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12" onClick={() => setSelectedImage(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative max-w-7xl w-full h-full flex items-center justify-center pointer-events-none">
              <img src={architectureImages[selectedImage]} alt="Architecture" className="max-w-full max-h-full object-contain shadow-2xl pointer-events-auto rounded-lg" />
              <button onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }} className="absolute top-0 right-0 m-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors pointer-events-auto shadow-lg"><X size={28} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed top-4 md:top-8 left-0 w-full z-50 flex justify-center px-4 md:px-6">
        <motion.nav 
          initial={{ y: -100 }} 
          animate={{ 
            y: hidden ? -120 : 0,
            scale: scrolled ? 1.0 : (typeof window !== 'undefined' && window.innerWidth < 768 ? 1.0 : 1.15) 
          }} 
          transition={{ 
            y: { duration: 0.3, ease: "easeInOut" },
            scale: { type: "spring", stiffness: 200, damping: 20 }
          }}
          className={cn(
            "flex items-center gap-2 md:gap-3 p-1.5 md:p-2.5 rounded-full glass transition-all duration-500 border-white/10 shadow-2xl overflow-hidden relative",
            scrolled ? "bg-dark-surface/95" : "bg-dark-surface/60"
          )}
        >
          <motion.div className="absolute bottom-0 left-0 h-[2px] bg-primary" style={{ scaleX, transformOrigin: "left" }} />
          <div className="flex items-center gap-2 md:gap-3 pl-3 md:pl-5 pr-4 md:pr-6 border-r border-white/10">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-primary rounded-lg md:rounded-xl flex items-center justify-center text-dark-bg shadow-lg shadow-primary/20"><Shield size={18} fill="currentColor" /></div>
            <span className="text-xs md:text-sm font-black tracking-tighter italic text-white">{t('title')}</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 relative px-3">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className={cn("text-[13px] font-bold tracking-wide px-5 py-2.5 rounded-full transition-all relative z-10", activeSection === link.id ? "text-primary" : "text-slate-400 hover:text-white")}>
                {link.label}
                {activeSection === link.id && (
                  <motion.div layoutId="liquid-pill" className="absolute inset-0 bg-primary/10 rounded-full -z-10 border border-primary/30" transition={{ type: "spring", bounce: 0.3, duration: 0.6 }} />
                )}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 pr-1 md:pr-2">
            <button onClick={toggleLanguage} className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-slate-400 hover:text-primary hover:bg-primary/10 transition-all"><Globe size={18} /></button>
            <a href="https://github.com/Ming874/mcp-sentinel-box" target="_blank" className="bg-white text-dark-bg px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-base font-black hover:bg-primary transition-all flex items-center gap-2 shadow-xl shrink-0"><GithubIcon size={18} /><span className="hidden xs:block">GitHub</span></a>
            <button className="lg:hidden w-8 h-8 flex items-center justify-center text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </motion.nav>
      </div>



      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 z-[60] bg-dark-bg/60 backdrop-blur-md lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-md z-[70] bg-dark-surface border-l border-white/10 p-10 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-16">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-dark-bg shadow-lg shadow-primary/20"><Shield size={16} fill="currentColor" /></div>
                    <span className="text-lg font-black tracking-tighter italic text-white">{t('title')}</span>
                  </div>
                  <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white"><X size={20} /></button>
                </div>
                
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, i) => (
                    <motion.a 
                      key={link.href} 
                      href={link.href} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                      onClick={() => setIsMenuOpen(false)} 
                      className="group flex items-center justify-between py-5 border-b border-white/5"
                    >
                      <span className="text-2xl font-black tracking-tighter uppercase italic text-slate-300 group-hover:text-primary transition-colors">{link.label}</span>
                      <ArrowRight size={20} className="text-primary opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                    </motion.a>
                  ))}
                </div>

                <div className="mt-auto pt-10 border-t border-white/5 flex flex-col gap-4">
                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    onClick={() => { toggleLanguage(); setIsMenuOpen(false); }} 
                    className="flex items-center justify-between p-5 rounded-2xl bg-white/5 text-slate-300 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <Globe size={20} className="text-primary" />
                      <span className="font-bold">{i18n.language === 'en' ? 'English' : '繁體中文'}</span>
                    </div>
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{i18n.language === 'en' ? 'Switch' : '切換'}</span>
                  </motion.button>
                  
                  <motion.a 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    href="https://github.com/Ming874/mcp-sentinel-box" 
                    className="bg-white text-dark-bg p-5 rounded-2xl flex items-center justify-center gap-4 text-lg font-black shadow-xl"
                  >
                    <GithubIcon size={20} />GitHub
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main>
        <section id="hero" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <div className="flex items-center gap-3 mb-8"><span className="w-12 h-[2px] bg-primary" /><span className="text-primary text-xs font-bold tracking-widest uppercase">Model Context Protocol Ready</span></div>
                <h1 className="text-5xl md:text-7xl font-black mb-10 leading-[0.95] tracking-tighter italic">Secure <span className="text-primary">AI</span> <br />Execution</h1>
                <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-2xl font-medium">{t('description')}</p>
                <div className="relative mb-16 max-w-xl">
                  <div className="grid grid-cols-4 gap-3 md:gap-6">
                    {loopSteps.map((step, idx) => (
                      <div key={step.id} className="relative group">
                        <motion.div animate={currentStep === idx ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }} className={cn("flex flex-col items-center p-4 md:p-6 rounded-2xl md:rounded-3xl border transition-all duration-700 aspect-square justify-center relative z-10 overflow-hidden", currentStep === idx ? cn(step.ringColor, step.bgColor, "border-transparent shadow-2xl") : "border-white/5 bg-dark-surface/40 grayscale opacity-40")}>
                          <div className={cn("mb-2 md:mb-4 transition-transform duration-500", currentStep === idx ? "scale-110 md:scale-125 " + step.color : "text-slate-500")}>{step.icon}</div>
                          <div className={cn("text-[10px] md:text-xs font-black uppercase tracking-widest", currentStep === idx ? "text-white" : "text-slate-600")}>{step.label}</div>
                          {currentStep === idx && <motion.div layoutId="active-glow" className="absolute inset-0 bg-primary/5 blur-xl -z-10" />}
                        </motion.div>
                        {idx < 3 && <div className="absolute top-1/2 -right-3 md:-right-5 -translate-y-1/2 z-0"><motion.div animate={currentStep === idx ? { opacity: 1, x: [0, 5, 0] } : { opacity: 0.2, x: 0 }} transition={{ repeat: Infinity, duration: 1.5 }}><ArrowRight size={16} className={currentStep === idx ? "text-primary" : "text-white/10"} /></motion.div></div>}
                      </div>
                    ))}
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div key={currentStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-8 md:mt-10 p-6 md:p-8 glass rounded-2xl md:rounded-[2rem] border-primary/20 flex items-center gap-4 md:gap-6">
                      <div className={cn("w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center", loopSteps[currentStep].bgColor, loopSteps[currentStep].color)}>{loopSteps[currentStep].icon}</div>
                      <div>
                        <div className="text-xs md:text-sm font-black text-primary uppercase tracking-[0.2em] mb-1">Phase 0{currentStep + 1}</div>
                        <div className="text-lg md:text-2xl font-bold text-white leading-tight md:leading-none">{loopSteps[currentStep].desc}</div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative hidden lg:block">
                <div className="absolute -inset-2 bg-primary/20 rounded-3xl blur-[100px] opacity-20" />
                <div className="relative glass p-2 rounded-3xl border-white/10 shadow-3xl overflow-hidden"><img src="/image.png" alt="Dashboard" className="rounded-2xl shadow-2xl w-full" /></div>
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute -top-4 -right-4 glass px-6 py-5 rounded-2xl border-primary/30 shadow-2xl">
                  <div className="flex items-center gap-4"><Activity size={20} className="text-primary" /><div><div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{t('labels.protection')}</div><div className="text-sm font-black text-white uppercase italic">{t('labels.sentinel')}</div></div></div>
                </motion.div>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }} className="absolute -bottom-10 -left-10 glass px-6 py-5 rounded-2xl border-white/10 shadow-2xl">
                  <div className="flex items-center gap-4"><Cpu size={20} className="text-secondary" /><div><div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{t('labels.infrastructure')}</div><div className="text-sm font-black text-white">{t('labels.health')}</div></div></div>
                </motion.div>
              </motion.div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full -z-10 opacity-30 pointer-events-none"><div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[150px]" /></div>
        </section>

        <section id="features" className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div><h2 className="text-3xl md:text-5xl font-black tracking-tighter italic mb-4">{t('features.title')}</h2><div className="w-16 h-1.5 bg-primary" /></div>
              <p className="text-lg text-slate-400 max-w-sm font-medium leading-relaxed">Industrial-grade isolation powered by the Linux kernel and Rust.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Lock size={32} />, title: t('features.isolation'), desc: t('features.isolation_desc'), delay: 0.1 },
                { icon: <Shield size={32} />, title: t('features.security'), desc: t('features.security_desc'), delay: 0.2 },
                { icon: <Activity size={32} />, title: t('features.telemetry'), desc: t('features.telemetry_desc'), delay: 0.3 },
                { icon: <MessageSquare size={32} />, title: t('features.semantic'), desc: t('features.semantic_desc'), delay: 0.4 },
              ].map((feature, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: feature.delay }} whileHover={{ y: -10 }} className="p-8 rounded-2xl bg-dark-surface/60 backdrop-blur-xl border border-white/5 hover-glow group transition-all">
                  <div className="w-16 h-16 glass rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-105 transition-transform border-primary/10">{feature.icon}</div>
                  <h3 className="text-xl font-black tracking-tight mb-3 leading-none">{feature.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="innovation" className="py-24 bg-dark-surface/40 border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div><h2 className="text-3xl md:text-5xl font-black tracking-tighter italic mb-8">{t('innovation.title')}</h2><p className="text-xl text-slate-400 mb-10 leading-relaxed font-medium">{t('innovation.desc')}</p>
                <div className="space-y-6">
                  {[
                    { icon: <Monitor size={24} />, text: t('innovation.interception') },
                    { icon: <Database size={24} />, text: t('innovation.feedback') },
                    { icon: <RefreshCcw size={24} />, text: t('innovation.loop') },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-6 text-white font-bold text-lg">
                      <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-primary border-primary/20 shadow-lg">{item.icon}</div>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-dark-bg p-2 rounded-3xl border border-white/10 shadow-3xl overflow-hidden">
                <div className="bg-dark-surface rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-3 bg-white/5 p-8 border-b border-white/5 font-black text-[11px] uppercase tracking-widest text-slate-500"><div>{t('innovation.interception')}</div><div>{t('innovation.level')}</div><div>{t('innovation.ai')}</div></div>
                  <div className="divide-y divide-white/5 font-medium">
                    {[
                      { raw: "Exit 1", cause: "OS Import Blocked", feedback: "Security Policy Violation" },
                      { raw: "SIGSYS", cause: "Seccomp Barrier", feedback: "Network Access Refused" },
                      { raw: "OOM", cause: "Cgroup Memory", feedback: "Resource Limit Reached" },
                    ].map((row, idx) => (
                      <div key={idx} className="grid grid-cols-3 p-6 text-base items-center hover:bg-white/5 transition-colors group">
                        <div className="font-mono text-primary font-black text-lg">{row.raw}</div>
                        <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">{row.cause}</div>
                        <div className="text-slate-200 font-black group-hover:text-primary transition-colors text-base italic">{row.feedback}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="architecture" className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16"><h2 className="text-3xl md:text-5xl font-black tracking-tighter italic mb-6">{t('architecture.title')}</h2><div className="w-20 h-1.5 bg-primary mx-auto" /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[ 
                "System Overview", "Kernel Isolation", "Rust Monitor", "Semantic Logic", 
                "Real-time Metrics", "Performance Metrics", "Security Audit", "eBPF Data Flow" 
              ].map((title, idx) => (
                <motion.div key={idx} whileHover={{ scale: 0.98, y: -5 }} onClick={() => setSelectedImage(idx)} className="group relative rounded-3xl overflow-hidden bg-dark-surface/60 backdrop-blur-xl border border-white/5 cursor-pointer shadow-2xl">
                  <div className="aspect-[4/3] overflow-hidden"><img src={`/pic0${idx + 1}.png`} alt={title} className="w-full h-full object-contain bg-dark-bg/50 p-6 opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" /></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/20 to-transparent flex flex-col justify-end p-6">
                    <div className="flex items-center justify-between"><span className="text-[10px] font-black uppercase tracking-widest text-primary">Component 0{idx + 1}</span><Maximize2 size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" /></div>
                    <h4 className="text-lg font-bold tracking-tight text-white mt-1 italic">{title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-16 text-center"><motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/Report.pdf" target="_blank" className="inline-flex items-center gap-5 glass px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all border-white/20 shadow-2xl shadow-primary/10"><Download size={24} className="text-primary" />{t('labels.report_pdf')}</motion.a></div>
          </div>
        </section>

        <section id="demo" className="py-24 relative overflow-hidden bg-dark-surface/30 border-y border-white/5">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="mb-16 text-center"><h2 className="text-3xl md:text-5xl font-black tracking-tighter italic">{t('labels.live_demo')}</h2><div className="w-20 h-1.5 bg-primary mx-auto mt-6" /></div>
              <div className="relative aspect-video rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-[0_0_100px_rgba(16,185,129,0.1)] bg-black"><iframe className="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/ZsGC6J98llk?autoplay=0&mute=1" title="Demo" frameBorder="0" allowFullScreen></iframe></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-dark-surface pt-20 pb-10 relative overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-4 mb-8"><div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-dark-bg shadow-xl shadow-primary/20"><Shield size={20} fill="currentColor" /></div><span className="text-2xl font-black tracking-tighter italic text-white">{t('title')}</span></div>
              <p className="text-base text-slate-500 font-medium leading-relaxed mb-8">{t('description')}</p>
              <div className="flex gap-5">
                <a href="https://github.com/Ming874/mcp-sentinel-box" className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-slate-400 hover:text-primary transition-all border-white/10 shadow-xl"><GithubIcon size={24} /></a>
              </div>
            </div>
            <div><h4 className="text-white font-black mb-8 text-sm md:text-base uppercase tracking-[0.3em] opacity-40">{t('labels.explore')}</h4><ul className="space-y-4 text-base font-bold">{navLinks.map(link => (<li key={link.href}><a href={link.href} className="text-slate-400 hover:text-primary transition-colors">{link.label}</a></li>))}</ul></div>
            <div><h4 className="text-white font-black mb-8 text-sm md:text-base uppercase tracking-[0.3em] opacity-40">{t('labels.technical')}</h4><ul className="space-y-4 text-base font-bold"><li><a href="/Report.pdf" className="text-slate-400 hover:text-primary transition-colors">{t('labels.report_pdf')}</a></li><li><a href="https://github.com/Ming874/mcp-sentinel-box/wiki" target="_blank" className="text-slate-400 hover:text-primary transition-colors">{t('labels.wiki')}</a></li></ul></div>
            <div><h4 className="text-white font-black mb-8 text-sm md:text-base uppercase tracking-[0.3em] opacity-40">{t('labels.reach')}</h4><div className="space-y-6"><div className="flex items-start gap-4"><div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-primary shrink-0 border-primary/20"><Mail size={18} /></div><div><div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('labels.support')}</div><a href="mailto:contact@mingchen.dev" className="text-lg text-white font-black hover:text-primary transition-colors underline decoration-primary/20">contact@mingchen.dev</a></div></div></div></div>
          </div>
          <div className="pt-8 border-t border-white/5 flex justify-center text-center">
            <div className="text-slate-500 text-xs tracking-widest leading-relaxed max-w-[280px] sm:max-w-none">{t('footer')}</div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </footer>
    </div>
  )
}
