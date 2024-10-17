import CrmDemandes from '@/app/crm/demandes/crmDemandes'
import { NewEvenent } from '@/components/crm/NewEvent/newEvent'

export const AppRoutes = {
    home: '/',
    payment: '/paiement',
    paymentDetails: '/paiement/:id',
    businessPartner: '/paiement/partenaire-business',
    newBusinessPartner: '/paiement/partenaire-business/:id',
    statistics: '/statistique',
    partners: '/partenaires',
    newPartner: '/partenaires/partenair/:id',
    newConvertir: '/partenaires/convertir/:id',
    newProspect: '/crm/prospects/create',
    prospects: '/crm/prospects/',
    crmDemandes: '/crm/demandes',
    CrmDemandesDetails: '/crm/demandes/:id',
    newCrmDemandes: '/crm/demandes/create',
    collaboratorDetails:
        '/partenaires/collaborateurs/:PartnerId/:CollaboratorID',
    collaborator: '/partenaires/collaborateurs/:id',
    delivery: '/livraisons',
    newDelivery: '/livraisons/partenaire-livraison/:id',
    deliveryCollaborator: '/livraisons/collaborateurs/:id',
    deliveryCollaboratorDetails: '/livraisons/collaborateur/:id',
    deliveryPayment: '/livraisons/paiements/:id',
    associations: '/associations',
    newAssociation: '/associations/association/:id',
    sieges: '/associations/sieges/:id',
    crm: '/crm',
    marketing: '/marketing',
    settings: '/settings',
    humanResources: '/ressources-humaines',
    website: '/site-web',
    parameter: '/parametre',
}

export const appApi = {
    partnerDetails: '/partner/{partnerId}',
}
