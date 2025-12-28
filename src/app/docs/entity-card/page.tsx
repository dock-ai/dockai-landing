export const metadata = {
  title: 'Entity Card - Dock AI',
  description: 'Learn how to create and host an Entity Card for your business.',
}

export default function EntityCardPage() {
  return (
    <div>
      <h1>Entity Card</h1>

      <p className="text-lg text-zinc-400 mt-4">
        An Entity Card is a JSON file that declares which MCP providers can interact with your business.
      </p>

      <h2>File Location</h2>

      <p>
        Host your Entity Card at the well-known path:
      </p>

      <pre className="my-4"><code>https://yourdomain.com/.well-known/entity-card.json</code></pre>

      <h2>Schema</h2>

      <pre className="my-4"><code>{`{
  "schema_version": "0.1.0",
  "domain": "yourdomain.com",
  "mcps": [
    {
      "provider": "provider-name",
      "endpoint": "https://mcp.provider.com",
      "entity_id": "your-id-at-provider",
      "capabilities": ["reservations", "availability"],
      "priority": 10
    }
  ]
}`}</code></pre>

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
            <td className="py-2 text-zinc-400">Must be &quot;0.1.0&quot;</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">domain</td>
            <td className="py-2">string</td>
            <td className="py-2">Yes</td>
            <td className="py-2 text-zinc-400">Your domain (must match where file is hosted)</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">mcps</td>
            <td className="py-2">array</td>
            <td className="py-2">Yes</td>
            <td className="py-2 text-zinc-400">List of MCP providers</td>
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

      <pre className="my-4"><code>{`{
  "mcps": [
    {
      "provider": "preferred-provider",
      "endpoint": "https://mcp.preferred.com",
      "priority": 10
    },
    {
      "provider": "backup-provider",
      "endpoint": "https://mcp.backup.com",
      "priority": 5
    }
  ]
}`}</code></pre>

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
