'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [address, setAddress] = useState('')

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-4">
          Tokenator
        </h1>
        <p className="text-xl text-gray-400">
          The safe way to create, mint, and transfer BSV tokens
        </p>
        <p className="text-sm text-red-400 mt-2">
          With automatic change outputs - never burn tokens again!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Link href="/deploy" className="group">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-green-500 transition-all">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400">Deploy Token</h3>
            <p className="text-gray-400">Create a new BSV-21 or BRC-100 token</p>
          </div>
        </Link>

        <Link href="/mint" className="group">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-blue-500 transition-all">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400">Mint Tokens</h3>
            <p className="text-gray-400">Generate token supply after deployment</p>
          </div>
        </Link>

        <Link href="/transfer" className="group">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-purple-500 transition-all">
            <div className="text-3xl mb-4">💸</div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400">Transfer</h3>
            <p className="text-gray-400">Send tokens with automatic change outputs</p>
          </div>
        </Link>
      </div>

      <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
        <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Your BSV Address (optional)
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your BSV address to check token balance..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>
          
          {address && (
            <div className="grid grid-cols-2 gap-4">
              <Link href={`/portfolio?address=${address}`} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-center">
                View Portfolio
              </Link>
              <Link href="/tools/wif" className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-center">
                Convert to WIF
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 text-center text-gray-500">
        <p>Built with safety in mind - every transaction includes proper change outputs</p>
        <p className="text-sm mt-2">No more accidentally burning 80% of a token supply 🔥</p>
      </div>
    </div>
  )
}