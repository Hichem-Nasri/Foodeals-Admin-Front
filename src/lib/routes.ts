export const appRoutes = {
	home: "/",
	payment: "/paiement",
	paymentDetails: "/paiement/:id",
	statistics: "/statistique",
	partners: "/partenaires",
	newPartner: "/partenaires/partenair/:id",
	collaboratorDetails: "/partenaires/collaborateurs/:PartnerId/:CollaboratorID",
	collaborator: "/partenaires/collaborateurs/:id",
	delivery: "/livraisons",
	newDelivery: "/livraisons/partenaire-livraison/:id",
	associations: "/associations",
	newAssociation: "/associations/association/:id",
	sieges: "/associations/sieges/:id",
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
