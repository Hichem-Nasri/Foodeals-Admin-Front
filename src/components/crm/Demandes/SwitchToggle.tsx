'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import React, { Fragment } from 'react'

const SwitchToggleDemandes = () => {
    const items = ['Demande DCL', 'Demande Marcket PRO', 'Demande Donate']
    const [selectedItem, setSelectedItem] = React.useState(items[0])
    return (
        <div className="w-fit p-2  rounded-[14px] bg-white flex items-center justify-start">
            <div className="w-auto rounded-[14px] bg-white flex items-center justify-start relative">
                {items.map((item, index) => (
                    <Fragment key={index}>
                        <button
                            onClick={() => setSelectedItem(item)}
                            className={`px-5 py-2 rounded-[4px] text-lynch-400 w-auto cursor-pointer text-sm transition-all z-10 min-w-48 ${
                                item === selectedItem ? 'text-white' : ''
                            }`}
                        >
                            {item}
                        </button>
                    </Fragment>
                ))}
                <div
                    className="absolute top-0 left-0 transition-all w-1/3 h-full bg-mountain-400 rounded-[4px] z-0"
                    style={{
                        transform: `translateX(${
                            items.indexOf(selectedItem) * 100
                        }%)`,
                    }}
                ></div>
            </div>
        </div>
    )
}

export default SwitchToggleDemandes
