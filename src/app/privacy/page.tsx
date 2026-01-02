import Link from 'next/link'
import Image from 'next/image'
import { Shield, Eye, Clock, Globe, Lock, Mail } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy - Dock AI',
  description: 'Privacy policy for Dock AI registry and MCP server.',
}

export default function PrivacyPage() {
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

      {/* Content */}
      <main className="flex-1 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 mb-6">
              <Shield className="w-8 h-8 text-teal-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-zinc-400">Last updated: January 2025</p>
          </div>

          {/* Intro */}
          <p className="text-zinc-300 text-lg mb-12 text-center">
            Dock AI operates the registry and MCP server. This page explains how we handle data
            when you use our services.
          </p>

          {/* Sections */}
          <div className="space-y-6">
            {/* What We Collect */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-zinc-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-3">What We Collect</h2>
                  <p className="text-zinc-400 mb-4">
                    When you or an AI agent queries our API, we receive:
                  </p>
                  <ul className="space-y-2 text-zinc-400 mb-4">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">•</span>
                      <span>The domain name being resolved (e.g., &quot;example-restaurant.com&quot;)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">•</span>
                      <span>Standard HTTP metadata (IP address, user agent, timestamp)</span>
                    </li>
                  </ul>
                  <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                    <p className="text-sm text-zinc-500">
                      <strong className="text-zinc-300">We do NOT collect:</strong> personal information,
                      conversation content between users and AI, or any data from third-party MCP servers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How We Use Data */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-zinc-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-3">How We Use Data</h2>
                  <p className="text-zinc-400 mb-4">Query data is used solely to:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-zinc-800/50 rounded-lg p-3 text-sm text-zinc-400">
                      Resolve domains to MCP endpoints
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3 text-sm text-zinc-400">
                      Rate limiting to prevent abuse
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3 text-sm text-zinc-400">
                      Aggregate analytics
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3 text-sm text-zinc-400">
                      Improve our service
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Retention */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-zinc-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-3">Data Retention</h2>
                  <p className="text-zinc-400">
                    We do not permanently store individual query logs. Rate limiting data is ephemeral
                    and automatically expires. Aggregate statistics are anonymized and cannot be traced
                    back to individual users or requests.
                  </p>
                </div>
              </div>
            </div>

            {/* Third Parties */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-zinc-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-3">Third-Party Services</h2>
                  <p className="text-zinc-400">
                    Our service helps you discover MCP endpoints operated by third-party providers.
                    Once you connect to those endpoints, their respective privacy policies apply.
                    We are not responsible for the privacy practices of third-party MCP providers.
                  </p>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-zinc-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-3">Security</h2>
                  <p className="text-zinc-400">
                    All communication with our API and MCP server is encrypted via HTTPS/TLS.
                    We implement industry-standard security measures to protect our infrastructure.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-zinc-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-3">Contact Us</h2>
                  <p className="text-zinc-400 mb-4">
                    Questions about this privacy policy? Reach out:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="mailto:support@dockai.co"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-zinc-300 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      support@dockai.co
                    </a>
                    <a
                      href="https://github.com/dock-ai/mcp/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-zinc-300 transition-colors"
                    >
                      GitHub Issues
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Updates */}
          <p className="text-center text-zinc-500 text-sm mt-12">
            We may update this policy from time to time. Changes will be posted on this page
            with an updated date.
          </p>
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
