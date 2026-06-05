import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();
  return (
    <footer className="relative z-10 px-6 lg:px-12 py-8 lg:py-12 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-6 flex-wrap" style={{ backgroundColor: isDark ? '#000000' : '#ffffff' }}>
      <a
        href="/#hero"
        onClick={(e) => {
          e.preventDefault()
          const element = document.getElementById('hero')
          if (element) {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            })
          } else {
            window.location.href = '/'
          }
        }}
        className="font-display font-bold text-[0.8rem] text-accent tracking-[0.15em] no-underline hover:text-accent2 transition-colors duration-300"
      >
        Microbeworks Scientific
      </a>

      <div className="flex gap-6 lg:gap-8 flex-wrap justify-center">
        <a
          href="/#science"
          className="font-display font-bold text-[0.75rem] text-text-primary no-underline tracking-[0.1em] uppercase transition-colors duration-300 hover:text-accent"
        >
          About
        </a>
        <a
          href="/#products"
          className="font-display font-bold text-[0.75rem] text-text-primary no-underline tracking-[0.1em] uppercase transition-colors duration-300 hover:text-accent"
        >
          Products
        </a>

        <a
          href="/#team"
          className="font-display font-bold text-[0.75rem] text-text-primary no-underline tracking-[0.1em] uppercase transition-colors duration-300 hover:text-accent"
        >
          Team
        </a>
        <a
          href="/#contact"
          className="font-display font-bold text-[0.75rem] text-text-primary no-underline tracking-[0.1em] uppercase transition-colors duration-300 hover:text-accent"
        >
          Contact
        </a>
      </div>

      <div className="text-[0.75rem] text-text-primary font-mono">
        © 2025 Microbeworks Scientific Pvt Ltd · All rights reserved.
      </div>
    </footer>
  )
}
