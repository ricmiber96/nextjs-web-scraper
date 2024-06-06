"use client"
import React, { Fragment } from 'react'
import { Button, Description, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { useState } from 'react'
import Image from 'next/image'
import { addUserEmailToProduct } from '@/lib/actions'

interface Props {
  productId: string
}


export default function Modal({ productId}: Props) {

    let [isOpen, setIsOpen] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');

    const openModal = () => { setIsOpen(true) }
    const closeModal = () => { setIsOpen(false) }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      console.log("productId", productId)
      console.log("email", email)
      await addUserEmailToProduct(productId, email);
      setIsSubmitting(false);
      setEmail('');
      closeModal();
    }

  return (
    <>
       <Button
        onClick={openModal}
        className="btn"
      >
        Track
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
            <DialogPanel className="max-w-lg space-y-4 bg-white rounded-lg p-8">
                <div className='flex flex-col'>
                    <div className='flex justify-between'>
                        <Image src='/assets/icons/logo.svg' width={50} height={50} alt='close' />
                        <Button className='p-2 rounded-10 bg-white-200 cursor-pointer' onClick={closeModal}>
                        <Image src='/assets/icons/cross.svg' width={30} height={30} alt='more' />
                        </Button>
                    </div>             
                    <h4 className="dialog-head_text">
                    Stay updated with product pricing alerts right in your email!
                  </h4>

                  <p className="text-sm text-gray-600 mt-2">
                    Never miss a bargain again with our timely alerts!
                  </p>
                  <form className="flex flex-col  mt-6" onSubmit={handleSubmit}>
                        <label htmlFor="email" className="text-md text-gray-600 font-medium">
                            Email Address
                        </label>
                        <div className='dialog-input_container'>
                            <Image src='/assets/icons/mail.svg' width={30} height={30} alt='email' />
                            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)}  required placeholder="Enter your email" className="dialog-input" />
                        </div>
                        <button type="submit" className="dialog-btn">
                            {isSubmitting ? 'Submitting...' : 'Track'}
                        </button>
                    </form>
            </div>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
    
    </>
  )
}
