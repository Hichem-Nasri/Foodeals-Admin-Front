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
	Store,
	Truck,
	WandSparkles,
} from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import { appRoutes } from "./routes"

export interface PageData {
	label: string
	href: string
	icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

export const pagesData: PageData[] = [
	{
		label: "Accueil",
		href: appRoutes.home,
		icon: Hotel,
	},
	{
		label: "Paiement",
		href: appRoutes.payment,
		icon: CreditCard,
	},
	{
		label: "Statistique",
		href: appRoutes.statistics,
		icon: BarChartBig,
	},
	{
		label: "Partenaires",
		href: appRoutes.partners,
		icon: Store,
	},
	{
		label: "Livraison",
		href: appRoutes.delivery,
		icon: Truck,
	},
	{
		label: "Associations",
		href: appRoutes.associations,
		icon: HeartHandshake,
	},
	{
		label: "CRM",
		href: appRoutes.crm,
		icon: Database,
	},
	{
		label: "Marketing",
		href: appRoutes.marketing,
		icon: WandSparkles,
	},
	{
		label: "Ressources Humaines",
		href: appRoutes.humanResources,
		icon: Headset,
	},
	{
		label: "Site Web",
		href: appRoutes.website,
		icon: Globe,
	},
	{
		label: "Paramètre",
		href: appRoutes.parameter,
		icon: Settings,
	},
]
