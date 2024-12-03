'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import {
    CollaboratorDataType,
    CollaboratorDetailsSchema,
    CollaboratorDetailsType,
    ScheduleDayType,
} from '@/types/collaborators'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Select } from '@/components/custom/Select'
import { PartnerSolution } from '../PartnerSolution'
import { InputSchedule } from '@/components/InputSchedule'
import { Label } from '@/components/Label'
import { PartnerSolutionType } from '@/types/partnersType'
import { Form, FormField } from '@/components/ui/form'
import { DayScheduleType } from '@/components/Deliveries/Collaborators/Collaborator/FormWorkSchedule'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { InputFieldForm } from '@/components/custom/InputField'
import { SelectField } from '@/components/custom/SelectField'
import { AvatarField } from '@/components/custom/AvatarField'

interface CollaboratorDetailsProps {
    collaborator: z.infer<typeof CollaboratorDetailsSchema>
}

export const CollaboratorDetails: FC<CollaboratorDetailsProps> = ({
    collaborator,
}) => {
    const router = useRouter()
    const schedules = collaborator.workingHours

    const form = useForm<z.infer<typeof CollaboratorDetailsSchema>>({
        resolver: zodResolver(CollaboratorDetailsSchema),
        mode: 'onBlur',
        defaultValues: collaborator,
    })

    const onSubmit = (data: z.infer<typeof CollaboratorDetailsSchema>) => {
        console.log(data)
    }

    const { control, handleSubmit } = form

    const days: Record<string, string> = {
        MONDAY: 'Lundi',
        TUESDAY: 'Mardi',
        WEDNESDAY: 'Mercredi',
        THURSDAY: 'Jeudi',
        FRIDAY: 'Vendredi',
        SATURDAY: 'Samedi',
        SUNDAY: 'Dimanche',
    }

    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2 w-full"
            >
                <div className="flex justify-end p-2 bg-white w-full rounded-[18px]">
                    <CustomButton
                        label="Retour"
                        IconLeft={ArrowLeft}
                        variant="outline"
                        onClick={router.back}
                        size="sm"
                        type="button"
                    />
                </div>
                <Accordion
                    type="single"
                    collapsible
                    className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
                    defaultValue="CollaboratorDetails"
                >
                    <AccordionItem
                        value="CollaboratorDetails"
                        className="text-lynch-400 text-[1.375rem] font-normal"
                    >
                        <AccordionTrigger className="font-normal text-[1.375rem] py-0">
                            Information personnelle
                        </AccordionTrigger>
                        <AccordionContent className="pt-7">
                            <div className="flex flex-col justify-center items-center gap-[1.875rem]">
                                <div className="flex w-fit gap-5 lg:pb-0 pb-14">
                                    <AvatarField
                                        form={form}
                                        name="avatarPath"
                                        alt="avatar"
                                        label="Photo de profil"
                                        className="!rounded-full"
                                        classNameAvatar="!rounded-full size-[8.125rem]"
                                        disabled
                                    />
                                </div>
                                <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
                                    <InputFieldForm
                                        name={'gender'}
                                        control={control}
                                        label="Civilité (e)"
                                        disabled
                                    />
                                    <InputFieldForm
                                        name={'name.firstName'}
                                        control={control}
                                        label="Prénom"
                                        disabled
                                    />
                                    <InputFieldForm
                                        name={'name.lastName'}
                                        control={control}
                                        label="Nom"
                                        disabled
                                    />
                                </div>
                                <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
                                    <InputFieldForm
                                        name={'nationality'}
                                        control={control}
                                        label="Nationalité"
                                        disabled
                                    />
                                    <InputFieldForm
                                        name={'nationalId'}
                                        control={control}
                                        label="CIN"
                                        disabled
                                    />
                                    <InputFieldForm
                                        name={'role'}
                                        control={control}
                                        label="Rôle"
                                        disabled
                                    />
                                </div>
                                <div className="grid lg:grid-flow-col grid-flow-row lg:grid-cols-3 items-center gap-3 w-full">
                                    <InputFieldForm
                                        name={'phone'}
                                        control={control}
                                        label="Téléphone"
                                        disabled
                                    />
                                    <InputFieldForm
                                        name={'email'}
                                        control={control}
                                        label="Email"
                                        disabled
                                    />
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Accordion
                    type="single"
                    collapsible
                    className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
                    defaultValue="CollaboratorDetails"
                >
                    <AccordionItem
                        value="CollaboratorDetails"
                        className="text-lynch-400 text-[1.375rem] font-normal"
                    >
                        <AccordionTrigger className="font-normal text-[1.375rem] py-0">
                            Affectation
                        </AccordionTrigger>
                        <AccordionContent className="pt-7">
                            <div className="flex flex-col justify-center items-center gap-[1.875rem]">
                                <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
                                    <SelectField
                                        name={
                                            'organizationInfo.organization.name'
                                        }
                                        label="Partenaire"
                                        options={[
                                            {
                                                key: collaborator
                                                    ?.organizationInfo
                                                    ?.organization?.name,
                                                label: collaborator
                                                    ?.organizationInfo
                                                    ?.organization?.name,
                                                avatar: collaborator
                                                    ?.organizationInfo
                                                    ?.organization
                                                    ?.avatarPath as string,
                                            },
                                        ]}
                                        control={control}
                                        disabled
                                    />
                                    <SelectField
                                        name={'organizationInfo.subentity.name'}
                                        label="Partenaire"
                                        options={[
                                            {
                                                key:
                                                    collaborator
                                                        ?.organizationInfo
                                                        ?.subentity?.name + '',
                                                label:
                                                    collaborator
                                                        ?.organizationInfo
                                                        ?.subentity?.name + '',
                                                avatar: collaborator
                                                    ?.organizationInfo
                                                    ?.subentity
                                                    ?.avatarPath as string,
                                            },
                                        ]}
                                        control={control}
                                        disabled
                                    />
                                    <InputFieldForm
                                        name={'organizationInfo.rayon'}
                                        control={control}
                                        label="Rayon"
                                        disabled
                                    />
                                </div>
                                <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
                                    <SelectField
                                        name={'organizationInfo.manager'}
                                        label="Partenaire"
                                        options={[
                                            {
                                                key: collaborator
                                                    ?.organizationInfo?.manager,
                                                label: collaborator
                                                    ?.organizationInfo?.manager,
                                            },
                                        ]}
                                        control={control}
                                        disabled
                                    />
                                    <InputFieldForm
                                        name={'organizationInfo.city'}
                                        control={control}
                                        label="Ville"
                                        disabled
                                    />
                                    <InputFieldForm
                                        name={'organizationInfo.region'}
                                        control={control}
                                        label="Région"
                                        disabled
                                    />
                                </div>
                                <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
                                    <Select
                                        onChange={() => {}}
                                        value={'s'}
                                        label="Solution"
                                        transform={() => (
                                            <div className="flex items-center gap-2">
                                                {collaborator.organizationInfo?.solutions.map(
                                                    (value) => (
                                                        <PartnerSolution
                                                            solution={
                                                                value as PartnerSolutionType
                                                            }
                                                            key={value}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        )}
                                        disabled
                                    />
                                    <InputFieldForm
                                        name={'organizationInfo.phone'}
                                        control={control}
                                        label="Téléphone"
                                        disabled
                                    />
                                    <InputFieldForm
                                        name={'organizationInfo.email'}
                                        control={control}
                                        label="Email"
                                        disabled
                                    />
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Accordion
                    type="single"
                    collapsible
                    className="bg-white lg:p-5 px-4 py-6 rounded-[14px]"
                    defaultValue="CollaboratorDetails"
                >
                    <AccordionItem
                        value="CollaboratorDetails"
                        className="text-lynch-400 text-[1.375rem] font-normal"
                    >
                        <AccordionTrigger className="font-normal text-[1.375rem] py-0">
                            Horaire du travail
                        </AccordionTrigger>
                        <AccordionContent className="pt-7 grid grid-cols-3 gap-x-8 gap-y-5">
                            {collaborator.workingHours &&
                                collaborator.workingHours.map(
                                    (value, index) => (
                                        <div
                                            key={value.dayOfWeek}
                                            className="flex flex-col gap-4"
                                        >
                                            <Label
                                                label={days[value.dayOfWeek]}
                                                className="text-lg font-medium text-lynch-400"
                                            />
                                            <div className="flex items-center gap-3">
                                                <FormField
                                                    control={control}
                                                    key={index}
                                                    name={`${value}` as any}
                                                    render={({ field }) => (
                                                        <div className="flex flex-col gap-3 w-full">
                                                            <Label
                                                                label={
                                                                    'Horaire (matin)'
                                                                }
                                                                className="text-sm font-medium text-lynch-950"
                                                            />
                                                            <InputSchedule
                                                                value={
                                                                    {
                                                                        start: value.morningStart,
                                                                        end: value.morningEnd,
                                                                    } as DayScheduleType['morning']
                                                                }
                                                                onChange={(
                                                                    value
                                                                ) => {
                                                                    field.onChange(
                                                                        {
                                                                            ...field.value,
                                                                            morningStart:
                                                                                value.start,
                                                                            morningEnd:
                                                                                value.end,
                                                                        }
                                                                    )
                                                                }}
                                                                disabled={true}
                                                            />
                                                        </div>
                                                    )}
                                                />
                                                <FormField
                                                    control={control}
                                                    key={
                                                        value.dayOfWeek +
                                                        'afternoon'
                                                    }
                                                    name={
                                                        `${value}.afternoon` as any
                                                    }
                                                    render={({ field }) => (
                                                        <div className="flex flex-col gap-3 w-full">
                                                            <Label
                                                                label={
                                                                    'Horaire (après-midi)'
                                                                }
                                                                className="text-sm font-medium text-lynch-950"
                                                            />
                                                            <InputSchedule
                                                                value={
                                                                    {
                                                                        start: value.afternoonStart,
                                                                        end: value.afternoonEnd,
                                                                    } as DayScheduleType['afternoon']
                                                                }
                                                                onChange={(
                                                                    value
                                                                ) => {
                                                                    field.onChange(
                                                                        {
                                                                            ...field.value,
                                                                            afternoonStart:
                                                                                value.start,
                                                                            afternoonEnd:
                                                                                value.end,
                                                                        }
                                                                    )
                                                                }}
                                                                disabled={true}
                                                            />
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    )
                                )}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </form>
        </Form>
    )
}
