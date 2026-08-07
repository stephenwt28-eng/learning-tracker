import { createClient } from '@/lib/supabase/server'
import Card from '@/components/ui/Card'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: userData } = await supabase.auth.getUser()

  const joinedDate = new Date(userData.user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="max-w-md">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Profile</h1>

      <Card>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold text-gray-900">{userData.user.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Member since</p>
            <p className="font-semibold text-gray-900">{joinedDate}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
