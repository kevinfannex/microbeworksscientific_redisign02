import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const location = useLocation()
  const { isDark } = useTheme()

  const navLinks = [
    { to: 'science', label: 'About' },
    { to: 'products', label: 'Products' },
    { to: 'team', label: 'Team' },
    { to: 'contact', label: 'Contact' },
  ]

  useEffect(() => {
    const threshold = location.pathname === '/' ? 200 : 50
    const handleScroll = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  // Scroll spy to highlight active nav link
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('')
      return
    }

    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 200 // Offset for navbar

      for (const link of navLinks) {
        const element = document.getElementById(link.to)
        if (element) {
          const top = element.offsetTop
          const height = element.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.to)
            return
          }
        }
      }
      
      if (window.scrollY < 200) {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', handleScrollSpy)
    handleScrollSpy()

    return () => window.removeEventListener('scroll', handleScrollSpy)
  }, [location.pathname])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('overflow-hidden')
      document.documentElement.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
      document.documentElement.classList.remove('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
      document.documentElement.classList.remove('overflow-hidden')
    }
  }, [menuOpen])

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      window.location.href = `/#${targetId}`
      return
    }
    const element = document.getElementById(targetId)
    if (element) {
      const offset = 80 // Navbar height offset
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setActiveSection(targetId)
    }
    setMenuOpen(false)
  }

  const showNavbar = true

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] px-6 lg:px-12 py-0 lg:py-0 flex items-center justify-between transition-all duration-500 bg-surface/80 backdrop-blur-[20px] border-b border-border-default shadow-[0_1px_0_rgba(0,0,0,0.03)]`}
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={(e) => handleNavClick(e, 'hero')}
          className="relative z-[100] no-underline flex items-center"
        >
          <img
            src={isDark ? '/Logo_Nameonly_White_Text_Transparent.png' : '/Logo_Nameonly_Black_Text_Transparent.png'}
            alt="Microbeworks"
            className="h-16 md:h-24 w-auto object-contain py-1"
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex gap-10 list-none">
          {navLinks.map((link) => (
            <li key={link.to}>
              <a
                href={`#${link.to}`}
                onClick={(e) => handleNavClick(e, link.to)}
                className={`font-display font-bold text-[0.8rem] tracking-[0.12em] uppercase no-underline transition-all duration-300 hover:scale-105 inline-block ${
                  activeSection === link.to
                    ? 'text-accent shadow-[0_2px_0_rgba(92,193,255,0.6)]'
                    : 'text-text-muted hover:text-accent'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme Toggle */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
        </div>

        {/* Mobile Hamburger */}
        <button
          className="relative z-[100] lg:hidden flex flex-col justify-center gap-1.5 bg-transparent border-none cursor-pointer p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[1.5px] bg-text-primary transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7.5px]' : ''}`} />
          <span className={`block w-6 h-[1.5px] bg-text-primary transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[1.5px] bg-text-primary transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7.5px]' : ''}`} />
        </button>

      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-0 bg-bg z-[99] flex flex-col items-center justify-center gap-10 transition-all duration-500 lg:hidden ${menuOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
          }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.to}
            href={`#${link.to}`}
            onClick={(e) => handleNavClick(e, link.to)}
            className={`font-display font-bold text-2xl md:text-3xl tracking-[0.15em] uppercase no-underline transition-all duration-300 hover:scale-105 ${
              activeSection === link.to
                ? 'text-accent'
                : 'text-text-primary hover:text-accent'
            }`}
          >
            {link.label}
          </a>
        ))}
        <div className="mt-2">
          <ThemeToggle />
        </div>
      </div>
    </>
  )
}
