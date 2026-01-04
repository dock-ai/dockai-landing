'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Header, Footer } from '@/components/layout'

export default function ProvidersPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    mcpEndpoint: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setResult({ success: true, message: 'Message sent! We\'ll get back to you soon.' })
        setFormData({ name: '', email: '', company: '', mcpEndpoint: '', message: '' })
      } else {
        setResult({ success: false, message: 'Failed to send message. Please try again.' })
      }
    } catch {
      setResult({ success: false, message: 'An error occurred. Please try again.' })
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">For MCP Providers</h1>
          <p className="text-zinc-400 mb-8">
            Connect your MCP server to Dock AI and make your entities discoverable by AI agents.
            We&apos;re currently onboarding providers manually to ensure quality.
          </p>

          {/* Contact Form */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Get in touch</h2>
              <p className="text-zinc-400 text-sm mb-6">
                Tell us about your MCP server and we&apos;ll help you get set up.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">Name *</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-zinc-950 border-zinc-700 text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">Email *</label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-zinc-950 border-zinc-700 text-white"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">Company</label>
                    <Input
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-zinc-950 border-zinc-700 text-white"
                      placeholder="Acme Inc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">MCP Endpoint</label>
                    <Input
                      value={formData.mcpEndpoint}
                      onChange={(e) => setFormData({ ...formData, mcpEndpoint: e.target.value })}
                      className="bg-zinc-950 border-zinc-700 text-white"
                      placeholder="https://mcp.company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Message *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-md text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    rows={4}
                    placeholder="Tell us about your MCP server, how many entities you have, etc."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal-600 hover:bg-teal-500"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>

                {result && (
                  <p className={`text-sm ${result.success ? 'text-teal-400' : 'text-red-400'}`}>
                    {result.message}
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          {/* API Docs Link */}
          <p className="text-center text-zinc-500 text-sm mt-8">
            Already have an API key?{' '}
            <Link href="/docs/providers" className="text-teal-400 hover:underline">
              View API documentation
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
