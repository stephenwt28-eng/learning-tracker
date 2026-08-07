'use client'

import Button from '@/components/ui/Button'

export default function LearningError({ error, reset }) {
  return (
    <div className="rounded border border-red-200 bg-red-50 p-6">
      <h2 className="text-lg font-semibold text-red-800">
        Something went wrong
      </h2>
      <p className="mt-2 text-sm text-red-700">
        {error?.message || 'An unexpected error occurred loading your learning entries.'}
      </p>
      <div className="mt-4">
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  )
}
