import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend lazily to avoid build errors
let resend: Resend | null = null
function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

function buildEmailContent(type: string, data: Record<string, string>) {
  switch (type) {
    case 'expert-application':
      return {
        subject: `[Dock AI] Expert Application: ${data.company || data.name}`,
        html: `
          <h2>New Expert Application</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Company:</strong> ${data.company}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.website ? `<p><strong>Website:</strong> ${data.website}</p>` : ''}
          <p><strong>Experience:</strong></p>
          <p>${(data.experience || '').replace(/\n/g, '<br>')}</p>
        `,
      }
    case 'project-inquiry':
      return {
        subject: `[Dock AI] Project Inquiry: ${data.company || data.name}`,
        html: `
          <h2>New Project Inquiry</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Project Description:</strong></p>
          <p>${(data.description || '').replace(/\n/g, '<br>')}</p>
        `,
      }
    default:
      return {
        subject: `[Dock AI] Provider Contact: ${data.company || data.name}`,
        html: `
          <h2>New Provider Contact</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
          ${data.mcpEndpoint ? `<p><strong>MCP Endpoint:</strong> ${data.mcpEndpoint}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${(data.message || '').replace(/\n/g, '<br>')}</p>
        `,
      }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, name, email, ...rest } = body

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const resendClient = getResend()
    if (!resendClient) {
      console.error('Resend API key not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    const { subject, html } = buildEmailContent(type, { name, email, ...rest })

    const { error } = await resendClient.emails.send({
      from: 'Dock AI <noreply@dockai.co>',
      to: ['yoann@dockai.co'],
      replyTo: email,
      subject,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
