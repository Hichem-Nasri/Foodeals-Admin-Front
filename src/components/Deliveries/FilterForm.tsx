import { FC } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { CustomButton } from '../custom/CustomButton'
import { Check, Eraser, ListFilter, Mail, PhoneCall, X } from 'lucide-react'
import { PartnerSolutionType } from '@/types/partnersType'
import { PartnerSolution } from '../Partners/PartnerSolution'
import { DateFilter } from '../utils/DateFilters'
import { FilterMultiSelect } from '../utils/FilterMultiSelect'
import { Form } from '../ui/form'
import { UseFormReturn } from 'react-hook-form'
import { InputFieldForm } from '../custom/InputField'
import { SelectField } from '../custom/SelectField'
import { MultiSelectOptionsType } from '../MultiSelect'
import MobileHeader from '../utils/MobileHeader'
import { FilterOrganizations } from '../utils/FilterOrganizations'
import { FilterCity } from '../utils/FilterCity'
import { FilterManager } from '../utils/FilterManger'
import { FilterRegion } from '../utils/FilterRegion'

interface FormFilterProps {
    form: UseFormReturn<any>
    onSubmit: (data: any) => void
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
    type: string
}

export const FormFilter: FC<FormFilterProps> = ({
    form,
    onSubmit,
    setOpen,
    open,
    type,
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
                    type={type}
                />
            </DialogContent>
        </Dialog>
    )
}

interface FormAssociationProps {
    form: UseFormReturn<any>
    onSubmit: (data: any) => void
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    type: string
}

const FormAssociation: FC<FormAssociationProps> = ({
    form,
    onSubmit,
    setOpen,
    type,
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
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <FilterOrganizations
                            control={control}
                            name="companyName"
                            label="Raison sociale"
                            placeholder="Partenaire"
                            type={type}
                        />
                        <FilterManager
                            control={control}
                            name="collaborators"
                            label="Collaborateurs"
                            type={type}
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
                        <FilterCity
                            control={control}
                            name="city"
                            label="Ville"
                            type={type}
                        />
                        <FilterMultiSelect
                            control={control}
                            name="solutions"
                            label="Solutions"
                            type={type}
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
                        className="[&>.icon]:ml-0 space-x-2 text-primary lg:[&>.label]:hidden h-12 w-fit lg:rounded-full px-2 py-2 justify-self-start"
                        IconRight={Eraser}
                        onClick={() => {
                            form.reset()
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
