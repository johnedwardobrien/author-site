import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'maxWidth',
      type: 'number',
      label: 'Max Width',
      admin: {
        description: 'Optional max image width in pixels.',
      },
    },
  ],
}
