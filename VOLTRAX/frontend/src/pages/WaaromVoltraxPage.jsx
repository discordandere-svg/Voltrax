import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle2, ArrowRight, Shield, Award, Wrench, Heart,
  Euro, Zap, Star, Battery, Leaf, Phone, Users, MapPin
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

function StarRow() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

export default function WaaromVoltraxPage() {
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const nl = lang === 'nl'

  const reasons = [
    {
      icon: <Award className="w-6 h-6 text-[#22a55d]" />,
      title: nl ? 'Officieel gecertificeerd AlphaESS dealer' : 'Officially certified AlphaESS dealer',
      desc: nl
        ? 'Voltrax is officieel gecertificeerd AlphaESS dealer in Nederland. Dat betekent directe fabriekssupport, originele onderdelen en de volledige 10 jaar fabrieksgarantie, zoals beloofd.'
        : 'Voltrax is an officially certified AlphaESS dealer in the Netherlands. That means direct factory support, original parts and the full 10-year manufacturer warranty, as agreed.',
    },
    {
      icon: <Wrench className="w-6 h-6 text-[#22a55d]" />,
      title: nl ? 'Gecertificeerde installatie — uitsluitend eigen monteurs' : 'Certified installation — exclusively our own technicians',
      desc: nl
        ? 'Alle installaties worden uitsluitend uitgevoerd door onze eigen gecertificeerde monteurs, conform NEN1010 en NEN3140. Geen onderaannemers. Gemiddeld een halve dag, altijd op tijd, zonder verborgen kosten.'
        : 'All installations are carried out exclusively by our own certified technicians, in accordance with NEN1010 and NEN3140. No subcontractors. Average half a day, always on time, no hidden costs.',
      badge: 'NEN1010 & NEN3140',
    },
    {
      icon: <Euro className="w-6 h-6 text-[#22a55d]" />,
      title: nl ? 'Officieel Warmtefonds partner, 0% rente' : 'Official Warmtefonds partner, 0% interest',
      desc: nl
        ? 'Als erkend Warmtefonds partner regelen wij uw lening volledig voor u. Tot 8.500 euro lenen, bij inkomen onder 60.000 euro betaalt u 0% rente. U hoeft niets zelf te regelen.'
        : 'As an approved Warmtefonds partner we arrange your loan completely for you. Borrow up to 8,500 euros; with income below 60,000 euros you pay 0% interest. You do not have to arrange anything yourself.',
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
      title: nl ? 'Levenslange monitoring & service' : 'Lifetime monitoring & service',
      desc: nl
        ? 'Na installatie stopt het niet. Wij activeren de AlphaCloud app, leggen alles stap voor stap uit en blijven bereikbaar voor vragen, monitoring en service, jaar na jaar.'
        : 'We do not stop after installation. We activate the AlphaCloud app, explain everything step by step and remain reachable for questions, monitoring and service, year after year.',
    },
    {
      icon: <Shield className="w-6 h-6 text-[#22a55d]" />,
      title: nl ? 'All-in offerte, niks extra' : 'All-in quote, nothing extra',
      desc: nl
        ? 'Uw offerte bevat alles: batterij, hybride omvormer, installatie, BTW en 10 jaar fabrieksgarantie. Geen verborgen kosten, geen verrassingen achteraf. Wat u ziet is wat u betaalt.'
        : 'Your quote includes everything: battery, hybrid inverter, installation, VAT and 10-year factory warranty. No hidden costs, no surprises. What you see is what you pay.',
    },
    {
      icon: <Zap className="w-6 h-6 text-[#22a55d]" />,
      title: nl ? 'Geen softwarekosten, AlphaCloud altijd gratis' : 'No software costs, AlphaCloud always free',
      desc: nl
        ? 'De AlphaCloud-app is permanent gratis. Geen abonnement, geen licentiekosten, geen verborgen softwarekosten. U betaalt eenmalig voor het systeem. Monitoring, updates en EMS-functionaliteit zijn voor altijd inbegrepen.'
        : 'The AlphaCloud app is permanently free. No subscription, no licence fees, no hidden software costs. You pay once for the system. Monitoring, updates and EMS functionality are included forever.',
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
        ? 'Wilt u financieren via het Nationaal Warmtefonds? Wij verzorgen de volledige aanvraag voor u. U hoeft niets te doen. Wij regelen het papierwerk van A tot Z.'
        : 'Want to finance via the National Warmtefonds? We handle the complete application for you. You do not have to do anything. We handle the paperwork from A to Z.',
      badge: nl ? 'Wij regelen alles' : 'We arrange everything',
    },
    {
      num: '04',
      title: nl ? 'Installatie & direct besparen' : 'Installation & save immediately',
      desc: nl
        ? 'Onze gecertificeerde monteurs installeren de batterij vakkundig conform NEN1010 en NEN3140. Gemiddeld een halve dag. Daarna activeren wij de app en lopen we alles met u door. Vanaf dag 1 bespaart u.'
        : 'Our certified technicians install the battery to NEN1010 and NEN3140 standards. Average half a day. We then activate the app and walk you through everything. From day 1 you save.',
      badge: nl ? 'NEN1010 & NEN3140' : 'NEN1010 & NEN3140',
    },
  ]

  const table = [
    {
      crit: nl ? 'Dealer status' : 'Dealer status',
      voltrax: nl ? 'Officieel gecertificeerd door AlphaESS' : 'Officially certified by AlphaESS',
      andere: nl ? 'Onbekend of indirect dealer' : 'Unknown or indirect dealer',
    },
    {
      crit: nl ? 'Installatie' : 'Installation',
      voltrax: nl ? 'Eigen monteurs, geen onderaannemers' : 'Own technicians, no subcontractors',
      andere: nl ? 'Vaak uitbesteed aan derden' : 'Often outsourced to third parties',
    },
    {
      crit: nl ? 'Installatienorm' : 'Installation standard',
      voltrax: nl ? 'NEN1010 & NEN3140 gecertificeerd' : 'NEN1010 & NEN3140 certified',
      andere: nl ? 'Niet altijd aantoonbaar' : 'Not always demonstrable',
    },
    {
      crit: nl ? 'Warmtefonds financiering' : 'Warmtefonds financing',
      voltrax: nl ? 'Officieel partner, volledig verzorgd' : 'Official partner, fully arranged',
      andere: nl ? 'Meestal niet beschikbaar' : 'Usually not available',
    },
    {
      crit: nl ? 'Garantie' : 'Warranty',
      voltrax: nl ? '10 jaar fabrieksgarantie, direct' : '10-year factory warranty, direct',
      andere: nl ? '5 tot 7 jaar gemiddeld' : '5 to 7 years average',
    },
    {
      crit: nl ? 'Offerte' : 'Quote',
      voltrax: nl ? 'All-in, geen verborgen kosten' : 'All-in, no hidden costs',
      andere: nl ? 'Soms exclusief installatie/BTW' : 'Sometimes excl. installation/VAT',
    },
    {
      crit: nl ? 'Na-service' : 'After-service',
      voltrax: nl ? 'Langdurige monitoring & support' : 'Long-term monitoring & support',
      andere: nl ? 'Beperkt na afloop garantie' : 'Limited after warranty expires',
    },
    {
      crit: nl ? 'Softwarekosten' : 'Software costs',
      voltrax: nl ? 'AlphaCloud gratis, geen abonnement' : 'AlphaCloud free, no subscription',
      andere: nl ? 'Soms abonnement of betaalde app' : 'Sometimes subscription or paid app',
    },
  ]

  const reviewCards = [
    {
      photo: '/assets/install-21.jpg',
      name: 'Bart',
      city: 'Amsterdam',
      text: nl
        ? 'Batterij doet wat hij moet doen. Zonder haperen. Wouter (adviseur) heeft alles helder uitgelegd en de erkende installateurs kwamen netjes op tijd, installatiecertificaat in orde. Integratie met het platform verliep heel vlot en geeft mij duidelijk inzicht. Zo ben ik zeker dat de batterij nuttig werk levert zonder dat ik er naar hoef te kijken.'
        : 'The battery does exactly what it should. Without a hitch. Wouter (adviser) explained everything clearly and the certified installers arrived on time, installation certificate in order. Integration went very smoothly and gives me clear insight. I know the battery is working hard without me having to check.',
    },
    {
      photo: '/assets/install-16.jpg',
      name: 'Marina van den Eynde',
      city: 'Utrecht',
      text: nl
        ? 'De batterij werkt zeer goed. Amber (telefoniste) regelde vlot een afspraak en adviseur Joad stond daarna voor ons klaar. De app is gemakkelijk te gebruiken en zeer duidelijk. Je weet direct hoeveel procent er nog in de batterij aanwezig is, hoeveel watt je zonnepanelen opbrengen en hoeveel je van het net moet nemen.'
        : 'The battery works very well. Amber (receptionist) quickly arranged an appointment and adviser Joad was there for us from there. The app is easy to use and very clear. You immediately know how much charge is in the battery, how many watts your solar panels are generating and how much you need from the grid.',
    },
    {
      photo: '/assets/install-25.jpg',
      name: 'Luc',
      city: 'Eindhoven',
      text: nl
        ? 'We waren aangenaam verrast door de prijs. Karel (adviseur) gaf een heldere uitleg over de werking en beantwoordde geduldig al onze vragen. De erkende installateurs kwamen met hun installatiecertificaat en alle werken zijn stipt en netjes uitgevoerd.'
        : 'We were pleasantly surprised by the price. Karel (adviser) gave a clear explanation of how everything works and patiently answered all our questions. The certified installers arrived with their installation certificate and all work was carried out neatly and exactly as agreed.',
    },
    {
      photo: '/assets/install-23.jpg',
      name: 'Marc De Schinckel',
      city: 'Rotterdam',
      text: nl
        ? 'De AlphaESS batterij geeft een mooi rendement. Janette (telefoniste) was direct behulpzaam en Henry (adviseur) heeft alles professioneel afgehandeld. We hebben nu twee batterijen die ons voorzien van de nodige reserve-elektriciteit. Via de app kan je perfect productie en verbruik opvolgen.'
        : 'The AlphaESS battery gives a great yield. Janette (receptionist) was immediately helpful and Henry (adviser) handled everything professionally from there. We now have two batteries providing our reserve electricity. Via the app you can perfectly track production and consumption.',
    },
  ]

  const extraPhotos = [
    { src: '/assets/install-2.webp', alt: 'AlphaESS installatie' },
    { src: '/assets/install-11.jpeg', alt: 'AlphaESS installatie' },
    { src: '/assets/install-7.webp', alt: 'AlphaESS installatie' },
    { src: '/assets/install-20.jpg', alt: 'AlphaESS installatie garage' },
    { src: '/assets/install-22.jpg', alt: 'AlphaESS installatie zolder' },
    { src: '/assets/install-24.jpg', alt: 'AlphaESS installatie bijkeuken' },
    { src: '/assets/install-18.jpg', alt: 'AlphaESS installatie buiten' },
    { src: '/assets/install-19.jpg', alt: 'AlphaESS installatie' },
    { src: '/assets/install-15.jpg', alt: 'AlphaESS installatie kelder' },
    { src: '/assets/install-10.jpeg', alt: 'AlphaESS installatie' },
    { src: '/assets/install-4.webp', alt: 'AlphaESS installatie' },
    { src: '/assets/install-8.jpg', alt: 'AlphaESS installatie' },
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
          <div className="max-w-3xl pb-16">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#22a55d]/15 text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full mb-8">
              <Battery className="w-3.5 h-3.5" />
              {nl ? 'Officieel AlphaESS dealer Nederland' : 'Official AlphaESS dealer Netherlands'}
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }}
              className="text-5xl lg:text-6xl font-extrabold leading-[1.06] tracking-tight mb-6 text-[#131A20]">
              {nl
                ? <> Waarom kiezen voor <span className="text-[#22a55d]">Voltrax</span>? </>
                : <> Why choose <span className="text-[#22a55d]">Voltrax</span>? </>}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.16 }}
              className="text-lg text-[#131A20]/60 leading-relaxed mb-10 max-w-2xl">
              {nl
                ? 'Voltrax helpt u een duurzamere woning te realiseren. Als officieel AlphaESS dealer begeleiden wij u van energieadvies tot installatie, financiering en jarenlange service. Goed voor uw portemonnee en goed voor het milieu.'
                : 'Voltrax helps you create a more sustainable home. As an official AlphaESS dealer we guide you from energy advice to installation, financing and years of service. Good for your wallet and for the environment.'}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.24 }}
              className="flex flex-wrap gap-3">
              <button onClick={() => navigate('/calculator')}
                className="flex items-center gap-2 bg-[#22a55d] hover:bg-[#1a9050] text-white font-semibold px-7 py-3.5 rounded-full transition-all hover:shadow-xl hover:shadow-green-500/25 text-sm">
                {nl ? 'Bereken mijn besparing' : 'Calculate my savings'} <ArrowRight className="w-4 h-4" />
              </button>
              <a href="mailto:info@voltrax.nl?subject=Advies"
                className="flex items-center gap-2 border border-[#22a55d]/30 text-[#131A20]/70 hover:border-[#22a55d] hover:text-[#22a55d] font-medium px-7 py-3.5 rounded-full transition-all text-sm bg-white">
                {nl ? 'Stel een vraag' : 'Ask a question'}
              </a>
            </motion.div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="max-w-6xl mx-auto px-6 pb-12 border-t border-[#22a55d]/12 pt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: '0 euro', label: nl ? 'Softwarekosten, AlphaCloud altijd gratis' : 'Software costs, AlphaCloud always free', icon: <Zap className="w-4 h-4 text-[#22a55d]" /> },
              { val: '10 jaar', label: nl ? 'Fabrieksgarantie standaard' : 'Factory warranty standard', icon: <Shield className="w-4 h-4 text-[#22a55d]" /> },
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
                <div className="bg-[#F9F7F4] rounded-3xl p-7 h-full hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 hover:-translate-y-1 border border-gray-50">
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
                      alt={`AlphaESS installatie bij ${card.name}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <StarRow />
                    <p className="text-sm text-[#131A20]/70 leading-relaxed italic mb-4 flex-1">
                      "{card.text}"
                    </p>
                    <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
                      <div className="w-8 h-8 rounded-full bg-[#22a55d]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-[#22a55d]">{card.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#131A20]">{card.name}</div>
                        <div className="flex items-center gap-1 text-xs text-[#131A20]/45">
                          <MapPin className="w-3 h-3" />
                          {card.city}
                        </div>
                      </div>
                    </div>
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
              {nl ? 'Voltrax vs. andere dealers' : 'Voltrax vs. other dealers'}
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
                  <Battery className="w-3.5 h-3.5" /> Voltrax
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
              <a href="mailto:info@voltrax.nl?subject=Advies"
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
