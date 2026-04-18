export default function SectionLabel({ children, className = '', center = false }) {
  return (
    <div
      className={`section-label-line font-mono text-[0.7rem] tracking-[0.2em] uppercase text-accent flex items-center gap-3 mb-5 ${center ? 'justify-center' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
