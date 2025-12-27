"use client"
import Image from "next/image"
import type { Database } from "@/database.types"
import { useState } from "react"
import Link from "next/link"

type Sell = Database["public"]["Tables"]["sell_post"]["Row"]
type Rent = Database["public"]["Tables"]["rent_post"]["Row"]

export default function Card({
  data,
  navTo,
}: {
  data: Sell | Rent
  navTo: string
}) {
  const [error, setError] = useState<null | string>(null)

  return (
    <Link
      href={navTo + data.id}
      className='flex flex-col w-72 bg-black/80 backdrop-blur-sm
                 hover:bg-black transition-all duration-300 
                 p-4 rounded-2xl border border-emerald-600/40
                 hover:border-emerald-400 shadow-lg shadow-emerald-900/20
                 hover:shadow-emerald-800/30'
    >
      {/* Image */}
      <div className='h-52 rounded-xl overflow-hidden bg-[#0f0f0f]/80 border border-emerald-900/20'>
        {!error && (
          <Image
            src='/dummy.avif'
            width={100}
            height={100}
            alt='Image'
            onError={() => setError("error")}
            className='w-full h-full object-cover'
          />
        )}
      </div>

      {/* Content */}
      <div className='flex flex-col text-white mt-4 gap-3 h-40 px-1 justify-between'>
        <h3 className='text-xl font-semibold truncate text-emerald-300 tracking-wide'>
          {data.name}
        </h3>

        <p className='text-sm text-gray-300/80 line-clamp-2'>
          {data.description}
        </p>

        <p className='text-left text-xs text-gray-500 uppercase'>
          {data.category}
        </p>

        {"amount" in data ? (
          <div>
            <p className='text-lg font-bold text-emerald-400'>
              {(data as Sell).amount} &#8377;
            </p>
          </div>
        ) : (
          <div className='flex justify-between text-xs font-semibold text-gray-300'>
            <p>Deposit: {data.deposite}</p>
            <p>Rent: {data.rent_amount}</p>
          </div>
        )}
      </div>
    </Link>
  )
}
