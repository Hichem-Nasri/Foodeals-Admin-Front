import { ActionType, ActionsMenu } from '@/components/custom/ActionsMenu'
import { AppRoutes } from '@/lib/routes'
import { PartnerEntitiesType } from '@/types/GlobalType'
import { PartnerType, PartnerSolutionType } from '@/types/partnersType'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { createColumnHelper } from '@tanstack/react-table'
import { Eye, Pencil, Users, FileBadge, Archive, Store } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { EmailBadge } from '../EmailBadge'
import { PartnerContractStatus } from '../PartnerContractStatus'
import { PartnerSolution } from '../PartnerSolution'
import { PhoneBadge } from '../PhoneBadge'
import { DialogClose } from '@radix-ui/react-dialog'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import api from '@/api/Auth'
import { ArchivePartner } from '../NewPartner/ArchivePartner'
import { Label } from '@/components/Label'
import { Input } from '@/components/custom/Input'
import { Textarea } from '@/components/ui/textarea'
import { getContract } from '@/lib/api/partner/getContract'
import { fetchDetailsArchived } from '@/lib/api/partner/getDetailsArchived'
import DetailsArchive from '@/components/utils/DetailsArchive'

const columnHelper = createColumnHelper<PartnerType>()

export const columnsPartnersTable = (
    router: AppRouterInstance,
    archive: boolean
) => [
    columnHelper.accessor('createdAt', {
        cell: (info) => info.getValue(),
        header: 'Date de création',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('logo', {
        cell: (info) => (
            <Avatar className="size-12 rounded-full bg-lynch-100">
                <AvatarImage src={info.getValue()} />
                <AvatarFallback>
                    {info.getValue() && info.getValue()[0].toUpperCase()}
                </AvatarFallback>
            </Avatar>
        ),
        header: 'Logo',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('partnerInfoDto.name', {
        cell: (info) => info.getValue(),
        header: 'Raison sociale',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('offers', {
        cell: (info) => info.getValue(),
        header: 'Raison sociale',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('users', {
        cell: (info) => info.getValue(),
        header: 'Collaborateurs',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('subEntities', {
        cell: (info) => info.getValue(),
        header: 'Sous compte',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('contractStatus', {
        cell: (info) => <PartnerContractStatus status={info.getValue()} />,
        header: 'Statut',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('contactDto.email', {
        cell: (info) => <EmailBadge email={info.getValue()} />,
        header: 'Email',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('contactDto.phone', {
        cell: (info) => <PhoneBadge phone={info.getValue()} />,
        header: 'Téléphone',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('city', {
        cell: (info) => info.getValue(),
        header: 'Ville',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('type', {
        cell: (info) =>
            info.getValue() === PartnerEntitiesType.PARTNER_SB
                ? 'Principal'
                : 'Normal',
        header: 'Type de compte',
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor('solutions', {
        cell: (info) => (
            <div className="flex items-center gap-1">
                {info.getValue().map((solutions) => (
                    <PartnerSolution solution={solutions} key={solutions} />
                ))}
            </div>
        ),
        header: 'Solution',
        footer: (info) => info.column.id,
        filterFn: (rows, id, filterValue) => {
            const solutions = rows.original.solutions.sort() //example: ['MARKET_PRO', 'DLC_PRO', 'DONATE_PRO']
            const mySolution = filterValue.sort() // example:  ['MARKET_PRO', 'DLC_PRO']
            return mySolution.every((solutions: PartnerSolutionType) =>
                solutions.includes(solutions)
            )
        },
    }),
    columnHelper.accessor('id', {
        cell: (info) => {
            const id = info.getValue()! as string
            if (archive) {
                return <DetailsArchive id={id} />
            }
            const commonActions: ActionType[] = [
                {
                    actions: () =>
                        router.push(
                            AppRoutes.newPartner.replace(
                                ':id',
                                info.getValue()!
                            )
                        ),
                    icon: Eye,
                    label: 'Voir',
                },
                {
                    actions: () =>
                        router.push(
                            AppRoutes.newPartner.replace(
                                ':id',
                                info.getValue()! + '?mode=edit'
                            )
                        ),
                    icon: Pencil,
                    label: 'Modifier',
                },
                {
                    label: 'Sous Compte',
                    actions: async () => {
                        router.push(
                            AppRoutes.subAccountPartner.replace(':id', id)
                        )
                    },
                    shouldNotDisplay: info.row.original.subEntities === 0,
                    icon: Store,
                },
                {
                    actions: (id) =>
                        router.push(
                            AppRoutes.CollaboratorSubEntities.replace(':id', id)
                        ),
                    icon: Users,
                    label: 'Collaborateurs',
                    shouldNotDisplay: info.row.original.users === 0,
                },
                {
                    actions: async () => {
                        try {
                            const contractData = await getContract(id!)
                            const url = window.URL.createObjectURL(
                                contractData as Blob
                            )
                            window.open(url, '_blank') // Opens the contract in a new tab
                        } catch (error) {
                            console.error('Error opening contract:', error)
                        }
                    },
                    icon: FileBadge,
                    label: 'Contrat',
                    shouldNotDisplay:
                        info.row.original.contractStatus !== 'VALIDATED',
                },
                {
                    actions: () => {
                        // const res = api.delete(`http://localhost:8080/api/v1/...`)
                        console.log('archive')
                    },
                    icon: Archive,
                    label: 'Archiver',
                },
            ]

            // Define principal actions

            return <ActionsMenu id={info.getValue()} menuList={commonActions} />
        },
        header: 'Activité',
    }),
]
