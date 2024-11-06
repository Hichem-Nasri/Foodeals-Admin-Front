import { ChevronLeft } from 'lucide-react'
import React, { FC } from 'react'
import { DialogClose } from '../ui/dialog'

interface MobileHeaderProps {
    onClick: () => void
    title: string
    buttonType?: 'dialog' | 'button'
}

const MobileHeader: FC<MobileHeaderProps> = ({
    title,
    onClick,
    buttonType = 'button',
}) => {
    return (
        <div className="lg:hidden flex justify-between gap-5 items-center border-b-2 w-full border-primary px-2 py-3 bg-white">
            {buttonType === 'button' ? (
                <button className="text-lynch-400" onClick={onClick}>
                    <ChevronLeft size={24} />
                </button>
            ) : (
                <DialogClose onClick={onClick}>
                    <ChevronLeft size={24} />
                </DialogClose>
            )}
            <h1 className="text-lynch-950">{title}</h1>
        </div>
    )
}

export default MobileHeader
