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
    <Link href={link}>
      <div className={styles}>{name}</div>
    </Link>
  )
}
