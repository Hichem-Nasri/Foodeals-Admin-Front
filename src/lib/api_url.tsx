import { API_URL } from './api'

const API_PROSPECTS = `${API_URL}/v1/crm/prospects`
const API_PARTNERS = `${API_URL}/v1/organizations/partners`
const API_DELIVERY_PARTNERS = `${API_URL}/v1/organizations/delivery-partners`
const API_PAYMENT_COMMISSIONS = `${API_URL}/v1/payments/commissions`
const API_SUBSCRIPTIONS = `${API_URL}/v1/payments/subscriptions`
const API_ACTIVITIES = `${API_URL}/v1/activities`

const API_COUNTRIES = `${API_URL.replace('api', 'v1')}/countries`
const API_CITIES = `${API_URL.replace('api', 'v1')}/cities`
const API_REGIONS = `${API_URL}/v1/regions`
const API_ASSOCIATIONS = `${API_URL}/v1/organizations/associations`
const API_SIEGES = `${API_URL.replace('api', 'v1')}/sub-entities/associations`
const API_ASSOCIATIONS_USERS = `${API_URL.replace(
    'api',
    'v1'
)}/users/associations`

export {
    API_PROSPECTS,
    API_PARTNERS,
    API_ACTIVITIES,
    API_COUNTRIES,
    API_CITIES,
    API_REGIONS,
    API_DELIVERY_PARTNERS,
    API_PAYMENT_COMMISSIONS,
    API_SUBSCRIPTIONS,
    API_ASSOCIATIONS,
    API_SIEGES,
    API_ASSOCIATIONS_USERS,
}
