import { z } from "zod"
import { PartnerStatusType } from "./partners"

export const PartnerInformationSchema = z.object({
	logo: z.string().refine((value) => !value.includes("https://via.placeholder.com/120"), {
		message: "Veuillez ajouter une image de logo",
	}),
	cover: z.string().refine((value) => !value.includes("https://via.placeholder.com/120"), {
		message: "Veuillez ajouter une image de couverture",
	}),
	companyName: z.string().min(3),
	companyType: z.array(z.string()).min(1),
	responsible: z.string().min(3),
	managerId: z.string().min(1),
	phone: z
		.string()
		.min(9, "Le numéro de téléphone doit contenir au moins 9 chiffres")
		.refine((value) => /^\d+$/.test(value), {
			message: "Le numéro de téléphone ne doit contenir que des chiffres",
		}),
	email: z.string().email("Veuillez entrer une adresse email valide"),
	commercialRegisterNumber: z.number(),
	partnerType: z.string().min(3),
	country: z.string().min(3),
	city: z.string().min(3),
	region: z.string().min(3),
	address: z.string().min(3),
	mapLocation: z.string().min(3),
})

export const defaultPartnerInformationData = {
	logo: "https://via.placeholder.com/120",
	cover: "https://via.placeholder.com/740x223",
	companyName: "",
	companyType: [],
	responsible: "",
	managerId: "",
	phone: "",
	email: "",
	commercialRegisterNumber: 0,
	partnerType: "",
	country: "",
	city: "",
	region: "",
	address: "",
	mapLocation: "",
}

export interface PartnerInformationSchemaType {
	logo: string
	cover: string
	companyName: string
	companyType: string[]
	responsible: string
	managerId: string
	phone: string
	email: string
	commercialRegisterNumber: number
	partnerType: string
	country: string
	city: string
	region: string
	address: string
	mapLocation: string
}

export const PartnerSubscriptionSchema = z.object({
	subscriptionType: z.string().min(3),
	bank: z.string().min(3),
	paymentMethod: z.string().min(3),
	beneficiary: z.string().min(3),
	rib: z.string().min(3),
	accountType: z.string().min(3),
	marketPro: z
		.object({
			selected: z.boolean(),
			duration: z.number(),
			amount: z.number(),
			expiration: z.number(),
			managerId: z.string().min(3),
			commissionCash: z.number(),
			commissionCard: z.number(),
		})
		.optional(),
	dlcPro: z
		.object({
			selected: z.boolean(),
			duration: z.number(),
			amount: z.number(),
			expiration: z.number(),
		})
		.optional(),
	donate: z
		.object({
			selected: z.boolean(),
			duration: z.number(),
			amount: z.number(),
			expiration: z.number(),
		})
		.optional(),
	solutions: z
		.object({
			solutionsId: z.array(z.string()),
			duration: z.number(),
			amount: z.number(),
			expiration: z.number(),
			managerId: z.string().optional(),
			commissionCash: z.number().optional(),
			commissionCard: z.number().optional(),
		})
		.optional(),
})

export const defaultPartnerSubscriptionData = {
	subscriptionType: "general",
	bank: "",
	paymentMethod: "",
	beneficiary: "",
	rib: "",
	accountType: "",
	marketPro: {
		duration: 0,
		amount: 0,
		expiration: 0,
		managerId: "",
		commissionCash: 0,
		commissionCard: 0,
	},
	dlcPro: {
		duration: 0,
		amount: 0,
		expiration: 0,
	},
	donate: {
		duration: 0,
		amount: 0,
		expiration: 0,
	},
	solutions: {
		solutionsId: [],
		duration: 0,
		amount: 0,
		expiration: 0,
		managerId: "",
		commissionCash: 0,
		commissionCard: 0,
	},
}

export interface PartnerSubscriptionSchemaType {
	subscriptionType: string
	bank: string
	paymentMethod: string
	beneficiary: string
	rib: string
	accountType: string
	marketPro: {
		duration: number
		amount: number
		expiration: number
		managerId: string
		commissionCash: number
		commissionCard: number
	}
	dlcPro: {
		duration: number
		amount: number
		expiration: number
	}
	donate: {
		duration: number
		amount: number
		expiration: number
	}
	solutions: {
		solutionsId: string[]
		duration: number
		amount: number
		expiration: number
		managerId: string
		commissionCash: number
		commissionCard: number
	}
}

export const PartnerFeaturesSchema = z.object({
	numberOfStores: z.number(),
	fileType: z.array(z.string()),
})

export const defaultPartnerFeaturesData = {
	numberOfStores: 0,
	fileType: [],
}

export interface PartnerFeaturesSchemaType {
	numberOfStores: number
	fileType: string[]
}

export interface PartnerDataType
	extends PartnerInformationSchemaType,
		PartnerSubscriptionSchemaType,
		PartnerFeaturesSchemaType {
	contractId: string
	status: PartnerStatusType
	id?: string
	proofId: string
	proofName: string
	contractName: string 
}

export const ArchivePartnerSchema = z.object({
	archiveType: z.string(),
	archiveReason: z.string().min(20, "Le type d'archive doit contenir au moins 20 caractères"),
})

export const defaultArchivePartnerData = {
	archiveType: "",
	archiveReason: "",
}
