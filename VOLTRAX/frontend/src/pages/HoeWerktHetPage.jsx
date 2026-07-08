import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Sun, Battery, Zap, ArrowRight,
  CheckCircle2, TrendingUp,
  Sparkles, BatteryCharging, SunMedium, Flame,
  HelpCircle, Lightbulb, Shield, Award
} from 'lucide-react'
import Nav from '../components/Nav.jsx'
import { useLanguage } from '../context/LanguageContext'

const ease = [0.22, 1, 0.36, 1]
const RESERVE_PCT = 15

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.55, ease }}
      className={className}>
      {children}
    </motion.div>
  )
}

function getPhases(nl) {
  return [
    {
      id: 'night',
      tijd: '23:00 – 06:00',
      icon: <Sparkles className="w-5 h-5" />,
      iconColor: 'text-indigo-500',
      iconBg: 'bg-indigo-50',
      accentColor: '#6366f1',
      levelFrom: RESERVE_PCT,
      levelTo: 28,
      status: 'negative',
      price: -0.03,
      title: nl ? 'Slim laden tijdens de goedkoopste uren' : 'Smart charging during the cheapest hours',
      body: nl
        ? 'Tijdens de nacht zijn stroomprijzen vaak het laagst — soms zelfs extreem laag of negatief. Het systeem controleert continu de marktprijzen en laadt de batterij automatisch op het meest gunstige moment. U hoeft hier niets voor te doen.'
        : 'At night, electricity prices are often lowest — sometimes even extremely low or negative. The system continuously monitors market prices and charges the battery automatically at the most favourable moment.',
      bullets: nl
        ? ['Goedkoopste uren automatisch benut', 'Negatieve prijs? U profiteert bij afname', 'Werkt elke nacht volledig automatisch']
        : ['Cheapest hours used automatically', 'Negative price? You benefit when consuming', 'Fully automatic every night'],
      insightType: 'kernidee',
      insight: nl
        ? 'Energie wordt niet op één vast moment gekocht, maar op het meest gunstige moment binnen de dag.'
        : 'Energy is not bought at one fixed moment, but at the most favourable moment of the day.',
    },
    {
      id: 'morning',
      tijd: '06:00 – 12:00',
      icon: <BatteryCharging className="w-5 h-5" />,
      iconColor: 'text-amber-500',
      iconBg: 'bg-amber-50',
      accentColor: '#f59e0b',
      levelFrom: 28,
      levelTo: 58,
      status: 'charging',
      price: 0,
      title: nl ? 'Eerste zonne-energie direct benut en opgeslagen' : 'First solar energy used directly and stored',
      body: nl
        ? 'Zodra uw zonnepanelen energie produceren, wordt deze eerst direct gebruikt in uw woning — koelkast, ventilatie, apparaten. De energie die op dat moment niet direct nodig is, gaat in de batterij. Zo blijft meer van uw eigen opgewekte energie beschikbaar voor later.'
        : 'As soon as your solar panels produce energy, it is first used directly in your home. Energy not immediately needed goes into the battery — keeping more of your own generated energy available for later.',
      bullets: nl
        ? ['Direct verbruik heeft altijd prioriteit', 'Overschot gaat de batterij in, niet het net', 'Laadt ook bij bewolkt weer gedeeltelijk']
        : ['Direct consumption always has priority', 'Surplus goes to the battery, not the grid', 'Charges partially even on cloudy days'],
      insightType: 'faq',
      insight: nl
        ? 'Wat als ik mijn elektrische auto overdag laad? Dan gaat de zonne-energie eerst naar de auto. Het systeem verdeelt automatisch de beschikbare energie tussen direct verbruik, auto en batterij.'
        : 'What if I charge my electric car during the day? Then the solar energy goes to the car first. The system automatically distributes energy between direct use, the car and the battery.',
    },
    {
      id: 'midday',
      tijd: '12:00 – 17:00',
      icon: <SunMedium className="w-5 h-5" />,
      iconColor: 'text-yellow-500',
      iconBg: 'bg-yellow-50',
      accentColor: '#eab308',
      levelFrom: 58,
      levelTo: 83,
      status: 'charging',
      price: 0,
      title: nl ? 'Maximale zonne-opbrengst en overschot' : 'Peak solar output and surplus',
      body: nl
        ? 'Dit zijn de uren met de hoogste zonneproductie. In veel huishoudens ontstaat hier een energieoverschot. Zonder batterij gaat dit overschot direct terug naar het net. Met een batterij wordt het overschot opgeslagen — zodat een groter deel van uw eigen stroom intern beschikbaar blijft.'
        : 'These are the hours with the highest solar production. In many households a surplus arises here. Without a battery this goes back to the grid. With a battery the surplus is stored for later internal use.',
      bullets: nl
        ? ['Overschot opgeslagen in plaats van teruggeleverd', 'Groter deel van eigen zonne-energie benut', 'EMS reserveert ruimte voor avondpiek']
        : ['Surplus stored instead of fed back', 'Larger share of own solar power used', 'EMS reserves capacity for evening peak'],
      insightType: 'faq',
      insight: nl
        ? '"Ik gebruik mijn zonnestroom toch al direct?" — Dat klopt. Een deel wordt direct gebruikt. De batterij richt zich juist op het overschot dat anders automatisch teruggeleverd wordt.'
        : '"Don\'t I already use my solar directly?" — Correct. Part is used directly. The battery targets the surplus that would otherwise be fed back automatically.',
    },
    {
      id: 'evening',
      tijd: '17:00 – 23:00',
      icon: <Flame className="w-5 h-5" />,
      iconColor: 'text-orange-500',
      iconBg: 'bg-orange-50',
      accentColor: '#f97316',
      levelFrom: 83,
      levelTo: RESERVE_PCT,
      status: 'discharging',
      price: 0.34,
      title: nl ? 'Gebruik van eigen energie tijdens de avondpiek' : 'Using own energy during evening peak',
      body: nl
        ? 'In de avond ligt het energieverbruik het hoogst — koken, verlichting, apparaten. Tegelijkertijd is er nauwelijks nog zonneproductie. Zonder batterij koopt u op dat moment stroom in van het net. Met batterij wordt eerst de eerder opgeslagen energie gebruikt. Hierdoor neemt de behoefte aan dure netinkoop sterk af.'
        : 'In the evening, household energy use is at its highest — cooking, lighting, appliances. Meanwhile there is hardly any solar production. Without a battery you buy grid power. With a battery, stored energy is used first, significantly reducing the need for expensive grid purchases.',
      bullets: nl
        ? ['Avondpiek volledig op eigen opgeslagen stroom', 'Minder inkoop tijdens de duurste uren', 'Systeem stopt automatisch bij ingestelde reserve']
        : ['Evening peak fully on own stored power', 'Less purchasing during the most expensive hours', 'System stops automatically at configured reserve'],
      insightType: 'kernidee',
      insight: nl
        ? 'Energie wordt gebruikt op het moment dat uw woning die nodig heeft — niet op het moment dat deze wordt opgewekt.'
        : 'Energy is used when your home needs it — not at the moment it is generated.',
    },
  ]
}

