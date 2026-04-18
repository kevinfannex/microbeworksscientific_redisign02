import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import HomePage from './pages/HomePage'
import SciencePage from './pages/SciencePage'
import ProcessPage from './pages/ProcessPage'
import ProductsPage from './pages/ProductsPage'
import TeamPage from './pages/TeamPage'
import ConnectPage from './pages/ConnectPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/science" element={<SciencePage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/connect" element={<ConnectPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
