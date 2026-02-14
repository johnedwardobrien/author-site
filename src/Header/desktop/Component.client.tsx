'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderDesktopNav } from '../Nav/desktop'
import '../Component.css'
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
  const [isDesktop, setIsDesktop] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

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
    <motion.header
      className={`nav-container desktop ${hamburgerOpen ? 'mobile-menu-active' : ''}`}
      {...(theme ? { 'data-theme': theme, } : {})}
      animate={isDesktop ? {
        backgroundColor: scrollDirection === 'up' ? 'rgb(224,224,225)' : 'transparent'
      } : {}}
      transition={{ duration: 0.2, ease: easeIn }}
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
                  paddingTop: scrollDirection === 'down' ? '0.25rem' : '0',
                  paddingBottom: scrollDirection === 'down' ? '0.25rem' : '0'
                }}
                transition={{ duration: 0.2, ease: easeIn }}
              >
                John Edward O'Brien
              </motion.div>
            </Link>
            <div
              className='mobile-hamburger'
              onClick={() => {
                setHamburgerOpen(!hamburgerOpen)
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: scrollDirection === 'down' ? 0 : 1 }}
                transition={{ duration: 0.2, ease: easeIn }}
              >
                {!hamburgerOpen && <RxHamburgerMenu />}
                {hamburgerOpen && <IoClose />}
              </motion.div>
            </div>
          </div>
          <HeaderDesktopNav data={data} />
      </div>
    </motion.header>
  )
}
