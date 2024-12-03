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
import { Archive, ArchiveRestore, X } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormMessage } from '@/components/ui/form'
import { SelectField } from '@/components/custom/SelectField'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/Label'
import { useNotification } from '@/context/NotifContext'
import { cn } from '@/lib/utils'
import {
    ArchivePartnerSchema,
    defaultArchivePartnerData,
} from '@/types/PartnerSchema'
import { DialogClose } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { capitalize } from '@/types/utils'

interface ArchiverProps {
    partnerId?: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
    handleArchiver: (data: z.infer<typeof ArchivePartnerSchema>) => void
    title: string
}

export const Archiver: FC<ArchiverProps> = ({
    partnerId,
    open,
    setOpen,
    title,
    handleArchiver,
}) => {
    const type = title.split(' ')[0].toLowerCase()
    const [isLoading, setIsLoading] = React.useState(false)
    const form = useForm<z.infer<typeof ArchivePartnerSchema>>({
        resolver: zodResolver(ArchivePartnerSchema),
        mode: 'onBlur',
        defaultValues: defaultArchivePartnerData,
    })
    const notif = useNotification()

    const queryClient = useQueryClient()

    const onSubmit = async (data: z.infer<typeof ArchivePartnerSchema>) => {
        console.log('archive partner')
        setIsLoading(true)
        handleArchiver(data)
        setIsLoading(false)
    }

    const { handleSubmit, control } = form

    const options = [{ key: 'OTHER', label: 'Autres' }]
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="hidden overflow-hidden"></DialogTrigger>
            <DialogContent
                className="min-w-max h-fit rounded-[12px]"
                showContent={false}
            >
                <DialogHeader className="flex flex-row justify-between items-center w-full ">
                    <DialogTitle className="text-lynch-400 text-[1.375rem] font-normal ">
                        {title}
                    </DialogTitle>
                    <DialogClose
                        className={cn('p-2 rounded-full text-lynch-400')}
                    >
                        <X />
                    </DialogClose>
                </DialogHeader>

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
                                    <CustomButton
                                        label="Annuler"
                                        IconRight={X}
                                        variant="outline"
                                        className="h-fit py-3 px-5 rounded-[12px] gap-1"
                                        type="button"
                                        onClick={() => setOpen(false)}
                                    />
                                    <CustomButton
                                        label={capitalize(type)}
                                        IconRight={
                                            type == 'archiver'
                                                ? Archive
                                                : ArchiveRestore
                                        }
                                        type="submit"
                                        className="h-fit py-3 px-5 rounded-[12px] gap-1"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </form>
                    </Form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
