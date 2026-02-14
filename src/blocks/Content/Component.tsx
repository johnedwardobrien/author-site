import React from 'react'
import './Component.css'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { RenderContentBlocks } from './RenderContentBlocks'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { blocks } = props

  return (
    <div className="content-blocks">
      <div className="w-100">
        <RenderContentBlocks blocks={blocks} />
      </div>
    </div>
  )
}
