"use client"
import supabase from "@/util/supabase/client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import logo from "@/public/pattern_logo.png"
import Input from "@/components/input"
import AuthButton from "@/components/authButton"
import { FormEvent, useState } from "react"
import { googleAuth } from "./auth"

export default function SignIn() {
  const route = useRouter()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [err, setErr] = useState<string | null>(null)

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Login error:", error.message)
      return
    }
    route.push("/home")
  }

  return (
    <div className='h-screen w-screen bg-black text-white flex flex-col justify-center items-center gap-20'>
      {/* Logo */}
      <Image src={logo} alt='Gred' className='w-80 opacity-90' />

      {/* Form Container */}
      <div className='border border-emerald-500 rounded-2xl shadow-lg shadow-emerald-800/30 bg-[#0c0c0c]/70 backdrop-blur-sm'>
        <form onSubmit={onSubmitForm}>
          <div className='flex flex-col items-center justify-center p-10 gap-6'>
            <h2 className='text-emerald-400 text-3xl font-bold uppercase tracking-wide'>
              Sign In
            </h2>

            <Input
              set={setEmail}
              get={email}
              name='Email'
              imagePath='M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z'
            />

            <Input
              set={setPassword}
              get={password}
              name='Password'
              imagePath='M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z'
            />

            <input
              type='submit'
              value='Submit'
              className='bg-emerald-500 text-black font-bold tracking-wide
                         w-full py-2 rounded-lg mt-2 border border-emerald-300
                         hover:bg-emerald-400 hover:text-black transition-all cursor-pointer'
            />

            {/* Google Auth */}
            <div className='p-3 bg-[#0f0f0f] rounded-2xl shadow-inner shadow-emerald-900/20'>
              <AuthButton image='/google-icon-logo.svg' onClick={googleAuth} />
            </div>

            {/* Error Display */}
            {err && <p className='text-red-400 text-sm mt-1'>{err}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}
