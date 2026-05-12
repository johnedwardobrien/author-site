'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderDesktopNav } from '../Nav/desktop'
import { Hamburger } from '@payloadcms/ui'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { easeIn, motion } from 'framer-motion'

interface HeaderClientProps {
  data: Header
}

export const HeaderDesktopClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  const headerRef = useRef<HTMLElement>(null)
  const allowScrollAnimateRef = useRef(true)

  const handleMouseEnter = () => {
    setScrollDirection('up')
    allowScrollAnimateRef.current = false
  }

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const isHovering = headerRef.current?.matches(':hover') ?? false

      if (isHovering) {
        setScrollDirection('up')
        allowScrollAnimateRef.current = false
        return
      }

      if (!allowScrollAnimateRef.current) return

      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down')
      } else if (currentScrollY < lastScrollY && scrollDirection !== 'up') {
        setScrollDirection('up')
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      ref={headerRef}
      className={`nav-container desktop ${hamburgerOpen ? 'mobile-menu-active' : ''}`}
      {...(theme ? { 'data-theme': theme, } : {})}
      animate={{
        backgroundColor: scrollDirection === 'up' ? 'rgb(224,224,225)' : 'transparent'
      }}
      transition={{ duration: 0.2, ease: easeIn }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => {
        allowScrollAnimateRef.current = true
      }}
    >
      <div
        className='inner'
      >
          <div className="header-title">
            <Link href="/books">
              <motion.div
                initial={{ scale: 1, padding: '.25rem 0' }}
                animate={{
                  scale: scrollDirection === 'down' ? 1 : 0.8,
                  padding: scrollDirection === 'down' ? '0.25rem 0' : '0',
                }}
                transition={{ duration: 0.2, ease: easeIn }}
              >
                John Edward O&apos;Brien
              </motion.div>
            </Link>
          </div>
          <HeaderDesktopNav data={data} scrollDirection={scrollDirection} />
      </div>
    </motion.header>
  )
}
