import { FC } from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { CrmInformationSchema } from '@/types/CrmScheme'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { InputFieldForm } from '@/components/custom/InputField'
import { Form } from '@/components/ui/form'
import { SelectField } from '@/components/custom/SelectField'
import { InputPhoneField } from '@/components/custom/InputFieldPhone'
import { Mail, PhoneCall } from 'lucide-react'
import { AvatarField } from '@/components/custom/AvatarField'
import { MultiSelectField } from '@/components/custom/MultiSelectField'
import { CountryData } from '@/types/utils'

interface FormCrmInfoProps {
    form: UseFormReturn<z.infer<typeof CrmInformationSchema>>
    onSubmit: (data: z.infer<typeof CrmInformationSchema>) => void
    disabled?: boolean
    setCountryCode: (value: string) => void
    countryCode: string
}

export const FormCrmInfo: FC<FormCrmInfoProps> = ({
    form,
    onSubmit,
    countryCode,
    setCountryCode,
    disabled,
}) => {
    const { handleSubmit, control } = form
    const companyTypeOptions = [
        { key: 'supermarché', label: 'Supermarché' },
        { key: 'superettes', label: 'Superettes' },
        { key: 'épiceries', label: 'Épiceries' },
        { key: 'boulangeries', label: 'Boulangeries' },
        { key: 'cafés', label: 'Cafés' },
        { key: 'restaurants', label: 'Restaurants' },
        { key: 'hôtels', label: 'Hôtels' },
        { key: 'traiteurs', label: 'Traiteurs' },
        { key: 'autres', label: 'Autres' },
    ]
    return (
        <Accordion
            type="single"
            collapsible
            className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
            defaultValue="CrmInfo"
        >
            <AccordionItem
                value="CrmInfo"
                className="text-lynch-400 text-[1.375rem] font-normal"
            >
                <AccordionTrigger className="font-normal text-[1.375rem] py-0">
                    Information du prospect
                </AccordionTrigger>
                <AccordionContent className="pt-7 w-full">
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-[1.875rem] w-full">
                                <div className="flex flex-col gap-[1.875rem] w-full">
                                    <div className="flex lg:flex-row flex-col items-start gap-3 w-full">
                                        <InputFieldForm
                                            label="Raison sociale"
                                            name="companyName"
                                            control={control}
                                            placeholder="Nom de rasions sociale"
                                            disabled={disabled}
                                        />
                                        <MultiSelectField
                                            control={control}
                                            name="category"
                                            label="Catégorie"
                                            options={companyTypeOptions}
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
                                            name="responsable"
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
                                            IconLeft={PhoneCall}
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
                                            label="Alimenter par"
                                            name="creatorInfo"
                                            control={control}
                                            placeholder="Nom"
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="flex lg:flex-row flex-col items-start gap-3">
                                        <InputFieldForm
                                            control={control}
                                            name="managerInfo"
                                            label="Manager"
                                            placeholder="Nom du manager"
                                            disabled={disabled}
                                        />
                                        <SelectField
                                            control={control}
                                            name="country"
                                            label="Pays"
                                            options={CountryData()}
                                            className="[&_*_.avatar]:grid [&_*_.avatar]:size-8 [&_*_.avatar]:rounded-full [&_*_.avatar]:place-items-center [&_*_.avatar]:m-auto"
                                            disabled={disabled}
                                        />
                                        <InputFieldForm
                                            control={control}
                                            name="city"
                                            label="Ville"
                                            placeholder="Ville"
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="flex lg:grid lg:grid-cols-3 flex-col items-start justify-start gap-3 ">
                                        <InputFieldForm
                                            classNameParent="col-span-1"
                                            className=""
                                            control={control}
                                            name="region"
                                            label="Région"
                                            placeholder="Région"
                                            disabled={disabled}
                                        />
                                        <InputFieldForm
                                            classNameParent="col-span-2"
                                            className=" flex-1 w-full"
                                            placeholder="Adresse"
                                            control={control}
                                            name="address"
                                            label="Adresse"
                                            disabled={disabled}
                                        />
                                    </div>
                                    {/* <IframeRenderer form={form} disabled={disabled} /> */}
                                </div>
                            </div>
                        </form>
                    </Form>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
