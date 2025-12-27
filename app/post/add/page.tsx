"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import supabase from "@/util/supabase/client"
import {
  PropertyTypeToggle,
  ImageUploader,
  CommonFields,
  RentFields,
  SellFields,
  TagsInput,
  SubmitSection,
} from "./components"

interface FormErrors {
  title?: string
  category?: string
  rent_amount?: string
  deposit_amount?: string
  price?: string
  location?: string
  contact_number?: string
  description?: string
  images?: string
  tags?: string
  is_active?: string
}

const PHONE_REGEX = /^[0-9]{10}$/
const MIN_DESCRIPTION_LENGTH = 20

export default function AddProperty() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    listingType: "rent" as "rent" | "sell",
    category: "",
    location: "",
    contact_number: "",
    tags: [] as string[],
    images: [] as string[],
    is_active: true,

    rent_amount: "",
    deposit_amount: "",
    price: "",
  })

  const [tagInput, setTagInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [files, setFiles] = useState<File[]>([])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.category.trim()) newErrors.category = "Category is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"

    if (!formData.contact_number) {
      newErrors.contact_number = "Contact number is required"
    } else if (!PHONE_REGEX.test(formData.contact_number)) {
      newErrors.contact_number = "Please enter a valid 10-digit phone number"
    }

    if (
      !formData.description ||
      formData.description.length < MIN_DESCRIPTION_LENGTH
    ) {
      newErrors.description = `Description must be at least ${MIN_DESCRIPTION_LENGTH} characters long`
    }

    if (files.length === 0) {
      newErrors.images = "Please upload at least one image"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddTag = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && tagInput.trim()) {
        e.preventDefault()
        const newTag = tagInput.trim()
        if (!formData.tags.includes(newTag)) {
          setFormData(prev => ({
            ...prev,
            tags: [...prev.tags, newTag],
          }))
        }
        setTagInput("")
      }
    },
    [tagInput, formData.tags]
  )

  const removeTag = useCallback((tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }))
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (files: FileList) => {
    const selectedFiles = Array.from(files)
    const newImages = selectedFiles.map(file => URL.createObjectURL(file))
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }))
    setFiles(prev => [...prev, ...selectedFiles])
  }

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setIsSubmitting(true)

      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) throw new Error("You must be logged in to list a property")

      const fd = new FormData()
      fd.append("title", formData.title)
      fd.append("description", formData.description ?? "")
      fd.append("category", formData.category)
      fd.append("location", formData.location)
      fd.append("contact_number", formData.contact_number ?? "")
      fd.append("is_active", String(formData.is_active ?? true))
      fd.append("token", session.access_token)
      fd.append("tags", JSON.stringify(formData.tags))

      const endpoint =
        formData.listingType === "rent" ? "/api/rent-posts" : "/api/sell-posts"

      if (formData.listingType === "rent") {
        fd.append("rent_amount", String(parseFloat(formData.rent_amount)))
        fd.append(
          "deposit_amount",
          String(
            formData.deposit_amount ? parseFloat(formData.deposit_amount) : 0
          )
        )
      } else {
        fd.append("price", String(parseFloat(formData.price)))
      }

      for (const file of files) {
        fd.append("images", file)
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: fd,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit property")
      }

      router.push("/home")
    } catch (error) {
      console.error("Error submitting property:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTypeChange = (type: "rent" | "sell") => {
    setFormData(prev => ({
      ...prev,
      listingType: type,
      rent_amount: type === "sell" ? "" : prev.rent_amount,
      price: type === "rent" ? "" : prev.price,
      deposit_amount: type === "sell" ? "" : prev.deposit_amount,
    }))
  }

  return (
    <div className='min-h-screen w-full bg-black text-white px-4 sm:px-6 lg:px-8 py-6'>
      <div className='max-w-5xl mx-auto'>
        <h1 className='text-3xl sm:text-4xl font-bold text-emerald-400 mb-10'>
          Add New Property
        </h1>

        <form onSubmit={handleSubmit} className='space-y-10'>
          <div className='flex justify-center'>
            <PropertyTypeToggle
              listingType={formData.listingType}
              onTypeChange={handleTypeChange}
            />
          </div>

          <div className='grid grid-cols-1 gap-10 sm:grid-cols-2'>
            <CommonFields
              values={{
                title: formData.title,
                category: formData.category,
                location: formData.location,
                contact_number: formData.contact_number,
                description: formData.description,
              }}
              errors={{
                title: errors.title,
                category: errors.category,
                location: errors.location,
                contact_number: errors.contact_number,
                description: errors.description,
              }}
              onChange={handleChange}
              minDescriptionLength={MIN_DESCRIPTION_LENGTH}
            />

            {formData.listingType === "rent" ? (
              <RentFields
                values={{
                  rent_amount: formData.rent_amount,
                  deposit_amount: formData.deposit_amount,
                }}
                errors={{
                  rent_amount: errors.rent_amount,
                  deposit_amount: errors.deposit_amount,
                }}
                onChange={handleChange}
              />
            ) : (
              <SellFields
                values={{ price: formData.price }}
                errors={{ price: errors.price }}
                onChange={handleChange}
              />
            )}

            <TagsInput
              tags={formData.tags}
              tagInput={tagInput}
              onTagInputChange={setTagInput}
              onAddTagKeyDown={handleAddTag}
              onRemoveTag={removeTag}
            />
          </div>

          <ImageUploader
            onImageChange={handleImageChange}
            onRemoveImage={handleRemoveImage}
            images={formData.images}
          />

          <SubmitSection
            isSubmitting={isSubmitting}
            canSubmit={formData.images.length > 0}
            imagesError={errors.images}
          />
        </form>
      </div>
    </div>
  )
}
