export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'rounded-lg px-5 py-2.5 text-sm font-semibold disabled:opacity-50 transition-all'
  const variants = {
    primary: 'gradient-brand text-white shadow-md hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'border-2 border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-white',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