const STATUS_COLORS = {
  charging:    '#eab308',   // yellow  — solar energy (sun colour)
  discharging: '#f97316',   // orange  — using stored energy
  idle:        '#94a3b8',   // slate   — standby
  negative:    '#3b82f6',   // blue    — cheap/negative grid price (night)
}

const STATUS_LABELS = {
  nl: { charging: '⚡ Laden', discharging: '🏠 Ontladen', idle: '💤 Stand-by', negative: '💰 Gratis laden' },
  en: { charging: '⚡ Charging', discharging: '🏠 Discharging', idle: '💤 Stand-by', negative: '💰 Free charging' },
}

function BatteryPhoto({ level, status, price, nl, compact = false }) {
  const pct = Math.max(0, Math.min(100, level))
  const color = STATUS_COLORS[status] ?? STATUS_COLORS.idle
  const labels = nl ? STATUS_LABELS.nl : STATUS_LABELS.en

  const W = compact ? 90 : 150
  const H = compact ? 240 : 400
  const LEFT_FILL = compact ? 33 : 55
  const RIGHT_FILL = compact ? 5 : 8

  return (
    <div className={`flex ${compact ? 'flex-row items-center gap-3' : 'flex-row items-center gap-5'} select-none`}>

      {/* battery photo */}
      <div style={{
        position: 'relative', width: W, height: H,
        flexShrink: 0, overflow: 'hidden', borderRadius: 6,
      }}>
        <img
          src="/hyxipower-battery.png"
          alt="HYXiPower All-in-One"
          draggable={false}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center center',
            zIndex: 1,
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          WebkitMaskImage: 'url(/hyxipower-battery.png)',
          WebkitMaskSize: 'cover',
          WebkitMaskPosition: 'center center',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskMode: 'alpha',
          maskImage: 'url(/hyxipower-battery.png)',
          maskSize: 'cover',
          maskPosition: 'center center',
          maskRepeat: 'no-repeat',
          maskMode: 'alpha',
          zIndex: 2,
        }}>
          <motion.div
            style={{
              position: 'absolute',
              left: LEFT_FILL, right: RIGHT_FILL, bottom: 0, top: 0,
              background: color,
              opacity: 0.48,
              transformOrigin: 'bottom',
            }}
            animate={{ scaleY: pct / 100 }}
            transition={{ duration: 1.0, ease }}
          />
          <div style={{
            position: 'absolute',
            left: LEFT_FILL, right: RIGHT_FILL,
            top: `${100 - RESERVE_PCT}%`,
            height: 2,
            background: 'rgba(255,255,255,0.92)',
            boxShadow: '0 0 5px rgba(0,0,0,0.5)',
          }} />
        </div>
      </div>

      {/* percentage + status label + price + reserve note */}
      <div className="flex flex-col gap-2">
        <motion.div
          animate={{ color }}
          transition={{ duration: 0.6 }}
          style={{ pointerEvents: 'none' }}
        >
          <span
            className="font-extrabold tabular-nums block"
            style={{ fontSize: compact ? 36 : 52, lineHeight: 1, letterSpacing: '-0.02em' }}
          >
            {Math.round(pct)}%
          </span>
          <div style={{
            fontSize: 10, fontWeight: 700,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.35)', marginTop: 3,
          }}>
            {nl ? 'Laadniveau' : 'Charge level'}
          </div>
        </motion.div>

        <div
          className="px-3 py-1 rounded-full text-xs font-bold text-white self-start"
          style={{ backgroundColor: color }}
        >
          {labels[status] ?? labels.idle}
        </div>

        {price !== null && (
          <div className={`text-[11px] font-bold px-2.5 py-1 rounded-full border self-start ${
            price < 0
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : price === 0
              ? 'bg-green-50 border-green-200 text-green-700'
              : 'bg-orange-50 border-orange-200 text-orange-700'
          }`}>
            {price < 0
              ? `€${price.toFixed(2)}/kWh`
              : price === 0
              ? (nl ? 'Gratis zon ☀️' : 'Free solar ☀️')
              : `€${price.toFixed(2)}/kWh`}
          </div>
        )}

        {!compact && (
          <div className="text-[10px] text-slate-400 font-semibold">
            {nl ? `Streep = min. reserve ${RESERVE_PCT}%` : `Line = min. reserve ${RESERVE_PCT}%`}
          </div>
        )}
      </div>
    </div>
  )
}

