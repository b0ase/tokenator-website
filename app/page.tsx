'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#fff', 
      color: '#000', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      lineHeight: '1.6'
    }}>
      {/* Hero */}
      <div style={{ 
        padding: '100px 20px 60px', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: '400', 
          marginBottom: '24px',
          letterSpacing: '-0.5px'
        }}>
          Tokenator
        </h1>
        <p style={{ 
          fontSize: '18px', 
          color: '#666', 
          marginBottom: '40px',
          maxWidth: '600px'
        }}>
          A straightforward platform for deploying and managing BSV tokens. 
          Every transaction includes automatic change outputs to prevent token loss.
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          flexWrap: 'wrap' 
        }}>
          <Link href="/deploy" style={{
            padding: '12px 24px',
            background: '#000',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '500',
            border: '1px solid #000',
            display: 'inline-block'
          }}>
            Get Started
          </Link>
          <Link href="/portfolio" style={{
            padding: '12px 24px',
            background: '#fff',
            color: '#000',
            textDecoration: 'none',
            border: '1px solid #000',
            fontSize: '15px',
            fontWeight: '500',
            display: 'inline-block'
          }}>
            View Portfolio
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div style={{ 
        borderTop: '1px solid #e5e5e5', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}></div>

      {/* Features */}
      <div style={{ 
        padding: '60px 20px', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: '400', 
          marginBottom: '40px' 
        }}>
          Core Functions
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gap: '40px' 
        }}>
          <div style={{ 
            borderLeft: '2px solid #000', 
            paddingLeft: '24px' 
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '500', 
              marginBottom: '8px' 
            }}>
              Token Deployment
            </h3>
            <p style={{ 
              color: '#666', 
              marginBottom: '12px' 
            }}>
              Support for BSV-21 and BRC-100 protocols. Configure parameters and deploy.
            </p>
            <Link href="/deploy" style={{ 
              color: '#000', 
              fontSize: '14px',
              textDecoration: 'underline' 
            }}>
              Deploy tokens →
            </Link>
          </div>

          <div style={{ 
            borderLeft: '2px solid #000', 
            paddingLeft: '24px' 
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '500', 
              marginBottom: '8px' 
            }}>
              Minting
            </h3>
            <p style={{ 
              color: '#666', 
              marginBottom: '12px' 
            }}>
              Generate token supply with validated transactions. Every token accounted for.
            </p>
            <Link href="/mint" style={{ 
              color: '#000', 
              fontSize: '14px',
              textDecoration: 'underline' 
            }}>
              Mint supply →
            </Link>
          </div>

          <div style={{ 
            borderLeft: '2px solid #000', 
            paddingLeft: '24px' 
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '500', 
              marginBottom: '8px' 
            }}>
              Transfers
            </h3>
            <p style={{ 
              color: '#666', 
              marginBottom: '12px' 
            }}>
              Automatic change output creation prevents accidental token burning.
            </p>
            <Link href="/transfer" style={{ 
              color: '#000', 
              fontSize: '14px',
              textDecoration: 'underline' 
            }}>
              Transfer tokens →
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ 
        borderTop: '1px solid #e5e5e5', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}></div>

      {/* Tools */}
      <div style={{ 
        padding: '60px 20px', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: '400', 
          marginBottom: '40px' 
        }}>
          Utilities
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '24px' 
        }}>
          <Link href="/tools/wif" style={{
            padding: '20px',
            border: '1px solid #e5e5e5',
            textDecoration: 'none',
            color: '#000',
            display: 'block',
            transition: 'border-color 0.2s'
          }}>
            <div style={{ 
              fontSize: '16px', 
              fontWeight: '500', 
              marginBottom: '4px' 
            }}>
              WIF Converter
            </div>
            <div style={{ 
              fontSize: '14px', 
              color: '#666' 
            }}>
              Convert private keys to WIF
            </div>
          </Link>
          
          <Link href="/portfolio" style={{
            padding: '20px',
            border: '1px solid #e5e5e5',
            textDecoration: 'none',
            color: '#000',
            display: 'block',
            transition: 'border-color 0.2s'
          }}>
            <div style={{ 
              fontSize: '16px', 
              fontWeight: '500', 
              marginBottom: '4px' 
            }}>
              Portfolio
            </div>
            <div style={{ 
              fontSize: '14px', 
              color: '#666' 
            }}>
              Check address UTXOs
            </div>
          </Link>
          
          <a href="https://github.com/b0ase/tokenator-website" 
             target="_blank" 
             rel="noopener noreferrer" 
             style={{
               padding: '20px',
               border: '1px solid #e5e5e5',
               textDecoration: 'none',
               color: '#000',
               display: 'block',
               transition: 'border-color 0.2s'
             }}>
            <div style={{ 
              fontSize: '16px', 
              fontWeight: '500', 
              marginBottom: '4px' 
            }}>
              Source Code
            </div>
            <div style={{ 
              fontSize: '14px', 
              color: '#666' 
            }}>
              View on GitHub
            </div>
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        borderTop: '1px solid #e5e5e5', 
        padding: '40px 20px', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ 
            fontSize: '14px', 
            color: '#666' 
          }}>
            © 2025 Tokenator
          </div>
          <Link href="/deploy" style={{
            padding: '10px 20px',
            background: '#000',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Start Building
          </Link>
        </div>
      </div>
    </div>
  )
}