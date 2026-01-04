'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Mail, Star, BadgeCheck, ShoppingCart, Calendar, Zap, Rocket, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Header, Footer } from '@/components/layout'

interface Expert {
  name: string
  slug: string
  logo?: string
  description: string
  specialties: string[]
  industries: string[]
  website?: string
  email?: string
  featured?: boolean
  projects?: number
}

const EXPERTS: Expert[] = [
  // Add experts here as they join
]

function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <Card className={`bg-zinc-900 border-zinc-800 ${expert.featured ? 'ring-1 ring-teal-500/50' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {expert.logo ? (
              <Image
                src={expert.logo}
                alt={expert.name}
                width={48}
                height={48}
                className="rounded-lg"
              />
            ) : (
              <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center text-xl font-bold text-teal-400">
                {expert.name.charAt(0)}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">{expert.name}</h3>
                {expert.featured && (
                  <BadgeCheck className="w-4 h-4 text-teal-400" />
                )}
              </div>
              {expert.projects && (
                <p className="text-xs text-zinc-500">{expert.projects} projects completed</p>
              )}
            </div>
          </div>
          {expert.featured && (
            <Badge className="bg-teal-600/20 text-teal-400 border-teal-600/30">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>

        <p className="text-zinc-400 text-sm mb-4">{expert.description}</p>

        <div className="space-y-3 mb-4">
          <div>
            <p className="text-xs text-zinc-500 mb-1.5">Specialties</p>
            <div className="flex flex-wrap gap-1.5">
              {expert.specialties.map((s) => (
                <Badge key={s} variant="secondary" className="text-xs bg-zinc-800 text-zinc-300">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-1.5">Industries</p>
            <div className="flex flex-wrap gap-1.5">
              {expert.industries.map((i) => (
                <Badge key={i} variant="outline" className="text-xs border-zinc-700 text-zinc-400">
                  {i}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {expert.email && (
            <a href={`mailto:${expert.email}?subject=MCP Project Inquiry`} className="flex-1">
              <Button className="w-full bg-teal-600 hover:bg-teal-500">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </a>
          )}
          {expert.website && (
            <a href={expert.website} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function ProjectInquirySection() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      type: 'project-inquiry',
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      description: formData.get('description') as string,
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
      setError(err instanceof Error ? err.message : 'Failed to submit')
    }

    setLoading(false)
  }

  if (submitted) {
    return (
      <section className="py-16 px-4 border-t border-zinc-800">
        <div className="max-w-xl mx-auto text-center">
          <CheckCircle className="w-12 h-12 text-teal-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Project Submitted!</h2>
          <p className="text-zinc-400">
            We&apos;ll review your project and get back to you shortly.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 border-t border-zinc-800">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Need Custom MCP Development?</h2>
          <p className="text-zinc-400">
            Tell us about your project and we&apos;ll match you with the right MCP developer or agency.
          </p>
        </div>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                  <label className="block text-sm text-zinc-400 mb-1.5">Company</label>
                  <Input
                    name="company"
                    placeholder="Acme Inc"
                    className="bg-zinc-950 border-zinc-700 text-white"
                  />
                </div>
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
                <label className="block text-sm text-zinc-400 mb-1.5">Project Description *</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="What kind of MCP do you need? What business/platform should it connect to?"
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
                {loading ? 'Submitting...' : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Project
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default function ExpertsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="py-16 px-4 border-b border-zinc-800">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-4 bg-teal-600/20 text-teal-400 border-teal-600/30">
            MCP Development Experts
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            Hire MCP Developers & Agencies
          </h1>
          <p className="text-xl text-zinc-400 mb-8">
            Find certified MCP builders, freelancers, and agencies to develop custom Model Context Protocol connectors for your business.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#experts">
              <Button className="bg-teal-600 hover:bg-teal-500">
                Browse MCP Experts
              </Button>
            </a>
            <Link href="/experts/apply">
              <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                Become an Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What Experts Do */}
      <section className="py-12 px-4 border-b border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">MCP Development Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ShoppingCart className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="font-medium text-white mb-2">E-commerce MCP Development</h3>
              <p className="text-zinc-500 text-sm">Shopify MCP, WooCommerce, custom storefronts</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="font-medium text-white mb-2">Booking System MCPs</h3>
              <p className="text-zinc-500 text-sm">Restaurants, salons, clinics, hotels</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="font-medium text-white mb-2">Custom MCP Integrations</h3>
              <p className="text-zinc-500 text-sm">Internal tools, SaaS platforms, APIs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experts List */}
      <section id="experts" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Certified MCP Developers & Agencies</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {EXPERTS.map((expert) => (
              <ExpertCard key={expert.slug} expert={expert} />
            ))}
          </div>

          {EXPERTS.length === 0 && (
            <div className="text-center p-12 border border-dashed border-zinc-700 rounded-lg">
              <div className="w-16 h-16 bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Be the first Expert</h3>
              <p className="text-zinc-400 mb-6">
                We&apos;re building our network of certified MCP builders. Join now and get early visibility.
              </p>
              <Link href="/experts/apply">
                <Button className="bg-teal-600 hover:bg-teal-500">
                  Apply to become an Expert
                </Button>
              </Link>
            </div>
          )}

          {EXPERTS.length > 0 && EXPERTS.length < 4 && (
            <div className="mt-12 text-center p-8 border border-dashed border-zinc-700 rounded-lg">
              <p className="text-zinc-400 mb-4">
                More experts coming soon. Want to join?
              </p>
              <Link href="/experts/apply">
                <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                  Apply to become an Expert
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <ProjectInquirySection />

      <Footer />
    </div>
  )
}
