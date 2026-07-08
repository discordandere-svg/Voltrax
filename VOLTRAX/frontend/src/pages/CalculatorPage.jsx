import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Sun, Zap, ArrowUpDown, Euro, Battery, ChevronLeft,
  ChevronRight, Info, Check, Shield
} from 'lucide-react'
import axios from 'axios'
import { useLanguage } from '../context/LanguageContext'

const STEP_ICONS = [
  <Sun className="w-4 h-4" />,
  <Zap className="w-4 h-4" />,
  <ArrowUpDown className="w-4 h-4" />,
  <Euro className="w-4 h-4" />,
  <Battery className="w-4 h-4" />,
  <Euro className="w-4 h-4" />,
]

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit: (dir) => ({ x: dir > 0 ? -48 : 48, opacity: 0, transition: { duration: 0.22 } }),
}

function Tooltip({ text }) {
  const [show, setShow] = useState(false)
  return (
    <span className="relative inline-block ml-1.5 align-middle">
      <Info
        className="w-3.5 h-3.5 text-gray-300 cursor-help"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      />
      {show && (
        <span className="absolute bottom-6 left-0 w-56 bg-[#131A20] text-xs text-white/80 p-3 rounded-2xl z-50 shadow-2xl leading-relaxed">
          {text}
        </span>
      )}
    </span>
  )
}

function NumericInput({ label, value, onChange, unit, tooltip, placeholder, autoFocus }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-[#131A20] mb-2">
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </label>
      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full bg-[#F9F7F4] border border-gray-200 rounded-2xl px-5 py-3.5 text-[#131A20] text-lg font-bold placeholder-gray-300 focus:outline-none focus:border-[#131A20] focus:ring-2 focus:ring-gray-100 transition-all pr-20"
        />
        {unit && (
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">{unit}</span>
        )}
      </div>
    </div>
  )
}

function UnitToggle({ value, options, onChange }) {
  return (
    <div className="inline-flex bg-gray-100 rounded-full p-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
            value === opt.value
              ? 'bg-white text-[#131A20] shadow-sm'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function HintCard({ children }) {
  return (
    <div className="bg-[#F9F7F4] rounded-2xl p-4 text-sm text-gray-500 flex gap-3">
      <Info className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
      <p className="leading-relaxed">{children}</p>
    </div>
  )
}

function StepShell({ title, subtitle, children, icon }) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute -top-4 right-0 pointer-events-none select-none opacity-[0.06] text-[#22a55d]" aria-hidden>
          <div className="w-28 h-28">{icon}</div>
        </div>
      )}
      <h2 className="text-2xl font-extrabold text-[#131A20] mb-1.5">{title}</h2>
      <p className="text-gray-400 mb-7 text-sm leading-relaxed">{subtitle}</p>
      {children}
    </div>
  )
}

const parseNum = (v) => {
  const n = parseFloat(String(v).replace(',', '.'))
  return isNaN(n) ? null : n
}

