'use client'

import { useState } from 'react'

const bsv = require('bsv')

export default function WIFConverterPage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const convertToWIF = () => {
    try {
      setError('')
      setResult(null)

      let privateKey

      if (input.startsWith('L') || input.startsWith('K') || input.startsWith('5')) {
        // Already WIF
        privateKey = bsv.PrivateKey.fromWIF(input)
      } else {
        // Try as hex
        let hex = input.trim()
        if (hex.startsWith('0x')) {
          hex = hex.slice(2)
        }
        
        if (hex.length !== 64) {
          throw new Error(`Invalid hex length: ${hex.length} chars (need 64)`)
        }
        
        if (!/^[0-9a-fA-F]+$/.test(hex)) {
          throw new Error('Invalid hex characters')
        }
        
        privateKey = bsv.PrivateKey.fromString(hex)
      }

      const wif = privateKey.toWIF()
      const address = privateKey.toAddress().toString()
      const hex = privateKey.toString()

      setResult({ wif, address, hex })
    } catch (err: any) {
      setError(err.message)
    }
  }

  const generateRandom = () => {
    const privateKey = bsv.PrivateKey.fromRandom()
    setInput(privateKey.toString())
    setResult({
      wif: privateKey.toWIF(),
      address: privateKey.toAddress().toString(),
      hex: privateKey.toString()
    })
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    alert(`${label} copied to clipboard`)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">WIF Converter</h1>
      
      <div className="bg-gray-900 rounded-lg p-6 space-y-6">
        <div className="p-4 bg-yellow-900/50 border border-yellow-500 rounded-lg">
          <p className="text-sm">
            <strong>⚠️ Security Notice:</strong> This tool runs entirely in your browser. 
            Never share your private keys with anyone.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Enter Private Key (hex or WIF)
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter hex key (64 chars) or WIF format..."
            rows={3}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 font-mono text-sm"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={convertToWIF}
            className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
          >
            Convert to WIF
          </button>
          <button
            onClick={generateRandom}
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
          >
            Generate Random
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-400">WIF Format</label>
                <button
                  onClick={() => copyToClipboard(result.wif, 'WIF')}
                  className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded"
                >
                  Copy
                </button>
              </div>
              <div className="font-mono text-sm bg-black p-2 rounded break-all">
                {result.wif}
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-400">Address</label>
                <button
                  onClick={() => copyToClipboard(result.address, 'Address')}
                  className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded"
                >
                  Copy
                </button>
              </div>
              <div className="font-mono text-sm bg-black p-2 rounded">
                {result.address}
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-400">Hex Format</label>
                <button
                  onClick={() => copyToClipboard(result.hex, 'Hex')}
                  className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded"
                >
                  Copy
                </button>
              </div>
              <div className="font-mono text-sm bg-black p-2 rounded break-all">
                {result.hex}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}