import Link from 'next/link'
import Image from 'next/image'

export default function NavLinks() {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-lg bg-white p-1.5">
        <Image
          src="/LearningTracker_pencil-removebg-preview.png"
          alt="Learning Tracker logo"
          width={40}
          height={40}
          priority
        />
      </div>
      <nav className="flex gap-5 text-sm font-semibold">
        <Link href="/dashboard" className="text-white hover:text-emerald-400">
          Dashboard
        </Link>
        <Link href="/dashboard/learning" className="text-white hover:text-emerald-400">
          Learning Entries
        </Link>
        <Link href="/dashboard/profile" className="text-white hover:text-emerald-400">
          Profile
        </Link>
      </nav>
    </div>
  )
}
