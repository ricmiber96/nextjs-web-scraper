"use client"
import React, { useState } from 'react'
import { Toaster , toast} from 'sonner'

export default function Searchbar() {

    const [search, setSearch] = useState('')
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!search) return toast.error("Please enter a valid Amazon link")
        const isValidLink = isValidAmazonLink(search)
        if (!isValidLink) toast.error("Invalid Amazon Link")
        try {
            setLoading(true)
            // Scrap products
        } catch (error) {
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
            {loading ? 'Loading...' : 'Search'}
        </button>
    </form>
    </>
  )
}
