'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
  onBlur: () => void
}

export function ImageUpload({ value, onChange, onBlur }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      setPreview(reader.result as string)
      onChange(reader.result as string)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }, [onChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.svg']
    },
    maxFiles: 1,
    multiple: false
  })

  const removeImage = () => {
    setPreview(null)
    onChange('')
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
          isDragActive ? 'border-primary' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} onBlur={onBlur} />
        {preview ? (
          <div className="relative w-40 h-40 mx-auto">
            <Image
              src={preview}
              alt="Preview"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        ) : (
          <p>Drag & drop an image here, or click to select one</p>
        )}
      </div>
      {preview && (
        <Button onClick={removeImage} variant="outline">
          Remove Image
        </Button>
      )}
    </div>
  )
}

