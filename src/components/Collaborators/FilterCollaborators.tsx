import React, { FC } from 'react'
import { Archive, ArrowLeft, ArrowRight, HeartHandshake } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { CustomButton } from '@/components/custom/CustomButton'
import { ColumnVisibilityModal } from '../Partners/ColumnVisibilityModal'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/lib/routes'
import { formatNumberWithSpaces } from '@/lib/utils'
import { SchemaFilter } from '@/types/associationSchema'
import { z } from 'zod'
import { FormFilterCollaborator } from './FormFilter'

interface FilterCollaboratorsProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    form: UseFormReturn<any>
    table: import('@tanstack/table-core').Table<any>
    archive: boolean
    handleArchive: () => void
    siege?: boolean
    totalElements: number
    onSubmit: (data: z.infer<typeof SchemaFilter>) => void
    isFetching?: boolean
}

export const FilterCollaborators: FC<FilterCollaboratorsProps> = ({
    open,
    setOpen,
    form,
    table,
    archive,
    handleArchive,
    totalElements,
    onSubmit,
    isFetching,
}) => {
    const router = useRouter()
    return (
        <div className="flex justify-between w-full rounded-[18px] lg:bg-white">
            <div className="flex lg:hidden items-center justify-between w-full">
                <h2 className="font-medium text-[1.375rem] text-lynch-950">
                    Liste des Collaborateurs
                </h2>
                <FormFilterCollaborator
                    form={form}
                    onSubmit={onSubmit}
                    open={open}
                    setOpen={setOpen}
                />
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <FormFilterCollaborator
                    form={form}
                    onSubmit={onSubmit}
                    open={open}
                    setOpen={setOpen}
                />
                <ColumnVisibilityModal table={table} />
                <CustomButton
                    size="sm"
                    variant="outline"
                    label={!archive ? 'Archive' : 'Collaborateurs'}
                    IconRight={!archive ? Archive : ArrowLeft}
                    onClick={handleArchive}
                    disabled={isFetching}
                />
            </div>
            <div className={` lg:flex hidden gap-3 p-2`}>
                <CustomButton
                    label={formatNumberWithSpaces(totalElements)}
                    IconLeft={ArrowRight}
                    disabled
                    variant="destructive"
                />
            </div>
        </div>
    )
}
