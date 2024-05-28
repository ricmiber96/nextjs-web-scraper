"use client"
import { scrapeAndStoreProduct } from '@/lib/actions'
import React, { useState } from 'react'
import { Toaster , toast} from 'sonner'

export default function Searchbar() {

    const [search, setSearch] = useState('https://www.amazon.es/LEGO-42165-tbd-Technic-Pull-B1-2024/dp/B0CFVYZRN1/?_encoding=UTF8&pd_rd_w=TQ1Iu&content-id=amzn1.sym.4265858d-ae7a-44b5-8e6a-be0763dde27c%3Aamzn1.symc.cdb151ed-d8fe-485d-b383-800c8b0e3fd3&pf_rd_p=4265858d-ae7a-44b5-8e6a-be0763dde27c&pf_rd_r=F9AXFSY52FJFTEXPFT72&pd_rd_wg=1JtEM&pd_rd_r=ab3a66bf-7aa3-402f-9bf6-762dce3da648&ref_=pd_hp_d_atf_ci_mcx_mr_hp_atf_m&th=1')
    const [loading, setLoading] = useState(false)

    const isValidAmazonLink = (link: string) => {
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
            const products = await scrapeAndStoreProduct(search)
            
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
            placeholder='https://www.amazon.com/...' 
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
