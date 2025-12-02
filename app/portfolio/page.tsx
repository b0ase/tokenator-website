'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function PortfolioPage() {
  const searchParams = useSearchParams()
  const [address, setAddress] = useState(searchParams.get('address') || '')
  const [utxos, setUtxos] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchUTXOs = async () => {
    if (!address) return

    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`https://api.whatsonchain.com/v1/bsv/main/address/${address}/unspent`)
      const data = await response.json()
      setUtxos(data)
    } catch (err: any) {
      setError('Failed to fetch UTXOs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (address) {
      fetchUTXOs()
    }
  }, [])

  const formatSatoshis = (sats: number) => {
    const bsv = sats / 100000000
    return `${sats.toLocaleString()} sats (${bsv.toFixed(8)} BSV)`
  }

  const copyJson = (utxo: any) => {
    const json = JSON.stringify({
      txId: utxo.tx_hash,
      outputIndex: utxo.tx_pos,
      satoshis: utxo.value
    }, null, 2)
    navigator.clipboard.writeText(json)
    alert('UTXO JSON copied to clipboard')
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Token Portfolio</h1>
      
      <div className="bg-gray-900 rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            BSV Address
          </label>
          <div className="flex space-x-4">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter BSV address..."
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
            />
            <button
              onClick={fetchUTXOs}
              disabled={loading}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg font-semibold transition-colors"
            >
              {loading ? 'Loading...' : 'Check UTXOs'}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {utxos.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Available UTXOs</h2>
            <div className="space-y-4">
              {utxos.map((utxo, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-mono text-sm text-gray-400 mb-2">
                        {utxo.tx_hash}:{utxo.tx_pos}
                      </div>
                      <div className="text-lg font-semibold">
                        {formatSatoshis(utxo.value)}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        Height: {utxo.height}
                      </div>
                    </div>
                    <button
                      onClick={() => copyJson(utxo)}
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
                    >
                      Copy JSON
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-900/50 border border-blue-500 rounded-lg">
              <p className="text-sm">
                <strong>Total Balance:</strong>{' '}
                {formatSatoshis(utxos.reduce((sum, u) => sum + u.value, 0))}
              </p>
            </div>
          </div>
        )}

        {address && utxos.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-400">
            No UTXOs found for this address
          </div>
        )}
      </div>

      <div className="mt-8 bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Token Detection</h2>
        <p className="text-gray-400 text-sm">
          Token detection coming soon. This will scan your UTXOs for BSV-21 and BRC-100 tokens.
        </p>
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-500">
            Planned features:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-500 mt-2">
            <li>Automatic token detection in UTXOs</li>
            <li>Token balance calculation</li>
            <li>Token transaction history</li>
            <li>One-click transfer interface</li>
          </ul>
        </div>
      </div>
    </div>
  )
}