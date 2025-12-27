"use client"
import { useState, useEffect } from "react"
import type { Database } from "@/database.types"
import supabase from "@/util/supabase/client"
import { HashLoader } from "react-spinners"
import Card from "./Card"

export default function RentPosts() {
  const [rentData, setRentData] = useState<
    null | Database["public"]["Tables"]["rent_post"]["Row"][]
  >(null)
  useEffect(() => {
    const fetchSellPosts = async () => {
      const { data, error } = await supabase.from("rent_post").select("*")
      if (error) console.log(error)
      setRentData(data)
    }
    fetchSellPosts()
  }, [])

  return (
    <>
      {rentData == null ? (
        <div className='flex flex-col gap-6 items-center justify-center h-100'>
          <HashLoader color='#50C878' />
          Loading
        </div>
      ) : (
        <div className='flex justify-evenly flex-wrap w-full gap-6'>
          {rentData.map(post => (
            <Card data={post} key={post.id} navTo={"/rent_post/view/"} />
          ))}
        </div>
      )}
    </>
  )
}
