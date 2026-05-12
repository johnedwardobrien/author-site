import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import type { CardArchiveDoc } from '@/components/Card'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import type { Search as SearchDoc } from '@/payload-types'
import type { ArticleCollectionSlug } from '@/types/articleCollections'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}

function mapSearchHits(hits: SearchDoc[]): {
  docs: CardArchiveDoc[]
  relationTos: ArticleCollectionSlug[]
} {
  const docs: CardArchiveDoc[] = []
  const relationTos: ArticleCollectionSlug[] = []

  for (const hit of hits) {
    const d = hit.doc
    if (!d || typeof d.value !== 'object' || !d.value) continue
    const v = d.value
    const rel = d.relationTo as ArticleCollectionSlug
    docs.push({
      slug: v.slug,
      title: hit.title ?? v.title,
      meta: hit.meta ?? v.meta,
      categories: v.categories,
    })
    relationTos.push(rel)
  }

  return { docs, relationTos }
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const results = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      doc: true,
    },
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  const { docs, relationTos } = mapSearchHits(results.docs as SearchDoc[])

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">Search</h1>

          <div className="max-w-[50rem] mx-auto">
            <Search />
          </div>
        </div>
      </div>

      {results.totalDocs > 0 ? (
        <CollectionArchive docs={docs} relationTo="posts" relationTos={relationTos} />
      ) : (
        <div className="container">No results found.</div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    // title: `Payload Website Template Search`,
  }
}
