import Link from 'next/link'
import Image from 'next/image'
import { FileText, CheckCircle, XCircle, AlertTriangle, Scale, Mail } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service - Dock AI',
  description: 'Terms of service for Dock AI registry and MCP server.',
}

export default function TermsPage() {
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
              <FileText className="w-8 h-8 text-teal-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-zinc-400">Last updated: January 2025</p>
          </div>

          {/* Intro */}
          <p className="text-zinc-300 text-lg mb-12 text-center">
            By using Dock AI services, you agree to these terms. Please read them carefully.
          </p>

          {/* Sections */}
          <div className="space-y-6">
            {/* Service Description */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-zinc-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-3">Service Description</h2>
                  <p className="text-zinc-400 mb-4">
                    Dock AI provides an Entity Discovery Protocol (EDP) registry that helps AI agents
                    discover MCP (Model Context Protocol) endpoints for real-world businesses.
                  </p>
                  <ul className="space-y-2 text-zinc-400">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">•</span>
                      <span>We provide domain-to-MCP endpoint resolution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">•</span>
                      <span>We do not operate third-party MCP servers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">•</span>
                      <span>We do not process transactions or handle payments</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Acceptable Use */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-3">Acceptable Use</h2>
                  <p className="text-zinc-400 mb-4">You may use Dock AI to:</p>
                  <div className="grid gap-2">
                    <div className="bg-zinc-800/50 rounded-lg p-3 text-sm text-zinc-400">
                      Discover MCP endpoints for legitimate business interactions
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3 text-sm text-zinc-400">
                      Integrate with AI assistants (Claude, ChatGPT, etc.)
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3 text-sm text-zinc-400">
                      Build applications that help users interact with businesses
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prohibited Use */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-3">Prohibited Use</h2>
                  <p className="text-zinc-400 mb-4">You may NOT use Dock AI to:</p>
                  <ul className="space-y-2 text-zinc-400">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Scrape or harvest data at scale</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Attempt to bypass rate limits or abuse the service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Impersonate businesses or create fraudulent registrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Use the service for any illegal purpose</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Third-Party Services */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-3">Third-Party Services</h2>
                  <p className="text-zinc-400">
                    Dock AI connects you to MCP endpoints operated by third-party providers.
                    Each provider has their own terms of service. We are not responsible for:
                  </p>
                  <ul className="space-y-2 text-zinc-400 mt-4">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>The availability or reliability of third-party MCP servers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Transactions or interactions made through third-party services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Data handling practices of third-party providers</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-zinc-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-3">Disclaimer</h2>
                  <p className="text-zinc-400">
                    Dock AI is provided &quot;as is&quot; without warranties of any kind. We do not guarantee
                    uninterrupted service or that all domains will have MCP endpoints available.
                    We reserve the right to modify or discontinue the service at any time.
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
                    Questions about these terms? Reach out:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="mailto:support@dockai.co"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-zinc-300 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      support@dockai.co
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Updates */}
          <p className="text-center text-zinc-500 text-sm mt-12">
            We may update these terms from time to time. Continued use of the service constitutes
            acceptance of any changes.
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
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
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
