'use client'

import { CodeBlock } from '@/components/ui/code-block'

const schemaExample = `{
  "schema_version": "0.2.0",
  "domain": "example-restaurant.com",
  "entities": [
    {
      "name": "Acme Bistro",
      "path": "/",
      "location": {
        "city": "Paris",
        "country": "FR"
      },
      "mcps": [
        {
          "provider": "booking-provider",
          "endpoint": "https://mcp.booking-provider.com",
          "entity_id": "rest-123",
          "capabilities": ["reservations", "availability"],
          "priority": 10
        }
      ]
    }
  ]
}`

const multiEntityExample = `{
  "schema_version": "0.2.0",
  "domain": "acme-bistro-group.com",
  "entities": [
    {
      "name": "Acme Bistro Downtown",
      "path": "/locations/downtown",
      "location": {
        "city": "New York",
        "country": "US"
      },
      "mcps": [
        {
          "provider": "booking-provider",
          "endpoint": "https://mcp.booking-provider.com",
          "entity_id": "downtown-123",
          "capabilities": ["reservations"],
          "priority": 10
        }
      ]
    },
    {
      "name": "Acme Bistro Uptown",
      "path": "/locations/uptown",
      "location": {
        "city": "New York",
        "country": "US"
      },
      "mcps": [
        {
          "provider": "booking-provider",
          "endpoint": "https://mcp.booking-provider.com",
          "entity_id": "uptown-456",
          "capabilities": ["reservations"],
          "priority": 10
        }
      ]
    }
  ]
}`

const priorityExample = `{
  "schema_version": "0.2.0",
  "domain": "example-restaurant.com",
  "entities": [
    {
      "name": "Example Restaurant",
      "path": "/",
      "mcps": [
        {
          "provider": "preferred-provider",
          "endpoint": "https://mcp.preferred-provider.com",
          "priority": 10
        },
        {
          "provider": "backup-provider",
          "endpoint": "https://mcp.backup-provider.com",
          "priority": 5
        }
      ]
    }
  ]
}`

export default function EntityCardPage() {
  return (
    <div>
      <h1>Entity Card</h1>

      <p className="text-lg text-zinc-400 mt-4">
        An Entity Card is a JSON file that declares which MCP providers can interact with your business.
        Version 0.2.0 introduces multi-entity support, allowing a single domain to define multiple entities.
      </p>

      <h2>File Location</h2>

      <p>
        Host your Entity Card at the well-known path:
      </p>

      <CodeBlock className="my-4">https://example-restaurant.com/.well-known/entity-card.json</CodeBlock>

      <h2>Schema</h2>

      <CodeBlock className="my-4">{schemaExample}</CodeBlock>

      <h2>Fields</h2>

      <h3>Root Fields</h3>

      <table className="w-full my-4 text-sm">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-2 text-zinc-400">Field</th>
            <th className="text-left py-2 text-zinc-400">Type</th>
            <th className="text-left py-2 text-zinc-400">Required</th>
            <th className="text-left py-2 text-zinc-400">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">schema_version</td>
            <td className="py-2">string</td>
            <td className="py-2">Yes</td>
            <td className="py-2 text-zinc-400">Must be &quot;0.2.0&quot;</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">domain</td>
            <td className="py-2">string</td>
            <td className="py-2">Yes</td>
            <td className="py-2 text-zinc-400">Your domain (must match where file is hosted)</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">entities</td>
            <td className="py-2">array</td>
            <td className="py-2">Yes</td>
            <td className="py-2 text-zinc-400">List of entities at this domain</td>
          </tr>
        </tbody>
      </table>

      <h3>Entity Object Fields</h3>

      <table className="w-full my-4 text-sm">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-2 text-zinc-400">Field</th>
            <th className="text-left py-2 text-zinc-400">Type</th>
            <th className="text-left py-2 text-zinc-400">Required</th>
            <th className="text-left py-2 text-zinc-400">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">name</td>
            <td className="py-2">string</td>
            <td className="py-2">Yes</td>
            <td className="py-2 text-zinc-400">Display name of the entity</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">path</td>
            <td className="py-2">string</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">URL path for this entity (e.g., &quot;/locations/downtown&quot;)</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">location</td>
            <td className="py-2">object</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">Physical location (city, country, coordinates)</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">mcps</td>
            <td className="py-2">array</td>
            <td className="py-2">Yes</td>
            <td className="py-2 text-zinc-400">List of MCP providers for this entity</td>
          </tr>
        </tbody>
      </table>

      <h3>MCP Object Fields</h3>

      <table className="w-full my-4 text-sm">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-2 text-zinc-400">Field</th>
            <th className="text-left py-2 text-zinc-400">Type</th>
            <th className="text-left py-2 text-zinc-400">Required</th>
            <th className="text-left py-2 text-zinc-400">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">provider</td>
            <td className="py-2">string</td>
            <td className="py-2">Yes</td>
            <td className="py-2 text-zinc-400">Provider identifier</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">endpoint</td>
            <td className="py-2">string</td>
            <td className="py-2">Yes</td>
            <td className="py-2 text-zinc-400">MCP server URL</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">entity_id</td>
            <td className="py-2">string</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">Your ID at the provider</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">capabilities</td>
            <td className="py-2">string[]</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">What the MCP can do (e.g., reservations)</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">priority</td>
            <td className="py-2">number</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">Ordering hint (higher = preferred)</td>
          </tr>
        </tbody>
      </table>

      <h2>Multi-Entity Support</h2>

      <p>
        Version 0.2.0 allows you to define multiple entities under a single domain. This is useful for
        restaurant groups, hotel chains, or any business with multiple locations.
      </p>

      <CodeBlock className="my-4">{multiEntityExample}</CodeBlock>

      <p className="text-zinc-400 mt-4">
        Each entity can have its own <code>path</code> to differentiate between locations, and its own
        set of MCP providers with unique <code>entity_id</code> values.
      </p>

      <h2>Verification</h2>

      <p>
        When your Entity Card is submitted to Dock AI, we verify that the <code>domain</code> field
        matches the domain where the file is hosted. This ensures you control the domain.
      </p>

      <p>
        If an MCP provider has also registered your entity with a matching endpoint, your verification
        level is upgraded to <strong>Level 2 (dual attestation)</strong>.
      </p>

      <h2>Priority Field</h2>

      <p>
        If you work with multiple MCP providers, use the <code>priority</code> field to indicate
        your preferred provider. Higher values indicate higher priority.
      </p>

      <CodeBlock className="my-4">{priorityExample}</CodeBlock>

      <div className="mt-8 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
        <p className="text-sm text-zinc-400">
          <strong className="text-white">Note:</strong> Only entities can set priority. MCP providers
          cannot override this value during registration.
        </p>
      </div>

      <h2>Next Steps</h2>

      <p>
        Once your Entity Card is hosted, <a href="/docs/submit" className="text-teal-400 hover:underline">submit your domain</a>{' '}
        to index it in the registry.
      </p>
    </div>
  )
}
