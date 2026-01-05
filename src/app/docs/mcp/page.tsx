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
  "domain": "example-restaurant.com",
  "entities": [
    {
      "name": "Acme Bistro",
      "path": "/",
      "category": "restaurant",
      "verification_level": 2,
      "mcps": [
        {
          "provider": "booking-provider",
          "endpoint": "https://mcp.booking-provider.com",
          "capabilities": ["reservations", "availability"]
        }
      ]
    }
  ],
  "claude_desktop_config": {
    "mcpServers": {
      "booking-provider": { "url": "https://mcp.booking-provider.com/mcp" }
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

      <p className="text-zinc-400 text-sm my-2">
        Config file location: <code>~/Library/Application Support/Claude/claude_desktop_config.json</code>
      </p>

      <div className="my-6 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
        <p className="text-sm">
          <strong className="text-white">Remote URL:</strong>{' '}
          <code className="text-teal-400">https://mcp.dockai.co/mcp</code>
        </p>
        <p className="text-zinc-500 text-sm mt-2">
          No installation required. Just add the URL to your MCP client.
        </p>
      </div>

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

      <h2>Usage Examples</h2>

      <p className="text-zinc-400 my-4">
        Here are real-world examples of using Dock AI to discover MCP endpoints:
      </p>

      <h3>Example 1: Restaurant Booking</h3>
      <p className="text-zinc-400 my-2">
        User wants to book a table at a Parisian restaurant.
      </p>
      <CodeBlock className="my-4">{`// User: "Book a table at Septime Paris"

// Step 1: AI searches web for restaurant domain
// Found: septime-charonne.fr

// Step 2: AI calls resolve_domain
resolve_domain("septime-charonne.fr")

// Step 3: Response
{
  "domain": "septime-charonne.fr",
  "entities": [{
    "name": "Septime",
    "category": "restaurant",
    "mcps": [{
      "provider": "zenchef",
      "endpoint": "https://mcp.zenchef.com",
      "capabilities": ["reservations", "availability"]
    }]
  }]
}

// Step 4: AI guides user to add ZenChef MCP to complete booking`}</CodeBlock>

      <h3>Example 2: E-commerce Shopping</h3>
      <p className="text-zinc-400 my-2">
        User wants to browse products on an online store.
      </p>
      <CodeBlock className="my-4">{`// User: "Show me running shoes on Gymshark"

// AI calls resolve_domain
resolve_domain("gymshark.com")

// Response
{
  "domain": "gymshark.com",
  "entities": [{
    "name": "Gymshark",
    "category": "ecommerce",
    "mcps": [{
      "provider": "shopify",
      "endpoint": "https://mcp.shopify.com",
      "capabilities": ["products", "cart", "checkout"]
    }]
  }]
}

// AI can now help user browse products via Shopify MCP`}</CodeBlock>

      <h3>Example 3: Multi-location Business</h3>
      <p className="text-zinc-400 my-2">
        User wants to book at a restaurant group with multiple locations.
      </p>
      <CodeBlock className="my-4">{`// User: "Book at Gloria near me"

// AI calls resolve_domain
resolve_domain("gloria-osteria.com")

// Response with multiple entities
{
  "domain": "gloria-osteria.com",
  "entities": [
    {
      "name": "Gloria Paris",
      "path": "/restaurants/paris",
      "location": { "city": "Paris", "address": "186 Rue du Faubourg Poissonnière" },
      "mcps": [{ "provider": "zenchef", "endpoint": "https://mcp.zenchef.com" }]
    },
    {
      "name": "Gloria London",
      "path": "/restaurants/london",
      "location": { "city": "London", "address": "54-56 Great Eastern St" },
      "mcps": [{ "provider": "zenchef", "endpoint": "https://mcp.zenchef.com" }]
    }
  ]
}

// AI asks user which location, then proceeds with booking`}</CodeBlock>

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
