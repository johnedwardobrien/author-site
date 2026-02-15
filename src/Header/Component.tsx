import { HeaderDesktopClient } from './desktop/Component.client'
import { HeaderMobileClient } from './mobile/Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import './Component.css'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 2)()

  return (
    <>
      <HeaderDesktopClient data={headerData} />
      <HeaderMobileClient data={headerData} />
    </>
  )
}
