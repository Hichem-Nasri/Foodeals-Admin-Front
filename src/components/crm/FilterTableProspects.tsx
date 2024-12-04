import { FC, useEffect, useRef, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { CustomButton } from '../custom/CustomButton'
import { ListFilter, Mail, PhoneCall, X, Check, Eraser } from 'lucide-react'
import { MultiSelectOptionsType } from '../MultiSelect'
import { DateFilter } from '../utils/DateFilters'
import { FilterMultiSelect } from '../utils/FilterMultiSelect'
import { UseFormReturn } from 'react-hook-form'
import { FilterCrmSchema } from '@/types/CrmScheme'
import { z } from 'zod'
import { Form } from '../ui/form'
import SelectManager from '../utils/SelectManager'
import { InputFieldForm } from '../custom/InputField'
import { PartnerStatus } from '../Partners/PartnerStatus'
import { PartnerStatusType } from '@/types/partnersType'
import { useRouter } from 'next/navigation'
import MobileHeader from '../utils/MobileHeader'
import { SelectField } from '../custom/SelectField'
import api from '@/lib/Auth'
import { API_URL } from '@/lib/api'
import { MultiSelectField } from '../custom/MultiSelectField'
import MultiSelectProspects from './MultiSelectProspects'

interface FilterTableProspectsProps {
    FilterForm: UseFormReturn<z.infer<typeof FilterCrmSchema>>
    onSubmit: (data: z.infer<typeof FilterCrmSchema>) => void
    open: boolean
    setOpen: (open: boolean) => void
    type?: string
}

export const FilterTableProspects: FC<FilterTableProspectsProps> = ({
    FilterForm,
    onSubmit,
    open,
    setOpen,
    type,
}) => {
    const { handleSubmit, control } = FilterForm
    const router = useRouter()
    const handleHref = (open: boolean) => {
        const url = window.location.href
        if (open) {
            if (!url.includes('#filter')) {
                router.push(url + '#filter')
            }
        } else {
            if (url.includes('#filter')) {
                router.push(url.replace('#filter', ''))
            }
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                className="flex  items-center gap-3 lg:rounded-[12px] rounded-full lg:border border-lynch-200 border-0 text-lynch-500 font-medium text-sm p-4 lg:px-5 lg:py-3 hover:text-black hover:bg-neutral-100 my-4 lg:my-0 bg-white"
                onClick={() => {
                    handleHref(true)
                }}
            >
                <span className="lg:inline-flex hidden">Filtrer par</span>
                <ListFilter />
            </DialogTrigger>
            <DialogContent
                className="[&>.Icon]:hidden p-5 lg:rounded-[14px] w-full max-w-full rounded-none lg:max-w-[36.25rem] min-w-full lg:min-w-fit gap-[1.875rem] max-h-screen overflow-auto"
                onBlur={() => handleHref(false)}
            >
                <DialogTitle className="text-[1.375rem] font-normal text-lynch-400 lg:flex hidden">
                    Filtrer par
                </DialogTitle>
                <div className="absolute flex lg:hidden top-0 left-0 right-0 min-w-full">
                    <MobileHeader
                        title="Filtrer par"
                        onClick={() => setOpen(false)}
                    />
                </div>
                <FormCrmInfo
                    FilterForm={FilterForm}
                    onSubmit={onSubmit}
                    setOpen={setOpen}
                    type={type}
                />
            </DialogContent>
        </Dialog>
    )
}

interface FormCrmInfoProps {
    FilterForm: UseFormReturn<z.infer<typeof FilterCrmSchema>>
    onSubmit: (data: z.infer<typeof FilterCrmSchema>) => void
    setOpen: (open: boolean) => void
    type?: string
}

const FormCrmInfo: FC<FormCrmInfoProps> = ({
    FilterForm,
    onSubmit,
    setOpen,
    type,
}) => {
    const { handleSubmit, control } = FilterForm
    const refCity = useRef<HTMLInputElement>(null)
    const refRegion = useRef<HTMLInputElement>(null)
    const [city, setCity] = useState<string>('')
    const [region, setRegion] = useState<string>('')
    const [Options, setOptions] = useState<{
        region: MultiSelectOptionsType[]
        city: MultiSelectOptionsType[]
    }>({
        region: [],
        city: [],
    })
    useEffect(() => {
        const fetchCity = async () => {
            const res = await api
                .get(
                    `${API_URL}/v1/crm/prospects/cities/search?city=${city}&country=morocco&page=0&size=10&types=${type}`
                )
                .then((res) => res.data?.content)
                .catch((error) => {
                    console.error(error)
                    return []
                })
            const options = res?.map((city: { id: string; name: string }) => ({
                key: city.id,
                label: city.name,
            }))
            setOptions((prev) => ({ ...prev, city: options }))
        }
        fetchCity()
        const fetchRegion = async () => {
            const res = await api
                .get(
                    `${API_URL}/v1/crm/prospects/regions/search?region=${region}&country=morocco&page=0&size=10&types=${type}`
                )
                .then((res) => res.data?.content)
                .catch((error) => {
                    console.error(error)
                    return []
                })
            const options = res?.map(
                (region: { id: string; name: string }) => ({
                    key: region.id,
                    label: region.name,
                })
            )
            setOptions((prev) => ({ ...prev, region: options }))
        }
        fetchRegion()
    }, [])
    return (
        <Form {...FilterForm}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full min-h-full bg-white mt-10 lg:mt-0 gap-2 flex flex-col "
            >
                <div className="flex flex-col gap-2 gap-x-4">
                    <DateFilter form={FilterForm} disabled={false} />
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <MultiSelectProspects
                            control={control}
                            name="companyName"
                            label="Raison sociale"
                            emptyAvatar="/avatar/emptyUser.png"
                        />
                        {/* <FilterMultiSelect
                            control={control}
                            name="category"
                            label="Catégorie"
                            // normalTransform={true}
                            emptyAvatar="/avatar/emptyPartner.png"
                        /> */}
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full text-sm">
                        <SelectManager
                            control={control}
                            name="creatorInfo"
                            label="Alimente par"
                        />
                        <SelectManager
                            control={control}
                            name="managerInfo"
                            label="Effectuée à"
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <SelectField
                            control={control}
                            name="city"
                            label="Ville"
                            placeholder={'Selectionner la Ville'}
                            options={
                                Options.city.length > 0 ? Options.city : []
                            }
                            search={true}
                            onChangeSearch={(e) => {
                                setCity(e)
                            }}
                            inputRef={refCity}
                        />
                        <SelectField
                            control={control}
                            name="region"
                            label="Région"
                            placeholder="Selectionner la région"
                            options={
                                Options.region.length > 0 ? Options.region : []
                            }
                            search
                            onChangeSearch={(e) => {
                                setRegion(e)
                            }}
                            inputRef={refRegion}
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <InputFieldForm
                            control={control}
                            name="email"
                            label="Email"
                            placeholder="Saisir l'email"
                            IconLeft={Mail}
                        />
                        <InputFieldForm
                            control={control}
                            name="phone"
                            label="Téléphone"
                            placeholder="Saisir le téléphone"
                            IconLeft={PhoneCall}
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <FilterMultiSelect
                            control={control}
                            name="status"
                            label="Status"
                            length={2}
                            transform={(value: MultiSelectOptionsType[]) => {
                                return value.map((option, index) => (
                                    <PartnerStatus
                                        key={index}
                                        status={option.key as PartnerStatusType}
                                    />
                                ))
                            }}
                        />
                    </div>
                </div>
                <div className="flex lg:flex-row flex-col justify-end gap-[0.625rem]">
                    <CustomButton
                        variant="ghost"
                        title="Réinitialiser les filtres"
                        label="Clear"
                        className="[&>.icon]:ml-0 space-x-2 text-primary lg:[&>.label]:hidden h-12 w-fit lg:rounded-full px-2 py-2 justify-self-start"
                        IconRight={Eraser}
                        onClick={() => {
                            FilterForm.reset()
                        }}
                        type="reset"
                    />
                    <div className="flex justify-evenly items-center space-x-2">
                        <CustomButton
                            variant="secondary"
                            label="Annuler"
                            onClick={() => {
                                setOpen(false)
                            }}
                            className="px-5 py-3 h-fit lg:w-fit w-full"
                            IconRight={X}
                            type="submit"
                        />
                        <CustomButton
                            label="Confirmer"
                            onClick={() => {}}
                            className="px-5 py-3 h-fit w-full"
                            IconRight={Check}
                            type="submit"
                        />
                    </div>
                </div>
            </form>
        </Form>
    )
}
