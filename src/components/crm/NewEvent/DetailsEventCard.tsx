import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CalendarMinus2, Eye, Mail, PhoneCall, TextQuote } from 'lucide-react'
import React, { FC } from 'react'
import { DetailsEvenetProspect } from './DetailsEvenet'
import { CrmType, EventType } from '@/types/CrmType'
import Link from 'next/link'
import { capitalize } from '@/types/utils'

interface DetailsEventCardProps {
    detailsData: EventType
    prospect: CrmType
}

const DetailsEventCard: FC<DetailsEventCardProps> = ({
    detailsData,
    prospect,
}) => {
    const { lead, object, dateAndTime } = detailsData
    const createdAtDate = new Date(dateAndTime)
    const date = createdAtDate.toLocaleDateString()
    const hour = createdAtDate.getHours()
    const minutes = createdAtDate.getMinutes()
    const hourString = `${hour}h:${minutes}`
    return (
        <div className="w-full  col-span-1 m-auto rounded-2xl border-lynch-100 flex flex-col border-2 justify-center items-center p-4 space-y-4">
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-col justify-start items-center space-y-2">
                    <div className="flex justify-center items-center h-12 w-full space-x-2">
                        <Avatar className="w-12 h-12">
                            <AvatarImage src={lead.avatarPath} />
                            <AvatarFallback>
                                {lead.name.lastName[0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col justify-center items-start">
                            <p className="text-lynch-950    text-xl w-full font-normal">
                                {capitalize(lead.name?.firstName) +
                                    ' ' +
                                    capitalize(lead.name?.lastName)}
                            </p>
                            <p className="text-md text-mountain-400">Manager</p>
                        </div>
                    </div>
                    <div className="flex justify-center flex-1 space-x-2 text-lynch-400 items-center text-md">
                        <CalendarMinus2 className="text-lynch-500" />
                        <p>
                            {date +
                                ' à ' +
                                hour.toString().padStart(2, '0') +
                                'h' +
                                minutes.toString().padStart(2, '0')}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row-reverse gap-x-4 justify-around items-center flex-wrap w-auto">
                    <DetailsEvenetProspect detailsData={detailsData}>
                        <div className="rounded-full bg-lynch-400 size-11 text-white grid place-items-center hover:border-2 hover:border-lynch-400 hover:bg-transparent hover:text-lynch-400 transition-all cursor-pointer ">
                            <Eye />
                        </div>
                    </DetailsEvenetProspect>
                    <Link
                        href={`mailto:${prospect?.contact.email}`}
                        className="rounded-full bg-amethyst-500 size-11 text-white grid place-items-center hover:border-2 hover:border-amethyst-500 hover:bg-transparent hover:text-amethyst-500 transition-all cursor-pointer "
                    >
                        <Mail />
                    </Link>
                    <Link
                        href={`tel:${prospect?.contact.phone}`}
                        className="rounded-full bg-mountain-400 size-11 text-white grid place-items-center hover:border-2 hover:border-mountain-400 hover:bg-transparent hover:text-mountain-400 transition-all cursor-pointer "
                    >
                        <PhoneCall />
                    </Link>
                </div>
            </div>
            <span className="h-[1px] w-full bg-lynch-100" />
            <div className=" rounded-full w-full bg-lynch-100 text-lynch-500  flex flex-col justify-center items-center relative h-auto px-4 pl-8  text-start m-auto py-2 font-semibold">
                <TextQuote className="size-5 absolute left-4 top-2 font-semibold" />
                <p className="px-4 h-full text-sm">
                    OBJECT: {object.toUpperCase()}
                </p>
            </div>
        </div>
    )
}

export default DetailsEventCard
