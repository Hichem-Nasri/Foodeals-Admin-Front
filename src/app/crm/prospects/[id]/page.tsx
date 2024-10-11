'use client'
import api from '@/api/Auth'
import { EventPopUps } from '@/components/crm/NewEvent/EventPopUps'
import { NewEvenent } from '@/components/crm/NewEvent/newEvent'
import { FormCrmInfo } from '@/components/crm/NewProspect/FromProspectInfo'
import { TopBar } from '@/components/crm/NewProspect/TopBar'
import { FormProspectInfoDisplay } from '@/components/crm/Prospect/FormProspectInfoDispaly'
import { CustomButton } from '@/components/custom/CustomButton'
import { Layout } from '@/components/Layout/Layout'
import { DataToCrmObj, extractData } from '@/types/CrmUtils'
import { PartnerStatusType } from '@/types/partners'
import { useQuery } from '@tanstack/react-query'
import { Archive } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'

const API_ENDPOINT = 'http://localhost:8080/api/v1/crm/prospects'

const ProspectElement = ({ prospect }: { prospect: any }) => {
    const [countryCode, setCountryCode] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const { id } = useParams()
    console.log(id)
    console.log(prospect)
    return (
        <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto">
            {!open ? (
                <>
                    <TopBar
                        status={prospect.status}
                        primaryButtonDisabled={false}
                        secondaryButtonDisabled={true}
                        onSaveData={() => {}}
                        onSubmit={() => {}}
                    />
                    <FormProspectInfoDisplay
                        data={prospect}
                        countryCode={countryCode}
                        setCountryCode={setCountryCode}
                        disabled={true}
                    />
                    <NewEvenent
                        Evenet={prospect.events}
                        setOpen={setOpen}
                        convertir={true}
                    />
                    {prospect.events && prospect.events.length > 0 && (
                        <div className="bg-white lg:p-5 px-4 py-6 rounded-[14px] flex justify-end items-center">
                            <CustomButton
                                disabled={false}
                                label="Archiver"
                                onClick={() => console.log('Archiver')}
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

const ProspectPage = () => {
    const { id } = useParams()
    const {
        data: prospect,
        isSuccess,
        error,
    } = useQuery({
        queryKey: ['prospect'],
        queryFn: () => getProspect(id as string),
    })
    if (!isSuccess) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <Layout>
            <ProspectElement prospect={extractData(prospect)} />
        </Layout>
    )
}

export default ProspectPage

const demoProspect = {
    id: '1',
    status: PartnerStatusType.PENDING,
    email: 'test@example.com',
    phone: '1234567890',
    companyName: 'Test Company',
    category: 'Test Category',
    responsable: 'Test Responsable',
    managerInfo: 'test',
    country: 'Test Country',
    city: 'Test City',
    region: 'Test Region',
    address: 'Test Address',
    creatorInfo: 'Test Creator Info',
    event: [],
}

const getProspect = async (id: string) => {
    if (id) {
        const res = await api
            .get(`${API_ENDPOINT}/${id}`)
            .then((res) => res.data)
            .catch((err) => console.error(err))
        return res
    }
    return demoProspect
}
