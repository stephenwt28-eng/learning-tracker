import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: userData } = await supabase.auth.getUser()

  const { data: entries, error } = await supabase
    .from('learning_entries')
    .select('status')
    .eq('user_id', userData.user.id)

  const total = entries?.length || 0

  const counts = {
    'Not Started': 0,
    'Learning': 0,
    'Practicing': 0,
    'Completed': 0,
  }

  entries?.forEach((entry) => {
    if (counts[entry.status] !== undefined) {
      counts[entry.status] += 1
    }
  })

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <Link href="/dashboard/learning/new">
          <Button>+ New Entry</Button>
        </Link>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error.message}</p>
      )}

      {!error && total === 0 && (
        <Card>
          <p className="text-gray-600">
            You haven&apos;t added any learning entries yet.{' '}
            <Link href="/dashboard/learning/new" className="underline">
              Create your first one
            </Link>
            .
          </p>
        </Card>
      )}

      {!error && total > 0 && (
        <>
          <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
            <Card>
              <p className="text-2xl font-bold">{total}</p>
              <p className="text-sm text-gray-600">Total</p>
            </Card>
            {Object.entries(counts).map(([status, count]) => (
              <Card key={status}>
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-sm text-gray-600">{status}</p>
              </Card>
            ))}
          </div>

          <Link href="/dashboard/learning" className="text-sm underline">
            View all learning entries →
          </Link>
        </>
      )}
    </div>
  )
}
