import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const navLinks = [
    { to: '/science', label: 'Science' },
    { to: '/process', label: 'Process' },
    { to: '/products', label: 'Products' },
    { to: '/team', label: 'Team' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] px-6 lg:px-12 py-4 lg:py-5 flex items-center justify-between transition-all duration-400 ${
        scrolled
          ? 'bg-white/92 backdrop-blur-[20px] border-b border-border-default shadow-[0_1px_0_rgba(0,0,0,0.06)]'
          : ''
      }`}
    >
      {/* Logo */}
      <Link
        to="/"
        className="font-mono text-[0.85rem] tracking-[0.15em] text-accent no-underline flex items-center gap-2.5"
      >
        <div className="w-6 h-6 border-[1.5px] border-accent rounded-full flex items-center justify-center text-[0.6rem] font-bold">
          M
        </div>
        <span className="hidden sm:inline">MICROBEWORKS</span>
      </Link>

      {/* Desktop Nav Links */}
      <ul className="hidden lg:flex gap-10 list-none">
        {navLinks.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={`text-[0.8rem] tracking-[0.1em] uppercase no-underline transition-colors duration-300 ${
                location.pathname === link.to
                  ? 'text-accent'
                  : 'text-text-muted hover:text-accent'
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop CTA */}
      <Link
        to="/connect"
        className="hidden lg:inline-block bg-transparent border border-border-bright text-accent text-[0.8rem] tracking-[0.1em] uppercase px-5 py-2.5 font-body transition-all duration-300 hover:bg-accent/12 hover:shadow-[0_0_20px_rgba(0,255,136,0.2)]"
      >
        Partner With Us
      </Link>

      {/* Mobile Hamburger */}
      <button
        className={`lg:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-2 ${
          menuOpen ? 'hamburger-open' : ''
        }`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className="hamburger-line block w-6 h-[1.5px] bg-text-primary" />
        <span className="hamburger-line block w-6 h-[1.5px] bg-text-primary" />
        <span className="hamburger-line block w-6 h-[1.5px] bg-text-primary" />
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-0 bg-white z-[99] flex flex-col items-center justify-center gap-8 transition-all duration-500 lg:hidden ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-xl tracking-[0.15em] uppercase no-underline transition-colors duration-300 ${
              location.pathname === link.to
                ? 'text-accent'
                : 'text-text-primary hover:text-accent'
            }`}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/connect"
          className="mt-4 border border-border-bright text-accent text-sm tracking-[0.1em] uppercase px-6 py-3 transition-all duration-300 hover:bg-accent/12 no-underline"
          onClick={() => setMenuOpen(false)}
        >
          Partner With Us
        </Link>
      </div>
    </nav>
  )
}
