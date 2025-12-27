import { ChangeEvent } from "react"
import { FormField } from "./FormField"

export type CommonFieldsProps = {
  values: {
    title: string
    category: string
    location: string
    contact_number: string
    description: string
  }
  errors?: Partial<
    Record<
      "title" | "category" | "location" | "contact_number" | "description",
      string
    >
  >
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  minDescriptionLength: number
}

export const CommonFields = ({
  values,
  errors = {},
  onChange,
  minDescriptionLength,
}: CommonFieldsProps) => {
  return (
    <>
      {/* TITLE */}
      <FormField
        label='Title'
        name='title'
        type='text'
        value={values.title}
        onChange={onChange}
        required
        className='bg-[#0f0f0f] text-white border border-emerald-600 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-400'
      />
      {errors.title && (
        <p className='mt-1 text-sm text-red-500'>{errors.title}</p>
      )}

      {/* CATEGORY */}
      <FormField
        label='Category'
        name='category'
        type='text'
        value={values.category}
        onChange={onChange}
        required
        className='bg-[#0f0f0f] text-white border border-emerald-600 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-400'
      />
      {errors.category && (
        <p className='mt-1 text-sm text-red-500'>{errors.category}</p>
      )}

      {/* LOCATION */}
      <FormField
        label='Location'
        name='location'
        type='text'
        value={values.location}
        onChange={onChange}
        required
        className='bg-[#0f0f0f] text-white border border-emerald-600 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-400'
      />
      {errors.location && (
        <p className='mt-1 text-sm text-red-500'>{errors.location}</p>
      )}

      {/* CONTACT NUMBER */}
      <FormField
        label='Contact Number'
        name='contact_number'
        type='tel'
        value={values.contact_number}
        onChange={onChange}
        required
        className='bg-[#0f0f0f] text-white border border-emerald-600 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-400'
      />
      {errors.contact_number && (
        <p className='mt-1 text-sm text-red-500'>{errors.contact_number}</p>
      )}

      {/* DESCRIPTION */}
      <div className='col-span-2'>
        <FormField
          label={`Description (${values.description.length}/${minDescriptionLength}+ characters)`}
          name='description'
          type='textarea'
          value={values.description}
          onChange={onChange}
          required
          className='bg-[#0f0f0f] text-white border border-emerald-600 rounded-lg px-3 py-2 min-h-32 focus:outline-none focus:border-emerald-400'
        />
        {errors.description && (
          <p className='mt-1 text-sm text-red-500'>{errors.description}</p>
        )}
      </div>
    </>
  )
}
