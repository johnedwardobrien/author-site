'use client'

import React, { useState, useEffect } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { ArrowRight, SearchIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { easeIn, motion } from 'framer-motion'

export const HeaderDesktopNav: React.FC<{ data: HeaderType; className?: string; }> = ({ data, className }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()
  const [active, setActive] = useState<string | null>(null)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setActive(pathname)
  }, [pathname])

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 980)
    }

    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down')
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up')
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className="nav nav-links desktop"
      animate={isDesktop ? {
        transform: scrollDirection === 'down' ? 'translateY(-100%)' : 'translateY(0)'
      } : {}}
      transition={isDesktop ? { duration: 0.2, ease: easeIn } : {}}
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
