'use client'
import { FC, useEffect, useState } from 'react'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { CustomButton } from '../custom/CustomButton'
import {
    ConfirmPaymentType,
    defaultValuesConfirmPayment,
} from '@/types/PaymentType'
import { DatePicker } from '../DatePicker'
import { Label } from '../Label'
import { CheckCheck, CheckCircle, X } from 'lucide-react'
import { AvatarProfile } from '../AvatarProfile'
import { PartnerOptions } from '@/lib/utils'
import { Select } from '../custom/Select'
import { Input } from '../custom/Input'
import { getConfirmationInfo } from '@/lib/api/fetchConfirmationInfo'
import Image from 'next/image'

interface ConfirmPaymentProps {
    id: string
    label: string
    disabled?: boolean
    isMobile?: boolean
}

export const ConfirmPayment: FC<ConfirmPaymentProps> = ({
    disabled,
    id,
    label,
    isMobile = false,
}) => {
    const [confirmationDetails, setConfirmationDetails] =
        useState<ConfirmPaymentType>(defaultValuesConfirmPayment)

    const onSubmit = () => {
        // TODO: Confirm Receipt API {data.id}
    }

    useEffect(() => {
        const fetchDate = async () => {
            const res = (await getConfirmationInfo(id)) as ConfirmPaymentType
            setConfirmationDetails(res)
        }
        fetchDate()
    }, [confirmationDetails, id])

    // INFO: the PartnerOptions is an array of stores as objects with the following structure: { id: string, name: string, avatar: string }
    const adaptOptions = PartnerOptions.map((option) => ({
        key: option.id,
        label: option.name,
    }))

    return (
        <Dialog>
            <DialogTrigger disabled={disabled} asChild>
                {!isMobile ? (
                    <CustomButton
                        label={label}
                        className="lg:flex hidden h-fit py-3 px-7 rounded-[6px] text-white ml-1"
                        disabled={disabled}
                    />
                ) : (
                    <CustomButton
                        label={label}
                        variant="outline"
                        className="flex lg:hidden h-fit py-3 px-7 rounded-[18px] text-primary border-primary ml-1"
                        disabled={disabled}
                        IconRight={CheckCheck}
                    />
                )}
            </DialogTrigger>
            <DialogContent className="[&>.Icon]:hidden p-5 rounded-[14px] max-w-[42.5rem] w-full gap-[1.875rem]">
                <DialogTitle className="text-[1.375rem] font-normal text-lynch-400">
                    Commission a recevoir
                </DialogTitle>
                <div className="flex flex-col gap-3">
                    <div className="flex lg:flex-row flex-col items-center gap-4">
                        <Select
                            disabled
                            onChange={() => {}}
                            options={adaptOptions}
                            label="Type"
                            value={confirmationDetails?.store.id}
                            transform={(value) => {
                                const option = PartnerOptions.find(
                                    (option) => option.name === value
                                )
                                return (
                                    <div className="flex items-center gap-3">
                                        <AvatarProfile
                                            disabled
                                            iUrl={option?.avatar || ''}
                                            alt={option?.name}
                                            className="!rounded-full size-[40px]"
                                        />
                                        <Label label={option?.name || ''} />
                                    </div>
                                )
                            }}
                        />
                        <div className="flex flex-col items-start gap-3 w-full text-lynch-400">
                            <Label
                                label="Date de récupération"
                                className="text-xs font-semibold text-lynch-950"
                            />
                            <DatePicker
                                disabled
                                onChange={() => {}}
                                value={confirmationDetails.dateOfReception}
                            />
                        </div>
                    </div>
                    <div className="flex lg:flex-row flex-col items-center gap-4">
                        <Select
                            disabled
                            onChange={() => {}}
                            options={[
                                {
                                    key: confirmationDetails.transmitter,
                                    label: confirmationDetails.transmitter,
                                },
                            ]}
                            label="Nom émetteur"
                            value={confirmationDetails.transmitter}
                        />
                        <Input
                            disabled
                            name="amount"
                            onChange={() => {}}
                            value={confirmationDetails.amount}
                            label="Amount"
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col items-center gap-4">
                        <div className="flex flex-col items-start gap-3 w-full text-lynch-400">
                            <Label
                                label="Document de virement"
                                className="text-xs font-semibold text-lynch-950"
                            />
                            <span
                                key={confirmationDetails.document.fileUrl}
                                className="flex items-center gap-5 rounded-[24px] bg-lynch-50 p-4 w-full"
                            >
                                <Image
                                    width={48}
                                    height={48}
                                    alt="Word"
                                    src={
                                        confirmationDetails.document.fileName.includes(
                                            'pdf'
                                        )
                                            ? '/word-icon.png'
                                            : '/pdf-icon.png'
                                    }
                                />
                                <Label
                                    label={
                                        confirmationDetails.document.fileName
                                    }
                                    className="text-lynch-500 text-base font-normal"
                                />
                            </span>
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
                            type="button"
                            onClick={onSubmit}
                            className="lg:w-fit w-full h-fit py-3 px-5"
                            IconRight={CheckCircle}
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
