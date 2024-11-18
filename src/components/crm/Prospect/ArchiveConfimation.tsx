import { CustomButton } from '@/components/custom/CustomButton'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Archive, X } from 'lucide-react'
import React, { FC } from 'react'

interface ArchiveProps {
    readOnly: boolean
    handleArchiver: () => void
    open?: boolean
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const ArchiveConfimation: FC<ArchiveProps> = ({
    readOnly,
    handleArchiver,
    open,
    setOpen,
}) => {
    return (
        <div
            className={`${
                open == undefined &&
                'bg-white lg:p-5 px-4 py-6 rounded-[14px] flex justify-end items-center'
            }`}
        >
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger
                    className={`${
                        open != undefined ? 'hidden' : 'inline-flex'
                    } `}
                >
                    {open == undefined && (
                        <CustomButton
                            disabled={readOnly}
                            variant="outline"
                            label="Lead Ko"
                            className="bg-coral-50 text-coral-500 border border-coral-500 hover:bg-coral-500 hover:text-coral-50
						transition-all delay-75 duration-100 w-[136px] py-0 px-4 font-normal text-center h-14"
                            IconRight={Archive}
                        />
                    )}
                </DialogTrigger>
                <DialogContent className="p-4 gap-4" showContent={false}>
                    <DialogTitle className="text-lynch-400 w-full justify-between items-center flex ">
                        <h1>Confimation d&apos;archiver</h1>
                        <DialogClose>
                            <X size={24} />
                        </DialogClose>
                    </DialogTitle>
                    <DialogDescription className="flex flex-col gap-4">
                        <h4 className="text-lynch-500">
                            Êtes-vous sûr de vouloir archiver ce prospect ?
                        </h4>
                        <div className="w-full flex items-center justify-center space-x-4">
                            <DialogClose className="w-full">
                                <CustomButton
                                    variant="secondary"
                                    size={'sm'}
                                    label="Annuler"
                                    onClick={() => {
                                        console.log('Annuler')
                                    }}
                                    className="w-full"
                                    IconRight={X}
                                />
                            </DialogClose>
                            <DialogClose className="w-full">
                                <CustomButton
                                    disabled={readOnly}
                                    size={'sm'}
                                    label="Lead Ko"
                                    onClick={() => {
                                        console.log('Archiver')
                                        handleArchiver()
                                    }}
                                    className="bg-coral-500 hover:bg-coral-100 w-full"
                                    IconRight={Archive}
                                />
                            </DialogClose>
                        </div>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ArchiveConfimation
