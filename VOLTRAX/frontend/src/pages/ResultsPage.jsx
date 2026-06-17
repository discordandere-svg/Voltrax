import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView, animate, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft, Battery, ArrowRight, CheckCircle2,
  Coins, ChevronDown, Download, Leaf, TrendingDown,
  Zap, Clock, Euro
} from 'lucide-react'
import { pdf } from '@react-pdf/renderer'
import { PDFReport } from '../components/PDFReport.jsx'
import { useLanguage } from '../context/LanguageContext'

function fmt(n, d = 0) {
  return new Intl.NumberFormat('nl-NL', { minimumFractionDigits: d, maximumFractionDigits: d }).format(n)
}
const ease = [0.22, 1, 0.36, 1]
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.55, ease } }),
}

function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const Tag = motion[as] || motion.div
  return (
    <Tag ref={ref} variants={fadeUp} custom={delay}
      initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </Tag>
  )
}

function AnimatedNumber({ to, prefix = '', suffix = '', decimals = 0, className = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const ctrl = animate(0, to, {
      duration: 1.6, ease,
      onUpdate: v => setVal(decimals > 0 ? parseFloat(v.toFixed(decimals)) : Math.floor(v)),
    })
    return ctrl.stop
  }, [inView, to, decimals])
  return <span ref={ref} className={className}>{prefix}{fmt(val, decimals)}{suffix}</span>
}

