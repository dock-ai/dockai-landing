import Link from 'next/link'
import Image from 'next/image'

const docsNav = [
  { href: '/docs', label: 'Overview' },
  { href: '/docs/entity-card', label: 'Entity Card' },
  { href: '/docs/submit', label: 'Submit Domain' },
  { href: '/docs/providers', label: 'For Providers' },
  { href: '/docs/mcp', label: 'For AI Agents' },
  { href: '/docs/api', label: 'API Reference' },
]

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-white">
            <Image src="/icon.svg" alt="Dock AI" width={24} height={24} />
            Dock AI
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/docs" className="text-sm text-white">
              Docs
            </Link>
            <Link
              href="/providers"
              className="text-sm text-teal-400 hover:text-teal-300"
            >
              For MCP Providers
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="w-48 shrink-0">
          <nav className="sticky top-8 space-y-1">
            {docsNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 rounded"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          <article className="prose prose-invert prose-zinc max-w-none prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-code:text-teal-400 prose-code:bg-zinc-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800">
            {children}
          </article>
        </main>
      </div>
    </div>
  )
}
