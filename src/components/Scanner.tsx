// components/Scanner.tsx

import React, { useRef, useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { QrCode } from 'lucide-react'
import { useMediaQuery } from 'react-responsive'

interface ScannerProps {
    onDetected: (code: string) => void
}

const Scanner: React.FC<ScannerProps> = ({ onDetected }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 640px)' })
    const webcamRef = useRef<Webcam>(null)
    const [error, setError] = useState('')
    const [imageSrc, setImageSrc] = useState<string | null>(null)

    const handleBarcodeDetected = (barcode: string) => {
        onDetected(barcode)
    }

    const takeScreenshotAndScan = async () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot()
            setImageSrc(imageSrc)
            console.log('imageSrc', imageSrc)
            if (imageSrc) {
                const img = new Image()
                img.src = imageSrc
                img.onload = async () => {
                    if (window.BarcodeDetector) {
                        const barcodeDetector = new window.BarcodeDetector({
                            formats: ['code_128', 'ean_13', 'ean_8', 'qr_code'],
                        })
                        try {
                            const detectedCodes = await barcodeDetector.detect(
                                img
                            )
                            if (detectedCodes.length > 0) {
                                handleBarcodeDetected(detectedCodes[0].rawValue)
                            } else {
                                setError('No barcode detected.')
                                console.log('No barcode detected.')
                            }
                        } catch (error) {
                            setError('Barcode detection error.')
                            console.error('Barcode detection error:', error)
                        }
                    } else {
                        setError(
                            'Barcode Detector is not supported by this browser.'
                        )
                        console.error(
                            'Barcode Detector is not supported by this browser.'
                        )
                    }
                }
            }
        }
    }

    const videoConstraints = isMobile
        ? { facingMode: { exact: 'environment' } }
        : { facingMode: 'environment' }

    return (
        <div className="relative w-full h-screen flex lg:hidden flex-col justify-center items-center">
            {error && <p className="text-red-500">{error}</p>}
            <div className="absolute inset-0 w-full min-h-full lg:w-96 lg:h-80">
                <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    className="w-full h-full object-cover"
                    onUserMedia={() => console.log('Webcam started')}
                    onUserMediaError={(error: any) => {
                        console.error('Webcam error:', error)
                        setError(
                            'Camera access was denied or is not available.'
                        )
                    }}
                />
            </div>
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="relative w-80 h-52">
                    {/* Corner Borders */}
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

                    {/* Middle Top and Bottom Lines */}
                    <div
                        className="absolute border-t-4 border-primary w-6"
                        style={{ top: '10%', left: 'calc(50% - 12px)' }}
                    ></div>
                    <div
                        className="absolute border-b-4 border-primary w-6"
                        style={{ bottom: '10%', left: 'calc(50% - 12px)' }}
                    ></div>

                    <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent w-64 mx-auto animate-scan-line flex items-center justify-center px-2">
                        <div className="w-full h-1 bg-primary rounded-full"></div>
                    </div>
                </div>
            </div>
            <div
                onClick={takeScreenshotAndScan}
                className="absolute bottom-28 left-1/2 transform -translate-x-1/2 bg-primary hover:bg-mountain-100 hover:text-primary transition-colors text-white font-bold p-4 rounded-full flex items-center justify-center cursor-pointer"
            >
                <QrCode size={28} />
            </div>
        </div>
    )
}

export default Scanner
