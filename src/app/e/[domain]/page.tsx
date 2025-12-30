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
          <div className="space-y-6 text-zinc-300">
            <div className="p-4 bg-teal-950/20 border border-teal-800/50 rounded-lg">
              <p className="text-teal-400 font-medium mb-1">Install Dock AI once</p>
              <p className="text-zinc-400 text-sm">
                Add Dock AI to your favorite AI assistant and discover any AI-enabled business instantly.
              </p>
              <div className="mt-3 p-2 bg-zinc-900/50 rounded font-mono text-xs text-zinc-300">
                MCP Server URL: <span className="text-teal-400">https://mcp.dockai.co</span>
              </div>
            </div>

            {/* AI Assistants */}
            <div className="space-y-4">
              <p className="text-zinc-400 text-sm font-medium">Setup instructions:</p>

              {/* Claude */}
              <details className="group">
                <summary className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-800/50 list-none">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Claude</span>
                    <span className="text-xs text-zinc-500 group-open:hidden">Click to expand</span>
                    <span className="text-xs text-zinc-500 hidden group-open:inline">Click to collapse</span>
                  </div>
                </summary>
                <div className="mt-2 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg text-sm space-y-2">
                  <p className="text-zinc-400">Pro / Max plans:</p>
                  <ol className="list-decimal list-inside space-y-1 text-zinc-300">
                    <li>Go to <span className="text-teal-400">Settings → Connectors</span></li>
                    <li>Click <span className="text-teal-400">Add custom connector</span></li>
                    <li>Enter URL: <code className="text-teal-400 bg-zinc-800 px-1 rounded">https://mcp.dockai.co</code></li>
                    <li>Click <span className="text-teal-400">Add</span></li>
                  </ol>
                </div>
              </details>

              {/* ChatGPT */}
              <details className="group">
                <summary className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-800/50 list-none">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">ChatGPT</span>
                    <span className="text-xs text-zinc-500 group-open:hidden">Click to expand</span>
                    <span className="text-xs text-zinc-500 hidden group-open:inline">Click to collapse</span>
                  </div>
                </summary>
                <div className="mt-2 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg text-sm space-y-2">
                  <p className="text-zinc-400">Plus / Pro / Business plans:</p>
                  <ol className="list-decimal list-inside space-y-1 text-zinc-300">
                    <li>Go to <span className="text-teal-400">Settings → Apps</span></li>
                    <li>Enable <span className="text-teal-400">Developer mode</span> in Advanced settings</li>
                    <li>Click <span className="text-teal-400">Create</span> under Connectors</li>
                    <li>Enter URL: <code className="text-teal-400 bg-zinc-800 px-1 rounded">https://mcp.dockai.co</code></li>
                    <li>Add name &quot;Dock AI&quot; and click <span className="text-teal-400">Create</span></li>
                  </ol>
                </div>
              </details>

              {/* Mistral */}
              <details className="group">
                <summary className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-800/50 list-none">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Mistral Le Chat</span>
                    <span className="text-xs text-zinc-500 group-open:hidden">Click to expand</span>
                    <span className="text-xs text-zinc-500 hidden group-open:inline">Click to collapse</span>
                  </div>
                </summary>
                <div className="mt-2 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg text-sm space-y-2">
                  <p className="text-zinc-400">All plans:</p>
                  <ol className="list-decimal list-inside space-y-1 text-zinc-300">
                    <li>Click <span className="text-teal-400">Intelligence → Connectors</span></li>
                    <li>Click <span className="text-teal-400">+ Add Connector</span></li>
                    <li>Select <span className="text-teal-400">Custom MCP Connector</span> tab</li>
                    <li>Name: <code className="text-teal-400 bg-zinc-800 px-1 rounded">dockai</code></li>
                    <li>URL: <code className="text-teal-400 bg-zinc-800 px-1 rounded">https://mcp.dockai.co</code></li>
                    <li>Click <span className="text-teal-400">Connect</span></li>
                  </ol>
                </div>
              </details>
            </div>

            {/* Example prompt */}
            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg font-mono text-sm">
              <p className="text-zinc-500 mb-2"># Then just ask:</p>
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
          <p>Dock AI - AI can find you. Let it act.</p>
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
