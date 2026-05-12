import { createRevalidateArticleHooks } from '@/collections/_shared/hooks/createRevalidateArticleHooks'

const { revalidateOnChange, revalidateOnDelete } = createRevalidateArticleHooks({
  pathPrefix: '/posts',
  sitemapTag: 'posts-sitemap',
  docLabel: 'post',
})

export const revalidatePost = revalidateOnChange
export const revalidateDelete = revalidateOnDelete
