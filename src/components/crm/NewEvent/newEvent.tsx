'use client'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import { EvenetType } from '@/types/CrmType'
import { TableProspects } from '../NewProspect/TableProspects'
import { FilePlus } from 'lucide-react'
import { CustomButton } from '@/components/custom/CustomButton'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface EvenetProps {
    Evenet: EvenetType[]
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    convertir: boolean
}

export const NewEvenent: FC<EvenetProps> = ({ Evenet, setOpen, convertir }) => {
    useEffect(() => {
        console.log('convertir', convertir)
    }, [convertir])
    return (
        <div className="w-full self-start h-full relative">
            {Evenet.length == 0 ? (
                <Accordion
                    type="single"
                    className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
                    defaultValue="evenet"
                    collapsible
                >
                    <AccordionItem
                        value="evenet"
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
                                    disabled={!convertir}
                                    onClick={() => {
                                        setOpen((prev) => !prev)
                                    }}
                                    label="Ajouter un événement"
                                    IconRight={FilePlus}
                                    className=" disabled:bg-lynch-400    disabled:hover:bg-transparent justify-center bg-primary text-white hover:bg-white hover:text-primary hover:border-2 border-primary transition-all"
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ) : (
                <TableProspects setOpen={setOpen} />
            )}
        </div>
    )
}
