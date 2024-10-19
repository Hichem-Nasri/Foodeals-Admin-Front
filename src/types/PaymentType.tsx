import { ActionsMenu } from '@/components/custom/ActionsMenu'
import { ConfirmPayment } from '@/components/payment/ConfirmPayment'
import { PaymentStatus } from '@/components/payment/PaymentStatus'
import { PaymentValidation } from '@/components/payment/PaymentValidation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AppRoutes } from '@/lib/routes'
import { createColumnHelper } from '@tanstack/react-table'
import { Eye, Pencil } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { z } from 'zod'
import { PartnerSolutionType } from './partners'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { AvatarAndName } from '@/components/AvatarAndName'
import { Drawer, DrawerTrigger } from '@/components/ui/drawer'
import { CustomButton } from '@/components/custom/CustomButton'

export enum PaymentStatusType {
    PAID = 'PAID',
    PENDING = 'PENDING',
    CANCELED = 'CANCELED',
}

export interface ConfirmPaymentType {
    id: string
    store: {
        id: string
        avatar: string
        name: string
    }
    dateOfReception: Date
    amount: number
    transmitter: string
    document: {
        fileName: string
        fileUrl: string
    }
}

export const defaultValuesConfirmPayment = {
    id: '1',
    store: {
        id: '1',
        avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        name: 'Nom du magasin',
    },
    dateOfReception: new Date(),
    amount: 25000,
    transmitter: 'Amine Ben',
    document: {
        fileName: 'Justificatif de la commission.word',
        fileUrl: '',
    },
}

export interface PaymentDeliveriesType {
    id: string
    month: string
    deliveryCost: number
    commissionCost: number
    NbrOrder: number
    commissionfoodleas: number
    toReceive: number
    validation: string
}

const columnHelperPaymentDeliveries =
    createColumnHelper<PaymentDeliveriesType>()

export const columnsPaymentDeliveriesTable = () => [
    columnHelperPaymentDeliveries.accessor('month', {
        cell: (info) => info.getValue(),
        header: 'Mois',
        footer: (info) => info.column.id,
    }),
    columnHelperPaymentDeliveries.accessor('deliveryCost', {
        cell: (info) => {
            return <span>{info.getValue() + 'DH'}</span>
        },
        header: 'Coût de livraison',
        footer: (info) => info.column.id,
    }),
    columnHelperPaymentDeliveries.accessor('commissionCost', {
        cell: (info) => {
            return <span>{info.getValue() + 'DH'}</span>
        },
        header: 'Coût de commission',
        footer: (info) => info.column.id,
    }),
    columnHelperPaymentDeliveries.accessor('NbrOrder', {
        cell: (info) => {
            return <span>{info.getValue() + 'DH'}</span>
        },
        header: 'Nbr de commande',
        footer: (info) => info.column.id,
    }),
    columnHelperPaymentDeliveries.accessor('commissionfoodleas', {
        cell: (info) => {
            return <span>{info.getValue() + 'DH'}</span>
        },
        header: 'Commission Foodeals',
        footer: (info) => info.column.id,
    }),
    columnHelperPaymentDeliveries.accessor('toReceive', {
        cell: (info) => {
            return <span>{info.getValue() + 'DH'}</span>
        },
        header: 'A recevoir',
        footer: (info) => info.column.id,
    }),
    columnHelperPaymentDeliveries.accessor('validation', {
        cell: (info) => (
            <ConfirmPayment
                id={info.getValue()}
                label={'Confirmer'}
                disabled={false}
            />
        ),
        header: 'Validation',
        footer: (info) => info.column.id,
    }),
]

export const defaultDataPaymentDeliveriesTable: PaymentDeliveriesType[] = [
    {
        id: '1',
        month: 'Janvier',
        deliveryCost: 1000,
        commissionCost: 1000,
        NbrOrder: 1000,
        commissionfoodleas: 1000,
        toReceive: 1000,
        validation: PaymentStatusType.PENDING,
    },
    {
        id: '2',
        month: 'Février',
        deliveryCost: 1000,
        commissionCost: 1000,
        NbrOrder: 1000,
        commissionfoodleas: 1000,
        toReceive: 1000,
        validation: PaymentStatusType.PENDING,
    },
    {
        id: '3',
        month: 'Mars',
        deliveryCost: 1000,
        commissionCost: 1000,
        NbrOrder: 1000,
        commissionfoodleas: 1000,
        toReceive: 1000,
        validation: PaymentStatusType.CANCELED,
    },
]

