'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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

interface ResolveResult {
  entity: {
    domain: string
    name?: string
    category?: string
    verification_level: number
  }
  mcps: McpResult[]
}

export default function Home() {
  const [domain, setDomain] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ResolveResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Submit state
  const [submitDomain, setSubmitDomain] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  // Generator state
  const [genEndpoint, setGenEndpoint] = useState('')
  const [genProvider, setGenProvider] = useState('')

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

  const generatedJson = genEndpoint
    ? JSON.stringify(
        {
          schema_version: '0.1.0',
          domain: 'YOUR_DOMAIN.com',
          mcps: [
            {
              provider: genProvider || 'provider-name',
              endpoint: genEndpoint,
            },
          ],
        },
        null,
        2
      )
    : ''

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-teal-400">
            Dock AI
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/docs" className="text-sm text-zinc-400 hover:text-white">
              Docs
            </Link>
            <Link href="/protocol" className="text-sm text-zinc-400 hover:text-white">
              Protocol
            </Link>
            <Link
              href="https://provider.dockai.co"
              className="text-sm text-teal-400 hover:text-teal-300"
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
            Which MCP serves this business?
          </h1>
          <p className="text-xl text-zinc-400 mb-8">
            Discover which MCP servers can interact with any entity.
            <br />
            The first{' '}
            <Link href="/protocol" className="text-teal-400 hover:underline">
              Entity Discovery Protocol
            </Link>{' '}
            registry.
          </p>

          {/* Search */}
          <form onSubmit={handleResolve} className="flex gap-2 max-w-xl mx-auto">
            <Input
              placeholder="Enter a domain (e.g., example-restaurant.com)"
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
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white font-medium">{result.entity.name || result.entity.domain}</p>
                  <p className="text-zinc-500 text-sm">{result.entity.domain}</p>
                </div>
                <Badge className={result.entity.verification_level === 2 ? 'bg-teal-600' : 'bg-zinc-700'}>
                  Level {result.entity.verification_level}
                </Badge>
              </div>

              {result.mcps.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-zinc-400 text-sm mb-2">MCP Providers:</p>
                  {result.mcps.map((mcp, i) => (
                    <div key={i} className="p-3 bg-zinc-950 rounded border border-zinc-800">
                      <div className="flex items-center justify-between">
                        <span className="text-teal-400 font-mono text-sm">{mcp.provider}</span>
                        {mcp.verification?.method === 'dual_attestation' && (
                          <Badge className="bg-teal-600 text-xs">Verified</Badge>
                        )}
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
              ) : (
                <p className="text-zinc-500 text-sm">No MCP providers found</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 px-4 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Get Started</h2>

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
                  <p className="text-zinc-400 text-sm mb-4">
                    Generate an Entity Card to host on your website.
                  </p>
                  <div className="space-y-3 mb-4">
                    <Input
                      placeholder="MCP Endpoint (e.g., https://mcp.provider.com)"
                      value={genEndpoint}
                      onChange={(e) => setGenEndpoint(e.target.value)}
                      className="bg-zinc-950 border-zinc-700 text-white"
                    />
                    <Input
                      placeholder="Provider name (optional)"
                      value={genProvider}
                      onChange={(e) => setGenProvider(e.target.value)}
                      className="bg-zinc-950 border-zinc-700 text-white"
                    />
                  </div>
                  {generatedJson && (
                    <div className="relative">
                      <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm font-mono text-zinc-300 overflow-x-auto">
                        {generatedJson}
                      </pre>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute top-2 right-2"
                        onClick={() => navigator.clipboard.writeText(generatedJson)}
                      >
                        Copy
                      </Button>
                    </div>
                  )}
                  {generatedJson && (
                    <p className="text-zinc-500 text-xs mt-3">
                      Host this file at <code className="text-teal-400">/.well-known/entity-card.json</code> on your domain.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-zinc-500">
          <p>Dock AI - First EDP Registry</p>
          <div className="flex gap-4">
            <Link href="/docs" className="hover:text-white">
              Docs
            </Link>
            <Link href="/protocol" className="hover:text-white">
              Protocol
            </Link>
            <Link href="https://github.com/dock-ai" className="hover:text-white">
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
