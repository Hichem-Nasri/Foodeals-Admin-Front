// components/BarcodeProcessor.tsx

import React, { useEffect } from 'react'

interface BarcodeProcessorProps {
    imageSrc: File
    onDetected: (code: string) => void
}

const BarcodeProcessor: React.FC<BarcodeProcessorProps> = ({
    imageSrc,
    onDetected,
}) => {
    useEffect(() => {
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
                            onDetected(detectedCodes[0].rawValue)
                        } else {
                            console.log('No barcode detected.')
                        }
                    } else {
                        console.log('BarcodeDetector not supported.')
                    }
                }
            }
            reader.readAsDataURL(imageSrc)
        }

        if (imageSrc) {
            processImage()
        }
    }, [imageSrc, onDetected])

    return null
}

export default BarcodeProcessor
