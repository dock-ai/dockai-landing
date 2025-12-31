import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Install Dock AI Connector - Connect your AI to real businesses',
  description: 'Install the Dock AI connector on Claude, ChatGPT, or Mistral to let your AI discover and interact with restaurants, hotels, salons, and more.',
}

export default function InstallPage() {
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
            <Link href="/install" className="text-sm text-white">
              Install Connector
            </Link>
            <Link href="/docs" className="text-sm text-zinc-400 hover:text-white">
              Docs
            </Link>
            <Link href="/providers" className="text-sm text-teal-400 hover:text-teal-300">
              For Providers
            </Link>
          </nav>
        </div>
      </header>

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
                <div className="w-12 h-12 bg-[#D97757] rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Claude Desktop</h2>
                  <p className="text-zinc-400">by Anthropic</p>
                </div>
                <span className="ml-auto px-3 py-1 bg-teal-600/20 text-teal-400 text-sm rounded-full">
                  Recommended
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-sm font-bold text-teal-400 shrink-0">1</div>
                  <div>
                    <p className="text-white font-medium">Open Claude Desktop settings</p>
                    <p className="text-zinc-400 text-sm">Go to Settings → Developer → Edit Config</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-sm font-bold text-teal-400 shrink-0">2</div>
                  <div>
                    <p className="text-white font-medium">Add the Dock AI connector</p>
                    <p className="text-zinc-400 text-sm mb-3">Add this to your <code className="text-teal-400">claude_desktop_config.json</code>:</p>
                    <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm overflow-x-auto">
                      <code className="text-zinc-300">{`{
  "mcpServers": {
    "dock-ai": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-dock-ai"]
    }
  }
}`}</code>
                    </pre>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-sm font-bold text-teal-400 shrink-0">3</div>
                  <div>
                    <p className="text-white font-medium">Restart Claude Desktop</p>
                    <p className="text-zinc-400 text-sm">Close and reopen Claude. You&apos;re ready!</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-zinc-950 rounded-lg border border-zinc-800">
                <p className="text-zinc-400 text-sm">
                  <span className="text-teal-400 font-medium">Try it:</span> Ask Claude &quot;Book a table at Septime in Paris&quot; and watch it discover the right connector.
                </p>
              </div>
            </div>

            {/* ChatGPT */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#10A37F] rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364l2.0201-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
                  </svg>
                </div>
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
                  className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 text-sm"
                >
                  Notify me when available →
                </a>
              </div>
            </div>

            {/* Mistral */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#F54E00] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Le Chat</h2>
                  <p className="text-zinc-400">by Mistral AI</p>
                </div>
                <span className="ml-auto px-3 py-1 bg-amber-600/20 text-amber-400 text-sm rounded-full">
                  Coming Soon
                </span>
              </div>

              <p className="text-zinc-400">
                Mistral&apos;s Le Chat supports MCP connectors.
                We&apos;re finalizing the integration.
              </p>

              <div className="mt-6">
                <a
                  href="mailto:hello@dockai.co?subject=Notify me when Mistral connector is ready"
                  className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 text-sm"
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
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="font-semibold text-white mb-2">You ask</h3>
              <p className="text-zinc-400 text-sm">
                &quot;Book a table at Septime for tonight&quot;
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔌</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Dock AI discovers</h3>
              <p className="text-zinc-400 text-sm">
                Finds the right connector for Septime (ZenChef, TheFork...)
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="font-semibold text-white mb-2">AI acts</h3>
              <p className="text-zinc-400 text-sm">
                Your AI books the table through the right service
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 px-4 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-zinc-500">
          <p>Dock AI - Connect AI to the real world</p>
          <div className="flex gap-4">
            <Link href="/docs" className="hover:text-white">
              Docs
            </Link>
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
