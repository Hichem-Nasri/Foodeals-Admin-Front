import { FC } from 'react'
import {
    Archive,
    ArrowLeft,
    ArrowRight,
    HeartHandshake,
    Truck,
} from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { CustomButton } from '@/components/custom/CustomButton'
import { ColumnVisibilityModal } from '../Partners/ColumnVisibilityModal'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/lib/routes'
import { FormFilter } from './FilterForm'
import { DeliveryType } from '@/types/deliveries'
import { formatNumberWithSpaces } from '@/lib/utils'

interface FiltersDeliveriesProps {
    data: DeliveryType[]
    table: import('@tanstack/table-core').Table<any>
    setColumnFilters: (val: any) => void
    setArchive: React.Dispatch<React.SetStateAction<boolean>>
    archive: boolean
    totalElements: number
}

export const FiltersDeliveries: FC<FiltersDeliveriesProps> = ({
    data,
    table,
    setColumnFilters,
    archive,
    setArchive,
    totalElements,
}) => {
    const router = useRouter()
    return (
        <div className="flex justify-between w-full rounded-[18px] lg:bg-white">
            <div className="flex lg:hidden items-center justify-between w-full">
                <h2 className="font-medium text-[1.375rem] text-lynch-950">
                    Liste des livraisons
                </h2>
                <FormFilter data={data} setColumnFilters={setColumnFilters} />
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <FormFilter data={data} setColumnFilters={setColumnFilters} />
                <ColumnVisibilityModal table={table} />
                <CustomButton
                    size="sm"
                    variant="outline"
                    label={archive ? 'Deliveries' : 'Archives'}
                    IconRight={archive ? ArrowLeft : Archive}
                    onClick={() => setArchive((prev: boolean) => !prev)}
                />
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <CustomButton
                    size="sm"
                    label="Ajouter une ste de livraison"
                    IconRight={Truck}
                    onClick={() =>
                        router.push(AppRoutes.newDelivery.replace(':id', 'new'))
                    }
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
