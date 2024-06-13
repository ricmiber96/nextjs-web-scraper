"use client"
import { scrapeAndStoreProduct } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export default function InputTracker() {

    const router = useRouter();
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(typeof window !== 'undefined') {
            const userId = localStorage.getItem('userId')
            if (!userId) {
              localStorage.setItem('userId', uuidv4())
            }
          }
    }, [])

 

    const isValidAmazonLink = (link: string) => {
        console.log("link", link)
        try {
            const parsedUrl = new URL(link)
            const hostname = parsedUrl.hostname
            if (hostname.includes('amazon.') || hostname.includes('amazon.com') || hostname.includes('amazon')) {
                return true
            } 
        }catch(e) {
            return false
        }
        return false
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!search) return toast.error("Please enter a valid Amazon link")
        const isValidLink = isValidAmazonLink(search)
        if (!isValidLink) toast.error("Invalid Amazon Link")
        try {
            setLoading(true)
            // Scrap products
          const scrapedProduct =  await scrapeAndStoreProduct(search)  
          if (scrapedProduct && scrapedProduct.id) {
            toast.success(`Scraped product successfully: ${scrapedProduct.title}`);
            router.push(`/products/${scrapedProduct.id}`);
        } else {
            toast.error("Failed to scrape product");
        } 
        } catch (error) {
            setLoading(false)
        } finally {
            setLoading(false)  
        }
    }

  return (
    <>
    <Toaster richColors />
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
        <input 
            type='text' 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='https://www.amazon.es/...' 
            className='searchbar-input' />

        <button 
            type='submit' 
            className='searchbar-btn'>
            {loading ? 'Searching...' : 'Search'}
        </button>
    </form>
    </>
  )
}
