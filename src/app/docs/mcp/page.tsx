'use client'

import { CodeBlock } from '@/components/ui/code-block'

const configExample = `{
  "mcpServers": {
    "dock-ai": {
      "url": "https://mcp.dockai.co/mcp"
    }
  }
}`

const responseExample = `{
  "entity": {
    "domain": "example-restaurant.com",
    "name": "Example Restaurant",
    "category": "restaurant",
    "verification_level": 2
  },
  "mcps": [
    {
      "provider": "zenchef",
      "endpoint": "https://mcp.zenchef.com",
      "capabilities": ["reservations", "availability"]
    }
  ],
  "claude_desktop_config": {
    "mcpServers": {
      "zenchef": { "url": "https://mcp.zenchef.com/mcp" }
    }
  }
}`

export default function McpPage() {
  return (
    <div>
      <h1>For AI Agents</h1>

      <p className="text-lg text-zinc-400 mt-4">
        Use the Dock AI MCP server to discover MCP endpoints for real-world entities.
      </p>

      <h2>Quick Start</h2>

      <p>
        Add Dock AI to your Claude Desktop configuration:
      </p>

      <CodeBlock className="my-4">{configExample}</CodeBlock>

      <p className="text-zinc-400 text-sm">
        Config file location: <code>~/Library/Application Support/Claude/claude_desktop_config.json</code>
      </p>

      <h2>How it works</h2>

      <ol className="list-decimal list-inside space-y-2 my-4 text-zinc-300">
        <li>User asks to interact with a business (e.g., &quot;Book a table at example-restaurant.com&quot;)</li>
        <li>AI calls <code className="text-teal-400">resolve_domain(&quot;example-restaurant.com&quot;)</code></li>
        <li>Dock AI returns the MCP endpoint(s) that can handle this entity</li>
        <li>AI suggests installing the provider&apos;s MCP to complete the action</li>
      </ol>

      <h2>Tools</h2>

      <h3>resolve_domain</h3>

      <p className="text-zinc-400 my-2">
        Resolve a domain to its MCP endpoints.
      </p>

      <table className="w-full my-4 text-sm">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-2 text-zinc-400">Parameter</th>
            <th className="text-left py-2 text-zinc-400">Type</th>
            <th className="text-left py-2 text-zinc-400">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">domain</td>
            <td className="py-2">string</td>
            <td className="py-2 text-zinc-400">Domain to resolve (e.g., &quot;example-restaurant.com&quot;)</td>
          </tr>
        </tbody>
      </table>

      <h3>Response</h3>

      <CodeBlock className="my-4">{responseExample}</CodeBlock>

      <p className="text-zinc-400 text-sm my-4">
        The response includes a <code>claude_desktop_config</code> snippet that the AI can suggest
        to the user for installing the provider&apos;s MCP.
      </p>

      <h2>Self-hosting</h2>

      <p className="text-zinc-400 my-4">
        You can run your own instance of the Dock AI MCP server:
      </p>

      <CodeBlock className="my-4">{`# Run with uvx
uvx dock-ai-mcp

# Or deploy to Vercel
# See: https://github.com/dock-ai/mcp`}</CodeBlock>

      <h2>Links</h2>

      <ul className="list-disc list-inside space-y-1 my-4 text-zinc-400">
        <li>
          <a href="https://github.com/dock-ai/mcp" className="text-teal-400 hover:underline">
            GitHub Repository
          </a>
        </li>
        <li>
          <a href="https://modelcontextprotocol.io" className="text-teal-400 hover:underline">
            Model Context Protocol
          </a>
        </li>
      </ul>
    </div>
  )
}
