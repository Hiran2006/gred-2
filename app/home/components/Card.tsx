"use client"
import Image from "next/image"
import type { Database } from "@/database.types"
import { useState } from "react"
import Link from "next/link"

type Sell = Database["public"]["Tables"]["sell_post"]["Row"]
type Rent = Database["public"]["Tables"]["rent_post"]["Row"]

export default function Card({ data }: { data: Sell | Rent }) {
  const [error, setError] = useState<null | string>(null)
  return (
    <Link
      className='flex flex-col w-75 p-3 bg-[#111] rounded-2xl'
      href={`/sell_post/view/${data.id}`}
    >
      <div className='h-75 rounded-2xl overflow-hidden'>
        {error ? null : (
          <Image
            src='/dummy.avif'
            width={100}
            height={100}
            alt='Image'
            onError={() => setError("error")}
            className='w-full h-full'
          />
        )}
      </div>
      <div className='flex flex-col gap-1 justify-between mt-4 text-emerald-300 text-center h-45'>
        <h3 className='text-2xl truncate px-10'>{data.name}</h3>
        <p>{data.description}</p>
        <p className='text-left ml-5'>{data.category}</p>
        <p className='self-baseline-last'>{(data as Sell).amount} &#8377;</p>
      </div>
    </Link>
  )
}
