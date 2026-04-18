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

  const navLinks = [
    { to: '/science', label: 'Science' },
    { to: '/process', label: 'Process' },
    { to: '/products', label: 'Products' },
    { to: '/team', label: 'Team' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] px-6 lg:px-12 py-4 lg:py-5 flex items-center justify-between transition-all duration-400 ${scrolled && !menuOpen
            ? 'bg-white/92 backdrop-blur-[20px] border-b border-border-default shadow-[0_1px_0_rgba(0,0,0,0.06)]'
            : ''
          }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="relative z-[100] font-mono text-[0.85rem] tracking-[0.15em] text-accent no-underline flex items-center gap-2.5"
        >
          <img 
            src="https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/Screenshot_2026-04-18_232705-removebg-preview.png" 
            alt="Microbeworks" 
            className="h-8 md:h-10 w-auto object-contain"
          />
          <span className="hidden sm:inline">MICROBEWORKS</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex gap-10 list-none">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`text-[0.8rem] tracking-[0.1em] uppercase no-underline transition-colors duration-300 ${location.pathname === link.to
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
        className={`fixed inset-0 top-0 bg-white z-[99] flex flex-col items-center justify-center gap-10 transition-all duration-500 lg:hidden ${menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
          }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-2xl md:text-3xl tracking-[0.15em] uppercase no-underline transition-colors duration-300 ${location.pathname === link.to
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
    </>
  )
}
