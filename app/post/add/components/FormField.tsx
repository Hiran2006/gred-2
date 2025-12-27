import { ChangeEvent, ReactNode } from "react"

type FormFieldProps = {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  placeholder?: string
  required?: boolean
  rows?: number
  min?: string | number
  step?: string | number
  children?: ReactNode
  className?: string // 👈 NEW
}

export const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  rows,
  min,
  step,
  children,
  className = "", // 👈 default empty
}: FormFieldProps) => {
  const base =
    "w-full px-4 py-2 bg-[#0f0f0f] text-white border border-emerald-600 rounded-lg " +
    "focus:outline-none focus:border-emerald-400"

  return (
    <div className='flex flex-col gap-1'>
      <label
        htmlFor={name}
        className='block text-sm font-semibold text-emerald-300'
      >
        {label}
        {required && <span className='text-red-500'>*</span>}
      </label>

      {children ? (
        children
      ) : type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows={rows || 3}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${base} min-h-28 ${className}`} // 👈 merged
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          min={type === "number" ? min : undefined}
          step={type === "number" ? step : undefined}
          className={`${base} ${className}`} // 👈 merged
        />
      )}
    </div>
  )
}
