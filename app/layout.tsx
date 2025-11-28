"use client"
import "./global.css"
import { Geist } from "next/font/google"

const geist = Geist({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head></head>
      <body className={geist.className + " bg-black text-white"}>
        {children}
      </body>
    </html>
  )
}
