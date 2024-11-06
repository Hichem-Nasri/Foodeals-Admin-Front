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
import { formatDate } from '@/lib/utils'

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
    columnHelperSubscription.accessor('id', {
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
                            info.row.getValue('reference')!
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
    setPartnerDeadlines: (deadlines: deadlineType[]) => void
) => [
    columnHelperSubscriptionOnes.accessor('reference', {
        cell: (info) => info.getValue(),
        header: 'Réf',
        footer: (info) => info.column.id,
    }),
    columnHelperSubscriptionOnes.accessor('date', {
        cell: (info) => {
            const date = formatDate(new Date(info.getValue()))
            return (
                date.split(' ')[1] +
                ' ' +
                date.split(' ')[0] +
                ' ' +
                date.split(' ')[2]
            )
        },
        header: 'Date d’échéance',
        footer: (info) => info.column.id,
    }),
    columnHelperSubscriptionOnes.accessor('deadlines', {
        cell: (info) => info.getValue().length,
        header: 'Nbr d’écheance',
        footer: (info) => info.column.id,
    }),
    columnHelperSubscriptionOnes.accessor('amount', {
        cell: (info) => {
            const amount = info.getValue().amount
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
    columnHelperSubscriptionOnes.accessor('id', {
        cell: (info) => (
            <div
                title="Voir"
                onClick={() => {
                    const deadlines = info.row.getValue(
                        'deadlines'
                    ) as deadlineType[]
                    if (info.row.getValue('deadlines'))
                        setPartnerDeadlines(
                            deadlines.sort((a, b) => {
                                return (
                                    new Date(b.date).getTime() -
                                    new Date(a.date).getTime()
                                )
                            })
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
        footer: (info) => info.column.id,
    }),
]

//* Validation Subscription
const columnValidationSubscriptionHelper = createColumnHelper<deadlineType>()

export const columnsValidationTable = [
    columnValidationSubscriptionHelper.accessor('ref', {
        cell: (info) => info.getValue().slice(0, 3) + info.getValue().slice(-3),
        header: 'Réf',
        footer: (info) => info.column.id,
    }),
    columnValidationSubscriptionHelper.accessor('date', {
        cell: (info) => {
            const date = formatDate(new Date(info.getValue()), 'long')
            return (
                date.split(' ')[1] +
                ' ' +
                date.split(' ')[0] +
                ' ' +
                date.split(' ')[2]
            )
        },
        header: 'Date d’échéance',
        footer: (info) => info.column.id,
    }),
    columnValidationSubscriptionHelper.accessor('amount', {
        cell: (info) => {
            const type = info.row.getValue('deadlineStatus') as string
            return (
                <div
                    className={`${
                        type == 'CONFIRMED_BY_PARTNER' && 'text-coral-500'
                    }`}
                >
                    {info
                        .getValue()
                        .amount.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' MAD'}
                </div>
            )
        },
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
            const payable = info.row.getValue('payable')! as boolean
            const status = info.getValue()
            console.log('status', status)
            return (
                <ConfirmPayment
                    id={id}
                    disabled={payable && !(status == 'CONFIRMED_BY_PARTNER')}
                    label={
                        status == 'CONFIRMED_BY_PARTNER'
                            ? 'A Recevoir'.toUpperCase()
                            : 'Reçu'.toUpperCase()
                    }
                    className="w-full"
                />
            )
        },
        header: 'Validation',
        footer: (info) => info.column.id,
        size: 20,
    }),
]

// TODO: remove this demo data

export const defaultDataValidationTable: deadlineType[] = [
    {
        id: '1',
        ref: '231234',
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
        ref: '234324234',
        date: '2021-07-01',
        deadlineStatus: 'CONFIRMED_BY_PARTNER',
        amount: {
            amount: 1000,
            currency: 'MAD',
        },
        payable: true,
    },
]

export const defaultDataSubscriptionTable: partnerSubscriptionType[] = [
    {
        id: '1',
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
        id: '2',
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
        id: '3',
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
