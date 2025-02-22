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
import { MultiSelectField } from '@/components/custom/MultiSelectField'
import { Input } from 'postcss'
import { getCities, getCountries, getRegions } from '@/lib/api/fetchAddress'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import SelectManager from '@/components/utils/SelectManager'
import { fetchActivities } from '@/lib/api/partner/fetchActivites'
import IframeRenderer from '@/components/Partners/NewPartner/IframeRender'
import FieldActivities from '@/components/utils/FieldActivities'
import FieldCountry from '@/components/utils/FieldCountry'
import FieldCity from '@/components/utils/FieldCity'
import FieldRegion from '@/components/utils/FieldRegion'
import FieldState from '@/components/utils/FieldState'

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
    const { country, state, city, region } = form.watch()

    const [address, setAddress] = useState<{
        countryId: string
        stateId: string
        cityId: string
        regionId: string
    }>({
        countryId: country.id || '',
        stateId: state.id || '',
        cityId: city.id || '',
        regionId: region.id || '',
    })
    console.log('hello partner')
    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="gap-[30px] lg:gap-0 flex flex-col "
            >
                <div className="flex relative gap-5 lg:pb-0 pb-14 lg:hidden my-6">
                    <AvatarField
                        form={form}
                        name="logo"
                        alt="Logo"
                        disabled={disabled}
                        label="Image du logo"
                        className="lg:static lg:translate-x-0 absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 w-auto"
                        classNameAvatar="rounded-full lg:rounded-[18px] bg-white"
                    />
                    <AvatarField
                        form={form}
                        name="cover"
                        alt="cover"
                        disabled={disabled}
                        label="Photo de couverture"
                        className="lg:w-fit w-full"
                        classNameAvatar="lg:h-[223px] h-[200px] lg:w-[740px] w-full rounded-[24px] bg-white"
                    />
                </div>
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
                            <div className="flex flex-col gap-[1.875rem]">
                                <div className="lg:flex relative gap-5 lg:pb-0 pb-14 hidden">
                                    <AvatarField
                                        form={form}
                                        name="logo"
                                        alt="Logo"
                                        label="Image du logo"
                                        disabled={disabled}
                                        className="lg:static lg:translate-x-0 absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 w-auto"
                                        classNameAvatar="rounded-full lg:rounded-[18px]"
                                    />
                                    <AvatarField
                                        form={form}
                                        name="cover"
                                        alt="cover"
                                        label="Photo de couverture"
                                        className="lg:w-fit w-full"
                                        disabled={disabled}
                                        classNameAvatar="lg:h-[223px] h-[200px] lg:w-[740px] w-full rounded-[24px]"
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
                                        <FieldActivities
                                            control={control}
                                            name="companyType"
                                            label="Type"
                                            disabled={disabled!}
                                            type="PARTNER"
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
                                            name="managerId"
                                            label="Manager"
                                            control={control}
                                            disabled={disabled}
                                        />
                                        <FieldCountry
                                            control={control}
                                            name="country.name"
                                            label="Pays"
                                            placeholder="Pays"
                                            disabled={disabled!}
                                            country={address.countryId}
                                            onChange={(value) => {
                                                setAddress((prev) => ({
                                                    ...prev,
                                                    countryId: value,
                                                }))
                                            }}
                                        />
                                    </div>
                                    <div className="flex lg:flex-row flex-col items-start gap-3">
                                        <FieldState
                                            control={control}
                                            name="state.name"
                                            label="State"
                                            disabled={disabled!}
                                            country={address.countryId}
                                            onChange={(value) => {
                                                setAddress((prev) => ({
                                                    ...prev,
                                                    stateId: value,
                                                }))
                                            }}
                                        />
                                        <FieldCity
                                            control={control}
                                            name="city.name"
                                            label="Ville"
                                            placeholder="Ville"
                                            disabled={disabled!}
                                            country={address.countryId}
                                            state={address.stateId}
                                            onChange={(value) => {
                                                setAddress((prev) => ({
                                                    ...prev,
                                                    cityId: value,
                                                }))
                                            }}
                                        />
                                        <FieldRegion
                                            control={control}
                                            name="region.name"
                                            label="Région"
                                            placeholder="Région"
                                            disabled={disabled!}
                                            country={address.countryId}
                                            state={address.stateId}
                                            city={address.cityId}
                                            onChange={(value) => {
                                                setAddress((prev) => ({
                                                    ...prev,
                                                    regionId: value,
                                                }))
                                            }}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-3 contents-start gap-3">
                                        <InputFieldForm
                                            label="Adresse"
                                            name="address"
                                            control={control}
                                            placeholder="Saisir l’adresse"
                                            disabled={disabled}
                                            classNameParent="col-span-2"
                                        />
                                    </div>
                                    <IframeRenderer
                                        form={form}
                                        disabled={disabled}
                                    />
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </form>
        </Form>
    )
}
