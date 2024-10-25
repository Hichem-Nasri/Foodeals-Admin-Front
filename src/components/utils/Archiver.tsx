import React, { FC } from 'react'

import {
    Dialog,
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
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField } from '@/components/ui/form'
import { SelectField } from '@/components/custom/SelectField'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/Label'
import { useNotification } from '@/context/NotifContext'
import archivePatner from '@/lib/api/partner/archiverPartner'
import { NotificationType } from '@/types/Global-Type'
import { cn } from '@/lib/utils'
import {
    ArchivePartnerSchema,
    defaultArchivePartnerData,
} from '@/types/PartnerSchema'
import { DialogClose } from '@radix-ui/react-dialog'

interface ArchiverProps {
    partnerId?: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
}

export const Archiver: FC<ArchiverProps> = ({ partnerId, open, setOpen }) => {
    const form = useForm<z.infer<typeof ArchivePartnerSchema>>({
        resolver: zodResolver(ArchivePartnerSchema),
        mode: 'onBlur',
        defaultValues: defaultArchivePartnerData,
    })
    const notif = useNotification()

    const onSubmit = async (data: z.infer<typeof ArchivePartnerSchema>) => {
        const archiveData = {
            reason: data.archiveType,
            details: data.archiveReason,
        }
        if (!partnerId) return
        const res = await archivePatner(partnerId, archiveData)
        if (res.status === 200) {
            notif.notify(
                NotificationType.SUCCESS,
                'Partenaire archivé avec succès'
            )
        }
    }

    const { handleSubmit, control } = form

    const options = [{ key: 'OTHER', label: 'Autres' }]
    return (
        <div className="flex items-center justify-end bg-white p-5">
            <Dialog open={open} onOpenChange={(open) => setOpen(!open)}>
                <DialogTrigger className="aria-hidden:hidden w-0 h-0 overflow-hidden"></DialogTrigger>
                <DialogContent showContent={false}>
                    <DialogHeader>
                        <DialogTitle className="text-lynch-400 text-[1.375rem] font-normal flex justify-between items-center">
                            Archiver le partenaire
                            <DialogClose onClick={() => setOpen(false)}>
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
                                                <div className="flex flex-col items-start gap-3 w-full text-lynch-400">
                                                    <Label
                                                        htmlFor="archiveReason"
                                                        label="Motif"
                                                        className="text-xs font-semibold text-lynch-950"
                                                    />
                                                    <Textarea
                                                        {...field}
                                                        name="archiveReason"
                                                        placeholder="Texte du motif"
                                                    />
                                                </div>
                                            )}
                                        />
                                        <div className="flex justify-end items-center gap-2.5">
                                            <CustomButton
                                                label="Annuler"
                                                IconRight={X}
                                                variant="outline"
                                                className="h-fit py-3"
                                                onClick={() => setOpen(false)}
                                            />
                                            <CustomButton
                                                label="Archiver"
                                                IconRight={Archive}
                                                type="submit"
                                                className="h-fit py-3"
                                                onClick={() => setOpen(false)}
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
