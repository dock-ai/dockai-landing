'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="border-b border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-white">
          <Image src="/icon.svg" alt="Dock AI" width={24} height={24} />
          Dock AI
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/install"
            className={`text-sm cursor-pointer ${
              isActive('/install') ? 'text-teal-400' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Install Connector
          </Link>
          <Link
            href="/experts"
            className={`text-sm cursor-pointer ${
              isActive('/experts') || pathname.startsWith('/experts/') ? 'text-teal-400' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Experts
          </Link>
          <Link
            href="/docs"
            className={`text-sm cursor-pointer ${
              isActive('/docs') || pathname.startsWith('/docs/') ? 'text-teal-400' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Docs
          </Link>
          <Link
            href="/providers"
            className={`text-sm cursor-pointer ${
              isActive('/providers') ? 'text-teal-400' : 'text-zinc-400 hover:text-white'
            }`}
          >
            For Providers
          </Link>
        </nav>
      </div>
    </header>
  )
}
