'use client'

import Link from 'next/link'
import { CodeBlock } from '@/components/ui/code-block'

const endpointExample = `POST https://api.dockai.co/v1/providers/register
Authorization: Bearer sk_live_xxxxxxxxxxxxx`

const requestExample = `{
  "operations": [
    {
      "action": "upsert",
      "entity": {
        "entity_id": "rest-123",
        "domain": "example-restaurant.com",
        "name": "Example Restaurant",
        "category": "restaurant",
        "location": {
          "city": "Paris",
          "country": "FR"
        }
      }
    },
    {
      "action": "upsert",
      "entity": {
        "entity_id": "rest-456",
        "name": "Another Restaurant",
        "category": "restaurant"
      }
    },
    {
      "action": "delete",
      "entity_id": "old-entity-789"
    }
  ]
}`

const responseExample = `{
  "success": true,
  "provider": "your-provider-id",
  "results": {
    "total": 3,
    "created": 1,
    "updated": 1,
    "deleted": 1,
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

      <h2>Provider Registration API</h2>

      <CodeBlock className="my-4">{endpointExample}</CodeBlock>

      <h3>Request Body</h3>

      <CodeBlock className="my-4">{requestExample}</CodeBlock>

      <h2>Operations</h2>

      <p className="text-zinc-400 my-4">
        Each request contains an array of operations. Max <strong>1000 operations</strong> per request.
      </p>

      <h3>Upsert Operation</h3>

      <p className="text-zinc-400 my-2">Create or update an entity:</p>

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
            <td className="py-2 font-mono">action</td>
            <td className="py-2">string</td>
            <td className="py-2">Yes</td>
            <td className="py-2 text-zinc-400">&quot;upsert&quot;</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">entity.entity_id</td>
            <td className="py-2">string</td>
            <td className="py-2">Yes</td>
            <td className="py-2 text-zinc-400">Your internal ID</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">entity.domain</td>
            <td className="py-2">string</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">Entity&apos;s domain (if they have one)</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">entity.name</td>
            <td className="py-2">string</td>
            <td className="py-2">Yes</td>
            <td className="py-2 text-zinc-400">Display name</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">entity.category</td>
            <td className="py-2">string</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">e.g., restaurant, hotel, salon</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">entity.capabilities</td>
            <td className="py-2">string[]</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">Override provider capabilities</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">entity.location</td>
            <td className="py-2">object</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">city, country, coordinates</td>
          </tr>
        </tbody>
      </table>

      <h3>Delete Operation</h3>

      <p className="text-zinc-400 my-2">Remove an entity by its entity_id:</p>

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
            <td className="py-2 font-mono">action</td>
            <td className="py-2">string</td>
            <td className="py-2">Yes</td>
            <td className="py-2 text-zinc-400">&quot;delete&quot;</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">entity_id</td>
            <td className="py-2">string</td>
            <td className="py-2">Yes</td>
            <td className="py-2 text-zinc-400">The entity_id to delete</td>
          </tr>
        </tbody>
      </table>

      <h2>Pagination</h2>

      <div className="my-6 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
        <p className="text-sm text-zinc-400">
          <strong className="text-white">Max 1000 operations per request.</strong><br />
          For larger imports, split your data into batches and send multiple requests.
        </p>
      </div>

      <h2>Response</h2>

      <CodeBlock className="my-4">{responseExample}</CodeBlock>

      <h2>Verification Levels</h2>

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
        The provider registration endpoint is rate-limited to <strong>20 requests per minute</strong>.
      </p>
    </div>
  )
}
