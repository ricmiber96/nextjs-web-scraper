import ProductCard from '@/components/ProductCard'
import { getAllProducts, getProductsPaginated } from '@/lib/actions'
import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Pagination from '@/components/Pagination'
export default async function ProductsPage({searchParams}: any) {

    let page = parseInt(searchParams.page)

    console.log("page", page)
    const {products, totalPages, currentPage} = await getProductsPaginated(page)

    const prevPage = page - 1 > 0 ? page - 1 : 1;
    const nextPage = page + 1 > totalPages ? page : page + 1;

    console.log("totalPages", totalPages)
    console.log("currentPage", currentPage)
    console.log("products", products.length)

  return (
    <>
        <section className="flex flex-col gap-10 px-6 md:px-20 md:px-18 py-18 my-8">
            <div className='flex justify-start flex-wrap gap-x-8 gap-y-16'>
            {
            products?.map((product, index) => (
                <ProductCard key={product._id} product={product} />
            ))
            }
            </div>
        </section>
        <Pagination page={page} totalPages={totalPages} currentPage={currentPage} />
    </>
  )
}