function useIsMobile() {
  const [mobile, setMobile] = React.useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  React.useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return mobile
}

function BatteryLive({ scrollYProgress, phases, nl, compact }) {
  const level = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 0.90, 1],
    [RESERVE_PCT, 28, 58, 83, 83, RESERVE_PCT]
  )
  const [lv, setLv] = React.useState(phases[0].levelFrom)
  const [pi, setPi] = React.useState(0)

  React.useEffect(() => {
    const u1 = level.on('change', v => setLv(v))
    const u2 = scrollYProgress.on('change', v => setPi(v < 0.25 ? 0 : v < 0.5 ? 1 : v < 0.75 ? 2 : 3))
    return () => { u1(); u2() }
  }, [level, scrollYProgress])

  return <BatteryPhoto level={lv} status={phases[pi].status} price={phases[pi].price} nl={nl} compact={compact} />
}

function PhaseDots({ phaseIndex, total = 4 }) {
  const [pi, setPi] = React.useState(0)
  React.useEffect(() => {
    const u = phaseIndex.on('change', v => setPi(Math.round(v)))
    return u
  }, [phaseIndex])
  return (
    <div className="flex items-center gap-2 justify-center mb-3">
      {Array.from({ length: total }, (_, i) => (
        <motion.div
          key={i}
          animate={{ backgroundColor: i === pi ? '#22a55d' : '#d1d5db', width: i === pi ? 22 : 8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ height: 8, borderRadius: 4, flexShrink: 0 }}
        />
      ))}
      <span className="text-xs text-gray-400 font-semibold ml-1">{pi + 1} / {total}</span>
    </div>
  )
}

