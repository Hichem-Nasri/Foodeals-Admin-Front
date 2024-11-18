import React, { useEffect } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog'
import { fetchDetailsArchived } from '@/lib/api/partner/getDetailsArchived'
import { info } from 'console'
import { Calendar, Eclipse, Eye, X } from 'lucide-react'
import { Textarea } from '../ui/textarea'
import { Input } from '../custom/Input'
import { Label } from '../Label'
import { DetailsArchiveType } from '@/types/GlobalType'
import { useQuery } from '@tanstack/react-query'
import MobileHeader from './MobileHeader'

const DetailsArchive = ({ id }: { id: string }) => {
    const [details, setDetails] = React.useState<DetailsArchiveType>({
        reason: '',
        details: '',
        deletedAt: new Date(),
    })
    console.log('id', id)
    const { data, isLoading, error } = useQuery({
        queryKey: ['partners', id],
        queryFn: async () => {
            try {
                const data = await fetchDetailsArchived(id)
                console.log('data------------', data)
                if (data.status === 500 || data.data === null)
                    throw new Error('Error fetching partners')
                setDetails(data!.data)
                return data.data
            } catch (error) {
                console.log(error)
                return null
            }
        },
    })

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="lg:flex hidden justify-center items-center bg-lynch-300 text-white rounded-full p-2 w-fit mx-auto focus:outline-none [&>svg]:size-[1.125rem] my-auto">
                    <Eye size={20} />
                </button>
            </DialogTrigger>
            <DialogContent
                showContent={false}
                className="min-w-full h-screen lg:h-fit lg:min-w-fit flex flex-col gap-5 justify-start px-0 lg:px-4 py-0 lg:py-4"
            >
                <DialogTitle className="w-full hidden justify-between items-center text-lynch-400 lg:flex">
                    <span className=" text-xl font-medium">
                        Details of the archive
                    </span>
                    <DialogClose className="cursor-pointer">
                        <X size={28} />
                    </DialogClose>
                </DialogTitle>
                <MobileHeader
                    title="Details of the archive"
                    onClick={() => {}}
                    buttonType="dialog"
                />
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <DialogDescription className="flex flex-col gap-5 mt-8 p-4 lg:p-0">
                        <div className="flex justify-between flex-col items-start space-y-2">
                            <Label
                                htmlFor="archiveReason"
                                label="Reason"
                                className="text-sm font-semibold text-lynch-950"
                            />
                            <Input
                                value={
                                    (data && data.reason) ??
                                    details!.reason ??
                                    ''
                                }
                                className="outline-none  text-lynch-400 select-none focus:ring-0 focus:outline-none focus-within:ring-0 focus-within:outline-none min-h-fit w-full"
                                disabled
                                name={'Type d’archive'}
                                onChange={() => {}}
                            />
                        </div>
                        <div className="flex flex-col items-start gap-3 w-full text-lynch-400 ">
                            <Label
                                htmlFor="archiveReason"
                                label="Motif"
                                className="text-sm font-semibold text-lynch-950"
                            />
                            <Textarea
                                name="archiveReason"
                                placeholder="Texte du motif"
                                className="outline-none  text-lynch-400 select-none focus:ring-0 focus:outline-none focus-within:ring-0 focus-within:outline-none min-h-fit w-full disabled:text-lynch-400 disabled:select-text disabled:cursor-text disabled:opacity-100 text-md"
                                cols={30}
                                rows={10}
                                value={
                                    (data && data.details) ??
                                    details!.details ??
                                    ''
                                }
                                disabled
                            />
                        </div>
                        <div className="flex flex-col items-start gap-3 w-full text-lynch-400 ">
                            <Label
                                htmlFor=""
                                label="Deleted at"
                                className="text-sm font-semibold text-lynch-950"
                            />
                            <Input
                                IconLeft={Calendar}
                                value={
                                    details!.deletedAt.toDateString() +
                                    ' ' +
                                    details!.deletedAt.toLocaleTimeString()
                                }
                                className="outline-none  text-lynch-400 select-none focus:ring-0 focus:outline-none focus-within:ring-0 focus-within:outline-none min-h-fit w-full [&>.icon]:text-primary"
                                disabled
                                name={'Date d’archive'}
                                onChange={() => {}}
                            />
                        </div>
                    </DialogDescription>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default DetailsArchive
