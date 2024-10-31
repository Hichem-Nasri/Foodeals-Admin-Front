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
import { Payment } from '.'

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
                    <div className="flex lg:flex-row flex-col items-center gap-4">
                        <div className="flex flex-col items-start gap-3 w-full text-lynch-400">
                            <Label
                                label="Document de virement"
                                className="text-xs font-semibold text-lynch-950"
                            />
                            <span
                                key={confirmationDetails.documentPath}
                                className="flex items-center gap-5 rounded-[24px] bg-lynch-50 p-4 w-full"
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
                                document
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
