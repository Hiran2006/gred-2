"use client"
import { useState } from "react"
import SellPosts from "./SellPosts"
import RentPosts from "./RentPosts"
export default function Posts() {
  const [choice, setChoice] = useState(0)
  return (
    <>
      <div className='rounded-3xl flex justify-evenly gap-2 bg-[#14141a] p-2 mt-10 duration-500 border-emerald-500 border text-emerald-400'>
        {["Rent", "Sell"].map((ele, i) => (
          <div
            className={`w-22 text-center py-1 rounded-3xl bg-[#222] hover: border-emerald-500 border cursor-pointer select-none ${
              choice == i ? "bg-black border-0" : null
            }`}
            onClick={() => setChoice(i)}
            key={i}
          >
            {ele}
          </div>
        ))}
      </div>
      <div className='mt-10 p-5 w-screen'>
        {choice == 0 ? <RentPosts /> : <SellPosts />}
      </div>
    </>
  )
}
