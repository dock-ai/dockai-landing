'use client'

import { useState } from 'react'
import { Plus, Trash2, Copy, Download, ChevronDown, ChevronUp } from 'lucide-react'

// Capabilities from the EDP spec
const CAPABILITIES = {
  'Booking & Scheduling': ['reservations', 'availability', 'cancellation'],
  'Commerce': ['ordering', 'payments', 'catalog'],
  'Information': ['menu', 'hours', 'contact'],
  'Communication': ['messaging', 'notifications'],
}

interface Verification {
  method: 'signed_jwt' | 'none' | ''
  signature: string
  issued_at: string
  expires_at: string
}

interface McpEntry {
  id: string
  provider: string
  endpoint: string
  entity_id: string
  capabilities: string[]
  priority: number
  verification: Verification
}

interface Location {
  city: string
  country: string
  lat: string
  lng: string
}

interface Entity {
  id: string
  name: string
  path: string
  location: Location
  mcps: McpEntry[]
  expanded: boolean
}

const createEmptyMcp = (): McpEntry => ({
  id: crypto.randomUUID(),
  provider: '',
  endpoint: '',
  entity_id: '',
  capabilities: [],
  priority: 0,
  verification: {
    method: '',
    signature: '',
    issued_at: '',
    expires_at: '',
  },
})

const createEmptyEntity = (): Entity => ({
  id: crypto.randomUUID(),
  name: '',
  path: '',
  location: { city: '', country: '', lat: '', lng: '' },
  mcps: [createEmptyMcp()],
  expanded: true,
})

