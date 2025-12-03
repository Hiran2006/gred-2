import type { Dispatch, SetStateAction } from "react"

interface Prop {
  name: string
  imagePath: string
  set: Dispatch<SetStateAction<string>>
  get: string
}
export default function Input(prop: Prop) {
  return (
    <div>
      <div className='flex justify-around bg-[#111] rounded hover:shadow-sm hover:shadow-green-100'>
        <div className='flex justify-center px-3'>
          <svg
            className='fill-current text-green-400 w-6'
            viewBox='0 0 512 512'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d={prop.imagePath} />
          </svg>
        </div>
        <input
          className='p-3'
          type='text'
          value={prop.get}
          onChange={e => prop.set(e.target.value)}
          placeholder={prop.name}
        />
      </div>
    </div>
  )
}
