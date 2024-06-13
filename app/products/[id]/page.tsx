"use client"
import CopyClipboard from '@/components/CopyClipboard'
import Loading from '@/components/Loading'
import Modal from '@/components/Modal'
import PriceInfoCard from '@/components/PriceInfoCard'
import ProductCard from '@/components/ProductCard'
import ProductInfo from '@/components/ProductInfo'
import ToggleLikeButton from '@/components/ToggleLikeButton'
import { getProductById, getSimilarProducts, getTrendingProducts, toggleUserLike } from '@/lib/actions'
import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from "next/navigation"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Props {
  params: {
    id: string
  }
}

export default function ProductDetails({params: {id}}: Props) {

    // const product: Product = await getProductById(id)
    // if(!product) redirect('/')

    // const similarProducts = await getSimilarProducts(id)

    const [product, setProduct] = useState<Product>({} as Product)
    const [likes, setLikes] = useState(0);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
        const fetchProduct = async () => {
            const productResult = await getProductById(id)
            setProduct(productResult)
            setLikes(productResult?.likes)
        }       
        fetchProduct()
        setTimeout(() => {
            setLoading(false)
        },2000)
        console.log("product", product)
    }, [id, likes])


    const handleToggleLike = async () => {
        
        const userId = localStorage.getItem('userId')
        console.log("userId", userId)
        console.log("productId", id)
        if(userId) {
            const product = await toggleUserLike(id, userId)
            console.log("product", product)
            setLikes(product?.likes)
            console.log("likes", likes)
        }
      };


//   return (
    
//     <div className='product-container'>
//         <div className='flex gap-28 xl:flex-row flex-col'>
//         <div className="product-image">
//           <Image 
//             src={product.image}
//             alt={product.title}
//             width={580}
//             height={400}
//             className="mx-auto"
//           />
//         </div>

//         <div className='flex-1 flex flex-col'>
//             <div className='flex justify-between items-start gap-5 flex-wrap pb-6'>
//                 <div className='flex flex-col gap-3'>
//                     <p className="text-[28px] text-secondary font-semibold">
//                         {product.title}
//                     </p>
//                     {/* <Link href={product.url} target='_blank' className='text-base text-blank opacity-50'>
//                         Visit Product
//                     </Link> */}
//                 </div>
//                 <div className='flex items-center space-between gap-2'>
//                     <ToggleLikeButton productId={id} likesCount={product.likes} handleToggleLike={handleToggleLike} />
//                     <div className='p-2 rounded-10 bg-white-200'>
//                         <Image src='/assets/icons/bookmark.svg' width={30} height={30} alt='bookmark' />
//                     </div> 
//                     <CopyClipboard />
//                 </div>
//             </div>
//             <div className='flex justify-between'>
//                     <div className='flex flex-col gap-2'>
//                         <p className='text-[34px] text-primary font-bold'><span className=''> {product.currentPrice}</span> {product.currency}</p>
//                         <p className='text-[20px] text-secondary opacity-50 line-through'>{product.originalPrice}{product.currency}</p>
//                     </div>
//                     <div className='flex flex-col gap-4'>
//                         <div className='flex gap-3'>
//                             <div className='product-stars'>
//                                 {
//                                     product.discountRate !== 0 && (
//                                         <p className='text-base font-semibold'> - {product.discountRate} %</p>
//                                     )
//                                 }
                        
//                             </div>
//                             <div className='product-reviews'> 
//                                 <Image src='/assets/icons/review.svg' width={16} height={16} alt='review' />
//                                 <p className='text-sm text-secondary font-semibold'>{product.reviewsCount} Reviews</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='my-7 flex-col gap-4'>
//                     <div className='flex gap-4 flex-wrap'>
//                         <PriceInfoCard 
//                             title = "Current Price"
//                             iconSrc = '/assets/icons/current-price.svg'
//                             value={`${product.currentPrice} ${product.currency}`}
//                             borderColor="#b6dbff"
//                         />
//                         <PriceInfoCard 
//                             title = "Average Price"
//                             iconSrc = '/assets/icons/chart.svg'
//                             value={`${product.averagePrice} ${product.currency}`}
//                             borderColor="#b6dbff"
//                         />
//                         <PriceInfoCard 
//                             title = "Highest Price"
//                             iconSrc = '/assets/icons/arrow-up.svg'
//                             value={`${product.highestPrice} ${product.currency}`}
//                             borderColor="#b6dbff"
//                         />
//                         <PriceInfoCard 
//                             title = "Lowest Price"
//                             iconSrc = '/assets/icons/arrow-down.svg'
//                             value={`${product.lowestPrice} ${product.currency}`}
//                             borderColor="#b6dbff"
//                         />

//                     </div>
//                 </div>
//                 <Modal productId={id}/>
//         </div>
//         </div>
//         <div className='flex flex-col gap-10'>
//             {
//                 product?.description && (
//                     <div>
//                         <div className='flex flex-col gap-5'>
//                             <h3 className='text-2xl text-secondary font-semibold'>Product Description</h3>
//                         </div>
//                         <div className='flex flex-col gap-5'>
//                             {
//                                 product?.description.split('\n')
//                             }
//                         </div>
//                     </div>
//                 )
//             }
//             <button className='btn w-fit mx-auto flex text-white  items-center justify-center gap-3 min-w-[200px]'>
//                 <Image className='  stroke-white text-white' src='/assets/icons/bag.svg' width={30} height={30} alt='check' />
//                 {/* <Link href={product.url} target='_blank' className='text-base text-white'>Buy Now</Link> */}
//             </button>
//         </div>
// {/* 
//         {
//            similarProducts &&  similarProducts?.length > 0 && (
//                 <div className='py-14 flex flex-col gap-2 w-full'>
//                     <p className='text-2xl text-secondary font-semibold'>🛒 Others Products</p>
//                     <div className='flex flex-wrap mt-7 gap-6 w-full'>
//                         {
//                             similarProducts.map((product: Product) => (
//                                 <ProductCard key={product._id} product={product} />
//                             ))
//                         }
//                     </div>
//                 </div>)
//         } */}

//     </div>
//   )

return (
    <div className="">
        {
            loading ? (
                <Loading />
            ) : (
                <ProductInfo product={product} handleToggleLike={handleToggleLike} />
            )
        }
    </div>

    )
}
