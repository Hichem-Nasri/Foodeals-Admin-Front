import { AvatarAndName } from '@/components/AvatarAndName'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { AppRoutes } from '@/lib/routes'
import { PartnerSolutionType } from '@/types/partnersType'
import {
    partnerSubscriptionType,
    partnerSubscriptonOnesType,
    PaymentStatusType,
    ValidationSubscriptionType,
} from '@/types/PaymentType'
import { createColumnHelper } from '@tanstack/react-table'
import { Eye } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { ConfirmPayment } from '../../ConfirmPayment'

//* Subscription General

const columnHelperSubscription = createColumnHelper<partnerSubscriptionType>()

export const columnsSubscriptionTable = (
    router: AppRouterInstance,
    setSubscriptionId: (id: string) => void
) => [
    columnHelperSubscription.accessor('ref', {
        cell: (info) => info.getValue(),
        header: 'Réf',
        footer: (info) => info.column.id,
    }),
    columnHelperSubscription.accessor('type', {
        cell: (info) => info.getValue(),
        header: 'Type',
        footer: (info) => info.column.id,
    }),
    columnHelperSubscription.accessor('magasin', {
        cell: (info) => {
            return (
                <AvatarAndName
                    className="flex items-center gap-1 text-nowrap"
                    name={info.getValue().name}
                    avatar={info.getValue().avatar}
                />
            )
        },
        header: 'Magasin',
        footer: (info) => info.column.id,
    }),
    columnHelperSubscription.accessor('totalEcheance', {
        cell: (info) => info.getValue(),
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
            <div
                title="Voir"
                onClick={() => setSubscriptionId(info.getValue())}
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

//* Subscription Ones
const columnHelperSubscriptionOnes =
    createColumnHelper<partnerSubscriptonOnesType>()

export const columnsSubscriptionOnesTable = (router: AppRouterInstance) => [
    columnHelperSubscriptionOnes.accessor('ref', {
        cell: (info) => info.getValue(),
        header: 'Réf',
        footer: (info) => info.column.id,
    }),
    columnHelperSubscriptionOnes.accessor('createdAt', {
        cell: (info) => info.getValue(),
        header: 'Date',
        footer: (info) => info.column.id,
    }),
    columnHelperSubscriptionOnes.accessor('nbrEcheance', {
        cell: (info) => info.getValue(),
        header: 'Nbr Echeance',
        footer: (info) => info.column.id,
    }),
    columnHelperSubscriptionOnes.accessor('prixEcheance', {
        cell: (info) =>
            info
                .getValue()
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' MAD',
        header: 'Prix Echeance',
        footer: (info) => info.column.id,
    }),
    columnHelperSubscriptionOnes.accessor('totalEcheance', {
        cell: (info) =>
            info
                .getValue()
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' MAD',
        header: 'Total Echeance',
        footer: (info) => info.column.id,
    }),
    columnHelperSubscriptionOnes.accessor('solution', {
        cell: (info) => <PartnerSolution solution={info.getValue()} />,
        header: 'Solution',
        footer: (info) => info.column.id,
    }),
    columnHelperSubscriptionOnes.accessor('id', {
        cell: (info) => (
            <div
                title="Voir"
                onClick={() => {
                    router.push(
                        AppRoutes.PBSubscriptionDetails.replace(
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

//* Validation Subscription
const columnValidationSubscriptionHelper =
    createColumnHelper<ValidationSubscriptionType>()

export const columnsValidationTable = [
    columnValidationSubscriptionHelper.accessor('ref', {
        cell: (info) => info.getValue(),
        header: 'Réf',
        footer: (info) => info.column.id,
    }),
    columnValidationSubscriptionHelper.accessor('deadline', {
        cell: (info) => info.getValue().toLocaleDateString(),
        header: 'Date d’échéance',
        footer: (info) => info.column.id,
    }),
    columnValidationSubscriptionHelper.accessor('price', {
        cell: (info) => info.getValue(),
        header: 'Prix d’échéance',
        footer: (info) => info.column.id,
    }),
    columnValidationSubscriptionHelper.accessor('validation', {
        cell: (info) => {
            return <ConfirmPayment id={info.getValue()} label={'A Recevoir'} />
        },
        header: 'Validation',
        footer: (info) => info.column.id,
        maxSize: 1,
    }),
]

// TODO: remove this demo data

export const defaultDataValidationTable: ValidationSubscriptionType[] = [
    {
        id: '1',
        ref: '1',
        deadline: new Date(),
        price: 1000,
        solution: [PartnerSolutionType.DLC_PRO, PartnerSolutionType.DONATE_PRO],
        validation: PaymentStatusType.IN_PROGRESS,
    },
    {
        id: '2',
        ref: '2',
        deadline: new Date(),
        price: 1000,
        solution: [PartnerSolutionType.DLC_PRO],
        validation: PaymentStatusType.IN_PROGRESS,
    },
    {
        id: '3',
        ref: '3',
        deadline: new Date(),
        price: 1000,
        solution: [PartnerSolutionType.DLC_PRO],
        validation: PaymentStatusType.IN_PROGRESS,
    },
]

export const defaultDataSubscriptionTable: partnerSubscriptionType[] = [
    {
        id: '1',
        ref: '1',
        type: 'Type',
        magasin: {
            id: '1',
            name: 'Nom du magasin',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        date: '2021-10-10',
        totalEcheance: 5000,
        solution: [PartnerSolutionType.MARKET_PRO],
    },
    {
        id: '2',
        ref: '2',
        type: 'Type',
        date: '2021-10-10',
        magasin: {
            id: '1',
            name: 'Nom du magasin',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        totalEcheance: 5000,
        solution: [PartnerSolutionType.DONATE_PRO],
    },
    {
        date: '2021-10-10',
        id: '3',
        ref: '3',
        type: 'Type',
        magasin: {
            id: '1',
            name: 'Nom du magasin',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        totalEcheance: 5000,
        solution: [PartnerSolutionType.DLC_PRO, PartnerSolutionType.DONATE_PRO],
    },
]
