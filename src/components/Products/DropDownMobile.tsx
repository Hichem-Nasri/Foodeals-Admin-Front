import React, { FC } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
    FileSpreadsheet,
    ImagePlus,
    ListTodo,
    Plus,
    QrCode,
} from 'lucide-react'
import { CustomButton } from '../custom/CustomButton'
import Link from 'next/link'
import { AppRoutes } from '@/lib/routes'
import { NewImageProduct } from './newProducts/newImage'
import { useState } from 'react'
// import AppRouter from 'next/dist/client/components/app-router';

interface DropDownListProps {
    list: {
        label: string
        href: string
        icon: any
    }[]
    children: React.ReactNode
    setSheet: React.Dispatch<React.SetStateAction<boolean>>
    setImage: React.Dispatch<React.SetStateAction<boolean>>
    isMobile?: boolean
}

const DropDownListMobile: FC<DropDownListProps> = ({
    list,
    children,
    setSheet,
    setImage,
    isMobile = false,
}) => {
    const style =
        'flex items-center gap-[10px] justify-between w-full text-white bg-primary rounded-[18px] p-[20px]'
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-[16px] bg-transparent border-0 shadow-none drop-shadow-none p-0 px-0 py-0 gap-0">
                <div className="flex flex-col gap-0 px-2 bg-transparent w-full">
                    <DropdownMenuItem>
                        <Link href={AppRoutes.newProduct} className={style}>
                            <span>AJOUTER UN PRODUIT</span>
                            <Plus size={22} />
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <button
                            type="button"
                            onClick={() => {
                                setImage((prev) => !prev)
                            }}
                            className={style}
                        >
                            <span>SCANNER UN PRODUIT</span>
                            <QrCode size={22} />
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <button
                            type="button"
                            onClick={() => setSheet((prev) => !prev)}
                            className={style}
                        >
                            <span>IMPORTER DES PRODUITS</span>
                            <FileSpreadsheet size={22} />
                        </button>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropDownListMobile
