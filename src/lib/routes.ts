import Collaborateurs from '@/components/Collaborators'
import { Collaborator } from '@/components/Deliveries/Collaborators/Collaborator'

export const AppRoutes = {
    home: '/',
    payment: '/paiement',
    collaboratorAssociation: '/associations/collaborateur/:id',
    paymentDetails: '/paiement/:id',
    businessPartner: '/paiement/partenaire-business',
    businessPartnerDetails: '/paiement/partenaire-livraisons/:id',
    PBCommission: '/paiement/partenaire-business/commissions',
    PBSubscription: '/paiement/partenaire-business/subscriptions',
    PBCommissionDetails: '/paiement/partenaire-business/commissions/:id',
    SubStoreCommission:
        '/paiement/partenaire-business/commissions/sub-store/:id',
    PBSubscriptionDetails: '/paiement/partenaire-business/subscriptions/:id',
    newBusinessPartner: '/paiement/partenaire-business/:id',
    paymentDeliveries: '/paiement/partenaire-livraisons',
    paymentDeliveriesDetails:
        '/paiement/partenaire-livraisons/operation-month/:id',
    statistics: '/statistique',
    partners: '/partenaires',
    newPartner: '/partenaires/partenair/:id',
    newConvertir: '/partenaires/convertir/:id',
    newProspect: '/crm/prospects/create',
    subAccountPartner: '/partenaires/partenair/sub-account/:id',
    prospects: '/crm/prospects/',
    crmDemandes: '/crm/demandes',
    CrmDemandesDetails: '/crm/demandes/:id',
    newCrmDemandes: '/crm/demandes/create',
    collaboratorDetails:
        '/partenaires/collaborateurs/:PartnerId/:CollaboratorId',
    collaborator: '/partenaires/collaborateurs/:id',
    CollaboratorSubEntities: '/collaborateurs/:id',
    products: '/produits',
    newProduct: '/produits/new',
    ProductDetails: '/produits/:id',
    delivery: '/livraisons',
    newDelivery: '/livraisons/partenaire-livraison/:id',
    deliveryCollaborator: '/livraisons/collaborateurs/:id',
    deliveryCollaboratorDetails: '/livraisons/collaborateur/:id',
    deliveryPayment: '/paiement/partenaire-livraisons',
    associations: '/associations',
    newAssociation: '/associations/association/:id',
    sieges: '/associations/sieges/:id',
    crm: '/crm',
    marketing: '/marketing',
    settings: '/settings',
    humanResources: '/ressources-humaines',
    website: '/site-web',
    blog: '/site-web/blog',
    presse: '/site-web/presse',
    support: '/site-web/support',
    supportDetails: '/site-web/support/:id',
    parameter: '/parametre',
}

type MobilePagesType = {
    href: string
    label: string
}

export const mobileLayout: MobilePagesType[] = [
    { href: 'partenaires/partenair/', label: 'Create Partner' },
    {
        href: '/paiement/partenaire-business/commissions/sub-store/',
        label: 'operations de mois',
    },
    { href: '/site-web/support/', label: 'Détail du notification' },
    { href: '#filter', label: 'Filter' },
    { href: 'crm/prospects/create', label: 'nouveau prospect' },
    { href: 'crm/prospects/', label: 'prospect' },
]

export const appApi = {
    partnerDetails: '/partner/{partnerId}',
    paymentReceived: '/v1/payments/form-data/{paymentId}?type=COMMISSION',
    productDetails: '/product/{productId}',
    productList: '/v1/products',
}
