import type { Essay, Post, Shard, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import './Component.css'

import { CollectionArchive } from '@/components/CollectionArchive'
import type { ArticleCollectionSlug } from '@/types/articleCollections'

type ArticleDoc = Post | Essay | Shard

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    relationTo,
    selectedDocs,
  } = props

  const limit = limitFromProps || 3

  let docs: ArticleDoc[] = []
  let collectionSlug: ArticleCollectionSlug = 'posts'

  if (populateBy === 'collection') {
    const slug = (relationTo || 'posts') as ArticleCollectionSlug
    collectionSlug = slug

    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetched = await payload.find({
      collection: slug,
      depth: 1,
      limit,
      sort: '-createdAt',
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    docs = fetched.docs as ArticleDoc[]
  } else {
    if (selectedDocs?.length) {
      const filtered = selectedDocs
        .map((entry) => {
          if (typeof entry.value === 'object' && entry.value !== null) {
            return entry.value as ArticleDoc
          }
          return undefined
        })
        .filter(Boolean) as ArticleDoc[]

      docs = filtered
    }
  }

  const relationTos: ArticleCollectionSlug[] | undefined =
    populateBy === 'selection' && selectedDocs?.length
      ? selectedDocs.map((entry) => entry.relationTo as ArticleCollectionSlug)
      : undefined

  return (
    <div className="collection-archive" id={`block-${id}`}>
      {introContent && (
        <div className="header-text">
          <RichText className="text" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive
        docs={docs}
        relationTo={relationTos ? 'posts' : collectionSlug}
        relationTos={relationTos}
      />
    </div>
  )
}
