import PriceInfoCard from '@/components/PriceInfoCard'
import { getProductById } from '@/lib/actions'
import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from "next/navigation"
import React from 'react'

interface Props {
  params: {
    id: string
  }
}

export default async function ProductDetails({params: {id}}: Props) {

    const product: Product = await getProductById(id)
    if(!product) redirect('/')

  return (
    <div className='product-container'>
        <div className='flex gap-28 xl:flex-row flex-col'>
            <div className='product-image'>
                <Image className='mx-auto' src={product.image} alt={product.title} width={580} height={400} />
            </div>

        <div className='flex-1 flex flex-col'>
            <div className='flex justify-between items-start gap-5 flex-wrap pb-6'>
                <div className='flex flex-col gap-3'>
                    <p className="text-[28px] text-secondary font-semibold">
                        {product.title}
                    </p>
                    <Link href={product.url} target='_blank' className='text-base text-blank opacity-50'>
                        Visit Product
                    </Link>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='product-hearts'>
                        <Image className='text-[#D46F77]' src='/assets/icons/heart.svg' width={30} height={30} alt='heart' />
                        <p className='text-base font-semibold text-[#D46F77]'>{product.reviewsCount}</p>
                    </div>
                    <div className='p-2 rounded-10 bg-white-200'>
                        <Image src='/assets/icons/bookmark.svg' width={30} height={30} alt='bookmark' />
                    </div> 
                    <div className='p-2 rounded-10 bg-white-200'>
                        <Image src='/assets/icons/share.svg' width={30} height={30} alt='share' />
                    </div> 
                </div>
            </div>
            <div className='product-info'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-[34px] text-secondary font-bold'>{product.currency} {product.currentPrice}</p>
                        <p className='text-[34px] text-black opacity-50 line-through'>{product.originalPrice}</p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex gap-3'>
                            <div className='product-stars'>
                                <Image src='/assets/icons/star.svg' width={16} height={16} alt='star' />
                                <p className='text-base font-semibold'>{product.stars || 25}</p>
                            </div>
                            <div className='product-reviews'> 
                                <Image src='/assets/icons/review.svg' width={16} height={16} alt='review' />
                                <p className='text-sm text-secondary font-semibold'>{product.reviewsCount} Reviews</p>
                            </div>
                        </div>
                        <p className='text-sm text-black opacity-50'>
                            <span className='text-primary-green font-semibold'> 93% </span>
                            <span className='text-secondary'>of buyers have recommended this product!</span>
                        </p>
                    </div>
                </div>
                <div className='my-7 flex-col gap-4'>
                    <div className='flex gap-4 flex-wrap'>
                        <PriceInfoCard 
                            title = "Current Price"
                            iconSrc = '/assets/icons/current-price.svg'
                            value={`${product.currentPrice}`}
                            borderColor="#b6dbff"
                        />
                        <PriceInfoCard 
                            title = "Average Price"
                            iconSrc = '/assets/icons/chart.svg'
                            value={`${product.currentPrice}`}
                            borderColor="#b6dbff"
                        />
                        <PriceInfoCard 
                            title = "Highest Price"
                            iconSrc = '/assets/icons/arrow-up.svg'
                            value={`${product.currentPrice}`}
                            borderColor="#b6dbff"
                        />
                        <PriceInfoCard 
                            title = "Lowest Price"
                            iconSrc = '/assets/icons/arrow-down.svg'
                            value={`${product.currentPrice}`}
                            borderColor="#b6dbff"
                        />

                    </div>
                </div>
        </div>
        </div>
    </div>
  )
}
