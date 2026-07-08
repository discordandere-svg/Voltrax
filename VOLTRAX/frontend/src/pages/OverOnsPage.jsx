import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Shield, Award, Users, Zap, CheckCircle2, ArrowRight,
  Battery, Wrench, MessageCircle, MapPin
} from 'lucide-react'
import Nav from '../components/Nav.jsx'

const INSTALL_PHOTOS = [
  { src: '/assets/installaties/install-05.jpg', alt: 'HYXiPower buitenopstelling tegen bakstenen gevel' },
  { src: '/assets/installaties/install-02.jpg', alt: 'HYXiPower installatie in gang' },
  { src: '/assets/installaties/install-08.jpg', alt: 'HYXiPower buitenopstelling naast tuinpoort' },
  { src: '/assets/installaties/install-01.jpg', alt: 'Bekabeling van HYXiPower systeem in meterkast' },
  { src: '/assets/installaties/install-09.jpg', alt: 'HYXiPower buitenopstelling met meterkast' },
  { src: '/assets/installaties/install-03.jpg', alt: 'HYXiPower installatie in bergruimte' },
  { src: '/assets/installaties/install-07.jpg', alt: 'HYXiPower opstelling bij zekeringkast' },
  { src: '/assets/installaties/install-10.jpg', alt: 'HYXiPower installatie in nis' },
]

const PRODUCT_PHOTOS = [
  { src: '/assets/installaties/solarfast-garage-render.jpg', alt: 'HYXiPower All-in-One in garage, 3D render' },
  { src: '/assets/installaties/product-exploded.jpg', alt: 'HYXiPower All-in-One onderdelen uiteengezet' },
  { src: '/assets/installaties/hyxipower-studio-render.png', alt: 'HYXiPower All-in-One studio render' },
]

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


const SERVICE_HIGHLIGHTS = [
  { title: 'Persoonlijk adviesgesprek', text: 'Wij bespreken uw energieverbruik, woning en wensen voordat we een systeem voorstellen. Geen standaardoplossing, maar advies op maat.' },
  { title: 'Vakkundige installatie', text: 'Onze eigen gecertificeerde monteurs plaatsen uw systeem en leggen precies uit hoe de app en het systeem werken.' },
  { title: 'Begeleiding bij de Warmtefondsaanvraag', text: 'Wij helpen u stap voor stap bij het aanvragen van een Energiebespaarlening, zodat u het overzicht houdt.' },
  { title: 'Bereikbaar na installatie', text: 'Ook na oplevering staan wij klaar voor vragen over uw systeem, de app of uw lening.' },
]

