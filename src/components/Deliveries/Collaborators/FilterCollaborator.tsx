import { CustomButton } from '@/components/custom/CustomButton'
import { InputFieldForm } from '@/components/custom/InputField'
import { SelectField } from '@/components/custom/SelectField'
import { MultiSelectOptionsType } from '@/components/MultiSelect'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { DateFilter } from '@/components/utils/DateFilters'
import { FilterCity } from '@/components/utils/FilterCity'
import { FilterManager } from '@/components/utils/FilterManger'
import { FilterMultiSelect } from '@/components/utils/FilterMultiSelect'
import { FilterRegion } from '@/components/utils/FilterRegion'
import { FilterUsers } from '@/components/utils/FilterUser'
import MobileHeader from '@/components/utils/MobileHeader'
import { PartnerCollaboratorsFilerSchema } from '@/types/collaborators'
import { SchemaCollaborators } from '@/types/collaboratorsUtils'
import { PartnerSolutionType } from '@/types/partnersType'
import { capitalize } from '@/types/utils'

import { ListFilter, Mail, PhoneCall, Eraser, X, Check } from 'lucide-react'
import { FC } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

interface FormFilterCollaboratorProps {
    form: UseFormReturn<z.infer<typeof PartnerCollaboratorsFilerSchema>>
    onSubmit: (data: z.infer<typeof PartnerCollaboratorsFilerSchema>) => void
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
    archive: boolean
}

export const FormFilterCollaborator: FC<FormFilterCollaboratorProps> = ({
    form,
    onSubmit,
    setOpen,
    open,
    archive,
}) => {
    console.log(
        '+++++++++++++++= FormFilterCollaborator +++++++++++++++',
        `${archive}`
    )
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex  items-center gap-3 lg:rounded-[12px] rounded-full lg:border border-lynch-200 border-0 text-lynch-500 font-medium text-sm p-4 lg:px-5 lg:py-3 hover:text-black hover:bg-neutral-100 my-4 lg:my-0 bg-white">
                <span className="lg:inline-flex hidden">Filtrer par</span>
                <ListFilter />
            </DialogTrigger>
            <DialogContent className="[&>.Icon]:hidden p-5 lg:rounded-[14px] w-full max-w-full rounded-none lg:max-w-[36.25rem] min-w-full lg:min-w-fit gap-[1.875rem] max-h-screen overflow-auto">
                <FormCollaborator
                    form={form}
                    onSubmit={onSubmit}
                    setOpen={setOpen}
                    archive={archive}
                />
            </DialogContent>
        </Dialog>
    )
}

interface FormCollaboratorProps {
    form: UseFormReturn<z.infer<typeof PartnerCollaboratorsFilerSchema>>
    onSubmit: (data: z.infer<typeof PartnerCollaboratorsFilerSchema>) => void
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    archive: boolean
}

const FormCollaborator: FC<FormCollaboratorProps> = ({
    form,
    onSubmit,
    setOpen,
    archive,
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
                        <FilterUsers
                            control={control}
                            name="user"
                            label="Collaborateurs"
                            type={`DELIVERY_PARTNER&${archive}`}
                            filter="user"
                        />
                        <SelectField
                            control={control}
                            name="roleName"
                            label="Role"
                            options={[
                                'MANAGER',
                                'SALES_MANAGER',
                                'DELIVERY_MAN',
                                'LEAD',
                            ].map((role) => ({
                                key: role,
                                label: capitalize(role.replace('_', ' ')),
                            }))}
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <FilterCity
                            control={control}
                            name="city"
                            label="Ville"
                            type={'DELIVERY'}
                        />
                        <FilterRegion
                            control={control}
                            name="region"
                            label="Région"
                            type={'DELIVERY'}
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

                <div className="flex lg:flex-row flex-col justify-end gap-[0.625rem]">
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
