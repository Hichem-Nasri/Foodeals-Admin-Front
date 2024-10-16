import { CustomButton } from '@/components/custom/CustomButton'
import React, { Fragment } from 'react'

const SwitchToggleDemandes = () => {
    const items = ['Demande DCL', 'Demande Marcket PRO', 'Demande Donate']
    const [selectedItem, setSelectedItem] = React.useState(items[0])
    return (
        <div className="w-full flex justify-start items-center p-2 bg-white">
            <div className="w-fit relative h-14">
                {items.map((item, index) => (
                    <Fragment key={index}>
                        <CustomButton
                            onClick={() => setSelectedItem(item)}
                            label={item}
                            className="text-lynch-400 bg-white border-lynch-400 border hover:bg-lynch-400/80 hover:text-white transition-all"
                        />
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
