import { FC, useEffect, useState } from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { InputFieldForm } from '@/components/custom/InputField'
import { Form } from '@/components/ui/form'
import { SelectField } from '@/components/custom/SelectField'
import { InputPhoneField } from '@/components/custom/InputFieldPhone'
import { Mail, Users } from 'lucide-react'
import { AvatarField } from '@/components/custom/AvatarField'
import { MultiSelectField } from '@/components/custom/MultiSelectField'
import { DeliveryPartnerSchema } from '@/types/DeliverySchema'
import { CitySelectField } from '@/components/custom/CitySelectField'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { PartnerSolutionType } from '@/types/partnersType'
import { CustomButton } from '@/components/custom/CustomButton'
import { AppRoutes } from '@/lib/routes'
import { useParams, useRouter } from 'next/navigation'
import { fetchActivities } from '@/lib/api/partner/fetchActivites'
import FieldActivities from '@/components/utils/FieldActivities'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import FieldCountry from '@/components/utils/FieldCountry'
import FieldCity from '@/components/utils/FieldCity'
import FieldRegion from '@/components/utils/FieldRegion'
import FieldSolutions from '@/components/utils/FieldSolutions'
import FieldState from '@/components/utils/FieldState'

interface FormDeliveryPartnerProps {
    form: UseFormReturn<z.infer<typeof DeliveryPartnerSchema>>
    onSubmit: (data: z.infer<typeof DeliveryPartnerSchema>) => void
    setCountryCode: (value: string) => void
    countryCode: string
    disabled?: boolean
    selectedSolution?: string[]
}

export const FormDeliveryPartner: FC<FormDeliveryPartnerProps> = ({
    countryCode,
    form,
    onSubmit,
    setCountryCode,
    disabled = false,
    selectedSolution = [],
}) => {
    const { id } = useParams()
    const { handleSubmit, control } = form
    const { country, state, siege, region } = form.watch()
    const [address, setAddress] = useState<{
        countryId: string
        cityId: string
        stateId: string
        regionId: string
    }>({
        countryId: country.id || '',
        cityId: siege.id || '',
        stateId: state.id || '',
        regionId: region.id || '',
    })

    const router = useRouter()
    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="gap-[30px] lg:gap-0 flex flex-col pb-4 lg:px-0"
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
                            Information de l’asociation
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
                                            label="Activité"
                                            disabled={disabled}
                                            type="DELIVERY_PARTNER"
                                        />
                                        <InputFieldForm
                                            control={control}
                                            name="responsibleId"
                                            label="Responsable"
                                            placeholder="Nom du responsable"
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="flex lg:flex-row flex-col items-start gap-3">
                                        <FieldSolutions
                                            control={control}
                                            disabled={disabled}
                                            options={[
                                                {
                                                    key: PartnerSolutionType.MARKET_PRO,
                                                    label: PartnerSolutionType.MARKET_PRO,
                                                },
                                                {
                                                    key: PartnerSolutionType.DONATE_PRO,
                                                    label: PartnerSolutionType.DONATE_PRO,
                                                },
                                            ]}
                                            onChange={(value) => {
                                                form.setValue(
                                                    'solutionsList',
                                                    value
                                                )
                                                form.setValue('solutions', {
                                                    marketPro: {
                                                        selected:
                                                            value.includes(
                                                                PartnerSolutionType.MARKET_PRO
                                                            ),
                                                        deliveryCost: 0,
                                                        commission: 0,
                                                    },
                                                    donatePro: {
                                                        selected:
                                                            value.includes(
                                                                PartnerSolutionType.DONATE_PRO
                                                            ),
                                                        deliveryCost: 0,
                                                        commission: 0,
                                                    },
                                                })
                                            }}
                                            selectedSolution={selectedSolution!}
                                        />
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
                                    </div>
                                    <div className="flex lg:flex-row flex-col items-start gap-3">
                                        <FieldCountry
                                            control={control}
                                            name="country.name"
                                            label="Pays"
                                            disabled={disabled}
                                            country={address.countryId}
                                            onChange={(value) => {
                                                setAddress((prev) => ({
                                                    ...prev,
                                                    countryId: value,
                                                }))
                                            }}
                                        />
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
                                            name="siege.name"
                                            label="Siège"
                                            state={address.stateId}
                                            disabled={disabled}
                                            country={address.countryId}
                                            onChange={(value) => {
                                                setAddress((prev) => ({
                                                    ...prev,
                                                    cityId: value,
                                                }))
                                            }}
                                        />
                                    </div>
                                    <div className="flex lg:grid grid-cols-3 flex-col items-start gap-3">
                                        <FieldRegion
                                            control={control}
                                            name="region.name"
                                            label="Région"
                                            disabled={disabled}
                                            state={address.stateId}
                                            country={address.countryId}
                                            city={address.cityId}
                                            onChange={(value) => {
                                                setAddress((prev) => ({
                                                    ...prev,
                                                    regionId: value,
                                                }))
                                            }}
                                        />
                                        <InputFieldForm
                                            label="Adresse"
                                            name="address"
                                            control={control}
                                            placeholder="Saisir l’adresse"
                                            disabled={disabled}
                                            classNameParent="col-span-2"
                                        />
                                    </div>
                                    <div className="flex lg:grid grid-cols-3 flex-col items-start gap-3">
                                        <CitySelectField
                                            country={address.countryId}
                                            control={control}
                                            label="Zone Couverte"
                                            name="zone"
                                            placeholder="Sélectionnez"
                                            className="col-span-1"
                                            disabled={disabled}
                                        />
                                        {disabled && (
                                            <CustomButton
                                                type="button"
                                                label="List des collaborators"
                                                IconRight={Users}
                                                className="col-auto h-14 self-end w-full lg:w-4/5 lg:col-span-1"
                                                onClick={() => {
                                                    router.push(
                                                        AppRoutes.deliveryCollaborator.replace(
                                                            ':id',
                                                            id as string
                                                        )
                                                    )
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </form>
        </Form>
    )
}
