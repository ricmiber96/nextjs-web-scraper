"use client"
import {useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'

type Props = {
    products: Product[]
}

export default function TrendingProduct({products}: Props) {


//   if(typeof window !== 'undefined') {
//     localStorage.setItem("myCat", "Tom");
//     const userId = localStorage.getItem('userId')
//     if (!userId) {
//       localStorage.setItem('userId', uuidv4())
   
//     }

//     console.log("userId", userId)
//   }

//   useEffect(() => {
//     console.log("products", products)
//   }, [])

  return (
    <div className='flex flex-wrap gap-x-8 gap-y-16'>
    {
      products?.slice(0, 4).map((product, index) => (
          <ProductCard key={product._id} product={product} />
      ))
    }
  </div>
  )
}
