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
import { IframeRenderer } from '@/components/Partners/NewPartner/IframeRender'
import { associationInformationSchema } from '@/types/associationSchema'
import FieldActivities from '@/components/utils/FieldActivities'
import SelectManager from '@/components/utils/SelectManager'
import FieldCountry from '@/components/utils/FieldCountry'
import FieldCity from '@/components/utils/FieldCity'
import FieldRegion from '@/components/utils/FieldRegion'

interface FormAssociationProps {
    form: UseFormReturn<z.infer<typeof associationInformationSchema>>
    onSubmit: (data: z.infer<typeof associationInformationSchema>) => void
    setCountryCode: (value: string) => void
    countryCode: string
    disabled?: boolean
}

export const FormAssociation: FC<FormAssociationProps> = ({
    form,
    onSubmit,
    countryCode,
    setCountryCode,
    disabled,
}) => {
    const [address, setAddress] = useState({
        countryId: '',
        cityId: '',
        regionId: '',
    })
    const { handleSubmit, control } = form
    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="gap-[30px] lg:gap-0 flex flex-col px-4 pb-4 lg:px-0"
            >
                <div className="flex relative gap-5 lg:pb-0 pb-14 lg:hidden my-6">
                    <AvatarField
                        form={form}
                        name="logo"
                        alt="Logo"
                        label="Image du logo"
                        className="lg:static lg:translate-x-0 absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 w-auto"
                        classNameAvatar="rounded-full lg:rounded-[18px] bg-white"
                    />
                    <AvatarField
                        form={form}
                        name="cover"
                        alt="cover"
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
                                        className="lg:static lg:translate-x-0 absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 w-auto"
                                        classNameAvatar="rounded-full lg:rounded-[18px]"
                                        disabled={disabled}
                                    />
                                    <AvatarField
                                        form={form}
                                        name="cover"
                                        alt="cover"
                                        label="Photo de couverture"
                                        className="lg:w-fit w-full"
                                        classNameAvatar="lg:h-[223px] h-[200px] lg:w-[740px] w-full rounded-[24px]"
                                        disabled={disabled}
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
                                        />
                                        <FieldActivities
                                            control={control}
                                            name="companyType"
                                            label="Type"
                                            disabled={disabled!}
                                            type="ASSOCIATION"
                                        />
                                        <InputFieldForm
                                            label="Responsable"
                                            name="responsible"
                                            control={control}
                                            placeholder="Nom de responsable"
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
                                            label="PV"
                                            name="PVNumber"
                                            control={control}
                                            placeholder="Saisir les num des PV"
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="flex lg:flex-row flex-col items-start gap-3">
                                        <SelectManager
                                            control={control}
                                            name="managerId"
                                            label="Manager"
                                            disabled={disabled}
                                        />
                                        <FieldCountry
                                            control={control}
                                            name="country"
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
                                        <FieldCity
                                            control={control}
                                            name="city"
                                            label="Ville"
                                            placeholder="Ville"
                                            disabled={disabled!}
                                            country={address.countryId}
                                            onChange={(value) => {
                                                setAddress((prev) => ({
                                                    ...prev,
                                                    cityId: value,
                                                }))
                                            }}
                                        />
                                    </div>
                                    <div className="flex lg:flex-row flex-col items-start gap-3">
                                        <FieldRegion
                                            control={control}
                                            name="region"
                                            label="Region"
                                            placeholder="Region"
                                            disabled={disabled!}
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
                                        />
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
