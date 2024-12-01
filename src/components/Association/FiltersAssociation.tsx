import React, { FC } from 'react'
import { Archive, ArrowLeft, ArrowRight, HeartHandshake } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { CustomButton } from '@/components/custom/CustomButton'
import { ColumnVisibilityModal } from '../Partners/ColumnVisibilityModal'
import { FormFilter } from './FormFilter'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/lib/routes'
import { formatNumberWithSpaces } from '@/lib/utils'
import { SchemaFilter } from '@/types/associationSchema'
import { z } from 'zod'

interface FiltersAssociationProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    form: UseFormReturn<any>
    table: import('@tanstack/table-core').Table<any>
    archive: boolean
    handleArchive: () => void
    type?: 'ASSOCIATIONS' | 'SIEGES' | 'USERS'
    totalElements: number
    onSubmit: (data: z.infer<typeof SchemaFilter>) => void
    isFetching?: boolean
}

export const FiltersAssociation: FC<FiltersAssociationProps> = ({
    open,
    setOpen,
    form,
    table,
    archive,
    handleArchive,
    type = 'ASSOCIATIONS',
    totalElements,
    onSubmit,
    isFetching,
}) => {
    const router = useRouter()
    const name =
        type == 'SIEGES'
            ? 'Sièges'
            : type == 'USERS'
            ? 'Collaborateurs des associations'
            : 'Associations'
    return (
        <div className="flex justify-between w-full rounded-[18px] lg:bg-white">
            <div className="flex lg:hidden items-center justify-between w-full">
                <h2 className="font-medium text-[1.375rem] text-lynch-950">
                    Liste des {name}
                </h2>
                <FormFilter
                    form={form}
                    onSubmit={onSubmit}
                    open={open}
                    setOpen={setOpen}
                    archive={archive}
                    type={type}
                />
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <FormFilter
                    form={form}
                    onSubmit={onSubmit}
                    open={open}
                    setOpen={setOpen}
                    archive={archive}
                    type={type}
                />
                <ColumnVisibilityModal table={table} />
                <CustomButton
                    size="sm"
                    variant="outline"
                    label={!archive ? 'Archive' : name}
                    IconRight={!archive ? Archive : ArrowLeft}
                    onClick={handleArchive}
                    disabled={isFetching}
                />
            </div>
            <div className={` lg:flex hidden gap-3 p-2`}>
                <CustomButton
                    size="sm"
                    className={`${type == 'ASSOCIATIONS' ? 'flex' : 'hidden'}`}
                    label="Ajouter une association"
                    IconRight={HeartHandshake}
                    onClick={() =>
                        router.push(
                            AppRoutes.newAssociation.replace(':id', 'new')
                        )
                    }
                    disabled={isFetching}
                />
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
