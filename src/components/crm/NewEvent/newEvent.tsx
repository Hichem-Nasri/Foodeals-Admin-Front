import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import Image from 'next/image'
import React, { FC, useEffect } from 'react'
import { FilePlus } from 'lucide-react'
import { CustomButton } from '@/components/custom/CustomButton'
import { EventType } from '@/types/CrmType'
import { TableProspects } from '../Prospect/NewProspect/TableProspects'
import { PartnerStatusType } from '@/types/partnersType'

interface EventProps {
    Event: EventType[]
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    convertir: boolean
    disabled?: boolean
    status: PartnerStatusType
    prospect: any
}

export const NewEvenent: FC<EventProps> = ({
    Event,
    setOpen,
    convertir,
    disabled,
    status,
    prospect,
}) => {
    return (
        <div className="w-full self-start h-full relative">
            {Event && Event.length == 0 ? (
                <Accordion
                    type="single"
                    className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
                    defaultValue="Event"
                    collapsible
                >
                    <AccordionItem
                        value="Event"
                        className="text-lynch-400 text-[1.375rem] font-normal"
                    >
                        <AccordionTrigger className="font-normal text-[1.375rem] py-0">
                            Evènement
                        </AccordionTrigger>
                        <AccordionContent className="pt-7 px-2">
                            <div className="flex flex-col justify-center items-center space-y-6 mb-2">
                                <Image
                                    src="/no-data.svg"
                                    alt="no Data"
                                    width={300}
                                    height={200}
                                    className="select-none"
                                />
                                <p className="text-light w-full text-sm text-black text-center">
                                    &quot;Aucun événement n&apos;est encore
                                    disponible. Ajoutez un premier événement
                                    pour obtenir plus d&apos;informations sur ce
                                    prospect.&quot;
                                </p>
                                <CustomButton
                                    disabled={
                                        !convertir &&
                                        status != PartnerStatusType.IN_PROGRESS
                                    }
                                    onClick={() => {
                                        setOpen((prev) => !prev)
                                    }}
                                    label="Ajouter un événement"
                                    IconRight={FilePlus}
                                    className=" disabled:bg-lynch-400 disabled:hover:bg-transparent justify-center bg-primary text-white hover:bg-white hover:text-primary hover:border-2 border-primary transition-all"
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ) : (
                <TableProspects
                    setOpen={setOpen}
                    data={Event}
                    disabled={disabled || status == PartnerStatusType.CANCELED}
                    prospect={prospect}
                />
            )}
        </div>
    )
}
