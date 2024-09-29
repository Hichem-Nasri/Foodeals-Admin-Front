export const AppRoutes = {
	home: "/",
	payment: "/paiement",
	paymentDetails: "/paiement/:id",
	statistics: "/statistique",
	partners: "/partenaires",
	newPartner: "/partenaires/partenair/:id",
	collaboratorDetails: "/partenaires/collaborateurs/:PartnerId/:CollaboratorID",
	newCollaborator: "/partenaires/collaborateurs/:id",
	delivery: "/livraisons",
	associations: "/associations",
	crm: "/crm",
	marketing: "/marketing",
	settings: "/settings",
	humanResources: "/ressources-humaines",
	website: "/site-web",
	parameter: "/parametre",
}

export const appApi = {
	partnerDetails: "/partner/{partnerId}",
}
