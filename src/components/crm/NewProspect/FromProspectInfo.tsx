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
import { useQuery } from '@tanstack/react-query'
import api from '@/api/Auth'

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
    const { data: companyTypeOptions } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const res = await api
                .get('http://localhost:8080/Activities')
                .then((res) => res.data)
                .catch((error) => console.log(error))
            console.log('done: ', res)
            return Array.from(
                res.map((item: { id: string; name: string }) => {
                    return {
                        label: item.name,
                        key: item.name,
                    }
                })
            )
        },
    })
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
                                            options={companyTypeOptions as { key: string | number; label: string }[] || []}
                                            disabled={disabled}
                                            className=""
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
                                        <SelectField
                                            label="Alimenter par"
                                            name="creatorInfo"
                                            options={[
                                                {
                                                    label: 'Creator 1',
                                                    key: 'creator1',
                                                    avatar: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Felix',
                                                },
                                                {
                                                    label: 'Creator 2',
                                                    key: 'creator2',
                                                    avatar: 'https://api.dicebear.com/9.x/lorelei/svg?seed=John',
                                                },
                                            ]}
                                            control={control}
                                            placeholder="Nom"
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="flex lg:flex-row flex-col items-start gap-3">
                                        <SelectField
                                            control={control}
                                            options={[
                                                {
                                                    label: 'Creator 1',
                                                    key: 'creator1',
                                                    avatar: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Felix',
                                                },
                                                {
                                                    label: 'Creator 2',
                                                    key: 'creator2',
                                                    avatar: 'https://api.dicebear.com/9.x/lorelei/svg?seed=John',
                                                },
                                            ]}
                                            name="managerInfo"
                                            label="Manager"
                                            placeholder="Nom du manager"
                                            disabled={disabled}
                                        />
                                        <SelectField
                                            control={control}
                                            name="country"
                                            label="Pays"
                                            options={[
                                                {
                                                    label: 'Morocco',
                                                    key: 'Morocco',
                                                },
                                            ]}
                                            className="[&_*_.avatar]:grid [&_*_.avatar]:size-8 [&_*_.avatar]:rounded-full [&_*_.avatar]:place-items-center [&_*_.avatar]:m-auto"
                                            disabled={disabled}
                                        />
                                        <SelectField
                                            options={[
                                                {
                                                    label: 'Casablanca',
                                                    key: 'Casablanca',
                                                },
                                            ]}
                                            control={control}
                                            name="city"
                                            label="Ville"
                                            placeholder="Ville"
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="flex lg:grid lg:grid-cols-3 flex-col items-start justify-start gap-3 ">
                                        <SelectField
                                            options={[
                                                {
                                                    label: 'maarif',
                                                    key: 'maarif',
                                                },
                                            ]}
                                            className="col-span-1"
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
