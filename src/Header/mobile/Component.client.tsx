'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderMobileNav } from '../Nav/mobile'
import { Hamburger } from '@payloadcms/ui'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

interface HeaderClientProps {
  data: Header
}

export const HeaderMobileClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const siteTitle = data.siteTitle || ''

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className={`nav-container mobile ${hamburgerOpen ? 'mobile-menu-active' : ''}`}
      {...(theme ? { 'data-theme': theme, } : {})}
    >
      <div
        className='inner'
      >
          <div className="header-title">
            <Link href="/">
              <div>
                {siteTitle}
              </div>
            </Link>
            <div
              className='mobile-hamburger'
              onClick={() => {
                setHamburgerOpen(!hamburgerOpen)
              }}
            >
              <div>
                {!hamburgerOpen && <RxHamburgerMenu />}
                {hamburgerOpen && <IoClose />}
              </div>
            </div>
          </div>
          <HeaderMobileNav data={data} />
      </div>
    </header>
  )
}
