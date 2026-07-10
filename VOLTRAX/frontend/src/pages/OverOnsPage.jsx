import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Shield, Award, Users, Zap, CheckCircle2, ArrowRight,
  Battery, Wrench, MessageCircle, MapPin
} from 'lucide-react'
import Nav from '../components/Nav.jsx'
import { useLanguage } from '../context/LanguageContext'

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

const AANPAK_ICONS = {
  MessageCircle: <MessageCircle className="w-6 h-6 text-[#22a55d]" />,
  Wrench: <Wrench className="w-6 h-6 text-[#22a55d]" />,
  Zap: <Zap className="w-6 h-6 text-[#22a55d]" />,
  Shield: <Shield className="w-6 h-6 text-[#22a55d]" />,
}

const WHY_ICONS = [
  <Award className="w-6 h-6 text-amber-500" />,
  <Wrench className="w-6 h-6 text-blue-500" />,
  <Shield className="w-6 h-6 text-green-600" />,
  <Zap className="w-6 h-6 text-[#131A20]/60" />,
  <Users className="w-6 h-6 text-blue-400" />,
  <MessageCircle className="w-6 h-6 text-green-500" />,
]

const WHY_BGS = ['bg-amber-50', 'bg-blue-50', 'bg-green-50', 'bg-[#F9F7F4]', 'bg-blue-50', 'bg-green-50']

