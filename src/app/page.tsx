'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EntityCardGenerator } from '@/components/entity-card-generator'

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

interface PendingProvider {
  provider_domain: string
  provider: string
  capabilities?: string[]
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
  pending_providers?: PendingProvider[]
}

interface ResolveResult {
  domain: string
  entities: EntityResult[]
}

const businessTypes = [
  'restaurant',
  'fitness studio',
  'hair salon',
  'clinic',
  'hotel',
  'spa',
  'garage',
  'dentist',
  'barbershop',
  'yoga studio',
]

export default function Home() {
  const [domain, setDomain] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ResolveResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Animated business type
  const [businessIndex, setBusinessIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setBusinessIndex((prev) => (prev + 1) % businessTypes.length)
        setIsAnimating(false)
      }, 200)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  // Submit state
  const [submitDomain, setSubmitDomain] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)


  const handleResolve = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!domain.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch(`https://api.dockai.co/v1/resolve/domain/${encodeURIComponent(domain.trim())}`)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Domain not found')
      } else {
        setResult(data)
      }
    } catch {
      setError('Failed to connect to API')
    }

    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!submitDomain.trim()) return

    setSubmitLoading(true)
    setSubmitResult(null)

    try {
      const res = await fetch('https://api.dockai.co/v1/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: submitDomain.trim() }),
      })
      const data = await res.json()

      if (!res.ok) {
        setSubmitResult({ success: false, message: data.error || 'Failed to submit' })
      } else {
        setSubmitResult({
          success: true,
          message: `Indexed! Verification Level: ${data.entity.verification_level}`,
        })
      }
    } catch {
      setSubmitResult({ success: false, message: 'Failed to connect to API' })
    }

    setSubmitLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-white">
            <Image src="/icon.svg" alt="Dock AI" width={24} height={24} />
            Dock AI
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/install" className="text-sm text-zinc-400 hover:text-white cursor-pointer">
              Install Connector
            </Link>
            <Link href="/docs" className="text-sm text-zinc-400 hover:text-white cursor-pointer">
              Docs
            </Link>
            <Link
              href="/providers"
              className="text-sm text-teal-400 hover:text-teal-300 cursor-pointer"
            >
              For Providers
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Which connector serves this
            <br />
            <span
              className={`text-teal-400 inline-block transition-all duration-200 ${
                isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}
            >
              {businessTypes[businessIndex]}
            </span>
            ?
          </h1>
          <p className="text-xl text-zinc-400 mb-8">
            AI agents need to know which app can book, order, or manage for any business.
            <br />
            Dock AI is the registry that tells them.
          </p>

          {/* Search */}
          <form onSubmit={handleResolve} className="flex gap-2 max-w-xl mx-auto">
            <Input
              placeholder="Enter a domain (e.g., dockai.co)"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
            />
            <Button type="submit" disabled={loading} className="bg-teal-600 hover:bg-teal-500 px-6">
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </form>

          {/* Result */}
          {error && (
            <div className="mt-6 p-4 bg-zinc-900 border border-zinc-800 rounded-lg text-left max-w-xl mx-auto">
              <p className="text-zinc-400">{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-6 p-4 bg-zinc-900 border border-zinc-800 rounded-lg text-left max-w-xl mx-auto">
              <div className="mb-4">
                <p className="text-zinc-500 text-sm">{result.domain}</p>
              </div>

              {/* Entities */}
              {result.entities.length > 0 && (
                <div className="space-y-4">
                  {result.entities.map((entity, entityIndex) => (
                    <div key={entityIndex} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-white font-medium">
                          {entity.name}
                          {entity.path && <span className="text-zinc-500 text-sm ml-2">{entity.path}</span>}
                        </p>
                        {entity.location?.city && (
                          <span className="text-zinc-500 text-xs">{entity.location.city}{entity.location.country && `, ${entity.location.country}`}</span>
                        )}
                      </div>
                      {/* Active MCPs */}
                      {entity.mcps.length > 0 && (
                        <div className="space-y-2">
                          {entity.mcps.map((mcp, i) => (
                            <div key={i} className="p-3 bg-zinc-950 rounded border border-zinc-800">
                              <div className="flex items-center justify-between">
                                <span className="text-teal-400 font-mono text-sm">{mcp.provider}</span>
                                <Badge className={mcp.verification?.level === 2 ? 'bg-teal-600' : mcp.verification?.level === 1 ? 'bg-zinc-600 text-zinc-100' : 'bg-zinc-700 text-zinc-300'}>
                                  Level {mcp.verification?.level ?? 0}
                                </Badge>
                              </div>
                              <p className="text-zinc-500 text-xs mt-1 font-mono">{mcp.endpoint}</p>
                              {mcp.capabilities && mcp.capabilities.length > 0 && (
                                <div className="flex gap-1 mt-2">
                                  {mcp.capabilities.map((cap) => (
                                    <Badge key={cap} variant="secondary" className="text-xs">
                                      {cap}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Pending Providers for this entity */}
                      {entity.pending_providers && entity.pending_providers.length > 0 && (
                        <div className="space-y-2">
                          {entity.pending_providers.map((pp, i) => (
                            <div key={i} className="p-3 bg-zinc-950 rounded border border-dashed border-zinc-700">
                              <div className="flex items-center justify-between">
                                <span className="text-zinc-400 font-mono text-sm">{pp.provider}</span>
                                <Badge className="bg-amber-600/20 text-amber-400 border border-amber-600/30">
                                  Pending
                                </Badge>
                              </div>
                              <p className="text-zinc-600 text-xs mt-1 font-mono">{pp.provider_domain}</p>
                              {pp.capabilities && pp.capabilities.length > 0 && (
                                <div className="flex gap-1 mt-2">
                                  {pp.capabilities.map((cap) => (
                                    <Badge key={cap} variant="secondary" className="text-xs bg-zinc-800">
                                      {cap}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {/* No providers for this entity */}
                      {entity.mcps.length === 0 && (!entity.pending_providers || entity.pending_providers.length === 0) && (
                        <p className="text-zinc-600 text-xs">No MCP providers found for this entity</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* For Businesses */}
      <section className="py-16 px-4 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-teal-400 text-sm font-medium mb-2">For Businesses</p>
            <h2 className="text-2xl font-bold">Make your business AI-discoverable</h2>
            <p className="text-zinc-400 mt-2">Let AI agents find and interact with your business</p>
          </div>

          <Tabs defaultValue="submit" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-900">
              <TabsTrigger value="submit">Submit Your Domain</TabsTrigger>
              <TabsTrigger value="generate">Generate Entity Card</TabsTrigger>
            </TabsList>

            <TabsContent value="submit" className="mt-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <p className="text-zinc-400 text-sm mb-4">
                    Already have an Entity Card at{' '}
                    <code className="text-teal-400">/.well-known/entity-card.json</code>?
                    Submit your domain to index it.
                  </p>
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                      placeholder="yourdomain.com"
                      value={submitDomain}
                      onChange={(e) => setSubmitDomain(e.target.value)}
                      className="bg-zinc-950 border-zinc-700 text-white"
                    />
                    <Button type="submit" disabled={submitLoading} className="bg-teal-600 hover:bg-teal-500">
                      {submitLoading ? 'Submitting...' : 'Submit'}
                    </Button>
                  </form>
                  {submitResult && (
                    <p className={`mt-3 text-sm ${submitResult.success ? 'text-teal-400' : 'text-red-400'}`}>
                      {submitResult.message}
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="generate" className="mt-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <EntityCardGenerator />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* For Providers */}
      <section className="py-16 px-4 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-teal-400 text-sm font-medium mb-2">For Providers</p>
            <h2 className="text-2xl font-bold">Your clients, AI-ready</h2>
            <p className="text-zinc-400 mt-2">Import your clients and AI will know to use your connector</p>
          </div>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📤</span>
                  </div>
                  <h3 className="font-medium text-white mb-1">Import</h3>
                  <p className="text-zinc-500 text-sm">Upload your client list via CSV or API</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🔗</span>
                  </div>
                  <h3 className="font-medium text-white mb-1">Connect</h3>
                  <p className="text-zinc-500 text-sm">Link them to your MCP endpoint</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h3 className="font-medium text-white mb-1">Discover</h3>
                  <p className="text-zinc-500 text-sm">AI agents find your connector automatically</p>
                </div>
              </div>

              <div className="text-center">
                <Link href="/providers">
                  <Button className="bg-teal-600 hover:bg-teal-500 cursor-pointer">
                    Register as a Provider
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <details className="group bg-zinc-900 border border-zinc-800 rounded-lg">
              <summary className="flex items-center justify-between p-4 cursor-pointer text-white font-medium">
                What is Dock AI?
                <span className="text-zinc-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-4 pb-4 text-zinc-400 text-sm">
                Dock AI is a registry that helps AI agents discover which connectors (apps) can interact with any business.
                Think of it as a phone book for AI — when someone asks their AI to &quot;book a table at Restaurant X&quot;,
                Dock AI tells the AI which booking service handles that restaurant.
              </div>
            </details>

            <details className="group bg-zinc-900 border border-zinc-800 rounded-lg">
              <summary className="flex items-center justify-between p-4 cursor-pointer text-white font-medium">
                What is an MCP connector?
                <span className="text-zinc-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-4 pb-4 text-zinc-400 text-sm">
                MCP (Model Context Protocol) is a standard that allows AI agents to interact with external services.
                A connector is an app that implements this protocol — like a booking system, a payment processor, or any service
                that AI can use on behalf of users. ChatGPT calls them &quot;Apps&quot;, Claude calls them &quot;Connectors&quot;.
              </div>
            </details>

            <details className="group bg-zinc-900 border border-zinc-800 rounded-lg">
              <summary className="flex items-center justify-between p-4 cursor-pointer text-white font-medium">
                How do I make my business discoverable by AI?
                <span className="text-zinc-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-4 pb-4 text-zinc-400 text-sm">
                You have two options: (1) Add an Entity Card to your website at <code className="text-teal-400">/.well-known/entity-card.json</code>
                and submit your domain, or (2) Ask your booking/management provider (like TheFork, Treatwell, etc.) to register you on Dock AI.
                Once registered, AI agents can discover which service handles your business.
              </div>
            </details>

            <details className="group bg-zinc-900 border border-zinc-800 rounded-lg">
              <summary className="flex items-center justify-between p-4 cursor-pointer text-white font-medium">
                I&apos;m a provider (booking system, SaaS). How do I register my clients?
                <span className="text-zinc-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-4 pb-4 text-zinc-400 text-sm">
                Create an account on our <Link href="/providers" className="text-teal-400 hover:underline">provider portal</Link>,
                verify your domain, then import your client list via CSV or API. Once imported, AI agents will know to use your
                connector when users want to interact with any of your clients.
              </div>
            </details>

            <details className="group bg-zinc-900 border border-zinc-800 rounded-lg">
              <summary className="flex items-center justify-between p-4 cursor-pointer text-white font-medium">
                Is Dock AI free?
                <span className="text-zinc-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-4 pb-4 text-zinc-400 text-sm">
                Yes, Dock AI is free for businesses to register and for AI agents to query.
                For providers with large client lists, we offer premium features like priority support and advanced analytics.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 px-4 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-zinc-500">
          <p>Dock AI - First EDP Registry</p>
          <div className="flex gap-4">
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
    </div>
  )
}
