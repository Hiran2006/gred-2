"use client"
import { useParams } from "next/navigation"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Database } from "@/database.types"
import supabase from "@/util/supabase/client"
import { PulseLoader } from "react-spinners"
import Link from "next/link"

type Rent = Database["public"]["Tables"]["rent_post"]["Row"]

export default function ViewPost() {
  const params = useParams<{ id: string }>()
  const [details, setDetails] = useState<Rent | null>(null)
  const [owner, setOwner] = useState<string | null>(null)

  useEffect(() => {
    const fetchDetails = async () => {
      const { data, error } = await supabase
        .from("rent_post")
        .select("*")
        .eq("id", params.id)

      if (error) console.log(error)
      setDetails(data && data[0])
    }
    fetchDetails()
  }, [])

  function getTime() {
    if (details) {
      const date = new Date(details.created_at)
      const now = new Date()
      const diffTime = now.getTime() - date.getTime()
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 0) return "Today"
      if (diffDays === 1) return "Yesterday"
      if (diffDays > 1 && diffDays <= 7) return `${diffDays} days ago`

      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    }
  }

  return (
    <div className='min-h-screen bg-black text-white p-6 flex flex-col items-center'>
      {/* Back Button */}
      <div className='w-full'>
        <Link
          href={"/home"}
          className='inline-block bg-emerald-500 text-black font-semibold 
                     rounded-xl px-5 py-2 text-xl hover:bg-emerald-400 transition'
        >
          ← Back
        </Link>
      </div>

      {/* Content */}
      <div className='mt-10 flex flex-col gap-6 justify-center items-center text-emerald-300 w-full max-w-3xl'>
        <Image
          src='/dummy.avif'
          alt='image'
          width={500}
          height={500}
          loading='eager'
          className='rounded-2xl border border-emerald-700 shadow-xl shadow-emerald-900/40'
        />

        <h3 className='text-5xl font-bold text-emerald-400'>{details?.name}</h3>
        <h5 className='text-gray-400'>{getTime()}</h5>

        <p className='mt-2 text-lg text-gray-200 text-center'>
          {details?.description}
        </p>

        {/* Extra Info Section */}
        <div
          className='bg-[#0b0b0c] border border-emerald-700/40 rounded-2xl 
                        p-6 w-full text-left shadow-lg shadow-emerald-900/20'
        >
          <h4 className='text-2xl text-emerald-400 font-semibold mb-3'>
            Details
          </h4>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-10 text-gray-300'>
            <p>
              <span className='text-emerald-400 font-semibold'>ID:</span>{" "}
              {details?.id}
            </p>
            <p className='flex'>
              <span className='text-emerald-400 font-semibold'>Seller:</span>{" "}
              {owner ? (
                <span>{owner}</span>
              ) : (
                <PulseLoader color='#50C878' className='pl-6' />
              )}
            </p>
            <p>
              <span className='text-emerald-400 font-semibold'>Category:</span>{" "}
              {details?.category}
            </p>
            <p>
              <span className='text-emerald-400 font-semibold'>deposite:</span>{" "}
              {details?.deposite} ₹
            </p>

            <p>
              <span className='text-emerald-400 font-semibold'>rent:</span>{" "}
              {details?.rent_amount} ₹
            </p>
          </div>

          {/* Tag List */}
          {details?.tags && details.tags.length > 0 && (
            <div className='mt-5'>
              <span className='text-emerald-400 font-semibold'>Tags:</span>
              <div className='flex flex-wrap gap-2 mt-2'>
                {details.tags.map((tag, index) => (
                  <span
                    key={index}
                    className='px-3 py-1 text-sm bg-[#151515] text-emerald-300 border border-emerald-600 rounded-lg'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
