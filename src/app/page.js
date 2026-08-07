import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <Image
        src="/everPOWER_LearningTracker_logofull.png"
        alt="Learning Tracker logo"
        width={320}
        height={320}
        priority
      />

      <p className="mx-auto mt-2 max-w-md text-lg text-gray-500">
        A simple, private dashboard to track what you&apos;re learning —
        topics, progress, confidence, and notes, all in one place.
      </p>

      <div className="mt-8 flex justify-center gap-3">
        <Link href="/register">
          <Button>Get Started</Button>
        </Link>
        <Link href="/login">
          <Button variant="secondary">Log In</Button>
        </Link>
      </div>
    </div>
  )
}