export default function CalculatorPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t, lang } = useLanguage()
  const c = t.calc

  const [step, setStep] = useState(location.state?.step ?? 1)
  const [dir, setDir] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const savedForm = sessionStorage.getItem('voltrax_form')
  const [formData, setFormData] = useState(savedForm ? JSON.parse(savedForm) : {
    zonneproductie: '',
    jaarverbruik: '',
    teruglevering: '',
    prijsInkoop: '',
    prijsTeruglevering: '',
    terugleververgoeding_value: '',
    terugleververgoeding_unit: 'kWh',
    terugleverkosten_value: '',
    terugleverkosten_unit: 'jaar',
    battery_kWh: 15.9,
    battery_price: '',
    dynamic_contract: false,
  })

  const update = (key, val) => setFormData((prev) => {
    const next = { ...prev, [key]: val }
    sessionStorage.setItem('voltrax_form', JSON.stringify(next))
    return next
  })

  const canNext = useCallback(() => {
    if (step === 1) return parseNum(formData.zonneproductie) > 0
    if (step === 2) return parseNum(formData.jaarverbruik) > 0
    if (step === 3) {
      const tv = parseNum(formData.teruglevering)
      return tv !== null && tv >= 0
    }
    if (step === 4) {
      const inkoop = parseNum(formData.prijsInkoop)
      const terug = parseNum(formData.prijsTeruglevering)
      return (inkoop === null || inkoop > 0) && (terug === null || terug >= 0)
    }
    if (step === 5) return formData.battery_kWh > 0
    if (step === 6) return parseNum(formData.battery_price) > 0
    return true
  }, [step, formData])

  const goNext = useCallback(() => {
    if (!canNext()) return
    setDir(1)
    setStep((s) => Math.min(s + 1, 6))
  }, [canNext])

  const goPrev = () => { setDir(-1); setStep((s) => Math.max(s - 1, 1)) }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Enter' && step < 6 && canNext()) goNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [step, canNext, goNext])

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const payload = {
        zonneproductie: parseNum(formData.zonneproductie) || 0,
        jaarverbruik: parseNum(formData.jaarverbruik) || 0,
        teruglevering: parseNum(formData.teruglevering) || 0,
        prijsInkoop: parseNum(formData.prijsInkoop) || 0.28,
        prijsTeruglevering: parseNum(formData.prijsTeruglevering) ?? 0.07,
        terugleververgoeding_value: parseNum(formData.terugleververgoeding_value) || 0,
        terugleververgoeding_unit: formData.terugleververgoeding_unit,
        terugleverkosten_value: parseNum(formData.terugleverkosten_value) || 0,
        terugleverkosten_unit: formData.terugleverkosten_unit,
        battery_kWh: formData.battery_kWh,
        battery_price: parseNum(formData.battery_price) || 0,
        dynamic_contract: formData.dynamic_contract,
      }
      const res = await axios.post('/api/calculate', payload)
      sessionStorage.setItem('voltrax_results', JSON.stringify(res.data))
      sessionStorage.setItem('voltrax_input', JSON.stringify(payload))
      navigate('/results')
    } catch {
      setError(c.error)
    } finally {
      setLoading(false)
    }
  }

  const progress = ((step - 1) / 5) * 100
  const STEPS = c.steps.map((title, i) => ({ id: i + 1, title, icon: STEP_ICONS[i] }))

  return (
    <div className="min-h-screen bg-white text-[#131A20] font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-40">
        <button
          onClick={() => step > 1 ? goPrev() : navigate('/')}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#131A20] transition-colors font-medium"
        >
          <ChevronLeft className="w-4 h-4" /> {step > 1 ? c.prev : c.back}
        </button>
        <button onClick={() => navigate('/')} className="text-base font-extrabold text-[#131A20]">
          SOLAR<span style={{ color: '#22a55d' }}>FAST</span>
        </button>
        <span className="text-sm text-gray-400 font-medium">{c.stepOf(step, 6)}</span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-100 relative">
        <motion.div
          className="h-full bg-[#22a55d] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Step tabs */}
      <div className="px-6 pt-4 pb-0 border-b border-gray-100">
        <div className="max-w-2xl mx-auto flex gap-1 overflow-x-auto">
          {STEPS.map((s) => (
            <div
              key={s.id}
              className={`flex items-center gap-1.5 text-xs whitespace-nowrap px-3 py-2.5 rounded-t-xl transition-all ${
                s.id === step
                  ? 'bg-white border border-b-white border-gray-100 text-[#131A20] font-bold -mb-px'
                  : s.id < step
                  ? 'text-green-600 font-medium'
                  : 'text-gray-300'
              }`}
            >
              {s.id < step ? <Check className="w-3 h-3 text-green-500" /> : s.icon}
              <span className="hidden sm:inline">{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-10 flex justify-center">
        <div className="max-w-2xl w-full">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {step === 1 && (
                <StepShell title={c.step1Title} subtitle={c.step1Sub} icon={<Sun className="w-full h-full" />}>
                  <NumericInput
                    label={c.step1Label}
                    value={formData.zonneproductie}
                    onChange={(v) => update('zonneproductie', v)}
                    unit="kWh/jaar"
                    placeholder="bijv. 4500"
                    tooltip={c.step1Tooltip}
                    autoFocus
                  />
                  <HintCard>{c.step1Hint}</HintCard>
                </StepShell>
              )}

              {step === 2 && (
                <StepShell title={c.step2Title} subtitle={c.step2Sub} icon={<Zap className="w-full h-full" />}>
                  <NumericInput
                    label={c.step2Label}
                    value={formData.jaarverbruik}
                    onChange={(v) => update('jaarverbruik', v)}
                    unit="kWh/jaar"
                    placeholder="bijv. 3800"
                    tooltip={c.step2Tooltip}
                    autoFocus
                  />
                  <HintCard>{c.step2Hint}</HintCard>
                </StepShell>
              )}

              {step === 3 && (
                <StepShell title={c.step3Title} subtitle={c.step3Sub} icon={<ArrowUpDown className="w-full h-full" />}>
                  <NumericInput
                    label={c.step3Label}
                    value={formData.teruglevering}
                    onChange={(v) => update('teruglevering', v)}
                    unit="kWh/jaar"
                    placeholder="bijv. 2500"
                    tooltip={c.step3Tooltip}
                    autoFocus
                  />
                  {(() => {
                    const tv = parseNum(formData.teruglevering)
                    const pv = parseNum(formData.zonneproductie)
                    const vb = parseNum(formData.jaarverbruik)
                    const floor = (pv !== null && vb !== null) ? pv - vb : null
                    if (tv !== null && pv !== null && pv > 0 && tv >= pv * 0.95) {
                      return (
                        <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
                          <span className="mt-0.5 text-base leading-none">⚠️</span>
                          <span>
                            {lang === 'nl'
                              ? `Uw teruglevering (${Math.round(tv).toLocaleString('nl-NL')} kWh) is bijna gelijk aan uw productie (${Math.round(pv).toLocaleString('nl-NL')} kWh). Klopt dit? Teruglevering is alleen het deel dat u terugstuurt naar het net — niet uw totale zonneopbrengst.`
                              : `Your grid export (${Math.round(tv).toLocaleString('nl-NL')} kWh) is nearly equal to your production (${Math.round(pv).toLocaleString('nl-NL')} kWh). Is this correct? Grid export is only the portion sent back to the grid — not your total solar yield.`
                            }
                          </span>
                        </div>
                      )
                    }
                    if (tv !== null && floor !== null && floor > 0 && tv < floor) {
                      return (
                        <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
                          <span className="mt-0.5 text-base leading-none">⚠️</span>
                          <span>
                            {lang === 'nl'
                              ? `Met een productie van ${Math.round(pv).toLocaleString('nl-NL')} kWh en een jaarverbruik van ${Math.round(vb).toLocaleString('nl-NL')} kWh is de teruglevering altijd minstens ${Math.round(floor).toLocaleString('nl-NL')} kWh — minder kan fysiek niet. Controleer of u uw tótale jaarverbruik heeft ingevuld en niet alleen de netafname van uw jaarrekening.`
                              : `With a production of ${Math.round(pv).toLocaleString('nl-NL')} kWh and annual consumption of ${Math.round(vb).toLocaleString('nl-NL')} kWh, grid export is always at least ${Math.round(floor).toLocaleString('nl-NL')} kWh — anything lower is physically impossible. Check whether you entered your total annual consumption, not only the grid offtake from your annual statement.`
                            }
                          </span>
                        </div>
                      )
                    }
                    return null
                  })()}
                  <HintCard>{c.step3Hint}</HintCard>
                </StepShell>
              )}

              {step === 4 && (
                <StepShell title={c.step4Title} subtitle={c.step4Sub} icon={<Euro className="w-full h-full" />}>
                  {/* Dynamic contract toggle */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-[#131A20] mb-3">
                      {c.step4LabelDynamic}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: c.step4DynamicNo, value: false },
                        { label: c.step4DynamicYes, value: true },
                      ].map((opt) => (
                        <button
                          key={String(opt.value)}
                          onClick={() => update('dynamic_contract', opt.value)}
                          className={`p-4 rounded-2xl border-2 text-sm font-semibold text-left transition-all ${
                            formData.dynamic_contract === opt.value
                              ? 'border-[#22a55d] bg-[#f0fdf4] text-[#131A20]'
                              : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    {formData.dynamic_contract && (
                      <p className="mt-2 text-xs text-[#22a55d] font-medium leading-relaxed">
                        {c.step4DynamicHint}
                      </p>
                    )}
                  </div>

                  <NumericInput
                    label={c.step4LabelInkoop}
                    value={formData.prijsInkoop}
                    onChange={(v) => update('prijsInkoop', v)}
                    unit="euro/kWh"
                    placeholder="bijv. 0,28"
                    tooltip={c.step4TooltipInkoop}
                    autoFocus
                  />
                  <NumericInput
                    label={c.step4LabelTerug}
                    value={formData.prijsTeruglevering}
                    onChange={(v) => update('prijsTeruglevering', v)}
                    unit="euro/kWh"
                    placeholder="bijv. 0,07"
                    tooltip={c.step4TooltipTerug}
                  />

                  {/* Terugleververgoeding */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-[#131A20]">
                        {c.step4LabelVergoeding}
                        <Tooltip text={c.step4TooltipVergoeding} />
                      </label>
                      <UnitToggle
                        value={formData.terugleververgoeding_unit}
                        options={[
                          { label: c.perKwh, value: 'kWh' },
                          { label: c.perJaar, value: 'jaar' },
                        ]}
                        onChange={(v) => update('terugleververgoeding_unit', v)}
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="text" inputMode="decimal"
                        value={formData.terugleververgoeding_value}
                        onChange={(e) => update('terugleververgoeding_value', e.target.value)}
                        placeholder="0"
                        className="w-full bg-[#F9F7F4] border border-gray-200 rounded-2xl px-5 py-3.5 text-[#131A20] text-lg font-bold placeholder-gray-300 focus:outline-none focus:border-[#131A20] focus:ring-2 focus:ring-gray-100 transition-all pr-28"
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                        euro/{formData.terugleververgoeding_unit}
                      </span>
                    </div>
                  </div>

                  {/* Terugleverkosten */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-[#131A20]">
                        {c.step4LabelKosten}
                        <Tooltip text={c.step4TooltipKosten} />
                      </label>
                      <UnitToggle
                        value={formData.terugleverkosten_unit}
                        options={[
                          { label: c.perKwh, value: 'kWh' },
                          { label: c.perJaar, value: 'jaar' },
                        ]}
                        onChange={(v) => update('terugleverkosten_unit', v)}
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="text" inputMode="decimal"
                        value={formData.terugleverkosten_value}
                        onChange={(e) => update('terugleverkosten_value', e.target.value)}
                        placeholder="0"
                        className="w-full bg-[#F9F7F4] border border-gray-200 rounded-2xl px-5 py-3.5 text-[#131A20] text-lg font-bold placeholder-gray-300 focus:outline-none focus:border-[#131A20] focus:ring-2 focus:ring-gray-100 transition-all pr-28"
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                        euro/{formData.terugleverkosten_unit}
                      </span>
                    </div>
                  </div>
                </StepShell>
              )}

              {step === 5 && (() => {
                const tv = parseNum(formData.teruglevering) || 0
                const recommendedKwh =
                  tv > 5000 ? 26.5 :
                  tv > 3500 ? 21.2 :
                  tv > 2000 ? 15.9 : 10.6
                const hasRecommendation = recommendedKwh > 10.6
                const recOpt = c.batteries.find(b => b.kWh === recommendedKwh)
                const recLabel = recOpt ? recOpt.label : `${recommendedKwh} kWh`
                const tooSmall = hasRecommendation && formData.battery_kWh < recommendedKwh
                return (
                  <StepShell title={c.step5Title} subtitle={c.step5Sub} icon={<Battery className="w-full h-full" />}>
                    <div className="space-y-2.5">
                      {c.batteries.map((opt) => {
                        const isRecommended = hasRecommendation && opt.kWh === recommendedKwh
                        return (
                          <button
                            key={opt.kWh}
                            onClick={() => update('battery_kWh', opt.kWh)}
                            className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                              formData.battery_kWh === opt.kWh
                                ? 'border-[#22a55d] bg-[#f0fdf4]'
                                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-extrabold text-lg text-[#131A20]">{opt.label}</span>
                                  {isRecommended && (
                                    <span className="text-[10px] font-bold uppercase tracking-wide bg-[#22a55d] text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                                      {c.recommended}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                              </div>
                              {formData.battery_kWh === opt.kWh && (
                                <div className="w-6 h-6 rounded-full bg-[#22a55d] flex items-center justify-center flex-shrink-0">
                                  <Check className="w-3.5 h-3.5 text-white" />
                                </div>
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                    {tooSmall && (
                      <div className="mt-3 flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                        <span className="text-amber-500 text-base leading-none mt-0.5">⚡</span>
                        <p className="text-xs text-amber-800 leading-relaxed">
                          {c.batteryUpgradeHint(Math.round(tv), recLabel)}
                        </p>
                      </div>
                    )}
                  </StepShell>
                )
              })()}

              {step === 6 && (
                <StepShell title={c.step6Title} subtitle={c.step6Sub} icon={<Euro className="w-full h-full" />}>
                  <NumericInput
                    label={c.step6Label}
                    value={formData.battery_price}
                    onChange={(v) => update('battery_price', v)}
                    unit="euro"
                    placeholder="bijv. 8500"
                    tooltip={c.step6Tooltip}
                    autoFocus
                  />
                  <div className="bg-[#F9F7F4] border border-gray-100 rounded-2xl p-5 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Shield className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-bold text-[#131A20] mb-1">{c.warmtefondsTitle}</p>
                        <p className="text-gray-400 leading-relaxed text-xs">{c.warmtefondsDesc}</p>
                      </div>
                    </div>
                  </div>
                  {error && (
                    <div className="mt-4 bg-red-50 border border-red-100 text-red-600 text-sm p-4 rounded-2xl">
                      {error}
                    </div>
                  )}
                </StepShell>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={goPrev}
                className="flex items-center gap-2 border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-[#131A20] px-5 py-3 rounded-full transition-all font-medium text-sm"
              >
                <ChevronLeft className="w-4 h-4" /> {c.prev}
              </button>
            )}
            {step < 6 ? (
              <button
                onClick={goNext}
                disabled={!canNext()}
                className={`flex items-center gap-2 font-semibold px-6 py-3 rounded-full transition-all ml-auto text-sm ${
                  canNext()
                    ? 'bg-[#22a55d] hover:bg-[#1a9050] text-white hover:shadow-lg hover:shadow-green-500/20'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
              >
                {c.next} <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canNext() || loading}
                className={`flex items-center gap-2 font-bold px-8 py-3 rounded-full transition-all ml-auto text-sm ${
                  canNext() && !loading
                    ? 'bg-[#22a55d] hover:bg-[#1a9050] text-white hover:shadow-lg hover:shadow-green-500/20'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                    {c.calculating}
                  </>
                ) : (
                  <>{c.viewReport} <ChevronRight className="w-4 h-4" /></>
                )}
              </button>
            )}
          </div>
          <p className="text-center text-xs text-gray-400 mt-5">
            {c.enterToContinue}
          </p>
        </div>
      </div>
    </div>
  )
}
