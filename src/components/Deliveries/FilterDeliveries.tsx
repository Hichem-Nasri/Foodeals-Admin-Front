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
    form: UseFormReturn<any>
    table: import('@tanstack/table-core').Table<any>
    setColumnFilters: (val: any) => void
}

export const FiltersDeliveries: FC<FiltersDeliveriesProps> = ({
    data,
    form,
    table,
    setColumnFilters,
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
                    label="Archive"
                    className="flex items-center gap-3 rounded-[12px] border border-lynch-200 text-lynch-500 font-medium text-sm px-5 py-3 hover:text-black hover:bg-neutral-100 h-fit"
                    IconRight={Archive}
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
