import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

const STATUSES = ['Not Started', 'Learning', 'Practicing', 'Completed']

const statusAccent = {
  'Not Started': 'gray',
  'Learning': 'blue',
  'Practicing': 'yellow',
  'Completed': 'green',
}

export default async function LearningListPage({ searchParams }) {
  const { status } = await searchParams
  const supabase = await createClient()

  const { data: userData } = await supabase.auth.getUser()

  let query = supabase
    .from('learning_entries')
    .select('*')
    .eq('user_id', userData.user.id)
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data: entries, error } = await query

  const confidenceColor = {
    Low: 'yellow',
    Medium: 'blue',
    High: 'green',
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Learning Entries</h1>
        <Link href="/dashboard/learning/new">
          <Button>+ New Entry</Button>
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Link href="/dashboard/learning">
          <span
            className={`inline-block rounded-full px-3 py-1.5 text-sm font-medium ${
              !status
                ? 'bg-[var(--accent)] text-white'
                : 'border border-[var(--border-color)] text-gray-600 hover:bg-gray-50'
            }`}
          >
            All
          </span>
        </Link>
        {STATUSES.map((s) => (
          <Link key={s} href={`/dashboard/learning?status=${encodeURIComponent(s)}`}>
            <span
              className={`inline-block rounded-full px-3 py-1.5 text-sm font-medium ${
                status === s
                  ? 'bg-[var(--accent)] text-white'
                  : 'border border-[var(--border-color)] text-gray-600 hover:bg-gray-50'
              }`}
            >
              {s}
            </span>
          </Link>
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-600">{error.message}</p>
      )}

      {!error && entries?.length === 0 && (
        <p className="text-gray-500">
          {status
            ? `No entries with status "${status}".`
            : 'No entries yet. Click "New Entry" to add your first one.'}
        </p>
      )}

      <div className="space-y-3">
        {entries?.map((entry) => (
          <Card key={entry.id} accentColor={statusAccent[entry.status]}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">{entry.topic}</h2>
                <p className="text-sm text-gray-500">{entry.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>{entry.status}</Badge>
                <Badge color={confidenceColor[entry.confidence]}>
                  {entry.confidence}
                </Badge>
                <Link
                  href={`/dashboard/learning/${entry.id}`}
                  className="ml-1 rounded-lg p-1.5 hover:bg-gray-100"
                  aria-label="Edit entry"
                >
                  <Image
                    src="/LearningTracker_pencil_only-removebg-preview.png"
                    alt="Edit"
                    width={18}
                    height={18}
                  />
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
