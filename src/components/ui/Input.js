export default function Input({ label, ...props }) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium">{label}</label>
      )}
      <input
        className="mt-1 w-full rounded border px-3 py-2"
        {...props}
      />
    </div>
  )
}
