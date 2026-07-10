import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Battery, CheckCircle2, ArrowRight, Shield, Zap,
  Settings, Award, Star, Home, Car, Thermometer, Users, ChevronRight
} from 'lucide-react'
import Nav from '../components/Nav.jsx'
import { useLanguage } from '../context/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref} variants={fadeUp} custom={delay}
      initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  )
}

export default function AanbodPage() {
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const nl = lang === 'nl'

  const goToCalculator = (kWh) => {
    const saved = sessionStorage.getItem('voltrax_form')
    const form = saved ? JSON.parse(saved) : {}
    sessionStorage.setItem('voltrax_form', JSON.stringify({ ...form, battery_kWh: kWh }))
    navigate('/calculator')
  }

  const CAPACITY_OPTIONS = [
    {
      kWh: 10.6,
      label: '10,6 kWh',
      tier: nl ? 'Starter' : 'Starter',
      forWhom: nl
        ? 'Ideaal voor kleinere huishoudens met zonnepanelen en gemiddeld energieverbruik.'
        : 'Ideal for smaller households with solar panels and average energy consumption.',
      price: 'Vanaf €6.990',
      priceSub: nl ? 'incl. btw + installatie' : 'incl. VAT + installation',
      popular: false,
    },
    {
      kWh: 15.9,
      label: '15,9 kWh',
      tier: nl ? 'Comfort' : 'Comfort',
      forWhom: nl
        ? 'De meest gekozen maat voor gezinnen met zonnepanelen en gemiddeld verbruik.'
        : 'The most popular size for families with solar panels and average consumption.',
      price: 'Vanaf €9.490',
      priceSub: nl ? 'incl. btw + installatie' : 'incl. VAT + installation',
      popular: true,
    },
    {
      kWh: 21.2,
      label: '21,2 kWh',
      tier: nl ? 'Premium' : 'Premium',
      forWhom: nl
        ? 'Voor woningen met een warmtepomp, elektrische auto of een hoger verbruik.'
        : 'For homes with a heat pump, electric vehicle or higher consumption.',
      price: 'Vanaf €12.490',
      priceSub: nl ? 'incl. btw + installatie' : 'incl. VAT + installation',
      popular: false,
    },
    {
      kWh: 26.5,
      label: '26,5 kWh',
      tier: nl ? 'Maximum' : 'Maximum',
      forWhom: nl
        ? 'Voor grote huishoudens of wie maximale energieonafhankelijkheid wil bereiken.'
        : 'For large households or those seeking maximum energy independence.',
      price: 'Vanaf €15.490',
      priceSub: nl ? 'incl. btw + installatie' : 'incl. VAT + installation',
      popular: false,
    },
  ]

  const PACKAGES = [
    {
      kWh: 10.6,
      label: '10,6 kWh',
      subtitle: nl ? 'Starter' : 'Starter',
      popular: false,
      icon: <Home className="w-5 h-5 text-green-600" />,
      iconBg: 'bg-green-50',
      desc: nl
        ? 'Voor kleinere huishoudens met zonnepanelen en gemiddeld verbruik.'
        : 'For smaller households with solar panels and average consumption.',
      situatie: nl ? 'Voor wie?' : 'For whom?',
      situatieDesc: nl
        ? 'Kleinere huishoudens met zonnepanelen en een gemiddeld energieverbruik.'
        : 'Smaller households with solar panels and average energy consumption.',
      specs: nl ? [
        'HYXiPower All-in-One systeem',
        'Hybride omvormer inbegrepen',
        'Geschikt voor 1-fase aansluiting',
        'HYXiPower Cloud app & EMS',
        'Professionele installatie',
        'Uitbreidbaar tot 26,5 kWh',
      ] : [
        'HYXiPower All-in-One system',
        'Hybrid inverter included',
        'Suitable for single-phase connection',
        'HYXiPower Cloud app & EMS',
        'Professional installation',
        'Expandable up to 26.5 kWh',
      ],
      highlight: nl ? 'Ideale eerste stap' : 'Ideal first step',
    },
    {
      kWh: 15.9,
      label: '15,9 kWh',
      subtitle: nl ? 'Comfort' : 'Comfort',
      popular: true,
      icon: <Users className="w-5 h-5 text-white" />,
      iconBg: 'bg-white/20',
      desc: nl
        ? 'Meest gekozen voor gezinnen met gemiddeld energieverbruik.'
        : 'Most chosen for families with average energy consumption.',
      situatie: nl ? 'Voor wie?' : 'For whom?',
      situatieDesc: nl
        ? 'Gezinnen met een gemiddeld energieverbruik die dag en avond op eigen stroom willen draaien.'
        : 'Families with average energy consumption who want to run on their own power during the day and evening.',
      specs: nl ? [
        'HYXiPower All-in-One systeem',
        'Hybride omvormer inbegrepen',
        'Geschikt voor 1- en 3-fase',
        'HYXiPower Cloud app + EMS',
        'Professionele installatie',
        'Uitbreidbaar tot 26,5 kWh',
      ] : [
        'HYXiPower All-in-One system',
        'Hybrid inverter included',
        'Suitable for 1- and 3-phase',
        'HYXiPower Cloud app + EMS',
        'Professional installation',
        'Expandable up to 26.5 kWh',
      ],
      highlight: nl ? 'Meest gekozen door gezinnen' : 'Most chosen by families',
    },
    {
      kWh: 21.2,
      label: '21,2 kWh',
      subtitle: nl ? 'Premium' : 'Premium',
      popular: false,
      icon: <Thermometer className="w-5 h-5 text-amber-500" />,
      iconBg: 'bg-amber-50',
      desc: nl
        ? 'Voor woningen met warmtepomp, EV of hoger verbruik.'
        : 'For homes with a heat pump, EV or higher consumption.',
      situatie: nl ? 'Voor wie?' : 'For whom?',
      situatieDesc: nl
        ? 'Woningen met een warmtepomp, elektrische auto of een hoger energieverbruik.'
        : 'Homes with a heat pump, electric car or higher energy consumption.',
      specs: nl ? [
        'HYXiPower All-in-One systeem',
        'Hybride omvormer inbegrepen',
        'Geschikt voor 3-fase aansluiting',
        'HYXiPower Cloud app + EMS',
        'Professionele installatie',
        'Uitbreidbaar tot 26,5 kWh',
      ] : [
        'HYXiPower All-in-One system',
        'Hybrid inverter included',
        'Suitable for 3-phase connection',
        'HYXiPower Cloud app + EMS',
        'Professional installation',
        'Expandable up to 26.5 kWh',
      ],
      highlight: nl ? 'Ideaal met warmtepomp of EV' : 'Ideal with heat pump or EV',
    },
    {
      kWh: 26.5,
      label: '26,5 kWh',
      subtitle: nl ? 'Maximum' : 'Maximum',
      popular: false,
      icon: <Award className="w-5 h-5 text-green-600" />,
      iconBg: 'bg-green-50',
      desc: nl
        ? 'Voor grote huishoudens, hoge opwek of maximale energieoptimalisatie.'
        : 'For large households, high generation or maximum energy optimisation.',
      situatie: nl ? 'Voor wie?' : 'For whom?',
      situatieDesc: nl
        ? 'Grote huishoudens, een hoge zonneopwek of wie maximaal wil optimaliseren.'
        : 'Large households, high solar generation or those who want to optimise to the fullest.',
      specs: nl ? [
        'HYXiPower All-in-One systeem',
        'Hybride omvormer inbegrepen',
        'Geschikt voor 3-fase aansluiting',
        'HYXiPower Cloud app + EMS',
        'Professionele installatie',
        'Hoogste capaciteit in het HYXiPower assortiment',
      ] : [
        'HYXiPower All-in-One system',
        'Hybrid inverter included',
        'Suitable for 3-phase connection',
        'HYXiPower Cloud app + EMS',
        'Professional installation',
        'Highest capacity in the HYXiPower range',
      ],
      highlight: nl ? 'Maximale energieoptimalisatie' : 'Maximum energy optimisation',
    },
  ]

  const INCLUDED = [
    {
      icon: <Battery className="w-5 h-5 text-green-600" />, bg: 'bg-green-50',
      title: 'HYXiPower All-in-One',
      desc: nl ? 'Batterij, BMS en EMS in één systeem. Uitbreidbaar naar behoefte.' : 'Battery, BMS and EMS in one system. Expandable as needed.',
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-500" />, bg: 'bg-amber-50',
      title: nl ? 'Hybride omvormer' : 'Hybrid inverter',
      desc: nl ? 'Compatibel met alle zonnepanelen. 1- en 3-fase beschikbaar.' : 'Compatible with all solar panels. 1- and 3-phase available.',
    },
    {
      icon: <Settings className="w-5 h-5 text-blue-500" />, bg: 'bg-blue-50',
      title: nl ? 'Installatie & inbedrijfstelling' : 'Installation & commissioning',
      desc: nl ? 'Gecertificeerde monteurs, nette afwerking, alles geactiveerd.' : 'Certified technicians, neat finish, everything activated.',
    },
    {
      icon: <Shield className="w-5 h-5 text-green-600" />, bg: 'bg-green-50',
      title: nl ? 'Fabrieksgarantie' : 'Factory warranty',
      desc: nl ? 'Fabrieksgarantie, uw investering presteert jarenlang uitstekend.' : 'Factory warranty, your investment performs excellently for years.',
    },
    {
      icon: <Star className="w-5 h-5 text-amber-400" />, bg: 'bg-amber-50',
      title: 'HYXiPower Cloud app',
      desc: nl ? 'Realtime monitoring, slimme laadschemas en energiehandel.' : 'Real-time monitoring, smart charging schedules and energy trading.',
    },
    {
      icon: <Award className="w-5 h-5 text-green-600" />, bg: 'bg-green-50',
      title: nl ? 'Warmtefonds begeleiding' : 'Warmtefonds support',
      desc: nl ? 'Wij regelen uw Energiebespaarlening van A tot Z.' : 'We arrange your energy savings loan from A to Z.',
    },
  ]

  const backupFeatures = nl ? [
    'Automatische overschakeling bij stroomuitval',
    'Kritieke apparaten blijven werken',
    'Instelbaar via de HYXiPower Cloud app',
    'Geen extra hardware nodig bij de meeste configuraties',
  ] : [
    'Automatic switchover during power outage',
    'Critical devices keep working',
    'Configurable via the HYXiPower Cloud app',
    'No additional hardware needed in most configurations',
  ]

  const backupRows = nl ? [
    { label: 'Zelfverbruik optimalisatie', active: true },
    { label: 'Slimme EMS-handel', active: true },
    { label: 'Negatieve uren benutten', active: true },
    { label: 'Backup bij stroomuitval', active: false, note: 'Optioneel in te stellen' },
  ] : [
    { label: 'Self-consumption optimisation', active: true },
    { label: 'Smart EMS trading', active: true },
    { label: 'Utilise negative hours', active: true },
    { label: 'Backup during power outage', active: false, note: 'Optionally configurable' },
  ]

  const warmtefondsFeatures = nl ? [
    'Tot 8.500 euro lenen voor uw thuisbatterij',
    '0% rente bij inkomen onder 60.000 euro',
    'Voor iedere eigenaar-bewoner in Nederland',
    'SolarFast regelt de volledige aanvraag voor u',
    'Gecombineerd met andere verduurzamingsmaatregelen',
  ] : [
    'Borrow up to €8,500 for your home battery',
    '0% interest with income below €60,000',
    'For every owner-occupier in the Netherlands',
    'SolarFast handles the complete application for you',
    'Combined with other sustainability measures',
  ]

  const loanRows = nl ? [
    { label: 'Rente bij inkomen onder 60k', value: '0%', color: 'text-green-600' },
    { label: 'Min. leenbedrag', value: '1.000 euro', color: 'text-[#131A20]' },
    { label: 'Max. leenbedrag batterij', value: '8.500 euro', color: 'text-[#131A20]' },
    { label: 'Leeftijdsgrens', value: 'Geen', color: 'text-green-600' },
  ] : [
    { label: 'Interest with income below 60k', value: '0%', color: 'text-green-600' },
    { label: 'Min. loan amount', value: '€1,000', color: 'text-[#131A20]' },
    { label: 'Max. loan amount battery', value: '€8,500', color: 'text-[#131A20]' },
    { label: 'Age limit', value: 'None', color: 'text-green-600' },
  ]

  return (
    <div className="min-h-screen bg-white text-[#131A20] font-['Plus_Jakarta_Sans']">
      <Nav />

      {/* ── HERO ── */}
      <section className="pt-32 pb-16 bg-[#F9F7F4]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#22a55d]/15 border border-[#22a55d]/20 text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <Battery className="w-3.5 h-3.5" />
            {nl ? 'HYXiPower All-in-One — officieel partner' : 'HYXiPower All-in-One — official partner'}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl font-extrabold leading-tight mb-3 text-[#131A20]">
            {nl ? 'HYXiPower All-in-One.' : 'HYXiPower All-in-One.'}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.15 }}
            className="text-3xl font-extrabold text-[#22a55d] mb-5">
            {nl ? 'Kies uw capaciteit.' : 'Choose your capacity.'}
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#131A20]/60 text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
            {nl
              ? 'Eén thuisbatterijsysteem, beschikbaar in vier capaciteiten. Batterij, omvormer, installatie en fabrieksgarantie — alles inbegrepen, niets extra.'
              : 'One home battery system, available in four capacities. Battery, inverter, installation and factory warranty — everything included, nothing extra.'}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.35 }}
            className="inline-flex items-center gap-2 bg-white border border-green-200 text-green-700 text-xs font-semibold px-4 py-2 rounded-full mb-10">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {nl ? 'LFP-celtechnologie voor lange levensduur' : 'LFP cell technology for long lifespan'}
          </motion.div>

          {/* Product visual */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-end justify-center"
          >
            <div className="absolute w-[55%] aspect-square rounded-full bg-[#22a55d]/18 blur-3xl bottom-4" />
            <div className="absolute w-[32%] aspect-square rounded-full bg-[#22a55d]/12 blur-xl bottom-8" />
            <img
              src="/assets/hyxipower-battery-3d.png"
              alt="HYXiPower All-in-One thuisbatterij"
              className="relative mx-auto"
              style={{
                height: 340,
                width: 'auto',
                filter: 'drop-shadow(0 32px 56px rgba(0,0,0,0.20)) drop-shadow(0 8px 18px rgba(34,165,93,0.13))',
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── CAPACITEITS-SELECTOR ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl font-extrabold mb-2">
              {nl ? 'Kies uw capaciteit' : 'Choose your capacity'}
            </h2>
            <p className="text-[#131A20]/50 text-sm max-w-lg mx-auto">
              {nl
                ? 'Alle varianten bevatten hetzelfde systeem — batterij, omvormer, installatie en garantie.'
                : 'All variants include the same system — battery, inverter, installation and warranty.'}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAPACITY_OPTIONS.map((opt, i) => (
              <Reveal key={opt.kWh} delay={i * 0.1}>
                <div className={`relative rounded-3xl p-6 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  opt.popular
                    ? 'bg-[#22a55d] text-white ring-2 ring-[#22a55d]/30 hover:shadow-green-500/20'
                    : 'bg-[#F9F7F4] border border-gray-100 text-[#131A20] hover:shadow-black/6'
                }`}>
                  {opt.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-white text-[#22a55d] text-xs font-bold px-4 py-1 rounded-full shadow-sm whitespace-nowrap border border-green-100">
                        {nl ? 'Meest gekozen' : 'Most chosen'}
                      </span>
                    </div>
                  )}

                  <div className={`text-xs font-semibold uppercase tracking-widest mb-2 ${opt.popular ? 'text-white/60' : 'text-[#131A20]/40'}`}>
                    {opt.tier}
                  </div>
                  <div className="text-4xl font-extrabold mb-4">{opt.label}</div>

                  <div className={`h-px mb-4 ${opt.popular ? 'bg-white/20' : 'bg-gray-200'}`} />

                  <p className={`text-sm leading-relaxed flex-1 mb-5 ${opt.popular ? 'text-white/75' : 'text-[#131A20]/60'}`}>
                    {opt.forWhom}
                  </p>

                  <div className={`rounded-2xl p-4 mb-4 ${opt.popular ? 'bg-white/15' : 'bg-white border border-gray-100'}`}>
                    <div className={`text-xs font-medium mb-0.5 ${opt.popular ? 'text-white/50' : 'text-[#131A20]/40'}`}>
                      {nl ? 'Indicatieve investering' : 'Indicative investment'}
                    </div>
                    <div className={`text-xl font-extrabold ${opt.popular ? 'text-white' : 'text-[#131A20]'}`}>{opt.price}</div>
                    <div className={`text-xs mt-0.5 ${opt.popular ? 'text-white/50' : 'text-[#131A20]/40'}`}>{opt.priceSub}</div>
                  </div>

                  <button
                    onClick={() => goToCalculator(opt.kWh)}
                    className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-full transition-all text-sm ${
                      opt.popular
                        ? 'bg-white text-[#22a55d] hover:bg-green-50'
                        : 'bg-[#22a55d] text-white hover:bg-[#1a9050] hover:shadow-lg hover:shadow-green-500/20'
                    }`}
                  >
                    {nl ? 'Bereken mijn besparing' : 'Calculate my savings'} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={4}>
            <p className="text-center text-xs text-[#131A20]/40 mt-6 leading-relaxed">
              {nl
                ? 'Indicatieve prijzen incl. btw en standaard installatie. Exacte prijs na gratis adviesgesprek.'
                : 'Indicative prices incl. VAT and standard installation. Exact price after free consultation.'}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── ALLES INBEGREPEN ── */}
      <section className="py-16 bg-[#F9F7F4]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">
              {nl ? 'Alles inbegrepen, niets extra' : 'Everything included, nothing extra'}
            </h2>
            <p className="text-[#131A20]/60 text-lg max-w-xl mx-auto">
              {nl
                ? 'Onze systemen bevatten alles wat u nodig heeft. U hoeft nergens anders aan te kloppen.'
                : 'Our systems contain everything you need. You don\'t need to go anywhere else.'}
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INCLUDED.map((item, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="bg-white rounded-3xl p-6 flex gap-4 items-start border border-gray-100 hover:shadow-md hover:shadow-gray-100 transition-all">
                  <div className={`w-10 h-10 rounded-2xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-[#131A20]">{item.title}</h3>
                    <p className="text-sm text-[#131A20]/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BACKUP OPTIONEEL ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="bg-green-50 rounded-3xl p-8 md:p-10 border border-green-100">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-2 rounded-full mb-5">
                    <Shield className="w-3.5 h-3.5" />
                    {nl ? 'Optionele extra' : 'Optional extra'}
                  </div>
                  <h2 className="text-3xl font-extrabold leading-tight mb-4">
                    {nl ? 'Backup stroom bij stroomuitval' : 'Backup power during power outage'}
                  </h2>
                  <p className="text-[#131A20]/60 leading-relaxed mb-5">
                    {nl
                      ? 'De HYXiPower batterij kan optioneel worden ingesteld als noodstroombron. Bij een stroomuitval schakelt het systeem automatisch over zodat uw verlichting, koelkast en router blijven werken. Handig, maar niet noodzakelijk om alle andere voordelen te benutten.'
                      : 'The HYXiPower battery can optionally be configured as an emergency power source. During a power outage, the system automatically switches over so your lighting, refrigerator and router keep working. Useful, but not necessary to enjoy all other benefits.'}
                  </p>
                  <ul className="space-y-2.5">
                    {backupFeatures.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#131A20]/80">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-2xl p-7 shadow-sm">
                  <div className="font-bold text-[#131A20] mb-4">
                    {nl ? 'Backup is altijd optioneel' : 'Backup is always optional'}
                  </div>
                  <div className="space-y-3">
                    {backupRows.map((r, i) => (
                      <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                        <span className="text-sm text-[#131A20]/70">{r.label}</span>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${r.active ? 'bg-green-100 text-green-700' : 'bg-amber-50 text-amber-600'}`}>
                          {r.active ? (nl ? 'Altijd inbegrepen' : 'Always included') : r.note}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WARMTEFONDS ── */}
      <section className="py-16 bg-[#F9F7F4]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-2 rounded-full mb-5">
                <Shield className="w-3.5 h-3.5" />
                {nl ? 'Officieel Warmtefonds partner' : 'Official Warmtefonds partner'}
              </div>
              <h2 className="text-4xl font-extrabold leading-tight mb-5">
                {nl ? 'Financier via het Nationaal Warmtefonds' : 'Finance via the National Warmtefonds'}
              </h2>
              <p className="text-[#131A20]/60 leading-relaxed mb-6">
                {nl
                  ? 'Als erkend Warmtefonds partner regelt SolarFast uw Energiebespaarlening volledig voor u. Tot 8.500 euro lenen voor uw thuisbatterij, bij een inkomen onder 60.000 euro betaalt u 0% rente.'
                  : 'As an approved Warmtefonds partner, SolarFast arranges your Energy Savings Loan completely for you. Borrow up to €8,500 for your home battery, with an income below €60,000 you pay 0% interest.'}
              </p>
              <div className="space-y-3">
                {warmtefondsFeatures.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-[#131A20]/80">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="text-center mb-6">
                  <div className="text-5xl font-extrabold text-[#131A20] mb-1">8.500</div>
                  <div className="text-[#131A20]/50 text-sm">
                    {nl ? 'euro maximum lening voor thuisbatterij' : 'euro maximum loan for home battery'}
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  {loanRows.map((r, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                      <span className="text-sm text-[#131A20]/60">{r.label}</span>
                      <span className={`text-sm font-bold ${r.color}`}>{r.value}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => goToCalculator(15.9)}
                  className="w-full bg-[#22a55d] hover:bg-[#1a9050] text-white font-semibold py-3.5 rounded-full text-sm transition-all hover:shadow-lg hover:shadow-green-500/20">
                  {nl ? 'Bereken inclusief Warmtefonds' : 'Calculate including Warmtefonds'}
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#EEF6F1]">
        <div className="max-w-3xl mx-auto text-center px-6">
          <Reveal>
            <h2 className="text-4xl font-extrabold text-[#131A20] mb-5">
              {nl ? 'Welk systeem past bij uw situatie?' : 'Which system suits your situation?'}
            </h2>
            <p className="text-[#131A20]/60 text-lg mb-8 leading-relaxed">
              {nl
                ? 'Gebruik de calculator en ontdek welke capaciteit het meeste oplevert voor uw persoonlijk verbruik en zonneopbrengst.'
                : 'Use the calculator and discover which capacity delivers the most for your personal consumption and solar yield.'}
            </p>
            <button onClick={() => goToCalculator(15.9)}
              className="inline-flex items-center gap-3 bg-[#22a55d] hover:bg-[#1a9050] text-white font-bold px-8 py-4 rounded-full transition-all hover:shadow-2xl hover:shadow-green-500/25 text-lg">
              {nl ? 'Start de berekening' : 'Start the calculation'} <ArrowRight className="w-5 h-5" />
            </button>
            <p className="mt-4 text-xs text-[#131A20]/35">
              {nl ? 'Kosteloos, 100% vrijblijvend' : 'Free, 100% no obligation'}
            </p>
          </Reveal>
        </div>
      </section>

      <footer className="bg-[#F9F7F4] border-t border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <img src="/assets/solarfast-logo.png" alt="SolarFast" className="h-7 w-auto" />
          <p className="text-sm text-[#131A20]/40">{nl ? 'HYXiPower partner' : 'HYXiPower partner'}</p>
          <div className="flex items-center gap-2 text-xs text-[#131A20]/40">
            <Shield className="w-3.5 h-3.5 text-[#22a55d]" />
            {nl ? 'Warmtefonds partner' : 'Warmtefonds partner'}
          </div>
        </div>
      </footer>
    </div>
  )
}
