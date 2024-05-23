"use client"
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

const heroImages = [
    {
        imgUrl: '/assets/images/hero-1.jpg',
        alt: 'smartwatch'
    },
    {
        imgUrl: '/assets/images/hero-2.jpg',
        alt: 'smartphone'
    },
    {
        imgUrl: '/assets/images/hero-3.jpg',
        alt: 'laptop'
    },
    {
        imgUrl: '/assets/images/hero-4.jpg',
        alt: 'headphone'
    },
    {
        imgUrl: '/assets/images/hero-5.jpg',
        alt: 'camera'
    },
    {
        imgUrl: '/assets/images/hero-6.jpg',
        alt: 'shoes'
    }
]

export default function HeroCarousel() {
  return (
    <div>
        <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            // autoPlay={true}
            // interval={3000}
            showArrows={false}
        >
            {
                heroImages.map((image, index) => (
                    <div key={image.alt}>
                        <Image src={image.imgUrl} alt={image.alt} width={284} height={284} className='rounded-xl aspect-square object-cover' />
                    </div>
                ))
            }
        </Carousel>
    </div>
  )
}
