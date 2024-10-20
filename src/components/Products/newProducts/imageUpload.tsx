'use client'
import { PictureInPicture, X } from 'lucide-react'
import { useState, useRef } from 'react'

export function ImageUpload() {
    const [image, setImage] = useState<File | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault() // Prevent default to allow drop
        e.stopPropagation()
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const files = e.dataTransfer.files
        if (files && files.length > 0) {
            setImage(files[0])
        }
    }

    const handleClick = () => {
        if (inputRef.current) inputRef.current.click()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            setImage(files[0])
        }
    }

    return (
        <div
            className="relative w-full h-48 rounded-md outline-dashed outline-2 hover:outline outline-lynch-400 border-gray-300 overflow-hidden cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-lynch-50"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                hidden
                onChange={handleChange}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                {image ? (
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Uploaded Image"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex justify-center items-center space-x-2 text-lynch-400">
                        <PictureInPicture size={48} />
                        <div className="flex flex-col items-start text-black font-light text-xs">
                            <p>Faites glisser une image ici ou</p>
                            <p className="text-sm text-mountain-400 underline-offset-1 underline">
                                importez une image
                            </p>
                        </div>
                    </div>
                )}
            </div>
            {image && (
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-500 z-10 bg-slate-200 rounded-full"
                    onClick={() => setImage(null)}
                >
                    <X size={24} />
                </button>
            )}
        </div>
    )
}
