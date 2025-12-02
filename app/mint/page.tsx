'use client'

import { useState } from 'react'
import { createMintTransaction } from '@/lib/tokenBuilder'

const bsv = require('bsv')

export default function MintPage() {
  const [ticker, setTicker] = useState('$TEST')
  const [amount, setAmount] = useState('1000000')
  const [protocol, setProtocol] = useState<'bsv-21' | 'brc-100'>('bsv-21')
  const [privateKey, setPrivateKey] = useState('')
  const [utxo, setUtxo] = useState('')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const handleMint = () => {
    try {
      setError('')
      setResult(null)

      const privKey = bsv.PrivateKey.fromWIF(privateKey)
      const address = privKey.toAddress()
      const utxoObj = JSON.parse(utxo)
      
      // Add script if not present
      if (!utxoObj.script) {
        utxoObj.script = bsv.Script.buildPublicKeyHashOut(address).toHex()
      }

      const mint = createMintTransaction({
        ticker,
        amount: parseInt(amount),
        privateKey: privKey,
        address,
        utxo: utxoObj,
        protocol
      })

      setResult({
        hex: mint.hex,
        ticker,
        amount,
        address: address.toString()
      })
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Mint Tokens</h1>
      
      <div className="bg-gray-900 rounded-lg p-6 space-y-6">
        <div className="p-4 bg-blue-900/50 border border-blue-500 rounded-lg">
          <p className="text-sm">
            Minting creates the actual token supply after deployment. Only the deployer can mint.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Protocol
            </label>
            <select
              value={protocol}
              onChange={(e) => setProtocol(e.target.value as 'bsv-21' | 'brc-100')}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
            >
              <option value="bsv-21">BSV-21</option>
              <option value="brc-100">BRC-100</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Token Ticker
            </label>
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              placeholder="$TOKEN"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Amount to Mint
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1000000"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Private Key (WIF)
          </label>
          <input
            type="password"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            placeholder="L..."
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Funding UTXO (JSON)
          </label>
          <textarea
            value={utxo}
            onChange={(e) => setUtxo(e.target.value)}
            placeholder='{"txId": "...", "outputIndex": 0, "satoshis": 10000}'
            rows={3}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 font-mono text-sm"
          />
        </div>

        <button
          onClick={handleMint}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
        >
          Mint Tokens
        </button>

        {error && (
          <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-4 bg-green-900/50 border border-green-500 rounded-lg">
              <h3 className="font-semibold text-green-400 mb-2">✅ Mint Transaction Created!</h3>
              <div className="space-y-1 text-sm">
                <p>Minting: {result.amount} {result.ticker}</p>
                <p>To Address: <span className="font-mono text-xs">{result.address}</span></p>
              </div>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">Transaction Hex:</h4>
              <div className="bg-black p-3 rounded font-mono text-xs break-all">
                {result.hex}
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Broadcast at{' '}
                <a href="https://whatsonchain.com/broadcast" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  whatsonchain.com/broadcast
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}