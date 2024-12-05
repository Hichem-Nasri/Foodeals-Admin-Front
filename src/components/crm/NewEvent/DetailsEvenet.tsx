import { AvatarAndName } from '@/components/AvatarAndName'
import CustomLabel from '@/components/custom/CustomLabel'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { CalendarClock, CalendarMinus2Icon, ChevronLeft, X } from 'lucide-react'

const DetailsProspect = ({
    name,
    avatar,
    date,
    object,
    message,
}: {
    name: string
    avatar: string
    date: {
        date: string
        hour: string
    }
    object: string
    message: string
}) => {
    return (
        <div className="w-full space-y-6 h-auto mb-6">
            <div className="w-full flex lg:flex-row flex-col lg:justify-start lg:items-center justify-center items-start  h-auto space-y-6 lg:space-y-0">
                <div className="w-full lg:w-1/2  lg:basis-1/2 h-auto  space-x-6">
                    <div className="flex justify-between flex-col items-start space-y-1 text-base font-normal">
                        <div>Per</div>
                        <AvatarAndName
                            name={name}
                            avatar={avatar || ' '}
                            classNameAvatar="rounded-full bg-lynch-500 border-"
                            className="w-full rounded-[12px] bg-lynch-50 h-14 px-2"
                        />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:w-1/2 w-full basis-full lg:basis-1/2 h-auto lg:space-x-6 ml-0 lg:ml-6 lg:space-y-0 space-y-6">
                    <CustomLabel
                        label="Date de création"
                        input={date.date}
                        IconLeft={CalendarMinus2Icon}
                        className="items-center"
                        // classNameParent="mx-2"
                    />
                    <CustomLabel
                        label="Heure"
                        input={date.hour}
                        IconLeft={CalendarClock}
                        className="items-center"
                        // classNameParent="mx-2"
                    />
                </div>
            </div>
            <div className="w-full">
                <CustomLabel
                    label="Object"
                    input={object}
                    className="items-center"
                    classNameParent=""
                />
            </div>
            <div className="min-h-56">
                <CustomLabel
                    label="Message"
                    input={message}
                    classNameParent="min-h-56"
                    className="h-full"
                />
            </div>
        </div>
    )
}

import React, { useEffect } from 'react'
import { EventType } from '@/types/CrmType'
import { useMediaQuery } from 'react-responsive'
import { capitalize } from '@/types/utils'

const DetailsEvenetProspect = ({
    children,
    detailsData,
    className,
}: {
    detailsData: EventType
    children: React.ReactNode
    className?: string
}) => {
    const [open, setOpen] = React.useState(false)
    const { lead, object, message, dateAndTime } = detailsData

    const createdAtDate = new Date(dateAndTime)
    const date = createdAtDate.toLocaleDateString()
    const hour = createdAtDate.getHours()
    const minutes = createdAtDate.getMinutes()
    const hourString = `${hour.toString().padStart(2, '0')}h:${minutes
        .toString()
        .padStart(2, '0')}`

    const isMobile = useMediaQuery({ query: '(max-width:1024px)' })
    const styleDialog = isMobile
        ? 'h-screen min-w-full flex justify-center items-center p-0'
        : 'left-[100%] data-[state=open]:-translate-x-[calc(700px)] -translate-x-[calc(700px)] h-screen min-w-[700px]'
    return (
        <Dialog open={open} onOpenChange={(open: boolean) => setOpen(open)}>
            <DialogTrigger className={className} onClick={() => setOpen(true)}>
                {children}
            </DialogTrigger>

            <DialogContent className={`${styleDialog}`} showContent={false}>
                <div className="h-full overflow-y-auto flex justify-start items-center flex-col w-full m-auto space-y-6 relative">
                    <DialogTitle className=" w-full flex flex-col mt-2 lg:mt-0 justify-center items-center">
                        <div className="px-2 flex justify-between items-center text-base font-normal w-full text-lynch-400 lg:flex-row flex-row-reverse">
                            <span
                                className={`${
                                    isMobile && 'text-normal py-4 text-black'
                                }`}
                            >
                                Details du prospect
                            </span>
                            <DialogClose
                                onClick={() => setOpen(false)}
                                className="cursor-pointer text-lynch-400 hover:text-coral-500 transition-all hover:scale-105 delay-100 duration-150"
                            >
                                {isMobile ? <ChevronLeft /> : <X />}
                            </DialogClose>
                        </div>
                        {isMobile && (
                            <span className="bg-mountain-500 w-full h-[2px]" />
                        )}
                    </DialogTitle>
                    <DialogDescription className="flex flex-col space-x-4 w-full p-4">
                        <DetailsProspect
                            name={
                                capitalize(lead.name?.firstName) +
                                ' ' +
                                capitalize(lead.name?.lastName)
                            }
                            avatar={lead.avatarPath!}
                            date={{
                                date: date,
                                hour: hourString,
                            }}
                            object={object}
                            message={message}
                        />
                    </DialogDescription>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export { DetailsProspect, DetailsEvenetProspect }
