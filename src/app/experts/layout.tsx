import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MCP Experts & Agencies | Find MCP Developers & Builders | Dock AI',
  description: 'Find certified MCP developers, agencies, and freelancers to build custom Model Context Protocol connectors. Hire experts for Shopify MCP, booking systems, and AI integrations.',
  keywords: [
    'MCP developer',
    'MCP agency',
    'MCP builder',
    'MCP freelance',
    'MCP development',
    'Model Context Protocol developer',
    'hire MCP expert',
    'MCP consultant',
    'custom MCP connector',
    'AI integration developer',
    'MCP integration agency',
  ],
  openGraph: {
    title: 'MCP Experts & Agencies | Find MCP Developers | Dock AI',
    description: 'Find certified MCP developers, agencies, and freelancers to build custom Model Context Protocol connectors for your business.',
    url: 'https://dockai.co/experts',
    siteName: 'Dock AI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MCP Experts & Agencies | Find MCP Developers | Dock AI',
    description: 'Find certified MCP developers, agencies, and freelancers to build custom Model Context Protocol connectors.',
  },
  alternates: {
    canonical: 'https://dockai.co/experts',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MCP Development Services',
  description: 'Find certified MCP developers, agencies, and freelancers to build custom Model Context Protocol connectors.',
  provider: {
    '@type': 'Organization',
    name: 'Dock AI',
    url: 'https://dockai.co',
  },
  serviceType: ['MCP Development', 'AI Integration', 'Custom Connector Development'],
  areaServed: 'Worldwide',
  url: 'https://dockai.co/experts',
}

export default function ExpertsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
