"use client"

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import './Component.css'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className="collection-archive-cont">
      <div className="inner">
        <Swiper
          className="collection-archive-swiper"
          slidesPerView={1}
          spaceBetween={16}
          navigation
          modules={[Navigation]}
          breakpoints={{
            768: { slidesPerView: 3, spaceBetween: 24 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
          }}
        >
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <SwiperSlide key={index}>
                  <Card className="h-full" doc={result} relationTo="posts" showCategories />
                </SwiperSlide>
              )
            }
            return null
          })}
        </Swiper>
        <style jsx global>{`
          .collection-archive-cont .swiper-button-prev,
          .collection-archive-cont .swiper-button-next {
            display: none;
          }

          @media (min-width: 768px) {
            .collection-archive-cont .swiper-button-prev,
            .collection-archive-cont .swiper-button-next {
              display: flex;
            }
          }
        `}</style>
      </div>
    </div>
  )
}
