import { FC, Fragment } from 'react'
import { Label } from '@/components/Label'
import { Checkbox } from '@/components/ui/checkbox'
import {
    expirationOption,
    PartnerSolutionType,
    subscriptionOption,
} from '@/types/partnersType'
import { PartnerSolution } from '../PartnerSolution'
import { SelectField } from '@/components/custom/SelectField'
import { InputFieldForm } from '@/components/custom/InputField'
import { Percent } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { PartnerSubscriptionSchema } from '@/types/PartnerSchema'
import { z } from 'zod'
import { FormField, FormMessage } from '@/components/ui/form'

interface FormSubscriptionGeneralProps {
    form: UseFormReturn<z.infer<typeof PartnerSubscriptionSchema>>
    disabled?: boolean
}

export const FormSubscriptionGeneral: FC<FormSubscriptionGeneralProps> = ({
    form,
    disabled,
}) => {
    const { dlcPro, donate, marketPro } = form.watch()
    const { errors } = form.formState // Get the form errors

    return (
        <Fragment>
            <div className="flex lg:flex-row flex-col items-start gap-3">
                <div className="flex flex-col gap-3 h-full text-lynch-400 lg:min-w-40">
                    <Label
                        label="Nos solution"
                        htmlFor={PartnerSolutionType.MARKET_PRO}
                        className="text-xs font-semibold text-lynch-950"
                    />
                    <FormField
                        control={form.control}
                        name="marketPro.selected"
                        render={({ field }) => (
                            <div className="flex items-center my-auto h-full gap-2">
                                <Checkbox
                                    name={PartnerSolutionType.MARKET_PRO}
                                    className="size-5"
                                    checked={field.value}
                                    onClick={() => field.onChange(!field.value)}
                                    disabled={disabled}
                                />
                                <PartnerSolution
                                    solution={PartnerSolutionType.MARKET_PRO}
                                    className="px-4 py-[0.4rem] my-3"
                                    size={20}
                                />
                                <FormMessage />
                            </div>
                        )}
                    />
                    {errors.marketPro?.selected && (
                        <div className="text-red-500 text-sm mt-2">
                            {errors.marketPro.selected.message}
                        </div>
                    )}
                </div>
                <SelectField
                    control={form.control}
                    name="marketPro.duration"
                    label="Abonnement"
                    options={subscriptionOption}
                    type="number"
                    disabled={!marketPro?.selected || disabled}
                />
                <InputFieldForm
                    label="Montant"
                    name="marketPro.amount"
                    type="number"
                    control={form.control}
                    placeholder="Saisir le montant"
                    disabled={!marketPro?.selected || disabled}
                />
                <SelectField
                    control={form.control}
                    name="marketPro.expiration"
                    label="Échéance"
                    options={expirationOption}
                    type="number"
                    disabled={!marketPro?.selected || disabled}
                />
            </div>
            <div className="flex lg:flex-row flex-col items-start gap-3">
                <SelectField
                    control={form.control}
                    name="marketPro.managerId"
                    label="Gérer par"
                    options={[
                        {
                            key: 'PARTNER_WITH_SB',
                            label: 'Principal',
                        },
                        {
                            key: 'NORMAL_PARTNER',
                            label: 'Sous compte',
                        },
                    ]}
                    placeholder="Sélectionnez type magasin"
                    disabled={!marketPro?.selected || disabled}
                />
                <InputFieldForm
                    control={form.control}
                    label="Commission par espèce"
                    name="marketPro.commissionCash"
                    type="number"
                    placeholder="Saisir le montant"
                    IconRight={Percent}
                    className="pr-10"
                    disabled={!marketPro?.selected || disabled}
                />
                <InputFieldForm
                    label="Commission par carte"
                    name="marketPro.commissionCard"
                    type="number"
                    control={form.control}
                    placeholder="Saisir le montant"
                    IconRight={Percent}
                    className="pr-10"
                    disabled={!marketPro?.selected || disabled}
                />
            </div>
            <span className="w-fill h-[1px] bg-lynch-100" />
            <div className="flex lg:flex-row flex-col items-start gap-3">
                <div className="flex flex-col gap-3 h-full text-lynch-400 lg:min-w-40">
                    <Label
                        label="Nos solution"
                        htmlFor={PartnerSolutionType.DLC_PRO}
                        className="text-xs font-semibold text-lynch-950"
                    />
                    <FormField
                        control={form.control}
                        name="dlcPro.selected"
                        render={({ field }) => (
                            <div className="flex items-center my-auto h-full gap-2">
                                <Checkbox
                                    name={PartnerSolutionType.DLC_PRO}
                                    className="size-5"
                                    checked={field.value}
                                    disabled={disabled}
                                    onClick={() => field.onChange(!field.value)}
                                />
                                <PartnerSolution
                                    solution={PartnerSolutionType.DLC_PRO}
                                    className="px-4 py-[0.4rem] my-3"
                                    size={20}
                                />
                            </div>
                        )}
                    />
                    {errors.dlcPro?.selected && (
                        <div className="text-red-500 text-sm mt-2">
                            {errors.dlcPro.selected.message}
                        </div>
                    )}
                </div>
                <SelectField
                    control={form.control}
                    name="dlcPro.duration"
                    label="Abonnement"
                    options={subscriptionOption}
                    type="number"
                    disabled={!dlcPro?.selected || disabled}
                />
                <InputFieldForm
                    label="Montant"
                    name="dlcPro.amount"
                    type="number"
                    control={form.control}
                    placeholder="Saisir le montant"
                    disabled={!dlcPro?.selected || disabled}
                />
                <SelectField
                    control={form.control}
                    name="dlcPro.expiration"
                    label="Échéance"
                    options={expirationOption}
                    type="number"
                    disabled={!dlcPro?.selected || disabled}
                />
            </div>
            <span className="w-fill h-[1px] bg-lynch-100" />
            <div className="flex lg:flex-row flex-col items-start gap-3">
                <div className="flex flex-col gap-3 h-full text-lynch-400 lg:min-w-40">
                    <Label
                        label="Nos solution"
                        htmlFor={PartnerSolutionType.DONATE_PRO}
                        className="text-xs font-semibold text-lynch-950"
                    />
                    <FormField
                        control={form.control}
                        name="donate.selected"
                        render={({ field }) => (
                            <div className="flex items-center my-auto h-full gap-2">
                                <Checkbox
                                    name={PartnerSolutionType.DONATE_PRO}
                                    className="size-5"
                                    checked={field.value}
                                    onClick={() => field.onChange(!field.value)}
                                    disabled={disabled}
                                />
                                <PartnerSolution
                                    solution={PartnerSolutionType.DONATE_PRO}
                                    className="px-4 py-[0.4rem] my-3"
                                    size={20}
                                />
                            </div>
                        )}
                    />
                    {errors.donate?.selected && (
                        <div className="text-red-500 text-sm mt-2">
                            {errors.donate.selected.message}
                        </div>
                    )}
                </div>
                <SelectField
                    control={form.control}
                    name="donate.duration"
                    label="Abonnement"
                    options={subscriptionOption}
                    type="number"
                    disabled={!donate?.selected || disabled}
                />
                <InputFieldForm
                    label="Montant"
                    name="donate.amount"
                    type="number"
                    control={form.control}
                    placeholder="Saisir le montant"
                    disabled={!donate?.selected || disabled}
                />
                <SelectField
                    control={form.control}
                    name="donate.expiration"
                    label="Échéance"
                    options={expirationOption}
                    type="number"
                    disabled={!donate?.selected || disabled}
                />
            </div>
            {errors.marketPro?.selected ||
            errors.dlcPro?.selected ||
            errors.donate?.selected ? (
                <div className="text-red-500 text-sm mt-2">
                    At least one of marketPro, dlcPro, or donate must be
                    selected.
                </div>
            ) : null}
        </Fragment>
    )
}
