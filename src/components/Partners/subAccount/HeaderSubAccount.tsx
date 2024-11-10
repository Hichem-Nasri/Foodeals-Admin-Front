import { FC } from 'react'
import { ArrowRight } from 'lucide-react'
import { ColumnVisibilityModal } from '../ColumnVisibilityModal'
import { CustomButton } from '@/components/custom/CustomButton'
import { FilterSubAccount } from './FilterSubAccount'
import { SubAccountPartners } from '@/types/partnersType'
import { formatNumberWithSpaces } from '@/lib/utils'

interface HeaderSubAccountProps {
    collaborators: SubAccountPartners[]
    table: import('@tanstack/table-core').Table<SubAccountPartners>
    totalElements: number
}

export const HeaderSubAccount: FC<HeaderSubAccountProps> = ({
    collaborators,
    table,
    totalElements,
}) => {
    return (
        <div className="flex justify-between w-full rounded-[18px] lg:bg-white">
            <div className="flex lg:hidden items-center justify-between w-full">
                <h2 className="font-medium text-[1.375rem] text-lynch-950">
                    Liste des sous comptes
                </h2>
                <FilterSubAccount Accounts={collaborators} />
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <FilterSubAccount Accounts={collaborators} />
                <ColumnVisibilityModal table={table} />
            </div>
            <div className="lg:flex hidden gap-3 p-2">
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
