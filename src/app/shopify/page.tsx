'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Check, AlertCircle, Loader2, Search, ShoppingCart, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface SubmitResult {
  success: boolean
  message: string
  data?: {
    name: string
    city?: string
    country?: string
    products_count?: number
    capabilities?: string[]
  }
}

export default function ShopifyPage() {
  const [domain, setDomain] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SubmitResult | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!domain.trim()) return

    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('https://api.dockai.co/v1/submit/shopify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: domain.trim() }),
      })
      const data = await res.json()

      if (!res.ok) {
        setResult({ success: false, message: data.error || 'Failed to submit' })
      } else {
        setResult({
          success: true,
          message: 'Store indexed successfully!',
          data: data,
        })
      }
    } catch {
      setResult({ success: false, message: 'Failed to connect to API' })
    }

    setLoading(false)
  }

  const capabilities = [
    { icon: Search, label: 'Product Search', desc: 'AI can search your catalog' },
    { icon: ShoppingCart, label: 'Cart & Checkout', desc: 'AI can help customers buy' },
    { icon: FileText, label: 'Policies & FAQ', desc: 'AI can answer questions' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-white">
            <Image src="/icon.svg" alt="Dock AI" width={24} height={24} />
            Dock AI
          </Link>
          <nav className="flex items-center gap-6 text-sm text-zinc-400">
            <Link href="/docs" className="hover:text-white transition-colors">
              Docs
            </Link>
            <Link href="/providers" className="hover:text-white transition-colors">
              Providers
            </Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-6 mb-8">
              <Image src="/images/shopify_logo_darkbg.svg" alt="Shopify" width={180} height={54} />
              <span className="text-zinc-500 text-3xl">+</span>
              <div className="flex items-center gap-3">
                <Image src="/icon.svg" alt="Dock AI" width={48} height={48} />
                <span className="text-white text-2xl font-semibold">Dock AI</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Get your Shopify store discovered by AI
            </h1>
            <p className="text-zinc-400 text-lg">
              Shopify stores have built-in MCP support. Add yours to the Dock AI registry
              so AI assistants can help your customers shop.
            </p>
          </div>

          {/* Submit Form */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                type="text"
                placeholder="mystore.com or mystore.myshopify.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="flex-1 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
              <Button
                type="submit"
                disabled={loading || !domain.trim()}
                className="bg-teal-600 hover:bg-teal-500 text-white px-6"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Submit'
                )}
              </Button>
            </form>

            {/* Result */}
            {result && (
              <div className={`mt-4 p-4 rounded-lg border ${
                result.success
                  ? 'bg-teal-500/10 border-teal-500/20'
                  : 'bg-red-500/10 border-red-500/20'
              }`}>
                <div className="flex items-start gap-3">
                  {result.success ? (
                    <Check className="w-5 h-5 text-teal-400 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className={result.success ? 'text-teal-400' : 'text-red-400'}>
                      {result.message}
                    </p>
                    {result.success && result.data && (
                      <div className="mt-3 text-sm text-zinc-400">
                        <p><span className="text-zinc-500">Store:</span> {result.data.name}</p>
                        {result.data.city && result.data.country && (
                          <p><span className="text-zinc-500">Location:</span> {result.data.city}, {result.data.country}</p>
                        )}
                        {result.data.products_count && (
                          <p><span className="text-zinc-500">Products:</span> {result.data.products_count}</p>
                        )}
                        {result.data.capabilities && (
                          <p><span className="text-zinc-500">Capabilities:</span> {result.data.capabilities.join(', ')}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Capabilities */}
          <div className="mb-12">
            <h2 className="text-lg font-medium text-white mb-4 text-center">
              What AI assistants can do with your store
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {capabilities.map((cap) => (
                <div key={cap.label} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-center">
                  <cap.icon className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                  <p className="text-white text-sm font-medium">{cap.label}</p>
                  <p className="text-zinc-500 text-xs mt-1">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="mt-12">
            <h2 className="text-lg font-medium text-white mb-4 text-center">How it works</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-4 bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 text-sm flex items-center justify-center flex-shrink-0">1</span>
                <div>
                  <p className="text-white text-sm font-medium">Submit your domain</p>
                  <p className="text-zinc-500 text-xs">We verify it&apos;s a Shopify store with MCP enabled</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 text-sm flex items-center justify-center flex-shrink-0">2</span>
                <div>
                  <p className="text-white text-sm font-medium">Auto-extraction</p>
                  <p className="text-zinc-500 text-xs">We fetch your store info and MCP capabilities automatically</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 text-sm flex items-center justify-center flex-shrink-0">3</span>
                <div>
                  <p className="text-white text-sm font-medium">AI discovery</p>
                  <p className="text-zinc-500 text-xs">AI assistants can now find and interact with your store</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-zinc-500">
          <p>Dock AI - First EDP Registry</p>
          <div className="flex gap-4">
            <Link href="/docs" className="hover:text-white transition-colors">
              Docs
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <a
              href="https://github.com/dock-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
