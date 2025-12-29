import Link from 'next/link'

export const metadata = {
  title: 'Documentation - Dock AI',
  description: 'Learn how to use Dock AI, the first Entity Discovery Protocol registry.',
}

export default function DocsPage() {
  return (
    <div>
      <h1>Documentation</h1>

      <p className="text-lg text-zinc-400 mt-4">
        Dock AI is the first registry implementing the{' '}
        <Link href="/protocol" className="text-teal-400 hover:underline">
          Entity Discovery Protocol (EDP)
        </Link>
        . It helps AI agents discover which MCP servers can interact with real-world entities.
      </p>

      <h2>How it works</h2>

      <p>
        When an AI agent needs to interact with a business (e.g., book a table at a restaurant),
        it queries Dock AI to find the MCP provider that handles that entity.
      </p>

      <div className="my-6 p-4 bg-zinc-900 rounded-lg border border-zinc-800 font-mono text-sm">
        <p className="text-zinc-500 mb-2"># Agent asks: &quot;Which MCP handles this restaurant?&quot;</p>
        <p className="text-teal-400">GET /v1/resolve/domain/example-restaurant.com</p>
      </div>

      <p>
        Dock AI returns the MCP endpoint, capabilities, and verification level. The agent can then
        connect directly to the MCP server.
      </p>

      <h2>Verification Levels</h2>

      <p>Trust is established through a verification system:</p>

      <table className="w-full my-4">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-2 text-zinc-400">Level</th>
            <th className="text-left py-2 text-zinc-400">Source</th>
            <th className="text-left py-2 text-zinc-400">Trust</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          <tr className="border-b border-zinc-800">
            <td className="py-2">0</td>
            <td className="py-2">Provider registration only</td>
            <td className="py-2 text-zinc-500">Provider claim</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2">1</td>
            <td className="py-2">Entity Card OR Trusted Provider</td>
            <td className="py-2 text-zinc-500">Business claim</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 text-teal-400 font-medium">2</td>
            <td className="py-2">Both match (dual attestation)</td>
            <td className="py-2 text-teal-400">Mutual agreement</td>
          </tr>
        </tbody>
      </table>

      <p>
        Level 2 verification requires both the MCP provider to register the entity <strong>and</strong>{' '}
        the entity to publish an Entity Card confirming the relationship.
      </p>

      <h2>Getting Started</h2>

      <div className="grid gap-4 my-6">
        <Link
          href="/docs/entity-card"
          className="block p-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 no-underline"
        >
          <h3 className="text-white font-medium mb-1">Entity Card</h3>
          <p className="text-zinc-400 text-sm">
            Learn how to create and host an Entity Card on your website.
          </p>
        </Link>

        <Link
          href="/docs/submit"
          className="block p-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 no-underline"
        >
          <h3 className="text-white font-medium mb-1">Submit Domain</h3>
          <p className="text-zinc-400 text-sm">
            Submit your domain to index your Entity Card in the registry.
          </p>
        </Link>

        <Link
          href="/docs/providers"
          className="block p-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 no-underline"
        >
          <h3 className="text-white font-medium mb-1">For Providers</h3>
          <p className="text-zinc-400 text-sm">
            Register your MCP server and bulk-register entities.
          </p>
        </Link>

        <Link
          href="/docs/mcp"
          className="block p-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 no-underline"
        >
          <h3 className="text-white font-medium mb-1">For AI Agents</h3>
          <p className="text-zinc-400 text-sm">
            Use the Dock AI MCP server to discover entity endpoints.
          </p>
        </Link>
      </div>

      <h2>API Reference</h2>

      <p>Base URL: <code>https://api.dockai.co</code></p>

      <table className="w-full my-4 text-sm">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-2 text-zinc-400">Endpoint</th>
            <th className="text-left py-2 text-zinc-400">Auth</th>
            <th className="text-left py-2 text-zinc-400">Rate Limit</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono text-teal-400">GET /v1/resolve/domain/&#123;domain&#125;</td>
            <td className="py-2">No</td>
            <td className="py-2">100/min</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono text-teal-400">POST /v1/submit</td>
            <td className="py-2">No</td>
            <td className="py-2">10/min</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono text-teal-400">POST /v1/providers/register</td>
            <td className="py-2">API Key</td>
            <td className="py-2">20/min</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
