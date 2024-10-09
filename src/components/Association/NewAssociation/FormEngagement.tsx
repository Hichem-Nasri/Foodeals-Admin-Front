import { FC } from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { InputFieldForm } from '@/components/custom/InputField'
import { z } from 'zod'
import { UseFormReturn } from 'react-hook-form'
import { Form, FormField } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/Label'
import { LayoutList } from 'lucide-react'
import { PartnerSolutionType, PartnerStatusType } from '@/types/partners'
import { CustomButton } from '@/components/custom/CustomButton'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/lib/routes'
import { engagementSchema } from '@/types/associationSchema'
import { UploadFile } from '@/components/Partners/NewPartner/UploadFile'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'

interface FormEngagementProps {
    form: UseFormReturn<z.infer<typeof engagementSchema>>
    onSubmit: (data: z.infer<typeof engagementSchema>) => void
    disabled?: boolean
}

export const FormEngagement: FC<FormEngagementProps> = ({
    form,
    onSubmit,
    disabled,
}) => {
    const { handleSubmit } = form
    const router = useRouter()
    const showAllPartners = () => {
        router.push(AppRoutes.collaborator)
    }
    return (
        <Accordion
            type="single"
            collapsible
            className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
            defaultValue="features"
        >
            <AccordionItem
                value="features"
                className="text-lynch-400 text-[1.375rem] font-normal"
            >
                <AccordionTrigger className="font-normal text-[1.375rem] py-0">
                    Fonctionnalités
                </AccordionTrigger>
                <AccordionContent className="pt-7">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Form {...form}>
                            <div className="flex flex-col justify-end gap-[1.875rem]">
                                <div className="flex lg:flex-row flex-col lg:items-center gap-3">
                                    <div className="lg:w-1/4">
                                        <InputFieldForm
                                            label="Nombre de Sieges"
                                            name="numberOfSieges"
                                            control={form.control}
                                            placeholder="Saisir le nombre des Sieges"
                                            type="number"
                                            disabled={disabled}
                                        />
                                    </div>
                                    <CustomButton
                                        className="h-fit py-4 mt-auto"
                                        label="Voir la liste"
                                        IconRight={LayoutList}
                                        onClick={showAllPartners}
                                    />
                                    <div>
                                        <div className="flex flex-col gap-3 h-full text-lynch-400 lg:min-w-40">
                                            <Label
                                                label="Nos solution"
                                                htmlFor={
                                                    PartnerSolutionType.DLC_PRO
                                                }
                                                className="text-xs font-semibold text-lynch-950"
                                            />
                                            <FormField
                                                control={form.control}
                                                name="solutions"
                                                render={({ field }) => (
                                                    <div className="flex gap-3 items-center">
                                                        <div className="flex items-center my-auto h-full gap-2">
                                                            <Checkbox
                                                                name={
                                                                    PartnerSolutionType.DONATE_PRO
                                                                }
                                                                className="size-5"
                                                                checked={field.value.includes(
                                                                    PartnerSolutionType.DONATE_PRO
                                                                )}
                                                                onClick={() =>
                                                                    field.onChange(
                                                                        field.value.includes(
                                                                            PartnerSolutionType.DONATE_PRO
                                                                        )
                                                                            ? [
                                                                                  ...field.value.filter(
                                                                                      (
                                                                                          item
                                                                                      ) =>
                                                                                          item !==
                                                                                          PartnerSolutionType.DONATE_PRO
                                                                                  ),
                                                                              ]
                                                                            : [
                                                                                  ...field.value,
                                                                                  PartnerSolutionType.DONATE_PRO,
                                                                              ]
                                                                    )
                                                                }
                                                            />
                                                            <PartnerSolution
                                                                solution={
                                                                    PartnerSolutionType.DONATE_PRO
                                                                }
                                                                className="px-4 py-[0.4rem] my-3"
                                                                size={20}
                                                            />
                                                        </div>
                                                        <div className="flex items-center my-auto h-full gap-2">
                                                            <Checkbox
                                                                name={
                                                                    PartnerSolutionType.DLC_PRO
                                                                }
                                                                className="size-5"
                                                                checked={field.value.includes(
                                                                    PartnerSolutionType.DLC_PRO
                                                                )}
                                                                onClick={() =>
                                                                    field.onChange(
                                                                        field.value.includes(
                                                                            PartnerSolutionType.DLC_PRO
                                                                        )
                                                                            ? [
                                                                                  ...field.value.filter(
                                                                                      (
                                                                                          item
                                                                                      ) =>
                                                                                          item !==
                                                                                          PartnerSolutionType.DLC_PRO
                                                                                  ),
                                                                              ]
                                                                            : [
                                                                                  ...field.value,
                                                                                  PartnerSolutionType.DLC_PRO,
                                                                              ]
                                                                    )
                                                                }
                                                            />
                                                            <PartnerSolution
                                                                solution={
                                                                    PartnerSolutionType.DLC_PRO
                                                                }
                                                                className="px-4 py-[0.4rem] my-3"
                                                                size={20}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <FormField
                                    control={form.control}
                                    name={'document' as any}
                                    render={({ field }) => (
                                        <div className="flex flex-col items-start gap-3 w-full text-lynch-400">
                                            <Label
                                                label="Ajouter les documents"
                                                className="text-xs font-semibold text-lynch-950"
                                            />
                                            <UploadFile
                                                onChange={field.onChange}
                                                value={field.value}
                                            />
                                        </div>
                                    )}
                                />
                            </div>
                        </Form>
                    </form>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
