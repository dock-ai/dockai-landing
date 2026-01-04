import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { Search, Plug, CheckCircle } from 'lucide-react'
import { Header, Footer } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Install Dock AI Connector - Connect your AI to real businesses',
  description: 'Install the Dock AI connector on Claude, ChatGPT, or Mistral to let your AI discover and interact with restaurants, hotels, salons, and more.',
}

export default function InstallPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="py-16 px-4 border-b border-zinc-800">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Connect your AI to the real world
          </h1>
          <p className="text-xl text-zinc-400">
            Your AI doesn&apos;t know which app to use to book your favorite restaurant?
            <br />
            Install the Dock AI connector and let it discover.
          </p>
        </div>
      </section>

      {/* Installation Options */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {/* Claude */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <Image src="/ai/claude.svg" alt="Claude" width={48} height={48} className="rounded-xl" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Claude</h2>
                  <p className="text-zinc-400">by Anthropic</p>
                </div>
                <span className="ml-auto px-3 py-1 bg-teal-600/20 text-teal-400 text-sm rounded-full">
                  Available
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-sm font-bold text-teal-400 shrink-0">1</div>
                  <div>
                    <p className="text-white font-medium">Open Connectors settings</p>
                    <p className="text-zinc-400 text-sm">Go to <span className="text-zinc-300">Settings → Connectors</span></p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-sm font-bold text-teal-400 shrink-0">2</div>
                  <div>
                    <p className="text-white font-medium">Add a custom connector</p>
                    <p className="text-zinc-400 text-sm">Click <span className="text-zinc-300">&quot;Add custom connector&quot;</span></p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-sm font-bold text-teal-400 shrink-0">3</div>
                  <div>
                    <p className="text-white font-medium">Enter the Dock AI server URL</p>
                    <pre className="mt-2 bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm overflow-x-auto">
                      <code className="text-teal-400">https://mcp.dockai.co</code>
                    </pre>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-sm font-bold text-teal-400 shrink-0">4</div>
                  <div>
                    <p className="text-white font-medium">Click &quot;Add&quot;</p>
                    <p className="text-zinc-400 text-sm">You&apos;re ready!</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-zinc-950 rounded-lg border border-zinc-800">
                <p className="text-zinc-400 text-sm">
                  <span className="text-teal-400 font-medium">Try it:</span> Ask Claude &quot;Book a table at Septime in Paris&quot; and watch it discover the right connector.
                </p>
              </div>
            </div>

            {/* Mistral */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <Image src="/ai/mistral.svg" alt="Mistral" width={48} height={48} className="rounded-xl" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Le Chat</h2>
                  <p className="text-zinc-400">by Mistral AI</p>
                </div>
                <span className="ml-auto px-3 py-1 bg-teal-600/20 text-teal-400 text-sm rounded-full">
                  Available
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-sm font-bold text-teal-400 shrink-0">1</div>
                  <div>
                    <p className="text-white font-medium">Open Connectors</p>
                    <p className="text-zinc-400 text-sm">Click the side panel → <span className="text-zinc-300">Intelligence → Connectors</span></p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-sm font-bold text-teal-400 shrink-0">2</div>
                  <div>
                    <p className="text-white font-medium">Add a connector</p>
                    <p className="text-zinc-400 text-sm">Click <span className="text-zinc-300">&quot;+ Add Connector&quot;</span> then select <span className="text-zinc-300">&quot;Custom MCP Connector&quot;</span></p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-sm font-bold text-teal-400 shrink-0">3</div>
                  <div>
                    <p className="text-white font-medium">Configure the connector</p>
                    <div className="mt-3 space-y-3">
                      <div>
                        <span className="text-zinc-500 text-sm">Name:</span>
                        <pre className="mt-1 bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm">
                          <code className="text-teal-400">dock-ai</code>
                        </pre>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-sm">Server URL:</span>
                        <pre className="mt-1 bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm">
                          <code className="text-teal-400">https://mcp.dockai.co</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-sm font-bold text-teal-400 shrink-0">4</div>
                  <div>
                    <p className="text-white font-medium">Click &quot;Connect&quot;</p>
                    <p className="text-zinc-400 text-sm">You&apos;re ready!</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-zinc-950 rounded-lg border border-zinc-800">
                <p className="text-zinc-400 text-sm">
                  <span className="text-teal-400 font-medium">Try it:</span> Ask Le Chat &quot;Find a hotel near the Eiffel Tower&quot; and watch it discover available connectors.
                </p>
              </div>
            </div>

            {/* ChatGPT */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <Image src="/ai/openai.svg" alt="ChatGPT" width={48} height={48} className="rounded-xl" />
                <div>
                  <h2 className="text-2xl font-bold text-white">ChatGPT</h2>
                  <p className="text-zinc-400">by OpenAI</p>
                </div>
                <span className="ml-auto px-3 py-1 bg-amber-600/20 text-amber-400 text-sm rounded-full">
                  Coming Soon
                </span>
              </div>

              <p className="text-zinc-400">
                OpenAI recently announced support for connectors in ChatGPT.
                We&apos;re working on bringing Dock AI to the ChatGPT App Store.
              </p>

              <div className="mt-6">
                <a
                  href="mailto:hello@dockai.co?subject=Notify me when ChatGPT connector is ready"
                  className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 text-sm cursor-pointer"
                >
                  Notify me when available →
                </a>
              </div>
            </div>

            {/* Other platforms */}
            <div className="bg-zinc-900/50 border border-zinc-800 border-dashed rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Other AI Assistants</h3>
              <p className="text-zinc-400 mb-4">
                Using a different AI platform? Dock AI works with any MCP-compatible client.
              </p>
              <Link
                href="/docs/mcp"
                className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300"
              >
                View technical documentation →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">How it works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">You ask</h3>
              <p className="text-zinc-400 text-sm">
                &quot;Book a table at Septime for tonight&quot;
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Plug className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Dock AI discovers</h3>
              <p className="text-zinc-400 text-sm">
                Finds the right connector for Septime (ZenChef, TheFork...)
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">AI acts</h3>
              <p className="text-zinc-400 text-sm">
                Your AI books the table through the right service
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
