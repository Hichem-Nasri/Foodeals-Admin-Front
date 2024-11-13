import { FC, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { CustomButton } from '../custom/CustomButton'
import { Check, Eraser, ListFilter, Mail, PhoneCall, X } from 'lucide-react'
import { PartnerSolutionType, PartnerType } from '@/types/partnersType'
import { PartnerSolution } from './PartnerSolution'
import { DialogClose } from '@radix-ui/react-dialog'
import { FilterMultiSelect } from '../utils/FilterMultiSelect'
import { FilterInput } from '../utils/FilterInput'
import { FilterSelect } from '../utils/FilterSelect'
import { DateFilter } from '../utils/DateFilters'
import { PartnerFilerType } from '@/types/PartnersUtils'
import { MultiSelectOptionsType } from '../MultiSelect'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { SchemaFilter } from '@/types/associationSchema'
import { InputFieldForm } from '../custom/InputField'
import { SelectField } from '../custom/SelectField'
import MobileHeader from '../utils/MobileHeader'
import { Form } from '../ui/form'

interface FilterTablePartnerProps {
    form: UseFormReturn<any>
    onSubmit: (data: any) => void
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
}

export const FilterTablePartner: FC<FilterTablePartnerProps> = ({
    form,
    onSubmit,
    setOpen,
    open,
}) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex  items-center gap-3 lg:rounded-[12px] rounded-full lg:border border-lynch-200 border-0 text-lynch-500 font-medium text-sm p-4 lg:px-5 lg:py-3 hover:text-black hover:bg-neutral-100 my-4 lg:my-0 bg-white">
                <span className="lg:inline-flex hidden">Filtrer par</span>
                <ListFilter />
            </DialogTrigger>
            <DialogContent className="[&>.Icon]:hidden p-5 lg:rounded-[14px] w-full max-w-full rounded-none lg:max-w-[36.25rem] min-w-full lg:min-w-fit gap-[1.875rem] max-h-screen overflow-auto">
                <FormAssociation
                    form={form}
                    onSubmit={onSubmit}
                    setOpen={setOpen}
                />
            </DialogContent>
        </Dialog>
    )
}

interface FormAssociationProps {
    form: UseFormReturn<any>
    onSubmit: (data: any) => void
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const FormAssociation: FC<FormAssociationProps> = ({
    form,
    onSubmit,
    setOpen,
}) => {
    const { handleSubmit, control } = form
    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full min-h-full bg-white mt-10 lg:mt-0 gap-2 flex flex-col "
            >
                <DialogTitle className="text-[1.375rem] font-normal text-lynch-400 lg:flex hidden">
                    Filtrer par
                </DialogTitle>
                <div className="absolute flex lg:hidden top-0 left-0 right-0 min-w-full">
                    <MobileHeader
                        title="Filtrer par"
                        onClick={() => setOpen(false)}
                    />
                </div>
                <div className="flex flex-col gap-2 gap-x-4">
                    <DateFilter form={form} disabled={false} />
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <FilterMultiSelect
                            control={control}
                            name="companyName"
                            label="Raison sociale"
                            placeholder="Partenaire"
                            emptyAvatar="/avatar/emptyPartner.png"
                        />
                        <FilterMultiSelect
                            control={control}
                            name="collaborators"
                            label="Collaborateurs"
                            emptyAvatar="/avatar/emptyUser.png"
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full text-sm">
                        <SelectField
                            control={control}
                            name="city"
                            label="Ville"
                            options={[]}
                        />
                        <SelectField
                            control={control}
                            name="companyType"
                            label="Type d'entreprise"
                            options={['PARTNER_WITH_SB', 'NORMAL_PARTNER'].map(
                                (type) => ({
                                    key: type,
                                    label:
                                        type == 'NORMAL_PARTNER'
                                            ? 'Normal'
                                            : 'Principal',
                                })
                            )}
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <InputFieldForm
                            control={control}
                            name="email"
                            label="Email"
                            placeholder="email@example.com"
                            IconLeft={Mail}
                        />
                        <InputFieldForm
                            control={control}
                            name="phone"
                            label="Téléphone"
                            placeholder="Téléphone"
                            IconLeft={PhoneCall}
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <FilterMultiSelect
                            control={control}
                            name="solution"
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

                <div className="flex lg:flex-row flex-col justify-end gap-[0.625rem]">
                    <CustomButton
                        variant="secondary"
                        title="Réinitialiser les filtres"
                        label=""
                        className="[&>.icon]:ml-0 h-12 w-12 rounded-full px-2 py-2 justify-self-start"
                        IconRight={Eraser}
                        onClick={() => {
                            form.reset()
                        }}
                    />
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
                        className="px-5 py-3 h-fit"
                        IconRight={Check}
                        type="submit"
                    />
                </div>
            </form>
        </Form>
    )
}
