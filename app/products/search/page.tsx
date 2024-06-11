import ProductCard from '@/components/ProductCard'
import { getProductsByName } from '@/lib/actions'
import { Product } from '@/types'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

interface SearchParams {
  params: {
    name: string
  }
  searchParams: {
    name: string;
  }
}
export default async function SearchPage( searchParams: SearchParams) {

  const queryParams = searchParams.searchParams.name;

  if (!queryParams) {
    return <div>Query name parameter is required</div>;
  }

  const products: Product[] = await getProductsByName(queryParams) as Product[];

  if (products.length === 0) {
    return <div>No products found for "{queryParams}"</div>;
  }

  return (
    <section className='px-6 md:px-20 py-24'>
      <div className='flex max-xl:flex-col gap-16 items-center justify-center'>
      <div className='grid grid-cols-4 gap-6'>
        {
          products.map((product: Product, index: number) => (
            <ProductCard key={product._id} product={product} />
          ))
        }
              
      </div>
      </div>
    </section>
  )
}
