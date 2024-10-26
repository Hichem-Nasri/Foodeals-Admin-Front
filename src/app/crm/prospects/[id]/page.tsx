'use client'
import api from '@/api/Auth'
import { EventPopUps } from '@/components/crm/NewEvent/EventPopUps'
import { NewEvenent } from '@/components/crm/NewEvent/newEvent'
import { FormCrmInfo } from '@/components/crm/NewProspect/FromProspectInfo'
import { TopBar } from '@/components/crm/NewProspect/TopBar'
import { FormProspectInfoDisplay } from '@/components/crm/Prospect/FormProspectInfoDispaly'
import { CustomButton } from '@/components/custom/CustomButton'
import { Layout } from '@/components/Layout/Layout'
import { AppRoutes } from '@/lib/routes'
import { CrmType } from '@/types/Global-Type'
import { PartnerStatusType } from '@/types/partners'
import { useQuery } from '@tanstack/react-query'
import { get } from 'http'
import { Archive } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const API_ENDPOINT_GET = 'http://localhost:8080/api/v1/crm/prospects'
const API_ENDPOINT_DELETE = 'http://localhost:8080/api/v1/crm/prospects'

const ProspectElement = ({ prospect }: { prospect: CrmType }) => {
    const params = useSearchParams()
    const [countryCode, setCountryCode] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [readOnly, setReadOnly] = React.useState(true)
    const route = useRouter()
    const { id } = useParams()
    console.log(id)
    const handleArchiver = () => {
        api.delete(`${API_ENDPOINT_DELETE}/${id}`)
            .then((res) => res.data)
            .catch((e) => console.error(e))
        route.push('/crm')
    }
    const router = useRouter()
    useEffect(() => {
        if (params.get('mode') === 'edit') {
            setReadOnly(false)
        }
    }, [params.get('mode')])
    return (
        <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto">
            {!open ? (
                <>
                    <TopBar
                        status={PartnerStatusType.DRAFT}
                        primaryButtonDisabled={readOnly}
                        secondaryButtonDisabled={true}
                        onSaveData={() => {}}
                        onSubmit={() => {
                            router.push(
                                AppRoutes.newConvertir.replace(
                                    ':id',
                                    id as string
                                )
                            )
                        }}
                    />
                    <FormProspectInfoDisplay
                        data={prospect}
                        countryCode={countryCode}
                        setCountryCode={setCountryCode}
                        disabled={true}
                    />
                    <NewEvenent
                        Event={prospect.event || []}
                        setOpen={setOpen}
                        convertir={true}
                    />
                    {prospect.event && prospect.event.length > 0 && (
                        <div className="bg-white lg:p-5 px-4 py-6 rounded-[14px] flex justify-end items-center">
                            <CustomButton
                                disabled={false}
                                label="Archiver"
                                onClick={() => {
                                    console.log('Archiver')
                                    handleArchiver()
                                }}
                                className="bg-coral-50 text-coral-500 border border-coral-500 hover:bg-coral-500 hover:text-coral-50
                        transition-all delay-75 duration-100 w-[136px] py-0 px-4 text-center h-14"
                                IconRight={Archive}
                            />
                        </div>
                    )}
                </>
            ) : (
                <EventPopUps
                    setOpen={setOpen}
                    open={open}
                    convertir={true}
                    prospect={prospect}
                />
            )}
        </div>
    )
}
const useProspect = (id: string) => {
    const { data, isSuccess, error } = useQuery({
        queryKey: ['prospect'],
        queryFn: () => getProspect(id),
    })

    return { prospect: data, isSuccess, error }
}

const ProspectPage = () => {
    const { id } = useParams()
    const { prospect, isSuccess, error } = useProspect(id as string)

    return (
        <Layout>
            {!isSuccess ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error?.message}</div>
            ) : (
                <ProspectElement prospect={prospect} />
            )}
        </Layout>
    )
}

enum SubscriptionStatus {
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    VALID = 'VALID',
    CANCELED = 'CANCELED',
}

export default ProspectPage

const getProspect = async (id: string) => {
    const getStatus = (status: string) => {
        switch (status) {
            case SubscriptionStatus.NOT_STARTED:
                return PartnerStatusType.DRAFT
            case SubscriptionStatus.IN_PROGRESS:
                return PartnerStatusType.PENDING
            case SubscriptionStatus.VALID:
                return PartnerStatusType.VALIDATED
            case SubscriptionStatus.CANCELED:
                return PartnerStatusType.ANNULLED
            default:
                return PartnerStatusType.DRAFT
        }
    }
    if (id) {
        try {
            const res = await api
                .get(`${API_ENDPOINT_GET}/${id}`)
                .then((res) => res.data)
                .catch((err) => {
                    throw new Error(err)
                })
            const data = { ...res, status: getStatus(res.status) }
            return data
        } catch (e) {
            console.error(e)
        }
    }
    return {}
}
