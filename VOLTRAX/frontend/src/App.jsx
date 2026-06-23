import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import CalculatorPage from './pages/CalculatorPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import HoeWerktHetPage from './pages/HoeWerktHetPage.jsx'
import AanbodPage from './pages/AanbodPage.jsx'
import OverOnsPage from './pages/OverOnsPage.jsx'
import AlphaESSPage from './pages/AlphaESSPage.jsx'
import WarmtefondsPage from './pages/WarmtefondsPage.jsx'
import WaaromVoltraxPage from './pages/WaaromVoltraxPage.jsx'
import FAQPage from './pages/FAQPage.jsx'
import VideoTemplate from './components/video/VideoTemplate'
import { LanguageProvider } from './context/LanguageContext'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/"               element={<HomePage />} />
          <Route path="/hoe-werkt-het"  element={<HoeWerktHetPage />} />
          <Route path="/aanbod"         element={<AanbodPage />} />
          <Route path="/over-ons"       element={<OverOnsPage />} />
          <Route path="/alphaess"       element={<AlphaESSPage />} />
          <Route path="/warmtefonds"    element={<WarmtefondsPage />} />
          <Route path="/waarom-voltrax" element={<WaaromVoltraxPage />} />
          <Route path="/faq"            element={<FAQPage />} />
          <Route path="/calculator"     element={<CalculatorPage />} />
          <Route path="/results"        element={<ResultsPage />} />
          <Route path="/video"          element={<VideoTemplate />} />
        </Routes>
      </Router>
    </LanguageProvider>
  )
}

export default App
