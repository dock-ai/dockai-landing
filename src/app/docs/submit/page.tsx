'use client'

import { CodeBlock } from '@/components/ui/code-block'

const requestExample = `{
  "domain": "yourdomain.com"
}`

const responseExample = `{
  "success": true,
  "entity": {
    "domain": "yourdomain.com",
    "verification_level": 1,
    "mcps_count": 2
  }
}`

const curlExample = `curl -X POST https://api.dockai.co/v1/submit \\
  -H "Content-Type: application/json" \\
  -d '{"domain": "yourdomain.com"}'`

export default function SubmitPage() {
  return (
    <div>
      <h1>Submit Domain</h1>

      <p className="text-lg text-zinc-400 mt-4">
        After hosting your Entity Card, submit your domain to index it in the registry.
      </p>

      <h2>How It Works</h2>

      <ol className="list-decimal list-inside space-y-2 my-4">
        <li>Host your Entity Card at <code>/.well-known/entity-card.json</code></li>
        <li>Submit your domain to Dock AI</li>
        <li>We crawl and validate your Entity Card</li>
        <li>Your entity is now discoverable by AI agents</li>
      </ol>

      <h2>API Endpoint</h2>

      <CodeBlock className="my-4">POST https://api.dockai.co/v1/submit</CodeBlock>

      <h3>Request</h3>

      <CodeBlock className="my-4">{requestExample}</CodeBlock>

      <h3>Response</h3>

      <CodeBlock className="my-4">{responseExample}</CodeBlock>

      <h2>Verification Level</h2>

      <p>
        After submission, your entity will have:
      </p>

      <ul className="list-disc list-inside space-y-2 my-4">
        <li>
          <strong>Level 1</strong> if only the Entity Card exists
        </li>
        <li>
          <strong>Level 2</strong> if an MCP provider has also registered you with a matching endpoint
        </li>
      </ul>

      <h2>Re-Indexing</h2>

      <p>
        Submit your domain again anytime to update your Entity Card in the registry. We&apos;ll crawl
        the latest version and update your entry.
      </p>

      <h2>Error Responses</h2>

      <table className="w-full my-4 text-sm">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-2 text-zinc-400">Error</th>
            <th className="text-left py-2 text-zinc-400">Cause</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">Entity Card not found</td>
            <td className="py-2 text-zinc-400">No file at /.well-known/entity-card.json</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">Invalid Entity Card format</td>
            <td className="py-2 text-zinc-400">JSON doesn&apos;t match the schema</td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="py-2 font-mono">Domain mismatch</td>
            <td className="py-2 text-zinc-400">domain field doesn&apos;t match submitted domain</td>
          </tr>
        </tbody>
      </table>

      <h2>Rate Limits</h2>

      <p>
        The submit endpoint is rate-limited to <strong>10 requests per minute</strong> per IP address.
      </p>

      <h2>cURL Example</h2>

      <CodeBlock className="my-4">{curlExample}</CodeBlock>
    </div>
  )
}
