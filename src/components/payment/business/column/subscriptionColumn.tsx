import { AvatarAndName } from '@/components/AvatarAndName'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { AppRoutes } from '@/lib/routes'
import { PartnerSolutionType } from '@/types/partnersType'
import {
    deadlineType,
    partnerSubscriptionType,
    partnerSubscriptonOnesType,
    PaymentStatusType,
    SubscriptionStatusType,
    ValidationSubscriptionType,
} from '@/types/PaymentType'
import { createColumnHelper } from '@tanstack/react-table'
import { Eye } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { ConfirmPayment } from '../../ConfirmPayment'
import { PartnerEntitiesType } from '@/types/GlobalType'

//* Subscription General

const columnHelperSubscription = createColumnHelper<partnerSubscriptionType>()

export const columnsSubscriptionTable = (router: AppRouterInstance) => [
    columnHelperSubscription.accessor('reference', {
        cell: (info) => info.getValue().slice(0, 4) + info.getValue().slice(-4),
        header: 'Réf',
        footer: (info) => info.column.id,
    }),
    columnHelperSubscription.accessor('type', {
        cell: (info) =>
            info.getValue() == PartnerEntitiesType.SUB_ENTITY
                ? 'Sous Compte'
                : 'Principal',
        header: 'Type',
        footer: (info) => info.column.id,
    }),
    columnHelperSubscription.accessor('partner', {
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
    columnHelperSubscription.accessor('total', {
        cell: (info) => info.getValue().amount + info.getValue().currency,
        header: "Total d'échéance",
        footer: (info) => info.column.id,
    }),
    columnHelperSubscription.accessor('solution', {
        cell: (info) => (
            <div className="flex items-center gap-1">
                {info.getValue().map((solution) => (
                    <PartnerSolution
                        solution={solution as PartnerSolutionType}
                        key={solution}
                    />
                ))}
            </div>
        ),
        header: 'Solution',
        footer: (info) => info.column.id,
    }),
    columnHelperSubscription.accessor('reference', {
        cell: (info) => (
            <button
                type="button"
                title="Voir"
                disabled={
                    info.row.getValue('payable') == false &&
                    info.row.getValue('type') == PartnerEntitiesType.SUB_ENTITY
                }
                onClick={() =>
                    router.push(
                        AppRoutes.PBSubscriptionDetails.replace(
                            ':id',
                            info.getValue()
                        )
                    )
                }
                className="flex items-center justify-center"
            >
                <div
                    className=" flex items-center justify-center 
					 p-2 rounded-full   bg-lynch-300 w-10 h-10 cursor-pointer text-white"
                >
                    <Eye size={20} />
                </div>
            </button>
        ),
        header: 'Activité',
    }),
]

//* Subscription Ones
const columnHelperSubscriptionOnes =
    createColumnHelper<partnerSubscriptonOnesType>()

export const columnsSubscriptionOnesTable = (
    setSubscriptionId: (id: string) => void
) => [
    columnHelperSubscriptionOnes.accessor('reference', {
        cell: (info) => info.getValue(),
        header: 'Réf',
        footer: (info) => info.column.id,
    }),
    columnHelperSubscriptionOnes.accessor('deadlines', {
        cell: (info) => {
            const date = info.getValue().find((val) => {
                return val.deadlineStatus == 'IN_VALID'
            })
            return date?.date
        },
        header: 'Date',
        footer: (info) => info.column.id,
    }),
    columnHelperSubscriptionOnes.accessor('deadlines', {
        cell: (info) => info.getValue().length,
        header: 'Nbr Echeance',
        footer: (info) => info.column.id,
    }),
    columnHelperSubscriptionOnes.accessor('deadlines', {
        cell: (info) => {
            const amount = info.getValue().length
                ? info.getValue()[0].amount
                : 0
            return (
                amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' MAD'
            )
        },
        header: 'Prix Echeance',
        footer: (info) => info.column.id,
    }),
    columnHelperSubscriptionOnes.accessor('total', {
        cell: (info) =>
            info
                .getValue()
                .amount.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' MAD',
        header: 'Total Echeance',
        footer: (info) => info.column.id,
    }),
    columnHelperSubscriptionOnes.accessor('solution', {
        cell: (info) => {
            return (
                <div className="flex justify-center items-center space-x-2">
                    {info.getValue().map((solution) => (
                        <PartnerSolution solution={solution} key={solution} />
                    ))}
                </div>
            )
        },
        header: 'Solution',
        footer: (info) => info.column.id,
    }),
    columnHelperSubscriptionOnes.accessor('reference', {
        cell: (info) => (
            <div
                title="Voir"
                onClick={() => {
                    setSubscriptionId(info.getValue())
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

//* Validation Subscription
const columnValidationSubscriptionHelper = createColumnHelper<deadlineType>()

export const columnsValidationTable = [
    columnValidationSubscriptionHelper.accessor('id', {
        cell: (info) => info.getValue().slice(0, 4) + info.getValue().slice(-4),
        header: 'Réf',
        footer: (info) => info.column.id,
    }),
    columnValidationSubscriptionHelper.accessor('date', {
        cell: (info) => info.getValue(),
        header: 'Date d’échéance',
        footer: (info) => info.column.id,
    }),
    columnValidationSubscriptionHelper.accessor('amount', {
        cell: (info) =>
            info
                .getValue()
                .amount.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' MAD',
        header: 'Prix d’échéance',
        footer: (info) => info.column.id,
    }),
    columnValidationSubscriptionHelper.accessor('payable', {
        cell: (info) => null,
        header: '',
        footer: (info) => null,
    }),
    columnValidationSubscriptionHelper.accessor('deadlineStatus', {
        cell: (info) => {
            const id = info.row.getValue('id') as string
            const payable = info.row.getValue('payable')
            const status = info.getValue()
            return (
                <ConfirmPayment
                    id={id}
                    disabled={!payable || status != 'CONFIRMED_BY_FOODEALS'}
                    label={
                        status == 'CONFIRMED_BY_FOODEALS'
                            ? 'Reçu'.toUpperCase()
                            : 'A Recevoir'
                    }
                />
            )
        },
        header: 'Validation',
        footer: (info) => info.column.id,
        maxSize: 1,
    }),
]

// TODO: remove this demo data

export const defaultDataValidationTable: deadlineType[] = [
    {
        id: '1',
        date: '2021-06-01',
        deadlineStatus: 'CONFIRMED_BY_FOODEALS',
        amount: {
            amount: 1000,
            currency: 'MAD',
        },
        payable: true,
    },
    {
        id: '2',
        date: '2021-07-01',
        deadlineStatus: 'CONFIRMED_BY_PARTNER',
        amount: {
            amount: 1000,
            currency: 'MAD',
        },
        payable: false,
    },
]

export const defaultDataSubscriptionTable: partnerSubscriptionType[] = [
    {
        reference: '123456789',
        type: PartnerEntitiesType.SUB_ENTITY,
        partner: {
            id: '1',
            name: 'partner1',
            avatarPath: 'https://picsum.photos/200/300',
        },
        total: {
            amount: 1000,
            currency: 'MAD',
        },
        solution: [PartnerSolutionType.DLC_PRO, PartnerSolutionType.DONATE_PRO],
        payable: true,
    },
    {
        reference: '123456789',
        type: PartnerEntitiesType.SUB_ENTITY,
        partner: {
            id: '2',
            name: 'partner2',
            avatarPath: 'https://picsum.photos/200/300',
        },
        total: {
            amount: 1000,
            currency: 'MAD',
        },
        solution: [PartnerSolutionType.DLC_PRO],
        payable: false,
    },
    {
        reference: '123456789',
        type: PartnerEntitiesType.PARTNER_SB,
        partner: {
            id: '3',
            name: 'partner3',
            avatarPath: 'https://picsum.photos/200/300',
        },
        total: {
            amount: 1000,
            currency: 'MAD',
        },
        solution: [PartnerSolutionType.DLC_PRO],
        payable: true,
    },
]
