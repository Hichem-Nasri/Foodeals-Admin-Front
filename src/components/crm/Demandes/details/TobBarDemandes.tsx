'use client'
import { FC } from 'react'
import {
    ArrowLeft,
    ArrowRight,
    BellDot,
    Copy,
    FileBadge,
    Rocket,
    Save,
    SendIcon,
    Share,
} from 'lucide-react'
import { CustomButton } from '@/components/custom/CustomButton'
import { PartnerSolutionType, PartnerStatusType } from '@/types/partnersType'
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
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { useRouter } from 'next/navigation'

interface TopBarDemandesProps {
    solution: PartnerSolutionType
    label: string
    onSubmit: () => void
}

export const TopBarDemandes: FC<TopBarDemandesProps> = ({
    solution,
    label,
    onSubmit,
}) => {
    const router = useRouter()
    return (
        <div className="flex lg:relative fixed bottom-0 left-0 z-30 justify-between w-full rounded-[18px] lg:bg-white">
            <div className="lg:flex items-center hidden gap-3 p-[1.125rem]">
                <PartnerSolution solution={solution} />
            </div>
            <div className="lg:flex grid grid-cols-2 lg:relative fixed left-0 bottom-0 lg:w-fit w-full gap-3 lg:p-2 p-3 rounded-t-[24px] lg:bg-transparent bg-white">
                <CustomButton
                    onClick={() => {
                        router.back()
                    }}
                    className="text-lynch-400  rounded-[12px] border-[1.5px] border-lynch-400  bg-white hover:bg-transparent hover:text-black px-4 h-12 w-full lg:w-fit"
                    label={'Router'}
                    IconLeft={ArrowLeft}
                />
                <CustomButton
                    onClick={onSubmit}
                    className="px-4 h-12 rounded-[12px] lg:w-fit w-full"
                    label={label}
                    IconRight={BellDot}
                />
            </div>
        </div>
    )
}
