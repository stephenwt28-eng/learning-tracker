export default function Card({ children, accentColor }) {
  const borderColors = {
    gray: 'border-l-stone-300',
    green: 'border-l-emerald-500',
    yellow: 'border-l-amber-500',
    blue: 'border-l-sky-500',
  }

  const accent = accentColor ? borderColors[accentColor] : ''

  return (
    <div
      className={`rounded-xl border border-[var(--border-color)] ${accent ? `border-l-4 ${accent}` : ''} bg-white p-4 shadow-sm transition-shadow hover:shadow-md`}
    >
      {children}
    </div>
  )
}
