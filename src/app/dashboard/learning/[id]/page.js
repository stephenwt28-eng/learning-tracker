'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function EditLearningEntryPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params

  const [topic, setTopic] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('Not Started')
  const [confidence, setConfidence] = useState('Low')
  const [notes, setNotes] = useState('')
  const [studyDate, setStudyDate] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadEntry() {
      const res = await fetch(`/api/learning/${id}`)
      const result = await res.json()

      if (!res.ok) {
        setError(result.error || 'Failed to load entry')
        setLoading(false)
        return
      }

      const entry = result.data
      setTopic(entry.topic)
      setCategory(entry.category)
      setStatus(entry.status)
      setConfidence(entry.confidence)
      setNotes(entry.notes || '')
      setStudyDate(entry.study_date || '')
      setLoading(false)
    }

    loadEntry()
  }, [id])

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSaving(true)

    const res = await fetch(`/api/learning/${id}`, {
      method: 'PUT',
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
    setSaving(false)

    if (!res.ok) {
      setError(result.error || 'Failed to save')
      return
    }

    router.push('/dashboard/learning')
  }

  async function handleDelete() {
    const confirmed = window.confirm('Delete this entry? This cannot be undone.')
    if (!confirmed) return

    const res = await fetch(`/api/learning/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      const result = await res.json()
      setError(result.error || 'Failed to delete')
      return
    }

    router.push('/dashboard/learning')
  }

  if (loading) {
    return <p className="text-gray-600">Loading...</p>
  }

  return (
    <div className="mx-auto w-full max-w-md px-1 sm:px-0">
      <h1 className="mb-4 text-2xl font-bold">Edit Learning Entry</h1>

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
            className="mt-1 w-full rounded border px-3 py-2"
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
            className="mt-1 w-full rounded border px-3 py-2"
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
            className="mt-1 w-full rounded border px-3 py-2"
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
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button type="button" variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </form>
    </div>
  )
}
