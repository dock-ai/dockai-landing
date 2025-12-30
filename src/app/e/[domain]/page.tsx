import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface Params {
  params: Promise<{ domain: string }>
}

interface McpResult {
  provider: string
  endpoint: string
  entity_id?: string
  capabilities?: string[]
  verification?: {
    level: number
    method?: string
  }
}

interface EntityResult {
  name: string
  path?: string
  location?: {
    city?: string
    country?: string
  }
  verification_level: number
  mcps: McpResult[]
}

interface ResolveResult {
  domain: string
  entities: EntityResult[]
}

async function getEntityData(domain: string): Promise<ResolveResult | null> {
  try {
    const res = await fetch(`https://api.dockai.co/v1/resolve/domain/${encodeURIComponent(domain)}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { domain } = await params
  const decodedDomain = decodeURIComponent(domain)
  const data = await getEntityData(decodedDomain)

  if (!data || data.entities.length === 0) {
    return {
      title: 'Entity Not Found | Dock AI',
      description: 'This entity is not yet registered in the Dock AI registry.',
    }
  }

  const entity = data.entities[0]
  const locationParts = [entity.location?.city, entity.location?.country].filter(Boolean)
  const location = locationParts.length > 0 ? ` in ${locationParts.join(', ')}` : ''

  const allCapabilities = new Set<string>()
  for (const mcp of entity.mcps) {
    for (const cap of mcp.capabilities || []) {
      allCapabilities.add(cap)
    }
  }
  const capabilitiesText = allCapabilities.size > 0
    ? ` AI actions available: ${[...allCapabilities].slice(0, 3).join(', ')}.`
    : ''

  const title = `${entity.name}${location} | AI-Enabled via Dock AI`
  const description = `${entity.name}${location} is connected to AI assistants through Dock AI.${capabilitiesText} Book, order, or inquire using natural language.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://dockai.co/e/${decodedDomain}`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: `https://dockai.co/e/${decodedDomain}`,
    },
  }
}

export default async function EntityPage({ params }: Params) {
  const { domain } = await params
  const decodedDomain = decodeURIComponent(domain)
  const data = await getEntityData(decodedDomain)

  if (!data || data.entities.length === 0) {
    notFound()
  }

  const primaryEntity = data.entities[0]
  const locationParts = [primaryEntity.location?.city, primaryEntity.location?.country].filter(Boolean)
  const location = locationParts.join(', ')

  // Get unique capabilities across all MCPs
  const allCapabilities = new Set<string>()
  for (const entity of data.entities) {
    for (const mcp of entity.mcps) {
      for (const cap of mcp.capabilities || []) {
        allCapabilities.add(cap)
      }
    }
  }

  // Get unique providers
  const providers = [...new Set(data.entities.flatMap(e => e.mcps.map(m => m.provider)).filter(Boolean))]

  // Schema.org structured data
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: primaryEntity.name,
    url: `https://${decodedDomain}`,
    ...(location && {
      address: {
        '@type': 'PostalAddress',
        addressLocality: primaryEntity.location?.city,
        addressCountry: primaryEntity.location?.country,
      },
    }),
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-teal-400 hover:text-teal-300">
            <Image src="/icon.svg" alt="Dock AI" width={24} height={24} />
            <span className="font-semibold">Dock AI</span>
          </Link>
          <a
            href={`https://${decodedDomain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-400 hover:text-white"
          >
            {decodedDomain}
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Entity Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {primaryEntity.name}
          </h1>
          {location && (
            <p className="text-zinc-400 text-lg">{location}</p>
          )}
        </div>

        {/* AI Status Badge */}
        <div className="mb-8 p-4 bg-teal-950/30 border border-teal-800 rounded-lg">
          <div className="flex items-center gap-2 text-teal-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">AI-Enabled Business</span>
          </div>
          <p className="mt-2 text-zinc-300">
            This business is connected to AI assistants through Dock AI. You can interact with it using your favorite AI assistant.
          </p>
        </div>

        {/* Capabilities */}
        {allCapabilities.size > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Available AI Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[...allCapabilities].map(cap => (
                <div
                  key={cap}
                  className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg"
                >
                  <span className="text-sm font-medium capitalize">
                    {cap.replace(/_/g, ' ')}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Providers */}
        {providers.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Connected Providers</h2>
            <div className="flex flex-wrap gap-2">
              {providers.map(provider => (
                <span
                  key={provider}
                  className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300"
                >
                  {provider}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* How to Use */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">How to interact</h2>
          <div className="space-y-4 text-zinc-300">
            <p>
              Use any AI assistant that supports the Model Context Protocol (MCP) to interact with {primaryEntity.name}.
            </p>
            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg font-mono text-sm">
              <p className="text-zinc-500 mb-2"># Example prompt:</p>
              <p className="text-teal-400">
                &quot;Book a table at {primaryEntity.name}{location ? ` in ${location}` : ''}&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Multi-location notice */}
        {data.entities.length > 1 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Multiple Locations</h2>
            <p className="text-zinc-400 mb-4">
              This business has {data.entities.length} locations:
            </p>
            <ul className="space-y-2">
              {data.entities.map((entity, i) => (
                <li key={i} className="flex items-center gap-2 text-zinc-300">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  {entity.name}
                  {entity.location?.city && <span className="text-zinc-500">- {entity.location.city}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA */}
        <section className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">Want your business to be AI-enabled?</h2>
          <p className="text-zinc-400 mb-6">
            Connect your business to AI assistants through Dock AI and let customers book, order, or inquire using natural language.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center text-zinc-500 text-sm">
          <p>Dock AI - The Action Layer for AI</p>
          <p className="mt-2">
            <Link href="/" className="hover:text-teal-400">Home</Link>
            {' · '}
            <a href="https://github.com/edp-protocol/entity-discovery-protocol" className="hover:text-teal-400">EDP Spec</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
