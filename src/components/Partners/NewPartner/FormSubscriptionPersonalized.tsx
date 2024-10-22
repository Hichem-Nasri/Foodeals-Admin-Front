import { RadioButton } from '@/components/custom/RadioButton'
import { Label } from '@/components/Label'
import { Checkbox } from '@/components/ui/checkbox'
import { PartnerSubscriptionSchema } from '@/types/PartnerSchema'
import { FC, Fragment } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { PartnerSolution } from '../PartnerSolution'
import { PartnerCompanyType, PartnerSolutionType } from '@/types/partners'
import { InputFieldForm } from '@/components/custom/InputField'
import { SelectField } from '@/components/custom/SelectField'
import { Percent } from 'lucide-react'
import { FormField } from '@/components/ui/form'

interface FormSubscriptionPersonalizedProps {
    form: UseFormReturn<z.infer<typeof PartnerSubscriptionSchema>>
    disabled?: boolean
}

export const FormSubscriptionPersonalized: FC<
    FormSubscriptionPersonalizedProps
> = ({ form, disabled }) => {
    const { solutions } = form.watch()

    return (
        <Fragment>
            <div className="flex items-center justify-between">
                <Label
                    label="Nos solution"
                    className="text-primary text-sm font-medium"
                />
                <FormField
                    control={form.control}
                    name="solutions.solutionsId"
                    render={({ field }) => (
                        <div className="flex items-center gap-5">
                            <div className="flex items-center my-auto h-full gap-2">
                                <Checkbox
                                    name={PartnerSolutionType.MARKET_PRO}
                                    className="size-5"
                                    onClick={(e) => {
                                        e.currentTarget.ariaChecked == 'false'
                                            ? field.onChange([
                                                  ...field.value,
                                                  PartnerSolutionType.MARKET_PRO,
                                              ])
                                            : field.onChange(
                                                  field.value.filter(
                                                      (v) =>
                                                          v !==
                                                          PartnerSolutionType.MARKET_PRO
                                                  )
                                              )
                                    }}
                                    disabled={disabled}
                                />
                                <PartnerSolution
                                    solution={PartnerSolutionType.MARKET_PRO}
                                    className="px-4 py-[0.4rem] my-3"
                                    size={20}
                                />
                            </div>
                            <div className="flex items-center my-auto h-full gap-2">
                                <Checkbox
                                    name={PartnerSolutionType.DLC_PRO}
                                    className="size-5"
                                    onClick={(e) => {
                                        e.currentTarget.ariaChecked == 'false'
                                            ? field.onChange([
                                                  ...solutions!.solutionsId,
                                                  PartnerSolutionType.DLC_PRO,
                                              ])
                                            : field.onChange(
                                                  solutions?.solutionsId.filter(
                                                      (v) =>
                                                          v !==
                                                          PartnerSolutionType.DLC_PRO
                                                  )
                                              )
                                    }}
                                    disabled={disabled}
                                />
                                <PartnerSolution
                                    solution={PartnerSolutionType.DLC_PRO}
                                    className="px-4 py-[0.4rem] my-3"
                                    size={20}
                                />
                            </div>
                            <div className="flex items-center my-auto h-full gap-2">
                                <Checkbox
                                    name={PartnerSolutionType.DONATE_PRO}
                                    className="size-5"
                                    onClick={(e) => {
                                        e.currentTarget.ariaChecked == 'false'
                                            ? field.onChange([
                                                  ...solutions!.solutionsId,
                                                  PartnerSolutionType.DONATE_PRO,
                                              ])
                                            : field.onChange(
                                                  solutions?.solutionsId.filter(
                                                      (v) =>
                                                          v !==
                                                          PartnerSolutionType.DONATE_PRO
                                                  )
                                              )
                                    }}
                                    disabled={disabled}
                                />
                                <PartnerSolution
                                    solution={PartnerSolutionType.DONATE_PRO}
                                    className="px-4 py-[0.4rem] my-3"
                                    size={20}
                                />
                            </div>
                        </div>
                    )}
                />
            </div>
            <div className="flex items-start gap-3">
                <SelectField
                    control={form.control}
                    name="solutions.duration"
                    label="Subscription"
                    options={[
                        { key: 6, label: '6 mois' },
                        { key: 12, label: '12 mois' },
                        { key: 24, label: '24 mois' },
                    ]}
                    type="number"
                    disabled={disabled}
                />
                <InputFieldForm
                    label="Montant"
                    name="solutions.amount"
                    type="number"
                    control={form.control}
                    placeholder="Saisir le montant"
                    disabled={disabled}
                />
                <SelectField
                    control={form.control}
                    name="solutions.expiration"
                    label="Échéance"
                    options={[
                        { key: 5, label: '5' },
                        { key: 10, label: '10' },
                        { key: 15, label: '15' },
                    ]}
                    type="number"
                    disabled={disabled}
                />
            </div>
            {solutions?.solutionsId &&
                solutions.solutionsId.filter(
                    (s) => s === PartnerSolutionType.MARKET_PRO
                ).length > 0 && (
                    <div className="flex items-start gap-3">
                        <SelectField
                            control={form.control}
                            name="solutions.managerId"
                            label="Gérer par"
                            options={[
                                {
                                    key: PartnerCompanyType.PRINCIPAL,
                                    label: 'Principal',
                                },
                                {
                                    key: PartnerCompanyType.NORMAL,
                                    label: 'Sous compte',
                                },
                            ]}
                            placeholder="Sélectionnez type magasin"
                            disabled={disabled}
                        />
                        <InputFieldForm
                            label="Montant"
                            name="solutions.commissionCash"
                            type="number"
                            control={form.control}
                            placeholder="Saisir le montant"
                            IconRight={Percent}
                            className="pr-10"
                            disabled={disabled}
                        />
                        <InputFieldForm
                            label="Montant"
                            name="solutions.commissionCard"
                            type="number"
                            control={form.control}
                            placeholder="Saisir le montant"
                            IconRight={Percent}
                            className="pr-10"
                            disabled={disabled}
                        />
                    </div>
                )}
        </Fragment>
    )
}
