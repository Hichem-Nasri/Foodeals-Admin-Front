import { FC, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { CustomButton } from '../custom/CustomButton'
import { Check, ListFilter, Mail, PhoneCall, X } from 'lucide-react'
import { PartnerSolutionType, PartnerType } from '@/types/partnersType'
import { DatePicker } from '../DatePicker'
import { Label } from '../Label'
import { MultiSelect } from '../MultiSelect'
import { Input } from '../custom/Input'
import { UseFormReturn } from 'react-hook-form'
import { Select } from '../custom/Select'
import { Checkbox } from '../ui/checkbox'
import { DialogClose } from '@radix-ui/react-dialog'
import { PartnerSolution } from '../Partners/PartnerSolution'

interface FormFilterProps {}

export const FormFilter: FC<FormFilterProps> = () => {
    const options = [
        {
            label: 'Option 1',
            key: 'option1',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=MarjaneGourmet',
        },
        {
            label: 'Option 2',
            key: 'option2',
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=MarjaneHolding',
        },
    ]
    const [selectedValues, setSelectedValues] = useState<string[]>([])
    const [selectedValue, setSelectedValue] = useState<string>('')
    return (
        <Dialog>
            <DialogTrigger className="flex items-center gap-3 lg:rounded-[12px] rounded-full lg:border border-lynch-200 border-0 text-lynch-500 font-medium text-sm p-4 lg:px-5 lg:py-3 hover:text-black hover:bg-neutral-100 my-4 lg:my-0 bg-white">
                <span className="lg:inline-flex hidden">Filtrer par</span>
                <ListFilter />
            </DialogTrigger>
            <DialogContent className="[&>.Icon]:hidden p-5 rounded-[14px] w-full max-w-[36.25rem] gap-[1.875rem] max-h-screen overflow-auto">
                <DialogTitle className="text-[1.375rem] font-normal text-lynch-400">
                    Filtrer par
                </DialogTitle>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3 w-full">
                        <Label
                            label="Date de création (Début et fin)"
                            htmlFor="start"
                        />
                        <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
                            <DatePicker id="start" />
                            <DatePicker />
                        </div>
                    </div>
                    <div className="flex  lg:flex-row flex-col gap-3 w-full">
                        <div className="flex flex-col gap-3 w-full">
                            <Label
                                label="Raison sociale"
                                htmlFor="raisonSociale"
                            />
                            <MultiSelect
                                onSelect={setSelectedValues}
                                options={options}
                                id="raisonSociale"
                                selectedValues={selectedValues}
                                emptyAvatar="/avatar/emptyPartner.png"
                            />
                        </div>
                        <div className="flex  flex-col gap-3 w-full">
                            <Label
                                label="Collaborateurs"
                                htmlFor="collaborateurs"
                            />
                            <MultiSelect
                                onSelect={setSelectedValues}
                                options={options}
                                id="collaborateurs"
                                selectedValues={selectedValues}
                                emptyAvatar="/avatar/emptyUser.png"
                            />
                        </div>
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <div className="flex flex-col gap-3 w-full">
                            <Label label="Email" htmlFor="email" />
                            <Input
                                name="email"
                                onChange={() => {}}
                                placeholder="Email"
                                value={''}
                                IconLeft={Mail}
                            />
                        </div>
                        <div className="flex  flex-col gap-3 w-full">
                            <Label label="Téléphone" htmlFor="Téléphone" />
                            <Input
                                name="Téléphone"
                                onChange={() => {}}
                                placeholder="Téléphone"
                                value={''}
                                IconLeft={PhoneCall}
                            />
                        </div>
                    </div>
                    <div className="flex lg:flex-row flex-col gap-3 w-full">
                        <div className="flex flex-col gap-3 w-full">
                            <Label label="ville" htmlFor="city" />
                            <Select
                                label=""
                                placeholder="Sélectionner la ville"
                                onChange={setSelectedValue}
                                options={[
                                    {
                                        key: 'option1',
                                        label: 'Option 1',
                                    },
                                    {
                                        key: 'option2',
                                        label: 'Option 2',
                                    },
                                ]}
                                value={selectedValue}
                            />
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <Label
                                label="Type de compte"
                                htmlFor="accountType"
                            />
                            <Select
                                label=""
                                placeholder="Sélectionner"
                                onChange={setSelectedValue}
                                options={[
                                    {
                                        key: 'option1',
                                        label: 'Option 1',
                                    },
                                    {
                                        key: 'option2',
                                        label: 'Option 2',
                                    },
                                ]}
                                value={selectedValue}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <Label label="Type de compte" htmlFor="accountType" />
                        <div className="flex lg:flex-row flex-col lg:items-center gap-3">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    name={PartnerSolutionType.MARKET_PRO}
                                    className="size-5"
                                />
                                <PartnerSolution
                                    solution={PartnerSolutionType.MARKET_PRO}
                                    className="px-4 py-3"
                                    size={20}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    name={PartnerSolutionType.MARKET_PRO}
                                    className="size-5"
                                />
                                <PartnerSolution
                                    solution={PartnerSolutionType.DLC_PRO}
                                    className="px-4 py-3"
                                    size={20}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    name={PartnerSolutionType.MARKET_PRO}
                                    className="size-5"
                                />
                                <PartnerSolution
                                    solution={PartnerSolutionType.DONATE_PRO}
                                    className="px-4 py-3"
                                    size={20}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <DialogDescription className="flex lg:flex-row flex-col justify-end gap-[0.625rem]">
                    <DialogClose className="lg:w-fit w-full">
                        <CustomButton
                            variant="secondary"
                            label="Annuler"
                            onClick={() => {}}
                            className="px-5 py-3 h-fit lg:w-fit w-full"
                            IconRight={X}
                            type="submit"
                        />
                    </DialogClose>
                    <CustomButton
                        label="Confirmer"
                        onClick={() => {}}
                        className="px-5 py-3 h-fit"
                        IconRight={Check}
                        type="submit"
                    />
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
