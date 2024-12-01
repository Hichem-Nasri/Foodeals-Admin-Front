import { AvatarAndName } from '@/components/AvatarAndName'
import { CustomButton } from '@/components/custom/CustomButton'
import { partnerCommissionMonthType } from '@/types/PaymentType'
import { PaymentStatusEnum } from '@/types/paymentUtils'
import { createColumnHelper } from '@tanstack/react-table'
import { CupSoda, Eye } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import React from 'react'

const columnHelperCommissionMonth =
    createColumnHelper<partnerCommissionMonthType>()

export const columnsCommissionMonthTable = (
    router: AppRouterInstance,
    setMultiProductId: React.Dispatch<React.SetStateAction<string>>,
    setValue: React.Dispatch<React.SetStateAction<boolean>>
) => [
    columnHelperCommissionMonth.accessor('ref', {
        cell: (info) => {
            const id = info.row.original.id
            // slice the id to get the last 4 characters and the first 4 characters
            return (
                <span>
                    {id.slice(0, 4)}
                    {id.slice(-4)}
                </span>
            )
        },
        header: 'Réf',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionMonth.accessor('product', {
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
                    className="flex items-center gap-1 text-nowrap"
                    name={info.getValue().name}
                    avatar={info.getValue().avatarPath}
                />
            )
        },
        header: 'Produit',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionMonth.accessor('amount', {
        cell: (info) => {
            return (
                <span>
                    {info.getValue().amount > 0
                        ? `${info.getValue().amount} MAD`
                        : 'N/A'}
                </span>
            )
        },
        header: 'Prix',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionMonth.accessor('quantity', {
        cell: (info) => info.getValue(),
        header: 'Qté',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionMonth.accessor('cardAmount', {
        cell: (info) => {
            return (
                <span>
                    {info.getValue().amount > 0
                        ? `${info.getValue().amount} MAD`
                        : 'N/A'}
                </span>
            )
        },
        header: 'V. par carte',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionMonth.accessor('cashAmount', {
        cell: (info) => {
            return (
                <span>
                    {info.getValue().amount > 0
                        ? `${info.getValue().amount} MAD`
                        : 'N/A'}
                </span>
            )
        },
        header: 'V. par espèce',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionMonth.accessor('commission', {
        cell: (info) => {
            return (
                <span>
                    {info.getValue().amount > 0
                        ? `${info.getValue().amount} MAD`
                        : 'N/A'}
                </span>
            )
        },
        header: 'C. par carte',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionMonth.accessor('cashCommission', {
        cell: (info) => {
            return (
                <span>
                    {info.getValue().amount > 0
                        ? `${info.getValue().amount} MAD`
                        : 'N/A'}
                </span>
            )
        },
        header: 'C. par espèce',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionMonth.accessor('id', {
        cell: (info) => {
            const type = info.row.original.type
            if (type === 'MULTIPLE') {
                return (
                    <div className="w-full justify-center flex items-center">
                        <CustomButton
                            label=""
                            IconRight={Eye}
                            variant="ghost"
                            onClick={() => {
                                console.log('Click')
                                setMultiProductId((prev) => info.getValue())
                                setValue((prev) => !prev)
                            }}
                            type="button"
                            className="[&>.icon]:ml-0 rounded-full text-white bg-lynch-300 hover:bg-lynch-300 hover:text-white size-10 cursor-pointer"
                        />
                    </div>
                )
            }
        },
        header: 'Plus',
        footer: (info) => info.column.id,
    }),
]

// TODO: remove this demo data

export const defaultDataCommissionMonthTable: partnerCommissionMonthType[] = [
    {
        id: '1',
        ref: '1',
        product: {
            id: '3123',
            name: 'Nom du produit',
            avatarPath: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        amount: {
            amount: 1000,
            currency: 'MAD',
        },
        cashAmount: {
            amount: 1000,
            currency: 'MAD',
        },
        cardAmount: {
            amount: 1000,
            currency: 'MAD',
        },
        cashCommission: {
            amount: 1000,
            currency: 'MAD',
        },
        commission: {
            amount: 1000,
            currency: 'MAD',
        },
        type: 'MULTIPLE',
        quantity: 1,
    },
    {
        id: '2',
        ref: '2',
        product: {
            id: '3123',
            name: 'Nom du produit',
            avatarPath: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        amount: {
            amount: 1000,
            currency: 'MAD',
        },
        cashAmount: {
            amount: 1000,
            currency: 'MAD',
        },
        cardAmount: {
            amount: 1000,
            currency: 'MAD',
        },
        cashCommission: {
            amount: 1000,
            currency: 'MAD',
        },
        commission: {
            amount: 1000,
            currency: 'MAD',
        },
        type: 'MULTIPLE',
        quantity: 1,
    },
    {
        id: '3',
        ref: '3',
        product: {
            id: '3123',
            name: 'Nom du produit',
            avatarPath: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        amount: {
            amount: 1000,
            currency: 'MAD',
        },
        cashAmount: {
            amount: 1000,
            currency: 'MAD',
        },
        cardAmount: {
            amount: 1000,
            currency: 'MAD',
        },
        cashCommission: {
            amount: 1000,
            currency: 'MAD',
        },
        commission: {
            amount: 1000,
            currency: 'MAD',
        },
        type: 'SINGLE',
        quantity: 1,
    },
]