export default function OverOnsPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const o = t.overOns
  const h = t.home

  return (
    <div className="min-h-screen bg-white text-[#131A20] font-['Plus_Jakarta_Sans']">
      <Nav />

      {/* HERO */}
      <section className="pt-28 pb-0 bg-[#F9F7F4] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center pb-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-white border border-gray-200 text-[#131A20]/50 text-xs font-semibold px-4 py-2 rounded-full mb-6"
              >
                <Battery className="w-3.5 h-3.5 text-[#22a55d]" /> {o.heroBadge}
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl lg:text-[3.5rem] font-extrabold leading-tight mb-5 tracking-tight"
              >
                {o.heroTitle}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[#131A20]/60 text-lg leading-relaxed mb-8 max-w-lg"
              >
                {o.heroDesc}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex items-center gap-0"
              >
                {o.heroFacts.map((f, i) => (
                  <React.Fragment key={i}>
                    <div className="pr-7">
                      <div className="text-[1.6rem] font-extrabold text-[#131A20] leading-none">{f.value}</div>
                      <div className="text-xs text-[#131A20]/45 mt-1 font-medium">{f.label}</div>
                    </div>
                    {i < o.heroFacts.length - 1 && <div className="w-px h-8 bg-[#131A20]/10 mr-7 flex-shrink-0" />}
                  </React.Fragment>
                ))}
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-end justify-center py-4"
            >
              <div className="absolute w-[70%] aspect-square rounded-full bg-[#22a55d]/16 blur-3xl bottom-8" />
              <div className="absolute w-[42%] aspect-square rounded-full bg-[#22a55d]/10 blur-xl bottom-12" />
              <img
                src="/assets/hyxipower-battery-3d.png"
                alt="HYXiPower All-in-One thuisbatterij"
                className="relative"
                style={{
                  height: 420,
                  width: 'auto',
                  filter: 'drop-shadow(0 32px 56px rgba(0,0,0,0.20)) drop-shadow(0 8px 18px rgba(34,165,93,0.13))',
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* KPI STRIP */}
      <section className="py-12 bg-[#EEF6F1]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-8">
            <span className="inline-flex items-center gap-2 bg-[#22a55d]/15 border border-[#22a55d]/20 text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" /> {h.kpiBadge}
            </span>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {h.kpis.map((kpi, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl lg:text-[2.75rem] font-extrabold text-[#131A20] leading-none mb-2 tracking-tight">
                    {kpi.value}
                  </div>
                  <div className="text-sm text-[#131A20]/55 font-medium">{kpi.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ONS VERHAAL */}
      <section className="py-20 bg-[#EEF6F1] border-t border-[#22a55d]/8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-[#22a55d]/15 border border-[#22a55d]/20 text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full mb-5">
                <Battery className="w-3.5 h-3.5" /> {o.verhaalBadge}
              </div>
              <h2 className="text-4xl font-extrabold mb-6 tracking-tight leading-tight">
                {o.verhaalTitle}
              </h2>
              <div className="space-y-4 text-[#131A20]/65 leading-relaxed">
                <p>{o.verhaalText1}</p>
                <p>{o.verhaalText2}</p>
                <p className="font-medium text-[#131A20]/80">{o.verhaalText3}</p>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/10">
                <img
                  src="/assets/installaties/install-technician.jpg"
                  alt="SolarFast monteur installeert HYXiPower thuisbatterij"
                  className="w-full h-full object-cover"
                  style={{ maxHeight: 420 }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ONZE AANPAK */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#22a55d]/10 text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full mb-5">
              <Zap className="w-3.5 h-3.5" /> {o.aanpakBadge}
            </div>
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">{o.aanpakTitle}</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {o.aanpak.map((step, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="bg-[#F9F7F4] rounded-3xl p-7 h-full border border-transparent hover:border-[#22a55d]/15 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 hover:-translate-y-1.5 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#22a55d]/10 flex items-center justify-center group-hover:bg-[#22a55d]/15 transition-colors flex-shrink-0">
                      {AANPAK_ICONS[step.icon]}
                    </div>
                    <span className="text-xs font-bold text-[#131A20]/25 tabular-nums">0{i + 1}</span>
                  </div>
                  <h3 className="font-bold text-base mb-2 text-[#131A20]">{step.title}</h3>
                  <p className="text-sm text-[#131A20]/55 leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INSTALLATIE FOTO'S */}
      <section className="py-20 bg-[#F9F7F4]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">{o.installTitle}</h2>
            <p className="text-[#131A20]/60 text-lg max-w-xl mx-auto">{o.installDesc}</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {INSTALL_PHOTOS.map((photo, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="rounded-2xl overflow-hidden aspect-square bg-[#EEF6F1]">
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
            <div className="grid md:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-100 border border-gray-100 items-stretch">
              <div className="aspect-[4/3] md:aspect-auto">
                <img
                  src="/assets/installaties/install-technician.jpg"
                  alt="Monteur installeert HYXiPower thuisbatterij"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-[#EEF6F1] text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full mb-5 w-fit">
                  <Wrench className="w-3.5 h-3.5" /> {o.technicianBadge}
                </div>
                <h3 className="text-2xl font-extrabold mb-3 tracking-tight">{o.technicianTitle}</h3>
                <p className="text-[#131A20]/60 leading-relaxed">{o.technicianDesc}</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-14">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-extrabold mb-3 tracking-tight">{o.productTitle}</h3>
              <p className="text-[#131A20]/60 max-w-xl mx-auto">{o.productDesc}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PRODUCT_PHOTOS.map((photo, i) => (
                <div key={i} className="rounded-2xl overflow-hidden aspect-square bg-[#EEF6F1]">
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

      {/* WAAROM SOLARFAST */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">{o.whyTitle}</h2>
            <p className="text-[#131A20]/60 text-lg max-w-xl mx-auto">{o.whySub}</p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {o.whyUsps.map((w, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-[#F9F7F4] rounded-3xl p-7 h-full hover:shadow-xl hover:shadow-gray-100 transition-all hover:-translate-y-1 border border-transparent hover:border-[#22a55d]/10 group">
                  <div className={`w-12 h-12 rounded-2xl ${WHY_BGS[i]} flex items-center justify-center mb-5`}>
                    {WHY_ICONS[i]}
                  </div>
                  <h3 className="font-bold text-base mb-2 text-[#131A20]">{w.title}</h3>
                  <p className="text-sm text-[#131A20]/55 leading-relaxed">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 bg-[#EEF6F1]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#22a55d]/15 border border-[#22a55d]/20 text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full mb-5">
              <Users className="w-3.5 h-3.5" /> {o.teamBadge}
            </div>
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">{o.teamTitle}</h2>
            <p className="text-[#131A20]/55 text-lg max-w-xl mx-auto leading-relaxed">{o.teamSub}</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {o.team.map((member, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="bg-white rounded-3xl p-7 h-full border border-gray-100 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#22a55d]/12 flex items-center justify-center text-[#22a55d] font-extrabold text-lg flex-shrink-0">
                      {member.initials}
                    </div>
                    <div>
                      <div className="font-bold text-[#131A20] leading-tight">{member.name}</div>
                      <div className="text-xs text-[#22a55d] font-semibold mt-0.5">{member.role}</div>
                    </div>
                  </div>
                  <p className="text-sm text-[#131A20]/60 leading-relaxed">{member.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#22a55d] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-white/8" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/5" />
        </div>
        <div className="max-w-3xl mx-auto text-center px-6 relative">
          <Reveal>
            <h2 className="text-4xl font-extrabold text-white mb-5 tracking-tight leading-tight">
              {o.ctaTitle}
            </h2>
            <p className="text-white/75 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              {o.ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('/calculator')}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-green-50 text-[#22a55d] font-bold px-8 py-4 rounded-full transition-all hover:shadow-2xl hover:shadow-black/10 text-base"
              >
                {o.ctaCalc} <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="mailto:info@solarfast.nl"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full transition-all text-base"
              >
                {o.ctaMail}
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-5 mt-8 text-sm text-white/50">
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
