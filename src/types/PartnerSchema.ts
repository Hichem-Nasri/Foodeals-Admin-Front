import { z } from "zod"

export const PartnerInformationSchema = z.object({
	logo: z.string(),
	cover: z.string(),
	companyName: z.string(),
	companyType: z.string(),
	responsible: z.string(),
	managerId: z.string(),
	phone: z.string(),
	email: z.string(),
	commercialRegisterNumber: z.string(),
	partnerType: z.string(),
	country: z.string(),
	city: z.string(),
	region: z.string(),
	address: z.string(),
	mapLocation: z.string(),
})

export const defaultPartnerInformationData = {
	logo: "https://via.placeholder.com/120",
	cover: "https://via.placeholder.com/740x223",
	companyName: "",
	companyType: "",
	responsible: "",
	managerId: "",
	phone: "",
	email: "",
	commercialRegisterNumber: "",
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
	companyType: string
	responsible: string
	managerId: string
	phone: string
	email: string
	commercialRegisterNumber: string
	partnerType: string
	country: string
	city: string
	region: string
	address: string
	mapLocation: string
}

export const PartnerSubscriptionSchema = z.object({
	subscriptionType: z.string(),
	bank: z.string(),
	paymentMethod: z.string(),
	beneficiary: z.string(),
	rib: z.string(),
	accountType: z.string(),
	marketPro: z
		.object({
			selected: z.boolean(),
			duration: z.number(),
			amount: z.number(),
			expiration: z.number(),
			managerId: z.string(),
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
