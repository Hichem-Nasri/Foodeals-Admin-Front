import React, { FC } from 'react'
import FilterTableSupport from './FilterTableSupport'
import { table } from 'console'
import {
    ListTodo,
    ArrowRight,
    MessageCircle,
    MessageCircleMore,
} from 'lucide-react'
import image from 'next/image'
import { CustomButton } from '../custom/CustomButton'
import { ColumnVisibilityModal } from '../Partners/ColumnVisibilityModal'
import DropDownList from '../Products/DropDownList'
import { NewImageProduct } from '../Products/newProducts/newImage'
import { SheetProduct } from '../Products/newProducts/SheetProduct'
import { AppRoutes } from '@/lib/routes'

interface TopBarSupport {
    data: any
    columnFilters: any
    setColumnFilters: any
    table: any
    router: any
}

const TopBar: FC<TopBarSupport> = ({
    data,
    columnFilters,
    setColumnFilters,
    table,
    router,
}) => {
    return (
        <div className="flex justify-between w-full rounded-[18px] lg:bg-white">
            <div className="flex lg:hidden items-center justify-start space-x-4 lg:space-x-0 w-full">
                <h2 className="font-medium text-[1.375rem] text-lynch-950 mx-4  ">
                    Liste des supports
                </h2>
                <FilterTableSupport
                    data={data}
                    table={table}
                    columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                />
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <FilterTableSupport
                    data={data}
                    table={table}
                    columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                />
                <ColumnVisibilityModal table={table} />
            </div>
            <div className="lg:flex hidden gap-3 p-2 px-4">
                <CustomButton
                    label="Nouveau support"
                    size="sm"
                    IconRight={MessageCircleMore}
                    onClick={() => router.push(AppRoutes.supportDetails)}
                />
                <CustomButton
                    disabled
                    size="sm"
                    className="disabled:bg-white disabled:opacity-100 font-semibold text-lynch-400 border-[1.5px] border-lynch-400"
                    label={'1666'}
                    IconLeft={ArrowRight}
                />
            </div>
        </div>
    )
}

export default TopBar
