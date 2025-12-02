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
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      backgroundColor: '#fff',
      color: '#000'
    }}>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: '400',
        marginBottom: '2rem',
        color: '#000'
      }}>
        Transfer Tokens
      </h1>
      
      <div style={{
        border: '1px solid #e5e5e5',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          padding: '1rem',
          border: '1px solid #e5e5e5',
          marginBottom: '1.5rem',
          backgroundColor: '#f8f8f8'
        }}>
          <p style={{
            fontSize: '0.875rem',
            fontWeight: '400',
            marginBottom: '0.25rem',
            color: '#000'
          }}>
            Safe Transfer with Automatic Change
          </p>
          <p style={{
            fontSize: '0.75rem',
            color: '#666',
            margin: '0'
          }}>
            This tool ALWAYS creates change outputs. Your tokens will never be burned.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              color: '#666',
              marginBottom: '0.5rem',
              fontWeight: '400'
            }}>
              Protocol
            </label>
            <select
              value={protocol}
              onChange={(e) => setProtocol(e.target.value as 'bsv-21' | 'brc-100')}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e5e5e5',
                fontSize: '0.875rem',
                fontFamily: 'inherit',
                backgroundColor: '#fff',
                color: '#000'
              }}
            >
              <option value="bsv-21">BSV-21</option>
              <option value="brc-100">BRC-100</option>
            </select>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              color: '#666',
              marginBottom: '0.5rem',
              fontWeight: '400'
            }}>
              Token ID
            </label>
            <input
              type="text"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              placeholder="txid_0"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e5e5e5',
                fontSize: '0.875rem',
                fontFamily: 'monospace',
                backgroundColor: '#fff',
                color: '#000'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              color: '#666',
              marginBottom: '0.5rem',
              fontWeight: '400'
            }}>
              Input Token Amount
            </label>
            <input
              type="number"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              placeholder="How many tokens in your UTXO"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e5e5e5',
                fontSize: '0.875rem',
                fontFamily: 'inherit',
                backgroundColor: '#fff',
                color: '#000'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              color: '#666',
              marginBottom: '0.5rem',
              fontWeight: '400'
            }}>
              Send Amount
            </label>
            <input
              type="number"
              value={sendAmount}
              onChange={(e) => setSendAmount(e.target.value)}
              placeholder="How many to send"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e5e5e5',
                fontSize: '0.875rem',
                fontFamily: 'inherit',
                backgroundColor: '#fff',
                color: '#000'
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            color: '#666',
            marginBottom: '0.5rem',
            fontWeight: '400'
          }}>
            Recipient Address
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="1ABC..."
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e5e5e5',
              fontSize: '0.875rem',
              fontFamily: 'inherit',
              backgroundColor: '#fff',
              color: '#000'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            color: '#666',
            marginBottom: '0.5rem',
            fontWeight: '400'
          }}>
            Private Key (WIF)
          </label>
          <input
            type="password"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            placeholder="L..."
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e5e5e5',
              fontSize: '0.875rem',
              fontFamily: 'inherit',
              backgroundColor: '#fff',
              color: '#000'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            color: '#666',
            marginBottom: '0.5rem',
            fontWeight: '400'
          }}>
            Token UTXO (JSON)
          </label>
          <textarea
            value={tokenUtxo}
            onChange={(e) => setTokenUtxo(e.target.value)}
            placeholder='{"txId": "...", "outputIndex": 0, "satoshis": 1, "script": "..."}'
            rows={3}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e5e5e5',
              fontSize: '0.875rem',
              fontFamily: 'monospace',
              backgroundColor: '#fff',
              color: '#000',
              resize: 'vertical'
            }}
          />
        </div>

        <button
          onClick={handleTransfer}
          style={{
            width: '100%',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            fontSize: '0.875rem',
            fontWeight: '400',
            cursor: 'pointer',
            fontFamily: 'inherit'
          }}
        >
          Create Transfer Transaction
        </button>

        {error && (
          <div style={{
            padding: '1rem',
            border: '1px solid #e5e5e5',
            color: '#000',
            marginTop: '1.5rem',
            backgroundColor: '#fff'
          }}>
            Error: {error}
          </div>
        )}

        {result && (
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{
              padding: '1rem',
              border: '1px solid #e5e5e5',
              marginBottom: '1rem'
            }}>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '400',
                marginBottom: '0.75rem',
                color: '#000'
              }}>
                Transfer Transaction Created
              </h3>
              <div style={{
                fontSize: '0.875rem',
                color: '#666',
                lineHeight: '1.5'
              }}>
                <p>Sending: {result.sent} tokens</p>
                <p>Change: {result.change} tokens (automatically created!)</p>
                <p>To: <span style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{result.recipient}</span></p>
              </div>
            </div>

            <div style={{
              padding: '1rem',
              border: '1px solid #e5e5e5'
            }}>
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: '400',
                marginBottom: '0.75rem',
                color: '#000'
              }}>
                Transaction Hex:
              </h4>
              <div style={{
                backgroundColor: '#f8f8f8',
                padding: '0.75rem',
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                wordBreak: 'break-all',
                border: '1px solid #e5e5e5',
                color: '#000'
              }}>
                {result.hex}
              </div>
              <p style={{
                fontSize: '0.75rem',
                color: '#666',
                marginTop: '0.5rem'
              }}>
                Broadcast at{' '}
                <a 
                  href="https://whatsonchain.com/broadcast" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#000', textDecoration: 'underline' }}
                >
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