import { FC } from 'react'
import { Archive, ArrowRight, HeartHandshake, Truck } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { CustomButton } from '@/components/custom/CustomButton'
import { ColumnVisibilityModal } from '../Partners/ColumnVisibilityModal'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/lib/routes'
import { FormFilter } from './FilterForm'
import { DeliveryType } from '@/types/deliveries'

interface FiltersDeliveriesProps {
    data: DeliveryType[]
    table: import('@tanstack/table-core').Table<any>
    setColumnFilters: (val: any) => void
    setArchive: React.Dispatch<React.SetStateAction<boolean>>
    archive: boolean
}

export const FiltersDeliveries: FC<FiltersDeliveriesProps> = ({
    data,
    table,
    setColumnFilters,
    archive,
    setArchive,
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
                    IconRight={archive ? ArrowRight : Archive}
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
