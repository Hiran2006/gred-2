"use client"
import Link from "next/link"
import BLogo from "@/public/logo_white.png"
import Image from "next/image"
import Buttons from "@/components/button"
import { motion } from "motion/react"
export default function Home() {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='fixed top-0 left-0 px-10 py-6 w-screen flex justify-between'>
        <motion.h2
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className='font-bold text-3xl'
        >
          GRED.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className='flex gap-9'
        >
          {/* <Link href='/login' className='text-lg'>
            LOGIN
          </Link> */}
          <Link href='/contact' className='text-lg font-medium mx-10'>
            CONTACT
          </Link>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 10 }}
        className='flex gap-60 w-screen justify-center items-center flex-col mt-40 md:flex-row md:mt-0'
      >
        <motion.div
          className='w-100'
          initial={{ opacity: 0, rotate: -360 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1 }}
        >
          <Image src={BLogo} alt='Logo' width={2000} height={2000} />
        </motion.div>
        <div className='w-170'>
          <h3 className='text-6xl font-bold'>
            Welcome to <span className='text-emerald-400'>Gred</span>
          </h3>
          <h2 className='text-3xl mt-6'>
            You can{" "}
            <span>
              <span className='text-orange-300'>Rent</span>{" "}
              <span className='text-yellow-300'> & </span>
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
          <motion.div
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
            className='flex mt-15 gap-20 text-2xl items-center'
          >
            <Buttons
              name='Sign In'
              link='/signin'
              styles='w-40 leading-10 h-10 bg-black text-white text-center border-white border'
            />
            <Buttons
              name='Sign Up'
              link='/signup'
              styles='w-40 leading-10 h-10 font-bold bg-white rounded text-black text-center'
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
