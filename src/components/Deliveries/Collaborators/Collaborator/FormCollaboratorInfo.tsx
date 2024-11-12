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
import {
    CollaboratorDeliveryScheduleSchema,
    CollaboratorDeliverySchema,
    CollaboratorDeliveryTypeSchema,
} from '@/types/DeliverySchema'
import { PartnerOptions } from '@/lib/utils'
import { AvatarProfile } from '@/components/AvatarProfile'
import { Label } from '@/components/Label'

interface FormCollaboratorInfoProps {
    form: UseFormReturn<z.infer<typeof CollaboratorDeliveryTypeSchema>>
    onSubmit: (data: z.infer<typeof CollaboratorDeliveryTypeSchema>) => void
    setCountryCode: (value: string) => void
    countryCode: string
    disabled?: boolean
}

export const FormCollaboratorInfo: FC<FormCollaboratorInfoProps> = ({
    countryCode,
    form,
    onSubmit,
    setCountryCode,
    disabled,
}) => {
    const { handleSubmit, control } = form
    const adaptOptions = PartnerOptions.map((option) => ({
        key: option.name,
        label: option.name,
    }))
    return (
        <Accordion
            type="single"
            collapsible
            className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
            defaultValue="FormCollaboratorInfo"
        >
            <AccordionItem
                value="FormCollaboratorInfo"
                className="text-lynch-400 text-[1.375rem] font-normal"
            >
                <AccordionTrigger className="font-normal text-[1.375rem] py-0">
                    Information personnelle
                </AccordionTrigger>
                <AccordionContent className="pt-7">
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-[1.875rem]">
                                <div className="flex justify-center items-center h-fit">
                                    <AvatarField
                                        form={form}
                                        name="avatarPath"
                                        alt="avatar"
                                        label="Photo de profil"
                                        className="!rounded-full"
                                        classNameAvatar="!rounded-full size-[8.125rem]"
                                    />
                                </div>
                                <span className="w-fill h-[1px] bg-lynch-100" />
                                <div className="flex flex-col gap-[1.875rem]">
                                    <div className="flex lg:flex-row flex-col items-start gap-3">
                                        <SelectField
                                            control={control}
                                            name="gender"
                                            label="Civilité (e)"
                                            options={[
                                                { key: 'MALE', label: 'MALE' },
                                                {
                                                    key: 'FEMALE',
                                                    label: 'FEMALE',
                                                },
                                            ]}
                                            disabled={disabled}
                                        />
                                        <InputFieldForm
                                            label="Nom"
                                            name="name.lastName"
                                            control={control}
                                            placeholder="Nom"
                                            disabled={disabled}
                                        />
                                        <InputFieldForm
                                            label="Prénom"
                                            name="name.firstName"
                                            control={control}
                                            placeholder="Prénom"
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="flex lg:flex-row flex-col items-start gap-3">
                                        <SelectField
                                            control={control}
                                            name="nationality"
                                            label="Nationalité"
                                            options={[
                                                {
                                                    key: 'Morocco',
                                                    label: 'Morocco',
                                                },
                                                {
                                                    key: 'France',
                                                    label: 'France',
                                                },
                                                {
                                                    key: 'Spain',
                                                    label: 'Spain',
                                                },
                                                {
                                                    key: 'Italy',
                                                    label: 'Italy',
                                                },
                                                {
                                                    key: 'United States',
                                                    label: 'United States',
                                                },
                                            ]}
                                            disabled={disabled}
                                        />
                                        <InputFieldForm
                                            label="CIN"
                                            name="nationalId"
                                            control={control}
                                            placeholder="Numéro de CIN"
                                            disabled={disabled}
                                        />
                                        <InputFieldForm
                                            label="Rôle"
                                            name="role"
                                            control={control}
                                            placeholder="Rôle"
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
                                        <SelectField
                                            name="organization"
                                            options={adaptOptions}
                                            control={control}
                                            label="Partenaire"
                                            className="w-full"
                                            transform={(value) => {
                                                const option =
                                                    PartnerOptions.find(
                                                        (option) =>
                                                            option.name ===
                                                            value
                                                    )
                                                return (
                                                    <div className="flex items-center gap-3">
                                                        <AvatarProfile
                                                            disabled
                                                            iUrl={
                                                                option?.avatar ||
                                                                ''
                                                            }
                                                            alt={option?.name}
                                                            className="!rounded-full size-[40px]"
                                                        />
                                                        <Label
                                                            label={
                                                                option?.name ||
                                                                ''
                                                            }
                                                        />
                                                    </div>
                                                )
                                            }}
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
