import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle2, ArrowRight, Shield, Award, Wrench, Heart,
  Euro, Zap, Star, Battery, Leaf, Phone, Users
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

export default function WaaromSolarFastPage() {
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const nl = lang === 'nl'

  const reasons = [
    {
      icon: <Award className="w-6 h-6 text-[#22a55d]" />,
      title: nl ? 'HYXiPower partner' : 'HYXiPower partner',
      desc: nl
        ? 'SolarFast is HYXiPower partner in Nederland. Wij installeren en ondersteunen de HYXiPower All-in-One: LiFePO4-batterijtechnologie met een slim Energy Management System.'
        : 'SolarFast is a HYXiPower partner in the Netherlands. We install and support the HYXiPower All-in-One: LiFePO4 battery technology with a smart Energy Management System.',
    },
    {
      icon: <Wrench className="w-6 h-6 text-[#22a55d]" />,
      title: nl ? 'Gecertificeerde installatie — uitsluitend eigen monteurs' : 'Certified installation — exclusively our own technicians',
      desc: nl
        ? 'Alle installaties worden uitsluitend uitgevoerd door onze eigen gecertificeerde monteurs. Geen onderaannemers. Gemiddeld een halve dag, altijd op tijd, zonder verborgen kosten.'
        : 'All installations are carried out exclusively by our own certified technicians. No subcontractors. Average half a day, always on time, no hidden costs.',
    },
    {
      icon: <Euro className="w-6 h-6 text-[#22a55d]" />,
      title: nl ? 'Warmtefonds begeleiding, 0% rente mogelijk' : 'Warmtefonds guidance, 0% interest possible',
      desc: nl
        ? 'Wij begeleiden u bij de aanvraag van een Energiebespaarlening via het Nationaal Warmtefonds. Tot 8.500 euro lenen, bij inkomen onder 60.000 euro mogelijk met 0% rente. Voorwaarden kunnen wijzigen.'
        : 'We guide you through applying for an Energy Savings Loan via the National Warmtefonds. Borrow up to 8,500 euros; with income below 60,000 euros possibly at 0% interest. Terms may change.',
    },
    {
      icon: <Heart className="w-6 h-6 text-[#22a55d]" />,
      title: nl ? 'Persoonlijk & eerlijk advies, geen druk' : 'Personal & honest advice, no pressure',
      desc: nl
        ? 'Geen standaardpakket, geen verkoopdruk. Wij analyseren uw energierekening en adviseren de batterijcapaciteit die voor u het meeste oplevert. Eerlijk en transparant.'
        : 'No standard packages, no sales pressure. We analyse your energy bill and advise the battery capacity that delivers the most for you. Honest and transparent.',
    },
    {
      icon: <Phone className="w-6 h-6 text-[#22a55d]" />,
      title: nl ? 'Monitoring & service na installatie' : 'Monitoring & service after installation',
      desc: nl
        ? 'Na installatie stopt het niet. Wij activeren de app, leggen alles stap voor stap uit en blijven bereikbaar voor vragen, monitoring en service.'
        : 'We do not stop after installation. We activate the app, explain everything step by step and remain reachable for questions, monitoring and service.',
    },
    {
      icon: <Shield className="w-6 h-6 text-[#22a55d]" />,
      title: nl ? 'All-in offerte, niks extra' : 'All-in quote, nothing extra',
      desc: nl
        ? 'Uw offerte bevat alles: batterij, hybride omvormer, installatie en BTW. Geen verborgen kosten, geen verrassingen achteraf. Wat u ziet is wat u betaalt.'
        : 'Your quote includes everything: battery, hybrid inverter, installation and VAT. No hidden costs, no surprises. What you see is what you pay.',
    },
    {
      icon: <Zap className="w-6 h-6 text-[#22a55d]" />,
      title: nl ? 'Monitoring via app inbegrepen' : 'App monitoring included',
      desc: nl
        ? 'Monitoring via de app is inbegrepen bij uw systeem, zonder extra abonnementskosten. U ziet realtime hoeveel uw batterij opslaat en verbruikt.'
        : 'App monitoring is included with your system, with no extra subscription costs. You see in real time how much your battery stores and uses.',
    },
  ]

  const stappen = [
    {
      num: '01',
      title: nl ? 'Gratis persoonlijke berekening' : 'Free personal calculation',
      desc: nl
        ? 'Gebruik onze gratis calculator. In 2 minuten ziet u uw exacte besparing, terugverdientijd en het meest passende systeem voor uw situatie, helemaal op maat.'
        : 'Use our free calculator. In 2 minutes you see your exact savings, payback period and the most suitable system for your situation, fully tailored.',
      badge: nl ? '2 minuten, geen registratie' : '2 minutes, no registration',
    },
    {
      num: '02',
      title: nl ? 'Adviesgesprek aan tafel' : 'In-person consultation',
      desc: nl
        ? 'Onze specialist komt bij u langs, analyseert uw energierekening en situatie grondig. U ontvangt eerlijk advies en een transparante offerte, volledig vrijblijvend.'
        : 'Our specialist visits you, analyses your energy bill and situation thoroughly. You receive honest advice and a transparent quote, completely free of obligation.',
      badge: nl ? 'Vrijblijvend, bij u thuis' : 'Free of obligation, at your home',
    },
    {
      num: '03',
      title: nl ? 'Warmtefonds regelen indien gewenst' : 'Warmtefonds financing if desired',
      desc: nl
        ? 'Wilt u financieren via het Nationaal Warmtefonds? Wij begeleiden u bij de volledige aanvraag. Wij helpen u met het papierwerk van A tot Z.'
        : 'Want to finance via the National Warmtefonds? We guide you through the complete application. We help you with the paperwork from A to Z.',
      badge: nl ? 'Wij helpen u hierbij' : 'We help you with this',
    },
    {
      num: '04',
      title: nl ? 'Installatie & direct besparen' : 'Installation & save immediately',
      desc: nl
        ? 'Onze gecertificeerde monteurs installeren de batterij vakkundig. Gemiddeld een halve dag. Daarna activeren wij de app en lopen we alles met u door. Vanaf dag 1 bespaart u.'
        : 'Our certified technicians install the battery expertly. Average half a day. We then activate the app and walk you through everything. From day 1 you save.',
    },
  ]

  const table = [
    {
      crit: nl ? 'Merk' : 'Brand',
      voltrax: nl ? 'Gespecialiseerd in HYXiPower' : 'Specialised in HYXiPower',
      andere: nl ? 'Vaak meerdere merken' : 'Often multiple brands',
    },
    {
      crit: nl ? 'Installatie' : 'Installation',
      voltrax: nl ? 'Eigen monteurs, geen onderaannemers' : 'Own technicians, no subcontractors',
      andere: nl ? 'Werkwijze verschilt per aanbieder' : 'Approach varies by provider',
    },
    {
      crit: nl ? 'Warmtefonds financiering' : 'Warmtefonds financing',
      voltrax: nl ? 'Wij begeleiden de volledige aanvraag' : 'We guide the full application',
      andere: nl ? 'Niet elke aanbieder biedt dit aan' : 'Not every provider offers this',
    },
    {
      crit: nl ? 'Offerte' : 'Quote',
      voltrax: nl ? 'All-in, geen verborgen kosten' : 'All-in, no hidden costs',
      andere: nl ? 'Verschilt per aanbieder' : 'Varies by provider',
    },
    {
      crit: nl ? 'Na-service' : 'After-service',
      voltrax: nl ? 'Bereikbaar voor vragen na installatie' : 'Reachable for questions after installation',
      andere: nl ? 'Verschilt per aanbieder' : 'Varies by provider',
    },
    {
      crit: nl ? 'Softwarekosten' : 'Software costs',
      voltrax: nl ? 'Monitoring via app inbegrepen' : 'App monitoring included',
      andere: nl ? 'Verschilt per aanbieder' : 'Varies by provider',
    },
  ]

  const reviewCards = [
    {
      photo: '/assets/installaties/install-01.jpg',
      title: nl ? 'Persoonlijk energieadvies' : 'Personal energy advice',
      text: nl
        ? 'Wij analyseren uw energieverbruik en adviseren de batterijcapaciteit die het beste bij uw situatie past. Geen standaardpakket, geen verkoopdruk.'
        : 'We analyse your energy usage and advise the battery capacity that best fits your situation. No standard packages, no sales pressure.',
    },
    {
      photo: '/assets/installaties/install-02.jpg',
      title: nl ? 'Realtime inzicht via de app' : 'Real-time insight via the app',
      text: nl
        ? 'De app is gemakkelijk te gebruiken en zeer duidelijk. U weet direct hoeveel procent er nog in de batterij aanwezig is, hoeveel uw zonnepanelen opbrengen en hoeveel u van het net moet nemen.'
        : 'The app is easy to use and very clear. You immediately know how much charge is in the battery, how much your solar panels are generating and how much you need from the grid.',
    },
    {
      photo: '/assets/installaties/install-technician.jpg',
      title: nl ? 'Vakkundige installatie' : 'Expert installation',
      text: nl
        ? 'Onze eigen gecertificeerde monteurs plaatsen uw systeem vakkundig en beantwoorden geduldig al uw vragen tijdens de installatie.'
        : 'Our own certified technicians install your system expertly and patiently answer all your questions during installation.',
    },
    {
      photo: '/assets/installaties/install-03.jpg',
      title: nl ? 'Ondersteuning na installatie' : 'Support after installation',
      text: nl
        ? 'Ook na oplevering blijven wij bereikbaar voor vragen over uw systeem of de app. Via de app kunt u perfect uw productie en verbruik opvolgen.'
        : 'Even after delivery we remain available for questions about your system or the app. Via the app you can perfectly track your production and consumption.',
    },
  ]

  const extraPhotos = [
    { src: '/assets/installaties/install-04.jpg', alt: 'HYXiPower installatie' },
    { src: '/assets/installaties/install-11.jpg', alt: 'HYXiPower installatie' },
    { src: '/assets/installaties/install-06.jpg', alt: 'HYXiPower installatie' },
    { src: '/assets/installaties/install-07.jpg', alt: 'HYXiPower installatie garage' },
    { src: '/assets/installaties/install-08.jpg', alt: 'HYXiPower installatie zolder' },
    { src: '/assets/installaties/install-09.jpg', alt: 'HYXiPower installatie bijkeuken' },
    { src: '/assets/installaties/install-10.jpg', alt: 'HYXiPower installatie buiten' },
    { src: '/assets/installaties/install-05.jpg', alt: 'HYXiPower installatie' },
    { src: '/assets/installaties/install-detail.jpg', alt: 'HYXiPower installatie kelder' },
  ]

  return (
    <div className="min-h-screen bg-white text-[#131A20] font-['Plus_Jakarta_Sans']">
      <Nav />

      {/* ── HERO ── */}
      <section className="pt-28 pb-0 bg-[#EEF6F1] overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-[#22a55d]/8" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#22a55d]/4" />
        </div>
        <div className="max-w-6xl mx-auto px-6 pt-14 pb-0 relative">
          <div className="grid lg:grid-cols-2 gap-14 items-start pb-16">
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-[#22a55d]/15 text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full mb-8">
                <Battery className="w-3.5 h-3.5" />
                {nl ? 'HYXiPower partner Nederland' : 'HYXiPower partner Netherlands'}
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }}
                className="text-5xl lg:text-6xl font-extrabold leading-[1.06] tracking-tight mb-6 text-[#131A20]">
                {nl
                  ? <> Waarom kiezen voor <span className="text-[#22a55d]">SolarFast</span>? </>
                  : <> Why choose <span className="text-[#22a55d]">SolarFast</span>? </>}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.16 }}
                className="text-lg text-[#131A20]/60 leading-relaxed mb-10 max-w-xl">
                {nl
                  ? 'SolarFast helpt u een duurzamere woning te realiseren. Als HYXiPower partner begeleiden wij u van energieadvies tot installatie, financiering en jarenlange service. Goed voor uw portemonnee en goed voor het milieu.'
                  : 'SolarFast helps you create a more sustainable home. As a HYXiPower partner we guide you from energy advice to installation, financing and years of service. Good for your wallet and for the environment.'}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.24 }}
                className="flex flex-wrap gap-3">
                <button onClick={() => navigate('/calculator')}
                  className="flex items-center gap-2 bg-[#22a55d] hover:bg-[#1a9050] text-white font-semibold px-7 py-3.5 rounded-full transition-all hover:shadow-xl hover:shadow-green-500/25 text-sm">
                  {nl ? 'Bereken mijn besparing' : 'Calculate my savings'} <ArrowRight className="w-4 h-4" />
                </button>
                <a href="mailto:info@solarfast.nl?subject=Advies"
                  className="flex items-center gap-2 border border-[#22a55d]/30 text-[#131A20]/70 hover:border-[#22a55d] hover:text-[#22a55d] font-medium px-7 py-3.5 rounded-full transition-all text-sm bg-white">
                  {nl ? 'Stel een vraag' : 'Ask a question'}
                </a>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center py-4"
            >
              <div className="absolute w-[65%] aspect-square rounded-full bg-[#22a55d]/18 blur-3xl" />
              <div className="absolute w-[40%] aspect-square rounded-full bg-[#22a55d]/12 blur-xl" />
              <img
                src="/assets/hyxipower-battery-3d.png"
                alt="HYXiPower All-in-One thuisbatterij"
                className="relative mx-auto"
                style={{
                  height: 490,
                  width: 'auto',
                  filter: 'drop-shadow(0 32px 56px rgba(0,0,0,0.20)) drop-shadow(0 8px 18px rgba(34,165,93,0.13))',
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="max-w-6xl mx-auto px-6 pb-12 border-t border-[#22a55d]/12 pt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: '0 euro', label: nl ? 'Softwarekosten, HYXiPower Cloud altijd gratis' : 'Software costs, HYXiPower Cloud always free', icon: <Zap className="w-4 h-4 text-[#22a55d]" /> },
              { val: 'LFP', label: nl ? 'Celtechnologie met fabrieksgarantie' : 'Cell technology with factory warranty', icon: <Shield className="w-4 h-4 text-[#22a55d]" /> },
              { val: '0%', label: nl ? 'Rente mogelijk via Warmtefonds' : 'Interest possible via Warmtefonds', icon: <Euro className="w-4 h-4 text-[#22a55d]" /> },
              { val: 'All-in', label: nl ? 'Offerte, geen verborgen kosten' : 'Quote, no hidden costs', icon: <CheckCircle2 className="w-4 h-4 text-[#22a55d]" /> },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                className="text-center">
                <div className="flex justify-center mb-2">{s.icon}</div>
                <div className="text-2xl lg:text-3xl font-extrabold text-[#131A20] mb-1">{s.val}</div>
                <div className="text-xs text-[#131A20]/45 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7 REASONS ── */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#22a55d]/10 text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full mb-5">
              <Star className="w-3.5 h-3.5" /> {nl ? 'Onze onderscheidende factoren' : 'Our differentiating factors'}
            </div>
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
              {nl ? 'Wat u van ons mag verwachten' : 'What you can expect from us'}
            </h2>
            <p className="text-[#131A20]/55 text-lg max-w-2xl mx-auto leading-relaxed">
              {nl
                ? 'Van het eerste gesprek tot de allerlaatste kWh. Wij staan naast u op elk moment van uw energiereis.'
                : 'From the first conversation to the very last kWh. We stand by you at every step of your energy journey.'}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reasons.map((r, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-[#F9F7F4] rounded-3xl p-7 h-full hover:shadow-xl hover:shadow-black/6 transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                  <div className="w-12 h-12 rounded-2xl bg-[#22a55d]/10 flex items-center justify-center mb-5">
                    {r.icon}
                  </div>
                  <h3 className="font-bold text-base mb-2.5 text-[#131A20]">{r.title}</h3>
                  <p className="text-sm text-[#131A20]/55 leading-relaxed">{r.desc}</p>
                  {r.badge && (
                    <span className="inline-block mt-4 text-xs bg-[#22a55d]/10 text-[#22a55d] font-semibold px-3 py-1 rounded-full">{r.badge}</span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="py-28 bg-[#F9F7F4]">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-100 text-[#131A20]/50 text-xs font-semibold px-4 py-2 rounded-full mb-5">
              {nl ? 'Van A tot Z geregeld' : 'Arranged from A to Z'}
            </div>
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
              {nl ? 'Hoe wij werken' : 'How we work'}
            </h2>
            <p className="text-[#131A20]/55 text-lg max-w-xl mx-auto">
              {nl ? 'Vier stappen. Geen gedoe. U hoeft niets te regelen.' : "Four steps. No hassle. You don't have to arrange anything."}
            </p>
          </Reveal>
          <div className="space-y-4">
            {stappen.map((s, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="bg-white rounded-3xl p-7 flex gap-6 items-start shadow-sm border border-gray-100 hover:shadow-md hover:shadow-gray-100 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#22a55d]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-extrabold text-[#22a55d]">{s.num}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1.5">{s.title}</h3>
                    <p className="text-sm text-[#131A20]/60 leading-relaxed mb-3">{s.desc}</p>
                    <span className="text-xs bg-[#22a55d]/10 text-[#22a55d] font-semibold px-3 py-1 rounded-full">{s.badge}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── KLANTENVERHALEN MET FOTO ── */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#22a55d]/10 text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full mb-5">
              <Users className="w-3.5 h-3.5" />
              {nl ? 'Tevreden klanten aan het woord' : 'Satisfied customers speak'}
            </div>
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
              {nl ? 'Echte installaties, echte ervaringen' : 'Real installations, real experiences'}
            </h2>
            <p className="text-[#131A20]/55 text-lg max-w-xl mx-auto leading-relaxed">
              {nl
                ? 'Elke foto is een installatie bij een klant thuis, vakkundig uitgevoerd door onze eigen monteurs.'
                : "Every photo is an installation at a customer's home, expertly carried out by our own technicians."}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviewCards.map((card, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={card.photo}
                      alt="HYXiPower installatie"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="text-sm font-bold text-[#131A20] mb-2">{card.title}</div>
                    <p className="text-sm text-[#131A20]/70 leading-relaxed flex-1">
                      {card.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEER INSTALLATIES ── */}
      <section className="py-16 bg-[#F9F7F4]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-10">
            <p className="text-[#131A20]/50 text-sm font-semibold uppercase tracking-widest">
              {nl ? 'Nog meer installaties bij klanten thuis' : 'More installations at customer homes'}
            </p>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {extraPhotos.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="rounded-2xl overflow-hidden aspect-square">
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#22a55d]/10 text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full mb-5">
              {nl ? 'Eerlijke vergelijking' : 'Honest comparison'}
            </div>
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
              {nl ? 'SolarFast vs. andere dealers' : 'SolarFast vs. other dealers'}
            </h2>
            <p className="text-[#131A20]/55 max-w-xl mx-auto leading-relaxed">
              {nl
                ? 'Wij vergelijken eerlijk. Dit zijn de concrete verschillen die bepalen of u de juiste keuze maakt.'
                : 'We compare honestly. These are the concrete differences that determine whether you make the right choice.'}
            </p>
          </Reveal>
          <Reveal>
            <div className="bg-[#F9F7F4] rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="grid grid-cols-3 bg-[#22a55d] text-xs font-bold uppercase tracking-widest">
                <div className="p-4 text-white/70">{nl ? 'Criterium' : 'Criterion'}</div>
                <div className="p-4 text-white flex items-center gap-2">
                  <Battery className="w-3.5 h-3.5" /> SolarFast
                </div>
                <div className="p-4 text-white/70">{nl ? 'Andere dealers' : 'Other dealers'}</div>
              </div>
              {table.map((row, i) => (
                <div key={i} className={`grid grid-cols-3 border-b border-gray-50 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#fafaf9]'}`}>
                  <div className="p-4 text-sm font-semibold text-[#131A20]/60">{row.crit}</div>
                  <div className="p-4 text-sm text-[#22a55d] font-semibold flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {row.voltrax}
                  </div>
                  <div className="p-4 text-sm text-[#131A20]/45">{row.andere}</div>
                </div>
              ))}
            </div>
          </Reveal>
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
              {nl ? 'Kosteloos, geen registratie vereist' : 'Free, no registration required'}
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight tracking-tight">
              {nl ? 'Ontdek wat een batterij voor u betekent' : 'Discover what a battery means for you'}
            </h2>
            <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              {nl
                ? 'Vul uw verbruik in en zie in 2 minuten uw persoonlijke besparing en terugverdientijd.'
                : 'Enter your consumption and see your personal savings and payback period in 2 minutes.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/calculator')}
                className="inline-flex items-center justify-center gap-3 bg-white hover:bg-green-50 text-[#22a55d] font-bold px-8 py-4 rounded-full transition-all hover:shadow-2xl hover:shadow-black/10 text-base">
                {nl ? 'Start de berekening' : 'Start the calculation'} <ArrowRight className="w-5 h-5" />
              </button>
              <a href="mailto:info@solarfast.nl?subject=Advies"
                className="inline-flex items-center justify-center gap-3 bg-white/15 hover:bg-white/25 text-white font-semibold px-8 py-4 rounded-full transition-all text-base border border-white/30">
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
            <img src="/assets/solarfast-logo.png" alt="SolarFast" className="h-9 w-auto mb-3" />
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
