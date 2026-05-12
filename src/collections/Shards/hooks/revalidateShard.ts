import { createRevalidateArticleHooks } from '@/collections/_shared/hooks/createRevalidateArticleHooks'

const { revalidateOnChange, revalidateOnDelete } = createRevalidateArticleHooks({
  pathPrefix: '/shard',
  sitemapTag: 'shards-sitemap',
  docLabel: 'shard',
})

export const revalidateShard = revalidateOnChange
export const revalidateShardDelete = revalidateOnDelete
