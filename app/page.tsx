"use client"
import Link from "next/link"
import BLogo from "@/public/logo_white.png"
import Image from "next/image"
import Buttons from "@/components/button"
export default function Home() {
  return (
    <div className='bg-white dark:bg-black dark:text-white w-screen h-screen flex justify-center items-center'>
      <div className='fixed top-0 left-0 px-10 py-6 w-screen flex justify-between'>
        <h1 className='font-bold text-3xl'>GRED.</h1>
        <div className='flex gap-9'>
          <Link href='/login' className='text-lg'>
            LOGIN
          </Link>
          <Link href='/contact' className='text-lg font-medium mx-10'>
            CONTACT
          </Link>
        </div>
      </div>
      <div className='flex gap-2 w-screen justify-evenly items-center'>
        <div className='w-100'>
          <Image src={BLogo} alt='Logo' />
        </div>
        <div className='w-170'>
          <h3 className='text-6xl font-bold'>
            Welcome to <span className='text-emerald-400'>Gred</span>
          </h3>
          <h2 className='text-3xl mt-6'>
            You can{" "}
            <span>
              <span className='text-orange-300'>Rent</span>,{" "}
              <span className='text-green-400'>Sell</span>
            </span>
          </h2>
          <p className='mt-4'>
            GRED is a dynamic online platform where anyone can buy, sell, or
            rent products with ease. Whether you're an individual with unused
            items or a creator looking to launch a store without any technical
            background, GRED gives you the freedom to build your own market,
            your own way.
          </p>
          <div className='flex mt-15 gap-20 text-2xl'>
            <Buttons
              name='Log In'
              link='/login'
              styles='w-40 leading-10 font-bold bg-white rounded text-black text-center'
            ></Buttons>
            <Buttons
              name='Log Up'
              link='/logup'
              styles='w-40 leading-10 font-bold bg-white rounded text-black text-center'
            ></Buttons>
          </div>
        </div>
      </div>
    </div>
  )
}
