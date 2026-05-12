import { createRevalidateArticleHooks } from '@/collections/_shared/hooks/createRevalidateArticleHooks'

const { revalidateOnChange, revalidateOnDelete } = createRevalidateArticleHooks({
  pathPrefix: '/essay',
  sitemapTag: 'essays-sitemap',
  docLabel: 'essay',
})

export const revalidateEssay = revalidateOnChange
export const revalidateEssayDelete = revalidateOnDelete
