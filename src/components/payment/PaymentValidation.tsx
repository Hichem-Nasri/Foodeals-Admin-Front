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
import { Control, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputFieldForm } from '../custom/InputField'
import { Form, FormField, FormMessage } from '../ui/form'
import { DatePicker } from '../DatePicker'
import { Select } from '../custom/Select'
import { Label } from '../Label'
import { UploadFile } from '../Partners/NewPartner/UploadFile'
import {
    Banknote,
    CheckCheck,
    CheckCircle,
    CreditCard,
    HandCoins,
    LucideProps,
    TicketCheck,
    X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { MultiSelectOptionsType } from '../MultiSelect'
import { z } from 'zod'
import { NotificationType, PriceType } from '@/types/GlobalType'
import AmountAndCurrency from './AmountAndCurrency'
import { useMutation } from '@tanstack/react-query'
import api from '@/api/Auth'
import { useNotification } from '@/context/NotifContext'
import MobileHeader from '../utils/MobileHeader'

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

type FromPaymentCheck = {
    type: PaymentMethod
    chequeNumber: string
    bankName: string
    deadlineDate: string
    recuperationDate: string
    issuer: string
}
type FormPaymentTransfer = {
    type: PaymentMethod
}

type FormPaymentCard = {
    type: PaymentMethod
    cardNumber: string
    cardHolderName: string
    expiryDate: string
    cvv: string
}

type FormPaymentCash = {
    type: PaymentMethod
    date: string
}

type FormPayment = {
    id: string
    paymentMethod: PaymentMethod
    amount: PriceType
    paymentDetails:
        | FromPaymentCheck
        | FormPaymentTransfer
        | FormPaymentCard
        | FormPaymentCash
    document?: File
}

const PaymentDetails = (type: PaymentMethod, data: any) => {
    switch (type) {
        case PaymentMethod.CASH:
            return {
                type,
                date: data.date,
            }
        case PaymentMethod.CARD_BANK:
            return {
                type,
                cardNumber: data.cardNumber,
                cardHolderName: data.cardHolderName,
                expiryDate: data.expiryDate,
                cvv: data.cvv,
            }
        case PaymentMethod.TRANSFER:
            return {
                type,
            }
        case PaymentMethod.CHECK:
            return {
                type,
                chequeNumber: data.checkNumber,
                bankName: data.bankCompany,
                deadlineDate: data.dateOfGet,
                recuperationDate: data.dateOfWrite,
                issuer: data.issuerName,
            }
    }
}

const getPayment = (
    id: string,
    type: PaymentMethod,
    data: any,
    currencies: string
) => {
    const payment: FormPayment = {
        id,
        paymentMethod: type,
        amount: {
            amount: data.amount,
            currency: currencies,
        },
        paymentDetails: PaymentDetails(type, data),
        document: data.document,
    }
    console.log(payment)
    return payment
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
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
        PaymentMethod.CASH
    )
    const Notif = useNotification()

    const schema = paymentSchemas[paymentMethod || PaymentMethod.CASH]
    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onBlur',
        defaultValues: {
            ...defaultValuesPayment,
        } as any,
    })

    const { mutate } = useMutation({
        mutationKey: ['payment', id],
        mutationFn: async (data: FormPayment) => {
            try {
                const { document, ...rest } = data
                console.log('rest', rest)
                console.log('Document', document)
                const formData = new FormData()
                formData.append('dto', JSON.stringify(rest))
                if (document) formData.append('document', document)
                const res = await api
                    .post(
                        'http://localhost:8080/api/v1/payments/process?type=COMMISSION',
                        formData
                    )
                    .catch((e) => {
                        console.error(e)
                        throw new Error('Field to process payment')
                    })
                if ([200, 201].includes(res.status)) {
                    Notif.notify(
                        NotificationType.SUCCESS,
                        'Payment has been processed successfully'
                    )
                }
            } catch (e) {
                Notif.notify(NotificationType.ERROR, 'Error processing payment')
                console.log(e)
            }
        },
    })

    const onSubmit: SubmitHandler<FormData> = (data) => {
        // console.log(data)
        const paymentData = getPayment(id, paymentMethod, data, currencies)
        mutate(paymentData)
    }

    const handlePaymentChange = (value: PaymentMethod) => {
        setPaymentMethod(value)
        reset()
    }

    const { handleSubmit, control, reset } = form
    const options: MultiSelectOptionsType[] = [
        {
            key: PaymentMethod.CASH,
            label: 'Espèce',
            icon: HandCoins,
        },
        {
            key: PaymentMethod.CARD_BANK,
            label: 'Carte bancaire',
            icon: CreditCard,
        },
        {
            key: PaymentMethod.TRANSFER,
            label: 'Virement bancaire',
            icon: Banknote,
        },
        {
            key: PaymentMethod.CHECK,
            label: 'Chèque',
            icon: TicketCheck,
        },
    ]
    const [currencies, setCurrencies] = useState('MAD')

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
                            'flex lg:hidden w-full h-fit py-3 px-7 rounded-[18px] text-white bg-primary border-primary ml-1',
                            className
                        )}
                        disabled={disabled}
                        IconRight={CheckCheck}
                    />
                )}
            </DialogTrigger>
            <DialogContent className="[&>.Icon]:hidden p-0 lg:p-4 lg:rounded-[14px] max-w-[42.5rem] w-full gap-[1.875rem] min-h-screen lg:min-h-fit lg:max-h-[95vh] overflow-auto flex  flex-col rounded-none">
                <DialogTitle className="text-[1.375rem] font-normal text-lynch-400 lg:flex hidden">
                    Commission à payer
                </DialogTitle>
                <div className=" font-normal text-lynch-400 lg:hidden w-full">
                    <MobileHeader
                        title="Commission à payer"
                        onClick={() => {}}
                        buttonType="dialog"
                    />
                </div>
                <Form {...form}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-3 justify-between w-full p-4 min-h-full flex-1 overflow-auto h-full"
                    >
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col lg:flex-row gap-4">
                                <div className="w-full">
                                    <Select
                                        label="Type"
                                        value={paymentMethod}
                                        onChange={(value) =>
                                            handlePaymentChange(
                                                value as PaymentMethod
                                            )
                                        }
                                        options={options}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                {paymentMethod === PaymentMethod.CASH && (
                                    <div className="flex items-center gap-4">
                                        <InputFieldForm
                                            label={'Amount'}
                                            name={'amount'}
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
                                                        onChange={(value) => {
                                                            field.onChange(
                                                                value.toISOString()
                                                            )
                                                        }}
                                                        value={field.value}
                                                    />
                                                    <FormMessage {...field} />
                                                </div>
                                            )}
                                        />
                                    </div>
                                )}

                                {paymentMethod === PaymentMethod.CARD_BANK && (
                                    <InputFieldForm
                                        label={'Amount'}
                                        name={'amount'}
                                        control={control}
                                        placeholder="Enter amount"
                                        type="number"
                                    />
                                )}

                                {paymentMethod === PaymentMethod.TRANSFER && (
                                    <div className="flex flex-col gap-4">
                                        <InputFieldForm
                                            label={'Amount'}
                                            name={'amount'}
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
                                                        onChange={(value) => {
                                                            if (value) {
                                                                field.onChange(
                                                                    value[0]
                                                                        .name
                                                                )
                                                            }
                                                        }}
                                                        value={field.value}
                                                    />
                                                    <FormMessage {...field} />
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
                                                            onChange={(value) =>
                                                                field.onChange(
                                                                    value.toISOString()
                                                                )
                                                            }
                                                            value={field.value}
                                                        />
                                                        <FormMessage
                                                            {...field}
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
                                                            onChange={(value) =>
                                                                field.onChange(
                                                                    value.toISOString()
                                                                )
                                                            }
                                                            value={field.value}
                                                        />
                                                        <FormMessage
                                                            {...field}
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
                                                        onChange={(value) => {
                                                            if (value) {
                                                                field.onChange(
                                                                    value[0]
                                                                        .name
                                                                )
                                                            }
                                                        }}
                                                        value={field.value}
                                                    />
                                                    <FormMessage {...field} />
                                                </div>
                                            )}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-row items-end lg:justify-end gap-3 mt-2">
                            <DialogClose asChild>
                                <CustomButton
                                    type="button"
                                    label="FERMER"
                                    variant="outline"
                                    className="lg:w-fit rounded-[12px] w-full lg:order-[0] order-3 h-full py-3 px-5 text-lynch-400  min-w-32"
                                    IconRight={X}
                                />
                            </DialogClose>
                            <CustomButton
                                label="PAYE"
                                type="submit"
                                onClick={() => {
                                    console.log('submit')
                                }}
                                className="lg:w-fit rounded-[12px] w-full h-full py-3 px-5 min-w-32"
                                IconRight={CheckCircle}
                            />
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
