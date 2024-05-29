import Image from 'next/image'
import React from 'react'

interface Props {
    title: string
    iconSrc: string
    value: string
    borderColor: string
    }

export default function PriceInfoCard({title, iconSrc, value, borderColor}:Props) {
  return (
    <div className={`price-info_card border-2 bg-[${borderColor}] rounded-lg p-6`}>
        <p className='text-base text-secondary'>{title}</p>
        <div className='flex gap-1'>
            <Image src={iconSrc} width={30} height={30} alt={title} />
            <p className='text-2xl text-secondary font-bold'>{value}</p>
        </div>
    </div>
  )
}
