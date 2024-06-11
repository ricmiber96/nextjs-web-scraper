import ProductCard from '@/components/ProductCard'
import { getAllProducts, getProductsPaginated } from '@/lib/actions'
import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
export default async function ProductsPage({searchParams}: any) {

    let page = parseInt(searchParams.page)

    console.log("page", page)
    const allProducts = await getAllProducts()
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
        <div>
  <ul className="flex flex-row items-center justify-center gap-2 mb-8">
    <li>
      <Link
        className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
        href={`?page=${prevPage}`}
        aria-label="Previous"
        aria-disabled={page === 1 ? "true" : "false"}
      >
        <Image src="/assets/icons/arrow-prev.svg" width={20} height={20} alt="arrow-left" />
      </Link>
    </li>
    {
        Array.from({ length: totalPages }, (v, i) => i + 1).map((pageNumber) => (
            <li key={pageNumber}>
              <Link
                className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-transparent p-0 text-sm ${
                  pageNumber === page ? "text-secondary font-semibold bg-orange-400" : "text-secondary  hover:bg-orange-400"
                } transition duration-150 ease-in-out`}
                href={`?page=${pageNumber}`}
              >
                {pageNumber}
              </Link>
            </li>
        ))
    }

    <li>
      <Link 
        className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
        href={`?page=${nextPage}`}
        aria-label="Next"
      >
         <Image src="/assets/icons/arrow-next.svg" width={20} height={20} alt="arrow-left" />
      </Link>
    </li>
  </ul>
</div>
    </>
  )
}