export function EntityCardGenerator() {
  const [domain, setDomain] = useState('')
  const [entities, setEntities] = useState<Entity[]>([createEmptyEntity()])
  const [copied, setCopied] = useState(false)

  const addEntity = () => {
    setEntities([...entities, createEmptyEntity()])
  }

  const removeEntity = (entityId: string) => {
    if (entities.length > 1) {
      setEntities(entities.filter(e => e.id !== entityId))
    }
  }

  const toggleEntity = (entityId: string) => {
    setEntities(entities.map(e =>
      e.id === entityId ? { ...e, expanded: !e.expanded } : e
    ))
  }

  const updateEntity = (entityId: string, updates: Partial<Entity>) => {
    setEntities(entities.map(e =>
      e.id === entityId ? { ...e, ...updates } : e
    ))
  }

  const updateEntityLocation = (entityId: string, updates: Partial<Location>) => {
    setEntities(entities.map(e =>
      e.id === entityId ? { ...e, location: { ...e.location, ...updates } } : e
    ))
  }

  const addMcp = (entityId: string) => {
    setEntities(entities.map(e =>
      e.id === entityId ? { ...e, mcps: [...e.mcps, createEmptyMcp()] } : e
    ))
  }

  const removeMcp = (entityId: string, mcpId: string) => {
    setEntities(entities.map(e => {
      if (e.id !== entityId) return e
      if (e.mcps.length <= 1) return e
      return { ...e, mcps: e.mcps.filter(m => m.id !== mcpId) }
    }))
  }

  const updateMcp = (entityId: string, mcpId: string, updates: Partial<McpEntry>) => {
    setEntities(entities.map(e => {
      if (e.id !== entityId) return e
      return {
        ...e,
        mcps: e.mcps.map(m => m.id === mcpId ? { ...m, ...updates } : m)
      }
    }))
  }

  const updateMcpVerification = (entityId: string, mcpId: string, updates: Partial<Verification>) => {
    setEntities(entities.map(e => {
      if (e.id !== entityId) return e
      return {
        ...e,
        mcps: e.mcps.map(m =>
          m.id === mcpId ? { ...m, verification: { ...m.verification, ...updates } } : m
        )
      }
    }))
  }

  const toggleCapability = (entityId: string, mcpId: string, capability: string) => {
    setEntities(entities.map(e => {
      if (e.id !== entityId) return e
      return {
        ...e,
        mcps: e.mcps.map(m => {
          if (m.id !== mcpId) return m
          const caps = m.capabilities.includes(capability)
            ? m.capabilities.filter(c => c !== capability)
            : [...m.capabilities, capability]
          return { ...m, capabilities: caps }
        })
      }
    }))
  }

  // Generate clean JSON output
  const generateJson = () => {
    const card: Record<string, unknown> = {
      schema_version: '0.2.0',
      domain: domain || 'example.com',
      entities: entities.map(e => {
        const entity: Record<string, unknown> = {
          name: e.name || 'My Entity',
        }

        // Only add path if provided
        if (e.path) {
          entity.path = e.path.startsWith('/') ? e.path : `/${e.path}`
        }

        // Only add location if any field is filled
        const hasLocation = e.location.city || e.location.country ||
          (e.location.lat && e.location.lng)
        if (hasLocation) {
          const location: Record<string, unknown> = {}
          if (e.location.city) location.city = e.location.city
          if (e.location.country) location.country = e.location.country.toUpperCase()
          if (e.location.lat && e.location.lng) {
            location.coordinates = {
              lat: parseFloat(e.location.lat),
              lng: parseFloat(e.location.lng),
            }
          }
          entity.location = location
        }

        entity.mcps = e.mcps.map(m => {
          const mcp: Record<string, unknown> = {
            provider: m.provider || 'provider-name',
            endpoint: m.endpoint || 'https://mcp.provider.com',
          }

          if (m.entity_id) mcp.entity_id = m.entity_id
          if (m.capabilities.length > 0) mcp.capabilities = m.capabilities
          if (m.priority !== 0) mcp.priority = m.priority

          // Only add verification if method is set
          if (m.verification.method && m.verification.method !== 'none') {
            const verification: Record<string, unknown> = {
              method: m.verification.method,
            }
            if (m.verification.signature) verification.signature = m.verification.signature
            if (m.verification.issued_at) verification.issued_at = m.verification.issued_at
            if (m.verification.expires_at) verification.expires_at = m.verification.expires_at
            mcp.verification = verification
          }

          return mcp
        })

        return entity
      })
    }

    return JSON.stringify(card, null, 2)
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generateJson())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadJson = () => {
    const blob = new Blob([generateJson()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'entity-card.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Domain */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Domain <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={domain}
          onChange={e => setDomain(e.target.value)}
          placeholder="example-restaurant.com"
          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg focus:border-teal-500 focus:outline-none"
        />
        <p className="text-xs text-zinc-500 mt-1">
          Must match where the file is hosted
        </p>
      </div>

      {/* Entities */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-zinc-300">
            Entities
          </label>
          <button
            onClick={addEntity}
            className="flex items-center gap-1 text-sm text-teal-400 hover:text-teal-300"
          >
            <Plus size={16} /> Add Entity
          </button>
        </div>

        <div className="space-y-4">
          {entities.map((entity, entityIndex) => (
            <div
              key={entity.id}
              className="border border-zinc-700 rounded-lg overflow-hidden"
            >
              {/* Entity Header */}
              <div
                className="flex items-center justify-between px-4 py-3 bg-zinc-800/50 cursor-pointer"
                onClick={() => toggleEntity(entity.id)}
              >
                <div className="flex items-center gap-2">
                  {entity.expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  <span className="font-medium">
                    {entity.name || `Entity ${entityIndex + 1}`}
                  </span>
                  {entity.path && (
                    <span className="text-xs text-zinc-500">{entity.path}</span>
                  )}
                </div>
                {entities.length > 1 && (
                  <button
                    onClick={e => { e.stopPropagation(); removeEntity(entity.id) }}
                    className="p-1 text-zinc-500 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              {/* Entity Body */}
              {entity.expanded && (
                <div className="p-4 space-y-4">
                  {/* Entity Name & Path */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={entity.name}
                        onChange={e => updateEntity(entity.id, { name: e.target.value })}
                        placeholder="My Restaurant"
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm focus:border-teal-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Path</label>
                      <input
                        type="text"
                        value={entity.path}
                        onChange={e => updateEntity(entity.id, { path: e.target.value })}
                        placeholder="/paris (for multi-location)"
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm focus:border-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs text-zinc-400 mb-2">Location (optional)</label>
                    <div className="grid grid-cols-4 gap-3">
                      <input
                        type="text"
                        value={entity.location.city}
                        onChange={e => updateEntityLocation(entity.id, { city: e.target.value })}
                        placeholder="City"
                        className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm focus:border-teal-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={entity.location.country}
                        onChange={e => updateEntityLocation(entity.id, { country: e.target.value })}
                        placeholder="FR"
                        maxLength={2}
                        className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm focus:border-teal-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={entity.location.lat}
                        onChange={e => updateEntityLocation(entity.id, { lat: e.target.value })}
                        placeholder="Latitude"
                        className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm focus:border-teal-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={entity.location.lng}
                        onChange={e => updateEntityLocation(entity.id, { lng: e.target.value })}
                        placeholder="Longitude"
                        className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm focus:border-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* MCPs */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs text-zinc-400">MCP Providers</label>
                      <button
                        onClick={() => addMcp(entity.id)}
                        className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300"
                      >
                        <Plus size={14} /> Add MCP
                      </button>
                    </div>

                    <div className="space-y-3">
                      {entity.mcps.map((mcp, mcpIndex) => (
                        <div
                          key={mcp.id}
                          className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-zinc-500">
                              MCP #{mcpIndex + 1}
                            </span>
                            {entity.mcps.length > 1 && (
                              <button
                                onClick={() => removeMcp(entity.id, mcp.id)}
                                className="p-1 text-zinc-500 hover:text-red-400"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>

                          {/* Provider & Endpoint */}
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs text-zinc-500 mb-1">
                                Provider <span className="text-red-400">*</span>
                              </label>
                              <input
                                type="text"
                                value={mcp.provider}
                                onChange={e => updateMcp(entity.id, mcp.id, { provider: e.target.value })}
                                placeholder="sevenrooms"
                                className="w-full px-2 py-1.5 bg-zinc-900 border border-zinc-700 rounded text-sm focus:border-teal-500 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-zinc-500 mb-1">
                                Endpoint <span className="text-red-400">*</span>
                              </label>
                              <input
                                type="text"
                                value={mcp.endpoint}
                                onChange={e => updateMcp(entity.id, mcp.id, { endpoint: e.target.value })}
                                placeholder="https://mcp.sevenrooms.com"
                                className="w-full px-2 py-1.5 bg-zinc-900 border border-zinc-700 rounded text-sm focus:border-teal-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* Entity ID & Priority */}
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs text-zinc-500 mb-1">Entity ID</label>
                              <input
                                type="text"
                                value={mcp.entity_id}
                                onChange={e => updateMcp(entity.id, mcp.id, { entity_id: e.target.value })}
                                placeholder="rest-123"
                                className="w-full px-2 py-1.5 bg-zinc-900 border border-zinc-700 rounded text-sm focus:border-teal-500 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-zinc-500 mb-1">Priority</label>
                              <input
                                type="number"
                                value={mcp.priority}
                                onChange={e => updateMcp(entity.id, mcp.id, { priority: parseInt(e.target.value) || 0 })}
                                placeholder="0"
                                className="w-full px-2 py-1.5 bg-zinc-900 border border-zinc-700 rounded text-sm focus:border-teal-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* Capabilities */}
                          <div>
                            <label className="block text-xs text-zinc-500 mb-2">Capabilities</label>
                            <div className="space-y-2">
                              {Object.entries(CAPABILITIES).map(([category, caps]) => (
                                <div key={category}>
                                  <span className="text-xs text-zinc-600">{category}</span>
                                  <div className="flex flex-wrap gap-1.5 mt-1">
                                    {caps.map(cap => (
                                      <button
                                        key={cap}
                                        onClick={() => toggleCapability(entity.id, mcp.id, cap)}
                                        className={`px-2 py-0.5 text-xs rounded border transition-colors ${
                                          mcp.capabilities.includes(cap)
                                            ? 'bg-teal-500/20 border-teal-500 text-teal-300'
                                            : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600'
                                        }`}
                                      >
                                        {cap}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Verification */}
                          <div>
                            <label className="block text-xs text-zinc-500 mb-2">
                              Verification (optional - Level 2)
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <select
                                  value={mcp.verification.method}
                                  onChange={e => updateMcpVerification(entity.id, mcp.id, {
                                    method: e.target.value as Verification['method']
                                  })}
                                  className="w-full px-2 py-1.5 bg-zinc-900 border border-zinc-700 rounded text-sm focus:border-teal-500 focus:outline-none"
                                >
                                  <option value="">No verification</option>
                                  <option value="signed_jwt">Signed JWT</option>
                                </select>
                              </div>
                              {mcp.verification.method === 'signed_jwt' && (
                                <>
                                  <input
                                    type="text"
                                    value={mcp.verification.signature}
                                    onChange={e => updateMcpVerification(entity.id, mcp.id, { signature: e.target.value })}
                                    placeholder="eyJhbGciOiJFUzI1NiIs..."
                                    className="w-full px-2 py-1.5 bg-zinc-900 border border-zinc-700 rounded text-sm focus:border-teal-500 focus:outline-none"
                                  />
                                  <input
                                    type="datetime-local"
                                    value={mcp.verification.issued_at ? mcp.verification.issued_at.slice(0, 16) : ''}
                                    onChange={e => updateMcpVerification(entity.id, mcp.id, {
                                      issued_at: e.target.value ? new Date(e.target.value).toISOString() : ''
                                    })}
                                    className="w-full px-2 py-1.5 bg-zinc-900 border border-zinc-700 rounded text-sm focus:border-teal-500 focus:outline-none"
                                  />
                                  <input
                                    type="datetime-local"
                                    value={mcp.verification.expires_at ? mcp.verification.expires_at.slice(0, 16) : ''}
                                    onChange={e => updateMcpVerification(entity.id, mcp.id, {
                                      expires_at: e.target.value ? new Date(e.target.value).toISOString() : ''
                                    })}
                                    className="w-full px-2 py-1.5 bg-zinc-900 border border-zinc-700 rounded text-sm focus:border-teal-500 focus:outline-none"
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* JSON Preview */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-zinc-300">
            Generated Entity Card
          </label>
          <div className="flex gap-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              <Copy size={14} />
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={downloadJson}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-teal-600 hover:bg-teal-500 rounded-lg transition-colors"
            >
              <Download size={14} />
              Download
            </button>
          </div>
        </div>
        <pre className="p-4 bg-zinc-900 border border-zinc-700 rounded-lg overflow-x-auto text-sm">
          <code className="text-zinc-300">{generateJson()}</code>
        </pre>
      </div>

      {/* Instructions */}
      <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
        <h4 className="font-medium text-zinc-200 mb-2">Next Steps</h4>
        <ol className="list-decimal list-inside text-sm text-zinc-400 space-y-1">
          <li>Download or copy the generated JSON</li>
          <li>Save it as <code className="text-teal-400">.well-known/entity-card.json</code> on your domain</li>
          <li>Verify it&apos;s accessible at <code className="text-teal-400">https://{domain || 'your-domain.com'}/.well-known/entity-card.json</code></li>
          <li><a href="/docs/submit" className="text-teal-400 hover:underline">Submit your domain</a> to index it in the registry</li>
        </ol>
      </div>
    </div>
  )
}