export interface PaymentType {
    id: string
    ref: string
    date: Date
    type: string
    store: {
        id: string
        name: string
        logo: string
    }
    engagement: number
    totalSales: number
    totalCommission: number
    toPay: number
    receiver: number
    status: PaymentStatusType
    payByFoodeals: boolean
}

export interface partnerCommissionType {
    id: string
    ref: string
    type: string
    magasin: {
        id: string
        name: string
        avatar: string
    }
    date: Date
    totalVente: number
    commission: number
    toPaid: number
    toReceive: number
    typeCommission: 'paid' | 'receive'
    validation: PaymentStatusType
}

export type partnerCommissionSSType = Omit<partnerCommissionType, 'type'>

export type partnerCommissionMonthType = {
    id: string
    ref: string
    product: {
        name: string
        avatar: string
    }
    price: number
    quantity: number
    TBC: number
    CT: number
    CBC: number
    CPC: number
}
export interface partnerSubscriptionType {
    id: string
    ref: string
    type: string
    magasin: {
        id: string
        name: string
        avatar: string
    }
    date: Date
    nbEcheance: number
    totalEcheance: number
    prixEcheance: number
    solution: string[]
}

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
        date: new Date(),
        nbEcheance: 5,
        totalEcheance: 5000,
        prixEcheance: 1000,
        solution: [PartnerSolutionType.MARKET_PRO],
    },
    {
        id: '2',
        ref: '2',
        type: 'Type',
        magasin: {
            id: '1',
            name: 'Nom du magasin',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        date: new Date(),
        nbEcheance: 5,
        totalEcheance: 5000,
        prixEcheance: 1000,
        solution: [PartnerSolutionType.DONATE_PRO],
    },
    {
        id: '3',
        ref: '3',
        type: 'Type',
        magasin: {
            id: '1',
            name: 'Nom du magasin',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        date: new Date(),
        nbEcheance: 5,
        totalEcheance: 5000,
        prixEcheance: 1000,
        solution: [PartnerSolutionType.DLC_PRO, PartnerSolutionType.DONATE_PRO],
    },
]

export const PaymentFilterSchema = z.object({
    date: z.date().optional(),
    partner: z
        .object({
            id: z.string(),
            name: z.string(),
            avatar: z.string(),
        })
        .optional(),
})

export const defaultValuesPaymentFilter = {
    date: undefined,
    partner: undefined,
}

export enum PaymentMethod {
    CASH = 'cash',
    CARD_BANK = 'card_bank',
    TRANSFER = 'transfer',
    CHECK = 'check',
}

export const paymentSchemas = {
    [PaymentMethod.CASH]: z.object({
        date: z.string().min(1, 'La date est obligatoire'),
        amount: z.number().min(1, 'Le montant doit être supérieur à 0'),
    }),
    [PaymentMethod.CARD_BANK]: z.object({
        amount: z.number().min(1, 'Le montant doit être supérieur à 0'),
    }),
    [PaymentMethod.TRANSFER]: z.object({
        amount: z.number().min(1, 'Le montant doit être supérieur à 0'),
        document: z.string().min(1, 'Le fichier est obligatoire'),
    }),
    [PaymentMethod.CHECK]: z.object({
        amount: z.number().min(1, 'Le montant doit être supérieur à 0'),
        checkNumber: z.string().min(1, 'Le numéro du chèque est obligatoire'),
        dateOfWrite: z
            .string()
            .min(1, "La date d'émission du chèque est obligatoire"),
        dateOfGet: z
            .string()
            .min(1, 'La date de réception du chèque est obligatoire'),
        bankCompany: z.string().min(1, 'La banque est obligatoire'),
        issuerName: z.string().min(1, "Le nom de l'émetteur est obligatoire"),
        document: z.string().min(1, 'Le fichier est obligatoire'),
    }),
}

export const defaultValuesPayment = {
    date: '',
    amount: 0,
    document: '',
    checkNumber: '',
    dateOfWrite: '',
    dateOfGet: '',
    bankCompany: '',
    issuerName: '',
}

export interface FormData {
    paymentMethod: PaymentMethod
    date?: string
    amount?: number
    checkNumber?: string
    dateOfWrite?: string
    dateOfGet?: string
    bankCompany?: string
    issuerName?: string
    document?: string
    file?: string
}

const columnHelperCommissionMonth =
    createColumnHelper<partnerCommissionMonthType>()

export const columnsCommissionMonthTable = (router: AppRouterInstance) => [
    columnHelperCommissionMonth.accessor('ref', {
        cell: (info) => info.getValue(),
        header: 'Réf',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionMonth.accessor('product', {
        cell: (info) => {
            return (
                <AvatarAndName
                    className="flex items-center gap-1 text-nowrap"
                    name={info.getValue().name}
                    avatar={info.getValue().avatar}
                />
            )
        },
        header: 'Produit',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionMonth.accessor('price', {
        cell: (info) => {
            return (
                <span>
                    {info.getValue() > 0 ? `${info.getValue()} MAD` : 'N/A'}
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
    columnHelperCommissionMonth.accessor('TBC', {
        cell: (info) => {
            return (
                <span>
                    {info.getValue() > 0 ? `${info.getValue()} MAD` : 'N/A'}
                </span>
            )
        },
        header: 'V. par carte',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionMonth.accessor('CT', {
        cell: (info) => {
            return (
                <span>
                    {info.getValue() > 0 ? `${info.getValue()} MAD` : 'N/A'}
                </span>
            )
        },
        header: 'V. par espèce',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionMonth.accessor('CBC', {
        cell: (info) => {
            return (
                <span>
                    {info.getValue() > 0 ? `${info.getValue()} MAD` : 'N/A'}
                </span>
            )
        },
        header: 'C. par carte',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionMonth.accessor('CPC', {
        cell: (info) => {
            return (
                <span>
                    {info.getValue() > 0 ? `${info.getValue()} MAD` : 'N/A'}
                </span>
            )
        },
        header: 'C. par espèce',
        footer: (info) => info.column.id,
    }),
]

export const defaultDataCommissionMonthTable: partnerCommissionMonthType[] = [
    {
        id: '1',
        ref: '1',
        product: {
            name: 'Nom du produit',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        price: 1000,
        quantity: 1,
        TBC: 1000,
        CT: 1000,
        CBC: 1000,
        CPC: 1000,
    },
    {
        id: '2',
        ref: '2',
        product: {
            name: 'Nom du produit',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        price: 1000,
        quantity: 1,
        TBC: 1000,
        CT: 1000,
        CBC: 1000,
        CPC: 1000,
    },
    {
        id: '3',
        ref: '3',
        product: {
            name: 'Nom du produit',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        price: 1000,
        quantity: 1,
        TBC: 1000,
        CT: 1000,
        CBC: 1000,
        CPC: 1000,
    },
]

const columnHelperCommissionSS = createColumnHelper<partnerCommissionSSType>()

export const columnsCommissionSSTable = (
    router: AppRouterInstance,
    id: string
) => [
    columnHelperCommissionSS.accessor('ref', {
        cell: (info) => info.getValue(),
        header: 'Réf',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionSS.accessor('magasin', {
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
    columnHelperCommissionSS.accessor('date', {
        cell: (info) => info.getValue().toLocaleDateString(),
        header: 'Date',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionSS.accessor('totalVente', {
        cell: (info) => info.getValue(),
        header: 'Vente totale',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionSS.accessor('commission', {
        cell: (info) => info.getValue(),
        header: 'Commission',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionSS.accessor('toPaid', {
        cell: (info) => {
            return <span className={''}>{info.getValue()}</span>
        },
        header: 'A payer',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionSS.accessor('toReceive', {
        cell: (info) => {
            return <span className={''}>{info.getValue()}</span>
        },
        header: 'A recevoir',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionSS.accessor('validation', {
        cell: (info) => (
            <PaymentValidation
                id={info.getValue()}
                label={'Confirmer'}
                disabled={
                    !(info.row.getValue('status') === PaymentStatusType.PENDING)
                }
            />
        ),
        header: 'Validation',
        footer: (info) => info.column.id,
    }),
    columnHelperCommissionSS.accessor('id', {
        cell: (info) => (
            <div
                title="Voir"
                onClick={() => {
                    router.push(AppRoutes.SubStoreCommission.replace(':id', id))
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

export const defaultDataCommissionSSTable: partnerCommissionSSType[] = [
    {
        id: '1',
        ref: '1',
        magasin: {
            id: '1',
            name: 'Nom du magasin',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        date: new Date(),
        totalVente: 1000,
        commission: 1000,
        toPaid: 1000,
        toReceive: 1000,
        typeCommission: 'paid',
        validation: PaymentStatusType.PENDING,
    },
    {
        id: '2',
        ref: '2',
        magasin: {
            id: '2',
            name: 'Nom du magasin',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        date: new Date(),
        totalVente: 1000,
        commission: 1000,
        toPaid: 1000,
        toReceive: 1000,
        typeCommission: 'receive',
        validation: PaymentStatusType.PENDING,
    },
    {
        id: '3',
        ref: '3',
        magasin: {
            id: '3',
            name: 'Nom du magasin',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        date: new Date(),
        totalVente: 1000,
        commission: 1000,
        toPaid: 1000,
        toReceive: 1000,
        typeCommission: 'paid',
        validation: PaymentStatusType.CANCELED,
    },
]

const columnHelperCommission = createColumnHelper<partnerCommissionType>()

export const columnsCommissionTable = (router: AppRouterInstance) => [
    columnHelperCommission.accessor('ref', {
        cell: (info) => info.getValue(),
        header: 'Réf',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('type', {
        cell: (info) => info.getValue(),
        header: 'Type',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('magasin', {
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
    columnHelperCommission.accessor('date', {
        cell: (info) => info.getValue().toLocaleDateString(),
        header: 'Date',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('totalVente', {
        cell: (info) => info.getValue(),
        header: 'Vente totale',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('commission', {
        cell: (info) => info.getValue(),
        header: 'Commission',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('toPaid', {
        cell: (info) => {
            return <span className={''}>{info.getValue()}</span>
        },
        header: 'A payer',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('toReceive', {
        cell: (info) => {
            return <span className={''}>{info.getValue()}</span>
        },
        header: 'A recevoir',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('validation', {
        cell: (info) => (
            <PaymentValidation
                id={info.getValue()}
                label={'Confirmer'}
                disabled={false}
            />
        ),
        header: 'Validation',
        footer: (info) => info.column.id,
    }),
    columnHelperCommission.accessor('id', {
        cell: (info) => (
            <div
                title="Voir"
                onClick={() =>
                    router.push(
                        AppRoutes.PBCommissionDetails.replace(
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
            </div>
        ),
        header: 'Activité',
    }),
]

export const defaultDataCommissionTable: partnerCommissionType[] = [
    {
        id: '1',
        ref: '1',
        type: 'Type',
        magasin: {
            id: '1',
            name: 'Nom du magasin',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        date: new Date(),
        totalVente: 1000,
        commission: 1000,
        toPaid: 1000,
        toReceive: 1000,
        typeCommission: 'paid',
        validation: PaymentStatusType.PENDING,
    },
    {
        id: '2',
        ref: '2',
        type: 'Type',
        magasin: {
            id: '2',
            name: 'Nom du magasin',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        date: new Date(),
        totalVente: 1000,
        commission: 1000,
        toPaid: 1000,
        toReceive: 1000,
        typeCommission: 'receive',
        validation: PaymentStatusType.PENDING,
    },
    {
        id: '3',
        ref: '3',
        type: 'Type',
        magasin: {
            id: '3',
            name: 'Nom du magasin',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        date: new Date(),
        totalVente: 1000,
        commission: 1000,
        toPaid: 1000,
        toReceive: 1000,
        typeCommission: 'paid',
        validation: PaymentStatusType.CANCELED,
    },
]

const columnHelperSubscription = createColumnHelper<partnerSubscriptionType>()

export const columnsSubscriptionTable = (router: AppRouterInstance) => [
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
    columnHelperSubscription.accessor('date', {
        cell: (info) => info.getValue().toLocaleDateString(),
        header: "Date d'échéance",
        footer: (info) => info.column.id,
    }),
    columnHelperSubscription.accessor('nbEcheance', {
        cell: (info) => info.getValue(),
        header: "Nbr d'échéance",
        footer: (info) => info.column.id,
    }),
    columnHelperSubscription.accessor('totalEcheance', {
        cell: (info) => info.getValue(),
        header: "Total d'échéance",
        footer: (info) => info.column.id,
    }),
    columnHelperSubscription.accessor('prixEcheance', {
        cell: (info) => info.getValue(),
        header: "Prix d'échéance",
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
            </div>
        ),
        header: 'Activité',
    }),
]

const columnHelper = createColumnHelper<PaymentType>()

export const columnsPaymentsTable = (router: AppRouterInstance) => [
    columnHelper.accessor('ref', {
        cell: (info) => info.getValue(),
        header: 'Réf',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('date', {
        cell: (info) => info.getValue().toLocaleDateString(),
        header: 'Mois',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('type', {
        cell: (info) => info.getValue(),
        header: 'Type',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('store', {
        cell: (info) => (
            <div className="flex items-center gap-1">
                <Avatar>
                    <AvatarImage src={info.getValue().logo} />
                    <AvatarFallback>
                        {info.getValue().name[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                {info.getValue().name}
            </div>
        ),
        header: 'Magasin',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('engagement', {
        cell: (info) => info.getValue(),
        header: 'Engagement',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('totalSales', {
        cell: (info) => info.getValue(),
        header: 'Ventes totales',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('totalCommission', {
        cell: (info) => info.getValue(),
        header: 'Commission totale',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('toPay', {
        cell: (info) => (
            <span
                className={
                    info.row.getValue('payByFoodeals') &&
                    info.row.getValue('status') !== PaymentStatusType.PAID
                        ? 'text-red-500'
                        : 'text-primary'
                }
            >
                {info.getValue()}
            </span>
        ),
        header: 'A payer',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('receiver', {
        cell: (info) => (
            <span
                className={
                    !info.row.getValue('payByFoodeals') &&
                    info.row.getValue('status') !== PaymentStatusType.PAID
                        ? 'text-red-500'
                        : 'text-primary'
                }
            >
                {info.getValue()}
            </span>
        ),
        header: 'Reçu',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('status', {
        cell: (info) => <PaymentStatus status={info.getValue()} />,
        header: 'Statut',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('ref', {
        cell: (info) => {
            if (info.row.getValue('payByFoodeals'))
                return (
                    <PaymentValidation
                        id={info.getValue()}
                        label="Confirmer"
                        disabled={
                            !(
                                info.row.getValue('status') ===
                                PaymentStatusType.PENDING
                            )
                        }
                    />
                )
            return (
                <ConfirmPayment
                    id={info.getValue()}
                    label="Confirmer"
                    disabled={
                        !(
                            info.row.getValue('status') ===
                            PaymentStatusType.PENDING
                        )
                    }
                />
            )
        },
        header: 'Validation',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('payByFoodeals', {
        cell: 'payByFoodeals',
        header: 'payByFoodeals',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('id', {
        cell: (info) => (
            <ActionsMenu
                id={info.getValue()}
                menuList={[
                    {
                        actions: () =>
                            router.push(
                                AppRoutes.paymentDetails.replace(
                                    ':id',
                                    info.getValue()!
                                )
                            ),
                        icon: Eye,
                        label: 'Voir',
                    },
                    {
                        actions: () =>
                            router.push(
                                AppRoutes.paymentDetails.replace(
                                    ':id',
                                    info.getValue()!
                                )
                            ),
                        icon: Pencil,
                        label: 'Modifier',
                    },
                ]}
            />
        ),
        header: 'Activité',
    }),
]

export const defaultDataPaymentsTable: PaymentType[] = [
    {
        id: '1',
        ref: '1',
        date: new Date(),
        type: 'Type',
        store: {
            id: '1',
            name: 'Nom du magasin',
            logo: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        engagement: 1000,
        totalSales: 1000,
        totalCommission: 1000,
        toPay: 1000,
        receiver: 1000,
        status: PaymentStatusType.PENDING,
        payByFoodeals: true,
    },
    {
        id: '2',
        ref: '2',
        date: new Date(),
        type: 'Type',
        store: {
            id: '2',
            name: 'Nom du magasin',
            logo: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        engagement: 1000,
        totalSales: 1000,
        totalCommission: 1000,
        toPay: 1000,
        receiver: 1000,
        status: PaymentStatusType.PENDING,
        payByFoodeals: false,
    },
    {
        id: '3',
        ref: '3',
        date: new Date(),
        type: 'Type',
        store: {
            id: '3',
            name: 'Nom du magasin',
            logo: 'https://api.dicebear.com/7.x/bottts/png?seed=Ikea',
        },
        engagement: 1000,
        totalSales: 1000,
        totalCommission: 1000,
        toPay: 1000,
        receiver: 1000,
        status: PaymentStatusType.CANCELED,
        payByFoodeals: false,
    },
]

export interface PaymentDetailsSubscriptionType {}

export interface PaymentDetailsOperationsType {
    withCard: number
    withCash: number
    commissionCard: number
    commissionCash: number
    commissionTotal: number
    status: PaymentStatusType
}

const columnPaymentDetailsHelper =
    createColumnHelper<PaymentDetailsOperationsType>()

export const columnsPaymentsDetailsTable = [
    columnPaymentDetailsHelper.accessor('withCard', {
        cell: (info) => info.getValue(),
        header: 'Vente par carte',
        footer: (info) => info.column.id,
    }),
    columnPaymentDetailsHelper.accessor('withCash', {
        cell: (info) => info.getValue(),
        header: 'Vente par espèce',
        footer: (info) => info.column.id,
    }),
    columnPaymentDetailsHelper.accessor('commissionCard', {
        cell: (info) => info.getValue(),
        header: 'Commission par carte',
        footer: (info) => info.column.id,
    }),
    columnPaymentDetailsHelper.accessor('commissionCash', {
        cell: (info) => info.getValue(),
        header: 'Commission par espèce',
        footer: (info) => info.column.id,
    }),
    columnPaymentDetailsHelper.accessor('commissionTotal', {
        cell: (info) => info.getValue(),
        header: 'Total Commission',
        footer: (info) => info.column.id,
    }),
    columnPaymentDetailsHelper.accessor('status', {
        cell: (info) => <PaymentStatus status={info.getValue()} />,
        header: 'Statut',
        footer: (info) => info.column.id,
    }),
]

export const defaultDataPaymentsDetailsTable: PaymentDetailsOperationsType[] = [
    {
        commissionCard: 4454,
        commissionCash: 566,
        commissionTotal: 6846,
        withCard: 46846,
        withCash: 64888,
        status: PaymentStatusType.PAID,
    },
]

export interface ValidationSubscriptionType {
    ref: string
    deadline: Date
    price: number
    solution: PartnerSolutionType[]
    validation: PaymentStatusType
}

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

export const defaultDataValidationTable: ValidationSubscriptionType[] = [
    {
        ref: '1',
        deadline: new Date(),
        price: 1000,
        solution: [PartnerSolutionType.DLC_PRO, PartnerSolutionType.DONATE_PRO],
        validation: PaymentStatusType.PENDING,
    },
    {
        ref: '2',
        deadline: new Date(),
        price: 1000,
        solution: [PartnerSolutionType.DLC_PRO],
        validation: PaymentStatusType.PENDING,
    },
    {
        ref: '3',
        deadline: new Date(),
        price: 1000,
        solution: [PartnerSolutionType.DLC_PRO],
        validation: PaymentStatusType.PENDING,
    },
]

export type SubscriptionsValidationsType = {
    id: string
    ref: string
    deadline: string
    price: number
    validation: string
}
