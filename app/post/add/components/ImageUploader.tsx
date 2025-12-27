"use client"

import { ChangeEvent, useRef } from "react"
import Image from "next/image"

type ImageUploaderProps = {
  onImageChange: (files: FileList) => void
  onRemoveImage: (index: number) => void
  images: string[]
}

export const ImageUploader = ({
  onImageChange,
  onRemoveImage,
  images,
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onImageChange(e.target.files)
      e.target.value = ""
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onImageChange(e.dataTransfer.files)
    }
  }

  return (
    <div className='mt-10'>
      <label className='block text-sm font-semibold text-emerald-300 mb-3'>
        Property Images
      </label>

      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className='hidden'
        accept='image/*'
        multiple
      />

      {/* Upload Box */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className='w-full p-8 border-2 border-dashed border-emerald-600/40 rounded-xl
                   flex flex-col items-center justify-center cursor-pointer
                   bg-[#0b0b0c]/50 backdrop-blur-sm text-emerald-200
                   hover:border-emerald-400 hover:text-emerald-300
                   transition-all shadow-md shadow-emerald-900/20'
      >
        <svg
          className='w-8 h-8 mb-2 text-emerald-400'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 6v6m0 0v6m0-6h6m-6 0H6'
          />
        </svg>

        <span className='text-sm font-medium'>
          Click to upload or drag & drop
        </span>
        <span className='text-xs text-gray-400 mt-1'>
          PNG, JPG, GIF up to 10MB
        </span>
      </div>

      {/* Preview Grid */}
      {images.length > 0 && (
        <div className='mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {images.map((image, index) => (
            <div
              key={index}
              className='relative group bg-[#0f0f0f] rounded-xl border border-emerald-700/30 shadow-md shadow-emerald-900/20'
            >
              <div className='aspect-square overflow-hidden rounded-xl'>
                <Image
                  src={image}
                  alt={`Preview ${index + 1}`}
                  width={200}
                  height={200}
                  className='w-full h-full object-cover rounded-xl'
                />
              </div>

              {/* Remove button */}
              <button
                type='button'
                onClick={e => {
                  e.stopPropagation()
                  onRemoveImage(index)
                }}
                className='absolute top-2 right-2 bg-red-600 hover:bg-red-500 
                           text-white rounded-full p-1 opacity-0 group-hover:opacity-100
                           transition-opacity shadow-lg'
              >
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
