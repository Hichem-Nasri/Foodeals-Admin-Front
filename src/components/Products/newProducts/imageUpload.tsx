'use client'
import BarcodeProcessor from '@/components/BarCodeScan'
import { LoaderCircle, PictureInPicture, RotateCcw, X } from 'lucide-react'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { BarcodeDetector } from 'barcode-detector'

export function ImageUpload() {
    const [image, setImage] = useState<File | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
    const [barcode, setBarcode] = useState<string | null>(null)

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault() // Prevent default to allow drop
        e.stopPropagation()
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (image) return // Prevent selecting a new image if one is already selected
        const files = e.dataTransfer.files
        if (files && files.length > 0) {
            setImage(files[0])
        }
    }

    const handleClick = () => {
        if (image) return // Prevent selecting a new image if one is already selected
        if (inputRef.current) inputRef.current.click()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (image) return // Prevent selecting a new image if one is already selected
        const files = e.target.files
        if (files && files.length > 0) {
            setImage(files[0])
        }
    }

    const handleDetected = (code: string) => {
        console.log('Detected code:', code)
        setBarcode(code)
        setErrorMessage(null)
    }

    useEffect(() => {
        if (!image || barcode) return

        const processImage = () => {
            const reader = new FileReader()
            reader.onload = () => {
                const img = new window.Image()
                img.src = reader.result as string

                img.onload = async () => {
                    if ('BarcodeDetector' in window) {
                        const barcodeDetector = new BarcodeDetector({
                            formats: ['code_128', 'ean_13', 'ean_8', 'qr_code'],
                        })
                        const detectedCodes = await barcodeDetector.detect(img)
                        if (detectedCodes.length > 0) {
                            handleDetected(detectedCodes[0].rawValue)
                        } else {
                            console.log('No barcode detected.')
                        }
                    } else {
                        console.log('BarcodeDetector not supported.')
                    }
                }
            }
            reader.readAsDataURL(image)
        }

        if (intervalId) clearInterval(intervalId)
        const newIntervalId = setInterval(processImage, 3000)
        setIntervalId(newIntervalId)

        if (timeoutId) clearTimeout(timeoutId)
        const newTimeoutId = setTimeout(() => {
            setErrorMessage(
                "Aucun code-barres n'a été détecté. Veuillez réessayer."
            )
        }, 30000)
        setTimeoutId(newTimeoutId)

        return () => {
            clearInterval(newIntervalId)
            clearTimeout(newTimeoutId)
        }
    }, [image])

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
                            <div className="w-[262px] h-[286px] relative aspect-square flex justify-center items-center">
                                <Image
                                    src={URL.createObjectURL(image)}
                                    alt="Uploaded Image"
                                    className="aspect-auto  object-cover"
                                    width={150}
                                    height={150}
                                />
                                <div
                                    className="absolute rounded border-t-4 border-l-4 border-primary rounded-tl-[17px] w-12 h-12"
                                    style={{ top: '0', left: '0' }}
                                ></div>
                                <div
                                    className="absolute rounded border-t-4 border-r-4 border-primary rounded-tr-[17px] w-12 h-12"
                                    style={{ top: '0', right: '0' }}
                                ></div>
                                <div
                                    className="absolute rounded border-b-4 border-l-4 border-primary rounded-bl-[17px] w-12 h-12"
                                    style={{ bottom: '0', left: '0' }}
                                ></div>
                                <div
                                    className="absolute rounded border-b-4 border-r-4 border-primary rounded-br-[17px] w-12 h-12"
                                    style={{ bottom: '0', right: '0' }}
                                ></div>
                                <div className="absolute top-0 left-0 right-0 h-full  from w-full mx-auto animate-scan-up-down bg-gradient-to-b from-transparent via-primary/80 to-bg-transparent flex items-center justify-center px-2 ">
                                    <div className="w-full h-1 bg-primary/80 rounded-full"></div>
                                </div>
                            </div>
                            <LoaderCircle
                                className="animate-spin text-primary"
                                size={30}
                            />
                            <h6 className="text-xs">
                                Récupération des données en cours des données
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
        </>
    )
}
