import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Entity Not Found</h1>
        <p className="text-zinc-400 mb-8 max-w-md">
          This business is not yet registered in the Dock AI registry.
          Want to connect your business to AI assistants?
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-lg transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}
