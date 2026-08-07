'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function NewLearningEntryPage() {
  const [topic, setTopic] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('Not Started')
  const [confidence, setConfidence] = useState('Low')
  const [notes, setNotes] = useState('')
  const [studyDate, setStudyDate] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const res = await fetch('/api/learning', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic,
        category,
        status,
        confidence,
        notes,
        study_date: studyDate || null,
      }),
    })

    const result = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(result.error || 'Something went wrong')
      return
    }

    router.push('/dashboard/learning')
  }

  return (
    <div className="mx-auto w-full max-w-md px-1 sm:px-0">
      <h1 className="mb-4 text-2xl font-bold tracking-tight">New Learning Entry</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-sm text-red-600">{error}</p>}

        <Input
          label="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />

        <Input
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[var(--border-color)] px-3 py-2"
          >
            <option>Not Started</option>
            <option>Learning</option>
            <option>Practicing</option>
            <option>Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Confidence</label>
          <select
            value={confidence}
            onChange={(e) => setConfidence(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[var(--border-color)] px-3 py-2"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[var(--border-color)] px-3 py-2"
            rows={3}
          />
        </div>

        <Input
          label="Study Date"
          type="date"
          value={studyDate}
          onChange={(e) => setStudyDate(e.target.value)}
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Entry'}
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.push('/dashboard/learning')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
