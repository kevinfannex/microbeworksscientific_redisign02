import SectionLabel from '../SectionLabel'
import useScrollReveal from '../../hooks/useScrollReveal'

const team = [
  { initials: 'AK', name: 'Arjun Krishnan', role: 'CEO & Co-Founder', bio: 'Former VP at Ginkgo Bioworks. Led scale-up of 3 commercial fermentation programs. MBA Harvard, BSc MIT.', cred: 'PREV: GINKGO BIOWORKS · ZYMERGEN', gradient: 'from-accent to-accent3' },
  { initials: 'PM', name: 'Dr. Priya Mehta', role: 'CSO & Co-Founder', bio: 'PhD Synthetic Biology, Imperial College London. 14 patents in metabolic engineering. Former PI at ETH Zürich.', cred: 'PREV: ETH ZÜRICH · IMPERIAL COLLEGE', gradient: 'from-accent2 to-[#0a8a50]' },
  { initials: 'TL', name: 'Thomas Laurent', role: 'CTO', bio: 'Built AI-driven strain optimization at Bolt Threads. MSc Bioinformatics, EPFL. Expert in DBTL cycle automation.', cred: 'PREV: BOLT THREADS · SPIBER', gradient: 'from-[#f5a623] to-[#c07010]' },
  { initials: 'SC', name: 'Sophie Chen', role: 'Head of Partnerships', bio: '10 years textile industry. Former sustainability director at Patagonia. Relationships with 40+ tier-1 fabric mills globally.', cred: 'PREV: PATAGONIA · EILEEN FISHER', gradient: 'from-[#a855f7] to-[#6d28d9]' },
]

const investors = ['BREAKTHROUGH ENERGY', 'CONGRUENT VC', 'Y COMBINATOR']

export default function TeamSection() {
  const sectionRef = useScrollReveal()

  return (
    <section id="team" ref={sectionRef} className="relative px-4 md:px-8 lg:px-12 py-24 md:py-32 lg:py-40 bg-bg">
      <div className="max-w-[1200px] mx-auto">
        <SectionLabel className="reveal">The Team</SectionLabel>
        <h2 className="reveal reveal-delay-1 font-display text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.1] text-text-primary tracking-tight">
          Built by scientists.<br /><em className="italic text-accent">Led by vision.</em>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-20">
          {team.map((m, i) => (
            <div key={m.initials} className={`reveal reveal-delay-${i} team-card-bar relative overflow-hidden border border-border-default bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)] backdrop-blur-[10px] px-4 py-6 md:px-6 md:py-8 transition-all duration-300 hover:border-border-bright hover:-translate-y-1 hover:shadow-[0_4px_32px_rgba(0,255,136,0.18)]`}>
              <div className={`w-13 h-13 rounded-full bg-gradient-to-br ${m.gradient} flex items-center justify-center font-mono text-[0.85rem] font-bold text-white mb-5`}>
                {m.initials}
              </div>
              <div className="text-[0.95rem] font-semibold text-text-primary mb-1">{m.name}</div>
              <div className="text-[0.78rem] text-accent font-mono tracking-[0.05em] mb-3">{m.role}</div>
              <div className="text-[0.8rem] text-text-muted leading-relaxed font-light">{m.bio}</div>
              <div className="mt-4 pt-4 border-t border-border-default font-mono text-[0.65rem] text-text-dim tracking-[0.08em]">{m.cred}</div>
            </div>
          ))}
        </div>

        {/* Investors */}
        <div className="reveal mt-12 md:mt-16 px-5 py-6 md:px-8 md:py-8 border border-border-default bg-surface flex flex-col md:flex-row items-center justify-between gap-6 flex-wrap">
          <div>
            <div className="font-mono text-[0.65rem] text-accent tracking-[0.2em] mb-2">BACKED BY</div>
            <div className="flex gap-6 md:gap-10 flex-wrap">
              {investors.map((inv) => (
                <span key={inv} className="font-mono text-[0.8rem] text-text-muted opacity-70">{inv}</span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="font-display text-[1.8rem] text-accent">$18M</div>
            <div className="font-mono text-[0.65rem] text-text-muted tracking-[0.15em]">SERIES A · 2025</div>
          </div>
        </div>
      </div>
    </section>
  )
}
