import { FC } from 'react'
import { Archive, ArrowLeft, ArrowRight, HeartHandshake } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { CustomButton } from '@/components/custom/CustomButton'
import { ColumnVisibilityModal } from '../Partners/ColumnVisibilityModal'
import { FormFilter } from './FormFilter'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/lib/routes'

interface FiltersAssociationProps {
    data: any[]
    form: UseFormReturn<any>
    table: import('@tanstack/table-core').Table<any>
    archive: boolean
    handleArchive: () => void
    siege?: boolean
}

export const FiltersAssociation: FC<FiltersAssociationProps> = ({
    data,
    form,
    table,
    archive,
    handleArchive,
    siege = false,
}) => {
    const router = useRouter()
    return (
        <div className="flex justify-between w-full rounded-[18px] lg:bg-white">
            <div className="flex lg:hidden items-center justify-between w-full">
                <h2 className="font-medium text-[1.375rem] text-lynch-950">
                    Liste des {siege ? 'sièges' : 'associations'}
                </h2>
                <FormFilter />
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <FormFilter />
                <ColumnVisibilityModal table={table} />
                <CustomButton
                    size="sm"
                    variant="outline"
                    label={archive ? 'Archive' : 'Associations'}
                    IconRight={archive ? Archive : ArrowLeft}
                    onClick={handleArchive}
                />
            </div>
            <div className={` lg:flex hidden gap-3 p-2`}>
                <CustomButton
                    size="sm"
                    className={`${siege ? 'hidden' : 'flex'}`}
                    label="Ajouter une association"
                    IconRight={HeartHandshake}
                    onClick={() =>
                        router.push(
                            AppRoutes.newAssociation.replace(':id', 'new')
                        )
                    }
                />
                <CustomButton
                    size="sm"
                    variant="outline"
                    className="disabled:border-lynch-400 disabled:text-lynch-500"
                    disabled
                    label={'1666'}
                    IconLeft={ArrowRight}
                />
            </div>
        </div>
    )
}
