import { FC } from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { CrmInformationSchema } from '@/types/CrmScheme'
import { z } from 'zod'
import { InputFieldForm } from '@/components/custom/InputField'
import { SelectField } from '@/components/custom/SelectField'
import { InputPhoneField } from '@/components/custom/InputFieldPhone'
import { Calendar, Mail, PhoneCall } from 'lucide-react'
import { AvatarField } from '@/components/custom/AvatarField'
import { MultiSelectField } from '@/components/custom/MultiSelectField'
import { CountryData } from '@/types/utils'
import { Input } from '@/components/custom/Input'
import { AvatarAndName } from '@/components/AvatarAndName'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Avatar } from '@/components/ui/avatar'
import { LabelAndAvatar } from '@/components/custom/LabelAndAvatar'
import LabelMultiItems from '@/components/custom/LabelMultiItems'
import { CrmType } from '@/types/Global-Type'
import { CrmDemandeType } from '@/types/CrmType'
import { countryCodes } from '@/lib/utils'
import LabelPhone from '@/components/custom/LabelPhone'

interface DetailsDemandesDisplayProps {
    data: CrmDemandeType
    disabled?: boolean
    setCountryCode: (value: string) => void
    countryCode: string
}

export const DetailsDemandesDisplay: FC<DetailsDemandesDisplayProps> = ({
    data,
    countryCode,
    setCountryCode,
    disabled,
}) => {
    console.log(data)
    return (
        <Accordion
            type="single"
            collapsible
            defaultValue="CrmInfo"
            className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
        >
            <AccordionItem
                value="CrmInfo"
                className="text-lynch-400 text-[1.375rem] font-normal"
            >
                <AccordionTrigger className="font-normal text-[1.375rem] py-0">
                    Détail de la demande
                </AccordionTrigger>
                <AccordionContent className="pt-7 w-full">
                    <div className="flex flex-col gap-[1.875rem] w-full">
                        <div className="flex flex-col gap-[1.875rem] w-full">
                            <div className="flex lg:flex-row flex-col items-start gap-3 w-full">
                                <Input
                                    label="Date de la demande"
                                    value={data.date.slice(0, 10)}
                                    disabled={disabled}
                                    onChange={() => {}}
                                    IconLeft={Calendar}
                                    name={''}
                                />
                                <Input
                                    label="Raison sociale"
                                    value={data.companyName}
                                    disabled={disabled}
                                    onChange={() => {}}
                                    name={''}
                                />
                                <Input
                                    label="Secteurs d'activité"
                                    value={
                                        data.activity.flat().join(', ') || 'N/A'
                                    }
                                    disabled={disabled}
                                    onChange={() => {}}
                                    name={''}
                                />
                            </div>
                            <div className="flex lg:flex-row flex-col items-start gap-3">
                                <Input
                                    name=""
                                    onChange={() => {}}
                                    value={data.respansable}
                                    label="Responsable"
                                    disabled={disabled}
                                />
                                <Input
                                    name=""
                                    onChange={() => {}}
                                    value={data.role}
                                    label="Rôle"
                                    disabled={disabled}
                                />
                                <LabelPhone
                                    countryCode={countryCode}
                                    value={data.phone}
                                    label="Téléphone"
                                    IconLeft={PhoneCall}
                                />
                            </div>
                            <div className="flex lg:flex-row flex-col items-start gap-3">
                                <Input
                                    name=""
                                    onChange={() => {}}
                                    IconLeft={Mail}
                                    label="Email"
                                    value={data.email}
                                    disabled={disabled}
                                />
                                <Input
                                    value={data.country}
                                    label="Pays"
                                    onChange={() => {}}
                                    name=""
                                    className="[&_*_.avatar]:grid [&_*_.avatar]:size-8 [&_*_.avatar]:rounded-full [&_*_.avatar]:place-items-center [&_*_.avatar]:m-auto"
                                    disabled={disabled}
                                />
                                <Input
                                    name=""
                                    value={data.city}
                                    label="Ville"
                                    disabled={disabled}
                                    onChange={() => {}}
                                />
                            </div>
                            <div className="flex lg:grid lg:grid-cols-3 flex-col items-start justify-start gap-3 ">
                                <LabelAndAvatar
                                    name=""
                                    onChange={() => {}}
                                    className=" flex-1 w-full col-span-2"
                                    value={data.address}
                                    label="Adresse"
                                    disabled={disabled}
                                />
                            </div>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
