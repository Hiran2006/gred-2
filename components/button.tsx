import Link from "next/link"

export default function Button({ name, link }: { name: String; link: String }) {
  return (
    <div className='w-40 leading-10 font-bold bg-white rounded text-black text-center'>
      <Link href={link as unknown as URL}>{name}</Link>
    </div>
  )
}
