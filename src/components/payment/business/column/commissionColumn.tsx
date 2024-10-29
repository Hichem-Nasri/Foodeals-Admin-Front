import { AvatarAndName } from '@/components/AvatarAndName'
import { CustomButton } from '@/components/custom/CustomButton'
import { AppRoutes } from '@/lib/routes'
import {
    PaymentCommission,
    PartnerType,
    PaymentStatusEnum,
} from '@/types/paymentUtils'
import { createColumnHelper } from '@tanstack/react-table'
import { Eye } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { ConfirmPayment } from '../../ConfirmPayment'
import { PaymentValidation } from '../../PaymentValidation'

const columnHelperCommission = createColumnHelper<PaymentCommission>()

export const columnsCommissionTable = (
    router: AppRouterInstance,
    path: 'parnter' | 'subStore' = 'parnter'
) => [
    columnHelperCommission.accessor('ref', {
        cell: (info) => info.getValue(),
        header: 'Réf',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('partnerType', {
        cell: (info) => {
            return (
                <div>
                    {info.getValue() == PartnerType.SUB_ENTITY
                        ? 'sous compte'
                        : 'Principal'}
                </div>
            )
        },
        header: 'Type',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('partnerInfoDto', {
        cell: (info) => {
            return (
                <AvatarAndName
                    className="flex items-center gap-1 text-nowrap"
                    name={info.getValue().name}
                    avatar={info.getValue().avatarPath}
                />
            )
        },
        header: 'Magasin',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('totalAmount', {
        cell: (info) => info.getValue(),
        header: 'Vente totale',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('foodealsCommission', {
        cell: (info) => info.getValue(),
        header: 'Commission',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('toPay', {
        cell: (info) => {
            const status = info.row.getValue(
                'paymentStatus'
            ) as PaymentStatusEnum
            return (
                <span
                    className={`${
                        status == PaymentStatusEnum.IN_VALID &&
                        info.getValue() > 0 &&
                        'text-coral-500'
                    }`}
                >
                    {info.getValue() > 0 ? info.getValue() : 'N/A'}
                </span>
            )
        },
        header: 'A payer',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('toReceive', {
        cell: (info) => {
            const status = info.row.getValue(
                'paymentStatus'
            ) as PaymentStatusEnum
            return (
                <span
                    className={`${
                        status != PaymentStatusEnum.VALID_BY_BOTH &&
                        info.getValue() > 0 &&
                        'text-coral-500'
                    }`}
                >
                    {info.getValue() > 0 ? info.getValue() : 'N/A'}
                </span>
            )
        },
        header: 'A recevoir',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('payable', {
        cell: () => null,
        header: '',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('entityId', {
        cell: () => null,
        header: '',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('paymentStatus', {
        cell: (info) => {
            const payable = info.row.getValue('payable')
            const type = info.row.getValue('partnerType')
            if (!payable) {
                return (
                    <CustomButton
                        label={
                            'Paid by ' +
                            (type == PartnerType.SUB_ENTITY ? 'Sub' : 'Main')
                        }
                        disabled
                        className="rounded-[12px] disabled:bg-lynch-400 disabled:text-white"
                    />
                )
            } else {
                const status = info.row.getValue(
                    'paymentStatus'
                ) as PaymentStatusEnum
                const paid = info.row.getValue('toPay') == 0
                if (paid) {
                    return (
                        <ConfirmPayment
                            className="min-w-full"
                            id={info.getValue()}
                            label={'Confirmer'}
                            disabled={[
                                PaymentStatusEnum.IN_VALID,
                                PaymentStatusEnum.VALID_BY_BOTH,
                            ].includes(status as PaymentStatusEnum)}
                        />
                    )
                } else {
                    return (
                        <PaymentValidation
                            className="min-w-full"
                            id={info.getValue()}
                            label={'Payé'}
                            disabled={[
                                PaymentStatusEnum.VALID_BY_FOODEALS,
                                PaymentStatusEnum.VALID_BY_BOTH,
                            ].includes(status as PaymentStatusEnum)}
                        />
                    )
                }
            }
        },
        header: 'Validation',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('oraganizationId', {
        cell: (info) => (
            <div
                title="Voir"
                onClick={() => {
                    if (path == 'subStore')
                        router.push(
                            AppRoutes.SubStoreCommission.replace(
                                ':id',
                                info.getValue()
                            )
                        )
                    else
                        router.push(
                            AppRoutes.PBCommissionDetails.replace(
                                ':id',
                                info.getValue()
                            )
                        )
                }}
                className="flex items-center justify-center"
            >
                <div
                    className=" flex items-center justify-center 
					 p-2 rounded-full   bg-lynch-300 w-10 h-10 cursor-pointer text-white"
                >
                    <Eye size={20} />
                </div>
            </div>
        ),
        header: 'Activité',
    }),
]

// TODO: remove demo data
export const defaultDataCommissionTable: PaymentCommission[] = [
    {
        id: '4',
        ref: '4',
        partnerType: PartnerType.SUB_ENTITY,
        partnerInfoDto: {
            id: '12312',
            name: 'Partner 4',
            avatarPath: 'https://api.dicebear.com/7.x/bottts/png?seed=Partner4',
        },
        totalAmount: 4000,
        foodealsCommission: 400,
        toPay: 3600,
        toReceive: 0,
        payable: true,
        paymentStatus: PaymentStatusEnum.IN_VALID,
        commissionPayedBySubEntities: false,
        date: '2021-09-01',
        entityId: '4',
        oraganizationId: '4',
    },
    {
        id: '5',
        ref: '5',
        entityId: '5',
        oraganizationId: '5',
        date: '2021-09-01',
        partnerType: PartnerType.NORMAL_PARTNER,
        partnerInfoDto: {
            id: '12312',
            name: 'Partner 5',
            avatarPath: 'https://api.dicebear.com/7.x/bottts/png?seed=Partner5',
        },
        totalAmount: 5000,
        foodealsCommission: 500,
        toPay: 0,
        toReceive: 540,
        payable: true,
        paymentStatus: PaymentStatusEnum.VALID_BY_PARTNER,
        commissionPayedBySubEntities: false,
    },
    {
        id: '6',
        ref: '6',
        partnerType: PartnerType.SUB_ENTITY,
        partnerInfoDto: {
            id: '12312',
            name: 'Partner 6',
            avatarPath: 'https://api.dicebear.com/7.x/bottts/png?seed=Partner6',
        },
        totalAmount: 6000,
        foodealsCommission: 600,
        toPay: 5400,
        toReceive: 0,
        payable: true,
        paymentStatus: PaymentStatusEnum.VALID_BY_BOTH,
        commissionPayedBySubEntities: true,
        date: '2021-09-01',
        entityId: '6',
        oraganizationId: '6',
    },
]
