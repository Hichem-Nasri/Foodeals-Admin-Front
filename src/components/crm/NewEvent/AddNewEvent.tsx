'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import { InputFieldForm } from '@/components/custom/InputField'
import { Label } from '@/components/Label'
import {
    AccordionItem,
    Accordion,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/accordion'
import { Textarea } from '@/components/ui/textarea'
import { CrmObjectSchema } from '@/types/CrmScheme'
import { CheckCheck, X } from 'lucide-react'
import React, { FC } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { CrmObjectType } from '@/types/CrmType'

interface AddNewEventProps {
    form: UseFormReturn<z.infer<typeof CrmObjectSchema>>
    isMobile: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    convertir: boolean
    onSubmit: (e: CrmObjectType) => void
}

const AddNewEvent: FC<AddNewEventProps> = ({
    form,
    isMobile,
    setOpen,
    convertir,
    onSubmit,
}) => {
    const { control, handleSubmit } = form

    return (
        <Accordion
            type="single"
            className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
            defaultValue="evenet"
            collapsible
        >
            <AccordionItem
                value="evenet"
                className="text-lynch-400 text-[1.375rem] font-normal space-y-6"
            >
                <AccordionTrigger className="font-normal text-[1.375rem] py-2 px-4">
                    Nouvelle demande
                </AccordionTrigger>
                <AccordionContent className="min-h-full">
                    <Form {...form}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="w-full flex flex-col items-center space-y-4 "
                        >
                            <div className="w-full px-2 space-y-2">
                                <Label label="Object" htmlFor="object" />
                                <InputFieldForm
                                    type="text"
                                    name="object"
                                    control={control}
                                    className="w-full"
                                />
                            </div>
                            <div className="w-full px-2 space-y-2">
                                <Label label="Message" htmlFor="message" />
                                <FormField
                                    render={({ field }) => (
                                        <FormItem>
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
                                                name="message"
                                                className="w-full min-h-64 text-start h-full flex justify-start items-start focus-visible:ring-0 focus:ring-0  outline-none text-lynch-400 font-normal text-base"
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    name="message"
                                    control={form.control}
                                />
                            </div>
                            <div
                                className={`flex w-full ${
                                    !isMobile
                                        ? 'justify-end'
                                        : 'justify-between'
                                } items-center space-x-4`}
                            >
                                {isMobile && (
                                    <div className="w-full flex  gap-2 space-x-0 justify-center items-center lg:space-x-4">
                                        <CustomButton
                                            title={
                                                !convertir
                                                    ? 'Veuillez convertir le prospect avant de confirmer l’évènement'
                                                    : 'Confirmer l’évènement'
                                            }
                                            type="submit"
                                            label={
                                                isMobile
                                                    ? 'CONFIRMER'
                                                    : 'Confirmé l’évènement'
                                            }
                                            className={
                                                !isMobile
                                                    ? 'justify-self-end bg-transparent hover:bg-mountain-500 text-mountain-500 hover:text-white border border-mountain-500 transition-all delay-100 duration-150 min-w-[170.5px]'
                                                    : ' transition-all delay-100 duration-150 min-w-[170.5px] flex-1 w-full'
                                            }
                                            IconRight={CheckCheck}
                                        />
                                        <CustomButton
                                            label="Annuler"
                                            variant="secondary"
                                            onClick={() => {
                                                console.log('Cancel')
                                                setOpen((prev) => {
                                                    return !prev
                                                })
                                            }}
                                            className=" transition-all delay-100 duration-150 min-w-[170.5px] flex-1 w-full lg:w-auto"
                                            IconRight={X}
                                        />
                                    </div>
                                )}
                            </div>
                        </form>
                    </Form>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default AddNewEvent
