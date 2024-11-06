'use client'
import {
    FC,
    ForwardRefExoticComponent,
    RefAttributes,
    useEffect,
    useState,
} from 'react'

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
    PaymentMethod,
} from '@/types/PaymentType'
import { DatePicker } from '../DatePicker'
import { Label } from '../Label'
import { CheckCheck, CheckCircle, LucideProps, X } from 'lucide-react'
import { AvatarProfile } from '../AvatarProfile'
import { cn, PartnerOptions } from '@/lib/utils'
import { Select } from '../custom/Select'
import { Input } from '../custom/Input'
import { getConfirmationInfo } from '@/lib/api/fetchConfirmationInfo'
import Image from 'next/image'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ConfirmCommission } from '@/lib/api/payment/ConfirmCommission'
import { useNotification } from '@/context/NotifContext'
import { NotificationType } from '@/types/GlobalType'
import MobileHeader from '../utils/MobileHeader'

interface ConfirmPaymentProps {
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

export const ConfirmPayment: FC<ConfirmPaymentProps> = ({
    disabled,
    id,
    label,
    isMobile = false,
    IconLeft,
    IconRight,
    className,
}) => {
    const [confirmationDetails, setConfirmationDetails] =
        useState<ConfirmPaymentType>(defaultValuesConfirmPayment)
    const [fetched, setFetched] = useState(false)

    const Notif = useNotification()
    const { mutate } = useMutation({
        mutationKey: ['paymentConfirmation', id],
        mutationFn: async () => {
            const res = await ConfirmCommission(id)
            if (res.status === 200) {
                Notif.notify(
                    NotificationType.SUCCESS,
                    'Confirmation de paiement effectuée'
                )
                return res.data
            }
            Notif.notify(
                NotificationType.ERROR,
                'Erreur lors de la confirmation de paiement'
            )
        },
    })
    const onSubmit = () => {
        mutate()
    }
    useEffect(() => {
        const fetchConfirmation = async () => {
            console.log('fetchConfirmation')
            const data = await getConfirmationInfo(id)
            if (data) setConfirmationDetails(data)
        }
        if (!fetched) fetchConfirmation()
        setFetched(true)
    }, [])

    // INFO: the PartnerOptions is an array of stores as objects with the following structure: { id: string, name: string, avatar: string }
    const adaptOptions = PartnerOptions.map((option) => ({
        key: option.id,
        label: option.name,
    }))
    const fullName = `${confirmationDetails?.emitter.firstName} ${confirmationDetails?.emitter.lastName}`
    const openDocument = () => {
        window.open(confirmationDetails.documentPath!, '_blank')
    }

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
                        IconRight={IconRight}
                        IconLeft={IconLeft}
                    />
                ) : (
                    <CustomButton
                        label={label}
                        variant="outline"
                        className={cn(
                            'flex lg:hidden h-fit py-3 px-7 rounded-[18px] text-primary border-primary ml-1',
                            className
                        )}
                        disabled={disabled}
                        IconRight={IconRight ? IconRight : CheckCheck}
                    />
                )}
            </DialogTrigger>
            <DialogContent className="[&>.Icon]:hidden lg:p-5 lg:rounded-[14px] max-w-[42.5rem] w-full gap-[1.875rem] p-0 top-0 translate-y-0 left-[50%] lg:top-[50%] lg:translate-y-[-50%]  overflow-auto max-h-screen rounded-none">
                <DialogTitle className="text-[1.375rem] font-normal text-lynch-400 lg:flex hidden">
                    Commission a recevoir
                </DialogTitle>
                <MobileHeader
                    title="Commission a recevoir"
                    onClick={() => {}}
                    buttonType="dialog"
                />
                <div className="flex flex-col gap-3 overflow-y-auto max-h-[100vh] h-full lg:p-0 px-5 py-2 ">
                    <div className="flex lg:flex-row flex-col items-center gap-4">
                        <Select
                            disabled
                            onChange={() => {}}
                            options={adaptOptions}
                            label="Type"
                            value={confirmationDetails?.partner.id}
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
                                label={
                                    'Date de ' +
                                    ([
                                        PaymentMethod.CARD_BANK,
                                        PaymentMethod.TRANSFER,
                                    ].includes(confirmationDetails.type)
                                        ? 'paiement'
                                        : 'récupération')
                                }
                                className="text-xs font-semibold text-lynch-950"
                            />
                            <DatePicker
                                disabled
                                onChange={() => {}}
                                value={new Date(confirmationDetails.date)}
                            />
                        </div>
                    </div>
                    <div className="flex lg:flex-row flex-col items-center gap-4">
                        <Select
                            disabled
                            onChange={() => {}}
                            options={[
                                {
                                    key: fullName,
                                    label: fullName,
                                },
                            ]}
                            label="Nom émetteur"
                            value={fullName}
                        />
                        <Input
                            disabled
                            name="amount"
                            onChange={() => {}}
                            value={confirmationDetails.price.amount}
                            label="Amount"
                        />
                    </div>
                    <div className="flex lg:flex-row flex-col items-center gap-4 lg:mb-0 mb-[140px]">
                        <div className="flex flex-col items-start gap-3 w-full text-lynch-400">
                            <Label
                                label="Document de virement"
                                className="text-xs font-semibold text-lynch-950"
                            />
                            <button
                                type="button"
                                title="open document"
                                key={confirmationDetails.documentPath}
                                className="flex items-center gap-5 rounded-[24px] bg-lynch-50 p-4 w-full cursor-pointer"
                                onClick={openDocument}
                            >
                                <Image
                                    width={48}
                                    height={48}
                                    alt="Word"
                                    src={
                                        confirmationDetails.documentPath?.includes(
                                            'pdf'
                                        )
                                            ? '/pdf-icon.png'
                                            : '/word-icon.png'
                                    }
                                />
                                <Label
                                    label={confirmationDetails.documentPath!}
                                    className="text-lynch-500 text-base font-normal"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="flex absolute bottom-0 left-0 right-0 lg:relative items-center lg:justify-end gap-3 lg:mt-2 p-2 bg-white rounded-t-[12px] lg:bg-transparent">
                        <DialogClose asChild>
                            <CustomButton
                                type="button"
                                label="ANNULER"
                                variant="outline"
                                className="lg:w-fit w-full rounded-[12px] lg:order-[0] order-3 h-fit py-3 px-5 text-lynch-400"
                                IconRight={X}
                            />
                        </DialogClose>
                        <CustomButton
                            label="CONFIRMER"
                            type="button"
                            onClick={onSubmit}
                            className="lg:w-fit w-full rounded-[12px] h-fit py-3 px-5"
                            IconRight={CheckCircle}
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
