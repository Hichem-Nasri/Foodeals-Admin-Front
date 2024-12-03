import React, { FC } from 'react'
import { Archive, ArrowLeft, ArrowRight, HeartHandshake } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { CustomButton } from '@/components/custom/CustomButton'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/lib/routes'
import { formatNumberWithSpaces } from '@/lib/utils'
import { SchemaFilter } from '@/types/associationSchema'
import { z } from 'zod'
import { FormFilterCollaborator } from './FilterCollaborator'
import ArchiveButton from '@/components/custom/ArchiveButton'
import { SchemaCollaborators } from '@/types/collaboratorsUtils'
import { PartnerCollaboratorsFilerSchema } from '@/types/collaborators';

interface FilterUsersProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    form: UseFormReturn<any>
    table: import('@tanstack/table-core').Table<any>
    archive: boolean
    handleArchive: () => void
    type?: 'ASSOCIATIONS' | 'SIEGES' | 'USERS'
    totalElements: number
    onSubmit: (data: z.infer<typeof PartnerCollaboratorsFilerSchema>) => void
    isFetching?: boolean
}

export const FilterUsers: FC<FilterUsersProps> = ({
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
            ? 'Collaborateurs'
            : 'Associations'
    return (
        <div className="flex justify-between w-full rounded-[18px] lg:bg-white">
            <div className="flex lg:hidden items-center justify-between w-full">
                <h2 className="font-medium text-[1.375rem] text-lynch-950">
                    Liste des {name}
                </h2>
                <div className="flex justify-end items-center gap-3">
                    <FormFilterCollaborator
                        form={form}
                        onSubmit={onSubmit}
                        open={open}
                        setOpen={setOpen}
                        archive={archive}
                    />
                    <ArchiveButton
                        archive={archive}
                        isLoading={isFetching!}
                        handleArchive={handleArchive}
                    />
                </div>
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <FormFilterCollaborator
                    form={form}
                    onSubmit={onSubmit}
                    open={open}
                    setOpen={setOpen}
                    archive={archive}
                />
                {/* <ColumnVisibilityModal table={table} /> */}
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