const WAAROM = [
  {
    icon: <Award className="w-6 h-6 text-amber-500" />,
    bg: 'bg-amber-50',
    title: 'HYXiPower partner',
    desc: 'Wij werken met de HYXiPower All-in-One: LiFePO4-batterijtechnologie met een slim Energy Management System.',
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
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
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
                className="text-[#131A20]/60 text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                SolarFast is een team van specialisten in verduurzaming. Wij zijn HYXiPower partner
                in Nederland en begeleiden u van advies tot installatie en nazorg.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="rounded-3xl overflow-hidden shadow-2xl shadow-black/10 aspect-square bg-white"
            >
              <img
                src="/assets/installaties/hyxipower-studio-render.png"
                alt="HYXiPower All-in-One thuisbatterij"
                className="w-full h-full object-cover object-[center_30%]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key stats */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: '100%', label: 'Vrijblijvend advies', sub: 'geen verplichtingen' },
              { val: '<24u', label: 'Reactietijd', sub: 'na uw aanvraag' },
              { val: 'LFP', label: 'Batterijtechnologie', sub: 'LiFePO4-celtechnologie' },
              { val: 'EMS', label: 'Smart Energy Management', sub: 'automatisch geoptimaliseerd' },
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

      {/* Installatiefoto's */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">Echte installaties bij onze klanten</h2>
            <p className="text-[#131A20]/60 text-lg max-w-xl mx-auto">
              Een greep uit de HYXiPower-systemen die onze monteurs door heel Nederland hebben geplaatst,
              binnen en buiten.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {INSTALL_PHOTOS.map((photo, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="rounded-2xl overflow-hidden aspect-square bg-[#F9F7F4]">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="grid md:grid-cols-2 gap-0 bg-[#F9F7F4] rounded-3xl overflow-hidden items-stretch">
              <div className="aspect-[4/3] md:aspect-auto">
                <img
                  src="/assets/installaties/install-technician.jpg"
                  alt="Monteur installeert een HYXiPower thuisbatterij"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-white border border-gray-200 text-[#131A20]/50 text-xs font-semibold px-4 py-2 rounded-full mb-4 w-fit">
                  <Wrench className="w-3.5 h-3.5" /> Onze eigen monteurs
                </div>
                <h3 className="text-2xl font-extrabold mb-3">Vakwerk, geen onderaannemers</h3>
                <p className="text-[#131A20]/60 leading-relaxed">
                  Onze gecertificeerde monteurs plaatsen elk HYXiPower-systeem persoonlijk. Dankzij het
                  meterloze ontwerp van HYXiPower duurt een installatie gemiddeld slechts een halve dag,
                  waarna alles direct wordt geactiveerd en getest.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-14">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-extrabold mb-3">Het HYXiPower product</h3>
              <p className="text-[#131A20]/60 max-w-xl mx-auto">
                Een blik op het HYXiPower All-in-One systeem zelf: compact, modulair en ontworpen
                voor een naadloze plek in huis.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PRODUCT_PHOTOS.map((photo, i) => (
                <div key={i} className="rounded-2xl overflow-hidden aspect-square bg-[#F9F7F4]">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Waarom SolarFast */}
      <section className="py-16 bg-[#F9F7F4]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">Waarom SolarFast?</h2>
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

      {/* Wat u van SolarFast mag verwachten */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">Wat u van SolarFast mag verwachten</h2>
            <p className="text-[#131A20]/60 text-lg max-w-xl mx-auto">
              SolarFast focust volledig op HYXiPower en begeleidt u van advies tot en met installatie.
            </p>
          </Reveal>

          <Reveal className="bg-[#F9F7F4] rounded-3xl overflow-hidden">
            <div className="divide-y divide-black/4">
              {[
                { label: 'Specialisatie in 1 merk (HYXiPower)' },
                { label: 'Eigen gecertificeerde monteurs' },
                { label: 'Begeleiding bij de Warmtefondsaanvraag' },
                { label: 'Transparante all-in prijzen' },
                { label: 'Bereikbaar na installatie' },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between px-8 py-4 bg-white">
                  <div className="text-sm text-[#131A20]/70 pr-4">{r.label}</div>
                  <span className="inline-flex items-center gap-1 bg-[#f0fdf4] text-[#22a55d] font-bold text-xs px-3 py-1.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Ja
                  </span>
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

      {/* Service */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-4">
            <h2 className="text-4xl font-extrabold mb-4">Wat u van ons kunt verwachten</h2>
            <p className="text-[#131A20]/60 text-lg max-w-xl mx-auto">
              Van aanvraag tot installatie en daarna nog.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 mt-10">
            {SERVICE_HIGHLIGHTS.map((r, i) => (
              <Reveal key={i} delay={i * 0.2}>
                <div className="bg-[#F9F7F4] rounded-3xl p-6 h-full flex flex-col">
                  <h3 className="font-bold text-lg mb-2">{r.title}</h3>
                  <p className="text-sm text-[#131A20]/70 leading-relaxed flex-1">{r.text}</p>
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
            <h2 className="text-4xl font-extrabold mb-3">SolarFast en HYXiPower</h2>
            <p className="text-[#131A20]/60 text-lg max-w-xl mx-auto">Wat u van onze partnership en onze werkwijze mag verwachten.</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <Reveal>
              <div className="bg-white rounded-3xl p-7 h-full border border-gray-100">
                <div className="text-xs font-bold text-[#131A20]/30 uppercase tracking-widest mb-4">HYXiPower All-in-One</div>
                <div className="space-y-3">
                  {[
                    { icon: <Battery className="w-4 h-4 text-green-600" />, bg: 'bg-green-50', title: 'LFP / LiFePO4 batterijtechnologie', desc: 'Veilige en duurzame celtechnologie.' },
                    { icon: <Zap className="w-4 h-4 text-amber-500" />, bg: 'bg-amber-50', title: 'Slim Energy Management System', desc: 'Automatische aansturing van laden en ontladen.' },
                    { icon: <MessageCircle className="w-4 h-4 text-blue-500" />, bg: 'bg-blue-50', title: 'Realtime monitoring via app', desc: 'Altijd inzicht in productie, opslag en verbruik.' },
                    { icon: <Wrench className="w-4 h-4 text-[#131A20]/50" />, bg: 'bg-[#F9F7F4]', title: 'Modulair uitbreidbaar', desc: 'Eenvoudig op te schalen naarmate uw behoefte groeit.' },
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
            <Reveal delay={1}>
              <div className="bg-white rounded-3xl p-7 h-full border border-gray-100">
                <div className="text-xs font-bold text-[#131A20]/30 uppercase tracking-widest mb-4">SolarFast als installatiebedrijf</div>
                <div className="space-y-3">
                  {[
                    { icon: <Award className="w-4 h-4 text-amber-500" />, bg: 'bg-amber-50', title: 'HYXiPower partner', desc: 'Wij installeren en ondersteunen HYXiPower thuisbatterijen.' },
                    { icon: <Shield className="w-4 h-4 text-blue-500" />, bg: 'bg-blue-50', title: 'Begeleiding bij Warmtefondsaanvraag', desc: 'Wij helpen u met de aanvraag van een Energiebespaarlening.' },
                    { icon: <CheckCircle2 className="w-4 h-4 text-green-600" />, bg: 'bg-green-50', title: 'Eigen gecertificeerde monteurs', desc: 'Geen onderaannemers, vakkundige installatie.' },
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
              Mail ons of gebruik de calculator. Wij reageren altijd binnen 1 werkdag.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <button
                onClick={() => navigate('/calculator')}
                className="inline-flex items-center justify-center gap-2 bg-[#22a55d] hover:bg-[#1a9050] text-white font-bold px-8 py-4 rounded-full transition-all hover:shadow-xl hover:shadow-green-500/25 text-base"
              >
                Bereken mijn besparing <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="mailto:info@solarfast.nl"
                className="inline-flex items-center justify-center gap-2 border border-gray-200 bg-white hover:border-[#22a55d] text-[#131A20]/70 hover:text-[#22a55d] font-semibold px-8 py-4 rounded-full transition-all text-base"
              >
                Stuur een e-mail
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-5 text-sm text-[#131A20]/40">
              <span className="flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5" /> info@solarfast.nl</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Nederland</span>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="bg-[#F9F7F4] border-t border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <img src="/assets/solarfast-logo.png" alt="SolarFast" className="h-7 w-auto" />
          <p className="text-sm text-[#131A20]/40">HYXiPower partner</p>
          <div className="flex items-center gap-2 text-xs text-[#131A20]/40">
            <Shield className="w-3.5 h-3.5 text-[#22a55d]" />
            Warmtefonds partner
          </div>
        </div>
      </footer>
    </div>
  )
}
