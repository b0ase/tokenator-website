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
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gray-950 antialiased">
        <div className="relative">
          {/* Background gradient */}
          <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
          
          {/* Subtle grid pattern */}
          <div className="fixed inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }} />
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <Navigation />
            <main className="min-h-[calc(100vh-64px)]">
              {children}
            </main>
            
            {/* Footer */}
            <footer className="border-t border-gray-800 py-8 px-4 mt-20">
              <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
                <p>© 2024 Tokenator. Built with Next.js and BSV.</p>
                <p className="mt-2">
                  Secure token management with automatic change output protection.
                </p>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  )
}