"use client"
import { useState, useEffect } from "react"
import type { Database } from "@/database.types"
import supabase from "@/util/supabase/client"
import { HashLoader } from "react-spinners"
import Card from "./Card"

export default function SellPosts() {
  const [sellData, setSellData] = useState<
    null | Database["public"]["Tables"]["sell_post"]["Row"][]
  >(null)
  useEffect(() => {
    const fetchSellPosts = async () => {
      const { data, error } = await supabase.from("sell_post").select("*")
      if (error) console.log(error)
      setSellData(data)
    }
    fetchSellPosts()
  }, [])

  return (
    <>
      {sellData == null ? (
        <div className='flex flex-col gap-6 items-center justify-center h-100'>
          <HashLoader color='#50C878' />
          Loading
        </div>
      ) : (
        <div className='flex justify-evenly flex-wrap w-full gap-6'>
          {sellData.map(post => (
            <Card data={post} key={post.id} />
          ))}
        </div>
      )}
    </>
  )
}
