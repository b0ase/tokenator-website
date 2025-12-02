import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Tokenator - Professional BSV Token Management',
  description: 'Deploy, mint, and transfer BSV tokens with enterprise-grade security and automatic change output protection',
  keywords: 'BSV, tokens, blockchain, BSV-21, BRC-100, token management, cryptocurrency',
  authors: [{ name: 'Tokenator Team' }],
  openGraph: {
    title: 'Tokenator - Professional BSV Token Management',
    description: 'Deploy, mint, and transfer BSV tokens with enterprise-grade security',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ 
        minHeight: '100vh', 
        background: '#fff', 
        color: '#000', 
        margin: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}