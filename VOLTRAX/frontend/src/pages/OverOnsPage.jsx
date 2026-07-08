import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Shield, Award, Users, Zap, CheckCircle2, ArrowRight,
  Star, Battery, Wrench, MessageCircle, Phone, MapPin
} from 'lucide-react'
import Nav from '../components/Nav.jsx'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
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


const REVIEWS = [
  { name: 'Mark V.', city: 'Amsterdam', stars: 5, text: 'Zeer professioneel en deskundig advies. Binnen een week alles geregeld. De batterij werkt perfect en de app geeft precies het inzicht dat ik zocht.' },
  { name: 'Sandra K.', city: 'Rotterdam', stars: 5, text: 'Eindelijk een partij die eerlijk advies geeft. Geen verkooppraatjes, gewoon duidelijke uitleg en een scherpe prijs. Topservice van begin tot eind.' },
  { name: 'Peter D.', city: 'Utrecht', stars: 5, text: 'Van advies tot installatie perfect geregeld. Monteurs waren vriendelijk, stipt en lieten alles schoon achter. Absolute aanrader!' },
  { name: 'Lisa M.', city: 'Den Haag', stars: 5, text: 'Snel, betrouwbaar en transparant. Precies wat we zochten. De Warmtefonds aanvraag werd volledig voor ons geregeld, dat was een enorme hulp.' },
  { name: 'Jan B.', city: 'Eindhoven', stars: 5, text: 'Beste keuze die we gemaakt hebben. We besparen nu flink en de app laat precies zien hoeveel. Na 3 maanden al merkbaar verschil op de energierekening.' },
  { name: 'Emma W.', city: 'Groningen', stars: 5, text: 'Uitstekende service van begin tot eind. De installatie was snel en netjes. Alles werd duidelijk uitgelegd en de naservice is ook prima.' },
]

const WAAROM = [
  {
    icon: <Award className="w-6 h-6 text-amber-500" />,
    bg: 'bg-amber-50',
    title: 'Officieel HYXiPower dealer',
    desc: 'Wij zijn gecertificeerd dealer van HYXiPower voor Nederland. Direct van de fabrikant, met volledige garantie en fabrieksondersteuning.',
  },
  {
    icon: <Wrench className="w-6 h-6 text-blue-500" />,
    bg: 'bg-blue-50',
    title: 'Eigen gecertificeerde monteurs',
    desc: 'Onze installateurs zijn gecertificeerd en gespecialiseerd in HYXiPower systemen. Geen onderaannemers, geen verassingen.',
  },
  {
    icon: <Shield className="w-6 h-6 text-green-600" />,
    bg: 'bg-green-50',
    title: 'Volledig ontzorgd traject',
    desc: 'Van adviesgesprek tot subsidieaanvraag en installatie: wij regelen het. U hoeft nergens anders aan te kloppen.',
  },
  {
    icon: <Zap className="w-6 h-6 text-[#131A20]/60" />,
    bg: 'bg-[#F9F7F4]',
    title: 'Geen verborgen kosten',
    desc: 'Onze offertes zijn transparant en compleet. Batterij, omvormer, installatie en BTW: alles staat erin, niets wordt bijgerekend.',
  },
  {
    icon: <Users className="w-6 h-6 text-blue-400" />,
    bg: 'bg-blue-50',
    title: 'Warmtefonds partner',
    desc: 'Wij regelen uw Energiebespaarlening van A tot Z. Tot 8.500 euro, mogelijk met 0% rente. U hoeft het formulier niet eens zelf in te vullen.',
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-green-500" />,
    bg: 'bg-green-50',
    title: 'Nazorg en langetermijn support',
    desc: 'Na de installatie bent u er niet alleen voor. Wij zijn bereikbaar voor vragen, updates en onderhoud, voor de lange termijn.',
  },
]

