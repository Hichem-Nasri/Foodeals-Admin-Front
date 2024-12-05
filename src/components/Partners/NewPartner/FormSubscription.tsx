import { FC, Fragment, useState } from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Form } from '@/components/ui/form'
import { RadioButton } from '@/components/custom/RadioButton'
import { Label } from '@/components/Label'
import { SelectField } from '@/components/custom/SelectField'
import { InputFieldForm } from '@/components/custom/InputField'
import { UseFormReturn } from 'react-hook-form'
import { PartnerSubscriptionSchema } from '@/types/PartnerSchema'
import { z } from 'zod'
import { FormSubscriptionGeneral } from './FormSubscriptionGeneral'
import { FormSubscriptionPersonalized } from './FormSubscriptionPersonalized'
import { UploadFile } from './UploadFile'
import { PartnerStatusType } from '@/types/partnersType'
import Image from 'next/image'

interface FormSubscriptionProps {
    form: UseFormReturn<z.infer<typeof PartnerSubscriptionSchema>>
    onSubmit: (data: z.infer<typeof PartnerSubscriptionSchema>) => void
    disabled?: boolean
    isContractGenerated?: boolean
    status: PartnerStatusType
    onContractUpload: (file: File[]) => void
}

enum FileTypes {
    PDF = 'PDF',
    WORD = 'WORD',
}

export const FormSubscription: FC<FormSubscriptionProps> = ({
    form,
    onSubmit,
    disabled,
    isContractGenerated,
    status,
    onContractUpload,
}) => {
    const { handleSubmit } = form
    const { subscriptionType } = form.watch()
    const partnerType = [
        {
            key: 'NORMAL_PARTNER',
            label: 'Compte normal',
        },
        {
            key: 'PARTNER_WITH_SB',
            label: 'Compte principale',
        },
    ]
    const documents = [
        {
            fileName: 'contrat.word',
            fileID: 'contractID',
        },
        {
            fileName: 'contrat.pdf',
            fileID: 'contractID',
        },
    ] // TODO: fetch documents with the partner id
    const {accountType} = form.watch()
    return (
        <Accordion
            type="single"
            collapsible
            className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
            defaultValue="subscription"
        >
            <AccordionItem
                value="subscription"
                className="text-lynch-400 text-[1.375rem] font-normal"
            >
                <AccordionTrigger className="font-normal text-[1.375rem] py-0">
                    Subscription
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-[1.875rem] pt-7">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Form {...form}>
                            <div className="flex flex-col gap-[1.875rem]">
                                <div className="flex lg:flex-row flex-col justify-between gap-[1.875rem]">
                                    <Label
                                        label="Type d’abonnement"
                                        className="text-sm font-medium"
                                    />
                                    <RadioButton
                                        control={form.control}
                                        name="subscriptionType"
                                        options={[
                                            {
                                                key: 'general',
                                                label: 'Abonnement générale',
                                            },
                                            {
                                                key: 'personalized',
                                                label: 'Abonnement personnalisée',
                                            },
                                        ]}
                                        disabled={disabled}
                                    />
                                </div>

                                <div className="flex flex-col gap-[1.875rem]">
                                    <div className="flex lg:flex-row flex-col items-start gap-3">
                                        <SelectField
                                            control={form.control}
                                            name="bank"
                                            label="La banque"
                                            options={[
                                                { key: 'cih', label: 'CIH' },
                                                { key: 'bank', label: 'Bank' },
                                            ]}
                                            disabled={disabled}
                                        />
                                        <InputFieldForm
                                            label="Bénéficaire"
                                            name="beneficiary"
                                            control={form.control}
                                            placeholder="Saisir le nom du bénéficaire"
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="flex lg:flex-row flex-col items-start gap-3">
                                        <InputFieldForm
                                            label="RIB"
                                            name="rib"
                                            control={form.control}
                                            placeholder="02278012236547789*****"
                                        />
                                        <SelectField
                                            control={form.control}
                                            name="accountType"
                                            label="Type de compte"
                                            options={partnerType}
                                            className=""
                                            disabled={disabled}
                                        />
                                    </div>
                                    {   
                                        accountType != "NORMAL_PARTNER" &&
                                        <div className="flex lg:flex-row flex-col justify-between gap-[1.875rem]">
                                        <Label
                                            label="Abonnement Payant par"
                                            className="text-sm font-medium"
                                        />
                                        <RadioButton
                                            control={form.control}
                                            name="subscriptionPayedBySubEntities"
                                            options={[
                                                {
                                                    key: 'mainEntity',
                                                    label: 'Payé par le partenaire principal',
                                                },
                                                {
                                                    key: 'subEntities',
                                                    label: 'Payé par les sous-entités',
                                                },
                                            ]}
                                            disabled={disabled}
                                            />
                                    </div>
                                        }
                                    <span className="w-fill h-[1px] bg-lynch-100" />
                                    {subscriptionType === 'general' ? (
                                        <FormSubscriptionPersonalized
                                            form={form}
                                            disabled={disabled}
                                        />
                                    ) : (
                                        <FormSubscriptionGeneral
                                            form={form}
                                            disabled={disabled}
                                        />
                                    )}
                                </div>
                            </div>
                        </Form>
                    </form>
                    {isContractGenerated && (
                        <Fragment>
                            <span className="w-fill h-[1px] bg-lynch-100" />
                            <div className="flex flex-col gap-3">
                                <Label
                                    label="Ajouter le contrat"
                                    className="text-lynch-950 text-sm font-medium"
                                />
                                <UploadFile
                                    onChange={onContractUpload}
                                    disabled={disabled}
                                />
                            </div>
                        </Fragment>
                    )}
                    {status === PartnerStatusType.DRAFT && (
                        <span className="w-fill h-[1px] bg-lynch-100" />
                    )}
                    {!isContractGenerated &&
                        status === PartnerStatusType.DRAFT && (
                            <div className="flex flex-col gap-3">
                                <Label
                                    label="Documents & Contrat"
                                    className="text-lynch-950 text-sm font-medium"
                                />
                                <div className="flex items-center gap-3">
                                    {documents.map((document) => (
                                        <span
                                            key={document.fileID}
                                            className="flex flex-col justify-center items-center gap-5 rounded-[24px] bg-lynch-50 px-4 py-6 w-fit"
                                        >
                                            <Image
                                                width={48}
                                                height={48}
                                                alt="Word"
                                                src={
                                                    document.fileName.includes(
                                                        'pdf'
                                                    )
                                                        ? '/word-icon.png'
                                                        : '/pdf-icon.png'
                                                }
                                            />
                                            <Label
                                                label={document.fileName}
                                                className="text-lynch-500 text-base font-normal"
                                            />
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
