import { FC } from 'react'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { CustomButton } from '@/components/custom/CustomButton'
import { Archive, X } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import {
    ArchivePartnerSchema,
    defaultArchivePartnerData,
} from '@/types/PartnerSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormMessage } from '@/components/ui/form'
import { SelectField } from '@/components/custom/SelectField'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/Label'
import { useNotification } from '@/context/NotifContext'
import archivePatner from '@/lib/api/partner/archiverPartner'
import { NotificationType } from '@/types/GlobalType'
import { useRouter } from 'next/navigation'

interface ArchivePartnerProps {
    partnerId?: string
}

export const ArchivePartner: FC<ArchivePartnerProps> = ({ partnerId }) => {
    const form = useForm<z.infer<typeof ArchivePartnerSchema>>({
        resolver: zodResolver(ArchivePartnerSchema),
        mode: 'onBlur',
        defaultValues: defaultArchivePartnerData,
    })
    const notif = useNotification()
    const router = useRouter()

    const onSubmit = async (data: z.infer<typeof ArchivePartnerSchema>) => {
        const archiveData = {
            reason: data.archiveType,
            details: data.archiveReason,
        }
        if (!partnerId) return
        const res = await archivePatner(partnerId, {
            ...archiveData,
            action: 'ARCHIVE',
        })
            .then((res) => {
                notif.notify(NotificationType.SUCCESS, 'Archive with Success')
                router.back()
            })
            .catch((err) => {
                notif.notify(NotificationType.ERROR, "Error d'archive")
            })
    }

    const { handleSubmit, control } = form

    const options = [{ key: 'OTHER', label: 'Autres' }]
    return (
        <div className="flex items-center justify-end bg-white p-5 rounded-[30px] lg:rounded-[14px]">
            <Dialog>
                <DialogTrigger className="flex items-center gap-3 px-5 py-3 rounded-[12px] h-fit bg-red-50 border-[1.5px] border-red-500 text-red-500  lg:w-fit w-full justify-center">
                    <span className="text-sm font-medium">Archiver</span>
                    <Archive />
                </DialogTrigger>
                <DialogContent
                    className="min-w-max h-fit rounded-[18px]"
                    showContent={false}
                >
                    <DialogHeader>
                        <DialogTitle className="text-lynch-400 text-[1.375rem] font-normal flex w-full justify-between items-center">
                            <h1 className="text-xl text-lynch-500">
                                Archiver le partenaire
                            </h1>
                            <DialogClose>
                                <X />
                            </DialogClose>
                        </DialogTitle>
                        <DialogDescription>
                            <Form {...form}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="flex flex-col gap-5 mt-8">
                                        <SelectField
                                            control={control}
                                            label="Type d’archive"
                                            name="archiveType"
                                            options={options}
                                        />
                                        <FormField
                                            name="archiveReason"
                                            control={control}
                                            render={({ field }) => (
                                                <div className="flex flex-col items-start gap-3 w-full text-lynch-400 ">
                                                    <Label
                                                        htmlFor="archiveReason"
                                                        label="Motif"
                                                        className="text-sm font-semibold text-lynch-950"
                                                    />
                                                    <Textarea
                                                        {...field}
                                                        name="archiveReason"
                                                        placeholder="Texte du motif"
                                                        className="outline-none  text-lynch-400 select-none focus:ring-0 focus:outline-none focus-within:ring-0 focus-within:outline-none min-h-fit w-full"
                                                        cols={30}
                                                        rows={10}
                                                    />
                                                    <FormMessage {...field} />
                                                </div>
                                            )}
                                        />
                                        <div className="flex justify-end items-center gap-2.5">
                                            <DialogClose>
                                                <CustomButton
                                                    label="Annuler"
                                                    IconRight={X}
                                                    variant="outline"
                                                    className="h-fit py-3"
                                                    type="button"
                                                />
                                            </DialogClose>
                                            <CustomButton
                                                label="Archiver"
                                                IconRight={Archive}
                                                type="submit"
                                                className="h-fit py-3"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </Form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
