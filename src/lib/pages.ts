import {
    BarChartBig,
    CreditCard,
    Database,
    Globe,
    Headset,
    HeartHandshake,
    Hotel,
    LucideProps,
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
    asAccordion?: boolean
    ListAccordion?: PageData[]
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
        asAccordion: true,
        ListAccordion: [
            {
                label: 'Prospects',
                href: AppRoutes.newProspect,
                icon: SquareUser,
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
