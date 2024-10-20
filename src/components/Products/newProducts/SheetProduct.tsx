import { UploadFile } from '@/components/Partners/NewPartner/UploadFile'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { FC } from 'react'

interface SheetProductProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const SheetProduct: FC<SheetProductProps> = ({ open, setOpen }) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-[840px] px-4" showContent={false}>
                <DialogTitle className="text-lynch-500 flex justify-between items-center  text-wrap text-base font-normal">
                    <span>
                        Chargez un fichier Excel et visualisez un récapitulatif
                        des produits avant validation.
                    </span>
                    <button
                        type="button"
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        <X />
                    </button>
                </DialogTitle>
                <DialogDescription className="flex flex-col justify-center items-start space-y-2">
                    <h6 className="text-sm font-semibold text-lynch-950">
                        Ajouter un fichier
                    </h6>
                    <UploadFile placeholder="Charger le fichier" />
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
