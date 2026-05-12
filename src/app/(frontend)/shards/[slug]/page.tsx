import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Shard } from '@/payload-types'

import { PostHeader } from '@/heros/PostHeader'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import './Component.css'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Header } from '@/Header/Component'
import { Footer } from '@/Footer/Component'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const shards = await payload.find({
    collection: 'shards',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return shards.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ShardPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/shards/' + slug
  const shard = await queryShardBySlug({ slug })

  if (!shard) return <PayloadRedirects url={url} />

  return (
    <>
      <Header />
      <article className="post-page">
        <PageClient />

        <PayloadRedirects disableNotFound url={url} />

        {draft && <LivePreviewListener />}
        <PostHeader post={shard} />
        <RenderBlocks blocks={shard.layout} />
      </article>
      <Footer />
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const shard = await queryShardBySlug({ slug })

  return generateMeta({
    doc: shard,
    path: `/shards/${slug}`,
  })
}

const queryShardBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'shards',
    draft,
    limit: 1,
    depth: 10,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return (result.docs?.[0] as Shard | undefined) || null
})
