'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import { Input } from '@/components/custom/Input'
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
import React, { FC, useContext, useState } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { useMediaQuery } from 'react-responsive'
import { z } from 'zod'
import { CrmObjectType, EvenetType } from '@/types/CrmType'
import { useRouter } from 'next/navigation'
import { EventContext } from '@/context/EventContext'

interface AddNewEventProps {
    form: UseFormReturn<z.infer<typeof CrmObjectSchema>>
    isMobile: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    convertir: boolean
}

const AddNewEvent: FC<AddNewEventProps> = ({
    form,
    isMobile,
    setOpen,
    convertir,
}) => {
    const { evenement, setEvenement } = useContext(EventContext)
    const myhandleSubmit = async (e: CrmObjectType) => {
        console.log(e)
        try {
            const evenet: EvenetType = {
                object: e.object,
                message: e.message,
                date: new Date().toISOString(),
                lead: 1, //Todo: Change this value to the lead id
            }
            setEvenement([...evenement, evenet])
            setOpen(true)
            // await axios.post('http://localhost:8080/api/v1/crm/prospects/{id}/events/create', newEven)
        } catch (error) {}
    }

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
                            onSubmit={handleSubmit(myhandleSubmit)}
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
                                <Controller
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <Textarea
                                            value={value}
                                            onChange={(e) =>
                                                onChange(e.target.value)
                                            }
                                            name="message"
                                            className="w-full min-h-64 text-start h-full flex justify-start items-start focus-visible:ring-0 focus:ring-0  outline-none text-lynch-400 font-normal text-base"
                                        />
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
                                    <div className="w-full flex lg:flex-row flex-col space-y-2 space-x-0 justify-center items-center lg:space-x-4">
                                        <CustomButton
                                            title={
                                                !convertir
                                                    ? 'Veuillez convertir le prospect avant de confirmer l’évènement'
                                                    : 'Confirmer l’évènement'
                                            }
                                            disabled={!convertir}
                                            type="submit"
                                            label={
                                                isMobile
                                                    ? 'CONFIRMER'
                                                    : 'Confirmé l’évènement'
                                            }
                                            className={
                                                !isMobile
                                                    ? 'justify-self-end bg-transparent hover:bg-mountain-500 text-mountain-500 hover:text-white border border-mountain-500 transition-all delay-100 duration-150 min-w-[170.5px]'
                                                    : 'bg-mountain-400 text-white hover:bg-mountain-500 border border-mountain-500 hover:border-mountain-500 transition-all delay-100 duration-150 min-w-[170.5px] flex-1 w-full'
                                            }
                                            IconRight={CheckCheck}
                                        />
                                        <CustomButton
                                            label="Annuler"
                                            onClick={() => {
                                                console.log('Cancel')
                                                setOpen((prev) => {
                                                    console.log('prev :', prev)
                                                    return !prev
                                                })
                                            }}
                                            className="bg-transparent hover:bg-mountain-500 text-mountain-500 hover:text-white border border-mountain-500 transition-all delay-100 duration-150 min-w-[170.5px] flex-1 w-full lg:w-auto"
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
