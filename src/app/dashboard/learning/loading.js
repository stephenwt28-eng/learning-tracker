export default function LoadingLearningEntries() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-28 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 animate-pulse rounded border bg-gray-100"
          />
        ))}
      </div>
    </div>
  )
}
