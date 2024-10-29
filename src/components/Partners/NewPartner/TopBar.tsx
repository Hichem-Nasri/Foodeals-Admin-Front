import { FC, Fragment, useState } from 'react'
import {
    Circle,
    CircleCheck,
    CircleCheckBig,
    ClipboardCheck,
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getContract } from '@/lib/api/partner/getContract'
import { useNotification } from '@/context/NotifContext'
import { NotificationType } from '@/types/GlobalType'

interface TopBarProps {
    primaryButtonDisabled?: boolean
    secondaryButtonDisabled?: boolean
    status?: PartnerStatusType
    onSaveData: (modify?: boolean) => void
    onSubmit: () => void
    id: string
    hideStatus?: boolean
}

const Whatsapp = () => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M19.7586 15.7904C19.7119 15.768 17.9622 14.9064 17.6513 14.7945C17.5244 14.7489 17.3884 14.7044 17.2438 14.7044C17.0075 14.7044 16.809 14.8222 16.6544 15.0535C16.4797 15.3132 15.9506 15.9317 15.7871 16.1165C15.7657 16.1409 15.7366 16.17 15.7191 16.17C15.7035 16.17 15.4327 16.0585 15.3507 16.0229C13.4738 15.2076 12.0492 13.247 11.8538 12.9164C11.8259 12.8688 11.8247 12.8472 11.8245 12.8472C11.8314 12.8221 11.8945 12.7588 11.9271 12.7262C12.0224 12.6319 12.1256 12.5076 12.2255 12.3874C12.2728 12.3304 12.3202 12.2734 12.3667 12.2196C12.5116 12.051 12.5761 11.9201 12.651 11.7684L12.6901 11.6896C12.8728 11.3268 12.7168 11.0205 12.6664 10.9216C12.625 10.8389 11.8862 9.05587 11.8077 8.86855C11.6188 8.41652 11.3692 8.20605 11.0224 8.20605C10.9902 8.20605 11.0224 8.20605 10.8874 8.21174C10.7231 8.21868 9.82815 8.3365 9.43246 8.58592C9.01285 8.85047 8.30298 9.69374 8.30298 11.1768C8.30298 12.5115 9.14999 13.7717 9.51365 14.251C9.52269 14.2631 9.53929 14.2876 9.56337 14.3229C10.9561 16.3568 12.6923 17.8641 14.4523 18.5672C16.1467 19.244 16.9491 19.3223 17.4052 19.3223H17.4053C17.597 19.3223 17.7504 19.3072 17.8858 19.2939L17.9716 19.2857C18.557 19.2338 19.8433 18.5673 20.1359 17.7542C20.3664 17.1137 20.4272 16.414 20.2738 16.16C20.1688 15.9874 19.9878 15.9005 19.7586 15.7904Z"
            fill="#64748b"
        />
        <path
            d="M14.213 2C7.71307 2 2.42497 7.24836 2.42497 13.6995C2.42497 15.786 2.98336 17.8284 4.04115 19.6159L2.0165 25.5883C1.97879 25.6996 2.00684 25.8227 2.0892 25.9066C2.14866 25.9673 2.22931 26 2.31167 26C2.34323 26 2.37502 25.9952 2.40603 25.9854L8.63357 24.0064C10.3377 24.917 12.2638 25.3976 14.2131 25.3976C20.7124 25.3977 26 20.1498 26 13.6995C26 7.24836 20.7124 2 14.213 2ZM14.213 22.9606C12.3788 22.9606 10.6023 22.4309 9.07515 21.4289C9.0238 21.3951 8.96419 21.3778 8.90419 21.3778C8.87247 21.3778 8.84068 21.3826 8.80975 21.3925L5.69014 22.3841L6.6972 19.413C6.72977 19.3169 6.71349 19.2108 6.65349 19.1288C5.49058 17.5398 4.87585 15.6625 4.87585 13.6995C4.87585 8.59221 9.06448 4.43709 14.2129 4.43709C19.3608 4.43709 23.5489 8.59221 23.5489 13.6995C23.549 18.8061 19.3609 22.9606 14.213 22.9606Z"
            fill="#64748b"
        />
    </svg>
)

export const TopBar: FC<TopBarProps> = ({
    status,
    onSaveData,
    primaryButtonDisabled,
    secondaryButtonDisabled,
    onSubmit,
    id,
    hideStatus = false,
}) => {
    const [isDownloading, setIsDownloading] = useState(false)
    const notif = useNotification()
    const handleOpenContract = async () => {
        try {
            const contractData = await getContract(id)
            const url = window.URL.createObjectURL(contractData)
            window.open(url, '_blank') // Opens the contract in a new tab
        } catch (error) {
            console.error('Error opening contract:', error)
        }
    }
    const handleCopyContractLink = async () => {
        try {
            const contractData = await getContract(id)
            const url = window.URL.createObjectURL(contractData)
            const fullLink = url // Use the generated URL
            await navigator.clipboard.writeText(fullLink)
            notif.notify(NotificationType.INFO, 'Lien du contrat copié')
        } catch (error) {
            console.error('Error copying contract link:', error)
        }
    }

    const listOfActions = [
        {
            icon: Copy,
            label: 'COPIER LE LIEN',
            action: handleCopyContractLink, // Updated to copy the contract link
        },
        {
            icon: Whatsapp,
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
            action: handleOpenContract, // New action to open the contract
        },
    ]
    const handleGenerateContract = async () => {
        try {
            console.log(id, 'contract')
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
            {!hideStatus && status && (
                <div className="lg:flex items-center hidden gap-3 p-[1.125rem]">
                    <PartnerStatus status={status} />
                </div>
            )}
            <div className="lg:flex grid grid-cols-2 lg:relative fixed left-0 bottom-0 lg:w-fit w-full gap-3 lg:p-2 p-3 rounded-t-[24px] lg:bg-transparent bg-white lg:ml-auto">
                {status !== PartnerStatusType.VALID ? (
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
                {status !== PartnerStatusType.VALID && !isDownloading ? (
                    <CustomButton
                        disabled={primaryButtonDisabled}
                        onClick={handleGenerateContract}
                        size="sm"
                        label="Générer le contrat"
                        className="disabled:bg-lynch-300"
                        IconRight={FileBadge}
                    />
                ) : status === PartnerStatusType.VALID ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex justify-center items-center gap-3 px-5 py-3 rounded-[12px] h-fit bg-primary text-sm font-normal text-neutral-50 hover:bg-primary/90 disabled:bg-lynch-300">
                            Partager le contrat
                            <Share2 />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="flex flex-col gap-2 p-3 rounded-[16px]">
                            <div className="flex flex-col gap-3">
                                {listOfActions.map((action, index) => (
                                    <DropdownMenuItem
                                        key={index}
                                        onClick={action.action}
                                        className="flex text-xs font-normal items-center gap-3 hover:bg-lynch-50 px-2 py-2 rounded-[6px] text-lynch-500 cursor-pointer hover:text-lynch-500"
                                    >
                                        <action.icon />
                                        <span>{action.label}</span>
                                    </DropdownMenuItem>
                                ))}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
