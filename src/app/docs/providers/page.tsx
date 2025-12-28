import Link from 'next/link'

export const metadata = {
  title: 'For Providers - Dock AI',
  description: 'Register your MCP server and bulk-register entities in the Dock AI registry.',
}

export default function ProvidersPage() {
  return (
    <div>
      <h1>For MCP Providers</h1>

      <p className="text-lg text-zinc-400 mt-4">
        Register your MCP server and bulk-register entities you serve.
      </p>

      <h2>Getting Started</h2>

      <ol className="list-decimal list-inside space-y-2 my-4">
        <li>
          Register at{' '}
          <a href="https://provider.dockai.co" className="text-teal-400 hover:underline">
            provider.dockai.co
          </a>
        </li>
        <li>Verify your MCP endpoint</li>
        <li>Get your API key</li>
        <li>Start registering entities</li>
      </ol>

      <h2>Provider Registration API</h2>

      <pre className="my-4"><code>{`POST https://api.dockai.co/v1/providers/register
Authorization: Bearer sk_live_xxxxxxxxxxxxx`}</code></pre>

      <h3>Request Body</h3>

      <pre className="my-4"><code>{`{
  "sync_mode": "additive",
  "provider": {
    "capabilities": ["reservations", "availability"]
  },
  "entities": [
    {
      "entity_id": "rest-123",
      "domain": "example-restaurant.com",
      "name": "Example Restaurant",
      "category": "restaurant",
      "location": {
        "city": "Paris",
        "country": "FR"
      }
    },
    {
      "entity_id": "rest-456",
      "name": "Another Restaurant",
      "category": "restaurant"
    }
  ]
}`}</code></pre>

      <h2>Fields Reference</h2>

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
            <td className="py-2 font-mono">sync_mode</td>
            <td className="py-2">string</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">&quot;additive&quot; (default) or &quot;full&quot;</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">provider</td>
            <td className="py-2">object</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">Provider settings</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">entities</td>
            <td className="py-2">array</td>
            <td className="py-2">Yes</td>
            <td className="py-2 text-zinc-400">Entities to register</td>
          </tr>
        </tbody>
      </table>

      <h3>Entity Fields</h3>

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
            <td className="py-2 font-mono">entity_id</td>
            <td className="py-2">string</td>
            <td className="py-2">Yes</td>
            <td className="py-2 text-zinc-400">Your internal ID</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">domain</td>
            <td className="py-2">string</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">Entity&apos;s domain (if they have one)</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">name</td>
            <td className="py-2">string</td>
            <td className="py-2">Yes</td>
            <td className="py-2 text-zinc-400">Display name</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">category</td>
            <td className="py-2">string</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">e.g., restaurant, hotel, salon</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">capabilities</td>
            <td className="py-2">string[]</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">Override provider capabilities</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">location</td>
            <td className="py-2">object</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">city, country, coordinates</td>
          </tr>
        </tbody>
      </table>

      <h2>Sync Modes</h2>

      <table className="w-full my-4 text-sm">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-2 text-zinc-400">Mode</th>
            <th className="text-left py-2 text-zinc-400">Behavior</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">additive</td>
            <td className="py-2 text-zinc-400">Creates new entities, updates existing. Never deletes. (Default)</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">full</td>
            <td className="py-2 text-zinc-400">Full sync. Entities not in request are deleted.</td>
          </tr>
        </tbody>
      </table>

      <div className="my-6 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
        <p className="text-sm text-zinc-400">
          <strong className="text-white">Matching logic:</strong><br />
          Entities with <code>domain</code> are matched by domain.<br />
          Entities without <code>domain</code> are matched by <code>provider:&#123;id&#125;:&#123;entity_id&#125;</code>.
        </p>
      </div>

      <h2>Response</h2>

      <pre className="my-4"><code>{`{
  "success": true,
  "provider": "your-provider-id",
  "sync_mode": "additive",
  "results": {
    "total": 2,
    "created": 1,
    "updated": 1,
    "deleted": 0,
    "errors": 0
  }
}`}</code></pre>

      <h2>Dual Attestation</h2>

      <p>
        When an entity you register also publishes an{' '}
        <Link href="/docs/entity-card" className="text-teal-400 hover:underline">
          Entity Card
        </Link>{' '}
        with a matching endpoint, their verification level is upgraded to <strong>Level 2</strong>.
      </p>

      <p>
        To help your clients set this up, provide them with an Entity Card template:
      </p>

      <pre className="my-4"><code>{`{
  "schema_version": "0.1.0",
  "domain": "CLIENT_DOMAIN.com",
  "mcps": [
    {
      "provider": "your-provider-id",
      "endpoint": "https://your-mcp-endpoint.com"
    }
  ]
}`}</code></pre>

      <h2>Rate Limits</h2>

      <p>
        The provider registration endpoint is rate-limited to <strong>20 requests per minute</strong>.
      </p>
    </div>
  )
}
