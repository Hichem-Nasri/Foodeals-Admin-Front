import { FC, useEffect } from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { InputFieldForm } from '@/components/custom/InputField'
import { z } from 'zod'
import { UseFormReturn } from 'react-hook-form'
import { Form, FormField, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/Label'
import { LayoutList } from 'lucide-react'
import { PartnerSolutionType, PartnerStatusType } from '@/types/partnersType'
import { CustomButton } from '@/components/custom/CustomButton'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/lib/routes'
import { UploadFile } from '@/components/Partners/NewPartner/UploadFile'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { DeliveryPartnerSchema } from '@/types/DeliverySchema'
import { getContract } from '@/lib/api/partner/getContract'

interface FormSolutionProps {
    form: UseFormReturn<z.infer<typeof DeliveryPartnerSchema>>
    onSubmit: (data: z.infer<typeof DeliveryPartnerSchema>) => void
    disabled?: boolean
    selectedSolution?: string[]
    id?: string
    status?: string
}

export const FormSolution: FC<FormSolutionProps> = ({
    form,
    onSubmit,
    disabled,
    selectedSolution = [],
    status,
    id,
}) => {
    const { handleSubmit } = form
    const handleOpenContract = async () => {
        try {
            const contractData = await getContract(id!)
            const url = window.URL.createObjectURL(contractData as Blob)
            window.open(url, '_blank') // Opens the contract in a new tab
        } catch (error) {
            console.error('Error opening contract:', error)
        }
    }
    console.log(
        'Checking----------',
        status == PartnerStatusType.VALID,
        status,
        PartnerStatusType.VALID
    )
    const solutions = form.watch('solutions')
    return (
        <Accordion
            type="single"
            collapsible
            className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
            defaultValue="features"
        >
            <AccordionItem
                value="features"
                className="text-lynch-400 text-[1.375rem] font-normal "
            >
                <AccordionTrigger className="font-normal text-[1.375rem] py-0">
                    Fonctionnalités
                </AccordionTrigger>
                <AccordionContent className="pt-7 gap-[30px] lg:gap-0 flex flex-col px-4 pb-4 lg:px-0">
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col justify-end gap-[1.875rem] w-full">
                                <div className=" lg:flex-row flex-col lg:items-center gap-3 w-full">
                                    <div>
                                        <div className="flex flex-col gap-3 h-fit text-lynch-400 lg:min-w-40 min-w-full">
                                            <Label
                                                label="Nos solution"
                                                htmlFor={
                                                    PartnerSolutionType.DLC_PRO
                                                }
                                                className="text-xs font-semibold text-lynch-950"
                                            />
                                            <div className="flex gap-4  flex-col w-full">
                                                <>
                                                    {solutions.marketPro
                                                        ?.selected && (
                                                        <div className="flex lg:flex-row flex-col justify-start items-start lg:items-end my-auto h-fit w-full gap-4">
                                                            <PartnerSolution
                                                                solution={
                                                                    PartnerSolutionType.MARKET_PRO
                                                                }
                                                                className="px-4 py-[0.4rem] my-3"
                                                                size={20}
                                                            />
                                                            <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
                                                                <InputFieldForm
                                                                    label="Coût de livraison"
                                                                    name="solutions.marketPro.deliveryCost"
                                                                    control={
                                                                        form.control
                                                                    }
                                                                    placeholder="Saisir Coût de livraison"
                                                                    type="number"
                                                                    disabled={
                                                                        disabled
                                                                    }
                                                                />
                                                                <InputFieldForm
                                                                    label="Commission Foodeals"
                                                                    name="solutions.marketPro.commission"
                                                                    control={
                                                                        form.control
                                                                    }
                                                                    placeholder="Saisir Commission Foodeals"
                                                                    type="number"
                                                                    disabled={
                                                                        disabled
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                    {solutions.donatePro
                                                        ?.selected && (
                                                        <div className="flex lg:flex-row flex-col justify-start items-start lg:items-end my-auto h-fit w-full gap-4">
                                                            <PartnerSolution
                                                                solution={
                                                                    PartnerSolutionType.DONATE_PRO
                                                                }
                                                                className="px-4 py-[0.4rem] my-3"
                                                                size={20}
                                                            />
                                                            <div className="flex lg:flex-row flex-col items-center gap-3 w-full flex-1">
                                                                <InputFieldForm
                                                                    label="Coût de livraison"
                                                                    name="solutions.donatePro.deliveryCost"
                                                                    control={
                                                                        form.control
                                                                    }
                                                                    placeholder="Saisir Coût de livraison"
                                                                    type="number"
                                                                    disabled={
                                                                        disabled
                                                                    }
                                                                />
                                                                <InputFieldForm
                                                                    label="Commission Foodeals"
                                                                    name="solutions.donatePro.commission"
                                                                    control={
                                                                        form.control
                                                                    }
                                                                    placeholder="Saisir Commission Foodeals"
                                                                    type="number"
                                                                    disabled={
                                                                        disabled
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    <FormField
                                        control={form.control}
                                        name={'documents' as any}
                                        render={({ field }) => (
                                            <div className="flex flex-col items-start gap-3 w-full text-lynch-400">
                                                <Label
                                                    label={
                                                        status ==
                                                        PartnerStatusType.VALID
                                                            ? 'Documents'
                                                            : 'Ajouter les documents'
                                                    }
                                                    className="text-xs font-semibold text-lynch-950"
                                                />
                                                {status ==
                                                PartnerStatusType.VALID ? (
                                                    <button
                                                        type="button"
                                                        title="voir contract"
                                                        className="p-2 rounded-[12px] bg-lynch-100 flex justify-start flex-col items-center space-y-2"
                                                        onClick={
                                                            handleOpenContract
                                                        }
                                                    >
                                                        <img
                                                            src="/icons/pdf.png"
                                                            alt="pdf"
                                                            className="w-24 h-fit object-cover"
                                                        />
                                                        <h3 className="text-lynch-950 text-xs">
                                                            Contrat.pdf
                                                        </h3>
                                                    </button>
                                                ) : (
                                                    <UploadFile
                                                        onChange={(files) =>
                                                            files &&
                                                            field.onChange(
                                                                files
                                                            )
                                                        }
                                                        value={field.value!}
                                                    />
                                                )}
                                                <FormMessage />
                                            </div>
                                        )}
                                    />
                                }
                            </div>
                        </form>
                    </Form>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
