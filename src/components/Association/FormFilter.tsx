import React, { FC, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { CustomButton } from '../custom/CustomButton'
import { Check, Eraser, ListFilter, Mail, PhoneCall, X } from 'lucide-react'
import {
    PartnerSolutionType,
    PartnerStatusType,
    PartnerType,
} from '@/types/partnersType'
import { DatePicker } from '../DatePicker'
import { Label } from '../Label'
import { MultiSelect, MultiSelectOptionsType } from '../MultiSelect'
import { Input } from '../custom/Input'
import { UseFormReturn } from 'react-hook-form'
import { Select } from '../custom/Select'
import { Checkbox } from '../ui/checkbox'
import { DialogClose } from '@radix-ui/react-dialog'
import { PartnerSolution } from '../Partners/PartnerSolution'
import { SchemaFilter } from '@/types/associationSchema'
import { z } from 'zod'
import { Form } from '../ui/form'
import { PartnerStatus } from '../Partners/PartnerStatus'
import { InputFieldForm } from '../custom/InputField'
import { DateFilter } from '../utils/DateFilters'
import { FilterMultiSelect } from '../utils/FilterMultiSelect'
import SelectManager from '../utils/SelectManager'
import { SelectField } from '../custom/SelectField'
import { PartnerEntitiesType } from '@/types/GlobalType'
import MobileHeader from '../utils/MobileHeader'
import { FilterOrganizations } from '../utils/FilterOrganizations'
import { capitalize } from '@/types/utils'
import { FilterCity } from '../utils/FilterCity'
import { FilterManager } from '../utils/FilterManger'
import { FilterManagerSubEntity } from '../utils/FilterManagerSubEntitiy'

interface FormFilterProps {
    form: UseFormReturn<z.infer<typeof SchemaFilter>>
    onSubmit: (data: z.infer<typeof SchemaFilter>) => void
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
    archive: boolean
    type?: string
}

export const FormFilter: FC<FormFilterProps> = ({
    form,
    onSubmit,
    setOpen,
    open,
    archive,
    type = 'ASSOCIATIONS',
}) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex  items-center gap-3 lg:rounded-[12px] rounded-full lg:border border-lynch-200 border-0 text-lynch-500 font-medium text-sm p-4 lg:px-5 lg:py-3 hover:text-black hover:bg-neutral-100 my-4 lg:my-0 bg-white">
                <span className="lg:inline-flex hidden">Filtrer par</span>
                <ListFilter />
            </DialogTrigger>
            <DialogContent className="[&>.Icon]:hidden p-0 lg:p-5 lg:rounded-[14px] w-full max-w-full rounded-none lg:max-w-[36.25rem] min-w-full lg:min-w-fit gap-[1.875rem] max-h-screen overflow-auto">
                <FormAssociation
                    form={form}
                    onSubmit={onSubmit}
                    setOpen={setOpen}
                    archive={archive}
                    type={type}
                />
            </DialogContent>
        </Dialog>
    )
}

interface FormAssociationProps {
    form: UseFormReturn<z.infer<typeof SchemaFilter>>
    onSubmit: (data: z.infer<typeof SchemaFilter>) => void
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    archive: boolean
    type?: string
}

const FormAssociation: FC<FormAssociationProps> = ({
    form,
    onSubmit,
    setOpen,
    archive,
    type = 'ASSOCIATIONS',
}) => {
    const { handleSubmit, control } = form
    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full min-h-full bg-white  gap-2 flex flex-col "
            >
                <DialogTitle className="text-[1.375rem] font-normal text-lynch-400 lg:flex hidden">
                    Filtrer par
                </DialogTitle>
                <MobileHeader
                    title="Filtrer par"
                    onClick={() => setOpen(false)}
                />
                <div className="flex flex-col gap-2 gap-x-4 p-5">
                    <DateFilter form={form} disabled={false} />
                    <div className="flex lg:flex-row flex-col gap-3 w-full ">
                        {type == 'SIEGES' ? (
                            <>
                                <FilterOrganizations
                                    control={control}
                                    name="companyName"
                                    label="Raison sociale"
                                    placeholder="Partenaire"
                                    type={
                                        'ASSOCIATION,FOOD_BANK,FOOD_BANK_ASSO&' +
                                        (archive ? 'true' : 'false')
                                    }
                                />
                                <FilterManagerSubEntity
                                    control={control}
                                    name="collaborators"
                                    label="Collaborateurs"
                                    type={
                                        'ASSOCIATION,FOOD_BANK,FOOD_BANK_ASSO&' +
                                        (archive ? 'true' : 'false')
                                    }
                                />
                            </>
                        ) : (
                            <>
                                <FilterOrganizations
                                    control={control}
                                    name="companyName"
                                    label="Raison sociale"
                                    placeholder="Partenaire"
                                    type={
                                        'ASSOCIATION,FOOD_BANK,FOOD_BANK_ASSO&' +
                                        (archive ? 'true' : 'false')
                                    }
                                />
                                <FilterManager
                                    control={control}
                                    name="collaborators"
                                    label="Collaborateurs"
                                    type={
                                        'ASSOCIATION,FOOD_BANK,FOOD_BANK_ASSO&' +
                                        (archive ? 'true' : 'false')
                                    }
                                />
                            </>
                        )}
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full text-sm">
                        <FilterCity
                            control={control}
                            name="city"
                            label="Ville"
                            type={'ASSOCIATION,FOOD_BANK,FOOD_BANK_ASSO'}
                        />
                        <SelectField
                            control={control}
                            name="companyType"
                            label="Type d'entreprise"
                            options={['ASSOCIATION', 'FOOD_BANK'].map(
                                (type) => ({
                                    key: type,
                                    label: capitalize(type),
                                })
                            )}
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <InputFieldForm
                            control={control}
                            name="email"
                            label="Email"
                            placeholder="Saisir l'email"
                            IconLeft={Mail}
                        />
                        <InputFieldForm
                            control={control}
                            name="phone"
                            label="Téléphone"
                            placeholder="Saisir le téléphone"
                            IconLeft={PhoneCall}
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <FilterMultiSelect
                            control={control}
                            name="solutions"
                            label="Solutions"
                            transform={(value: MultiSelectOptionsType[]) => {
                                return value.map((option, index) => (
                                    <PartnerSolution
                                        key={index}
                                        solution={
                                            option.key as PartnerSolutionType
                                        }
                                    />
                                ))
                            }}
                        />
                    </div>
                </div>

                <div className="flex lg:flex-row flex-col justify-end gap-[0.625rem] p-5">
                    <CustomButton
                        variant="ghost"
                        title="Réinitialiser les filtres"
                        label="Clear"
                        className="[&>.icon]:mr-0 gap-2 lg:gap-0 text-primary lg:[&>.label]:hidden h-12 w-12 lg:rounded-full px-2 py-2  "
                        IconLeft={Eraser}
                        onClick={() => {
                            form.reset()
                            form.setValue('startDate', undefined)
                            form.setValue('endDate', undefined)
                        }}
                        type="reset"
                    />
                    <div className="flex justify-evenly items-center space-x-2">
                        <CustomButton
                            variant="secondary"
                            label="Annuler"
                            onClick={() => {
                                setOpen(false)
                            }}
                            className="px-5 py-3 h-fit lg:w-fit w-full"
                            IconRight={X}
                            type="submit"
                        />
                        <CustomButton
                            label="Confirmer"
                            onClick={() => {}}
                            className="px-5 py-3 h-fit w-full"
                            IconRight={Check}
                            type="submit"
                        />
                    </div>
                </div>
            </form>
        </Form>
    )
}
