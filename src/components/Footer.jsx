import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative z-10 px-6 lg:px-12 py-8 lg:py-12 border-t border-border-default bg-bg2 flex flex-col md:flex-row justify-between items-center gap-6 flex-wrap">
      <div className="font-mono text-[0.8rem] text-accent tracking-[0.15em]">
        MICROBEWORKS SCIENTIFIC
      </div>

      <div className="flex gap-6 lg:gap-8 flex-wrap justify-center">
        <Link
          to="/science"
          className="text-[0.75rem] text-text-dim no-underline tracking-[0.08em] uppercase transition-colors duration-300 hover:text-accent"
        >
          Science
        </Link>
        <Link
          to="/products"
          className="text-[0.75rem] text-text-dim no-underline tracking-[0.08em] uppercase transition-colors duration-300 hover:text-accent"
        >
          Products
        </Link>
        <Link
          to="/process"
          className="text-[0.75rem] text-text-dim no-underline tracking-[0.08em] uppercase transition-colors duration-300 hover:text-accent"
        >
          Process
        </Link>
        <Link
          to="/team"
          className="text-[0.75rem] text-text-dim no-underline tracking-[0.08em] uppercase transition-colors duration-300 hover:text-accent"
        >
          Team
        </Link>
      </div>

      <div className="text-[0.75rem] text-text-dim font-mono">
        © 2025 MicrobeWorks Scientific Inc. · All rights reserved.
      </div>
    </footer>
  )
}
