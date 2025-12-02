'use client'

import { useState } from 'react'
import { createDeployTransaction } from '@/lib/tokenBuilder'

const bsv = require('bsv')

export default function DeployPage() {
  const [ticker, setTicker] = useState('$TEST')
  const [supply, setSupply] = useState('1000000')
  const [decimals, setDecimals] = useState('0')
  const [protocol, setProtocol] = useState<'bsv-21' | 'brc-100'>('bsv-21')
  const [privateKey, setPrivateKey] = useState('')
  const [utxo, setUtxo] = useState('')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const handleDeploy = () => {
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

      const deployment = createDeployTransaction({
        ticker,
        maxSupply: parseInt(supply),
        decimals: parseInt(decimals),
        privateKey: privKey,
        address,
        utxo: utxoObj,
        protocol
      })

      setResult({
        tokenId: deployment.tokenId,
        hex: deployment.hex,
        ticker,
        supply,
        protocol
      })
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div style={{
      maxWidth: '900px',
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
        Deploy New Token
      </h1>
      
      <div style={{
        border: '1px solid #e5e5e5',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
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
              Token Ticker
            </label>
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              placeholder="$TOKEN"
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
              Total Supply
            </label>
            <input
              type="number"
              value={supply}
              onChange={(e) => setSupply(e.target.value)}
              placeholder="1000000"
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
              Decimals
            </label>
            <input
              type="number"
              value={decimals}
              onChange={(e) => setDecimals(e.target.value)}
              min="0"
              max="8"
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
            Funding UTXO (JSON)
          </label>
          <textarea
            value={utxo}
            onChange={(e) => setUtxo(e.target.value)}
            placeholder='{"txId": "...", "outputIndex": 0, "satoshis": 10000}'
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
          onClick={handleDeploy}
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
          Deploy Token
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
                Token Deployment Created
              </h3>
              <div style={{
                fontSize: '0.875rem',
                color: '#666',
                lineHeight: '1.5'
              }}>
                <p>Token ID: <span style={{ fontFamily: 'monospace' }}>{result.tokenId}</span></p>
                <p>Ticker: {result.ticker}</p>
                <p>Supply: {result.supply}</p>
                <p>Protocol: {result.protocol}</p>
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
                Copy and broadcast at{' '}
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