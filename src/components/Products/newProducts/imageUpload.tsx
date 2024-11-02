'use client'
import BarcodeProcessor from '@/components/BarCodeScan'
import { LoaderCircle, PictureInPicture, X } from 'lucide-react'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

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

    const handleDetected = (code: string) => {
        // Handle detected barcode
        console.log('Detected code:', code)
    }

    return (
        <>
            <div
                className="relative w-full h-full rounded-md outline-dashed outline-2 hover:outline outline-lynch-400 border-gray-300 overflow-hidden cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-lynch-50"
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
                        <div className="flex flex-col items-center">
                            <BarcodeProcessor
                                imageSrc={URL.createObjectURL(image)}
                                onDetected={handleDetected}
                            />
                            <div className="w-full h-[200px] relative aspect-square flex justify-center items-center">
                                <Image
                                    src={URL.createObjectURL(image)}
                                    alt="Uploaded Image"
                                    className="aspect-auto  w-full max-h-56 object-cover"
                                    width={150}
                                    height={150}
                                />
                                <div
                                    className="absolute border-t-4 border-l-4 border-primary rounded-tl-lg w-8 h-8"
                                    style={{ top: '10%', left: '10%' }}
                                ></div>
                                <div
                                    className="absolute border-t-4 border-r-4 border-primary rounded-tr-lg w-8 h-8"
                                    style={{ top: '10%', right: '10%' }}
                                ></div>
                                <div
                                    className="absolute border-b-4 border-l-4 border-primary rounded-bl-lg w-8 h-8"
                                    style={{ bottom: '10%', left: '10%' }}
                                ></div>
                                <div
                                    className="absolute border-b-4 border-r-4 border-primary rounded-br-lg w-8 h-8"
                                    style={{ bottom: '10%', right: '10%' }}
                                ></div>
                                <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent w-full mx-auto animate-scan-line flex items-center justify-center px-2">
                                    <div className="w-full h-1 bg-primary rounded-full"></div>
                                </div>
                            </div>
                            <LoaderCircle
                                className="animate-spin text-primary"
                                size={30}
                            />
                            <h6 className="text-xs">
                                Récupération des données en cours des données{' '}
                            </h6>
                        </div>
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
            </div>
            {image && (
                <button
                    className="absolute top-[70px] z-50 right-6 text-gray-400 hover:text-gray-500 bg-slate-200 rounded-full"
                    onClick={() => setImage(null)}
                >
                    <X size={24} />
                </button>
            )}
        </>
    )
}