export default function OverOnsPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white text-[#131A20] font-['Plus_Jakarta_Sans']">
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#F9F7F4]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-[#131A20]/50 text-xs font-semibold px-4 py-2 rounded-full mb-6"
          >
            <Battery className="w-3.5 h-3.5" /> Specialisten in thuisbatterijen
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl font-extrabold leading-tight mb-5"
          >
            Wie zijn wij?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#131A20]/60 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            VOLTRAX is een team van specialisten in verduurzaming. Wij zijn officieel dealer
            van HYXiPower in Nederland en begeleiden u van advies tot installatie en nazorg.
          </motion.p>
        </div>
      </section>

      {/* Key stats */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: '4,9', label: 'Google beoordeling', sub: 'gemiddeld uit alle reviews' },
              { val: '100%', label: 'Vrijblijvend advies', sub: 'geen verplichtingen' },
              { val: '<24u', label: 'Reactietijd', sub: 'na uw aanvraag' },
              { val: '10 jr', label: 'Garantie', sub: 'op elk systeem' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.2}>
                <div className="bg-[#F9F7F4] rounded-3xl p-6 text-center">
                  <div className="text-3xl font-extrabold text-[#131A20] mb-1">{s.val}</div>
                  <div className="text-sm font-semibold text-[#131A20]">{s.label}</div>
                  <div className="text-xs text-[#131A20]/40 mt-1">{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Waarom VOLTRAX */}
      <section className="py-16 bg-[#F9F7F4]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">Waarom VOLTRAX?</h2>
            <p className="text-[#131A20]/60 text-lg max-w-xl mx-auto">
              Er zijn veel partijen die thuisbatterijen verkopen. Dit onderscheidt ons.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WAAROM.map((w, i) => (
              <Reveal key={i} delay={i * 0.2}>
                <div className="bg-white rounded-3xl p-7 h-full hover:shadow-lg hover:shadow-gray-100 transition-all hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-2xl ${w.bg} flex items-center justify-center mb-4`}>
                    {w.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{w.title}</h3>
                  <p className="text-sm text-[#131A20]/60 leading-relaxed">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VOLTRAX vs anderen */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">VOLTRAX versus de markt</h2>
            <p className="text-[#131A20]/60 text-lg max-w-xl mx-auto">
              Waar veel installateurs generiek werken, focust VOLTRAX volledig op HYXiPower.
            </p>
          </Reveal>

          <Reveal className="bg-[#F9F7F4] rounded-3xl overflow-hidden">
            <div className="grid grid-cols-3 px-8 py-4 border-b border-black/6">
              <div className="text-xs font-bold text-[#131A20]/30 uppercase tracking-wide">Criterium</div>
              <div className="text-xs font-bold text-[#22a55d] uppercase tracking-wide text-center">VOLTRAX</div>
              <div className="text-xs font-bold text-[#131A20]/30 uppercase tracking-wide text-center">Gemiddeld</div>
            </div>
            <div className="divide-y divide-black/4">
              {[
                { label: 'Specialisatie in 1 merk (HYXiPower)', voltrax: true, markt: false },
                { label: 'Eigen gecertificeerde monteurs', voltrax: true, markt: 'Soms' },
                { label: 'Warmtefonds aanvraag inbegrepen', voltrax: true, markt: false },
                { label: 'Transparante all-in prijzen', voltrax: true, markt: 'Soms' },
                { label: 'Nazorg en langetermijn support', voltrax: true, markt: 'Soms' },
              ].map((r, i) => (
                <div key={i} className="grid grid-cols-3 px-8 py-4 items-center bg-white">
                  <div className="text-sm text-[#131A20]/70 pr-4">{r.label}</div>
                  <div className="text-center">
                    <span className="inline-flex items-center gap-1 bg-[#f0fdf4] text-[#22a55d] font-bold text-xs px-3 py-1.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Ja
                    </span>
                  </div>
                  <div className="text-center">
                    {r.markt === true ? (
                      <span className="inline-flex items-center gap-1 bg-[#f0fdf4] text-[#22a55d] font-bold text-xs px-3 py-1.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Ja
                      </span>
                    ) : r.markt === false ? (
                      <span className="text-xs text-[#131A20]/30 font-medium">Zelden</span>
                    ) : (
                      <span className="text-xs text-amber-500 font-medium">{r.markt}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="py-16 bg-[#F9F7F4]">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">Van aanvraag tot installatie</h2>
            <p className="text-[#131A20]/60 text-lg">Binnen 2 tot 3 weken bent u klaar.</p>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { num: '01', title: 'Aanvraag doen', desc: 'Vul het contactformulier in of bel ons. Duurt minder dan 1 minuut.', time: '1 minuut' },
              { num: '02', title: 'Adviesgesprek', desc: 'Persoonlijk advies op basis van uw energiesituatie, woning en wensen.', time: '1 werkdag' },
              { num: '03', title: 'Digitale schouw', desc: 'Snelle controle van uw woning op afstand. Geen bezoek nodig.', time: '2 tot 3 dagen' },
              { num: '04', title: 'Installatie', desc: 'Vakkundige plaatsing door onze eigen monteurs. Alles geactiveerd.', time: '2 tot 3 weken' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.3}>
                <div className="bg-white rounded-3xl p-6 text-center hover:shadow-lg hover:shadow-gray-100 transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-[#F9F7F4] flex items-center justify-center mx-auto mb-4">
                    <span className="font-extrabold text-sm text-[#131A20]/40">{s.num}</span>
                  </div>
                  <h3 className="font-bold mb-2">{s.title}</h3>
                  <p className="text-xs text-[#131A20]/60 leading-relaxed mb-3">{s.desc}</p>
                  <span className="text-xs bg-green-50 text-green-700 font-semibold px-3 py-1 rounded-full">
                    {s.time}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Google reviews */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-2xl font-extrabold text-[#131A20]">4,9</span>
              <span className="text-[#131A20]/40 text-sm">/ 5 via Google Reviews</span>
            </div>
            <h2 className="text-4xl font-extrabold mb-4">Wat onze klanten zeggen</h2>
            <p className="text-[#131A20]/60 text-lg max-w-xl mx-auto">
              Echte klanten, echte ervaringen. Van aanvraag tot installatie.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {REVIEWS.map((r, i) => (
              <Reveal key={i} delay={i * 0.2}>
                <div className="bg-[#F9F7F4] rounded-3xl p-6 h-full flex flex-col">
                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(r.stars)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-[#131A20]/70 leading-relaxed flex-1">{r.text}</p>
                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-[#131A20]/60">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#131A20]">{r.name}</div>
                      <div className="text-xs text-[#131A20]/40 flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5" /> {r.city}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certificeringen */}
      <section className="py-16 bg-[#F9F7F4]">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-10">
            <h2 className="text-4xl font-extrabold mb-3">Certificeringen en keurmerken</h2>
            <p className="text-[#131A20]/60 text-lg max-w-xl mx-auto">Van VOLTRAX en HYXiPower samen: gedekte garanties en bewezen kwaliteitsnormen.</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <Reveal>
              <div className="bg-white rounded-3xl p-7 h-full border border-gray-100">
                <div className="text-xs font-bold text-[#131A20]/30 uppercase tracking-widest mb-4">HYXiPower productcertificering</div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { code: 'CE', label: 'EU conformiteitsmarkering', color: 'bg-blue-50 text-blue-700' },
                    { code: 'IEC 62619', label: 'Veiligheidsnorm lithium accu', color: 'bg-green-50 text-green-700' },
                    { code: 'VDE', label: 'Duits kwaliteitsinstituut', color: 'bg-amber-50 text-amber-700' },
                    { code: 'IP67', label: 'Stof- en spatwaterdicht', color: 'bg-teal-50 text-teal-700' },
                    { code: 'UN38.3', label: 'Transportveiligheidsnorm', color: 'bg-purple-50 text-purple-700' },
                    { code: 'IEC 61000', label: 'Elektromagnetische compatibiliteit', color: 'bg-blue-50 text-blue-700' },
                  ].map((cert, i) => (
                    <div key={i} className={`${cert.color} rounded-2xl px-3 py-3`}>
                      <div className="text-sm font-extrabold mb-0.5">{cert.code}</div>
                      <div className="text-xs opacity-70 leading-tight">{cert.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="bg-white rounded-3xl p-7 h-full border border-gray-100">
                <div className="text-xs font-bold text-[#131A20]/30 uppercase tracking-widest mb-4">VOLTRAX als installatiebedrijf</div>
                <div className="space-y-3">
                  {[
                    { icon: <Award className="w-4 h-4 text-amber-500" />, bg: 'bg-amber-50', title: 'Officieel HYXiPower dealer NL', desc: 'Gecertificeerd door HYXiPower voor de Nederlandse markt.' },
                    { icon: <Shield className="w-4 h-4 text-blue-500" />, bg: 'bg-blue-50', title: 'Erkend Warmtefonds partner', desc: 'Gemachtigd om Energiebespaarleningen te verwerken.' },
                    { icon: <CheckCircle2 className="w-4 h-4 text-green-600" />, bg: 'bg-green-50', title: 'NEN 1010 gecertificeerde elektriciens', desc: 'Elektrische installaties conform de Nederlandse norm.' },
                    { icon: <Wrench className="w-4 h-4 text-[#131A20]/50" />, bg: 'bg-[#F9F7F4]', title: 'Verzekerd en VCA-gecertificeerd', desc: 'Veilig en aansprakelijkheidsverzekerd vakwerk.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#131A20]">{item.title}</div>
                        <div className="text-xs text-[#131A20]/50 leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact & CTA */}
      <section className="py-20 bg-[#EEF6F1]">
        <div className="max-w-3xl mx-auto text-center px-6">
          <Reveal>
            <h2 className="text-4xl font-extrabold text-[#131A20] mb-5">
              Persoonlijk advies, 100% vrijblijvend
            </h2>
            <p className="text-[#131A20]/60 text-lg mb-8 leading-relaxed">
              Bel, mail of gebruik de calculator. Wij reageren altijd binnen 1 werkdag.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <button
                onClick={() => navigate('/calculator')}
                className="inline-flex items-center justify-center gap-2 bg-[#22a55d] hover:bg-[#1a9050] text-white font-bold px-8 py-4 rounded-full transition-all hover:shadow-xl hover:shadow-green-500/25 text-base"
              >
                Bereken mijn besparing <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="mailto:info@voltrax.nl"
                className="inline-flex items-center justify-center gap-2 border border-gray-200 bg-white hover:border-[#22a55d] text-[#131A20]/70 hover:text-[#22a55d] font-semibold px-8 py-4 rounded-full transition-all text-base"
              >
                Stuur een e-mail
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-5 text-sm text-[#131A20]/40">
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +31 (0)6 00 00 00 00</span>
              <span className="flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5" /> info@voltrax.nl</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Nederland</span>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="bg-[#F9F7F4] border-t border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-lg font-extrabold text-[#131A20]">
            VOLT<span style={{ color: '#22a55d' }}>RAX</span>
          </span>
          <p className="text-sm text-[#131A20]/40">Officieel HYXiPower dealer</p>
          <div className="flex items-center gap-2 text-xs text-[#131A20]/40">
            <Shield className="w-3.5 h-3.5 text-[#22a55d]" />
            Warmtefonds partner
          </div>
        </div>
      </footer>
    </div>
  )
}
