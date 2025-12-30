'use client'

import Link from 'next/link'
import { CodeBlock } from '@/components/ui/code-block'

const syncEndpoint = `POST https://api.dockai.co/v1/providers/sync
Authorization: Bearer sk_live_xxxxxxxxxxxxx`

const syncRequest = `{
  "entities": [
    {
      "entity_id": "rest-123",
      "name": "Example Restaurant Paris",
      "domain": "example-restaurant.com",
      "category": "restaurant",
      "city": "Paris",
      "country": "FR"
    },
    {
      "entity_id": "rest-456",
      "name": "Another Restaurant",
      "category": "restaurant",
      "city": "Lyon"
    }
  ]
}`

const syncResponse = `{
  "success": true,
  "provider": "your-provider-id",
  "results": {
    "total": 2,
    "created": 1,
    "updated": 1,
    "deleted": 3,
    "unchanged": 0,
    "errors": 0
  }
}`

const entityCardTemplate = `{
  "schema_version": "0.2.0",
  "domain": "example-restaurant.com",
  "entities": [
    {
      "name": "Client Business Name",
      "path": "/",
      "mcps": [
        {
          "provider": "your-provider-id",
          "endpoint": "https://your-mcp-endpoint.com"
        }
      ]
    }
  ]
}`

export default function ProvidersPage() {
  return (
    <div>
      <h1>For MCP Providers</h1>

      <p className="text-lg text-zinc-400 mt-4">
        Register your MCP server and manage entities you serve.
      </p>

      <h2>Getting Started</h2>

      <ol className="list-decimal list-inside space-y-2 my-4">
        <li>
          <Link href="/providers" className="text-teal-400 hover:underline">
            Contact us
          </Link>{' '}
          to get onboarded
        </li>
        <li>Verify your MCP endpoint</li>
        <li>Get your API key</li>
        <li>Start registering entities</li>
      </ol>

      <h2>Full Sync API</h2>

      <p className="text-zinc-400 my-4">
        Send all your entities in one request. We handle the diff automatically:
        new entities are created, existing ones updated, and missing ones deleted.
      </p>

      <CodeBlock className="my-4">{syncEndpoint}</CodeBlock>

      <h3>Request Body</h3>

      <CodeBlock className="my-4">{syncRequest}</CodeBlock>

      <h3>Entity Fields</h3>

      <table className="w-full my-4 text-sm">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-2 text-zinc-400">Field</th>
            <th className="text-left py-2 text-zinc-400">Required</th>
            <th className="text-left py-2 text-zinc-400">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">entity_id</td>
            <td className="py-2">Yes</td>
            <td className="py-2 text-zinc-400">Your internal ID</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">name</td>
            <td className="py-2">Yes</td>
            <td className="py-2 text-zinc-400">Display name</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">domain</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">Entity&apos;s website domain</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">path</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">Path within domain (e.g., /paris)</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">category</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">e.g., restaurant, hotel, salon</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">city, country</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">Location info</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">lat, lng</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">GPS coordinates</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">capabilities</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">What your MCP can do for this entity</td>
          </tr>
        </tbody>
      </table>

      <h2>Limits</h2>

      <div className="my-6 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
        <p className="text-sm text-zinc-400">
          <strong className="text-white">Max 10,000 entities per request.</strong><br />
          For larger imports, split your data into batches.
        </p>
      </div>

      <h2>Response</h2>

      <CodeBlock className="my-4">{syncResponse}</CodeBlock>

      <div className="my-6 p-4 bg-teal-900/30 border border-teal-800 rounded-lg">
        <p className="text-sm text-zinc-300">
          <strong className="text-teal-400">Full Sync Behavior:</strong> Entities not in the request
          are automatically deleted. This keeps your registry in sync with your database.
        </p>
      </div>

      <h2 id="verification-levels">Verification Levels</h2>

      <p className="text-zinc-400 my-4">
        AI agents need to trust the MCP endpoints they connect to. Verification levels help agents
        assess how confident they can be that an entity is genuinely served by your MCP. Higher levels
        mean stronger proof of the relationship between the entity and the provider.
      </p>

      <table className="w-full my-4 text-sm">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-2 text-zinc-400">Level</th>
            <th className="text-left py-2 text-zinc-400">Source</th>
            <th className="text-left py-2 text-zinc-400">Trust</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-zinc-800">
            <td className="py-2">0</td>
            <td className="py-2 text-zinc-400">Provider registration only</td>
            <td className="py-2 text-zinc-400">Provider claim</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2">1</td>
            <td className="py-2 text-zinc-400">Entity Card only OR Trusted Provider</td>
            <td className="py-2 text-zinc-400">Business claim</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2">2</td>
            <td className="py-2 text-zinc-400">Both match</td>
            <td className="py-2 text-zinc-400">Dual attestation</td>
          </tr>
        </tbody>
      </table>

      <h3>Trusted Providers</h3>

      <p className="text-zinc-400 my-4">
        Providers with established business partnerships can be marked as &quot;trusted&quot;.
        Their entities start at <strong>Level 1</strong> instead of Level 0, reflecting the existing business relationship.
      </p>

      <h3>Dual Attestation (Level 2)</h3>

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

      <CodeBlock className="my-4">{entityCardTemplate}</CodeBlock>

      <h2>Rate Limits</h2>

      <p>
        The sync endpoint is rate-limited to <strong>100 requests per minute</strong>.
      </p>

      <h2>Alternative: Operations API</h2>

      <p className="text-zinc-400 my-4">
        For granular control over individual entities, use the{' '}
        <Link href="/docs/api#provider-register" className="text-teal-400 hover:underline">
          operations API
        </Link>{' '}
        with upsert/delete actions. This is useful when you only need to update a few entities
        without re-syncing the entire list.
      </p>
    </div>
  )
}
