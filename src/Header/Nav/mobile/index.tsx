'use client'

import React, { useState, useEffect } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { ArrowRight, SearchIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

export const HeaderMobileNav: React.FC<{ data: HeaderType; className?: string; }> = ({ data, className }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    setActive(pathname)
  }, [pathname])

  return (
    <nav className="nav nav-links mobile">
      {navItems.map(({ link }, i) => {
        const linkUrl = link.type === 'reference' && typeof link.reference?.value === 'object'
          ? `${link.reference?.relationTo !== 'pages' ? `/${link.reference?.relationTo}` : ''}/${link.reference.value.slug}`
          : link.url

        const isActive = active === linkUrl

        return <div className='nav-link-cont' key={i}>
            <CMSLink {...link} appearance="link" className={isActive ? 'active' : ''} />
            <ArrowRight />
        </div>
      })}
      {/* <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link> */}
    </nav>
  )
}
