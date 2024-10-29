import { CalendarCheck2, HomeIcon, ListPlus, Mail, Phone } from 'lucide-react'
import React from 'react'

interface CrmDemandesCardProps {}

function CrmDemandesCard() {
    return (
        <div className="border border-lynch-300 flex flex-col justify-center items-start w-full rounded-xl min-h-36">
            <div className="flex justify-between items-center w-full">
                <div className="flex items-start flex-col justify-center font-normal text-lynch-700">
                    <h5>Responsable</h5>
                    <h6 className="text-mountain-400 font-semibold">Role</h6>
                </div>
                <div className="flex justify-center items-center space-x-2 w-full">
                    <CalendarCheck2 className="text-mountain-400" />
                    <p className="text-lynch-400 font-normal text-sm">Heure</p>
                    <p className="text-lynch-400 font-normal text-sm">Date</p>
                    <ListPlus className="text-lynch-400" />
                </div>
            </div>
            <div className="flex justify-center items-center space-x-2 flex-grow w-full text-white">
                <Phone className="size-10 p-2 rounded-full bg-amethyst-500" />
                <Mail className="size-10 p-2 rounded-full bg-mountain-400" />
                <HomeIcon className="size-10 p-2 rounded-full bg-lynch-400" />
            </div>
        </div>
    )
}

export default CrmDemandesCard
