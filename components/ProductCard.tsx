import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
  product: Product
}

export default function ProductCard({product}: Props) {
  return (
    <Link href={`/products/${product._id}`} className='product-card'>
        <div className='product-card_image-container'>
            <Image className='product-card_image' src={product.image} alt={product.title} width={200} height={200}  />
        </div>
        <div className='flex flex-col gap-3'>
            <h3 className='product-title'>{product.title}</h3>
            <p className='product-card-price'>${product.currentPrice}</p>
            <div className='flex justify-between'>
                <p className='text-black opacity-50 text-lg capitalize'>{product.category}</p>
                <p className='text-black text-lg font-semibold'>
                    <span>{product?.currency}</span>
                    <span>{product?.currentPrice}</span>
                </p>
            </div>
        </div>
    </Link>
  )
}
