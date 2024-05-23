"use client"
import React from 'react'

export default function Searchbar() {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    }

  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
        <input 
            type='text' 
            placeholder='Enter product link' 
            className='searchbar-input' />
        <button type='submit' className='searchbar-btn'>Search</button>
    </form>
  )
}
