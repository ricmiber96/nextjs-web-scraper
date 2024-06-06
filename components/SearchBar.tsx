"use client"
import { Button, Dialog, DialogPanel, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { Fragment, useState } from 'react'

export default function SearchBar() {

    const [search, setSearch] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter();

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("searching...")
        try {
            // Redirect to the search page with the query parameter
            router.push(`/products/search?name=${encodeURIComponent(search)}`);
            closeModal()
        } catch (error) {
            console.error("Failed to search products", error)
        }
    }




  return (
    <>
    <Button onClick={openModal}>
        <Image src='/assets/icons/search.svg' width={26} height={26} alt='search' />
    </Button>
    <Transition
        show={isOpen}
        as={Fragment}
        appear
        enter="duration-200 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-300 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog onClose={() => setIsOpen(false)} className="dialog-container rounded-lg">
        <div className="fixed inset-0 flex w-screen min-h-screen items-center justify-center px-4">
        <DialogPanel className='max-w-4xl min-w-xl w-11/12 mx-auto'>
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                    <Image src='/assets/icons/search.svg' width={20} height={20} alt='search' />
                </div>
            <form className="flex-1" onSubmit={handleSubmit}>
                <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                id="search"
                onChange={(e)=> setSearch(e.target.value)}
                placeholder="Search product by name..." /> 
    
            </form>
            </div>
        </DialogPanel>
        </div>
        </Dialog>
        </Transition>
    </>
  )
}
