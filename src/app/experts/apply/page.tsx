'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header, Footer } from '@/components/layout'

export default function ApplyExpertPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      type: 'expert-application',
      name: formData.get('name') as string,
      company: formData.get('company') as string,
      email: formData.get('email') as string,
      website: formData.get('website') as string,
      experience: formData.get('experience') as string,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const result = await res.json()
        throw new Error(result.error || 'Failed to submit')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit application')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Content */}
      <main className="flex-1 py-16 px-4">
        <div className="max-w-xl mx-auto">
          <Link href="/experts" className="inline-flex items-center text-sm text-zinc-400 hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Experts
          </Link>

          {submitted ? (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Application Received!</h1>
                <p className="text-zinc-400 mb-6">
                  Thanks for your interest in becoming a Dock AI Expert.
                  We&apos;ll review your application and get back to you within 48 hours.
                </p>
                <Link href="/experts">
                  <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                    Back to Experts
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <>
              <Badge className="mb-4 bg-teal-600/20 text-teal-400 border-teal-600/30">
                Join the Network
              </Badge>
              <h1 className="text-3xl font-bold mb-4">Become a Dock AI Expert</h1>
              <p className="text-zinc-400 mb-8">
                Join our network of certified MCP builders. Get matched with clients who need custom connectors built.
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                  <p className="font-medium text-white mb-1">Get Clients</p>
                  <p className="text-sm text-zinc-500">We send you qualified leads</p>
                </div>
                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                  <p className="font-medium text-white mb-1">Expert Badge</p>
                  <p className="text-sm text-zinc-500">Certified Dock AI Expert</p>
                </div>
                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                  <p className="font-medium text-white mb-1">Featured Profile</p>
                  <p className="text-sm text-zinc-500">Listed on dockai.co/experts</p>
                </div>
                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                  <p className="font-medium text-white mb-1">Community</p>
                  <p className="text-sm text-zinc-500">Access to expert network</p>
                </div>
              </div>

              {/* Form */}
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-1.5">Your Name *</label>
                      <Input
                        name="name"
                        required
                        placeholder="John Doe"
                        className="bg-zinc-950 border-zinc-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-1.5">Company / Studio Name *</label>
                      <Input
                        name="company"
                        required
                        placeholder="Acme Studio"
                        className="bg-zinc-950 border-zinc-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-1.5">Email *</label>
                      <Input
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="bg-zinc-950 border-zinc-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-1.5">Website / Portfolio</label>
                      <Input
                        name="website"
                        type="url"
                        placeholder="https://yoursite.com"
                        className="bg-zinc-950 border-zinc-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-1.5">
                        Tell us about your experience with MCPs / AI integrations *
                      </label>
                      <textarea
                        name="experience"
                        required
                        rows={4}
                        placeholder="What have you built? What technologies do you use?"
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-md text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-zinc-600"
                      />
                    </div>
                    {error && (
                      <p className="text-red-400 text-sm">{error}</p>
                    )}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-teal-600 hover:bg-teal-500"
                    >
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
