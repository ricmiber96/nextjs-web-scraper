"use client"
import { toggleUserLike } from '@/lib/actions'
import Image from 'next/image'
import React, { useState } from 'react'
import axios from 'axios'

interface Props {
    productId: string
    likesCount: number
    handleToggleLike: () => void
}



export default function ToggleLikeButton({productId,likesCount, handleToggleLike}:Props) {
    
    const [likesNumber, setLikesNumber] = useState(likesCount ? likesCount : 0);

    // const handleLike = async() => {
       
    //     const userId = localStorage.getItem('userId')
    //     console.log("userId", userId)
    //     console.log("productId", productId)
    //     if(userId) {
    //         const product = await toggleUserLike(productId, userId)
    //         console.log("product", product)
    //         setLikesNumber(product?.likes)
    //     }

    // }

    const handleClick = () => {

        handleToggleLike();
      };

  return (
    <button onClick={handleClick} className='product-hearts'>
        <Image className='text-[#D46F77]' src='/assets/icons/heart.svg' width={30} height={30} alt='heart' />
        <div className='text-base w-[15px] font-semibold text-[#D46F77]'>
            {likesCount }
        </div>
    </button>
  )
}
