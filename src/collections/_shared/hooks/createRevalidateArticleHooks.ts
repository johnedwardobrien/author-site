import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export function createRevalidateArticleHooks(options: {
  pathPrefix: string
  sitemapTag: string
  docLabel: string
}): {
  revalidateOnChange: CollectionAfterChangeHook
  revalidateOnDelete: CollectionAfterDeleteHook
} {
  const { pathPrefix, sitemapTag, docLabel } = options

  const revalidateOnChange: CollectionAfterChangeHook = ({
    doc,
    previousDoc,
    req: { payload, context },
  }) => {
    if (!context.disableRevalidate) {
      if (doc._status === 'published') {
        const path = `${pathPrefix}/${doc.slug}`

        payload.logger.info(`Revalidating ${docLabel} at path: ${path}`)

        revalidatePath(path)
        // @ts-ignore - revalidateTag type mismatch
        revalidateTag(sitemapTag)
      }

      if (previousDoc._status === 'published' && doc._status !== 'published') {
        const oldPath = `${pathPrefix}/${previousDoc.slug}`

        payload.logger.info(`Revalidating old ${docLabel} at path: ${oldPath}`)

        revalidatePath(oldPath)
        // @ts-ignore - revalidateTag type mismatch
        revalidateTag(sitemapTag)
      }
    }
    return doc
  }

  const revalidateOnDelete: CollectionAfterDeleteHook = ({
    doc,
    req: { context },
  }) => {
    if (!context.disableRevalidate) {
      const path = `${pathPrefix}/${doc?.slug}`

      revalidatePath(path)
      // @ts-ignore - revalidateTag type mismatch
      revalidateTag(sitemapTag)
    }

    return doc
  }

  return { revalidateOnChange, revalidateOnDelete }
}
