import {
    BarChartBig,
    Box,
    Contact,
    CreditCard,
    Database,
    FilePenLine,
    Globe,
    Headset,
    HeartHandshake,
    Hotel,
    LucideProps,
    Salad,
    Settings,
    SquareUser,
    Store,
    Truck,
    WandSparkles,
} from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { AppRoutes } from './routes'

export interface PageData {
    label: string
    href: string
    icon: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
    subPage?: boolean
    ListSubPage?: PageData[]
}

export const pagesData: PageData[] = [
    {
        label: 'Accueil',
        href: AppRoutes.home,
        icon: Hotel,
    },
    {
        label: 'Paiement',
        href: AppRoutes.payment,
        icon: CreditCard,
        subPage: true,
        ListSubPage: [
            {
                label: 'Partenaire business',
                href: AppRoutes.businessPartner,
                icon: Contact,
            },
            {
                label: 'Partenaire livraison',
                href: AppRoutes.delivery,
                icon: Box,
            },
            {
                label: 'Produits',
                href: '#',
                icon: Salad,
            },
        ],
    },
    {
        label: 'Statistique',
        href: AppRoutes.statistics,
        icon: BarChartBig,
    },
    {
        label: 'Partenaires',
        href: AppRoutes.partners,
        icon: Store,
    },
    {
        label: 'Livraison',
        href: AppRoutes.delivery,
        icon: Truck,
    },
    {
        label: 'Associations',
        href: AppRoutes.associations,
        icon: HeartHandshake,
    },
    {
        label: 'CRM',
        href: AppRoutes.crm,
        icon: Database,
        subPage: true,
        ListSubPage: [
            {
                label: 'Prospects',
                href: AppRoutes.prospects,
                icon: SquareUser,
            },
            {
                label: 'Demandes',
                href: AppRoutes.crmDemandes,
                icon: FilePenLine,
            },
        ],
    },
    {
        label: 'Marketing',
        href: AppRoutes.marketing,
        icon: WandSparkles,
    },
    {
        label: 'Ressources Humaines',
        href: AppRoutes.humanResources,
        icon: Headset,
    },
    {
        label: 'Site Web',
        href: AppRoutes.website,
        icon: Globe,
    },
    {
        label: 'Paramètre',
        href: AppRoutes.parameter,
        icon: Settings,
    },
]
