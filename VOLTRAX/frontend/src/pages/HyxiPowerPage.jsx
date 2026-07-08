import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, Battery, CheckCircle2, Shield, Zap, Globe,
  Award, Cpu, BarChart2, Wifi, Leaf, Star, ChevronRight, TrendingUp
} from 'lucide-react'
import Nav from '../components/Nav.jsx'
import { useLanguage } from '../context/LanguageContext'

const ease = [0.22, 1, 0.36, 1]
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease } }),
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px' })
  return (
    <motion.div ref={ref} variants={fadeUp} custom={delay}
      initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  )
}

export default function HYXiPowerPage() {
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const nl = lang === 'nl'

  const voordelen = [
    {
      icon: <Award className="w-5 h-5" />,
      title: nl ? 'Meterloos ontwerp' : 'Meterless design',
      desc: nl
        ? 'Geen aparte energiemeter nodig bij installatie. Eenvoudiger installatieproces, minder onderdelen die kunnen falen, lagere installatiekosten.'
        : 'No separate energy meter needed at installation. Simpler installation process, fewer parts that can fail, lower installation costs.',
    },
    {
      icon: <Cpu className="w-5 h-5" />,
      title: nl ? 'Universele compatibiliteit' : 'Universal compatibility',
      desc: nl
        ? 'Werkt samen met de meest gangbare omvormermerken zoals SolarEdge, Enphase, Huawei, SMA en Growatt. Geen dure omvormervervanging nodig.'
        : 'Works together with the most common inverter brands such as SolarEdge, Enphase, Huawei, SMA and Growatt. No expensive inverter replacement needed.',
    },
    {
      icon: <Battery className="w-5 h-5" />,
      title: nl ? 'LiFePO4-celtechnologie' : 'LiFePO4 cell technology',
      desc: nl
        ? 'Lithium-ijzerfosfaat (LiFePO4) A+ cellen zijn thermisch stabiel, brandveilig en bestand tegen diepe ontlading. Automotive-grade BMS bewaakt elke cel.'
        : 'Lithium iron phosphate (LiFePO4) A+ cells are thermally stable, fire-safe and resistant to deep discharge. Automotive-grade BMS monitors every cell.',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: nl ? 'IP67-gecertificeerd' : 'IP67 certified',
      desc: nl
        ? 'Geschikt voor installatie binnen én buiten. De robuuste behuizing doorstaat een C4-zoutneveltest en beschermt tegen stof en waterstralen.'
        : 'Suitable for indoor and outdoor installation. The robust housing passes a C4 salt spray test and protects against dust and water jets.',
    },
    {
      icon: <Wifi className="w-5 h-5" />,
      title: nl ? 'AI-gestuurd cloudmonitoring' : 'AI-driven cloud monitoring',
      desc: nl
        ? '24/7 realtime inzicht via de app op uw smartphone. Bekijk productie, verbruik en batterijstatus, en stuur laadpaal of warmtepomp direct aan.'
        : '24/7 real-time insight via the app on your smartphone. View production, consumption and battery status, and control your EV charger or heat pump directly.',
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: nl ? 'Millisecondesnelle noodstroom' : 'Millisecond backup power',
      desc: nl
        ? 'Bij een stroomstoring schakelt het systeem in milliseconden over op noodstroom. Uw huishouden merkt vrijwel niets van een storing op het net.'
        : 'In the event of a power outage, the system switches to backup power in milliseconds. Your household barely notices a grid disruption.',
    },
  ]

  const specs = [
    { label: nl ? 'Capaciteit' : 'Capacity', value: '10,6–26,5 kWh', sub: nl ? 'Modulair uitbreidbaar' : 'Modular expandable' },
    { label: nl ? 'Vermogen' : 'Power output', value: '6–15 kW', sub: nl ? 'Afhankelijk van configuratie' : 'Depending on configuration' },
    { label: nl ? 'Celtechnologie' : 'Cell technology', value: 'LiFePO4', sub: nl ? 'A+ grade cellen' : 'A+ grade cells' },
    { label: nl ? 'IP-klasse' : 'IP class', value: 'IP67', sub: nl ? 'Binnen & buiten' : 'Indoor & outdoor' },
    { label: nl ? 'Noodstroom' : 'Backup power', value: '< 1 ms', sub: nl ? 'Omschakeltijd' : 'Switchover time' },
    { label: nl ? 'AFCI-detectie' : 'AFCI detection', value: '0,5 sec', sub: nl ? 'Vlamboogbeveiliging' : 'Arc-fault protection' },
  ]

  const vergelijking = [
    { aspect: nl ? 'Technologie' : 'Technology', alpha: nl ? 'LiFePO4, brandveilig en thermisch stabiel' : 'LiFePO4, fire-safe and thermally stable', rest: nl ? 'NMC of oudere chemie' : 'NMC or older chemistry' },
    { aspect: nl ? 'Omvormercompatibiliteit' : 'Inverter compatibility', alpha: nl ? 'Universeel: SolarEdge, Enphase, Huawei, SMA, Growatt' : 'Universal: SolarEdge, Enphase, Huawei, SMA, Growatt', rest: nl ? 'Vaak gebonden aan eigen merk' : 'Often locked to own brand' },
    { aspect: nl ? 'Installatie' : 'Installation', alpha: nl ? 'Meterloos ontwerp, minder onderdelen' : 'Meterless design, fewer parts', rest: nl ? 'Aparte energiemeter vereist' : 'Separate energy meter required' },
    { aspect: nl ? 'Uitbreidbaarheid' : 'Expandability', alpha: nl ? 'Modulair All-in-One ESS, uitbreidbaar tot 26,5 kWh' : 'Modular All-in-One ESS, expandable up to 26.5 kWh', rest: nl ? 'Vaste capaciteit' : 'Fixed capacity' },
    { aspect: nl ? 'Veiligheid' : 'Safety', alpha: nl ? 'AFCI-detectie 0,5 sec, actieve drukontlasting' : 'AFCI detection 0.5 sec, active pressure relief', rest: nl ? 'Basisbeveiliging' : 'Basic protection' },
    { aspect: nl ? 'Behuizing' : 'Housing', alpha: 'IP67, C4-zoutneveltest', rest: nl ? 'Variabel per merk' : 'Varies by brand' },
    { aspect: nl ? 'App monitoring' : 'App monitoring', alpha: nl ? 'AI-gestuurd, 24/7 cloudmonitoring' : 'AI-driven, 24/7 cloud monitoring', rest: nl ? 'Vaak alleen basisweergave' : 'Often basic display only' },
    { aspect: nl ? 'Backup / noodstroom' : 'Backup / emergency power', alpha: nl ? 'Millisecondesnelle omschakeling' : 'Millisecond switchover', rest: nl ? 'Vertraagde of geen omschakeling' : 'Delayed or no switchover' },
  ]

  const certs = [
    { name: 'CE-markering', desc: nl ? 'Europese conformiteit' : 'European conformity' },
    { name: 'IP67', desc: nl ? 'Weerbestendig gecertificeerd' : 'Weather-resistant certified' },
    { name: 'AFCI', desc: nl ? 'Vlamboogdetectie 0,5 sec' : 'Arc-fault detection 0.5 sec' },
    { name: 'C4-zoutnevel', desc: nl ? 'Corrosiebestendigheid getest' : 'Corrosion resistance tested' },
    { name: 'LiFePO4', desc: nl ? 'Veilige celchemie' : 'Safe cell chemistry' },
    { name: 'BMS', desc: nl ? 'Automotive-grade bewaking' : 'Automotive-grade monitoring' },
  ]

  return (
    <div className="min-h-screen bg-white text-[#131A20] font-['Plus_Jakarta_Sans']">
      <Nav />

      {/* ── HERO ── */}
      <section className="pt-28 pb-0 bg-[#EEF6F1] overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#22a55d]/8" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#22a55d]/4" />
        </div>
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-0 relative">
          <div className="grid lg:grid-cols-2 gap-14 items-end">
            <div className="pb-16">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-[#22a55d]/15 text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full mb-7">
                <Award className="w-3.5 h-3.5" />
                {nl ? 'Europese kwaliteitsstandaard' : 'European quality standard'}
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}
                className="text-4xl lg:text-5xl font-extrabold leading-[1.08] tracking-tight mb-5 text-[#131A20]">
                {nl ? (
                  <>HYXiPower,<br /><span className="text-[#22a55d]">de standaard</span> in<br />thuisenergieopslag</>
                ) : (
                  <>HYXiPower,<br /><span className="text-[#22a55d]">the standard</span> in<br />home energy storage</>
                )}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.16 }}
                className="text-lg text-[#131A20]/60 leading-relaxed mb-8 max-w-md">
                {nl
                  ? 'Meterloos ontwerp, universele omvormercompatibiliteit en LiFePO4-veiligheid. Modulair uitbreidbaar van 10,6 tot 26,5 kWh, met noodstroom binnen milliseconden.'
                  : 'Meterless design, universal inverter compatibility and LiFePO4 safety. Modularly expandable from 10.6 to 26.5 kWh, with backup power within milliseconds.'}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.24 }}
                className="flex flex-wrap gap-3">
                <button onClick={() => navigate('/calculator')}
                  className="flex items-center gap-2 bg-[#22a55d] hover:bg-[#1a9050] text-white font-semibold px-7 py-3.5 rounded-full transition-all hover:shadow-xl hover:shadow-green-500/25 text-sm">
                  {nl ? 'Bereken mijn besparing' : 'Calculate my savings'} <ArrowRight className="w-4 h-4" />
                </button>
                <a href="mailto:info@solarfast.nl?subject=Informatie%20HYXiPower"
                  className="flex items-center gap-2 border border-gray-200 bg-white text-[#131A20]/60 hover:border-[#22a55d] hover:text-[#22a55d] font-medium px-7 py-3.5 rounded-full transition-all text-sm">
                  {nl ? 'Stel een vraag' : 'Ask a question'}
                </a>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.2, ease }}
              className="relative pb-0">
              <div className="rounded-t-3xl overflow-hidden aspect-[4/3] shadow-2xl shadow-black/30">
                <img src="/hyxipower-battery.png" alt="HYXiPower All-in-One ESS thuisbatterij" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="py-0 bg-[#EEF6F1] border-t border-[#22a55d]/10">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: '10,6–26,5 kWh', label: nl ? 'Modulaire capaciteit' : 'Modular capacity' },
              { val: 'IP67', label: nl ? 'Binnen & buiten' : 'Indoor & outdoor' },
              { val: '< 1 ms', label: nl ? 'Noodstroom omschakeling' : 'Backup switchover' },
              { val: '0,5 sec', label: nl ? 'AFCI-detectie' : 'AFCI detection' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl lg:text-3xl font-extrabold text-[#131A20] mb-1">{s.val}</div>
                <div className="text-xs text-[#131A20]/45 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALPHALINX TECHNOLOGIE ── */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-[#22a55d]/10 text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full mb-6">
                <Cpu className="w-3.5 h-3.5" /> {nl ? 'HYXiPower cloudmonitoring' : 'HYXiPower cloud monitoring'}
              </div>
              <h2 className="text-4xl font-extrabold leading-tight mb-5 tracking-tight">
                {nl ? (
                  <>Het slimste<br /><span className="text-[#22a55d]">energiebrein</span><br />in zijn klasse</>
                ) : (
                  <>The smartest<br /><span className="text-[#22a55d]">energy brain</span><br />in its class</>
                )}
              </h2>
              <p className="text-[#131A20]/55 leading-relaxed mb-6 text-lg">
                {nl
                  ? 'De AI-gestuurde cloudmonitoring van HYXiPower houdt uw systeem 24/7 in de gaten en optimaliseert wanneer uw batterij laadt en ontlaadt op basis van dynamische energieprijzen. Via de scenario-app stuurt u ook uw laadpaal of warmtepomp aan.'
                  : "HYXiPower's AI-driven cloud monitoring watches your system 24/7 and optimises when your battery charges and discharges based on dynamic energy prices. The scenario app also lets you control your EV charger or heat pump."}
              </p>
              <ul className="space-y-3.5 mb-8">
                {(nl ? [
                  'Optimalisatie op basis van dynamische energieprijzen',
                  'Scenario-app stuurt laadpaal en warmtepomp aan',
                  '24/7 realtime monitoring via de HYXiPower app',
                  'AFCI-vlamboogdetectie binnen 0,5 seconde',
                  'Millisecondesnelle omschakeling naar noodstroom',
                ] : [
                  'Optimisation based on dynamic energy prices',
                  'Scenario app controls EV charger and heat pump',
                  '24/7 real-time monitoring via the HYXiPower app',
                  'AFCI arc-fault detection within 0.5 seconds',
                  'Millisecond switchover to backup power',
                ]).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#131A20]/70">
                    <CheckCircle2 className="w-4 h-4 text-[#22a55d] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={1}>
              <div className="bg-white rounded-3xl p-8 space-y-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#22a55d]/10 flex items-center justify-center">
                    <BarChart2 className="w-5 h-5 text-[#22a55d]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#131A20]/40 font-semibold uppercase tracking-widest">Live dashboard</div>
                    <div className="text-sm font-bold text-[#131A20]">HYXiPower Cloud monitor</div>
                  </div>
                </div>
                {[
                  { label: nl ? 'Zonne-opwek' : 'Solar generation', pct: 78, color: '#22a55d' },
                  { label: nl ? 'Batterijstatus' : 'Battery status', pct: 91, color: '#3dcc7a' },
                  { label: nl ? 'Zelfvoorzieningsgraad' : 'Self-sufficiency', pct: 86, color: '#22a55d' },
                ].map((bar, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-[#131A20]/50 font-medium">{bar.label}</span>
                      <span className="text-[#131A20] font-bold">{bar.pct}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${bar.pct}%` }} viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.2, ease }}
                        className="h-full rounded-full" style={{ background: bar.color }} />
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-100">
                  <div className="text-xs text-[#131A20]/40 mb-3 font-medium">
                    {nl ? 'Marktoptimalisatie vandaag' : 'Market optimisation today'}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { time: '09:00', action: nl ? 'Laden' : 'Charging', price: '€ 0,04' },
                      { time: '14:00', action: nl ? 'PV opslaan' : 'PV store', price: '' },
                      { time: '18:00', action: nl ? 'Ontladen' : 'Discharging', price: '€ 0,38' },
                    ].map((ev, i) => (
                      <div key={i} className="bg-gray-50 rounded-2xl p-3 text-center">
                        <div className="text-[10px] text-[#131A20]/40 mb-1">{ev.time}</div>
                        <div className="text-xs font-bold text-[#131A20]">{ev.action}</div>
                        <div className="text-[10px] text-[#22a55d] mt-1 font-semibold">{ev.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── VOORDELEN GRID ── */}
      <section className="py-28 bg-[#F9F7F4]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white text-[#131A20]/50 text-xs font-semibold px-4 py-2 rounded-full mb-5 border border-gray-100">
              <Star className="w-3.5 h-3.5 text-[#22a55d]" />
              {nl ? 'Waarom HYXiPower' : 'Why HYXiPower'}
            </div>
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
              {nl ? 'Wat maakt HYXiPower anders?' : 'What makes HYXiPower different?'}
            </h2>
            <p className="text-[#131A20]/55 text-lg max-w-2xl mx-auto leading-relaxed">
              {nl
                ? 'HYXiPower bouwt al meer dan tien jaar thuisbatterijen. Dit zijn de kenmerken die u kunt controleren en vergelijken.'
                : 'HYXiPower has been building home batteries for over ten years. These are the features you can verify and compare.'}
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {voordelen.map((v, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-white rounded-3xl p-7 h-full hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 hover:-translate-y-1 border border-gray-50">
                  <div className="w-11 h-11 rounded-2xl bg-[#22a55d]/10 flex items-center justify-center text-[#22a55d] mb-5">
                    {v.icon}
                  </div>
                  <h3 className="font-bold text-base mb-2.5 text-[#131A20]">{v.title}</h3>
                  <p className="text-sm text-[#131A20]/55 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECS ── */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight mb-3">
              {nl ? 'Technische specificaties' : 'Technical specifications'}
            </h2>
            <p className="text-[#131A20]/45 text-base">
              {nl ? 'HYXiPower All-in-One ESS, de meest populaire reeks' : 'HYXiPower All-in-One ESS, the most popular series'}
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {specs.map((s, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="text-center p-5 rounded-2xl bg-[#F9F7F4] hover:bg-[#22a55d]/5 transition-colors">
                  <div className="text-xl font-extrabold text-[#131A20] mb-1">{s.value}</div>
                  <div className="text-xs font-semibold text-[#131A20]/65 mb-0.5">{s.label}</div>
                  <div className="text-[10px] text-[#131A20]/35">{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ZWART OP WIT ── */}
      <section className="py-20 bg-[#EEF6F1]">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#22a55d]/15 text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full mb-5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {nl ? 'Zwart op wit' : 'In black and white'}
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight mb-3">
              {nl ? 'Aantoonbare feiten, geen beloften' : 'Demonstrable facts, no promises'}
            </h2>
            <p className="text-[#131A20]/50 text-base max-w-xl mx-auto leading-relaxed">
              {nl
                ? 'Dit zijn de technische en commerciële kenmerken die wij kunnen aantonen. Controleerbaar, vergelijkbaar.'
                : 'These are the technical and commercial features we can demonstrate. Verifiable, comparable.'}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-2.5">
            {(nl ? [
              { icon: '📦', title: 'Modulair uitbreidbaar: 10,6 – 26,5 kWh', desc: 'Eén All-in-One ESS-systeem, capaciteit later uitbreiden zonder nieuwe omvormer' },
              { icon: '🔌', title: 'Meterloos ontwerp', desc: 'Geen aparte energiemeter nodig, eenvoudiger installatieproces' },
              { icon: '🔋', title: 'LiFePO4-celtechnologie', desc: 'A+ grade cellen, thermisch stabiel en brandveilig, bewaakt door automotive-grade BMS' },
              { icon: '🛡️', title: 'AFCI-vlamboogdetectie binnen 0,5 seconde', desc: 'Automatische noodstop bij een gedetecteerde vlamboog' },
              { icon: '⚡', title: 'Millisecondesnelle noodstroom', desc: 'Schakelt bij stroomuitval binnen milliseconden over op backup' },
              { icon: '🌦️', title: 'IP67, C4-zoutneveltest', desc: 'Geschikt voor installatie binnen én buiten, ook in kustgebieden' },
              { icon: '🔧', title: 'Universele omvormercompatibiliteit', desc: 'Werkt samen met SolarEdge, Enphase, Huawei, SMA en Growatt' },
              { icon: '📡', title: 'AI-gestuurd cloudmonitoring', desc: '24/7 realtime inzicht en besturing via de HYXiPower app' },
            ] : [
              { icon: '📦', title: 'Modular expandable: 10.6 – 26.5 kWh', desc: 'One All-in-One ESS system, expand capacity later without a new inverter' },
              { icon: '🔌', title: 'Meterless design', desc: 'No separate energy meter needed, simpler installation process' },
              { icon: '🔋', title: 'LiFePO4 cell technology', desc: 'A+ grade cells, thermally stable and fire-safe, monitored by automotive-grade BMS' },
              { icon: '🛡️', title: 'AFCI arc-fault detection within 0.5 seconds', desc: 'Automatic emergency stop when an arc fault is detected' },
              { icon: '⚡', title: 'Millisecond backup power', desc: 'Switches to backup within milliseconds during a power outage' },
              { icon: '🌦️', title: 'IP67, C4 salt spray tested', desc: 'Suitable for indoor and outdoor installation, even in coastal areas' },
              { icon: '🔧', title: 'Universal inverter compatibility', desc: 'Works together with SolarEdge, Enphase, Huawei, SMA and Growatt' },
              { icon: '📡', title: 'AI-driven cloud monitoring', desc: '24/7 real-time insight and control via the HYXiPower app' },
            ]).map((item, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="flex items-start gap-3.5 bg-white rounded-2xl p-4 border border-white/80 shadow-sm">
                  <span className="text-lg mt-0.5 flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="font-bold text-sm text-[#131A20] mb-0.5">{item.title}</div>
                    <div className="text-xs text-[#131A20]/50 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VERGELIJKING ── */}
      <section className="py-28 bg-[#F9F7F4]">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-white text-[#131A20]/50 text-xs font-semibold px-4 py-2 rounded-full mb-5 border border-gray-100">
              <TrendingUp className="w-3.5 h-3.5 text-[#22a55d]" />
              {nl ? 'Eerlijke vergelijking' : 'Honest comparison'}
            </div>
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
              {nl ? 'HYXiPower vs. de concurrentie' : 'HYXiPower vs. the competition'}
            </h2>
            <p className="text-[#131A20]/55 max-w-xl mx-auto leading-relaxed">
              {nl
                ? 'Wij vergelijken eerlijk. Dit zijn de concrete verschillen die bepalen of uw investering écht rendeert.'
                : 'We compare honestly. These are the concrete differences that determine whether your investment truly pays off.'}
            </p>
          </Reveal>
          <Reveal>
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="grid grid-cols-3 bg-[#F9F7F4] border-b border-gray-100 text-xs font-bold uppercase tracking-widest">
                <div className="p-4 text-[#131A20]/45">{nl ? 'Aspect' : 'Aspect'}</div>
                <div className="p-4 text-[#22a55d] flex items-center gap-2">
                  <Battery className="w-3.5 h-3.5" /> HYXiPower
                </div>
                <div className="p-4 text-[#131A20]/45">{nl ? 'Gemiddeld andere merken' : 'Average other brands'}</div>
              </div>
              {vergelijking.map((row, i) => (
                <div key={i} className={`grid grid-cols-3 border-b border-gray-50 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#fafaf9]'}`}>
                  <div className="p-4 text-sm font-semibold text-[#131A20]/60">{row.aspect}</div>
                  <div className="p-4 text-sm text-[#22a55d] font-semibold flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {row.alpha}
                  </div>
                  <div className="p-4 text-sm text-[#131A20]/45">{row.rest}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CERTIFICERINGEN ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#22a55d]/10 text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full mb-5">
              <Shield className="w-3.5 h-3.5" />
              {nl ? 'Kwaliteit bewezen' : 'Proven quality'}
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight mb-3">
              {nl ? 'Gecertificeerd & gekeurd' : 'Certified & approved'}
            </h2>
            <p className="text-[#131A20]/45 max-w-lg mx-auto text-base">
              {nl
                ? 'Elk HYXiPower systeem doorloopt onafhankelijke keuringen door toonaangevende internationale testlaboratoria.'
                : 'Every HYXiPower system undergoes independent inspections by leading international testing laboratories.'}
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {certs.map((c, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="bg-[#F9F7F4] rounded-2xl p-5 text-center hover:bg-[#22a55d]/5 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mx-auto mb-3">
                    <Award className="w-5 h-5 text-[#22a55d]" />
                  </div>
                  <div className="text-sm font-bold text-[#131A20] mb-1">{c.name}</div>
                  <div className="text-[11px] text-[#131A20]/40">{c.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT LINE ── */}
      <section className="py-28 bg-[#F9F7F4]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal delay={1}>
              <div className="rounded-3xl overflow-hidden shadow-xl shadow-gray-100">
                <img src="/assets/hyxipower-lineup.png" alt="HYXiPower All-in-One ESS lineup" className="w-full h-auto" />
              </div>
            </Reveal>
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-white border border-gray-100 text-[#131A20]/50 text-xs font-semibold px-4 py-2 rounded-full mb-6">
                <Battery className="w-3.5 h-3.5 text-[#22a55d]" />
                {nl ? 'All-in-One ESS, de bestseller' : 'All-in-One ESS, the bestseller'}
              </div>
              <h2 className="text-4xl font-extrabold leading-tight mb-5 tracking-tight">
                {nl ? (
                  <>Één systeem,<br /><span className="text-[#22a55d]">modulair schaalbaar</span></>
                ) : (
                  <>One system,<br /><span className="text-[#22a55d]">modularly scalable</span></>
                )}
              </h2>
              <p className="text-[#131A20]/55 leading-relaxed mb-7">
                {nl
                  ? 'De All-in-One ESS begint bij 10,6 kWh en is modulair uitbreidbaar tot 26,5 kWh. Of u nu alleen uw zonnepaneeloverschot wilt opslaan of volledig onafhankelijk wilt zijn, het systeem groeit met u mee.'
                  : 'The All-in-One ESS starts at 10.6 kWh and is modularly expandable to 26.5 kWh. Whether you just want to store your solar surplus or become completely independent, the system grows with you.'}
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { cap: nl ? 'Starter · 10,6 kWh' : 'Starter · 10.6 kWh', desc: nl ? 'Starter pakket' : 'Starter package' },
                  { cap: nl ? 'Comfort · 15,9 kWh' : 'Comfort · 15.9 kWh', desc: nl ? 'Gezinsoptimaal' : 'Family optimal' },
                  { cap: nl ? 'Premium · 21,2 kWh' : 'Premium · 21.2 kWh', desc: nl ? 'Met laadpaal' : 'With EV charger' },
                  { cap: nl ? 'Maximum · 26,5 kWh' : 'Maximum · 26.5 kWh', desc: nl ? 'Maximale onafhankelijkheid' : 'Maximum independence' },
                ].map((p, i) => (
                  <div key={i} className="bg-white rounded-2xl px-4 py-3.5 border border-gray-100">
                    <div className="font-extrabold text-sm text-[#131A20]">{p.cap}</div>
                    <div className="text-xs text-[#131A20]/45 mt-0.5">{p.desc}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('/calculator')}
                className="flex items-center gap-2 bg-[#22a55d] hover:bg-[#1a9050] text-white font-semibold px-7 py-3.5 rounded-full transition-all hover:shadow-lg hover:shadow-green-500/20 text-sm">
                {nl ? 'Bereken uw ideale capaciteit' : 'Calculate your ideal capacity'} <ArrowRight className="w-4 h-4" />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 bg-[#22a55d] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/8" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5" />
        </div>
        <div className="max-w-3xl mx-auto text-center px-6 relative">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-7">
              <Leaf className="w-3.5 h-3.5" />
              {nl ? 'Via SolarFast, HYXiPower partner' : 'Via SolarFast, HYXiPower partner'}
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight tracking-tight">
              {nl ? 'Klaar om de stap te zetten?' : 'Ready to take the step?'}
            </h2>
            <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              {nl
                ? 'Bereken in 2 minuten uw persoonlijke terugverdientijd. Of vraag direct een offerte aan, volledig vrijblijvend.'
                : 'Calculate your personal payback period in 2 minutes. Or request a quote directly, completely free of obligation.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/calculator')}
                className="inline-flex items-center justify-center gap-3 bg-white hover:bg-green-50 text-[#22a55d] font-bold px-8 py-4 rounded-full transition-all hover:shadow-2xl hover:shadow-black/10 text-base">
                {nl ? 'Start de berekening' : 'Start the calculation'} <ArrowRight className="w-5 h-5" />
              </button>
              <a href="mailto:info@solarfast.nl?subject=Offerte%20HYXiPower"
                className="inline-flex items-center justify-center gap-3 bg-white/15 hover:bg-white/25 text-white font-semibold px-8 py-4 rounded-full transition-all text-base border border-white/30">
                {nl ? 'Vraag offerte aan' : 'Request a quote'} <ChevronRight className="w-5 h-5" />
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
            <div className="text-xl font-extrabold text-[#131A20] mb-3">SOLAR<span className="text-[#22a55d]">FAST</span></div>
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
              <li className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#22a55d] flex-shrink-0" />{nl ? 'LiFePO4-celtechnologie' : 'LiFePO4 cell technology'}</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#22a55d] flex-shrink-0" />{nl ? 'Slim EMS-beheer' : 'Smart EMS management'}</li>
              <li className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#22a55d] flex-shrink-0" />All-in-One ESS</li>
              <li className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-[#22a55d] flex-shrink-0" />{nl ? 'Modulair uitbreidbaar' : 'Modular expandable'}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[#131A20]/35">© {new Date().getFullYear()} SolarFast · {nl ? 'HYXiPower partner Nederland' : 'HYXiPower partner Netherlands'}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
