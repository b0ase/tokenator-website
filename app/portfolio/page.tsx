'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function PortfolioContent() {
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
        Token Portfolio
      </h1>
      
      <div style={{
        border: '1px solid #e5e5e5',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            color: '#666',
            marginBottom: '0.5rem',
            fontWeight: '400'
          }}>
            BSV Address
          </label>
          <div style={{
            display: 'flex',
            gap: '1rem'
          }}>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter BSV address..."
              style={{
                flex: '1',
                padding: '0.75rem',
                border: '1px solid #e5e5e5',
                fontSize: '0.875rem',
                fontFamily: 'inherit',
                backgroundColor: '#fff',
                color: '#000'
              }}
            />
            <button
              onClick={fetchUTXOs}
              disabled={loading}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: loading ? '#666' : '#000',
                color: '#fff',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: '400',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit'
              }}
            >
              {loading ? 'Loading...' : 'Check UTXOs'}
            </button>
          </div>
        </div>

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

        {utxos.length > 0 && (
          <div style={{ marginTop: '1.5rem' }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: '400',
              marginBottom: '1rem',
              color: '#000'
            }}>
              Available UTXOs
            </h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {utxos.map((utxo, index) => (
                <div key={index} style={{
                  border: '1px solid #e5e5e5',
                  padding: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{ flex: '1' }}>
                      <div style={{
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                        color: '#666',
                        marginBottom: '0.5rem'
                      }}>
                        {utxo.tx_hash}:{utxo.tx_pos}
                      </div>
                      <div style={{
                        fontSize: '1.125rem',
                        fontWeight: '400',
                        color: '#000'
                      }}>
                        {formatSatoshis(utxo.value)}
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        color: '#666',
                        marginTop: '0.25rem'
                      }}>
                        Height: {utxo.height}
                      </div>
                    </div>
                    <button
                      onClick={() => copyJson(utxo)}
                      style={{
                        padding: '0.375rem 0.75rem',
                        backgroundColor: '#fff',
                        color: '#000',
                        border: '1px solid #e5e5e5',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        fontFamily: 'inherit'
                      }}
                    >
                      Copy JSON
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              border: '1px solid #e5e5e5',
              backgroundColor: '#f8f8f8'
            }}>
              <p style={{
                fontSize: '0.875rem',
                color: '#000',
                margin: '0'
              }}>
                <strong>Total Balance:</strong>{' '}
                {formatSatoshis(utxos.reduce((sum, u) => sum + u.value, 0))}
              </p>
            </div>
          </div>
        )}

        {address && utxos.length === 0 && !loading && (
          <div style={{
            textAlign: 'center',
            padding: '2rem 0',
            color: '#666'
          }}>
            No UTXOs found for this address
          </div>
        )}
      </div>

      <div style={{
        border: '1px solid #e5e5e5',
        padding: '2rem'
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '400',
          marginBottom: '1rem',
          color: '#000'
        }}>
          Token Detection
        </h2>
        <p style={{
          color: '#666',
          fontSize: '0.875rem',
          marginBottom: '1rem'
        }}>
          Token detection coming soon. This will scan your UTXOs for BSV-21 and BRC-100 tokens.
        </p>
        <div style={{
          padding: '1rem',
          border: '1px solid #e5e5e5',
          backgroundColor: '#f8f8f8'
        }}>
          <p style={{
            fontSize: '0.875rem',
            color: '#666',
            marginBottom: '0.5rem'
          }}>
            Planned features:
          </p>
          <ul style={{
            listStyle: 'disc',
            paddingLeft: '1.25rem',
            fontSize: '0.875rem',
            color: '#666',
            margin: '0'
          }}>
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

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PortfolioContent />
    </Suspense>
  )
}