function CollapseCard({ trigger, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white rounded-2xl border border-black/[0.08] shadow-[0_2px_20px_rgba(0,0,0,0.06)] overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left hover:bg-black/[0.02] transition-colors"
      >
        {trigger}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }} className="flex-shrink-0">
          <ChevronDown className="w-4 h-4 text-black/40" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-black/[0.07]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function InlineDetail({ label, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-5 pt-5 border-t border-black/[0.08]">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 text-xs text-black/50 font-semibold hover:text-black/70 transition-colors"
      >
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
        {label}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pt-4 space-y-2.5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DetailRow({ label, value, sub, green, red, step }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-black/[0.06] last:border-b-0">
      <div className="flex items-start gap-3 min-w-0">
        {step && (
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#22a55d]/10 flex items-center justify-center mt-0.5">
            <span className="text-[10px] font-bold text-[#22a55d]">{step}</span>
          </div>
        )}
        <div className="min-w-0">
          <span className="text-xs font-semibold text-black/70">{label}</span>
          {sub && <span className="block text-[11px] text-black/45 mt-0.5 leading-relaxed">{sub}</span>}
        </div>
      </div>
      <span className={`text-xs font-bold flex-shrink-0 ${green ? 'text-[#22a55d]' : red ? 'text-rose-500' : 'text-black/70'}`}>
        {value}
      </span>
    </div>
  )
}

function BeforeAfter({ r, res, input }) {
  const gridCostWith    = r.grid_cost_with ?? (r.grid_import_with * (r.pE_used || 0))
  const netVoorPct      = r.net_voor_pct ?? (r.v_input > 0 ? Math.round(r.grid_import_without / r.v_input * 100) : 0)
  const netNaPct        = r.net_na_pct  ?? (r.v_input > 0 ? Math.round(r.grid_import_with    / r.v_input * 100) : 0)
  const netDepDelta     = Math.round((100 - netNaPct) - (100 - netVoorPct))
  const selfPctDelta    = Math.round((r.sc_pct_met || 0) - (r.sc_pct_zonder || 0))
  const importDelta     = r.grid_import_besparing_kwh
  const exportRevDelta  = Math.round((r.t_input || 0) - (r.export_kwh_with || 0))
  const exportRevWith   = Math.round((r.export_kwh_with || 0) * (r.pT_used || 0))
  const missedValue     = Math.round((r.t_input || 0) * ((r.pE_used || 0) - (r.pT_used || 0)))

  const tkValue = input?.terugleverkosten_value || 0
  const tkUnit  = input?.terugleverkosten_unit  || 'jaar'
  const tkJaar  = tkUnit === 'kWh' ? Math.round(tkValue * (r.export_kwh_zonder || 0)) : Math.round(tkValue)
  const leftRows = [
    { label: res.baSolarOutput,   main: `${fmt(r.pv_input)} kWh`,        sub: res.baSolarOutputSub },
    { label: res.baSelfDirect,    main: `${fmt(r.sc_direct_kwh)} kWh`,   sub: `${Math.round(r.sc_direct_kwh / r.v_input * 100)}% ${res.baSelfDirectSub}` },
    { label: res.baTeruglevering, main: `${fmt(r.t_input)} kWh / € ${fmt(r.export_revenue_without)}/jr`, sub: res.baTerugleveringSub(fmt(r.pT_used, 2), fmt(r.pE_used, 2)) },
    { label: res.baNetDep,        main: `${fmt(100 - netVoorPct, 0)}%`,   sub: res.baNetDepSub },
    { label: res.baGridImport,    main: `${fmt(r.grid_import_without)} kWh`, sub: `€ ${fmt(r.grid_cost_without)}/jr` },
    { label: res.baMissedValue,   main: `€ 0/jr`,                          sub: res.baMissedValueSub },
    { label: res.feedinCosts,     main: `€ ${fmt(tkJaar)}/jr`,             sub: res.feedinSub },
  ]
  const rightRows = [
    { label: res.baSolarOutput,   main: `${fmt(r.sc_pct_zonder, 0)}% → ${fmt(r.sc_pct_met, 0)}%`, sub: res.baSelfConsumpBasis, delta: `↑ ${selfPctDelta}%`, deltaGreen: true },
    { label: res.baBatCaptures,   main: `${fmt(r.sc_battery_kwh)} kWh`,  sub: res.baBatCapturesSub, delta: `↑ ${fmt(r.sc_battery_kwh)} kWh`, deltaGreen: true },
    { label: res.baTeruglevering, main: `${fmt(r.export_kwh_with)} kWh / € ${fmt(exportRevWith)}/jr`, sub: res.baSelfUsedNotExported(fmt(exportRevDelta)), delta: `↓ ${fmt(exportRevDelta)} kWh`, deltaGreen: true },
    { label: res.baNetDep,        main: `${fmt(100 - netNaPct, 0)}%`,    sub: res.baNetDepSub, delta: netDepDelta > 0 ? `↑ ${netDepDelta}%` : null, deltaGreen: true },
    { label: res.baGridImport,    main: `${fmt(r.grid_import_with)} kWh`, sub: res.baGridImportBatterySub(fmt(importDelta)), delta: `↓ ${fmt(importDelta)} kWh`, deltaGreen: true },
    { label: res.baEpexRow,       main: `€ ${fmt(r.smart_annual_low)}–${fmt(r.smart_annual_high)}/jr`, sub: res.baEpexRowSub, delta: '↑', deltaGreen: true },
    { label: res.baAnnualSaving,  main: `€ ${fmt(r.total_annual_low)}–${fmt(r.total_annual_high)}`, sub: res.perYear, delta: '↑', deltaGreen: true },
  ]

  const MetricRow = ({ label, main, sub, delta, deltaGreen }) => (
    <div className="flex items-start justify-between gap-3 py-3.5 border-b border-black/[0.07] last:border-b-0">
      <div className="min-w-0">
        <div className="text-sm font-semibold text-black/75 leading-tight">{label}</div>
        {sub && <div className="text-xs text-black/55 mt-0.5">{sub}</div>}
      </div>
      <div className="text-right flex-shrink-0">
        <div className="text-base font-extrabold text-black/90 leading-tight">{main}</div>
        {delta != null && (
          <div className={`text-xs font-bold mt-0.5 ${deltaGreen ? 'text-[#22a55d]' : 'text-rose-500'}`}>{delta}</div>
        )}
      </div>
    </div>
  )

  return (
    <Reveal delay={0.7}>
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-black/60 mb-3 px-0.5">
        {res.baTitle}
      </div>

      {/* ── Mobile: two stacked panels ── */}
      <div className="sm:hidden flex flex-col">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600 mb-1">{res.baCurrentTag}</div>
          <div className="font-extrabold text-base text-slate-800 mb-1">
            {r.dynamic_contract ? res.baCurrentDynamic : res.baCurrentFixed}
          </div>
          {!r.dynamic_contract && (
            <p className="text-xs text-[#22a55d] mb-3 font-medium leading-snug">{res.baCurrentDynamicHint}</p>
          )}
          {leftRows.map((row, i) => <MetricRow key={i} {...row} />)}
        </div>
        <div className="flex items-center justify-center py-2">
          <div className="flex items-center gap-2 text-xs text-black/40 font-semibold">
            <div className="h-px w-12 bg-black/[0.10]" />
            <ArrowRight className="w-3.5 h-3.5 rotate-90" />
            <div className="h-px w-12 bg-black/[0.10]" />
          </div>
        </div>
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#22a55d] mb-1">{res.baNewTag}</div>
          <div className="font-extrabold text-base text-[#131A20] mb-4">
            {r.dynamic_contract ? res.baNewDynamic : res.baNewFixed}
          </div>
          {rightRows.map((row, i) => <MetricRow key={i} {...row} />)}
        </div>
      </div>

      {/* ── Desktop: shared 3-column CSS grid — rows auto-align in height ── */}
      <div className="hidden sm:grid sm:grid-cols-[1fr_36px_1fr]">

        {/* Header row */}
        <div className="bg-slate-50 border border-slate-200 border-r-0 rounded-tl-2xl p-6">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600 mb-1">{res.baCurrentTag}</div>
          <div className="font-extrabold text-base text-slate-800 mb-1">
            {r.dynamic_contract ? res.baCurrentDynamic : res.baCurrentFixed}
          </div>
          {!r.dynamic_contract && (
            <p className="text-xs text-[#22a55d] font-medium leading-snug">{res.baCurrentDynamicHint}</p>
          )}
        </div>
        <div className="bg-white border-y border-slate-200 flex items-center justify-center z-10">
          <div className="w-8 h-8 rounded-full bg-white border border-black/[0.10] shadow-sm flex items-center justify-center">
            <ArrowRight className="w-3.5 h-3.5 text-black/40" />
          </div>
        </div>
        <div className="bg-emerald-50/70 border border-emerald-200 border-l-0 rounded-tr-2xl p-6">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#22a55d] mb-1">{res.baNewTag}</div>
          <div className="font-extrabold text-base text-[#131A20]">
            {r.dynamic_contract ? res.baNewDynamic : res.baNewFixed}
          </div>
        </div>

        {/* Data rows — each triplet shares one CSS grid row → heights always match */}
        {leftRows.map((lRow, i) => {
          const rRow    = rightRows[i]
          const isLast  = i === leftRows.length - 1
          return (
            <React.Fragment key={i}>
              <div className={`bg-slate-50 border-l border-b border-slate-200 px-6 py-3.5 flex items-start justify-between gap-3${isLast ? ' rounded-bl-2xl' : ''}`}>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-black/75 leading-tight">{lRow.label}</div>
                  {lRow.sub && <div className="text-xs text-black/55 mt-0.5">{lRow.sub}</div>}
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-base font-extrabold text-black/90 leading-tight">{lRow.main}</div>
                </div>
              </div>
              <div className={`bg-white border-b border-slate-200`} />
              <div className={`bg-emerald-50/70 border-r border-b border-emerald-200 px-6 py-3.5 flex items-start justify-between gap-3${isLast ? ' rounded-br-2xl' : ''}`}>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-black/75 leading-tight">{rRow.label}</div>
                  {rRow.sub && <div className="text-xs text-black/55 mt-0.5">{rRow.sub}</div>}
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-base font-extrabold text-black/90 leading-tight">{rRow.main}</div>
                  {rRow.delta != null && (
                    <div className={`text-xs font-bold mt-0.5 ${rRow.deltaGreen ? 'text-[#22a55d]' : 'text-rose-500'}`}>{rRow.delta}</div>
                  )}
                </div>
              </div>
            </React.Fragment>
          )
        })}
      </div>
    </Reveal>
  )
}

export default function ResultsPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const res = t.results
  const [results, setResults] = useState(null)
  const [input, setInput] = useState(null)
  const [pdfLoading, setPdfLoading] = useState(false)

  useEffect(() => {
    const r = sessionStorage.getItem('voltrax_results')
    const i = sessionStorage.getItem('voltrax_input')
    if (r) setResults(JSON.parse(r))
    if (i) {
      setInput(JSON.parse(i))
    } else if (import.meta.env.DEV && new URLSearchParams(window.location.search).get('preview') === '1') {
      const devR = {"smart_daily_low":0.9,"smart_daily_high":1.42,"smart_annual_low":329,"smart_annual_high":520,"bill_savings_annual":420,"bill_savings_monthly":35,"total_annual_low":1099,"total_annual_high":1352,"total_daily_low":3.01,"total_daily_high":3.7,"payback_low":5.9,"payback_high":7.3,"zelfverbruik_voor":71.9,"zelfverbruik_na":90.4,"netonafhankelijkheid":39.5,"teruglevering_voor":28.1,"teruglevering_na":8.0,"bat_shift_kwh":592,"saved_terugleverkosten":286,"lost_terugleververgoeding":0,"grid_import_without":1500,"grid_cost_without":420,"export_revenue_without":45,"net_annual_cost_without":775,"grid_cost_with":254,"export_kwh_with":256,"sc_direct_kwh":2300,"sc_battery_kwh":592,"sc_pct_zonder":71.9,"sc_pct_met":90.4,"grid_import_with":908,"grid_import_besparing_kwh":592,"grid_import_besparing_eur":166,"export_kwh_zonder":900,"export_shift_kwh":592,"export_revenue_loss_eur":32,"battery_arbitrage_eur":0,"net_energy_saving_eur":420,"pE_used":0.28,"pT_used":0.05,"pv_input":3200,"v_input":3800,"t_input":900,"batterySelfConsumption":592,"totalSelfConsumption":2892,"ems_solar_cycles":97,"ems_total_cycles":417,"ems_cycli":320,"spread_low":0.12,"spread_high":0.19,"dynamic_contract":false,"garantie_bonus":0,"escalation_eur_low":240,"escalation_eur_high":301,"sald_protection_eur":111,"ems_physics_low":329,"ems_physics_high":520,"battery_charge_kwh":644,"shift_pct":72,"net_voor_pct":39.5,"net_na_pct":23.9}
      const devI = {"battery_kWh":9.3,"battery_price":8000,"terugleverkosten_value":400,"terugleverkosten_unit":"jaar"}
      setResults(devR); setInput(devI)
    } else {
      navigate('/calculator', { state: { step: 6 } })
    }
  }, [navigate])

  if (!results) return (
    <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center font-['Plus_Jakarta_Sans']">
      <div className="text-black/50 text-sm animate-pulse">{res.loading}</div>
    </div>
  )

  const battery_price = input?.battery_price || 9000
  const battery_kWh   = input?.battery_kWh   || 18.6
  const isDynamic     = results?.dynamic_contract || false
  const perMaandLow   = Math.round(results.total_annual_low  / 12)
  const perMaandHigh  = Math.round(results.total_annual_high / 12)
  const winst10_low   = Math.max(0, Math.round(results.total_annual_low  * 10 * 0.86 - battery_price))
  const winst10_high  = Math.max(0, Math.round(results.total_annual_high * 10 * 0.92 - battery_price))
  const tk            = input?.terugleverkosten_value || 0
  const tkUnit        = input?.terugleverkosten_unit  || 'jaar'
  const tkJaar        = tkUnit === 'kWh' ? tk * (results.export_kwh_zonder || 0) : tk

  async function handleDownloadPDF() {
    setPdfLoading(true)
    try {
      const blob = await pdf(<PDFReport results={results} input={input} />).toBlob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `VOLTRAX-Energierapport-${new Date().toISOString().slice(0, 10)}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setPdfLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#131A20] font-['Plus_Jakarta_Sans']">

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 py-3.5 bg-white/95 backdrop-blur-sm border-b border-black/[0.08] flex items-center justify-between sticky top-0 z-40">
        <button onClick={() => navigate('/calculator', { state: { step: 6 } })}
          className="flex items-center gap-1.5 text-sm text-black/55 hover:text-black/80 transition-colors font-semibold">
          <ChevronLeft className="w-4 h-4" /> {res.adjust}
        </button>
        <button onClick={() => navigate('/')} className="text-sm font-extrabold tracking-tight">
          VOLT<span className="text-[#22a55d]">RAX</span>
        </button>
        <button
          onClick={handleDownloadPDF}
          disabled={pdfLoading}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#22a55d] text-white hover:bg-[#1a9050] transition-colors disabled:opacity-60 disabled:cursor-wait"
        >
          <Download className="w-3 h-3" />
          {pdfLoading ? res.loadingPdf : res.downloadPdf}
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-5 pb-20 space-y-3">

        {/* ── BLOK 1: HERO ────────────────────────────────────────────────── */}
        <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible"
          className="bg-[#EEF6F1] rounded-2xl overflow-hidden relative border border-[#22a55d]/20">

          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#22a55d]/[0.08] pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#22a55d]/[0.05] pointer-events-none" />

          <div className="relative p-6 sm:p-8 lg:p-10">
            {/* badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#22a55d]/15 rounded-full px-3 py-1 text-xs font-semibold text-[#22a55d] mb-5">
              <Leaf className="w-3 h-3 text-[#22a55d]" /> {res.personalReport}
            </div>

            {/* label */}
            <div className="text-[#131A20]/70 text-xs font-bold uppercase tracking-[0.22em] mb-2">
              {res.annualBenefitLabel}
            </div>

            {/* BIG NUMBER */}
            <div className="flex flex-wrap items-end gap-x-3 mb-2">
              <span className="text-[3.2rem] sm:text-[4rem] font-extrabold leading-none tracking-tight text-[#22a55d]">
                <AnimatedNumber to={results.total_annual_low} prefix="€" />
              </span>
              <span className="text-2xl font-light text-[#131A20]/35 mb-2">–</span>
              <span className="text-[3.2rem] sm:text-[4rem] font-extrabold leading-none tracking-tight text-[#22a55d]">
                <AnimatedNumber to={results.total_annual_high} prefix="€" />
              </span>
            </div>

            <p className="text-[#131A20]/70 text-sm font-medium mb-5">{res.perYear}</p>

            {/* Payback */}
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-2 bg-[#22a55d]/15 rounded-xl px-4 py-2.5">
                <Clock className="w-4 h-4 text-[#22a55d] flex-shrink-0" />
                <div>
                  <div className="text-[11px] text-[#22a55d] font-bold uppercase tracking-[0.14em]">
                    {res.payback}
                  </div>
                  <div className="text-[#131A20] font-extrabold text-lg leading-tight">
                    <AnimatedNumber to={results.payback_low} decimals={1} />
                    {' – '}
                    <AnimatedNumber to={results.payback_high} decimals={1} suffix={` ${res.year}`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-5 h-px bg-[#22a55d]/[0.15]" />

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="bg-white/80 rounded-xl p-3 sm:p-4">
                <div className="text-[#131A20]/60 text-xs font-medium mb-1">{res.perMonth}</div>
                <div className="font-extrabold text-sm sm:text-base text-[#131A20] leading-tight">
                  € <AnimatedNumber to={perMaandLow} /> – <AnimatedNumber to={perMaandHigh} />
                </div>
              </div>
              <div className="bg-white/80 rounded-xl p-3 sm:p-4">
                <div className="text-[#131A20]/60 text-xs font-medium mb-1">{res.perDayLabel}</div>
                <div className="font-extrabold text-sm sm:text-base text-[#131A20] leading-tight">
                  € <AnimatedNumber to={results.total_daily_low} decimals={2} /> – <AnimatedNumber to={results.total_daily_high} decimals={2} />
                </div>
              </div>
              <div className="bg-white/80 rounded-xl p-3 sm:p-4">
                <div className="text-[#131A20]/60 text-xs font-medium mb-1">{res.investment}</div>
                <div className="font-extrabold text-sm sm:text-base text-[#131A20] leading-tight">
                  € <AnimatedNumber to={battery_price} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── VOOR / NA VERGELIJKING ─────────────────────────────────────── */}
        <BeforeAfter r={results} res={res} input={input} />

        {/* ── BLOK 2: WAARDEOPBOUW ────────────────────────────────────────── */}
        <Reveal className="bg-white rounded-2xl border border-black/[0.08] shadow-[0_2px_20px_rgba(0,0,0,0.05)] p-5 sm:p-6" delay={1}>

          <div className="text-sm font-bold uppercase tracking-[0.18em] text-black/65 mb-5">
            {res.valueBreakdownTitle}
          </div>

          <div className="space-y-2.5 mb-5">
            {res.valueBreakdownBullets.map((label, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#22a55d] flex-shrink-0" />
                <span className="text-base text-black/80 font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 px-5 py-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#22a55d]/75">{res.totalBenefitLabel}</div>
              <div className="text-sm text-black/55 mt-0.5 font-medium">{res.perYear}</div>
            </div>
            <div className="text-2xl font-extrabold text-[#22a55d] text-right">
              € {fmt(results.total_annual_low)} – {fmt(results.total_annual_high)}
            </div>
          </div>

          {/* Collapsible full calculation — 4-stappen hybride model */}
          <InlineDetail label={res.openDetails}>
            <DetailRow
              step="1"
              label={res.step1Basis}
              sub={res.step1BasisSub}
              value={`+ € ${fmt(results.net_energy_saving_eur)}`}
              green
            />
            <DetailRow
              step="2"
              label={res.step2Epex}
              sub={res.step2EpexSub}
              value={`+ € ${fmt(results.ems_physics_low)} – € ${fmt(results.ems_physics_high)}`}
              green
            />
            <DetailRow
              step="3"
              label={res.step3Uplift}
              sub={res.step3UpliftSub}
              value={`+ € ${fmt(results.escalation_eur_low)} – € ${fmt(results.escalation_eur_high)}`}
              green
            />
            <DetailRow
              step="4"
              label={res.step4Bonus}
              sub={res.step4BonusSub}
              value={`+ € ${fmt(results.sald_protection_eur)}`}
              green
            />
            <p className="text-xs text-black/45 leading-relaxed mt-3">{res.calcDisclaimer}</p>
          </InlineDetail>
        </Reveal>

        {/* ── BLOK 3: SLIMME OPTIMALISATIE (collapsible) ──────────────────── */}
        <Reveal delay={1.6}>
          <CollapseCard
            trigger={
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#22a55d]/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-[#22a55d]" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-base text-black/85">{res.smartTitle}</div>
                  <div className="text-sm text-black/55 mt-0.5">{res.smartSubTrigger}</div>
                </div>
              </div>
            }
          >
            <div className="pt-4 space-y-4">
              <p className="text-sm text-black/65 leading-relaxed">{res.smartP1}</p>
              <div className="space-y-2.5">
                {[res.smartBullet1, res.smartBullet2, res.smartBullet3].map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#22a55d] flex-shrink-0" />
                    <span className="text-sm text-black/70">{b}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-3.5 mt-2">
                <span className="text-sm font-semibold text-black/70">{res.smartRangeLbl}</span>
                <span className="text-lg font-extrabold text-[#22a55d]">
                  € {fmt(results.smart_annual_low)} – € {fmt(results.smart_annual_high)}/jr
                </span>
              </div>
            </div>
          </CollapseCard>
        </Reveal>

        {/* ── BLOK 4: GEMISTE WAARDE (vereenvoudigd) ──────────────────────── */}
        <Reveal delay={2.2}>
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
            <TrendingDown className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <p className="text-sm font-medium text-black/75">
              {res.waitingBanner(perMaandLow, perMaandHigh)}
            </p>
          </div>
        </Reveal>

        {/* ── BLOK 5: NETTO RESULTAAT + WARMTEFONDS ───────────────────────── */}
        <Reveal delay={2.8} className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          {/* Netto na 10 jaar */}
          <div className="bg-white rounded-2xl border border-black/[0.08] shadow-[0_2px_20px_rgba(0,0,0,0.05)] p-5 sm:p-6 flex flex-col">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-black/50 mb-4">
              {res.netResultTitle}
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-3xl font-extrabold text-[#22a55d] mb-1">
                + € {fmt(winst10_low)} – {fmt(winst10_high)}
              </div>
              <div className="text-sm text-black/60 leading-relaxed">
                {res.netResultSub(fmt(battery_price))}
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-black/[0.07] space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-black/60">{res.investment}</span>
                <span className="font-bold text-black/80">€ {fmt(battery_price)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-black/60">{res.paybackPeriod}</span>
                <span className="font-bold text-black/80">{fmt(results.payback_low, 1)} – {fmt(results.payback_high, 1)} {res.year}</span>
              </div>
            </div>
          </div>

          {/* Warmtefonds */}
          <div className="bg-white rounded-2xl border border-black/[0.08] shadow-[0_2px_20px_rgba(0,0,0,0.05)] p-5 sm:p-6 flex flex-col">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <Coins className="w-5 h-5 text-[#22a55d]" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#22a55d]/70 mb-0.5">{res.warmtefondsLabel}</div>
                <div className="font-extrabold text-base text-black/85 leading-tight">{res.warmtefondsTitle}</div>
              </div>
            </div>
            <p className="text-sm text-black/60 leading-relaxed mb-4 flex-1">
              {res.warmtefondsDesc.split('0% rente').map((part, i, arr) => (
                i < arr.length - 1
                  ? <React.Fragment key={i}>{part}<strong className="text-black/80">0% rente</strong></React.Fragment>
                  : <React.Fragment key={i}>{part}</React.Fragment>
              ))}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {res.warmteTags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1 text-xs font-semibold text-[#22a55d]">
                  <CheckCircle2 className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <Reveal className="bg-[#EEF6F1] rounded-2xl p-8 sm:p-10 text-center border border-[#22a55d]/20" delay={3.4}>
          <div className="w-10 h-10 rounded-xl bg-[#22a55d]/15 flex items-center justify-center mx-auto mb-5">
            <Battery className="w-5 h-5 text-[#22a55d]" />
          </div>
          <h3 className="font-extrabold text-xl text-[#131A20] mb-2">{res.ctaTitle}</h3>
          <p className="text-[#131A20]/65 text-base mb-6 max-w-xs mx-auto leading-relaxed">
            {res.ctaDesc}
          </p>
          <a href="mailto:info@voltrax.nl?subject=Adviesaanvraag%20thuisbatterij"
            className="inline-flex items-center gap-2 bg-[#22a55d] hover:bg-[#1a9050] text-white font-bold text-sm px-8 py-3.5 rounded-full hover:shadow-lg hover:shadow-green-500/25 transition-all">
            {res.ctaBtn} <ArrowRight className="w-4 h-4" />
          </a>
        </Reveal>

        {/* Disclaimer */}
        <div className="text-center space-y-2.5 pt-1 pb-3">
          <p className="text-xs text-black/40 leading-relaxed px-4">{res.disclaimer}</p>
          <button onClick={() => navigate('/calculator', { state: { step: 6 } })}
            className="text-sm text-black/45 hover:text-black/65 transition-colors underline underline-offset-4">
            {res.recalculate}
          </button>
        </div>

      </div>
    </div>
  )
}
