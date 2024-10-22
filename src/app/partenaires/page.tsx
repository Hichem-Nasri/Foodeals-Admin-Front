'use client'
import { Layout } from '@/components/Layout/Layout'
import { Partners } from '@/components/Partners'
// import { useNotification } from '@/context/NotifContext'
import { NotificationType } from '@/types/Global-Type'
import { partnersData, PartnerType } from '@/types/partners'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface PartnersPageProps {
    params: {
        pathParams: string[]
        lang: string
    }
    searchParams: {
        partnerId: string
    }
}

export default async function PartnersPage({
    searchParams,
}: PartnersPageProps) {
    // const { subAccounts, partners } = await getPartners(searchParams.partnerId)
    return (
        <Layout>
            <Partners partners={partnersData} />
        </Layout>
    )
}

// const fetchPartners = async ({
//     pageSize,
//     page,
// }: {
//     pageSize: number
//     page: number
// }) => {
//     const Notif = useNotification()
//     const { data, error, isLoading } = useQuery({
//         queryKey: ['partners'],
//         queryFn: async () => {
//             try {
//                 const res = await axios
//                     .get(
//                         `localhost:8080/api/v1/organizations/partners?page=${page}&size=${pageSize}&sort=createdAt:desc`
//                     )
//                     .then((res) => res.data)
//                     .catch((err) => {
//                         throw new Error(err)
//                     })
//                 return res
//             } catch (error) {
//                 Notif.notify(
//                     NotificationType.ERROR,
//                     'Erreur lors de la récupération des partenaires'
//                 )
//                 console.log(error)
//             }
//         },
//     })
//     return { data, error, isLoading }
// }

// const getPartners = async (id: string) => {
//     if (!id) {
//         const { data, error, isLoading } = await fetchPartners({
//             pageSize: 10,
//             page: 1,
//         })
//         if (data) return { partners: data }
//     }

//     return {
//         subAccounts: [] as PartnerType[],
//     }
// }
