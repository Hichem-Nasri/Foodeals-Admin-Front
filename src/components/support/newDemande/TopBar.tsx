import { CustomButton } from '@/components/custom/CustomButton'
import { PartnerStatus } from '@/components/Partners/PartnerStatus'
import { PartnerStatusType } from '@/types/partners'
import { Save, Send } from 'lucide-react'
import React, { FC } from 'react'

interface TopBarProps {
    status: PartnerStatusType
    onSubmit: () => void
    onSaveData: () => void
    disableFirst: boolean
    disableSeond: boolean
}

const TopBar: FC<TopBarProps> = ({
    status,
    onSaveData,
    onSubmit,
    disableFirst,
    disableSeond,
}) => {
    return (
        <div className="flex lg:relative fixed bottom-0 left-0 z-30 justify-between w-full rounded-[18px] lg:bg-white p-2 items-center">
            <PartnerStatus status={status} />
            <div className="gap-4 flex justify-center">
                <CustomButton
                    disabled={disableFirst}
                    label="Enregistrer"
                    variant="outline"
                    className="text-lynch-400 border-lynch-400 border"
                    IconRight={Save}
                    size={'sm'}
                    onClick={onSaveData}
                />
                <CustomButton
                    disabled={disableSeond}
                    label="ENVOYER"
                    size={'sm'}
                    IconRight={Send}
                    onClick={onSubmit}
                />
            </div>
        </div>
    )
}

export default TopBar
