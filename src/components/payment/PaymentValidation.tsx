'use client'
import { FC, ForwardRefExoticComponent, RefAttributes, useState } from 'react'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { CustomButton } from '../custom/CustomButton'
import {
    defaultValuesPayment,
    PaymentMethod,
    paymentSchemas,
} from '@/types/PaymentType'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputFieldForm } from '../custom/InputField'
import { Form, FormField } from '../ui/form'
import { DatePicker } from '../DatePicker'
import { Select } from '../custom/Select'
import { Label } from '../Label'
import { UploadFile } from '../Partners/NewPartner/UploadFile'
import { CheckCheck, CheckCircle, LucideProps, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaymentValidationProps {
    id: string
    label: string
    disabled?: boolean
    isMobile?: boolean
    className?: string
    IconLeft?: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
    IconRight?: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
}
export const PaymentValidation: FC<PaymentValidationProps> = ({
    disabled = false,
    id,
    label,
    isMobile = false,
    className,
    IconLeft,
    IconRight,
}) => {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
        PaymentMethod.CASH
    )

    const schema = paymentSchemas[paymentMethod || PaymentMethod.CASH]
    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onBlur',
        defaultValues: {
            ...defaultValuesPayment,
        } as any,
    })

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data)
    }

    const handlePaymentChange = (value: PaymentMethod) => {
        setPaymentMethod(value)
        reset()
    }

    const { handleSubmit, control, reset } = form

    return (
        <Dialog>
            <DialogTrigger disabled={disabled} asChild>
                {!isMobile ? (
                    <CustomButton
                        label={label}
                        className={cn(
                            'lg:flex hidden h-fit py-3 px-7 rounded-[6px] text-white ml-1',
                            className
                        )}
                        disabled={disabled}
                        IconLeft={IconLeft}
                        IconRight={IconRight}
                    />
                ) : (
                    <CustomButton
                        label={label}
                        variant="outline"
                        className={cn(
                            'flex lg:hidden min-w-[400px] h-fit py-3 px-7 rounded-[18px] text-white bg-primary border-primary ml-1',
                            className
                        )}
                        disabled={disabled}
                        IconRight={CheckCheck}
                    />
                )}
            </DialogTrigger>
            <DialogContent className="[&>.Icon]:hidden p-5 rounded-[14px] max-w-[42.5rem] w-full gap-[1.875rem]">
                <DialogTitle className="text-[1.375rem] font-normal text-lynch-400">
                    Commission à payer
                </DialogTitle>
                <div className="flex flex-col gap-3">
                    <Form {...form}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-3"
                        >
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col lg:flex-row gap-4">
                                    <div className="w-full">
                                        <Select
                                            label="Type"
                                            value={
                                                paymentMethod ||
                                                PaymentMethod.CASH
                                            }
                                            onChange={(value) =>
                                                handlePaymentChange(
                                                    value as PaymentMethod
                                                )
                                            }
                                            options={[
                                                {
                                                    key: PaymentMethod.CASH,
                                                    label: 'Espèce',
                                                },
                                                {
                                                    key: PaymentMethod.CARD_BANK,
                                                    label: 'Carte bancaire',
                                                },
                                                {
                                                    key: PaymentMethod.TRANSFER,
                                                    label: 'Virement bancaire',
                                                },
                                                {
                                                    key: PaymentMethod.CHECK,
                                                    label: 'Chèque',
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-6">
                                    {paymentMethod === PaymentMethod.CASH && (
                                        <div className="flex lg:flex-row flex-col items-center gap-4">
                                            <InputFieldForm
                                                label="Montant a payer"
                                                name="amount"
                                                control={control}
                                                placeholder="Enter amount"
                                                type="number"
                                            />
                                            <FormField
                                                control={control}
                                                name={'date' as any}
                                                render={({ field }) => (
                                                    <div className="flex flex-col items-start gap-3  w-full text-lynch-400">
                                                        <Label
                                                            label="Date de récupération"
                                                            className="text-sm font-semibold text-lynch-950"
                                                        />
                                                        <DatePicker
                                                            onChange={(value) =>
                                                                field.onChange(
                                                                    value
                                                                )
                                                            }
                                                            value={field.value}
                                                        />
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    )}

                                    {paymentMethod ===
                                        PaymentMethod.CARD_BANK && (
                                        <div className="flex gap-4">
                                            <InputFieldForm
                                                label="Montant a payer"
                                                name="amount"
                                                control={control}
                                                placeholder="Enter amount"
                                                type="number"
                                            />
                                        </div>
                                    )}

                                    {paymentMethod ===
                                        PaymentMethod.TRANSFER && (
                                        <div className="flex flex-col gap-4">
                                            <InputFieldForm
                                                label="Montant a payer"
                                                name="amount"
                                                control={control}
                                                placeholder="Enter amount"
                                                type="number"
                                            />
                                            <FormField
                                                control={control}
                                                name={'document' as any}
                                                render={({ field }) => (
                                                    <div className="flex flex-col items-start gap-3 w-full text-lynch-400">
                                                        <Label
                                                            label="Document de virement"
                                                            className="text-sm font-semibold text-lynch-950"
                                                        />
                                                        <UploadFile
                                                            onChange={
                                                                field.onChange
                                                            }
                                                            value={field.value}
                                                        />
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    )}

                                    {paymentMethod === PaymentMethod.CHECK && (
                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-col lg:flex-row gap-4">
                                                <InputFieldForm
                                                    label="Montant a payer"
                                                    name="amount"
                                                    control={control}
                                                    placeholder="Enter amount"
                                                    type="number"
                                                />
                                                <InputFieldForm
                                                    label="Check Number"
                                                    name="checkNumber"
                                                    control={control}
                                                    placeholder="Enter check number"
                                                />
                                            </div>
                                            <div className="flex flex-col lg:flex-row gap-4">
                                                <FormField
                                                    control={control}
                                                    name={'dateOfWrite' as any}
                                                    render={({ field }) => (
                                                        <div className="flex flex-col items-start gap-3 w-full text-lynch-400">
                                                            <Label
                                                                label="Date échéance"
                                                                className="text-sm font-semibold text-lynch-950"
                                                            />
                                                            <DatePicker
                                                                onChange={(
                                                                    value
                                                                ) =>
                                                                    field.onChange(
                                                                        value
                                                                    )
                                                                }
                                                                value={
                                                                    field.value
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                />
                                                <FormField
                                                    control={control}
                                                    name={'dateOfGet' as any}
                                                    render={({ field }) => (
                                                        <div className="flex flex-col items-start gap-3 w-full text-lynch-400">
                                                            <Label
                                                                label="Date de récupération"
                                                                className="text-sm font-semibold text-lynch-950"
                                                            />
                                                            <DatePicker
                                                                onChange={(
                                                                    value
                                                                ) =>
                                                                    field.onChange(
                                                                        value
                                                                    )
                                                                }
                                                                value={
                                                                    field.value
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                            <div className="flex flex-col lg:flex-row gap-4">
                                                <InputFieldForm
                                                    label="Bank Company"
                                                    name="bankCompany"
                                                    control={control}
                                                    placeholder="Enter bank company"
                                                />
                                                <InputFieldForm
                                                    label="Issuer Name"
                                                    name="issuerName"
                                                    control={control}
                                                    placeholder="Enter issuer name"
                                                />
                                            </div>
                                            <FormField
                                                control={control}
                                                name={'document' as any}
                                                render={({ field }) => (
                                                    <div className="flex flex-col items-start gap-3 w-full text-lynch-400">
                                                        <Label
                                                            label="Document de virement"
                                                            className="text-sm font-semibold text-lynch-950"
                                                        />
                                                        <UploadFile
                                                            onChange={
                                                                field.onChange
                                                            }
                                                            value={field.value}
                                                        />
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex lg:flex-row flex-col items-center lg:justify-end gap-3 mt-2">
                                <DialogClose asChild>
                                    <CustomButton
                                        type="button"
                                        label="Annuler"
                                        variant="outline"
                                        className="lg:w-fit w-full lg:order-[0] order-3 h-fit py-3 px-5 text-lynch-400"
                                        IconRight={X}
                                    />
                                </DialogClose>
                                <CustomButton
                                    label="Valider"
                                    type="submit"
                                    className="lg:w-fit w-full h-fit py-3 px-5"
                                    IconRight={CheckCircle}
                                />
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
