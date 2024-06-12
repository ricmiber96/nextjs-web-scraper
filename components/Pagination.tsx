import Image from 'next/image'
import Link from 'next/link'
import React, { Component } from 'react'

type Props = {
    page: number
    totalPages: number
    currentPage: number
}

export default function Pagination ({page, totalPages, currentPage}: Props) {

    const totalBlocks =  Math.ceil(totalPages / 5)
    const actualBlock = Math.ceil(currentPage / 5)
    const prevPage = page - 1 > 0 ? page - 1 : 1;
    const nextPage = page + 1 > totalPages ? page : page + 1;

    const start = (actualBlock - 1) * 5 + 1
    const end = start + 4 <= totalPages ? start + 4 : totalPages
    const pages = Array.from({ length: end - start + 1}, (v, i) => start + i)

    console.log("totalBlocks", totalBlocks)
    console.log("actualBlock", actualBlock)
    console.log("start", start)
    console.log("end", end)
    console.log("pages", pages)

    return (
        <div>
        <ul className="flex flex-row items-center justify-center gap-2 mb-8">
          <li>
            <Link
              className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
              href={`?page=${prevPage}`}
              aria-label="Previous"
              aria-disabled={page === 1 ? true : false}
            >
              <Image src="/assets/icons/arrow-prev.svg" width={20} height={20} alt="arrow-left" />
            </Link>
          </li>
          {
              pages.map((pageNumber) => (
                  <li key={pageNumber}>
                    <Link
                      className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-transparent p-0 text-sm ${
                        pageNumber === currentPage ? "text-secondary font-semibold bg-orange-300" : "text-secondary  hover:bg-orange-400"
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
    ) 
}
