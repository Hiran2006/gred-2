import Image from "next/image"
import logo from "@/public/pattern_logo.png"
import Posts from "./components/Posts"
export default function Home() {
  return (
    <div className='flex justify-center flex-col items-center '>
      <Image src={logo} alt='' className='w-1/5 mt-10' />
      <div className='mt-10 rounded-3xl flex items-center justify-center bg-[#111] w-1/3 h-10 border border-emerald-500'>
        <input
          id='search'
          type='text'
          name='search'
          className='w-full rounded-3xl text-white mx-3 px-2 outline-none'
        />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='rounded-r-3xl bg-[#222] p-2 w-10 border-l border-emerald-400'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
          />
        </svg>
      </div>
      <Posts />
    </div>
  )
}
