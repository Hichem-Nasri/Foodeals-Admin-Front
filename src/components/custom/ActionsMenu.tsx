'use client'
import { FC, ForwardRefExoticComponent, RefAttributes, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ListPlus, LucideProps } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Archiver } from '../utils/Archiver'
import { archiveProspect } from '@/lib/api/crm/prospect/archiveProspects'
import { NotificationType } from '@/types/GlobalType'
import { useQueryClient } from '@tanstack/react-query'
import { useNotification } from '@/context/NotifContext'
import ArchiveConfimation from '../crm/Prospect/ArchiveConfimation'
import { ArchivePartnerSchema } from '@/types/PartnerSchema'
import { z } from 'zod'
import DetailsArchive from '../utils/DetailsArchive'

export type ActionType = {
    label: string
    actions: (
        id: string,
        data?: z.infer<typeof ArchivePartnerSchema>,
        handleDone?: (type: boolean, message: string, query: any[]) => void
    ) => void
    icon: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
    shouldNotDisplay?: boolean
}

interface ActionsMenuProps {
    id: string
    menuList: ActionType[]
    className?: string
    prospect?: 'prospect' | 'organisation' | 'sub-entites' | 'users' | false
}

export const ActionsMenu: FC<ActionsMenuProps> = ({
    id,
    menuList,
    className,
    prospect = false,
}) => {
    const [open, setOpen] = useState(false)
    const [leadKo, setLeadKo] = useState(false)
    const [desarchive, setDesarchive] = useState(false)
    const [info, setInfo] = useState(false)
    const [closeDrawer, setCloseDrawer] = useState(false)
    const Notif = useNotification()
    const queryClient = useQueryClient()

    const handleArchiver = async (
        data: z.infer<typeof ArchivePartnerSchema>
    ) => {
        console.log('process archive')
        const handleDone = async (
            type: boolean,
            message: string,
            query: any[]
        ) => {
            if (type) {
                Notif.notify(NotificationType.SUCCESS, message)
                setOpen(false)
                queryClient.invalidateQueries({
                    queryKey: query,
                })
                setLeadKo(false)
            } else {
                Notif.notify(NotificationType.ERROR, message)
            }
        }
        const type = leadKo ? 'Lead Ko' : open ? 'Archiver' : 'Désarchiver'
        const archiveAction = menuList.find((item) => item.label === type)
        if (!archiveAction) return
        archiveAction.actions(id, data, handleDone)
        console.log('archiveAction', archiveAction)
    }
    return (
        <>
            <Drawer open={closeDrawer} onOpenChange={setCloseDrawer}>
                <DrawerTrigger
                    className={cn(
                        'flex lg:hidden justify-center items-center bg-lynch-300 text-white rounded-full p-2 w-fit mx-auto focus:outline-none [&>svg]:size-[1.125rem]',
                        className
                    )}
                >
                    <ListPlus />
                </DrawerTrigger>
                <DrawerContent className="flex flex-col gap-2 p-3 rounded-t-[16px] lg:hidden">
                    <h1 className="font-semibold">Choisissiez une action</h1>
                    {menuList
                        .filter((item) =>
                            item.shouldNotDisplay ? false : true
                        )
                        .map((item) => {
                            return (
                                <button
                                    key={item.label}
                                    onClick={() => {
                                        if (
                                            item.label === 'Archiver' ||
                                            item.label === 'Lead Ko' ||
                                            item.label === 'Désarchiver'
                                        ) {
                                            item.label == 'Archiver'
                                                ? setOpen(true)
                                                : item.label == 'Lead Ko'
                                                ? setLeadKo(true)
                                                : setDesarchive(true)
                                            setCloseDrawer(false)
                                        } else if (item.label === 'Info') {
                                            console.log('info')
                                            setInfo(true)
                                            setCloseDrawer(false)
                                        } else item.actions(id)
                                    }}
                                    className={cn(
                                        'flex items-center gap-3 px-3 hover:bg-lynch-50 rounded-[6px] text-lynch- cursor-pointer py-5 text-lynch-500',
                                        `${
                                            ['archiver', 'leadko'].includes(
                                                item.label.toLowerCase()
                                            ) && 'text-coral-500'
                                        }`
                                    )}
                                >
                                    <item.icon size={20} />
                                    {item.label.toUpperCase()}
                                </button>
                            )
                        })}
                </DrawerContent>
            </Drawer>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className={cn(
                        'lg:flex hidden justify-center items-center bg-lynch-300 text-white rounded-full p-2 w-fit mx-auto focus:outline-none [&>svg]:size-[1.125rem] my-auto',
                        className
                    )}
                >
                    <ListPlus />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="lg:flex hidden flex-col gap-2 p-3 rounded-[16px]">
                    {menuList
                        .filter((item) =>
                            item.shouldNotDisplay ? false : true
                        )
                        .map((item) => {
                            return (
                                <DropdownMenuItem
                                    key={item.label}
                                    onClick={() => {
                                        if (
                                            item.label === 'Archiver' ||
                                            item.label === 'Lead Ko' ||
                                            item.label === 'Désarchiver'
                                        ) {
                                            item.label == 'Archiver'
                                                ? setOpen(true)
                                                : item.label == 'Lead Ko'
                                                ? setLeadKo(true)
                                                : setDesarchive(true)
                                            setCloseDrawer(false)
                                        } else if (item.label === 'Info') {
                                            setInfo(true)
                                            setCloseDrawer(false)
                                        } else item.actions(id)
                                    }}
                                    className="flex items-center
					gap-3 px-3 py-2 hover:bg-lynch-50 rounded-[6px] text-lynch-500 cursor-pointer"
                                >
                                    <item.icon size={20} />
                                    {item.label}
                                </DropdownMenuItem>
                            )
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
            <Archiver
                partnerId={id}
                open={open || leadKo || desarchive}
                setOpen={open ? setOpen : leadKo ? setLeadKo : setDesarchive}
                handleArchiver={handleArchiver}
                title={
                    leadKo
                        ? 'Archiver le Prospect'
                        : desarchive
                        ? 'Désarchiver'
                        : 'Archiver'
                }
            />
            {prospect && (
                <DetailsArchive
                    id={id}
                    open={info}
                    setOpen={setInfo}
                    type={prospect}
                />
            )}
        </>
    )
}
