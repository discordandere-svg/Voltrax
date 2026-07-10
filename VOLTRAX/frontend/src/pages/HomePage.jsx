import React, { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, Battery, CheckCircle2,
  Zap, TrendingUp, Shield, Euro, Sun, Award, Wrench, Phone, Star
} from 'lucide-react'

import Nav from '../components/Nav.jsx'
import { useLanguage } from '../context/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
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

const FEATURE_ICONS = [
  <Sun className="w-5 h-5" />,
  <Euro className="w-5 h-5" />,
  <Shield className="w-5 h-5" />,
  <TrendingUp className="w-5 h-5" />,
]

const WHY_ICONS = [
  <Award className="w-5 h-5" />,
  <Wrench className="w-5 h-5" />,
  <Euro className="w-5 h-5" />,
  <CheckCircle2 className="w-5 h-5" />,
  <Zap className="w-5 h-5" />,
  <Phone className="w-5 h-5" />,
]

export default function HomePage() {
  const navigate = useNavigate()
  const { t, lang } = useLanguage()
  const nl = lang === 'nl'
  const h = t.home

  useEffect(() => {
    sessionStorage.removeItem('voltrax_form')
    sessionStorage.removeItem('voltrax_results')
    sessionStorage.removeItem('voltrax_input')
  }, [])

  return (
    <div className="min-h-screen bg-white text-[#131A20] font-['Plus_Jakarta_Sans']">
      <Nav />

      {/* HERO */}
      <section className="pt-24 pb-0 overflow-hidden bg-[#F9F7F4] relative">
        {/* Decorative background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#22a55d]/6" />
          <div className="absolute top-40 -left-40 w-96 h-96 rounded-full bg-[#22a55d]/4" />
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-12 pb-0 relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-[#22a55d]/12 text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full mb-7 border border-[#22a55d]/15"
              >
                <Battery className="w-3.5 h-3.5" /> {h.badge}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08 }}
                className="text-[3.2rem] sm:text-6xl lg:text-[4.25rem] font-extrabold leading-[1.02] tracking-tight mb-6 text-[#131A20]"
              >
                {h.hero1}<br />
                <span className="text-[#22a55d]">{h.hero2}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.16 }}
                className="text-lg text-[#131A20]/55 leading-relaxed mb-9 max-w-md"
              >
                {h.heroDesc}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.22 }}
                className="flex flex-wrap gap-3 mb-12"
              >
                <button
                  onClick={() => navigate('/calculator')}
                  className="flex items-center gap-2 bg-[#22a55d] hover:bg-[#1a9050] text-white font-semibold px-7 py-4 rounded-full transition-all hover:shadow-xl hover:shadow-green-500/30 text-base"
                >
                  {h.calcBtn} <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate('/hoe-werkt-het')}
                  className="flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-[#131A20] font-medium px-7 py-4 rounded-full transition-all text-base hover:shadow-sm"
                >
                  {h.howBtn}
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex items-center gap-0"
              >
                {[
                  { val: '92%',      label: h.stat1 },
                  { val: 'LFP',      label: h.stat2 },
                  { val: 'Modulair', label: h.stat3 },
                ].map((s, i) => (
                  <React.Fragment key={i}>
                    <div className="pr-8">
                      <div className="text-[1.75rem] font-extrabold text-[#131A20] leading-none">{s.val}</div>
                      <div className="text-xs text-[#131A20]/45 mt-1 font-medium">{s.label}</div>
                    </div>
                    {i < 2 && <div className="w-px h-8 bg-[#131A20]/10 mr-8 flex-shrink-0" />}
                  </React.Fragment>
                ))}
              </motion.div>
            </div>

            {/* Product visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, x: 24 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center py-4"
            >
              {/* Glow ring */}
              <div className="absolute w-[65%] aspect-square rounded-full bg-[#22a55d]/14 blur-3xl" />
              <div className="absolute w-[40%] aspect-square rounded-full bg-[#22a55d]/10 blur-xl" />
              <img
                src="/assets/hyxipower-battery-3d.png"
                alt="HYXiPower All-in-One thuisbatterij"
                className="relative w-[75%] max-w-[320px] mx-auto"
                style={{ filter: 'drop-shadow(0 32px 48px rgba(0,0,0,0.18)) drop-shadow(0 8px 16px rgba(34,165,93,0.12))' }}
              />
              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.55 }}
                className="absolute bottom-4 left-4 bg-white rounded-2xl shadow-xl shadow-black/10 px-5 py-4 flex items-center gap-3 border border-gray-100"
              >
                <div className="w-10 h-10 rounded-xl bg-[#22a55d]/10 flex items-center justify-center">
                  <Battery className="w-5 h-5 text-[#22a55d]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#131A20]">{h.productBadge}</div>
                  <div className="text-xs text-[#131A20]/45">{h.productSub}</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Full-width panorama */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="mt-20 relative overflow-hidden h-72 md:h-[26rem]"
        >
          <img
            src="/assets/hyxipower-lineup.png"
            alt="HYXiPower thuisbatterij bij moderne woning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
        </motion.div>
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

      {/* TRUST STRIP */}
      <section className="py-5 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            <div className="flex items-center gap-1.5 text-[#131A20]/55">
              <Shield className="w-3.5 h-3.5 text-[#22a55d] flex-shrink-0" />
              <span>HYXiPower partner Nederland</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gray-200 flex-shrink-0" />
            <div className="flex items-center gap-1.5 text-[#131A20]/55">
              <Award className="w-3.5 h-3.5 text-[#22a55d] flex-shrink-0" />
              <span>LFP/LiFePO4 accutechnologie</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gray-200 flex-shrink-0" />
            <div className="flex items-center gap-1.5 text-[#131A20]/55">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22a55d] flex-shrink-0" />
              <span>Modulair uitbreidbaar</span>
            </div>
          </div>
        </div>
      </section>

      {/* KENMERKEN */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#22a55d]/10 text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full mb-5">
              <Zap className="w-3.5 h-3.5" /> {h.featuresBadge}
            </div>
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
              {h.featuresTitle}
            </h2>
            <p className="text-[#131A20]/55 text-lg max-w-2xl mx-auto leading-relaxed">
              {h.featuresDesc}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {h.features.map((k, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="bg-[#F9F7F4] rounded-3xl p-7 h-full hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 hover:-translate-y-1.5 border border-transparent hover:border-[#22a55d]/10 group">
                  <div className="w-11 h-11 rounded-2xl bg-[#22a55d]/10 flex items-center justify-center text-[#22a55d] mb-5 group-hover:bg-[#22a55d]/15 transition-colors">
                    {FEATURE_ICONS[i]}
                  </div>
                  <h3 className="font-bold text-base mb-2 text-[#131A20]">{k.title}</h3>
                  <p className="text-sm text-[#131A20]/55 leading-relaxed">{k.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE */}
      <section className="py-24 bg-[#F9F7F4]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-white text-[#131A20]/50 text-xs font-semibold px-4 py-2 rounded-full mb-5 border border-gray-100">
                <Battery className="w-3.5 h-3.5 text-[#22a55d]" /> {h.productBadge}
              </div>
              <h2 className="text-4xl font-extrabold leading-tight mb-5 tracking-tight">
                {h.productTitle}
              </h2>
              <p className="text-[#131A20]/55 leading-relaxed mb-7">
                {h.productDesc}
              </p>
              <ul className="space-y-3 mb-8">
                {h.productBullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#131A20]/75">
                    <CheckCircle2 className="w-4 h-4 text-[#22a55d] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/aanbod')}
                  className="flex items-center gap-2 bg-[#22a55d] hover:bg-[#1a9050] text-white font-semibold px-6 py-3 rounded-full transition-all hover:shadow-lg hover:shadow-green-500/20 text-sm"
                >
                  {h.viewOffer} <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('/calculator')}
                  className="flex items-center gap-2 border border-gray-200 hover:border-gray-300 text-[#131A20] font-medium px-6 py-3 rounded-full transition-all text-sm hover:bg-white"
                >
                  {h.calcSavings}
                </button>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="rounded-3xl overflow-hidden shadow-xl shadow-gray-100">
                <img
                  src="/assets/hyxipower-lineup.png"
                  alt="HYXiPower thuisbatterij buitenopstelling"
                  className="w-full h-auto"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TECHNISCHE SPECS STRIP */}
      <section className="py-14 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: h.specCapacity, value: '10,6 – 26,5 kWh', icon: <Battery className="w-4 h-4" /> },
              { label: h.specTech,     value: 'LFP-lithium',      icon: <Zap className="w-4 h-4" /> },
              { label: h.specCycles,   value: nl ? 'Modulair' : 'Modular', icon: <TrendingUp className="w-4 h-4" /> },
              { label: h.specWarranty, value: nl ? 'Fabrieksgarantie' : 'Factory warranty', icon: <Shield className="w-4 h-4" /> },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center p-6 rounded-2xl bg-[#F9F7F4] border border-gray-100">
                  <div className="flex justify-center text-[#22a55d] mb-3">{s.icon}</div>
                  <div className="text-2xl font-extrabold text-[#131A20] mb-1 tracking-tight">{s.value}</div>
                  <div className="text-xs text-[#131A20]/40 font-medium">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WAAROM SolarFast USPs */}
      <section className="py-24 bg-[#F9F7F4]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-100 text-[#22a55d] text-xs font-semibold px-4 py-2 rounded-full mb-5">
              <Shield className="w-3.5 h-3.5" />
              {h.whyBadge}
            </div>
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
              {h.whyTitle}
            </h2>
            <p className="text-[#131A20]/55 text-lg max-w-xl mx-auto leading-relaxed">
              {h.whySub}
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {h.whyUsps.map((usp, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-white rounded-3xl p-7 h-full border border-gray-100 hover:border-[#22a55d]/20 hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 hover:-translate-y-1.5 group">
                  <div className="w-11 h-11 rounded-2xl bg-[#22a55d]/10 flex items-center justify-center text-[#22a55d] mb-5 group-hover:bg-[#22a55d]/15 transition-colors">
                    {WHY_ICONS[i]}
                  </div>
                  <h3 className="font-bold text-base mb-2 text-[#131A20]">{usp.title}</h3>
                  <p className="text-sm text-[#131A20]/55 leading-relaxed">{usp.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-10">
            <button
              onClick={() => navigate('/waarom-solarfast')}
              className="inline-flex items-center gap-2 border border-gray-200 hover:border-[#22a55d] hover:text-[#22a55d] text-[#131A20]/60 font-medium px-6 py-3 rounded-full transition-all text-sm"
            >
              {h.whyMore} <ArrowRight className="w-4 h-4" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 text-xs font-semibold px-4 py-2 rounded-full mb-5">
              <Star className="w-3.5 h-3.5" /> {h.reviewsBadge}
            </div>
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">{h.reviewsTitle}</h2>
            <p className="text-[#131A20]/55 text-lg max-w-xl mx-auto leading-relaxed">{h.reviewsSub}</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {h.reviews.map((review, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="bg-[#F9F7F4] rounded-3xl p-7 flex flex-col h-full border border-gray-100 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: review.stars }).map((_, s) => (
                      <svg key={s} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[#131A20]/70 text-sm leading-relaxed flex-1 mb-5 italic">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#22a55d]/15 flex items-center justify-center text-[#22a55d] font-bold text-sm flex-shrink-0">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#131A20]">{review.name}</div>
                      <div className="text-xs text-[#131A20]/45">{review.location}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INSTALLATIE GALLERY */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">{h.installTitle}</h2>
            <p className="text-[#131A20]/55 text-lg max-w-xl mx-auto">
              {h.installDesc}
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Reveal delay={0} className="col-span-2 md:col-span-1 row-span-2">
              <div className="rounded-3xl overflow-hidden h-full min-h-64">
                <img src="/assets/installaties/install-technician.jpg" alt="HYXiPower installatie door monteur" className="w-full h-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="rounded-3xl overflow-hidden aspect-video">
                <img src="/assets/installaties/install-09.jpg" alt="HYXiPower in garage" className="w-full h-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="rounded-3xl overflow-hidden aspect-video">
                <img src="/assets/installaties/install-05.jpg" alt="HYXiPower aan de muur" className="w-full h-full object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-[#22a55d] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-white/8" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-white/5" />
        </div>
        <div className="max-w-3xl mx-auto text-center px-6 relative">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-7">
              <Zap className="w-3.5 h-3.5" /> {h.ctaBadge}
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-[1.05] tracking-tight">
              {h.ctaTitle}
            </h2>
            <p className="text-white/75 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              {h.ctaDesc}
            </p>
            <button
              onClick={() => navigate('/calculator')}
              className="inline-flex items-center gap-3 bg-white hover:bg-green-50 text-[#22a55d] font-bold px-9 py-4 rounded-full transition-all hover:shadow-2xl hover:shadow-black/10 text-lg"
            >
              {h.ctaBtn} <ArrowRight className="w-5 h-5" />
            </button>
            <p className="mt-5 text-xs text-white/60">{h.ctaSub}</p>
          </Reveal>
        </div>
      </section>

      <footer className="bg-[#F9F7F4] border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <img src="/assets/solarfast-logo.png" alt="SolarFast" className="h-9 w-auto mb-3" />
            <p className="text-sm text-[#131A20]/45 leading-relaxed mb-4">HYXiPower partner in Nederland. Uw thuisbatterij specialist.</p>
            <a href="mailto:info@solarfast.nl" className="text-sm text-[#22a55d] font-medium hover:underline">info@solarfast.nl</a>
          </div>
          <div>
            <div className="text-xs font-bold text-[#131A20]/30 uppercase tracking-widest mb-4">Producten</div>
            <ul className="space-y-2.5 text-sm text-[#131A20]/55">
              <li><button onClick={() => navigate('/aanbod')} className="hover:text-[#22a55d] transition-colors text-left">Ons aanbod</button></li>
              <li><button onClick={() => navigate('/hyxipower')} className="hover:text-[#22a55d] transition-colors text-left">Over HYXiPower</button></li>
              <li><button onClick={() => navigate('/calculator')} className="hover:text-[#22a55d] transition-colors text-left">Bereken besparing</button></li>
              <li><button onClick={() => navigate('/warmtefonds')} className="hover:text-[#22a55d] transition-colors text-left">Warmtefonds</button></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold text-[#131A20]/30 uppercase tracking-widest mb-4">Informatie</div>
            <ul className="space-y-2.5 text-sm text-[#131A20]/55">
              <li><button onClick={() => navigate('/hoe-werkt-het')} className="hover:text-[#22a55d] transition-colors text-left">Hoe werkt het?</button></li>
              <li><button onClick={() => navigate('/waarom-solarfast')} className="hover:text-[#22a55d] transition-colors text-left">Waarom SolarFast</button></li>
              <li><button onClick={() => navigate('/faq')} className="hover:text-[#22a55d] transition-colors text-left">Veelgestelde vragen</button></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold text-[#131A20]/30 uppercase tracking-widest mb-4">HYXiPower</div>
            <ul className="space-y-2.5 text-sm text-[#131A20]/55">
              <li className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#22a55d] flex-shrink-0" />LFP/LiFePO4 celtechnologie</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#22a55d] flex-shrink-0" />Slim EMS-beheer</li>
              <li className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#22a55d] flex-shrink-0" />All-in-One</li>
              <li className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-[#22a55d] flex-shrink-0" />Modulair uitbreidbaar</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[#131A20]/35">© {new Date().getFullYear()} SolarFast · HYXiPower partner Nederland</p>
            <p className="text-xs text-[#131A20]/30">info@solarfast.nl</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
