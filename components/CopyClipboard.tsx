"use client"
import Image from 'next/image'
import React from 'react'
import { Toaster, toast } from 'sonner'

export default function CopyClipboard() {
    const handleCopy = () => {
        const link = window.location.href
        if (!link) toast.error('Failed to copy link')
        navigator.clipboard.writeText(window.location.href)
        toast.success('Link copied to clipboard!')
    }
  return (
    <div>
       <Toaster richColors />
       <button onClick={handleCopy} className='p-2 rounded-10 bg-white-200'>
            <Image src='/assets/icons/copy.svg' width={30} height={30} alt='share' />
        </button> 
    </div>

  )
}
