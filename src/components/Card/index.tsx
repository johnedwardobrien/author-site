'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Essay, Post, Shard } from '@/payload-types'

import { Media } from '@/components/Media'
import './Component.css'

import type { ArticleCollectionSlug } from '@/types/articleCollections'

export type CardArchiveDoc =
  | Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>
  | Pick<Essay, 'slug' | 'categories' | 'meta' | 'title'>
  | Pick<Shard, 'slug' | 'categories' | 'meta' | 'title'>

const articlePathPrefixMap: Record<ArticleCollectionSlug, string> = {
  posts: '/posts',
  essays: '/essay',
  shards: '/shard',
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardArchiveDoc
  relationTo?: ArticleCollectionSlug
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = relationTo ? `${articlePathPrefixMap[relationTo]}/${slug}` : undefined

  return (
    <article className={cn('card-cont', className)} ref={card.ref}>
      <div className="card-image">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
      </div>
      <div className="card-content-cont">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && href && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}
