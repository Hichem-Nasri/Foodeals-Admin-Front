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
import { FilterTablePartner } from '../Partners/FilterTablePartner'

interface FiltersDeliveriesProps {
    table: import('@tanstack/table-core').Table<any>
    handleArchive: () => void
    archive: boolean
    totalElements: number
    onSubmit: (data: any) => void
    open: boolean
    form: UseFormReturn<any>
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    isFetching?: boolean
}

export const FiltersDeliveries: FC<FiltersDeliveriesProps> = ({
    table,
    archive,
    handleArchive,
    totalElements,
    onSubmit,
    form,
    open,
    setOpen,
    isFetching,
}) => {
    const router = useRouter()
    return (
        <div className="flex justify-between w-full rounded-[18px] lg:bg-white">
            <div className="flex lg:hidden items-center justify-between w-full">
                <h2 className="font-medium text-[1.375rem] text-lynch-950">
                    Liste des livraisons
                </h2>
                <FormFilter
                    form={form}
                    open={open}
                    setOpen={setOpen}
                    onSubmit={onSubmit}
                    type={'DELIVERY_PARTNER&' + `${archive}`}
                />
            </div>
            <div className="lg:flex hidden gap-3 p-2">
                <FormFilter
                    form={form}
                    open={open}
                    setOpen={setOpen}
                    onSubmit={onSubmit}
                    type={'DELIVERY_PARTNER&' + `${archive}`}
                />
                <ColumnVisibilityModal table={table} />
                <CustomButton
                    size="sm"
                    variant="outline"
                    label={archive ? 'Deliveries' : 'Archives'}
                    IconRight={archive ? ArrowLeft : Archive}
                    onClick={handleArchive}
                    disabled={isFetching}
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
