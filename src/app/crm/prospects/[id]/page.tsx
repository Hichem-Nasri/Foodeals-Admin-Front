'use client'
import api from '@/lib/Auth'
import { EventPopUps } from '@/components/crm/NewEvent/EventPopUps'
import { NewEvenent } from '@/components/crm/NewEvent/newEvent'
import ArchiveConfimation from '@/components/crm/Prospect/ArchiveConfimation'
import { FormCrmInfoDisplay } from '@/components/crm/Prospect/FormProspectInfoDispaly'
import { TopBar } from '@/components/crm/Prospect/NewProspect/TopBar'
import { CustomButton } from '@/components/custom/CustomButton'
import { Layout } from '@/components/Layout/Layout'
import { ArchivePartner } from '@/components/Partners/NewPartner/ArchivePartner'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Archiver } from '@/components/utils/Archiver'
import { useNotification } from '@/context/NotifContext'
import { archiveProspect } from '@/lib/api/crm/prospect/archiveProspects'
import { API_PROSPECTS } from '@/lib/api_url'
import { AppRoutes } from '@/lib/routes'
import {
    CrmInformationSchema,
    getCrmCreateData,
    getInfoData,
} from '@/types/CrmScheme'
import { CrmType } from '@/types/CrmType'
import { ArchiveType, NotificationType } from '@/types/GlobalType'
import { ArchivePartnerSchema } from '@/types/PartnerSchema'
import { PartnerStatusType } from '@/types/partnersType'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { get } from 'http'
import { Archive, Info, X } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ProspectElement = ({ data, id }: { data: CrmType; id: string }) => {
    const [prospect, setProspect] = React.useState(() => data)
    const params = useSearchParams()
    const [countryCode, setCountryCode] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [leadKo, setLeadko] = React.useState(false)
    const [readOnly, setReadOnly] = React.useState(true)
    const Notif = useNotification()
    const router = useRouter()
    console.log(id)
    const { mutate, isPending } = useMutation({
        mutationKey: ['prospect'],
        mutationFn: (data: any) => {
            console.log('data: ', data)
            console.log('prospect: ', prospect)
            return api.put(`${API_PROSPECTS}/${id}`, {
                ...data,
                status: prospect.status,
                type: prospect.type,
            })
        },
        onSuccess: () => {
            Notif.notify(
                NotificationType.SUCCESS,
                'Prospect updated successfully'
            )
        },
        onError: () => {
            Notif.notify(NotificationType.ERROR, 'Failed to update prospect')
        },
    })
    console.log('prospect: ', prospect)
    const CrmInformation = useForm<z.infer<typeof CrmInformationSchema>>({
        resolver: zodResolver(CrmInformationSchema),
        mode: 'onBlur',
        defaultValues: { ...getInfoData(prospect) },
    })
    const onSubmitCrmInfo = (data: z.infer<typeof CrmInformationSchema>) => {
        console.log('UPdate')
        const newData = {
            ...getCrmCreateData(data),
        }
        mutate(newData)
    }

    const queryClient = useQueryClient()

    const handleArchiver = async (
        data: z.infer<typeof ArchivePartnerSchema>
    ) => {
        const type =
            prospect.status == PartnerStatusType.CANCELED
                ? 'DE_ARCHIVE'
                : 'ARCHIVE'
        const archiveData: ArchiveType = {
            action: type,
            reason: data?.archiveType || 'OTHER',
            details: data?.archiveReason || '',
        }
        const res = await archiveProspect(
            id,
            archiveData,
            prospect.status == PartnerStatusType.CANCELED
                ? 'IN_PROGRESS'
                : 'CANCELED'
        )
        if (res.status === 200) {
            Notif.notify(
                NotificationType.SUCCESS,
                'Prospect' +
                    (type == 'ARCHIVE' ? 'archived' : 'desarchive') +
                    'successfully'
            )
            prospect.status = type == 'ARCHIVE' ? 'CANCELED' : 'IN_PROGRESS'
        } else {
            Notif.notify(NotificationType.ERROR, 'Failed to archive prospect')
        }
        setLeadko(false)
        queryClient.invalidateQueries({ queryKey: ['prospect'] })
    }

    useEffect(() => {
        if (params.get('mode') === 'edit') {
            setReadOnly(false)
        }
    }, [params])

    console.log('prospect: ', CrmInformation.formState.errors)
    return (
        <div className="flex flex-col gap-[0.625rem] w-full lg:px-3 lg:mb-0 mb-20 overflow-auto">
            {!open ? (
                <>
                    <TopBar
                        status={prospect.status as PartnerStatusType}
                        primaryButtonDisabled={
                            readOnly &&
                            prospect.status == PartnerStatusType.IN_PROGRESS
                        }
                        secondaryButtonDisabled={readOnly}
                        onSaveData={() => {
                            CrmInformation.handleSubmit(onSubmitCrmInfo)()
                        }}
                        onSubmit={() => {
                            router.push(
                                AppRoutes.newConvertir.replace(
                                    ':id',
                                    id as string
                                )
                            )
                        }}
                        open={open}
                        isLoading={isPending}
                    />
                    <FormCrmInfoDisplay
                        onSubmit={onSubmitCrmInfo}
                        form={CrmInformation}
                        countryCode={countryCode}
                        setCountryCode={setCountryCode}
                        disabled={
                            readOnly ||
                            [
                                PartnerStatusType.CANCELED,
                                PartnerStatusType.VALID,
                            ].includes(prospect.status as PartnerStatusType)
                        }
                        type={
                            ['ASSOCIATION', 'FOOD_BANK'].includes(
                                prospect.type!
                            )
                                ? 'ASSOCIATION'
                                : 'PARTNER'
                        }
                    />
                    <NewEvenent
                        disabled={
                            readOnly ||
                            [
                                PartnerStatusType.CANCELED,
                                PartnerStatusType.VALID,
                            ].includes(prospect.status as PartnerStatusType)
                        }
                        Event={prospect.event}
                        setOpen={setOpen}
                        convertir={readOnly}
                        status={prospect.status as PartnerStatusType}
                        prospect={prospect}
                    />
                    <div className="w-full p-5 gap-[30px] rounded-[14px] bg-white flex justify-end items-center">
                        <CustomButton
                            label={
                                prospect?.status == PartnerStatusType.CANCELED
                                    ? 'LeadOK'
                                    : 'LeadKo'
                            }
                            onClick={() => setLeadko(true)}
                            size={'sm'}
                            disabled={[PartnerStatusType.VALID].includes(
                                prospect?.status as PartnerStatusType
                            )}
                            variant={'secondary'}
                            className={`w-fit rounded=[12px] border-[1.5px] px-5 py-3 ${
                                prospect?.status == PartnerStatusType.CANCELED
                                    ? 'bg-mountain-100 border-primary text-primary'
                                    : 'bg-coral-50 border-coral-500 text-coral-500 hover:bg-coral-100 hover:text-coral-500'
                            }`}
                            IconRight={Archive}
                        />
                    </div>
                </>
            ) : (
                <EventPopUps
                    setOpen={setOpen}
                    open={open}
                    convertir={readOnly}
                    prospect={prospect}
                />
            )}
            <Archiver
                partnerId={id as string}
                open={leadKo}
                setOpen={setLeadko}
                handleArchiver={handleArchiver}
                title={
                    prospect.status == PartnerStatusType.CANCELED
                        ? 'Désarchiver le Prospect'
                        : 'Archiver le Prospect'
                }
            />
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

interface ProspectProps {
    params: {
        id: string
    }
}

const ProspectPage: FC<ProspectProps> = ({ params }) => {
    const { prospect, isSuccess, error } = useProspect(params.id)

    return (
        <Layout formTitle="Prospect">
            {!isSuccess ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error?.message}</div>
            ) : (
                <ProspectElement data={prospect} id={params.id} />
            )}
        </Layout>
    )
}

export default ProspectPage

const getProspect = async (id: string) => {
    if (id) {
        try {
            const res = await api
                .get(`${API_PROSPECTS}/${id}`)
                .then((res) => res.data)
                .catch((err) => {
                    throw new Error(err)
                })
            console.log('res', res)
            return { ...res, event: res.event ? res.event : [] }
        } catch (e) {
            console.error(e)
        }
    }
    return []
}
