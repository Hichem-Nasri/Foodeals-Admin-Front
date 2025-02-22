import { FC } from 'react'
import { Copy, FileBadge, Rocket, Save, SendIcon, Share } from 'lucide-react'
import { CustomButton } from '@/components/custom/CustomButton'
import { PartnerStatusType } from '@/types/partnersType'
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { PartnerStatus } from '@/components/Partners/PartnerStatus'

interface TopBarProps {
    primaryButtonDisabled?: boolean
    secondaryButtonDisabled?: boolean
    status: PartnerStatusType
    onSaveData: () => void
    onSubmit: () => void
    open?: boolean
    isLoading?: boolean
}

export const TopBar: FC<TopBarProps> = ({
    status,
    onSaveData,
    primaryButtonDisabled,
    secondaryButtonDisabled,
    onSubmit,
    open,
    isLoading,
}) => {
    return (
        <div className="flex lg:relative fixed bottom-0 left-0 z-40 justify-between w-full rounded-[18px] lg:bg-white">
            <div className="lg:flex items-center hidden gap-3 p-[1.125rem]">
                <PartnerStatus status={status} />
            </div>
            <div className="lg:flex grid grid-cols-2 lg:relative fixed left-0 bottom-0 lg:w-fit w-full gap-3 lg:p-2 p-3 rounded-t-[24px] lg:bg-transparent bg-white ">
                {status !== PartnerStatusType.CANCELED ? (
                    <>
                        <CustomButton
                            onClick={onSaveData}
                            disabled={
                                secondaryButtonDisabled ||
                                status == PartnerStatusType.VALID ||
                                isLoading
                            }
                            size="sm"
                            label="Enregistrer"
                            IconRight={Save}
                            variant="outline"
                            isPending={isLoading}
                        />
                        {!open ? (
                            <CustomButton
                                disabled={
                                    primaryButtonDisabled ||
                                    status == PartnerStatusType.VALID ||
                                    isLoading
                                }
                                onClick={onSubmit}
                                size="sm"
                                label="Convertir"
                                IconRight={Rocket}
                            />
                        ) : (
                            <CustomButton
                                disabled={
                                    primaryButtonDisabled ||
                                    status == PartnerStatusType.VALID ||
                                    isLoading
                                }
                                onClick={() => {
                                    onSubmit()
                                    console.log('confirmer')
                                }}
                                size="sm"
                                label="Confirmer l’évènement"
                                IconRight={Rocket}
                            />
                        )}
                    </>
                ) : null}
            </div>
        </div>
    )
}
