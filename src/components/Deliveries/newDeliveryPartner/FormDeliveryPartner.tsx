import { FC } from 'react'

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
import { Mail } from 'lucide-react'
import { AvatarField } from '@/components/custom/AvatarField'
import { MultiSelectField } from '@/components/custom/MultiSelectField'
import { DeliveryPartnerSchema } from '@/types/DeliverySchema'
import { CitySelectField } from '@/components/custom/CitySelectField'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { PartnerSolutionType } from '@/types/partners'

interface FormDeliveryPartnerProps {
    form: UseFormReturn<z.infer<typeof DeliveryPartnerSchema>>
    onSubmit: (data: z.infer<typeof DeliveryPartnerSchema>) => void
    setCountryCode: (value: string) => void
    countryCode: string
    disabled?: boolean
}

export const FormDeliveryPartner: FC<FormDeliveryPartnerProps> = ({
    countryCode,
    form,
    onSubmit,
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
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                        <SelectField
                                            control={control}
                                            name="responsibleId"
                                            label="Responsable"
                                            options={[
                                                {
                                                    key: '1',
                                                    label: 'Responsable',
                                                },
                                                {
                                                    key: '2',
                                                    label: 'Fournisseur',
                                                },
                                            ]}
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="flex lg:flex-row flex-col items-start gap-3">
                                        <MultiSelectField
                                            control={control}
                                            name="solutions"
                                            className="h-auto"
                                            label="Solutions"
                                            options={[
                                                {
                                                    key: PartnerSolutionType.DLC_PRO,
                                                    label: PartnerSolutionType.DLC_PRO,
                                                },
                                                {
                                                    key: PartnerSolutionType.DONATE_PRO,
                                                    label: PartnerSolutionType.DONATE_PRO,
                                                },
                                            ]}
                                            transform={(values) => {
                                                return values.map((value) => (
                                                    <PartnerSolution
                                                        key={value.key}
                                                        solution={
                                                            value.label as PartnerSolutionType
                                                        }
                                                        className="px-4 py-[0.4rem]"
                                                        size={20}
                                                    />
                                                ))
                                            }}
                                            disabled={disabled}
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
                                        <SelectField
                                            control={control}
                                            name="siege"
                                            label="Siège"
                                            options={[
                                                {
                                                    key: '1',
                                                    label: 'Responsable',
                                                },
                                                {
                                                    key: '2',
                                                    label: 'Fournisseur',
                                                },
                                            ]}
                                            disabled={disabled}
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
                                                    key: '1',
                                                    label: 'Responsable',
                                                },
                                                {
                                                    key: '2',
                                                    label: 'Fournisseurs    ',
                                                },
                                            ]}
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="flex lg:grid grid-cols-3 flex-col items-start gap-3">
                                        <CitySelectField
                                            control={control}
                                            label="Zone Couverte"
                                            name="zone"
                                            placeholder="Sélectionnez"
                                            className="col-span-1"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Form>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
