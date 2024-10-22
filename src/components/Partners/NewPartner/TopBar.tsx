import { FC, Fragment, useState } from 'react'
import {
    Circle,
    CircleCheck,
    CircleCheckBig,
    Copy,
    FileBadge,
    FileChartLine,
    FilePenLine,
    PencilLine,
    Save,
    SendIcon,
    Share,
    Share2,
} from 'lucide-react'
import { CustomButton } from '@/components/custom/CustomButton'
import { PartnerStatus } from '../PartnerStatus'
import { PartnerStatusType } from '@/types/partners'
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { getContract } from '@/lib/api/partner/getContract'

interface TopBarProps {
    primaryButtonDisabled?: boolean
    secondaryButtonDisabled?: boolean
    status?: PartnerStatusType
    onSaveData: (modify?: boolean) => void
    onSubmit: () => void
    id: string
}

export const TopBar: FC<TopBarProps> = ({
    status,
    onSaveData,
    primaryButtonDisabled,
    secondaryButtonDisabled,
    onSubmit,
    id,
}) => {
    const [isDownloading, setIsDownloading] = useState(false)
    console.log('status', status)
    const listOfActions = [
        {
            icon: Copy,
            label: 'COPIER LE LIEN',
            action: () => {
                navigator.clipboard.writeText(window.location.href)
            },
        },
        {
            icon: Share,
            label: 'PARTAGER PAR WHATSAPP',
            action: () => {
                window.open(`https://wa.me/?text=${window.location.href}`)
            },
        },
        {
            icon: SendIcon,
            label: 'ENVOYER PAR EMAIL',
            action: () => {
                window.open(`mailto:?body=${window.location.href}`)
            },
        },
        {
            icon: FileBadge,
            label: 'VOIR LE CONTRAT',
            action: () => {
                // TODO: Add the link to the contract
            },
        },
    ]
    const handleGenerateContract = async () => {
        try {
            const contractData = await getContract(id)
            const url = window.URL.createObjectURL(contractData)

            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `contract_${id}.pdf`)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
            setIsDownloading(true)
        } catch (error) {
            console.error('Error generating contract:', error)
        }
    }

    return (
        <div className="flex lg:relative fixed bottom-0 left-0 z-30 justify-between w-full rounded-[18px] lg:bg-white">
            {status && (
                <div className="lg:flex items-center hidden gap-3 p-[1.125rem]">
                    <PartnerStatus status={status} />
                </div>
            )}
            <div className="lg:flex grid grid-cols-2 lg:relative fixed left-0 bottom-0 lg:w-fit w-full gap-3 lg:p-2 p-3 rounded-t-[24px] lg:bg-transparent bg-white lg:ml-auto">
                {status !== PartnerStatusType.VALIDATED ? (
                    <CustomButton
                        onClick={onSaveData}
                        disabled={secondaryButtonDisabled}
                        size="sm"
                        type="submit"
                        className="bg-white text-primary border-[1.5px] border-primary hover:text-white hover:bg-primary/60"
                        label="Enregistrer"
                        IconRight={Save}
                        variant="outline"
                    />
                ) : (
                    <CustomButton
                        onClick={() => {
                            setIsDownloading(false)
                            onSaveData(true)
                        }}
                        disabled={secondaryButtonDisabled}
                        size="sm"
                        type="submit"
                        className="bg-white text-lynch-400 border-[1.5px] border-lynch-400 hover:text-white hover:bg-lynch-400/60"
                        label="Modifier le partenaire"
                        IconRight={PencilLine}
                        variant="outline"
                    />
                )}
                {status !== PartnerStatusType.VALIDATED && !isDownloading ? (
                    <CustomButton
                        disabled={primaryButtonDisabled}
                        onClick={handleGenerateContract}
                        size="sm"
                        label="Générer le contrat"
                        className="disabled:bg-lynch-300"
                        IconRight={FileBadge}
                    />
                ) : status === PartnerStatusType.VALIDATED ? (
                    <Drawer>
                        <DrawerTrigger className="flex justify-center items-center gap-3 px-5 py-3 rounded-[12px] h-fit bg-primary text-sm font-normal text-neutral-50 hover:bg-primary/90 disabled:bg-lynch-300">
                            Partager le contrat
                            <Share2 />
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Partager</DrawerTitle>
                                <DrawerDescription>
                                    This action cannot be undone.
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                                <ul className="flex flex-col gap-3">
                                    {listOfActions.map((action, index) => (
                                        <li
                                            key={index}
                                            onClick={action.action}
                                            className="flex items-center gap-3 hover:bg-lynch-50 py-5 px-3 rounded-[6px] text-lynch-500 cursor-pointer"
                                        >
                                            <action.icon />
                                            <span>{action.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                ) : (
                    <CustomButton
                        disabled={primaryButtonDisabled}
                        onClick={onSubmit}
                        size="sm"
                        label="Valider le contrat"
                        IconRight={FileBadge}
                    />
                )}
            </div>
        </div>
    )
}
