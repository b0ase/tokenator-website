'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [address, setAddress] = useState('')

  const features = [
    {
      title: 'Token Deployment',
      description: 'Create BSV-21 and BRC-100 tokens with confidence',
      icon: '🚀',
      href: '/deploy',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Mint Supply',
      description: 'Generate token supply with secure transactions',
      icon: '⚡',
      href: '/mint',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Safe Transfer',
      description: 'Automatic change outputs prevent token loss',
      icon: '🔒',
      href: '/transfer',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-dark opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Tokenator
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
              Professional BSV Token Management Platform
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Deploy, mint, and transfer tokens with enterprise-grade security and automatic change output protection
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/deploy"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold text-white hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Get Started
              </Link>
              <a
                href="https://github.com/b0ase/tokenator-website"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gray-800 border border-gray-700 rounded-lg font-semibold text-white hover:bg-gray-700 transition-all"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Core Features</h2>
            <p className="text-gray-400 text-lg">Everything you need for professional token management</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Link key={feature.href} href={feature.href}>
                <div className="group relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 p-8 hover:border-gray-700 transition-all hover:shadow-2xl">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  <div className="relative">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="glass-dark rounded-2xl p-8 lg:p-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-center">Quick Actions</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">
                  Check Your Portfolio
                </label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your BSV address..."
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Link
                    href={`/portfolio?address=${address}`}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold text-white hover:shadow-lg transition-all"
                  >
                    View Portfolio
                  </Link>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <Link href="/tools/wif" className="text-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all">
                  <div className="text-2xl mb-2">🔑</div>
                  <div className="text-sm">WIF Converter</div>
                </Link>
                <Link href="/deploy" className="text-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all">
                  <div className="text-2xl mb-2">📝</div>
                  <div className="text-sm">Deploy Token</div>
                </Link>
                <Link href="/mint" className="text-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-sm">Mint Tokens</div>
                </Link>
                <Link href="/transfer" className="text-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all">
                  <div className="text-2xl mb-2">💸</div>
                  <div className="text-sm">Transfer</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Notice */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-green-400 text-sm font-medium">Secure by Design</span>
          </div>
          
          <h2 className="text-2xl lg:text-3xl font-bold mb-6">
            Never Lose Tokens Again
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our safe transaction builder automatically creates change outputs for every transfer, 
            preventing accidental token burns. Built with security and reliability at its core.
          </p>
        </div>
      </section>
    </div>
  )
}