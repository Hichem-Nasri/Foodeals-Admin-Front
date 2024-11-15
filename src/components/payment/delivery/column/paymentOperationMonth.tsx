import { AvatarAndName } from '@/components/AvatarAndName'
import { CustomButton } from '@/components/custom/CustomButton'
import { PartnerInfoDto, PriceType } from '@/types/GlobalType'
import { ContactDto } from '@/types/partenairUtils'
import { createColumnHelper } from '@tanstack/react-table'
import { Eye } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import React from 'react'

export type OperationMonthDeliveriesType = {
    id: string
    reference: string
    Product: PartnerInfoDto & { type: string }
    price: number
    quantity: number
    vCard: number
    vCash: number
    commission: number
    delivery: PartnerInfoDto
}

export type MultiProductType = {
    product: PartnerInfoDto & { type: string }
    quantity: number
    price: PriceType
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
    columnMultiProduct.accessor('price', {
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
    columnHelperOperationDelivery.accessor('reference', {
        cell: (info) => info.getValue(),
        header: 'Référence',
        footer: (info) => info.column.id,
    }),
    columnHelperOperationDelivery.accessor('Product', {
        cell: (info) => {
            return <span>{info.getValue().name}</span>
        },
        header: 'Produit',
        footer: (info) => info.column.id,
    }),
    columnHelperOperationDelivery.accessor('price', {
        cell: (info) => {
            return <span>{info.getValue()}</span>
        },
        header: 'Prix',
        footer: (info) => info.column.id,
    }),
    columnHelperOperationDelivery.accessor('quantity', {
        cell: (info) => {
            return <span>{info.getValue()}</span>
        },
        header: 'Quantité',
        footer: (info) => info.column.id,
    }),
    columnHelperOperationDelivery.accessor('vCard', {
        cell: (info) => {
            return <span>{info.getValue()}</span>
        },
        header: 'Vente carte',
        footer: (info) => info.column.id,
    }),
    columnHelperOperationDelivery.accessor('vCash', {
        cell: (info) => {
            return <span>{info.getValue()}</span>
        },
        header: 'Vente cash',
        footer: (info) => info.column.id,
    }),
    columnHelperOperationDelivery.accessor('commission', {
        cell: (info) => {
            return <span>{info.getValue()}</span>
        },
        header: 'Commission',
        footer: (info) => info.column.id,
    }),
    columnHelperOperationDelivery.accessor('delivery', {
        cell: (info) => {
            return <span>{info.getValue().name}</span>
        },
        header: 'Livraison',
        footer: (info) => info.column.id,
    }),
    columnHelperOperationDelivery.accessor('id', {
        cell: (info) => {
            const product = info.row.getValue('Product') as PartnerInfoDto & {
                type: string
            }
            return (
                <>
                    {product.type == 'multi' ? (
                        <CustomButton
                            label=""
                            IconRight={Eye}
                            variant="secondary"
                            onClick={() => setMultiProductId(info.getValue())}
                            disabled={product.name != 'multi'}
                            className="[&>.icon]:ml-0 rounded-full text-white bg-lynch-300"
                        />
                    ) : null}
                </>
            )
        },
        header: 'Validation',
        footer: (info) => info.column.id,
    }),
]
