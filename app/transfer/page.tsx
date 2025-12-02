'use client'

import { useState } from 'react'
import { SafeTokenBuilder } from '@/lib/tokenBuilder'

const bsv = require('bsv')

export default function TransferPage() {
  const [tokenId, setTokenId] = useState('')
  const [inputAmount, setInputAmount] = useState('')
  const [sendAmount, setSendAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [protocol, setProtocol] = useState<'bsv-21' | 'brc-100'>('bsv-21')
  const [privateKey, setPrivateKey] = useState('')
  const [tokenUtxo, setTokenUtxo] = useState('')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const handleTransfer = () => {
    try {
      setError('')
      setResult(null)

      const privKey = bsv.PrivateKey.fromWIF(privateKey)
      const changeAddress = privKey.toAddress()
      const recipientAddress = new bsv.Address(recipient)
      const utxoObj = JSON.parse(tokenUtxo)
      
      const inputTokens = parseInt(inputAmount)
      const sendTokens = parseInt(sendAmount)
      
      if (sendTokens > inputTokens) {
        throw new Error(`Cannot send ${sendTokens} tokens when you only have ${inputTokens}`)
      }

      const builder = new SafeTokenBuilder()
      
      builder
        .addTokenInput(utxoObj, inputTokens, privKey)
        .createTokenOutput(recipientAddress, sendTokens, tokenId, protocol)
        .createTokenChangeOutput(changeAddress, tokenId, protocol)
        .addBsvChange(changeAddress)
        .sign(privKey)

      const changeTokens = inputTokens - sendTokens

      setResult({
        hex: builder.toHex(),
        sent: sendTokens,
        change: changeTokens,
        recipient: recipient
      })
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Transfer Tokens</h1>
      
      <div className="bg-gray-900 rounded-lg p-6 space-y-6">
        <div className="p-4 bg-green-900/50 border border-green-500 rounded-lg">
          <p className="text-sm font-semibold mb-1">✅ Safe Transfer with Automatic Change</p>
          <p className="text-xs text-gray-300">
            This tool ALWAYS creates change outputs. Your tokens will never be burned.
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
              Token ID
            </label>
            <input
              type="text"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              placeholder="txid_0"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Input Token Amount
            </label>
            <input
              type="number"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              placeholder="How many tokens in your UTXO"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Send Amount
            </label>
            <input
              type="number"
              value={sendAmount}
              onChange={(e) => setSendAmount(e.target.value)}
              placeholder="How many to send"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="1ABC..."
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
            Token UTXO (JSON)
          </label>
          <textarea
            value={tokenUtxo}
            onChange={(e) => setTokenUtxo(e.target.value)}
            placeholder='{"txId": "...", "outputIndex": 0, "satoshis": 1, "script": "..."}'
            rows={3}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 font-mono text-sm"
          />
        </div>

        <button
          onClick={handleTransfer}
          className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
        >
          Create Transfer Transaction
        </button>

        {error && (
          <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-4 bg-green-900/50 border border-green-500 rounded-lg">
              <h3 className="font-semibold text-green-400 mb-2">✅ Transfer Transaction Created!</h3>
              <div className="space-y-1 text-sm">
                <p>Sending: {result.sent} tokens</p>
                <p>Change: {result.change} tokens (automatically created!)</p>
                <p>To: <span className="font-mono text-xs">{result.recipient}</span></p>
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