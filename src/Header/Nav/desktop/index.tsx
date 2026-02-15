'use client'

import React, { useState, useEffect } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { ArrowRight, SearchIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { easeIn, motion } from 'framer-motion'

export const HeaderDesktopNav: React.FC<{ data: HeaderType; className?: string; scrollDirection: 'up' | 'down'; }> = ({ data, className, scrollDirection }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    setActive(pathname)
  }, [pathname])

  return (
    <motion.nav
      className="nav nav-links desktop"
      initial={{ translateY: '-100%' }}
      animate={{ transform: scrollDirection === 'up' ? 'translateY(0)' : 'translateY(-100%)' }}
      transition={{ duration: 0.2, ease: easeIn }}
    >
      {navItems.map(({ link }, i) => {
        const linkUrl = link.type === 'reference' && typeof link.reference?.value === 'object'
          ? `${link.reference?.relationTo !== 'pages' ? `/${link.reference?.relationTo}` : ''}/${link.reference.value.slug}`
          : link.url

        const isActive = active === linkUrl

        return <div key={i} className='nav-link-cont'>
            <CMSLink {...link} appearance="link" className={isActive ? 'active' : ''} />
            <ArrowRight />
        </div>
      })}
      {/* <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link> */}
    </motion.nav>
  )
}
