import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  UnorderedListFeature,
  OrderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { Subscribe } from '@/blocks/Subscribe/config'

const TextBlock: Block = {
  slug: 'textBlock',
  interfaceName: 'TextBlock',
  fields: [
    {
      name: 'size',
      type: 'select',
      defaultValue: 'oneThird',
      options: [
        {
          label: 'One Third',
          value: 'oneThird',
        },
        {
          label: 'Half',
          value: 'half',
        },
        {
          label: 'Two Thirds',
          value: 'twoThirds',
        },
        {
          label: 'Full',
          value: 'full',
        },
      ],
    },
    {
      name: 'icon',
      type: 'select',
      defaultValue: 'none',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Abstract Circle 1',
          value: 'GiAbstract069',
        },
      ],
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            UnorderedListFeature(),
            OrderedListFeature(),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'enableLink',
      type: 'checkbox',
    },
    link({
      overrides: {
        admin: {
          condition: (_data, siblingData) => {
            return Boolean(siblingData?.enableLink)
          },
        },
      },
    }),
  ],
}

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [TextBlock, MediaBlock, Subscribe],
      admin: {
        initCollapsed: true,
      },
    },
  ],
}
