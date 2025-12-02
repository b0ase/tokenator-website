'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [address, setAddress] = useState('')

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-4">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-10 opacity-50">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="px-4 py-1.5 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-sm font-medium">
              BSV Token Infrastructure
            </span>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black mb-6 tracking-tight">
            <span className="text-white">Token</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">ator</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            The most reliable way to deploy and manage BSV tokens. 
            <span className="text-white font-normal"> Zero burns. Zero mistakes.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/deploy"
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105"
            >
              <span className="relative z-10">Start Building</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            
            <Link
              href="/portfolio"
              className="px-8 py-4 font-bold rounded-full border-2 border-white/20 hover:bg-white/10 backdrop-blur-lg transition-all"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl font-black text-white mb-2">100%</div>
            <div className="text-gray-400">Safe Transactions</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black text-white mb-2">0</div>
            <div className="text-gray-400">Tokens Burned</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black text-white mb-2">24/7</div>
            <div className="text-gray-400">Always Available</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <div className="text-sm font-bold text-cyan-400 mb-4">DEPLOYMENT</div>
              <h2 className="text-5xl font-black text-white mb-6">
                Launch tokens in seconds
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Support for BSV-21 and BRC-100 protocols. Set your parameters, sign, and deploy. That simple.
              </p>
              <Link href="/deploy" className="inline-flex items-center text-cyan-400 font-bold hover:gap-4 gap-2 transition-all">
                Deploy Now <span>→</span>
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <div className="space-y-4">
                  <div className="h-4 bg-white/10 rounded w-3/4"></div>
                  <div className="h-4 bg-white/10 rounded w-1/2"></div>
                  <div className="h-4 bg-white/10 rounded w-5/6"></div>
                  <div className="h-12 bg-cyan-500/30 rounded-lg mt-8"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div className="order-2 md:order-1">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <div className="space-y-4">
                  <div className="h-4 bg-white/10 rounded w-2/3"></div>
                  <div className="h-4 bg-white/10 rounded w-3/4"></div>
                  <div className="h-4 bg-white/10 rounded w-1/2"></div>
                  <div className="h-12 bg-purple-500/30 rounded-lg mt-8"></div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="text-sm font-bold text-purple-400 mb-4">MINTING</div>
              <h2 className="text-5xl font-black text-white mb-6">
                Generate supply safely
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Mint your exact supply with confidence. Our system ensures every token is accounted for.
              </p>
              <Link href="/mint" className="inline-flex items-center text-purple-400 font-bold hover:gap-4 gap-2 transition-all">
                Start Minting <span>→</span>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-sm font-bold text-green-400 mb-4">TRANSFERS</div>
              <h2 className="text-5xl font-black text-white mb-6">
                Automatic change outputs
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Every transfer includes proper change outputs. Your tokens are always safe, always accounted for.
              </p>
              <Link href="/transfer" className="inline-flex items-center text-green-400 font-bold hover:gap-4 gap-2 transition-all">
                Transfer Tokens <span>→</span>
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <div className="space-y-4">
                  <div className="h-4 bg-white/10 rounded w-5/6"></div>
                  <div className="h-4 bg-white/10 rounded w-2/3"></div>
                  <div className="h-4 bg-white/10 rounded w-3/4"></div>
                  <div className="h-12 bg-green-500/30 rounded-lg mt-8"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            Ready to build?
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Join developers who trust Tokenator for their BSV token infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/deploy"
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold rounded-full hover:scale-105 transition-all"
            >
              Get Started Free
            </Link>
            <a
              href="https://github.com/b0ase/tokenator-website"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 font-bold rounded-full border-2 border-white/20 hover:bg-white/10 transition-all"
            >
              View Source Code
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}