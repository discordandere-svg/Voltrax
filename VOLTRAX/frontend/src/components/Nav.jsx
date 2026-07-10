import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Menu, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Nav() {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { lang, setLang, t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const LINKS = [
    { to: '/',              label: t.nav.home },
    { to: '/hyxipower',      label: t.nav.alphaess },
    { to: '/warmtefonds',   label: t.nav.warmtefonds },
    { to: '/aanbod',        label: t.nav.aanbod },
    { to: '/hoe-werkt-het', label: t.nav.hoeWerktHet },
    { to: '/waarom-solarfast', label: t.nav.waaromSolarFast },
    { to: '/over-ons',       label: t.nav.overOns },
    { to: '/faq',            label: t.nav.faq },
  ]

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  function LangToggle({ className = '' }) {
    return (
      <button
        onClick={() => setLang(lang === 'nl' ? 'en' : 'nl')}
        className={`inline-flex items-center gap-0.5 rounded-full border border-gray-200 text-xs font-bold overflow-hidden transition-all hover:border-gray-300 ${className}`}
        aria-label="Toggle language"
      >
        <span className={`px-2.5 py-1.5 transition-colors ${lang === 'nl' ? 'bg-[#131A20] text-white' : 'text-[#131A20]/40 hover:text-[#131A20]/70'}`}>NL</span>
        <span className={`px-2.5 py-1.5 transition-colors ${lang === 'en' ? 'bg-[#131A20] text-white' : 'text-[#131A20]/40 hover:text-[#131A20]/70'}`}>EN</span>
      </button>
    )
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${scrolled ? 'border-gray-200 shadow-md shadow-black/[0.04]' : 'border-gray-100 shadow-none'}`}
    >
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 flex-shrink-0">
          <img src="/assets/solarfast-logo.png" alt="SolarFast" className="h-9 w-auto" />
          <span className="text-xl font-extrabold tracking-tight text-[#131A20] hidden sm:inline">
            SOLAR<span style={{ color: '#22a55d' }}>FAST</span>
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-1">
          {LINKS.map((link) => (
            <button
              key={link.to}
              onClick={() => navigate(link.to)}
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                isActive(link.to)
                  ? 'bg-[#22a55d]/10 text-[#22a55d] font-semibold'
                  : 'text-[#131A20]/60 hover:text-[#131A20] hover:bg-gray-50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <LangToggle />
          <button
            onClick={() => navigate('/calculator')}
            className="hidden sm:flex items-center gap-2 bg-[#22a55d] hover:bg-[#1a9050] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-green-500/20 whitespace-nowrap"
          >
            {t.nav.cta} <ChevronRight className="w-4 h-4" />
          </button>
          <button
            className="lg:hidden p-2 rounded-lg text-[#131A20]/60 hover:text-[#131A20] hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-1"
        >
          {LINKS.map((link) => (
            <button
              key={link.to}
              onClick={() => { navigate(link.to); setMenuOpen(false) }}
              className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                isActive(link.to)
                  ? 'bg-[#22a55d]/10 text-[#22a55d] font-semibold'
                  : 'text-[#131A20]/60 hover:bg-gray-50 hover:text-[#131A20]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { navigate('/calculator'); setMenuOpen(false) }}
            className="w-full bg-[#22a55d] hover:bg-[#1a9050] text-white font-semibold px-4 py-3 rounded-2xl text-sm mt-2 transition-colors"
          >
            {t.nav.cta}
          </button>
        </motion.div>
      )}
    </motion.nav>
  )
}
