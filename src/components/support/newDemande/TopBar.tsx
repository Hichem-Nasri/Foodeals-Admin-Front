import { CustomButton } from '@/components/custom/CustomButton'
import { PartnerStatus } from '@/components/Partners/PartnerStatus'
import { PartnerStatusType } from '@/types/partnersType'
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
        <>
            <div className="flex  justify-center space-x-4 lg:space-x-0 lg:justify-between w-full rounded-[18px] lg:bg-white p-2 items-center">
                <div className="hidden lg:flex">
                    <PartnerStatus status={status} />
                </div>
                <div className="gap-4 flex justify-center w-full lg:w-fit">
                    <CustomButton
                        disabled={disableFirst}
                        label="Enregistrer"
                        variant="outline"
                        className="text-lynch-400 border-lynch-400 border w-full lg:w-fit"
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
                        className="w-full lg:w-fit"
                    />
                </div>
            </div>
        </>
    )
}

export default TopBar
