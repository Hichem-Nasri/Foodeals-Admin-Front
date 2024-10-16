import { cn } from '@/lib/utils'
import React, { FC, useState } from 'react'
interface SwitchToggleProps {
    setSwitchTable: (type: 'partenaires' | 'associations') => void
}

const SwitchToggle: FC<SwitchToggleProps> = ({ setSwitchTable }) => {
    const [selected, setSelected] = useState(true)
    const handleSwitch = (type: 'partenaires' | 'associations') => {
        if (type === 'partenaires') {
            setSelected(true)
            setSwitchTable('partenaires')
        }
        if (type === 'associations') {
            setSelected(false)
            setSwitchTable('associations')
        }
    }
    return (
        <div className="w-fit p-2  rounded-[14px] bg-white flex items-center justify-start">
            <div className="w-auto rounded-[14px] bg-white flex items-center justify-start gap-2 relative">
                <div
                    onClick={() => {
                        if (!selected) setSelected(true)
                    }}
                    className={cn(
                        `px-5 py-2 rounded-[4px] text-lynch-400 w-auto cursor-pointer`,
                        `${selected && ' text-white z-10'}`
                    )}
                >
                    Prospect des partenaires
                </div>
                <div
                    onClick={() => {
                        if (selected) setSelected(false)
                    }}
                    className={cn(
                        `px-5 py-2 rounded-[4px] text-lynch-400 w-auto cursor-pointer`,
                        `${!selected && ' text-white z-10'}`
                    )}
                >
                    Prospect des associations
                </div>
                <div
                    className={cn(
                        `absolute top-0 left-0 transition-all w-1/2 h-full bg-mountain-400 rounded-[4px] z-0 ${
                            selected ? '' : 'translate-x-full'
                        }`
                    )}
                ></div>
            </div>
        </div>
    )
}

export default SwitchToggle