function PhaseCard({ phase, index, phaseIndex, total }) {
  const [active, setActive] = React.useState(index === 0)
  React.useEffect(() => {
    const u = phaseIndex.on('change', v => setActive(Math.round(v) === index))
    return u
  }, [phaseIndex, index])

  const isFaq     = phase.insightType === 'faq'
  const InsightIcon = isFaq ? HelpCircle : Lightbulb

  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0.22, scale: active ? 1 : 0.972, x: active ? 0 : -8 }}
      transition={{ duration: 0.35, ease }}
      className="mb-3 last:mb-0"
    >
      <div className={`rounded-2xl border-2 transition-colors ${
        active
          ? 'border-[#22a55d] bg-[#f0fdf4] shadow-md shadow-green-100 px-5 py-5'
          : 'border-gray-100 bg-gray-50 px-3 py-2'
      }`}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-0">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={active
              ? { background: phase.accentColor, color: '#fff', boxShadow: `0 3px 10px ${phase.accentColor}44` }
              : { background: '#f1f5f9', color: '#94a3b8' }}
          >
            {phase.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">{phase.tijd}</span>
              {active && (
                <span className="text-[9px] font-bold bg-[#22a55d]/10 text-[#22a55d] px-2 py-0.5 rounded-full">
                  {index + 1}/{total}
                </span>
              )}
            </div>
            <div className={`font-extrabold leading-tight ${active ? 'text-[15px] text-[#131A20]' : 'text-[12px] text-gray-400'}`}>
              {phase.title}
            </div>
          </div>
        </div>

        {active && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-3"
          >
            <p className="text-base text-[#131A20]/65 leading-relaxed mb-3">{phase.body}</p>

            {/* Bullet checkmarks */}
            <div className="space-y-1.5 mb-3">
              {phase.bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-sm font-semibold text-[#131A20]/70">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#22a55d]" />{b}
                </div>
              ))}
            </div>

            {/* Insight / FAQ callout */}
            {phase.insight && (
              <div className={`flex items-start gap-2 rounded-lg px-3 py-2 ${
                isFaq
                  ? 'bg-blue-50 border border-blue-100'
                  : 'bg-amber-50 border border-amber-100'
              }`}>
                <InsightIcon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isFaq ? 'text-blue-500' : 'text-amber-500'}`} />
                <p className={`text-[13px] leading-snug ${isFaq ? 'text-blue-800/80' : 'text-amber-900/75'}`}>
                  <span className="font-bold">{isFaq ? 'Veelgestelde vraag · ' : 'Kernidee · '}</span>
                  {phase.insight}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

function ScrollSection({ nl }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const phases = getPhases(nl)
  const total = phases.length
  const phaseIndex = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 3])
  const isMobile = useIsMobile()

  const NAV_H = 57

  return (
    <section ref={containerRef} style={{ height: '500vh', position: 'relative' }}>
      <div
        className="sticky overflow-hidden bg-white"
        style={{ top: NAV_H, height: `calc(100vh - ${NAV_H}px)` }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-full flex flex-col">

          {/* Header */}
          <div className="text-center pt-2 pb-1 flex-shrink-0">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-[10px] font-semibold px-2 py-1 rounded-full mb-1">
              <Battery className="w-3 h-3" />
              {nl ? 'Een dag in het leven van uw batterij' : 'A day in the life of your battery'}
            </div>
            <h2 className="text-base sm:text-xl font-extrabold text-[#131A20] leading-tight">
              {nl ? 'Zo werkt het — 24 uur per dag' : 'How it works — 24 hours a day'}
            </h2>
          </div>

          {/* Progress dots */}
          <div className="flex-shrink-0 py-1">
            <PhaseDots phaseIndex={phaseIndex} total={total} />
          </div>

          {/* Main content — row on desktop, column on mobile */}
          <div className={`flex ${isMobile ? 'flex-col gap-2' : 'flex-row gap-8 lg:gap-12'} items-${isMobile ? 'stretch' : 'center'} justify-center flex-1 min-h-0`}>

            {/* Battery — hidden on very small screens to save space */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <BatteryLive scrollYProgress={scrollYProgress} phases={phases} nl={nl} compact={isMobile} />
            </div>

            {/* Phase cards — scrollable on mobile so they don't overflow */}
            <div className={`${isMobile ? 'w-full overflow-y-auto flex-1 min-h-0' : 'flex-1 max-w-lg overflow-y-auto'}`}>
              {phases.map((phase, i) => (
                <PhaseCard key={phase.id} phase={phase} index={i} phaseIndex={phaseIndex} total={total} />
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="py-2 flex-shrink-0 flex justify-center">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full">
                <span className="text-xs font-semibold text-gray-500">
                  {nl ? '↓  Scroll om de dag te zien' : '↓  Scroll to see the full day'}
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default function HoeWerktHetPage() {
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const nl = lang === 'nl'

  return (
    <div className="min-h-screen bg-white text-[#131A20] font-['Plus_Jakarta_Sans']">
      <Nav />

      {/* ── HERO ── */}
      <section className="pt-28 pb-20 bg-[#F9F7F4] overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#22a55d]/6" />
          <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-[#22a55d]/4" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#22a55d]/15 text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <Battery className="w-3.5 h-3.5" />
            {nl ? 'HYXiPower partner Nederland' : 'HYXiPower partner Netherlands'}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}
            className="text-5xl sm:text-6xl font-extrabold leading-[1.06] tracking-tight mb-5 text-[#131A20]">
            {nl ? <>Hoe werkt een<br /><span className="text-[#22a55d]">thuisbatterij</span>?</> : <>How does a<br /><span className="text-[#22a55d]">home battery</span> work?</>}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}
            className="text-[#131A20]/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {nl
              ? 'Uw zonnepanelen maken stroom. Een batterij slaat dat op. Het systeem kiest automatisch wanneer te laden en ontladen — op basis van echte marktprijzen, elke 15 minuten opnieuw.'
              : 'Your solar panels generate power. A battery stores it. The system automatically decides when to charge and discharge — based on real market prices, every 15 minutes.'}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28 }}
            className="flex flex-wrap gap-3 justify-center">
            <button onClick={() => navigate('/calculator')}
              className="inline-flex items-center gap-2 bg-[#22a55d] hover:bg-[#1a9050] text-white font-semibold px-7 py-3.5 rounded-full transition-all hover:shadow-xl hover:shadow-green-500/25 text-sm">
              {nl ? 'Bereken mijn besparing' : 'Calculate my savings'} <ArrowRight className="w-4 h-4" />
            </button>
            <a href="mailto:info@solarfast.nl"
              className="inline-flex items-center gap-2 border border-gray-200 bg-white text-[#131A20]/60 hover:border-[#22a55d] hover:text-[#22a55d] font-medium px-7 py-3.5 rounded-full transition-all text-sm">
              {nl ? 'Stel een vraag' : 'Ask a question'}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── SCROLL BATTERIJ ── */}
      <ScrollSection nl={nl} />

      {/* ── RESERVE UITLEG ── */}
      <section className="py-14 bg-[#F9F7F4]">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 flex flex-col md:flex-row gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl flex-shrink-0">🔒</div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400 mb-2">
                  {nl ? 'Ingebouwde beveiliging' : 'Built-in protection'}
                </div>
                <h3 className="font-extrabold text-xl text-[#131A20] mb-3">
                  {nl ? 'De reserve: altijd een buffer' : 'The reserve: always a buffer'}
                </h3>
                <p className="text-[#131A20]/65 text-sm leading-relaxed mb-4">
                  {nl
                    ? 'De batterij ontlaadt nooit tot nul. Via de HYXiPower Cloud app stelt u een minimale reserve in — standaard tussen 10 en 20%. Zo is er altijd stroom als u laat thuiskomt, of bij bewolkt weer de volgende dag.'
                    : 'The battery never discharges to zero. Via the HYXiPower Cloud app you set a minimum reserve — typically between 10 and 20%. This ensures there is always power available late at night, or on a cloudy day that follows.'}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {(nl
                    ? ['Instelbaar via HYXiPower Cloud app', 'Beschermt de levensduur van de cellen', 'Altijd beschikbaar — ook bij bewolkt weer']
                    : ['Configurable via HYXiPower Cloud app', 'Protects the lifespan of the cells', 'Always available — even on cloudy days']
                  ).map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs font-semibold text-[#131A20]/80 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#22a55d]" />{item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── EPEX ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              {nl ? 'EPEX Spotmarkt' : 'EPEX Spot market'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              {nl ? 'Negatieve stroomprijs: u wordt betaald om te laden' : 'Negative electricity price: you get paid to charge'}
            </h2>
            <p className="text-[#131A20]/60 text-base max-w-2xl mx-auto leading-relaxed">
              {nl
                ? 'Op de Europese stroommarkt (EPEX) kan de prijs negatief worden — op zonnige of winderige momenten wanneer er meer aanbod is dan vraag. Uw batterij profiteert automatisch.'
                : 'On the European electricity market (EPEX) prices can go negative — on sunny or windy moments when supply exceeds demand. Your battery benefits automatically.'}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <Reveal delay={0.1}>
              <div className="bg-[#F9F7F4] rounded-2xl p-6 h-full">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="font-extrabold text-lg mb-2">{nl ? 'Hoe werkt het?' : 'How does it work?'}</h3>
                <p className="text-sm text-[#131A20]/60 leading-relaxed mb-4">
                  {nl
                    ? 'Elke dag om ±13:00 publiceert EPEX de day-ahead prijzen voor elk uur van morgen. Uw EMS leest die prijzen en plant automatisch de laad- en ontlaadmomenten.'
                    : 'Every day around 13:00, EPEX publishes day-ahead prices for every hour of tomorrow. Your EMS reads those prices and automatically plans charge and discharge moments.'}
                </p>
                <div className="space-y-2">
                  {(nl
                    ? ['±13:00 → prijzen morgen bekend', 'EMS plant laad- en ontlaadschema', 'Elke 15 minuten: beslissing bijstellen', '24/7 volledig automatisch']
                    : ['±13:00 → tomorrow\'s prices known', 'EMS plans charge and discharge schedule', 'Every 15 minutes: decision adjusted', '24/7 fully automatic']
                  ).map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-[#131A20]/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#22a55d] flex-shrink-0" />{item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-[#F9F7F4] rounded-2xl p-6 h-full">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4 text-lg">💰</div>
                <h3 className="font-extrabold text-lg mb-2">{nl ? 'Negatieve prijs — u verdient' : 'Negative price — you earn'}</h3>
                <p className="text-sm text-[#131A20]/60 leading-relaxed mb-4">
                  {nl
                    ? 'Als de EPEX-prijs negatief is en uw leverancier dat doorberekent, wordt u betaald om stroom af te nemen. Uw batterij laadt precies op die momenten.'
                    : 'When the EPEX price is negative and your supplier passes that through, you are paid to consume power. Your battery charges exactly at those moments.'}
                </p>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <div className="text-xs font-bold text-blue-700 mb-3 uppercase tracking-wide">
                    {nl ? 'Voorbeeld' : 'Example'}
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: nl ? 'Marktprijs' : 'Market price', val: '− €0,05/kWh', c: 'text-blue-700' },
                      { label: nl ? 'Uw batterij laadt' : 'Your battery charges', val: '10,6 kWh', c: 'text-[#22a55d]' },
                      { label: nl ? 'Voordeel vs. avondpiek' : 'Advantage vs. evening peak', val: '± €0,35/kWh', c: 'text-[#22a55d] font-extrabold' },
                    ].map((r, i) => (
                      <div key={i} className="flex justify-between items-center text-xs">
                        <span className="text-[#131A20]/55">{r.label}</span>
                        <span className={`font-bold ${r.c}`}>{r.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <div className="bg-[#EEF6F1] rounded-2xl border border-[#22a55d]/20 p-5">
              <p className="text-[#131A20] font-semibold text-sm leading-relaxed">
                {nl
                  ? '📈 Door de groei van zonne- en windenergie in Europa komen negatieve stroomprijzen steeds vaker voor. Een thuisbatterij wordt daardoor elk jaar relevanter — niet minder.'
                  : '📈 Due to the growth of solar and wind energy in Europe, negative electricity prices are occurring more frequently. A home battery therefore becomes more relevant each year — not less.'}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GOED OM TE WETEN ── */}
      <section className="py-24 bg-[#F9F7F4]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#22a55d]/15 text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full mb-5">
              <Battery className="w-3.5 h-3.5" />
              {nl ? 'Goed om te weten' : 'Good to know'}
            </div>
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
              {nl ? 'Feiten die het verschil maken' : 'Facts that make a difference'}
            </h2>
            <p className="text-[#131A20]/55 text-lg max-w-xl mx-auto leading-relaxed">
              {nl
                ? 'Niet alle thuisbatterijen zijn hetzelfde. Dit zijn de punten waar het in de praktijk op aankomt.'
                : 'Not all home batteries are the same. These are the points that matter in practice.'}
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(nl ? [
              {
                emoji: '⚡',
                title: 'Negatieve stroomprijzen komen vaker voor',
                body: 'In Nederland waren er in 2024 meer dan 200 uur met een negatieve stroomprijs op de EPEX-spotmarkt. Door de groei van zon- en windenergie in Europa neemt dat aantal elk jaar toe. Een thuisbatterij wordt daardoor elk jaar relevanter.',
              },
              {
                emoji: '🔋',
                title: 'LFP vs. NMC: niet elke lithiumbatterij is gelijk',
                body: 'Er zijn twee veelgebruikte lithiumchemieën: LFP (lithium-ijzerfosfaat) en NMC (nikkel-mangaan-kobalt). LFP is thermisch stabieler, brandveiliger en gaat meer laadcycli mee. Het is ook de keuze van fabrikanten als BYD voor hun thuisbatterijen.',
              },
              {
                emoji: '📱',
                title: 'Altijd inzicht via de app',
                body: 'Met de HYXiPower app volgt u in realtime hoeveel stroom uw batterij opslaat en gebruikt. Zo houdt u grip op uw energiehuishouding, waar u ook bent.',
              },
              {
                emoji: '🧩',
                title: 'Modulair uitbreiden wanneer u wilt',
                body: 'De HYXiPower All-in-One is modulair opgebouwd. Heeft u later meer opslagcapaciteit nodig? Dan breidt u het systeem uit zonder alles te vervangen.',
              },
              {
                emoji: '🔌',
                title: 'Backup/noodstroom: niet standaard bij elke batterij',
                body: 'Sommige thuisbatterijen werken alleen als het stroomnet actief is. De HYXiPower All-in-One kan — met de juiste configuratie — ook noodstroom leveren bij een stroomstoring. Handig als u apparaten draaiende wilt houden bij netuitval.',
              },
            ] : [
              {
                emoji: '⚡',
                title: 'Negative electricity prices are becoming more common',
                body: 'In the Netherlands, there were more than 200 hours with negative EPEX spot prices in 2024. As solar and wind energy grow across Europe, that number increases every year — making a home battery more relevant, not less.',
              },
              {
                emoji: '🔋',
                title: 'LFP vs. NMC: not all lithium batteries are equal',
                body: 'There are two common lithium chemistries: LFP (lithium iron phosphate) and NMC (nickel-manganese-cobalt). LFP is thermally more stable, fire-safer and lasts more charge cycles. It is also the choice of manufacturers like BYD for their home batteries.',
              },
              {
                emoji: '📱',
                title: 'Always insight via the app',
                body: 'With the HYXiPower app you track in real time how much power your battery stores and uses. That keeps you in control of your energy usage, wherever you are.',
              },
              {
                emoji: '🧩',
                title: 'Expand modularly whenever you want',
                body: 'The HYXiPower All-in-One is built modularly. Need more storage capacity later? Then you expand the system without replacing everything.',
              },
              {
                emoji: '🔌',
                title: 'Backup / emergency power: not standard on every battery',
                body: 'Some home batteries only work when the grid is active. The HYXiPower All-in-One can — with the correct configuration — also supply emergency power during an outage. Useful for keeping appliances running when the grid goes down.',
              },
            ]).map((item, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="bg-white rounded-3xl border border-gray-100 p-7 h-full hover:shadow-lg hover:shadow-gray-100 hover:border-[#22a55d]/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <h3 className="font-extrabold text-base text-[#131A20] mb-2.5 leading-snug">{item.title}</h3>
                  <p className="text-sm text-[#131A20]/60 leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 bg-[#22a55d] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/8" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-7">
              <Battery className="w-3.5 h-3.5" />
              {nl ? 'Kosteloos, geen registratie vereist' : 'Free, no registration required'}
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-5 text-white leading-tight tracking-tight">
              {nl ? 'Wat levert het u op?' : 'What does it deliver for you?'}
            </h2>
            <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              {nl
                ? 'Bereken in 2 minuten uw persoonlijke besparing op basis van uw eigen verbruik, zonproductie en energietarief.'
                : 'Calculate your personal savings in 2 minutes based on your own consumption, solar output and energy tariff.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/calculator')}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-green-50 text-[#22a55d] font-bold px-8 py-4 rounded-full transition-all hover:shadow-2xl hover:shadow-black/10 text-base">
                {nl ? 'Bereken mijn besparing' : 'Calculate my savings'} <ArrowRight className="w-5 h-5" />
              </button>
              <a href="mailto:info@solarfast.nl"
                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-8 py-4 rounded-full transition-all text-base border border-white/30">
                {nl ? 'Stel een vraag' : 'Ask a question'}
              </a>
            </div>
            <p className="mt-5 text-xs text-white/60">
              {nl ? '100% vrijblijvend · Geen registratie vereist' : '100% free of obligation · No registration required'}
            </p>
          </Reveal>
        </div>
      </section>

      <footer className="bg-[#F9F7F4] border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-extrabold text-[#131A20] mb-3">
              SOLAR<span className="text-[#22a55d]">FAST</span>
            </div>
            <p className="text-sm text-[#131A20]/45 leading-relaxed mb-4">{nl ? 'HYXiPower partner in Nederland. Uw thuisbatterij specialist.' : 'HYXiPower partner in the Netherlands. Your home battery specialist.'}</p>
            <a href="mailto:info@solarfast.nl" className="text-sm text-[#22a55d] font-medium hover:underline">info@solarfast.nl</a>
          </div>
          <div>
            <div className="text-xs font-bold text-[#131A20]/30 uppercase tracking-widest mb-4">{nl ? 'Producten' : 'Products'}</div>
            <ul className="space-y-2.5 text-sm text-[#131A20]/55">
              <li><button onClick={() => navigate('/aanbod')} className="hover:text-[#22a55d] transition-colors text-left">{nl ? 'Ons aanbod' : 'Our offer'}</button></li>
              <li><button onClick={() => navigate('/hyxipower')} className="hover:text-[#22a55d] transition-colors text-left">Over HYXiPower</button></li>
              <li><button onClick={() => navigate('/calculator')} className="hover:text-[#22a55d] transition-colors text-left">{nl ? 'Bereken besparing' : 'Calculate savings'}</button></li>
              <li><button onClick={() => navigate('/warmtefonds')} className="hover:text-[#22a55d] transition-colors text-left">Warmtefonds</button></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold text-[#131A20]/30 uppercase tracking-widest mb-4">{nl ? 'Informatie' : 'Information'}</div>
            <ul className="space-y-2.5 text-sm text-[#131A20]/55">
              <li><button onClick={() => navigate('/hoe-werkt-het')} className="hover:text-[#22a55d] transition-colors text-left">{nl ? 'Hoe werkt het?' : 'How it works'}</button></li>
              <li><button onClick={() => navigate('/waarom-solarfast')} className="hover:text-[#22a55d] transition-colors text-left">{nl ? 'Waarom SolarFast' : 'Why SolarFast'}</button></li>
              <li><button onClick={() => navigate('/faq')} className="hover:text-[#22a55d] transition-colors text-left">{nl ? 'Veelgestelde vragen' : 'FAQ'}</button></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold text-[#131A20]/30 uppercase tracking-widest mb-4">HYXiPower</div>
            <ul className="space-y-2.5 text-sm text-[#131A20]/55">
              <li className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#22a55d] flex-shrink-0" />LFP/LiFePO4 {nl ? 'celtechnologie' : 'cell technology'}</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#22a55d] flex-shrink-0" />{nl ? 'Slim EMS-beheer' : 'Smart EMS management'}</li>
              <li className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#22a55d] flex-shrink-0" />All-in-One</li>
              <li className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-[#22a55d] flex-shrink-0" />{nl ? 'Modulair uitbreidbaar' : 'Modular expandable'}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[#131A20]/35">© {new Date().getFullYear()} SolarFast · {nl ? 'HYXiPower partner Nederland' : 'HYXiPower partner Netherlands'}</p>
            <p className="text-xs text-[#131A20]/30">info@solarfast.nl</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
