import Link from "next/link"

export default function Button({
  name,
  link,
  styles,
}: {
  name: string
  link: string
  styles: string
}) {
  return (
    <div className={styles}>
      <Link href={link}>{name}</Link>
    </div>
  )
}
