import React, { Fragment } from 'react'

import type { ContentBlock } from '@/payload-types'

import { TextBlock } from './blocks/TextBlock'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { SubscribeBlock } from '@/blocks/Subscribe/Component'

const blockComponents = {
  textBlock: TextBlock,
  mediaBlock: MediaBlock,
  subscribe: SubscribeBlock,
}

export const RenderContentBlocks: React.FC<{
  blocks: ContentBlock['blocks']
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { id, blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              //@ts-expect-error
              return <Block key={id} {...block} />
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
