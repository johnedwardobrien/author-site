"use client"

import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
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
        <Slider
          className="collection-archive-swiper"
          slidesToShow={5}
          slidesToScroll={1}
          arrows
          infinite={false}
          responsive={[
            {
              breakpoint: 1024,
              settings: { slidesToShow: 3, slidesToScroll: 1 },
            },
            {
              breakpoint: 768,
              settings: { slidesToShow: 1, slidesToScroll: 1 },
            },
          ]}
        >
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div key={index}>
                  <Card className="h-full" doc={result} relationTo="posts" showCategories />
                </div>
              )
            }
            return null
          })}
        </Slider>
        <style jsx global>{`
          .collection-archive-cont .slick-prev,
          .collection-archive-cont .slick-next {
            display: none;
          }

          @media (min-width: 768px) {
            .collection-archive-cont .slick-prev,
            .collection-archive-cont .slick-next {
              display: flex;
            }
          }
        `}</style>
      </div>
    </div>
  )
}
