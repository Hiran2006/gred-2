import Image from "next/image"
export default function Home() {
  return (
    <div className='flex justify-center'>
      <div className='mt-30 rounded-3xl flex items-center justify-center bg-[#111] w-1/3 h-10'>
        <input
          id='search'
          type='text'
          name='search'
          className='w-full rounded-3xl text-black mx-2 px-2 outline-none'
        />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          className='size-6 m-2'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
          />
        </svg>
      </div>
    </div>
  )
}
