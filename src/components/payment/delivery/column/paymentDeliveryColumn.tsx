import { AvatarAndName } from '@/components/AvatarAndName'
import { ActionsMenu } from '@/components/custom/ActionsMenu'
import { CustomButton } from '@/components/custom/CustomButton'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { PartnerSolution } from '@/components/Partners/PartnerSolution'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import { AppRoutes } from '@/lib/routes'
import { DeliveryType } from '@/types/deliveries'
import { PartnerSolutionType } from '@/types/partnersType'
import { capitalize } from '@/types/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { createColumnHelper } from '@tanstack/react-table'
import { Eye, Pen, Archive, Users, FileBadge } from 'lucide-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

const columnDeliveriesTableHelper = createColumnHelper<DeliveryType>()

export const columnPaymentDeliveries = (router: AppRouterInstance) => [
    columnDeliveriesTableHelper.accessor('createdAt', {
        cell: (info) => info.getValue(),
        header: 'Date',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('partnerInfoDto', {
        cell: (info) => (
            <AvatarAndName
                avatar={info.getValue().avatarPath}
                name={info.getValue().name}
            />
        ),
        header: 'Partenaire',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('responsibleInfoDto', {
        cell: (info) => {
            const fullName =
                capitalize(info.getValue().name.firstName) +
                ' ' +
                capitalize(info.getValue().name.lastName)
            return (
                <AvatarAndName
                    avatar={info.getValue().avatarPath}
                    name={fullName}
                />
            )
        },
        header: 'Résponsable',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('numberOfDeliveries', {
        cell: (info) => info.getValue(),
        header: 'Nb livraisons',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('numberOfDeliveryPeople', {
        cell: (info) => info.getValue(),
        header: 'Commandes',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('distribution', {
        cell: (info) => {
            console.log('info', info.getValue())
            return info.getValue() == 'MULTI_CITY' ? 'Multi-ville' : 'Partout'
        },
        header: 'Ville',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('responsibleInfoDto.phone', {
        cell: (info) => <PhoneBadge phone={info.getValue()} />,
        header: 'Téléphone',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('responsibleInfoDto.email', {
        cell: (info) => <EmailBadge email={info.getValue()} />,
        header: 'Email',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('solutions', {
        cell: (info) => (
            <div className="flex items-center gap-1">
                {info.getValue().map((solution) => (
                    <PartnerSolution
                        solution={solution as PartnerSolutionType}
                        key={solution}
                    />
                ))}
            </div>
        ),
        header: 'Solutions',
        footer: (info) => info.column.id,
    }),
    columnDeliveriesTableHelper.accessor('id', {
        cell: (info) => (
            <CustomButton
                label=""
                variant="secondary"
                size={'sm'}
                onClick={() =>
                    router.push(
                        AppRoutes.businessPartnerDetails.replace(
                            ':id',
                            info.getValue()
                        )
                    )
                }
                IconLeft={Eye}
                className="[&>.icon]:mr-0 text-white border-0 rounded-full hover:bg-lynch-500 transition-colors bg-lynch-300 justify-center p-2"
            />
        ),
        header: 'Activité',
        footer: (info) => info.column.id,
    }),
]
