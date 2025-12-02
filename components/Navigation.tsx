'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: '/deploy', label: 'Deploy' },
    { href: '/mint', label: 'Mint' },
    { href: '/transfer', label: 'Transfer' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/tools/wif', label: 'Tools' },
  ]

  return (
    <nav style={{ 
      borderBottom: '1px solid #e5e5e5',
      background: '#fff'
    }}>
      <div style={{ 
        maxWidth: '900px', 
        margin: '0 auto', 
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '60px'
      }}>
        <Link href="/" style={{
          fontSize: '18px',
          fontWeight: '400',
          color: '#000',
          textDecoration: 'none'
        }}>
          Tokenator
        </Link>
        
        <div style={{ 
          display: 'flex', 
          gap: '24px',
          alignItems: 'center'
        }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: pathname === link.href ? '#000' : '#666',
                textDecoration: pathname === link.href ? 'underline' : 'none',
                fontSize: '14px',
                fontWeight: '400'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}