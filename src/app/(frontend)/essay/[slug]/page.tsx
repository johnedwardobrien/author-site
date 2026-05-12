import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Essay } from '@/payload-types'

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
  const essays = await payload.find({
    collection: 'essays',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return essays.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function EssayPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/essay/' + slug
  const essay = await queryEssayBySlug({ slug })

  if (!essay) return <PayloadRedirects url={url} />

  return (
    <>
      <Header />
      <article className="post-page">
        <PageClient />

        <PayloadRedirects disableNotFound url={url} />

        {draft && <LivePreviewListener />}
        <PostHeader post={essay} />
        <RenderBlocks blocks={essay.layout} />
      </article>
      <Footer />
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const essay = await queryEssayBySlug({ slug })

  return generateMeta({
    doc: essay,
    path: `/essay/${slug}`,
  })
}

const queryEssayBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'essays',
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

  return (result.docs?.[0] as Essay | undefined) || null
})
