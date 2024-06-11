import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
  product: Product
}

export default function ProductCard({product}: Props) {
  return (
    <Link href={`/products/${product._id}`} className='product-card rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg transform'>
        <div className='product-card_img-container'>
            <Image className='product-card_img' src={product.image} alt={product.title} width={200} height={200}  />
        </div>
        <div className='flex flex-col gap-3 p-4'>
            <h3 className='product-title'>{product.title}</h3>
            <p className='product-card-price text-secondary opacity-50 line-through'>{product.originalPrice}{product.currency}</p>
            <div className='flex justify-between'>
                <p className='text-black opacity-50 text-lg capitalize'>{product.category}</p>
                <p className='text-primary text-lg font-semibold'>
                    <span>{product?.currentPrice}</span>
                    <span>{product?.currency}</span>
                </p>
            </div>
        </div>
    </Link>
  )
}
