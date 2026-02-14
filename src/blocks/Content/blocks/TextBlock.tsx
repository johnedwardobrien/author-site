import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { GiAbstract069 } from 'react-icons/gi'
import { FaArrowRight } from 'react-icons/fa6'
import '../Component.css'

import type { TextBlock as TextBlockProps } from '@/payload-types'

const iconMap = {
  GiAbstract069,
} as const

import { CMSLink } from '@/components/Link'

export const TextBlock: React.FC<TextBlockProps> = (props) => {
  const { enableLink, icon, link, richText, size } = props
  const Icon = icon && icon !== 'none' ? iconMap[icon as keyof typeof iconMap] : null

  return (
    <div className="content-col">
      {Icon && <Icon className="icon" />}
      {richText && <RichText data={richText} enableGutter={false} />}
      {enableLink && link && (
        <CMSLink {...link}>
          <FaArrowRight />
        </CMSLink>
      )}
    </div>
  )
}
