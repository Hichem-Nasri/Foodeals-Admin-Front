import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { PictureInPicture, X } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { ImageUpload } from './imageUpload'
import MobileHeader from '@/components/utils/MobileHeader'
import Scanner from '@/components/Scanner'

export const NewImageProduct = ({
    open,
    setOpen,
}: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const [barcode, setBarcode] = useState<string | null>(null)

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    className="min-h-screen w-full lg:min-w-[700px] lg:h-[500px] px-0 lg:px-4 flex flex-col justify-center top-0 translate-y-[0%] lg:translate-y-0 lg:top-1/2 py-0 lg:py-4 gap-0 lg:gap-4"
                    showContent={false}
                >
                    <DialogTitle className="text-lynch-500 lg:flex justify-between items-center  text-wrap text-base font-normal hidden">
                        <span>
                            Importer par une image de produit avec Foodeals Lens
                        </span>
                        <button
                            type="button"
                            onClick={() => setOpen((prev) => !prev)}
                        >
                            <X />
                        </button>
                    </DialogTitle>
                    <MobileHeader
                        title="Scan produits"
                        onClick={() => setOpen((prev) => !prev)}
                    />
                    <DialogDescription className="w-full h-full overflow-auto">
                        {!barcode ? (
                            <Scanner onDetected={(data) => setBarcode(data)} />
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-4">
                                <h1 className="text-lynch-500 text-xl font-medium">
                                    {barcode}
                                </h1>
                            </div>
                        )}
                        <ImageUpload />
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </>
    )
}
