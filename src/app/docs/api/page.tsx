import { CodeBlock } from '@/components/ui/code-block'

export const metadata = {
  title: 'API Reference - Dock AI',
  description: 'Complete API reference for Dock AI registry endpoints.',
}

export default function ApiReferencePage() {
  return (
    <div>
      <h1>API Reference</h1>

      <p className="text-lg text-zinc-400 mt-4">
        Base URL: <code>https://api.dockai.co</code>
      </p>

      <div className="my-6 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left py-2 text-zinc-400">Endpoint</th>
              <th className="text-left py-2 text-zinc-400">Auth</th>
              <th className="text-left py-2 text-zinc-400">Rate Limit</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-800">
              <td className="py-2 font-mono text-teal-400">GET /v1/resolve/domain/:domain</td>
              <td className="py-2">None</td>
              <td className="py-2">100/min</td>
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="py-2 font-mono text-teal-400">POST /v1/submit</td>
              <td className="py-2">None</td>
              <td className="py-2">10/min</td>
            </tr>
            <tr>
              <td className="py-2 font-mono text-teal-400">POST /v1/providers/register</td>
              <td className="py-2">API Key</td>
              <td className="py-2">20/min</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Resolve Domain */}
      <h2 id="resolve-domain">GET /v1/resolve/domain/:domain</h2>

      <p>
        Resolve a domain to its MCP endpoints. Returns all entities associated with the domain
        and their available MCP providers.
      </p>

      <h3>Parameters</h3>

      <table className="w-full my-4 text-sm">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-2 text-zinc-400">Name</th>
            <th className="text-left py-2 text-zinc-400">Type</th>
            <th className="text-left py-2 text-zinc-400">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">domain</td>
            <td className="py-2">path</td>
            <td className="py-2 text-zinc-400">The domain to resolve (e.g., example-restaurant.com)</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">path</td>
            <td className="py-2">query</td>
            <td className="py-2 text-zinc-400">Optional. Filter to a specific entity path (e.g., /paris)</td>
          </tr>
        </tbody>
      </table>

      <h3>Response</h3>

      <CodeBlock className="my-4">
{`// 200 OK
{
  "domain": "example-restaurant.com",
  "entities": [
    {
      "name": "Example Restaurant Paris",
      "path": "/paris",
      "location": {
        "city": "Paris",
        "country": "FR",
        "coordinates": { "lat": 48.8566, "lng": 2.3522 }
      },
      "verification_level": 2,
      "mcps": [
        {
          "provider": "sevenrooms",
          "endpoint": "https://mcp.sevenrooms.com",
          "entity_id": "rest-123",
          "capabilities": ["reservations", "availability"],
          "verification": {
            "level": 2,
            "method": "dual_attestation"
          }
        }
      ],
      "pending_providers": [
        {
          "provider_domain": "thefork.com",
          "provider": "thefork",
          "capabilities": ["reservations"]
        }
      ]
    }
  ]
}`}
      </CodeBlock>

      <h3>Response Fields</h3>

      <table className="w-full my-4 text-sm">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-2 text-zinc-400">Field</th>
            <th className="text-left py-2 text-zinc-400">Type</th>
            <th className="text-left py-2 text-zinc-400">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">entities[].mcps</td>
            <td className="py-2">array</td>
            <td className="py-2 text-zinc-400">Active MCP endpoints for this entity</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">entities[].pending_providers</td>
            <td className="py-2">array</td>
            <td className="py-2 text-zinc-400">Providers detected but not registered with Dock AI</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">mcps[].entity_id</td>
            <td className="py-2">string</td>
            <td className="py-2 text-zinc-400">Entity&apos;s identifier at the provider (use when calling MCP)</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">mcps[].verification.level</td>
            <td className="py-2">number</td>
            <td className="py-2 text-zinc-400">0 = provider claim, 1 = entity claim, 2 = dual attestation</td>
          </tr>
        </tbody>
      </table>

      <h3>Errors</h3>

      <CodeBlock className="my-4">
{`// 404 Not Found
{
  "error": "Entity not found",
  "domain": "unknown-domain.com"
}

// 429 Too Many Requests
{
  "error": "Rate limit exceeded. Try again in 60 seconds."
}

// 500 Internal Server Error
{
  "error": "Internal server error"
}`}
      </CodeBlock>

      {/* Submit Domain */}
      <h2 id="submit-domain">POST /v1/submit</h2>

      <p>
        Submit a domain to crawl its Entity Card. Dock AI will fetch the Entity Card from
        <code>/.well-known/entity-card.json</code> and index the entities.
      </p>

      <h3>Request</h3>

      <CodeBlock className="my-4">
{`POST /v1/submit
Content-Type: application/json

{
  "domain": "example-restaurant.com"
}`}
      </CodeBlock>

      <h3>Response</h3>

      <CodeBlock className="my-4">
{`// 200 OK
{
  "success": true,
  "domain": "example-restaurant.com",
  "entity": {
    "id": "uuid",
    "name": "Example Restaurant",
    "verification_level": 1
  },
  "mcps_count": 2
}

// 200 OK (already indexed)
{
  "success": true,
  "domain": "example-restaurant.com",
  "entity": {
    "id": "uuid",
    "name": "Example Restaurant",
    "verification_level": 2
  },
  "mcps_count": 2,
  "message": "Entity already indexed, updated"
}`}
      </CodeBlock>

      <h3>Errors</h3>

      <CodeBlock className="my-4">
{`// 400 Bad Request
{
  "error": "Invalid request",
  "details": { "domain": ["Required"] }
}

// 400 Bad Request (no entity card)
{
  "error": "No entity card found at https://example.com/.well-known/entity-card.json"
}

// 400 Bad Request (domain mismatch)
{
  "error": "Domain mismatch: card declares \\"other.com\\" but hosted on \\"example.com\\""
}

// 429 Too Many Requests
{
  "error": "Rate limit exceeded. Try again in 60 seconds."
}`}
      </CodeBlock>

      {/* Provider Registration */}
      <h2 id="provider-register">POST /v1/providers/register</h2>

      <p>
        Register or update entities as an MCP provider. Requires authentication via API key.
        Supports bulk operations (up to 1000 per request).
      </p>

      <h3>Authentication</h3>

      <CodeBlock className="my-4">
{`Authorization: Bearer sk_live_xxxxx`}
      </CodeBlock>

      <p className="text-zinc-400 text-sm">
        API keys are issued after provider verification. Contact us to register as a provider.
      </p>

      <h3>Request</h3>

      <CodeBlock className="my-4">
{`POST /v1/providers/register
Authorization: Bearer sk_live_xxxxx
Content-Type: application/json

{
  "operations": [
    {
      "action": "upsert",
      "entity": {
        "entity_id": "venue-123",
        "domain": "example-restaurant.com",
        "path": "/paris",
        "name": "Example Restaurant Paris",
        "category": "restaurant",
        "location": {
          "city": "Paris",
          "country": "FR",
          "coordinates": { "lat": 48.8566, "lng": 2.3522 }
        },
        "capabilities": ["reservations", "availability"]
      }
    },
    {
      "action": "delete",
      "entity_id": "old-venue-456"
    }
  ]
}`}
      </CodeBlock>

      <h3>Operations</h3>

      <table className="w-full my-4 text-sm">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-2 text-zinc-400">Action</th>
            <th className="text-left py-2 text-zinc-400">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">upsert</td>
            <td className="py-2 text-zinc-400">Create or update an entity. If domain matches existing entities, links to them.</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">delete</td>
            <td className="py-2 text-zinc-400">Remove an entity by entity_id. Only removes your MCP endpoint, not the entity itself.</td>
          </tr>
        </tbody>
      </table>

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
            <td className="py-2 text-zinc-400">Your internal identifier for this entity</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">name</td>
            <td className="py-2">Yes</td>
            <td className="py-2 text-zinc-400">Display name of the entity</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">domain</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">Entity&apos;s website domain. If omitted, creates provider-only entity.</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">path</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">Path within domain (e.g., /paris). If omitted with domain, matches all entities.</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">category</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">Entity category (e.g., restaurant, hotel)</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">location</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">Geographic location (city, country, coordinates)</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">capabilities</td>
            <td className="py-2">No</td>
            <td className="py-2 text-zinc-400">What your MCP can do (e.g., reservations, ordering)</td>
          </tr>
        </tbody>
      </table>

      <h3>Response</h3>

      <CodeBlock className="my-4">
{`// 200 OK
{
  "success": true,
  "provider": "sevenrooms",
  "results": {
    "total": 2,
    "created": 1,
    "updated": 0,
    "deleted": 1,
    "errors": 0
  }
}

// 200 OK (with errors)
{
  "success": false,
  "provider": "sevenrooms",
  "results": {
    "total": 3,
    "created": 1,
    "updated": 1,
    "deleted": 0,
    "errors": 1
  },
  "errors": [
    {
      "entity_id": "bad-venue",
      "error": "Invalid location coordinates"
    }
  ]
}`}
      </CodeBlock>

      <h3>Errors</h3>

      <CodeBlock className="my-4">
{`// 401 Unauthorized
{
  "error": "Missing or invalid Authorization header. Use: Bearer <api_key>"
}

// 401 Unauthorized
{
  "error": "Invalid API key or provider not verified"
}

// 400 Bad Request
{
  "error": "Invalid request",
  "details": { "operations": ["Required"] }
}

// 429 Too Many Requests
{
  "error": "Rate limit exceeded. Try again in 60 seconds."
}`}
      </CodeBlock>

      {/* Capabilities */}
      <h2 id="capabilities">Standard Capabilities</h2>

      <p>
        Capabilities describe what actions are possible via an MCP. Use these standard values
        for interoperability.
      </p>

      <table className="w-full my-4 text-sm">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-2 text-zinc-400">Category</th>
            <th className="text-left py-2 text-zinc-400">Capabilities</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-zinc-800">
            <td className="py-2">Booking</td>
            <td className="py-2 font-mono text-teal-400">reservations, availability, cancellation</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2">Commerce</td>
            <td className="py-2 font-mono text-teal-400">ordering, payments, catalog</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2">Information</td>
            <td className="py-2 font-mono text-teal-400">menu, hours, contact</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2">Communication</td>
            <td className="py-2 font-mono text-teal-400">messaging, notifications</td>
          </tr>
        </tbody>
      </table>

      <p className="text-zinc-400 text-sm">
        Custom capabilities can use namespaced format: <code>provider:capability</code>
      </p>
    </div>
  )
}
