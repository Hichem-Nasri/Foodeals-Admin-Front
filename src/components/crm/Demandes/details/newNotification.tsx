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
import {
    CrmObjectSchema,
    NotificationSchema,
    NotificationType,
} from '@/types/CrmScheme'
import { CheckCheck, X } from 'lucide-react'
import React, { FC } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { CrmObjectType, EvenetType } from '@/types/CrmType'
import { useRouter } from 'next/navigation'
import { UploadFile } from '@/components/Partners/NewPartner/UploadFile'
import { useMediaQuery } from 'react-responsive'

interface NewNotificatoinProps {
    form: UseFormReturn<z.infer<typeof NotificationSchema>>
    handleSubmition: (e: NotificationType) => void
}

const NewNotificatoin: FC<NewNotificatoinProps> = ({
    form,
    handleSubmition,
}) => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const { control, handleSubmit } = form
    const router = useRouter()
    return (
        <Accordion
            type="single"
            className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
            defaultValue="notifcation"
            collapsible
        >
            <AccordionItem
                value="notifcation"
                className="text-lynch-400 text-[1.375rem] font-normal space-y-6"
            >
                <AccordionTrigger className="font-normal text-[1.375rem] py-2 px-4">
                    Nouvelle notification
                </AccordionTrigger>
                <AccordionContent className="min-h-full">
                    <Form {...form}>
                        <form
                            onSubmit={handleSubmit(handleSubmition)}
                            className="w-full flex flex-col items-start justify-start space-y-4 "
                        >
                            <div className="w-full px-2 space-y-2">
                                <Label
                                    label="Responsable"
                                    htmlFor="responsable"
                                />
                                <InputFieldForm
                                    type="text"
                                    name="responsable"
                                    control={control}
                                    className="w-full lg:w-1/2"
                                />
                            </div>
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
                                <Label label="Demande" htmlFor="message" />
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
                                                rows={5}
                                                className="w-full min-h-64 text-start h-full flex justify-start items-start focus-visible:ring-0 focus:ring-0  outline-none text-lynch-400 font-normal text-base"
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    name="message"
                                    control={form.control}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name={'image' as any}
                                render={({ field }) => (
                                    <div className="flex px-2 flex-col items-start gap-3 w-full text-lynch-400">
                                        <Label
                                            label="Import l'image"
                                            className="text-xs font-semibold text-lynch-950"
                                        />
                                        <UploadFile
                                            onChange={(files) => {
                                                if (files.length > 0) {
                                                    const file = files[0]
                                                    const reader =
                                                        new FileReader()
                                                    reader.onload = () => {
                                                        field.onChange(
                                                            reader.result
                                                        ) // Update the field value with the image data URL
                                                    }
                                                    reader.readAsDataURL(file)
                                                } else {
                                                    field.onChange(null) // Clear the field value if no files are selected
                                                }
                                            }}
                                            value={
                                                field.value
                                                    ? [
                                                          new File(
                                                              [],
                                                              field.value
                                                          ),
                                                      ]
                                                    : []
                                            } // Ensure value is in the expected format
                                        />
                                    </div>
                                )}
                            />

                            <div className="h-[1px] w-full bg-lynch-200 rounded-full" />
                            {form.watch('image') && (
                                <div className="w-full flex justify-center items-center">
                                    <img
                                        src={form.watch('image')}
                                        alt="image"
                                        className="w-full h-full rounded-2xl"
                                    />
                                </div>
                            )}
                        </form>
                    </Form>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default NewNotificatoin
