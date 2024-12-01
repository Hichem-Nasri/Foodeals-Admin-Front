import { FC } from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { InputFieldForm } from '@/components/custom/InputField'
import { PartnerFeaturesSchema } from '@/types/PartnerSchema'
import { z } from 'zod'
import { UseFormReturn } from 'react-hook-form'
import { Form, FormField } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/Label'
import { FileSpreadsheet, LayoutList } from 'lucide-react'
import { PartnerStatusType } from '@/types/partnersType'
import { CustomButton } from '@/components/custom/CustomButton'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/lib/routes'

interface FormFeaturesProps {
    form: UseFormReturn<z.infer<typeof PartnerFeaturesSchema>>
    onSubmit: (data: z.infer<typeof PartnerFeaturesSchema>) => void
    disabled?: boolean
    status?: PartnerStatusType
    id: string
}

export const FormFeatures: FC<FormFeaturesProps> = ({
    form,
    onSubmit,
    disabled,
    status,
    id,
}) => {
    const { handleSubmit } = form
    const router = useRouter()
    const showAllPartners = () => {
        router.push(AppRoutes.collaborator.replace(':id', id))
    }
    console.log('hello features')
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
                            <div className="flex lg:flex-row flex-col lg:items-end gap-3">
                                <div className="lg:w-full">
                                    <InputFieldForm
                                        label="Nombre de magasin"
                                        name="numberOfStores"
                                        control={form.control}
                                        placeholder="Saisir le nombre des magasins"
                                        type="number"
                                        disabled={disabled}
                                    />
                                </div>
                                <div className="lg:w-full">
                                    <InputFieldForm
                                        label="Nombre de compte"
                                        name="maxNumberOfAccounts"
                                        control={form.control}
                                        placeholder="Saisir le nombre"
                                        type="number"
                                        disabled={disabled}
                                    />
                                </div>
                                <div className="lg:w-full">
                                    <InputFieldForm
                                        label="minimum de Réduction"
                                        name="minimumReduction"
                                        control={form.control}
                                        placeholder="Saisir le nombre"
                                        type="number"
                                        disabled={disabled}
                                    />
                                </div>
                                {status === PartnerStatusType.VALID && (
                                    <CustomButton
                                        className="h-fit py-4"
                                        label="Voir la liste"
                                        IconRight={LayoutList}
                                        onClick={showAllPartners}
                                    />
                                )}
                            </div>
                        </Form>
                    </form>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
