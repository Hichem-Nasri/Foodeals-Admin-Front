import { AvatarAndName } from '@/components/AvatarAndName'
import { CustomButton } from '@/components/custom/CustomButton'
import { PartnerInfoDto, PriceType } from '@/types/GlobalType'
import { ContactDto } from '@/types/partenairUtils'
import { createColumnHelper } from '@tanstack/react-table'
import { CupSoda, Eye, SortDesc } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import React from 'react'

// export type OperationMonthDeliveriesType = {
//     id: string
//     ref: string
//     Product: PartnerInfoDto & { type: string }
//     price: number
//     quantity: number
//     vCard: number
//     vCash: number
//     commission: number
//     delivery: PartnerInfoDto
// }

export interface OperationMonthDeliveriesType {
    ref: string
    type: string
    product: Product
    id: string
    amount: PriceType
    quantity: number
    cashAmount: PriceType
    cardAmount: PriceType
    commission: PriceType
    deliveryBoy: PartnerInfoDto
}

export interface Product {
    name: string
    avatarPath: string
}

export type MultiProductType = {
    product: PartnerInfoDto & { type: string }
    quantity: number
    amount: PriceType
}

const columnMultiProduct = createColumnHelper<MultiProductType>()

export const columnsMultiProductTable = () => [
    columnMultiProduct.accessor('product', {
        cell: (info) => {
            return (
                <AvatarAndName
                    name={info.getValue().name}
                    avatar={info.getValue().avatarPath}
                />
            )
        },
        header: 'Produit',
        footer: (info) => info.column.id,
    }),
    columnMultiProduct.accessor('quantity', {
        cell: (info) => {
            return <span>{info.getValue()}</span>
        },
        header: 'Quantité',
        footer: (info) => info.column.id,
    }),
    columnMultiProduct.accessor('amount', {
        cell: (info) => {
            return <span>{info.getValue().amount}</span>
        },
        header: 'Prix',
        footer: (info) => info.column.id,
    }),
]

const columnHelperOperationDelivery =
    createColumnHelper<OperationMonthDeliveriesType>()

export const columnsOperationDeliveryTable = (
    router: AppRouterInstance,
    setMultiProductId: React.Dispatch<React.SetStateAction<string>>
) => [
    columnHelperOperationDelivery.accessor('ref', {
        cell: (info) => {
            const id =
                info.row.original.id.slice(0, 4) +
                info.row.original.id.slice(-4)
            return <span className="min-h-16">{id}</span>
        },
        header: 'Référence',
        footer: (info) => info.column.id,
    }),
    columnHelperOperationDelivery.accessor('product', {
        cell: (info) => {
            const type = info.row.original.type
            if (type == 'MULTIPLE') {
                return (
                    <div className="flex justify-start items-center min-w-44 ">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex justify-center items-center mr-2">
                            <CupSoda />
                        </div>
                        <span className="text-sm font-normal tex-w">
                            Produit Multiple
                        </span>
                    </div>
                )
            }
            return (
                <AvatarAndName
                    name={info.getValue().name}
                    avatar={info.getValue().avatarPath}
                />
            )
        },
        header: 'Produit',
        footer: (info) => info.column.id,
    }),
    columnHelperOperationDelivery.accessor('amount', {
        cell: (info) => {
            return (
                <span>
                    {info.getValue().amount + ' ' + info.getValue().currency}
                </span>
            )
        },
        header: 'Prix',
        footer: (info) => info.column.id,
    }),
    columnHelperOperationDelivery.accessor('quantity', {
        cell: (info) => {
            return <span>x{info.getValue()}</span>
        },
        header: 'Quantité',
        footer: (info) => info.column.id,
    }),
    columnHelperOperationDelivery.accessor('cardAmount', {
        cell: (info) => {
            return (
                <span>
                    {info.getValue().amount > 0
                        ? info.getValue().amount
                        : 'N/A'}
                </span>
            )
        },
        header: 'V. par carte',
        footer: (info) => info.column.id,
        minSize: 100,
    }),
    columnHelperOperationDelivery.accessor('cashAmount', {
        cell: (info) => {
            return (
                <span>
                    {info.getValue().amount > 0
                        ? info.getValue().amount
                        : 'N/A'}
                </span>
            )
        },
        header: 'V. par cash',
        footer: (info) => info.column.id,
    }),
    columnHelperOperationDelivery.accessor('commission', {
        cell: (info) => {
            return (
                <span>
                    {info.getValue().amount > 0
                        ? info.getValue().amount
                        : 'N/A'}
                </span>
            )
        },
        header: 'Commission',
        footer: (info) => info.column.id,
    }),
    columnHelperOperationDelivery.accessor('deliveryBoy', {
        cell: (info) => {
            return (
                <AvatarAndName
                    name={info.getValue().name}
                    avatar={info.getValue().avatarPath}
                />
            )
        },
        header: 'Nom du livreur',
        footer: (info) => info.column.id,
    }),
    columnHelperOperationDelivery.accessor('type', {
        cell: (info) => null,
        header: '',
        footer: (info) => info.column.id,
    }),
    columnHelperOperationDelivery.accessor('id', {
        cell: (info) => {
            const type = info.row.original.type
            return (
                <>
                    {type == 'MULTIPLE' ? (
                        <div className="w-full justify-center flex items-center">
                            <CustomButton
                                label=""
                                IconRight={Eye}
                                variant="ghost"
                                onClick={() =>
                                    setMultiProductId(info.getValue())
                                }
                                className="[&>.icon]:ml-0 rounded-full text-white bg-lynch-300 hover:bg-lynch-300 hover:text-white size-10 cursor-pointer"
                            />
                        </div>
                    ) : null}
                </>
            )
        },
        header: 'plus',
        footer: (info) => info.column.id,
    }),
]
