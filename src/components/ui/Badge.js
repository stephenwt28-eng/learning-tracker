export default function Badge({ children, color = 'gray' }) {
  const colors = {
    gray: 'bg-stone-100 text-stone-700',
    green: 'bg-emerald-100 text-emerald-700',
    yellow: 'bg-amber-100 text-amber-700',
    blue: 'bg-sky-100 text-sky-700',
  }

  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  )
}
