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
      type: 'text',
      label: 'Max Width',
      admin: {
        description: 'Optional CSS max-width value, e.g. 720px, 80%, or min(100%, 720px).',
      },
    },
  ],
}
