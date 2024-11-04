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

export const NewImageProduct = ({
    open,
    setOpen,
}: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    className="min-w-[700px] h-[500px] px-4 flex flex-col justify-center "
                    showContent={false}
                >
                    <DialogTitle className="text-lynch-500 flex justify-between items-center  text-wrap text-base font-normal">
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
                    <DialogDescription className="w-full h-full">
                        <ImageUpload />
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </>
    )
}
