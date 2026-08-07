import Link from 'next/link'
import Image from 'next/image'

export default function NavLinks() {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-lg bg-white p-1.5">
        <Image
          src="/everPOWER_logo_isolated.png"
          alt="Learning Tracker logo"
          width={32}
          height={32}
          priority
        />
      </div>
      <nav className="flex gap-5 text-sm font-semibold">
        <Link href="/dashboard" className="text-white hover:text-orange-400">
          Dashboard
        </Link>
        <Link href="/dashboard/learning" className="text-white hover:text-orange-400">
          Learning Entries
        </Link>
        <Link href="/dashboard/profile" className="text-white hover:text-orange-400">
          Profile
        </Link>
      </nav>
    </div>
  )
}
