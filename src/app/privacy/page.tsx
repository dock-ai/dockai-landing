import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy - Dock AI',
  description: 'Privacy policy for Dock AI registry and MCP server.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl">
      <h1>Privacy Policy</h1>

      <p className="text-zinc-400 text-sm mb-8">Last updated: January 2025</p>

      <p>
        Dock AI (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the Dock AI registry and MCP server.
        This page informs you of our policies regarding the collection, use, and disclosure of data
        when you use our services.
      </p>

      <h2>What We Collect</h2>

      <p>
        When you or an AI agent queries our API or MCP server, we receive:
      </p>

      <ul className="list-disc pl-6 space-y-2 my-4">
        <li>The domain name being resolved (e.g., &quot;example-restaurant.com&quot;)</li>
        <li>Standard HTTP request metadata (IP address, user agent, timestamp)</li>
      </ul>

      <p>
        We do <strong>not</strong> collect:
      </p>

      <ul className="list-disc pl-6 space-y-2 my-4">
        <li>Personal information about end users</li>
        <li>Conversation content between users and AI agents</li>
        <li>Any data from the MCP servers you connect to after resolution</li>
      </ul>

      <h2>How We Use Data</h2>

      <p>
        Query data is used solely to:
      </p>

      <ul className="list-disc pl-6 space-y-2 my-4">
        <li>Resolve domains to their MCP endpoints</li>
        <li>Rate limiting to prevent abuse</li>
        <li>Aggregate analytics (total query counts, popular domains)</li>
        <li>Improve our service</li>
      </ul>

      <h2>Data Retention</h2>

      <p>
        We do not permanently store individual query logs. Rate limiting data is ephemeral
        and automatically expires. Aggregate statistics are anonymized and cannot be traced
        back to individual users or requests.
      </p>

      <h2>Third-Party Services</h2>

      <p>
        Our service helps you discover MCP endpoints operated by third-party providers.
        Once you connect to those endpoints, their respective privacy policies apply.
        We are not responsible for the privacy practices of third-party MCP providers.
      </p>

      <h2>Data Security</h2>

      <p>
        All communication with our API and MCP server is encrypted via HTTPS/TLS.
        We implement industry-standard security measures to protect our infrastructure.
      </p>

      <h2>Changes to This Policy</h2>

      <p>
        We may update this privacy policy from time to time. We will notify you of any changes
        by posting the new policy on this page and updating the &quot;Last updated&quot; date.
      </p>

      <h2>Contact Us</h2>

      <p>
        If you have any questions about this privacy policy, please contact us:
      </p>

      <ul className="list-disc pl-6 space-y-2 my-4">
        <li>Email: <a href="mailto:support@dockai.co" className="text-teal-400 hover:underline">support@dockai.co</a></li>
        <li>GitHub: <Link href="https://github.com/dock-ai/mcp/issues" className="text-teal-400 hover:underline">dock-ai/mcp</Link></li>
      </ul>
    </div>
  )
}
