import {
    BaseSyntheticEvent,
    FC,
    ReactElement,
    useEffect,
    useState,
} from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { PartnerInformationSchema } from '@/types/PartnerSchema'
import {
    ControllerFieldState,
    ControllerRenderProps,
    ErrorOption,
    Field,
    FieldArray,
    FieldArrayPath,
    FieldError,
    FieldErrors,
    FieldName,
    FieldRefs,
    FieldValues,
    FormState,
    InternalFieldName,
    RegisterOptions,
    SubmitErrorHandler,
    SubmitHandler,
    UseFormRegisterReturn,
    UseFormReturn,
    UseFormStateReturn,
} from 'react-hook-form'
import { z } from 'zod'
import { InputFieldForm } from '@/components/custom/InputField'
import { Form, FormField } from '@/components/ui/form'
import { SelectField } from '@/components/custom/SelectField'
import { InputPhoneField } from '@/components/custom/InputFieldPhone'
import { Mail } from 'lucide-react'
import { AvatarField } from '@/components/custom/AvatarField'
import { MultiSelectField } from '@/components/custom/MultiSelectField'
import { Input } from 'postcss'
import { getCities, getCountries, getRegions } from '@/lib/api/fetchAddress'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import SelectManager from '@/components/utils/SelectManager'
import { fetchActivities } from '@/lib/api/partner/fetchActivites'
import FieldActivities from '@/components/utils/FieldActivities'
import FieldCountry from '@/components/utils/FieldCountry'
import FieldCity from '@/components/utils/FieldCity'
import FieldRegion from '@/components/utils/FieldRegion'
import { Label } from '@/components/Label'
import { SupportSchema } from '@/types/support'
import { Textarea } from '@/components/ui/textarea'
import { UploadFile } from '@/components/Partners/NewPartner/UploadFile'

interface FormDemandeSupportProps {
    form: UseFormReturn<z.infer<typeof SupportSchema>>
    onSubmit: (data: z.infer<typeof SupportSchema>) => void
    disabled?: boolean
}

export const FormDemandeSupport: FC<FormDemandeSupportProps> = ({
    form,
    onSubmit,
    disabled,
}) => {
    return (
        <>
            <div className="w-full lg:flex hidden">
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
                            Nouvelle demande
                        </AccordionTrigger>
                        <AccordionContent className="pt-7">
                            <FormDemande
                                form={form}
                                onSubmit={onSubmit}
                                disabled={disabled}
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="flex lg:hidden justify-center items-start p-4 gap-4 min-w-full">
                <FormDemande
                    form={form}
                    onSubmit={onSubmit}
                    disabled={disabled}
                />
            </div>
        </>
    )
}

interface FormDemandeProps {
    form: UseFormReturn<z.infer<typeof SupportSchema>>
    onSubmit: (data: z.infer<typeof SupportSchema>) => void
    disabled?: boolean
}

const FormDemande: FC<FormDemandeProps> = ({ form, onSubmit, disabled }) => {
    const { handleSubmit, control } = form
    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full justify-center items-center gap-[1.875rem]  h-full bg-white lg:bg-transparent lg:rounded-none rounded-[30px] py-[25px] px-4 lg:mb-0 mb-20"
            >
                <div className="flex flex-col gap-[1.875rem] w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:pb-0 pb-14">
                        <SelectField
                            disabled={disabled}
                            control={control}
                            label={'Type de la demande'}
                            options={[]}
                            name={'received'}
                            className="col-span-1"
                        />
                        <SelectField
                            disabled={disabled}
                            control={control}
                            label={'Magasin'}
                            options={[]}
                            name={'partner'}
                            className="col-span-1"
                        />
                        <InputFieldForm
                            control={control}
                            name="object"
                            label="Object"
                            placeholder="Ecrire un titre d’objet"
                            disabled={disabled}
                            classNameParent={` ${
                                form.getValues('object')?.length >= 28
                                    ? 'col-span-3'
                                    : 'col-span-1'
                            }`}
                        />
                    </div>
                    <div className="flex flex-col gap-[1.875rem]">
                        <div className="flex lg:flex-row flex-col items-start gap-3">
                            <FormField
                                control={control}
                                name={'demande'}
                                render={({ field }) => {
                                    return (
                                        <div className="flex flex-col items-start space-y-2 w-full">
                                            <Label
                                                label="Demande"
                                                className="text-sm font-semibold"
                                            />
                                            <Textarea
                                                {...field}
                                                value={field.value}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        (
                                                            e.target as HTMLTextAreaElement
                                                        ).value
                                                    )
                                                }
                                                placeholder="Votre demande"
                                                name="demande"
                                                className="w-full min-h-64 text-start h-full flex justify-start items-start focus-visible:ring-0 focus:ring-0  outline-none text-lynch-400 font-normal text-base"
                                                rows={5}
                                            />
                                        </div>
                                    )
                                }}
                            />
                        </div>
                        <div className="flex lg:flex-row flex-col items-start gap-3">
                            <FormField
                                control={control}
                                name="attachment"
                                render={({ field }) => {
                                    return (
                                        <>
                                            <div className="flex flex-col items-start space-y-2 w-full">
                                                <Label
                                                    label="Pièce jointe"
                                                    className="text-sm font-semibold"
                                                />
                                                <div className="lg:flex hidden">
                                                    <UploadFile
                                                        {...field}
                                                        value={field.value!}
                                                        onChange={(files) =>
                                                            field.onChange(
                                                                files
                                                            )
                                                        }
                                                        placeholder="Ajouter une pièce jointe"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )
                                }}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    )
}
