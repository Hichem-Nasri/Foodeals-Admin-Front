import { FC, useEffect, useState } from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { PartnerInformationSchema } from '@/types/PartnerSchema'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { InputFieldForm } from '@/components/custom/InputField'
import { Form } from '@/components/ui/form'
import { SelectField } from '@/components/custom/SelectField'
import { InputPhoneField } from '@/components/custom/InputFieldPhone'
import { Mail } from 'lucide-react'
import { AvatarField } from '@/components/custom/AvatarField'
import { IframeRenderer } from './IframeRender'
import { MultiSelectField } from '@/components/custom/MultiSelectField'
import { Input } from 'postcss'
import { getCities, getCountries, getRegions } from '@/lib/api/fetchAddress'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import SelectManager from '@/components/utils/SelectManager'
import { fetchActivities } from '@/lib/api/partner/fetchActivites'

interface FormPartnerInfoProps {
    form: UseFormReturn<z.infer<typeof PartnerInformationSchema>>
    onSubmit: (data: z.infer<typeof PartnerInformationSchema>) => void
    setCountryCode: (value: string) => void
    countryCode: string
    disabled?: boolean
}

export const FormPartnerInfo: FC<FormPartnerInfoProps> = ({
    form,
    onSubmit,
    countryCode,
    setCountryCode,
    disabled,
}) => {
    const { handleSubmit, control } = form

    const [address, setAddress] = useState<{
        countryId: string
        cityId: string
        regionId: string
    }>({
        countryId: '',
        cityId: '',
        regionId: '',
    })
    const [activity, setActivity] = useState<MultiSelectOptionsType[]>([])
    const [cities, setCities] = useState<MultiSelectOptionsType[]>([])
    const [regions, setRegions] = useState<MultiSelectOptionsType[]>([])
    const [country, setCountry] = useState<MultiSelectOptionsType[]>([])
    useEffect(() => {
        const fetchAddress = async () => {
            const activities = await fetchActivities()
            const countries = await getCountries()
            console.log('Fetched countries:', countries)
            setCountry(countries)
            console.log('Fetched activities:', activities)
            setActivity(activities)
        }
        fetchAddress()
    }, [])

    useEffect(() => {
        const fetchCities = async () => {
            if (address.countryId) {
                const citiesData = await getCities(address.countryId)
                console.log('Fetched cities:', citiesData)
                setCities(citiesData)
            }
        }
        fetchCities()
    }, [address.countryId])

    useEffect(() => {
        const fetchRegions = async () => {
            if (address.cityId) {
                const regionsData = await getRegions(address.cityId)
                console.log('Fetched regions:', regionsData)
                setRegions(regionsData)
            }
        }
        fetchRegions()
    }, [address.cityId])

    return (
        <Accordion
            type="single"
            collapsible
            className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
            defaultValue="partnerInfo"
        >
            <AccordionItem
                value="partnerInfo"
                className="text-lynch-400 text-[1.375rem] font-normal"
            >
                <AccordionTrigger className="font-normal text-[1.375rem] py-0">
                    Information du partenaires
                </AccordionTrigger>
                <AccordionContent className="pt-7">
                    <Form {...form}>
                        <form onSubmit={handleSubmit((e) => onSubmit(e))}>
                            <div className="flex flex-col gap-[1.875rem]">
                                <div className="flex relative gap-5 lg:pb-0 pb-14">
                                    <AvatarField
                                        form={form}
                                        name="logo"
                                        alt="Logo"
                                        label="Image du logo"
                                        className="lg:static lg:translate-x-0 absolute -bottom-5 left-1/2 -translate-x-1/2 z-10"
                                        classNameAvatar="rounded-full"
                                    />
                                    <AvatarField
                                        form={form}
                                        name="cover"
                                        alt="cover"
                                        label="Photo de couverture"
                                        className="lg:w-fit w-full"
                                        classNameAvatar="lg:h-[223px] h-[160px] lg:w-[740px] w-full rounded-[24px]"
                                    />
                                </div>
                                <span className="w-fill h-[1px] bg-lynch-100" />
                                <div className="flex flex-col gap-[1.875rem]">
                                    <div className="flex lg:flex-row flex-col items-start gap-3">
                                        <InputFieldForm
                                            label="Raison sociale"
                                            name="companyName"
                                            control={control}
                                            placeholder="Nom de rasions sociale"
                                            disabled={disabled}
                                        />
                                        <MultiSelectField
                                            control={control}
                                            name="companyType"
                                            label="Type"
                                            options={activity}
                                            disabled={disabled}
                                            placeholder="Sélectionner"
                                            transform={(value) =>
                                                value.map((item) => (
                                                    <span
                                                        key={item.key}
                                                        className="text-[0.625rem] font-bold text-lynch-500 bg-lynch-200 px-3 py-[0.469rem] rounded-full"
                                                    >
                                                        {item.label}
                                                    </span>
                                                ))
                                            }
                                        />
                                        <InputFieldForm
                                            control={control}
                                            name="responsible"
                                            label="Responsable"
                                            placeholder="Nom du responsable"
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="flex lg:flex-row flex-col items-start gap-3">
                                        <InputPhoneField
                                            control={control}
                                            name="phone"
                                            label="Téléphone"
                                            placeholder="Téléphone"
                                            countryCode={countryCode}
                                            onChangeCountryCode={setCountryCode}
                                            disabled={disabled}
                                        />
                                        <InputFieldForm
                                            IconLeft={Mail}
                                            label="Email"
                                            name="email"
                                            control={control}
                                            placeholder="Email professionnelle"
                                            disabled={disabled}
                                        />
                                        <InputFieldForm
                                            label="Numéro de registre de commerce"
                                            name="commercialRegisterNumber"
                                            control={control}
                                            placeholder="Saisir le RC"
                                            disabled={disabled}
                                            type="number"
                                        />
                                    </div>
                                    <div className="flex lg:flex-row flex-col items-start gap-3">
                                        <MultiSelectField
                                            control={control}
                                            name="partnerType"
                                            label="Type de partenaire"
                                            options={[
                                                {
                                                    key: 'buyer_pro',
                                                    label: 'Acheter Pro',
                                                },
                                                {
                                                    key: 'seller_pro',
                                                    label: 'Vendeur Pro',
                                                },
                                            ]}
                                            disabled={disabled}
                                        />
                                        <SelectManager
                                            control={control}
                                            disabled={disabled}
                                        />
                                        <SelectField
                                            control={control}
                                            name="country"
                                            label="Pays"
                                            options={country}
                                            onChange={(value: string) => {
                                                const id = country.find(
                                                    (values) =>
                                                        values.key === value
                                                )?.id
                                                setAddress({
                                                    ...address,
                                                    countryId: id!,
                                                })
                                            }}
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="flex lg:flex-row flex-col items-start gap-3">
                                        <SelectField
                                            control={control}
                                            name="city"
                                            label="Ville"
                                            options={cities}
                                            onChange={(value) => {
                                                const id = cities.find(
                                                    (values) =>
                                                        values.key === value
                                                )?.id
                                                setAddress({
                                                    ...address,
                                                    cityId: id!,
                                                })
                                                console.log('address', address)
                                            }}
                                            disabled={disabled}
                                        />
                                        <SelectField
                                            control={control}
                                            name="region"
                                            label="Région"
                                            options={regions}
                                            onChange={(value) => {
                                                const id = regions.find(
                                                    (values) =>
                                                        values.key === value
                                                )?.id
                                                setAddress({
                                                    ...address,
                                                    regionId: id!,
                                                })
                                                console.log('address', address)
                                            }}
                                            disabled={disabled}
                                        />
                                        <InputFieldForm
                                            label="Adresse"
                                            name="address"
                                            control={control}
                                            placeholder="Saisir l’adresse"
                                            disabled={disabled}
                                        />
                                    </div>
                                    <IframeRenderer
                                        form={form}
                                        disabled={disabled}
                                    />
                                </div>
                            </div>
                        </form>
                    </Form>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
