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
import { Mail, PhoneCall } from 'lucide-react'
import { AvatarField } from '@/components/custom/AvatarField'
import { MultiSelectField } from '@/components/custom/MultiSelectField'
import { CountryData } from '@/types/utils'
import { Input } from '@/components/custom/Input'
import { AvatarAndName } from '@/components/AvatarAndName'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Avatar } from '@/components/ui/avatar'
import { LabelAndAvatar } from '@/components/custom/LabelAndAvatar'
import LabelMultiItems from '@/components/custom/LabelMultiItems'

interface FormProspectInfoDisplayProps {
    data: any
    disabled?: boolean
    setCountryCode: (value: string) => void
    countryCode: string
}

export const FormProspectInfoDisplay: FC<FormProspectInfoDisplayProps> = ({
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
            className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
            defaultValue="CrmInfo"
        >
            <AccordionItem
                value="CrmInfo"
                className="text-lynch-400 text-[1.375rem] font-normal"
            >
                <AccordionTrigger className="font-normal text-[1.375rem] py-0">
                    Information du prospect
                </AccordionTrigger>
                <AccordionContent className="pt-7 w-full">
                    <div className="flex flex-col gap-[1.875rem] w-full">
                        <div className="flex flex-col gap-[1.875rem] w-full">
                            <div className="flex lg:flex-row flex-col items-start gap-3 w-full">
                                <Input
                                    label="Raison sociale"
                                    value={data.companyName}
                                    disabled={disabled}
                                    onChange={function (
                                        value: string | number
                                    ): void {
                                        throw new Error(
                                            'Function not implemented.'
                                        )
                                    }}
                                    name={''}
                                />
                                <LabelMultiItems
                                    label="Catégorie"
                                    options={data.category}
                                    disabled={disabled}
                                    name={''}
                                />
                                <Input
                                    name=""
                                    onChange={() => {}}
                                    value={
                                        data?.responsable.firstName +
                                        ' ' +
                                        data?.responsable.lastName
                                    }
                                    label="Responsable"
                                    disabled={disabled}
                                />
                            </div>
                            <div className="flex lg:flex-row flex-col items-start gap-3">
                                <Input
                                    name={data.phone}
                                    label="Téléphone"
                                    // countryCode={countryCode}
                                    // onChangeCountryCode={setCountryCode}
                                    disabled={disabled}
                                    IconLeft={PhoneCall}
                                    onChange={() => {}}
                                    value={data.phone}
                                />
                                <Input
                                    name=""
                                    onChange={() => {}}
                                    IconLeft={Mail}
                                    label="Email"
                                    value={data.email}
                                    disabled={disabled}
                                />
                                <LabelAndAvatar
                                    label="Alimenter par"
                                    value={
                                        data.creatorInfo.name.firstName +
                                        ' ' +
                                        data.creatorInfo.name.lastName
                                    }
                                    avatar={'https://picsum.photos/200'}
                                    onChange={() => {}}
                                    name=""
                                    disabled={disabled}
                                />
                            </div>
                            <div className="flex lg:flex-row flex-col items-start gap-3">
                                <LabelAndAvatar
                                    value={
                                        data.managerInfo.name.firstName +
                                        ' ' +
                                        data.managerInfo.name.lastName
                                    }
                                    avatar={'https://picsum.photos/200'}
                                    label="Manager"
                                    onChange={() => {}}
                                    name=""
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
                                <Input
                                    name=""
                                    onChange={() => {}}
                                    className="col-span-1"
                                    value={data.region}
                                    label="Région"
                                    disabled={disabled}
                                />
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
