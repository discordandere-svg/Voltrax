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

export default function AlphaESSPage() {
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const nl = lang === 'nl'

  const voordelen = [
    {
      icon: <Award className="w-5 h-5" />,
      title: nl ? 'Europese & Duitse kwaliteitsnormen' : 'European & German quality standards',
      desc: nl
        ? 'Alle producten zijn TÜV-gecertificeerd en voldoen aan de strengste Europese normen voor veiligheid en betrouwbaarheid. Getest op meer dan 10.000 laadcycli.'
        : 'All products are TÜV certified and meet the strictest European standards for safety and reliability. Tested for more than 10,000 charge cycles.',
    },
    {
      icon: <Cpu className="w-5 h-5" />,
      title: 'AlphaLINX technologie',
      desc: nl
        ? 'Het slimme Energy Management System optimaliseert realtime uw energiestroom. Koppeling met EPEX Spot zorgt voor automatisch arbitrage op de energiemarkt.'
        : 'The smart Energy Management System optimises your energy flow in real time. EPEX Spot coupling enables automatic arbitrage on the energy market.',
    },
    {
      icon: <Battery className="w-5 h-5" />,
      title: nl ? 'LFP-lithiumtechnologie' : 'LFP lithium technology',
      desc: nl
        ? 'Lithium-ijzerfosfaat (LFP) is de veiligste en meest duurzame batterijchemie. Thermisch stabiel, brandveilig en bestand tegen diepe ontlading.'
        : 'Lithium iron phosphate (LFP) is the safest and most durable battery chemistry. Thermally stable, fire-safe and resistant to deep discharge.',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: nl ? 'IP55-gecertificeerd' : 'IP55 certified',
      desc: nl
        ? 'Geschikt voor installatie binnen én buiten. De robuuste behuizing beschermt tegen stof en waterstralen, ideaal voor garage, bijkeuken of technische ruimte.'
        : 'Suitable for indoor and outdoor installation. The robust housing protects against dust and water jets, ideal for garage, utility room or technical space.',
    },
    {
      icon: <Wifi className="w-5 h-5" />,
      title: 'AlphaCloud monitoring',
      desc: nl
        ? 'Realtime inzicht via de gratis app op uw smartphone. Bekijk productie, verbruik en batterijstatus op elk moment. Updates automatisch via de cloud.'
        : 'Real-time insight via the free app on your smartphone. View production, consumption and battery status at any time. Updates automatically via the cloud.',
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: nl ? '200.000+ installaties wereldwijd' : '200,000+ installations worldwide',
      desc: nl
        ? 'AlphaESS is actief in meer dan 110 landen en heeft meer dan 200.000 thuisbatterijen geïnstalleerd. Een van de meest betrouwbare merken ter wereld.'
        : 'AlphaESS is active in more than 110 countries and has installed more than 200,000 home batteries. One of the most trusted brands worldwide.',
    },
  ]

  const specs = [
    { label: nl ? 'Capaciteit' : 'Capacity', value: '9,3–111,3 kWh', sub: nl ? 'Modulair uitbreidbaar' : 'Modular expandable' },
    { label: nl ? 'Laadcycli' : 'Charge cycles', value: '10.000+', sub: nl ? 'LFP-technologie' : 'LFP technology' },
    { label: nl ? 'Garantie' : 'Warranty', value: nl ? '10 jaar' : '10 years', sub: nl ? 'Fabrieksgarantie' : 'Factory warranty' },
    { label: nl ? 'IP-klasse' : 'IP class', value: 'IP55', sub: nl ? 'Binnen & buiten' : 'Indoor & outdoor' },
    { label: nl ? 'Rendement' : 'Efficiency', value: '≥ 92%', sub: nl ? 'Rond-trip efficiency' : 'Round-trip efficiency' },
    { label: nl ? 'Installaties' : 'Installations', value: '200.000+', sub: nl ? 'Wereldwijd actief' : 'Active worldwide' },
  ]

  const vergelijking = [
    { aspect: nl ? 'Technologie' : 'Technology', alpha: nl ? 'LFP, brandveilig en thermisch stabiel' : 'LFP, fire-safe and thermally stable', rest: nl ? 'NMC of oudere chemie' : 'NMC or older chemistry' },
    { aspect: nl ? 'EMS platform' : 'EMS platform', alpha: nl ? 'AlphaLINX, AI-gestuurd, EPEX Spot' : 'AlphaLINX, AI-driven, EPEX Spot', rest: nl ? 'Basis of geen EMS' : 'Basic or no EMS' },
    { aspect: nl ? 'Garantie' : 'Warranty', alpha: nl ? '10 jaar fabrieksgarantie' : '10-year factory warranty', rest: nl ? '5–7 jaar gemiddeld' : '5–7 years average' },
    { aspect: nl ? 'Capaciteitsgarantie' : 'Capacity guarantee', alpha: nl ? '≥ 80% na 10 jaar, op papier' : '≥ 80% after 10 years, in writing', rest: nl ? 'Zelden contractueel vastgelegd' : 'Rarely contractually fixed' },
    { aspect: nl ? 'Uitbreidbaarheid' : 'Expandability', alpha: nl ? 'Modulair 9,3 t/m 111,3 kWh' : 'Modular 9.3 to 111.3 kWh', rest: nl ? 'Vaste capaciteit' : 'Fixed capacity' },
    { aspect: nl ? 'Certificering' : 'Certification', alpha: 'TÜV, CE, EMC, IP55, IEC 62619', rest: nl ? 'Variabel per merk' : 'Varies by brand' },
    { aspect: nl ? 'App monitoring' : 'App monitoring', alpha: nl ? 'Klant + installateur + fabrikant' : 'Customer + installer + manufacturer', rest: nl ? 'Vaak alleen klant' : 'Often customer only' },
    { aspect: nl ? 'Overdraagbare garantie' : 'Transferable warranty', alpha: nl ? 'Ja, blijft bij de woning' : 'Yes, stays with the property', rest: nl ? 'Zelden geregeld' : 'Rarely arranged' },
    { aspect: nl ? 'Backup / noodstroom' : 'Backup / emergency power', alpha: nl ? 'Mogelijk, met juiste configuratie' : 'Possible, with correct configuration', rest: nl ? 'Niet altijd beschikbaar' : 'Not always available' },
    { aspect: nl ? 'Marktintegratie' : 'Market integration', alpha: nl ? 'EPEX Spot koppeling (NL/BE)' : 'EPEX Spot coupling (NL/BE)', rest: nl ? 'Zelden beschikbaar' : 'Rarely available' },
  ]

  const certs = [
    { name: 'TÜV Rheinland', desc: nl ? 'Onafhankelijk getest' : 'Independently tested' },
    { name: 'CE-markering', desc: nl ? 'Europese conformiteit' : 'European conformity' },
    { name: 'IEC 62619', desc: nl ? 'Veiligheidsnorm batterijen' : 'Battery safety standard' },
    { name: 'IP55', desc: nl ? 'Weerbestendig gecertificeerd' : 'Weather-resistant certified' },
    { name: 'VDE', desc: nl ? 'Duits elektrotechnisch keurmerk' : 'German electrotechnical mark' },
    { name: 'MCS', desc: nl ? 'UK en Europees netwerk' : 'UK and European network' },
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
                  <>AlphaESS,<br /><span className="text-[#22a55d]">de standaard</span> in<br />thuisenergieopslag</>
                ) : (
                  <>AlphaESS,<br /><span className="text-[#22a55d]">the standard</span> in<br />home energy storage</>
                )}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.16 }}
                className="text-lg text-[#131A20]/60 leading-relaxed mb-8 max-w-md">
                {nl
                  ? 'Opgericht in 2012 met Duits-Europese ingenieursnormen. Actief in meer dan 110 landen. Marktleider in slimme thuisenergieopslag.'
                  : 'Founded in 2012 with German-European engineering standards. Active in more than 110 countries. Market leader in smart home energy storage.'}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.24 }}
                className="flex flex-wrap gap-3">
                <button onClick={() => navigate('/calculator')}
                  className="flex items-center gap-2 bg-[#22a55d] hover:bg-[#1a9050] text-white font-semibold px-7 py-3.5 rounded-full transition-all hover:shadow-xl hover:shadow-green-500/25 text-sm">
                  {nl ? 'Bereken mijn besparing' : 'Calculate my savings'} <ArrowRight className="w-4 h-4" />
                </button>
                <a href="mailto:info@voltrax.nl?subject=Informatie%20AlphaESS"
                  className="flex items-center gap-2 border border-gray-200 bg-white text-[#131A20]/60 hover:border-[#22a55d] hover:text-[#22a55d] font-medium px-7 py-3.5 rounded-full transition-all text-sm">
                  {nl ? 'Stel een vraag' : 'Ask a question'}
                </a>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.2, ease }}
              className="relative pb-0">
              <div className="rounded-t-3xl overflow-hidden aspect-[4/3] shadow-2xl shadow-black/30">
                <img src="/assets/battery-night.webp" alt="AlphaESS SMILE G3 thuisbatterij" className="w-full h-full object-cover" />
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
              { val: '2012', label: nl ? 'Opgericht' : 'Founded' },
              { val: '200.000+', label: nl ? 'Installaties' : 'Installations' },
              { val: '110+', label: nl ? 'Landen actief' : 'Countries active' },
              { val: nl ? '10 jaar' : '10 years', label: nl ? 'Garantie' : 'Warranty' },
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
                <Cpu className="w-3.5 h-3.5" /> AlphaLINX technologie
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
                  ? 'AlphaLINX is het AI-gedreven Energy Management System dat realtime beslist wanneer uw batterij laadt, ontlaadt, en op de markt handelt. Het systeem verbindt uw zonnepanelen, batterij, thuisverbruik en het Europese energienet.'
                  : 'AlphaLINX is the AI-driven Energy Management System that decides in real time when your battery charges, discharges and trades on the market. It connects your solar panels, battery, home consumption and the European energy grid.'}
              </p>
              <ul className="space-y-3.5 mb-8">
                {(nl ? [
                  'EPEX Spot koppeling, profiteert automatisch van uurprijzen',
                  'Selflearning algoritme past zich aan uw verbruikspatroon aan',
                  'Realtime monitoring via gratis AlphaCloud app',
                  'OTA-updates, systeem verbetert automatisch in de tijd',
                  'API-integratie met slimme meter en laadpaal',
                ] : [
                  'EPEX Spot coupling, automatically profits from hourly price differences',
                  'Self-learning algorithm adapts to your consumption pattern',
                  'Real-time monitoring via free AlphaCloud app',
                  'OTA updates, system improves automatically over time',
                  'API integration with smart meter and EV charger',
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
                    <div className="text-sm font-bold text-[#131A20]">AlphaCloud monitor</div>
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
              {nl ? 'Waarom AlphaESS' : 'Why AlphaESS'}
            </div>
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
              {nl ? 'Wat maakt AlphaESS anders?' : 'What makes AlphaESS different?'}
            </h2>
            <p className="text-[#131A20]/55 text-lg max-w-2xl mx-auto leading-relaxed">
              {nl
                ? 'AlphaESS bouwt al meer dan tien jaar thuisbatterijen. Dit zijn de kenmerken die u kunt controleren en vergelijken.'
                : 'AlphaESS has been building home batteries for over ten years. These are the features you can verify and compare.'}
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
              {nl ? 'AlphaESS SMILE G3, de meest populaire reeks' : 'AlphaESS SMILE G3, the most popular series'}
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
              { icon: '🏷️', title: '10 jaar fabrieksgarantie', desc: 'Vastgelegd in het contract — niet mondeling toegezegd' },
              { icon: '📊', title: '80% resterende capaciteit na 10 jaar', desc: 'Prestatiegarantie naast de productgarantie — twee aparte zekerheden' },
              { icon: '🔋', title: 'LFP-technologie', desc: 'Lithium-ijzerfosfaat — thermisch stabiel, brandveilig en slijtvaster dan NMC-chemie' },
              { icon: '📦', title: 'Modulair uitbreidbaar: 9,3 – 111,3 kWh', desc: 'Capaciteit later uitbreiden binnen hetzelfde systeem en ecosysteem' },
              { icon: '📡', title: 'Monitoring op drie niveaus', desc: 'Klant, installateur én fabrikant kunnen meekijken via AlphaCloud' },
              { icon: '🏡', title: 'Overdraagbare garantie', desc: 'Bij verkoop van uw woning gaat de garantie automatisch mee naar de nieuwe eigenaar' },
              { icon: '🛡️', title: 'CE, EMC, TÜV, IEC 62619', desc: 'Onafhankelijk getest en gecertificeerd op Europese veiligheidsnormen' },
              { icon: '⚙️', title: 'Eén fabrikant', desc: 'Batterij, BMS, software en omvormer uit hetzelfde ecosysteem — geen lappendeken' },
              { icon: '🔌', title: 'Backup / noodstroom mogelijk', desc: 'Werkt door bij stroomuitval op het net — met de juiste configuratie en accessoires' },
              { icon: '🏢', title: 'Europees kantoor & magazijn in Nederland', desc: 'AlphaESS Benelux B.V. — High Tech Campus 41, Eindhoven. Onderdelen snel beschikbaar.' },
            ] : [
              { icon: '🏷️', title: '10-year factory warranty', desc: 'Contractually agreed — not a verbal promise' },
              { icon: '📊', title: '80% remaining capacity after 10 years', desc: 'Performance guarantee separate from product warranty — two distinct assurances' },
              { icon: '🔋', title: 'LFP technology', desc: 'Lithium iron phosphate — thermally stable, fire-safe and longer-lasting than NMC chemistry' },
              { icon: '📦', title: 'Modular expandable: 9.3 – 111.3 kWh', desc: 'Expand capacity later within the same system and ecosystem' },
              { icon: '📡', title: 'Three-level monitoring', desc: 'Customer, installer and manufacturer can all monitor via AlphaCloud' },
              { icon: '🏡', title: 'Transferable warranty', desc: 'When you sell your home, the warranty automatically transfers to the new owner' },
              { icon: '🛡️', title: 'CE, EMC, TÜV, IEC 62619', desc: 'Independently tested and certified against European safety standards' },
              { icon: '⚙️', title: 'One manufacturer', desc: 'Battery, BMS, software and inverter from the same ecosystem — no patchwork' },
              { icon: '🔌', title: 'Backup / emergency power possible', desc: 'Continues operating during a grid outage — with the correct configuration and accessories' },
              { icon: '🏢', title: 'European office & warehouse in the Netherlands', desc: 'AlphaESS Benelux B.V. — High Tech Campus 41, Eindhoven. Parts available quickly.' },
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
              {nl ? 'AlphaESS vs. de concurrentie' : 'AlphaESS vs. the competition'}
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
                  <Battery className="w-3.5 h-3.5" /> AlphaESS
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
                ? 'Elk AlphaESS systeem doorloopt onafhankelijke keuringen door toonaangevende internationale testlaboratoria.'
                : 'Every AlphaESS system undergoes independent inspections by leading international testing laboratories.'}
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
                <img src="/assets/battery-outdoor.webp" alt="AlphaESS SMILE G3 buiten" className="w-full h-auto" />
              </div>
            </Reveal>
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-white border border-gray-100 text-[#131A20]/50 text-xs font-semibold px-4 py-2 rounded-full mb-6">
                <Battery className="w-3.5 h-3.5 text-[#22a55d]" />
                {nl ? 'SMILE G3, de bestseller' : 'SMILE G3, the bestseller'}
              </div>
              <h2 className="text-4xl font-extrabold leading-tight mb-5 tracking-tight">
                {nl ? (
                  <>Één systeem,<br /><span className="text-[#22a55d]">oneindig schaalbaar</span></>
                ) : (
                  <>One system,<br /><span className="text-[#22a55d]">infinitely scalable</span></>
                )}
              </h2>
              <p className="text-[#131A20]/55 leading-relaxed mb-7">
                {nl
                  ? 'De SMILE G3 begint bij 9,3 kWh en is modulair uitbreidbaar tot 111,3 kWh. Of u nu alleen uw zonnepaneeloverschot wilt opslaan of volledig onafhankelijk wilt zijn, het systeem groeit met u mee.'
                  : 'The SMILE G3 starts at 9.3 kWh and is modularly expandable to 111.3 kWh. Whether you just want to store your solar surplus or become completely independent, the system grows with you.'}
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { cap: '9,3 kWh', desc: nl ? 'Starter pakket' : 'Starter package' },
                  { cap: '18,6 kWh', desc: nl ? 'Gezinsoptimaal' : 'Family optimal' },
                  { cap: '27,9 kWh', desc: nl ? 'Met laadpaal' : 'With EV charger' },
                  { cap: '111,3 kWh', desc: nl ? 'Maximale onafhankelijkheid' : 'Maximum independence' },
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
              {nl ? 'Via VOLTRAX, officieel AlphaESS dealer' : 'Via VOLTRAX, official AlphaESS dealer'}
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
              <a href="mailto:info@voltrax.nl?subject=Offerte%20AlphaESS"
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
            <div className="text-xl font-extrabold text-[#131A20] mb-3">VOLT<span className="text-[#22a55d]">RAX</span></div>
            <p className="text-sm text-[#131A20]/45 leading-relaxed mb-4">{nl ? 'Officieel AlphaESS dealer in Nederland. Uw thuisbatterij specialist.' : 'Official AlphaESS dealer in the Netherlands. Your home battery specialist.'}</p>
            <a href="mailto:info@voltrax.nl" className="text-sm text-[#22a55d] font-medium hover:underline">info@voltrax.nl</a>
          </div>
          <div>
            <div className="text-xs font-bold text-[#131A20]/30 uppercase tracking-widest mb-4">{nl ? 'Producten' : 'Products'}</div>
            <ul className="space-y-2.5 text-sm text-[#131A20]/55">
              <li><button onClick={() => navigate('/aanbod')} className="hover:text-[#22a55d] transition-colors text-left">{nl ? 'Ons aanbod' : 'Our offer'}</button></li>
              <li><button onClick={() => navigate('/alphaess')} className="hover:text-[#22a55d] transition-colors text-left">Over AlphaESS</button></li>
              <li><button onClick={() => navigate('/calculator')} className="hover:text-[#22a55d] transition-colors text-left">{nl ? 'Bereken besparing' : 'Calculate savings'}</button></li>
              <li><button onClick={() => navigate('/warmtefonds')} className="hover:text-[#22a55d] transition-colors text-left">Warmtefonds</button></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold text-[#131A20]/30 uppercase tracking-widest mb-4">{nl ? 'Informatie' : 'Information'}</div>
            <ul className="space-y-2.5 text-sm text-[#131A20]/55">
              <li><button onClick={() => navigate('/hoe-werkt-het')} className="hover:text-[#22a55d] transition-colors text-left">{nl ? 'Hoe werkt het?' : 'How it works'}</button></li>
              <li><button onClick={() => navigate('/waarom-voltrax')} className="hover:text-[#22a55d] transition-colors text-left">{nl ? 'Waarom Voltrax' : 'Why Voltrax'}</button></li>
              <li><button onClick={() => navigate('/faq')} className="hover:text-[#22a55d] transition-colors text-left">{nl ? 'Veelgestelde vragen' : 'FAQ'}</button></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold text-[#131A20]/30 uppercase tracking-widest mb-4">{nl ? 'Certificeringen' : 'Certifications'}</div>
            <ul className="space-y-2.5 text-sm text-[#131A20]/55">
              <li className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#22a55d] flex-shrink-0" />{nl ? '10 jaar fabrieksgarantie' : '10 year factory warranty'}</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#22a55d] flex-shrink-0" />NEN1010 &amp; NEN3140</li>
              <li className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#22a55d] flex-shrink-0" />AlphaESS {nl ? 'gecertificeerd' : 'certified'}</li>
              <li className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-[#22a55d] flex-shrink-0" />IP55 installatie</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[#131A20]/35">© {new Date().getFullYear()} Voltrax · {nl ? 'Officieel AlphaESS dealer Nederland' : 'Official AlphaESS dealer Netherlands'}</p>
            <p className="text-xs text-[#131A20]/30">AlphaESS Benelux B.V. · High Tech Campus 41 · 5656 AE Eindhoven</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
