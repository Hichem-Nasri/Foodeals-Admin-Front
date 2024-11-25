import React, { useEffect, useState } from 'react'
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
import {
    Archive,
    ArchiveRestore,
    ArchiveX,
    Calendar,
    Eclipse,
    Eye,
    X,
} from 'lucide-react'
import { Textarea } from '../ui/textarea'
import { Input } from '../custom/Input'
import { Label } from '../Label'
import {
    DetailsArchiveType,
    TotalValueProps,
    TotalValues,
} from '@/types/GlobalType'
import { useQuery } from '@tanstack/react-query'
import MobileHeader from './MobileHeader'
import PaginationData from './PaginationData'

const DetailsArchive = ({
    id,
    open,
    setOpen,
    type = 'organisation',
}: {
    id: string
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    type: 'prospect' | 'organisation' | 'sub-entites' | false
}) => {
    const [details, setDetails] = React.useState<DetailsArchiveType[]>([])
    const [selected, setSelected] = React.useState<DetailsArchiveType | null>(
        null
    )
    const [total, setTotal] = useState<TotalValueProps>(TotalValues)
    console.log('id', id)
    const { data, isLoading, error, refetch, isRefetching } = useQuery({
        queryKey: ['partners', id],
        queryFn: async () => {
            try {
                const data = await fetchDetailsArchived(
                    id,
                    type,
                    total.currentPage,
                    total.pageSize
                )
                console.log('data------------', data)
                if (data.status === 500 || data.data === null)
                    throw new Error('Error fetching partners')
                setDetails(data!.data)
                if (data.data.length > 0) setSelected(data.data[0])
                return data.data
            } catch (error) {
                console.log(error)
                return null
            }
        },
    })
    console.log('data', data)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                    <div className="flex flex-col">
                        <div className="flex gap-2 items-center justify-start px-4">
                            {data?.map((detail, index) => (
                                <button
                                    type="button"
                                    title={
                                        detail.action ? 'ARCHIVE' : 'RESTORE'
                                    }
                                    className={`${
                                        detail.action == 'ARCHIVE'
                                            ? 'text-coral-500'
                                            : 'text-primary'
                                    } p-2 rounded-full bg-white border-[1.5px] border-current hover:scale-105 transition-all `}
                                    onClick={() => {
                                        setSelected(detail)
                                    }}
                                    style={{
                                        opacity: selected === detail ? 1 : 0.5,
                                        scale: selected === detail ? 1.1 : 1,
                                        boxShadow:
                                            selected === detail
                                                ? '0 0 10px 0 rgba(0, 0, 0, 0.1)'
                                                : 'none',
                                    }}
                                >
                                    {detail.action == 'ARCHIVE' ? (
                                        <ArchiveX size={24} />
                                    ) : (
                                        <ArchiveRestore size={24} />
                                    )}
                                </button>
                            ))}
                        </div>
                        {selected && (
                            <DialogDescription className="flex flex-col gap-5 mt-8 p-4 lg:p-0">
                                <div className="flex justify-between flex-col items-start space-y-2">
                                    <Label
                                        htmlFor="archiveReason"
                                        label="Reason"
                                        className="text-sm font-semibold text-lynch-950"
                                    />
                                    <Input
                                        value={
                                            (selected && selected.reason) ?? ''
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
                                            (selected && selected.details) ?? ''
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
                                            selected!.deletedAt.split('T')[0] +
                                            ' ' +
                                            selected!.deletedAt
                                                .split('T')[1]
                                                .split('.')[0]
                                        }
                                        className="outline-none  text-lynch-400 select-none focus:ring-0 focus:outline-none focus-within:ring-0 focus-within:outline-none min-h-fit w-full [&>.icon]:text-primary"
                                        disabled
                                        name={'Date d’archive'}
                                        onChange={() => {}}
                                    />
                                </div>
                                <PaginationData
                                    currentPage={total.currentPage}
                                    setCurrentPage={(page) =>
                                        setTotal({
                                            ...total,
                                            currentPage: page,
                                        })
                                    }
                                    totalPages={total.totalPages}
                                    pageSize={total.pageSize}
                                    refetch={refetch}
                                    isLoading={isLoading || isRefetching}
                                />
                            </DialogDescription>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default DetailsArchive
