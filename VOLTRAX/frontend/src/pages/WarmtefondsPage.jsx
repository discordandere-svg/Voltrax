import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, CheckCircle2, Shield, Euro, Coins,
  ChevronDown, Leaf, Building2, Users, Zap, Award, Phone, Battery
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
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} variants={fadeUp} custom={delay}
      initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  )
}

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group">
        <span className="font-semibold text-[#131A20] text-sm group-hover:text-[#22a55d] transition-colors">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }} className="flex-shrink-0">
          <ChevronDown className="w-4 h-4 text-[#131A20]/40" />
        </motion.div>
      </button>
      {open && (
        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} className="pb-5">
          <p className="text-sm text-[#131A20]/55 leading-relaxed">{a}</p>
        </motion.div>
      )}
    </div>
  )
}

export default function WarmtefondsPage() {
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const nl = lang === 'nl'

  const stappen = nl ? [
    {
      num: '01',
      title: 'Bereken uw besparing',
      desc: 'Gebruik onze gratis calculator om uw persoonlijke terugverdientijd en jaarlijkse besparing te berekenen. In 2 minuten klaar.',
      cta: 'Naar de calculator',
    },
    {
      num: '02',
      title: 'Warmtefonds aanvraag',
      desc: 'SolarFast begeleidt u bij de aanvraag bij het Nationaal Warmtefonds. Wij regelen het papierwerk en zorgen dat u de maximale lening krijgt.',
      cta: null,
    },
    {
      num: '03',
      title: 'Installatie & besparing',
      desc: 'Onze gecertificeerde monteurs installeren uw batterij. Vanaf dag 1 begint uw besparing, waarmee u de lening comfortabel terugbetaalt.',
      cta: null,
    },
  ] : [
    {
      num: '01',
      title: 'Calculate your savings',
      desc: 'Use our free calculator to calculate your personal payback period and annual savings. Done in 2 minutes.',
      cta: 'Go to calculator',
    },
    {
      num: '02',
      title: 'Warmtefonds application',
      desc: 'SolarFast guides you through the application with the National Warmtefonds. We handle all the paperwork and ensure you get the maximum loan.',
      cta: null,
    },
    {
      num: '03',
      title: 'Installation & savings',
      desc: 'Our certified technicians install your battery. From day 1 your savings begin, with which you comfortably repay the loan.',
      cta: null,
    },
  ]

  const faqs = nl ? [
    {
      q: 'Wie kan een lening aanvragen bij het Nationaal Warmtefonds?',
      a: 'Eigenaar-bewoners van een eigen woning in Nederland die willen investeren in energiebesparende maatregelen, waaronder thuisbatterijen. U heeft geen uitstekende kredietwaardigheid nodig. Het Warmtefonds kijkt naar de woning, niet alleen naar uw inkomen.',
    },
    {
      q: 'Tot hoeveel kan ik lenen voor een HYXiPower batterij?',
      a: 'Via het Nationaal Warmtefonds kunt u tot € 8.500 lenen specifiek voor energieopslag. Dit dekt doorgaans de volledige installatie van een HYXiPower All-in-One inclusief installatie.',
    },
    {
      q: 'Hoe werkt de 0% rente?',
      a: 'Heeft u een inkomen onder € 60.000 bruto per jaar? Dan betaalt u 0% rente op uw lening via het Nationaal Warmtefonds. Heeft u een hoger inkomen? Dan geldt een marktconform, laag rentetarief.',
    },
    {
      q: 'Hoe lang duurt de aanvraagprocedure?',
      a: 'Met onze begeleiding duurt de aanvraag doorgaans 5 tot 10 werkdagen. Wij verzorgen alle communicatie met het Warmtefonds en houden u op de hoogte van elke stap.',
    },
    {
      q: 'Kan ik ook subsidie combineren met een Warmtefondslenening?',
      a: 'Ja, u kunt de Warmtefondslenening combineren met subsidies zoals de ISDE (Investeringssubsidie Duurzame Energie). SolarFast adviseert u over alle beschikbare regelingen.',
    },
    {
      q: 'Wat als ik mijn woning verkoop?',
      a: 'De lening is gekoppeld aan de woning. Bij verkoop lost u het resterende bedrag af uit de verkoopopbrengst. De batterij verhoogt doorgaans de waarde van uw woning.',
    },
  ] : [
    {
      q: 'Who can apply for a loan from the National Warmtefonds?',
      a: 'Owner-occupiers of their own home in the Netherlands who want to invest in energy-saving measures, including home batteries. You do not need an excellent credit rating. The Warmtefonds looks at the property, not just your income.',
    },
    {
      q: 'How much can I borrow for an HYXiPower battery?',
      a: 'Via the National Warmtefonds you can borrow up to €8,500 specifically for energy storage. This typically covers the full installation of an HYXiPower All-in-One including installation.',
    },
    {
      q: 'How does the 0% interest work?',
      a: 'Do you have an income below €60,000 gross per year? Then you pay 0% interest on your loan via the National Warmtefonds. Do you have a higher income? Then a market-rate, low interest rate applies.',
    },
    {
      q: 'How long does the application process take?',
      a: 'With our guidance, the application typically takes 5 to 10 working days. We handle all communication with the Warmtefonds and keep you informed of every step.',
    },
    {
      q: 'Can I also combine subsidies with a Warmtefonds loan?',
      a: 'Yes, you can combine the Warmtefonds loan with subsidies such as ISDE (Investment Subsidy Sustainable Energy). SolarFast advises you on all available schemes.',
    },
    {
      q: 'What if I sell my home?',
      a: 'The loan is linked to the property. When selling, you repay the remaining amount from the sales proceeds. The battery generally increases the value of your home.',
    },
  ]

  const calcRows = nl ? [
    { label: 'Totale investering', value: '€ 8.000', note: '' },
    { label: 'Warmtefonds lening', value: '€ 8.000', note: '0% rente*', green: true },
    { label: 'Eigen inleg', value: '€ 0', note: 'niets vooraf', green: true },
    { label: 'Jaarlijkse besparing', value: '€ 1.400', note: 'gemiddeld', green: true },
    { label: 'Maandlast lening', value: '€ 70', note: '10 jaar looptijd' },
    { label: 'Maandelijkse winst', value: '€ 47', note: 'netto voordeel', green: true },
  ] : [
    { label: 'Total investment', value: '€ 8,000', note: '' },
    { label: 'Warmtefonds loan', value: '€ 8,000', note: '0% interest*', green: true },
    { label: 'Own contribution', value: '€ 0', note: 'nothing upfront', green: true },
    { label: 'Annual savings', value: '€ 1,400', note: 'average', green: true },
    { label: 'Monthly loan cost', value: '€ 70', note: '10 year term' },
    { label: 'Monthly profit', value: '€ 47', note: 'net benefit', green: true },
  ]

  const eligibility = nl ? [
    { title: 'Eigenaar-bewoner', desc: 'U woont in uw eigen koopwoning in Nederland.' },
    { title: 'Investering in energieopslag', desc: 'Een thuisbatterij kwalificeert als energiebesparende maatregel.' },
    { title: 'Geen BKR-blokkade', desc: 'U heeft geen actieve kredietblokkering bij het BKR.' },
    { title: '0% rente bij inkomen ≤ €60.000', desc: 'Huurders en hogere inkomens komen ook in aanmerking tegen marktconform tarief.' },
  ] : [
    { title: 'Owner-occupier', desc: 'You live in your own owner-occupied home in the Netherlands.' },
    { title: 'Investment in energy storage', desc: 'A home battery qualifies as an energy-saving measure.' },
    { title: 'No BKR block', desc: 'You do not have an active credit block with the BKR.' },
    { title: '0% interest with income ≤ €60,000', desc: 'Renters and higher incomes are also eligible at market rates.' },
  ]

  const loanTiers = nl ? [
    { title: 'Inkomen ≤ €60.000', rate: '0,0% rente', max: 'Tot €8.500', term: 'Max. 10 jaar', highlight: true },
    { title: 'Inkomen > €60.000', rate: 'Laag tarief', max: 'Tot €8.500', term: 'Max. 10 jaar', highlight: false },
  ] : [
    { title: 'Income ≤ €60,000', rate: '0.0% interest', max: 'Up to €8,500', term: 'Max. 10 years', highlight: true },
    { title: 'Income > €60,000', rate: 'Low rate', max: 'Up to €8,500', term: 'Max. 10 years', highlight: false },
  ]

  return (
    <div className="min-h-screen bg-white text-[#131A20] font-['Plus_Jakarta_Sans']">
      <Nav />

      {/* ── HERO ── */}
      <section className="pt-28 pb-20 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full mb-7">
                <Building2 className="w-3.5 h-3.5" />
                {nl ? 'SolarFast × Nationaal Warmtefonds' : 'SolarFast × National Warmtefonds'}
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}
                className="text-4xl lg:text-5xl font-extrabold leading-[1.08] tracking-tight mb-5">
                {nl ? (
                  <>Batterij nu,<br /><span className="text-[#22a55d]">betalen later</span><br />met 0% rente</>
                ) : (
                  <>Battery now,<br /><span className="text-[#22a55d]">pay later</span><br />at 0% interest</>
                )}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.16 }}
                className="text-lg text-[#131A20]/55 leading-relaxed mb-8 max-w-md">
                {nl
                  ? <>Via onze samenwerking met het Nationaal Warmtefonds kunt u tot € 8.500 lenen voor uw HYXiPower batterij. Bij een inkomen onder € 60.000 betaalt u <strong className="text-[#131A20]">0% rente</strong>. Wij regelen alles voor u.</>
                  : <>Via our partnership with the National Warmtefonds you can borrow up to €8,500 for your HYXiPower battery. With an income below €60,000 you pay <strong className="text-[#131A20]">0% interest</strong>. We arrange everything for you.</>}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.22 }}
                className="flex flex-wrap gap-3 mb-10">
                <button onClick={() => navigate('/calculator')}
                  className="flex items-center gap-2 bg-[#22a55d] hover:bg-[#1a9050] text-white font-semibold px-7 py-3.5 rounded-full transition-all hover:shadow-xl hover:shadow-green-500/25 text-sm">
                  {nl ? 'Bereken mijn besparing' : 'Calculate my savings'} <ArrowRight className="w-4 h-4" />
                </button>
                <a href="mailto:info@solarfast.nl?subject=Warmtefonds%20aanvraag"
                  className="flex items-center gap-2 border border-gray-200 hover:border-gray-300 text-[#131A20] font-medium px-7 py-3.5 rounded-full transition-all text-sm hover:bg-gray-50">
                  {nl ? 'Direct aanvragen' : 'Apply directly'}
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap items-center gap-8">
                {[
                  { val: '€ 8.500', label: nl ? 'Max. lening' : 'Max. loan' },
                  { val: '0%', label: nl ? 'Rente mogelijk' : 'Interest possible' },
                  { val: '120 mnd', label: nl ? 'Max. looptijd' : 'Max. term' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl font-extrabold text-[#131A20]">{s.val}</div>
                    <div className="text-xs text-[#131A20]/45 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.96, x: 24 }} animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.12, ease }} className="relative">
              <div className="bg-[#EEF6F1] rounded-3xl p-8 border border-[#22a55d]/10">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#22a55d] mb-2">
                  {nl ? 'Voorbeeld berekening' : 'Example calculation'}
                </div>
                <div className="text-[#131A20]/45 text-xs mb-5">
                  {nl ? 'HYXiPower 10,6 kWh, €8.000 investering' : 'HYXiPower 10.6 kWh, €8,000 investment'}
                </div>
                <div className="space-y-4 mb-6">
                  {calcRows.map((row, i) => (
                    <div key={i} className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-semibold text-[#131A20]/55">{row.label}</div>
                        {row.note && <div className="text-[10px] text-[#131A20]/35 mt-0.5">{row.note}</div>}
                      </div>
                      <span className={`text-sm font-bold flex-shrink-0 ${row.green ? 'text-[#22a55d]' : 'text-[#131A20]'}`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-[#22a55d]/10">
                  <div className="text-[10px] text-[#131A20]/40 leading-relaxed">
                    {nl
                      ? '* Bij inkomen onder €60.000. Indicatieve berekening. Werkelijke condities afhankelijk van uw situatie.'
                      : '* For income below €60,000. Indicative calculation. Actual conditions depend on your situation.'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOE WERKT HET ── */}
      <section className="py-28 bg-[#F9F7F4]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white text-[#131A20]/50 text-xs font-semibold px-4 py-2 rounded-full mb-5 border border-gray-100">
              <Zap className="w-3.5 h-3.5 text-[#22a55d]" />
              {nl ? 'Van aanvraag tot installatie' : 'From application to installation'}
            </div>
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
              {nl ? 'In drie stappen geregeld' : 'Arranged in three steps'}
            </h2>
            <p className="text-[#131A20]/55 text-lg max-w-xl mx-auto">
              {nl
                ? 'SolarFast begeleidt u bij elke stap. U hoeft zelf niets te regelen met het Warmtefonds.'
                : 'SolarFast guides you at every step. You don\'t have to arrange anything with the Warmtefonds yourself.'}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {stappen.map((s, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="bg-white rounded-3xl p-8 h-full border border-gray-50 hover:shadow-lg hover:shadow-gray-100 transition-all hover:-translate-y-1 duration-300">
                  <div className="text-5xl font-extrabold text-[#22a55d]/15 mb-4">{s.num}</div>
                  <h3 className="font-bold text-base text-[#131A20] mb-3">{s.title}</h3>
                  <p className="text-sm text-[#131A20]/55 leading-relaxed mb-5">{s.desc}</p>
                  {s.cta && (
                    <button onClick={() => navigate('/calculator')}
                      className="inline-flex items-center gap-1.5 text-[#22a55d] font-semibold text-sm hover:gap-2.5 transition-all">
                      {s.cta} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VOORWAARDEN ── */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-[#22a55d]/10 text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full mb-6">
                <Users className="w-3.5 h-3.5" />
                {nl ? 'Voor wie is dit?' : 'Who is this for?'}
              </div>
              <h2 className="text-4xl font-extrabold leading-tight mb-5 tracking-tight">
                {nl ? <>Wie komt in<br />aanmerking?</> : <>Who is<br />eligible?</>}
              </h2>
              <p className="text-[#131A20]/55 leading-relaxed mb-7">
                {nl
                  ? 'Het Nationaal Warmtefonds is opgericht door de overheid om Nederlandse huishoudens te helpen verduurzamen. De voorwaarden zijn bewust laagdrempelig gehouden.'
                  : 'The National Warmtefonds was established by the government to help Dutch households become more sustainable. The conditions are deliberately kept accessible.'}
              </p>

              <div className="space-y-4 mb-8">
                {eligibility.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-[#F9F7F4]">
                    <div className="w-8 h-8 rounded-xl bg-[#22a55d]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-[#22a55d]" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#131A20]">{item.title}</div>
                      <div className="text-sm text-[#131A20]/50 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={1}>
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 bg-[#22a55d]/10 text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full mb-6">
                  <Euro className="w-3.5 h-3.5" />
                  {nl ? 'Leenvoorwaarden' : 'Loan conditions'}
                </div>
                <h3 className="text-2xl font-extrabold mb-5">
                  {nl ? 'Tarieven & looptijden' : 'Rates & terms'}
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {loanTiers.map((tier, i) => (
                    <div key={i} className={`rounded-3xl p-6 border ${tier.highlight ? 'bg-[#22a55d] border-[#22a55d]' : 'bg-[#F9F7F4] border-gray-100'}`}>
                      <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${tier.highlight ? 'text-white/80' : 'text-[#131A20]/40'}`}>
                        {tier.title}
                      </div>
                      <div className={`text-3xl font-extrabold mb-4 ${tier.highlight ? 'text-white' : 'text-[#131A20]'}`}>
                        {tier.rate}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: nl ? 'Maximaal' : 'Maximum', val: tier.max },
                          { label: nl ? 'Looptijd' : 'Term', val: tier.term },
                        ].map((d, j) => (
                          <div key={j}>
                            <div className={`text-[10px] font-semibold uppercase tracking-wider mb-1 ${tier.highlight ? 'text-white/60' : 'text-[#131A20]/35'}`}>{d.label}</div>
                            <div className={`text-sm font-bold ${tier.highlight ? 'text-white' : 'text-[#131A20]'}`}>{d.val}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 rounded-2xl p-4 flex items-start gap-3">
                  <Shield className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-700 leading-relaxed">
                    {nl
                      ? 'Het Nationaal Warmtefonds is een initiatief van de Nederlandse overheid. Uw lening is daarmee gegarandeerd betrouwbaar en transparant.'
                      : 'The National Warmtefonds is an initiative of the Dutch government. Your loan is therefore guaranteed to be reliable and transparent.'}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-28 bg-[#F9F7F4]">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
              {nl ? 'Veelgestelde vragen' : 'Frequently asked questions'}
            </h2>
            <p className="text-[#131A20]/55 max-w-xl mx-auto">
              {nl
                ? 'Alles wat u wilt weten over de Warmtefondslenening via SolarFast.'
                : 'Everything you want to know about the Warmtefonds loan via SolarFast.'}
            </p>
          </Reveal>
          <Reveal>
            <div className="bg-white rounded-3xl border border-gray-100 px-7 divide-y-0">
              {faqs.map((faq, i) => (
                <FAQ key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PARTNER STRIP ── */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#131A20]/30">
              {nl ? 'Onze partners' : 'Our partners'}
            </p>
          </Reveal>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {[
              { name: nl ? 'Nationaal Warmtefonds' : 'National Warmtefonds', icon: <Building2 className="w-5 h-5" /> },
              { name: 'HYXiPower', icon: <Battery className="w-5 h-5" /> },
              { name: 'EPEX SPOT', icon: <Zap className="w-5 h-5" /> },
              { name: 'TÜV Rheinland', icon: <Award className="w-5 h-5" /> },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex items-center gap-2.5 text-[#131A20]/35 hover:text-[#131A20]/60 transition-colors">
                  {p.icon}
                  <span className="font-semibold text-sm">{p.name}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 bg-[#EEF6F1]">
        <div className="max-w-3xl mx-auto text-center px-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-[#22a55d]/15 text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full mb-7">
              <Coins className="w-3.5 h-3.5" />
              {nl ? 'Warmtefonds partner' : 'Warmtefonds partner'}
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#131A20] mb-5 leading-tight tracking-tight">
              {nl
                ? <>Begin vandaag,<br />betaal pas als de besparing loopt</>
                : <>Start today,<br />pay only when the savings are running</>}
            </h2>
            <p className="text-[#131A20]/55 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              {nl
                ? 'Bereken eerst uw persoonlijke besparing. Dan zorgen wij voor de rest, inclusief de Warmtefondsaanvraag.'
                : 'First calculate your personal savings. Then we take care of the rest, including the Warmtefonds application.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/calculator')}
                className="inline-flex items-center justify-center gap-3 bg-[#22a55d] hover:bg-[#1a9050] text-white font-bold px-8 py-4 rounded-full transition-all hover:shadow-2xl hover:shadow-green-500/25 text-base">
                {nl ? 'Bereken mijn besparing' : 'Calculate my savings'} <ArrowRight className="w-5 h-5" />
              </button>
              <a href="mailto:info@solarfast.nl?subject=Warmtefonds%20aanvraag"
                className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-[#131A20] font-semibold px-8 py-4 rounded-full transition-all text-base border border-gray-200">
                <Phone className="w-4 h-4" />
                {nl ? 'Contact opnemen' : 'Contact us'}
              </a>
            </div>
            <p className="mt-5 text-xs text-[#131A20]/35">
              {nl ? 'Volledig vrijblijvend · Wij regelen het papierwerk' : 'Completely free of obligation · We handle the paperwork'}
            </p>
          </Reveal>
        </div>
      </section>

      <footer className="bg-[#F9F7F4] border-t border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-lg font-extrabold text-[#131A20]">SOLAR<span style={{ color: '#22a55d' }}>FAST</span></span>
          <p className="text-sm text-[#131A20]/40">
            {nl ? 'Partner van het Nationaal Warmtefonds' : 'Partner of the National Warmtefonds'}
          </p>
          <div className="flex items-center gap-2 text-xs text-[#131A20]/40">
            <Shield className="w-3.5 h-3.5 text-[#22a55d]" />
            <span>{nl ? 'Officieel partner' : 'Official partner'}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
