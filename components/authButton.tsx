import Image, { StaticImageData } from "next/image"

interface Prop {
  image: string | StaticImageData
  onClick: Function
}
export default function AuthButton(prop: Prop) {
  return (
    <div className='w-8 cursor-pointer' onClick={() => prop.onClick()}>
      <Image src={prop.image} alt='auth' width={50} height={50} />
    </div>
  )
}
