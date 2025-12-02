'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Hero */}
      <div style={{ padding: '120px 20px', textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '80px', fontWeight: '900', marginBottom: '20px', letterSpacing: '-2px' }}>
          Tokenator
        </h1>
        <p style={{ fontSize: '24px', color: '#888', marginBottom: '40px', lineHeight: '1.4' }}>
          Deploy and manage BSV tokens without burning them
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/deploy" style={{
            padding: '16px 32px',
            background: '#fff',
            color: '#000',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '18px'
          }}>
            Start Building
          </Link>
          <Link href="/portfolio" style={{
            padding: '16px 32px',
            background: 'transparent',
            color: '#fff',
            textDecoration: 'none',
            border: '2px solid #333',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '18px'
          }}>
            View Portfolio
          </Link>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          
          <div style={{ padding: '40px', background: '#111', borderRadius: '12px' }}>
            <h2 style={{ fontSize: '28px', marginBottom: '16px', fontWeight: 'bold' }}>Deploy Tokens</h2>
            <p style={{ color: '#888', marginBottom: '20px', lineHeight: '1.6' }}>
              Create BSV-21 and BRC-100 tokens with just a few clicks. Set your parameters and deploy instantly.
            </p>
            <Link href="/deploy" style={{ color: '#0ea5e9', textDecoration: 'none', fontWeight: 'bold' }}>
              Deploy Now →
            </Link>
          </div>

          <div style={{ padding: '40px', background: '#111', borderRadius: '12px' }}>
            <h2 style={{ fontSize: '28px', marginBottom: '16px', fontWeight: 'bold' }}>Mint Supply</h2>
            <p style={{ color: '#888', marginBottom: '20px', lineHeight: '1.6' }}>
              Generate your token supply safely. Every token is accounted for with proper validation.
            </p>
            <Link href="/mint" style={{ color: '#a855f7', textDecoration: 'none', fontWeight: 'bold' }}>
              Start Minting →
            </Link>
          </div>

          <div style={{ padding: '40px', background: '#111', borderRadius: '12px' }}>
            <h2 style={{ fontSize: '28px', marginBottom: '16px', fontWeight: 'bold' }}>Safe Transfers</h2>
            <p style={{ color: '#888', marginBottom: '20px', lineHeight: '1.6' }}>
              Every transfer includes automatic change outputs. Your tokens are always protected.
            </p>
            <Link href="/transfer" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 'bold' }}>
              Transfer Tokens →
            </Link>
          </div>

        </div>
      </div>

      {/* Tools */}
      <div style={{ padding: '80px 20px', background: '#111', textAlign: 'center' }}>
        <h2 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>Essential Tools</h2>
        <p style={{ fontSize: '20px', color: '#888', marginBottom: '40px' }}>
          Everything you need in one place
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/tools/wif" style={{
            padding: '20px 40px',
            background: '#222',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '8px',
            display: 'inline-block'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔑</div>
            <div>WIF Converter</div>
          </Link>
          <Link href="/portfolio" style={{
            padding: '20px 40px',
            background: '#222',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '8px',
            display: 'inline-block'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📊</div>
            <div>Portfolio Checker</div>
          </Link>
          <a href="https://github.com/b0ase/tokenator-website" target="_blank" rel="noopener noreferrer" style={{
            padding: '20px 40px',
            background: '#222',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '8px',
            display: 'inline-block'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>💻</div>
            <div>Source Code</div>
          </a>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '120px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '56px', fontWeight: 'bold', marginBottom: '20px' }}>
          Ready to start?
        </h2>
        <p style={{ fontSize: '20px', color: '#888', marginBottom: '40px' }}>
          Join developers building on BSV
        </p>
        <Link href="/deploy" style={{
          padding: '20px 40px',
          background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '20px',
          display: 'inline-block'
        }}>
          Get Started Free
        </Link>
      </div>
    </div>
  )
}