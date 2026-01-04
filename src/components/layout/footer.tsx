import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-auto py-8 px-4 border-t border-zinc-800">
      <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-zinc-500">
        <p>Dock AI - First EDP Registry</p>
        <div className="flex gap-4">
          <Link href="/experts" className="hover:text-white">
            Experts
          </Link>
          <Link href="/docs" className="hover:text-white">
            Docs
          </Link>
          <a
            href="https://github.com/edp-protocol/entity-discovery-protocol"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Protocol
          </a>
          <a
            href="https://github.com/dock-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
