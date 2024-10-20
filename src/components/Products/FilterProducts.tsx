import { AppRoutes } from '@/lib/routes'
import { table } from 'console'
import {
    Archive,
    Store,
    ArrowRight,
    UserRoundPlus,
    ListTodo,
    FileSpreadsheet,
    Plus,
    ImageDown,
} from 'lucide-react'
import React, { FC, useState } from 'react'
import { CustomButton } from '../custom/CustomButton'
import { ColumnVisibilityModal } from '../Partners/ColumnVisibilityModal'
import { FilterTablePartner } from '../Partners/FilterTablePartner'
import { Button } from '../ui/button'
import { FilterTableProducts } from './FilterTableProducts'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import DropDownList from './DropDownList'
import { NewImageProduct } from './newProducts/newImage'
import { UploadFile } from '../Partners/NewPartner/UploadFile'
import { SheetProduct } from './newProducts/SheetProduct'

interface FilterProductsProps {
    table: any
    products: any
    setColumnFilters: any
    columnFilters: any
}

const FilterProducts: FC<FilterProductsProps> = ({
    table,
    products,
    setColumnFilters,
    columnFilters,
}) => {
    const [Archiver, setArchiver] = useState(true)
    const handleArchive = () => {
        // set column filters  by status that cancled
        if (Archiver)
            setColumnFilters([
                {
                    id: 'status',
                    value: ['canceled'],
                },
            ])
        else setColumnFilters([])
        setArchiver((prev) => !prev)
    }
    const [open, setOpen] = useState(false)
    const [image, setImage] = useState(false)
    const DropdownMenuList = [
        {
            label: 'Ajouter des produits',
            href: '#',
            icon: FileSpreadsheet,
        },
        {
            label: 'Ajouter manuellement',
            href: AppRoutes.newProduct,
            icon: Plus,
        },
        {
            label: 'Importer par AvatarImage',
            href: '#',
            icon: ImageDown,
        },
    ]
    return (
        <div className="flex justify-between w-full rounded-[18px] lg:bg-white">
            <div className="flex lg:hidden items-center justify-start space-x-4 lg:space-x-0 w-full">
                <h2 className="font-medium text-[1.375rem] text-lynch-950 mx-4  ">
                    Liste des Products
                </h2>
                <FilterTableProducts
                    data={products}
                    table={table}
                    columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                />
                <Button
                    size="sm"
                    className="text-lynch-500 rounded-full bg-white hover:bg-transparent hover:text-black w-14 h-14"
                    onClick={handleArchive}
                >
                    <Archive size={26} />
                </Button>
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <FilterTableProducts
                    data={products}
                    table={table}
                    columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                />
                <ColumnVisibilityModal table={table} />
                <CustomButton
                    size="sm"
                    variant="outline"
                    label={Archiver ? 'Archive' : 'Products'}
                    className="text-lynch-500"
                    onClick={handleArchive}
                    IconRight={Archiver ? Archive : ArrowRight}
                />
            </div>
            <div className="lg:flex hidden gap-3 p-2 px-4">
                <DropDownList
                    list={DropdownMenuList}
                    setSheet={setOpen}
                    setImage={setImage}
                >
                    <CustomButton
                        size="sm"
                        label="Ajouter un Produit"
                        IconRight={ListTodo}
                    />
                </DropDownList>

                <CustomButton
                    size="sm"
                    disabled
                    className="disabled:bg-white text-primary border-[1.5px] border-primary hover:bg-primary/40  "
                    label={table.getRowCount().toString()}
                    IconLeft={ArrowRight}
                />
            </div>
            <NewImageProduct open={open} setOpen={setOpen} />
            <SheetProduct open={image} setOpen={setImage} />
        </div>
    )
}

export default FilterProducts
