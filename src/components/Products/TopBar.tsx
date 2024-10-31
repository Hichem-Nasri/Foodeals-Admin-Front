import { ArrowLeft, SaveIcon, CheckCircle } from 'lucide-react'

import React, { FC } from 'react'
import { CustomButton } from '../custom/CustomButton'
import { useRouter } from 'next/navigation'

interface TopBarProps {
    onSubmit: any
}

const TopBar: FC<TopBarProps> = ({ onSubmit }) => {
    const router = useRouter()

    return (
        <div className="flex justify-between p-2 bg-white w-full rounded-[18px]">
            <CustomButton
                label="Retour"
                IconLeft={ArrowLeft}
                variant="outline"
                onClick={router.back}
                size="sm"
            />
            <div className="flex justify-center items-center space-x-2">
                <CustomButton
                    label="Enregistrer"
                    variant="outline"
                    size="sm"
                    IconRight={SaveIcon}
                    onClick={onSubmit}
                />
                <CustomButton
                    label="Confirmer"
                    size="sm"
                    IconRight={CheckCircle}
                    disabled
                />
            </div>
        </div>
    )
}

export default TopBar
