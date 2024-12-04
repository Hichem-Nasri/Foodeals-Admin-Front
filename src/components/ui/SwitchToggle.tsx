import { cn } from '@/lib/utils'
import React, { FC } from 'react'

interface SwitchToggleProps<T extends string> {
    selectedType: T
    setSwitchTable: (type: T) => void
    options: T[]
}

const SwitchToggle = <T extends string>({
    selectedType,
    setSwitchTable,
    options,
}: SwitchToggleProps<T>) => {
    const handleSwitch = (type: T) => {
        setSwitchTable(type)
    }

    return (
        <div className="w-full lg:w-fit p-2 rounded-[14px] bg-white flex items-center justify-center text-xs lg:text-[14px] lg:justify-start">
            <div className="w-full rounded-[14px] bg-white flex items-center  justify-center lg:justify-start gap-2 relative">
                {options.map((option) => (
                    <div
                        key={option}
                        onClick={() => handleSwitch(option)}
                        className={cn(
                            `px-5 py-2 rounded-[4px] text-lynch-400 lg:w-auto cursor-pointer w-full flex justify-center items-center`,
                            `${
                                selectedType === option
                                    ? ' text-white z-10'
                                    : ''
                            }`
                        )}
                    >
                        {option}
                    </div>
                ))}
                <div
                    className={cn(
                        `absolute top-0 left-0 transition-all w-1/2 h-full bg-mountain-400 rounded-[4px] z-0`,
                        `${
                            selectedType === options[1]
                                ? 'translate-x-full'
                                : ''
                        }` // Assumes the second option is the one that needs to be translated
                    )}
                />
            </div>
        </div>
    )
}

export default SwitchToggle
