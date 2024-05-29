import HeroCarousel from '@/components/HeroCarousel'
import Searchbar from '@/components/Searchbar'
import Image from 'next/image'
import React from 'react'
import { getAllProducts } from '@/lib/actions'
import ProductCard from '@/components/ProductCard'

export default async function Home() {

  const allProducts = await getAllProducts()

  return (
   <>
    <section className="px-6 md:px-20 py-24">
      <div className='flex max-xl:flex-col gap-16'>
        <div className='flex flex-col justify-centeritems-center'>
          <p className='text-lg flex'>
            Smart Shoppings Here
            <Image src='/assets/icons/arrow-right.svg' width={25} height={16} alt='logo' />
          </p>
          <h1 className='head-text'>
            Welcome to <span className='text-primary'>Smart</span> Shopping
          </h1>
          <p className='text-lg mt-6'>
            Get your shopping list ready and enjoy the best deals
          </p>
          {/* Searchbar */}
          <Searchbar />
        </div>
        {/* Carousel */}
        <div className='hero-carousel'>
          <HeroCarousel />
        </div>
      </div>
    </section>
    <section className='trending-section'>
      <h2 className='section-text flex text-4xl font-bold items-center'>
        <Image src='/assets/icons/fire.svg' width={50} height={60} alt='logo' />
        Trending
      </h2>
      <div className='flex flex-wrap gap-x-8 gap-y-16'>
        {
          allProducts?.map((product, index) => (
              <ProductCard key={product._id} product={product} />
          ))
        }
      </div>
    </section>
   </>
  )
}
