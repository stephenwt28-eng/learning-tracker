import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-200 via-emerald-100 to-transparent opacity-60 blur-3xl" />

      <div className="relative">
        <div className="flex justify-center">
          <Image
            src="/LearningTracker_pencil-removebg-preview.png"
            alt="Learning Tracker logo"
            width={260}
            height={260}
            priority
            className="translate-x-4"
          />
        </div>

        <p className="mx-auto mt-4 max-w-md text-lg text-gray-500">
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
    </div>
  )
}
