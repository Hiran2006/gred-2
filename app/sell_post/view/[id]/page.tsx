"use client"
import { useParams } from "next/navigation"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Database } from "@/database.types"
import supabase from "@/util/supabase/client"
import { data, div } from "motion/react-client"
import Link from "next/link"

type Sell = Database["public"]["Tables"]["sell_post"]["Row"]

export default function ViewPost() {
  const params = useParams<{ id: string }>()
  const [details, setDetails] = useState<Sell | null>(null)
  useEffect(() => {
    const fetchDetails = async () => {
      const { data, error } = await supabase
        .from("sell_post")
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

      // return formatted date if old
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    }
  }

  return (
    <>
      <div className='p-4 m-4'>
        <Link
          href={"/home"}
          className='bg-emerald-300 rounded p-3 text-2xl text-black'
        >
          Back
        </Link>
      </div>

      <div className='flex flex-col gap-4 justify-evenly items-center p-6 text-emerald-300'>
        <Image
          src='/dummy.avif'
          alt='image'
          width={500}
          height={500}
          loading='eager'
          className='rounded-2xl'
        />
        <h3 className='text-5xl'>{details?.name}</h3>
        <h5>{getTime()}</h5>
        <div className='mt-4'>
          <p>{details?.description}</p>
        </div>
      </div>
    </>
  )
}
