type SubmitSectionProps = {
  isSubmitting: boolean
  canSubmit: boolean
  imagesError?: string
}

export const SubmitSection = ({
  isSubmitting,
  canSubmit,
  imagesError,
}: SubmitSectionProps) => {
  return (
    <div className='pt-6 border-t border-emerald-700/40 mt-10'>
      <button
        type='submit'
        disabled={isSubmitting || !canSubmit}
        className={`
          w-full rounded-xl py-3 px-6 font-semibold flex items-center justify-center
          transition-all duration-300 
          ${
            !canSubmit || isSubmitting
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-emerald-500 text-black hover:bg-emerald-400 shadow-lg shadow-emerald-900/30 hover:shadow-emerald-800/40"
          }
        `}
      >
        {isSubmitting ? (
          <>
            <svg
              className='animate-spin -ml-1 mr-2 h-5 w-5 text-black'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
            Submitting...
          </>
        ) : !canSubmit ? (
          "Add at least one image"
        ) : (
          "Add Property"
        )}
      </button>

      {imagesError && (
        <p className='mt-2 text-sm text-red-500 text-center'>{imagesError}</p>
      )}
    </div>
  )
}
