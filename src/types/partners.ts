export enum PartnerStatusType {
	VALIDATED = "VALIDATED",
	PENDING = "PENDING",
	ANNULLED = "ANNULLED",
}

export enum PartnerSolutionType {
	MARKET_PRO = "MARKET_PRO",
	DLC_PRO = "DLC_PRO",
	DONATE_PRO = "DONATE_PRO",
}

export enum PartnerCompanyType {
	UNDER_ACCOUNT = "UNDER_ACCOUNT",
	PRINCIPAL = "PRINCIPAL",
}

export interface PartnerType {
	id: string
	createdAt: Date
	logo: string
	companyName: string
	collaborators: number
	underAccount: number
	manager: {
		name: string
		avatar: string
	}
	status: PartnerStatusType
	email: string
	phone: string
	city: string
	solution: PartnerSolutionType[]
	companyType: PartnerCompanyType
}

export const partnersData: PartnerType[] = [
	{
		id: "1",
		createdAt: new Date(),
		logo: "https://api.dicebear.com/7.x/bottts/png",
		companyName: "companyName",
		collaborators: 1,
		underAccount: 1,
		manager: {
			name: "name",
			avatar: "https://api.dicebear.com/7.x/bottts/png",
		},
		status: PartnerStatusType.VALIDATED,
		email: "email",
		phone: "phone",
		city: "city",
		solution: [PartnerSolutionType.MARKET_PRO, PartnerSolutionType.DLC_PRO],
		companyType: PartnerCompanyType.UNDER_ACCOUNT,
	},
	{
		id: "2",
		createdAt: new Date(),
		logo: "https://api.dicebear.com/7.x/bottts/png",
		companyName: "companyName",
		collaborators: 1,
		underAccount: 1,
		manager: {
			name: "name",
			avatar: "https://api.dicebear.com/7.x/bottts/png",
		},
		status: PartnerStatusType.PENDING,
		email: "email",
		phone: "phone",
		city: "city",
		solution: [PartnerSolutionType.DLC_PRO],
		companyType: PartnerCompanyType.PRINCIPAL,
	},
	{
		id: "3",
		createdAt: new Date(),
		logo: "https://api.dicebear.com/7.x/bottts/png",
		companyName: "companyName",
		collaborators: 1,
		underAccount: 1,
		manager: {
			name: "name",
			avatar: "https://api.dicebear.com/7.x/bottts/png",
		},
		status: PartnerStatusType.ANNULLED,
		email: "email",
		phone: "phone",
		city: "city",
		solution: [PartnerSolutionType.DONATE_PRO, PartnerSolutionType.MARKET_PRO, PartnerSolutionType.DLC_PRO],
		companyType: PartnerCompanyType.UNDER_ACCOUNT,
	},
]
