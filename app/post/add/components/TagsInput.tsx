import { KeyboardEvent } from "react"

export type TagsInputProps = {
  tags: string[]
  tagInput: string
  onTagInputChange: (value: string) => void
  onAddTagKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  onRemoveTag: (tag: string) => void
}

export const TagsInput = ({
  tags,
  tagInput,
  onTagInputChange,
  onAddTagKeyDown,
  onRemoveTag,
}: TagsInputProps) => {
  return (
    <div className='col-span-2'>
      <label className='block text-sm font-semibold text-emerald-300 mb-2'>
        Tags (press Enter to add)
      </label>

      {/* Input */}
      <input
        type='text'
        value={tagInput}
        onChange={e => onTagInputChange(e.target.value)}
        onKeyDown={onAddTagKeyDown}
        placeholder='e.g. Furnished, Parking, Balcony'
        className='w-full px-3 py-2 bg-[#0f0f0f] text-white border border-emerald-600 
                   rounded-lg placeholder:text-gray-500
                   focus:outline-none focus:border-emerald-400'
      />

      {/* Tag Display */}
      <div className='flex flex-wrap gap-2 mt-3'>
        {tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                       bg-emerald-600/20 text-emerald-300 border border-emerald-600/40 
                       backdrop-blur-sm shadow-sm shadow-emerald-900/20'
          >
            {tag}

            <button
              type='button'
              onClick={() => onRemoveTag(tag)}
              className='ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full
                         text-emerald-400 hover:text-emerald-200 hover:bg-emerald-600/30
                         transition-all'
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}
