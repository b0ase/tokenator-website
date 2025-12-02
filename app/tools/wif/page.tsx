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
        WIF Converter
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
            margin: '0',
            color: '#000'
          }}>
            <strong>Security Notice:</strong> This tool runs entirely in your browser. 
            Never share your private keys with anyone.
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            color: '#666',
            marginBottom: '0.5rem',
            fontWeight: '400'
          }}>
            Enter Private Key (hex or WIF)
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter hex key (64 chars) or WIF format..."
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

        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <button
            onClick={convertToWIF}
            style={{
              flex: '1',
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
            Convert to WIF
          </button>
          <button
            onClick={generateRandom}
            style={{
              flex: '1',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#fff',
              color: '#000',
              border: '1px solid #e5e5e5',
              fontSize: '0.875rem',
              fontWeight: '400',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            Generate Random
          </button>
        </div>

        {error && (
          <div style={{
            padding: '1rem',
            border: '1px solid #e5e5e5',
            color: '#000',
            marginBottom: '1.5rem',
            backgroundColor: '#fff'
          }}>
            Error: {error}
          </div>
        )}

        {result && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{
              border: '1px solid #e5e5e5',
              padding: '1rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <label style={{
                  fontSize: '0.875rem',
                  fontWeight: '400',
                  color: '#666'
                }}>WIF Format</label>
                <button
                  onClick={() => copyToClipboard(result.wif, 'WIF')}
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem',
                    backgroundColor: '#fff',
                    color: '#000',
                    border: '1px solid #e5e5e5',
                    cursor: 'pointer',
                    fontFamily: 'inherit'
                  }}
                >
                  Copy
                </button>
              </div>
              <div style={{
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                backgroundColor: '#f8f8f8',
                padding: '0.5rem',
                border: '1px solid #e5e5e5',
                wordBreak: 'break-all',
                color: '#000'
              }}>
                {result.wif}
              </div>
            </div>

            <div style={{
              border: '1px solid #e5e5e5',
              padding: '1rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <label style={{
                  fontSize: '0.875rem',
                  fontWeight: '400',
                  color: '#666'
                }}>Address</label>
                <button
                  onClick={() => copyToClipboard(result.address, 'Address')}
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem',
                    backgroundColor: '#fff',
                    color: '#000',
                    border: '1px solid #e5e5e5',
                    cursor: 'pointer',
                    fontFamily: 'inherit'
                  }}
                >
                  Copy
                </button>
              </div>
              <div style={{
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                backgroundColor: '#f8f8f8',
                padding: '0.5rem',
                border: '1px solid #e5e5e5',
                color: '#000'
              }}>
                {result.address}
              </div>
            </div>

            <div style={{
              border: '1px solid #e5e5e5',
              padding: '1rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <label style={{
                  fontSize: '0.875rem',
                  fontWeight: '400',
                  color: '#666'
                }}>Hex Format</label>
                <button
                  onClick={() => copyToClipboard(result.hex, 'Hex')}
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem',
                    backgroundColor: '#fff',
                    color: '#000',
                    border: '1px solid #e5e5e5',
                    cursor: 'pointer',
                    fontFamily: 'inherit'
                  }}
                >
                  Copy
                </button>
              </div>
              <div style={{
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                backgroundColor: '#f8f8f8',
                padding: '0.5rem',
                border: '1px solid #e5e5e5',
                wordBreak: 'break-all',
                color: '#000'
              }}>
                {result.hex}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}