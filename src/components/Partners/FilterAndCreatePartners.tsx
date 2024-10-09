import { FC } from 'react'
import { CustomButton } from '../custom/CustomButton'
import { Archive, ArrowRight, Store } from 'lucide-react'
import { FilterTablePartner } from './FilterTablePartner'
import { PartnerType } from '@/types/partners'
import { UseFormReturn } from 'react-hook-form'
import { ColumnVisibilityModal } from './ColumnVisibilityModal'
import Link from 'next/link'
import { AppRoutes } from '@/lib/routes'

interface FilterAndCreatePartnersProps {
    partners: PartnerType[]
    form: UseFormReturn<any>
    table: import('@tanstack/table-core').Table<PartnerType>
}

export const FilterAndCreatePartners: FC<FilterAndCreatePartnersProps> = ({
    partners,
    form,
    table,
}) => {
    const handleArchive = () => {
        // handle archive
    }
    return (
        <div className="flex justify-between w-full rounded-[18px] lg:bg-white">
            <div className="flex lg:hidden items-center justify-between w-full">
                <h2 className="font-medium text-[1.375rem] text-lynch-950">
                    Liste des partenaires
                </h2>
                <FilterTablePartner partners={partners} form={form} />
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <FilterTablePartner partners={partners} form={form} />
                <ColumnVisibilityModal table={table} />
                <CustomButton
                    size="sm"
                    variant="outline"
                    label="Archive"
                    className="text-lynch-500"
                    onClick={handleArchive}
                    IconRight={Archive}
                />
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <Link href={AppRoutes.newPartner}>
                    <CustomButton
                        size="sm"
                        label="Ajouter un partenaire"
                        IconRight={Store}
                    />
                </Link>
                <CustomButton
                    size="sm"
                    disabled
                    className="disabled:bg-white disabled:opacity-100 text-primary border-[1.5px] border-primary hover:bg-primary/40"
                    label={'1666'}
                    IconLeft={ArrowRight}
                />
            </div>
        </div>
    )
}
