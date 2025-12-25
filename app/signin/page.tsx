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

    // redirect or update state
  }

  return (
    <div className='flex flex-col justify-center gap-25 items-center h-screen w-screen'>
      <Image src={logo} alt={"Gred"} className='w-1/8' />
      <div className='border border-green-400 rounded-2xl shadow-md shadow-green-300'>
        <form onSubmit={e => onSubmitForm(e)}>
          <div className='flex flex-col items-center justify-center p-10 gap-5'>
            <h2 className='text-green-500 text-2xl uppercase'>Sign In</h2>
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
              className='bg-[#111] text-center w-full py-2 hover:shadow-sm hover:shadow-green-100 cursor-pointer'
              value='Submit'
            />
            <div className='p-3 bg-[#111] rounded-2xl'>
              <AuthButton image='/google-icon-logo.svg' onClick={googleAuth} />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
