import { FC, useState } from 'react'

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
import IframeRenderer from '@/components/Partners/NewPartner/IframeRender'
import { associationInformationSchema } from '@/types/associationSchema'
import FieldActivities from '@/components/utils/FieldActivities'
import SelectManager from '@/components/utils/SelectManager'
import FieldCountry from '@/components/utils/FieldCountry'
import FieldCity from '@/components/utils/FieldCity'
import FieldRegion from '@/components/utils/FieldRegion'
import FieldState from '@/components/utils/FieldState'

interface FormAssociationProps {
    form: UseFormReturn<z.infer<typeof associationInformationSchema>>
    onSubmit: (data: z.infer<typeof associationInformationSchema>) => void
    setCountryCode: (value: string) => void
    countryCode: string
    disabled?: boolean
    isLoaded?: boolean
}

export const FormAssociation: FC<FormAssociationProps> = ({
    form,
    onSubmit,
    countryCode,
    setCountryCode,
    disabled,
    isLoaded,
}) => {
    const { country, state, city, region } = form.watch()

    const [address, setAddress] = useState({
        countryId: country.id || '',
        stateId: state.id || '',
        cityId: city.id || '',
        regionId: region.id || '',
    })
    const { handleSubmit, control } = form
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
                        label="Image du logo"
                        className="lg:static lg:translate-x-0 absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 w-auto"
                        classNameAvatar="rounded-full lg:rounded-[18px] bg-white"
                        isLoaded={isLoaded}
                    />
                    <AvatarField
                        form={form}
                        name="cover"
                        alt="cover"
                        label="Photo de couverture"
                        className="lg:w-fit w-full"
                        classNameAvatar="lg:h-[223px] h-[200px] lg:w-[740px] w-full rounded-[24px] bg-white"
                        isLoaded={isLoaded}
                    />
                </div>
                <Accordion
                    type="single"
                    collapsible
                    className="bg-white lg:p-5 px-4 py-6 rounded-[30px] lg:rounded-[14px]"
                    defaultValue="partnerInfo"
                >
                    <AccordionItem
                        value="partnerInfo"
                        className="text-lynch-400 text-[1.375rem] font-normal"
                    >
                        <AccordionTrigger className="font-normal text-lg lg:text-[1.375rem] py-0">
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
                                        className="lg:static lg:translate-x-0 absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 w-auto"
                                        classNameAvatar="rounded-full lg:rounded-[18px]"
                                        disabled={disabled}
                                        isLoaded={isLoaded}
                                    />
                                    <AvatarField
                                        form={form}
                                        name="cover"
                                        alt="cover"
                                        label="Photo de couverture"
                                        className="lg:w-fit w-full"
                                        classNameAvatar="lg:h-[223px] h-[200px] lg:w-[740px] w-full rounded-[24px]"
                                        disabled={disabled}
                                        isLoaded={isLoaded}
                                    />
                                </div>
                                <span className="w-fill h-[1px] bg-lynch-100 lg:flex hidden" />
                                <div className="flex flex-col gap-[1.875rem]">
                                    <div className="flex lg:flex-row flex-col items-start gap-3">
                                        <InputFieldForm
                                            label="Raison sociale"
                                            name="companyName"
                                            control={control}
                                            placeholder="Nom de rasions sociale"
                                            disabled={disabled}
                                            isLoaded={isLoaded}
                                        />
                                        <FieldActivities
                                            control={control}
                                            name="companyType"
                                            label="Type"
                                            disabled={disabled!}
                                            type="ASSOCIATION"
                                            isLoaded={isLoaded}
                                        />
                                        <InputFieldForm
                                            label="Responsable"
                                            name="responsible"
                                            control={control}
                                            placeholder="Nom de responsable"
                                            disabled={disabled}
                                            isLoaded={isLoaded}
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
                                            isLoaded={isLoaded}
                                        />
                                        <InputFieldForm
                                            IconLeft={Mail}
                                            label="Email"
                                            name="email"
                                            control={control}
                                            placeholder="Email professionnelle"
                                            disabled={disabled}
                                            isLoaded={isLoaded}
                                        />
                                        <InputFieldForm
                                            label="PV"
                                            name="PVNumber"
                                            control={control}
                                            placeholder="Saisir les num des PV"
                                            disabled={disabled}
                                            isLoaded={isLoaded}
                                        />
                                    </div>
                                    <div className="flex lg:flex-row flex-col items-start gap-3">
                                        <SelectManager
                                            control={control}
                                            name="managerId"
                                            label="Manager"
                                            disabled={disabled}
                                            isLoaded={isLoaded}
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
                                    </div>
                                    <div className="flex lg:flex-row flex-col items-start gap-3">
                                        <FieldCity
                                            control={control}
                                            name="city.name"
                                            label="Ville"
                                            placeholder="Ville"
                                            disabled={disabled!}
                                            state={address.stateId}
                                            country={address.countryId}
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
                                            label="Region"
                                            placeholder="Region"
                                            disabled={disabled!}
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
                                            isLoaded={isLoaded}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-3 content-start gap-3">
                                        <SelectField
                                            control={control}
                                            name="associationType"
                                            label="Type d’association"
                                            options={[
                                                {
                                                    key: 'ASSOCIATION',
                                                    label: 'Association',
                                                },
                                                {
                                                    key: 'FOOD_BANK',
                                                    label: 'Food Bank',
                                                },
                                            ]}
                                            disabled={disabled}
                                            isLoaded={isLoaded}
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
