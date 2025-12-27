"use client"
import { useState } from "react"
import SellPosts from "./SellPosts"
import RentPosts from "./RentPosts"
export default function Posts() {
  const [choice, setChoice] = useState(0)
  return (
    <>
      <div
        className='rounded-3xl flex justify-evenly gap-2 bg-[#14141a] p-2 mt-10 
              duration-500 border border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-900/30'
      >
        {["Rent", "Sell"].map((ele, i) => (
          <div
            key={i}
            onClick={() => setChoice(i)}
            className={`w-24 text-center py-2 rounded-3xl cursor-pointer select-none 
                transition-all duration-300
                ${
                  choice === i
                    ? "bg-black text-emerald-300 border border-emerald-500 shadow-inner shadow-emerald-700/30"
                    : "bg-[#222] hover:bg-[#1b1b1f] hover:border hover:border-emerald-500"
                }`}
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
