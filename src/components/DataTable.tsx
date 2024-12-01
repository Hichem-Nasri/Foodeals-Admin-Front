import { FC, Fragment, useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { flexRender } from '@tanstack/react-table'
import { ArrowLeft, ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from './Label'
import { CustomButton } from './custom/CustomButton'
import { useRouter } from 'next/navigation'
import { DataTableSkeleton } from './TableSkeleton'
import CardSkeleton from './CardSkeleton'

interface DataTableProps<T> {
    title: string
    table: import('@tanstack/table-core').Table<T>
    data: T[]
    transform: (data: T) => JSX.Element[] | JSX.Element
    hideColumns?: string[]
    partnerData?: {
        name: string
        avatar: string | null
        city: string
    }
    hidden?: boolean
    isLoading?: boolean
    back?: boolean
    onBack?: () => void
}

export const DataTable: FC<DataTableProps<any>> = ({
    title,
    transform,
    table,
    data,
    hideColumns,
    partnerData,
    hidden,
    isLoading,
    back = true,
    onBack,
}) => {
    const router = useRouter()
    const skeletonElements = Array.from({ length: 3 }, (_, i) => i + 1)

    const handleBackClick = () => {
        if (onBack) {
            onBack()
        } else {
            router.back()
        }
    }

    const renderPartnerInfo = () => (
        <div className="flex justify-start items-center gap-2">
            <Avatar className="size-12 rounded-full bg-white text-lynch-400 ">
                <AvatarImage src={partnerData?.avatar!} />
                <AvatarFallback>{partnerData?.name.at(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
                <Label
                    label={partnerData?.name!}
                    className="text-base font-normal"
                />
                <Label
                    label={partnerData?.city!}
                    className="text-primary text-xs font-semibold"
                />
            </div>
        </div>
    )

    const renderTableHeader = () => (
        <TableHeader>
            {table.getHeaderGroups().map((headerGroup, index) => (
                <TableRow key={headerGroup.id + index}>
                    {headerGroup.headers.map(
                        (header) =>
                            !hideColumns?.includes(header.id) && (
                                <TableHead
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className={cn('cursor-pointer min-w-40', {
                                        'min-w-48':
                                            header.column.id === 'createdAt' ||
                                            header.column.id === 'date',
                                        'min-w-28': header.column.id === 'logo',
                                        'sticky right-0 shadow-md bg-white min-w-0 rounded-tl-[18px] w-fit':
                                            ['organizationId', 'id'].includes(
                                                header.id
                                            ),
                                        'min-w-60': ['email', 'phone'].includes(
                                            header.column.id
                                        ),
                                    })}
                                >
                                    <div className="flex justify-between items-center w-full">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                        {header.id !== 'organizationId' &&
                                        header.id !== 'id' ? (
                                            header.column.getIsSorted() ===
                                            'asc' ? (
                                                <ChevronUp />
                                            ) : header.column.getIsSorted() ===
                                              'desc' ? (
                                                <ChevronDown />
                                            ) : (
                                                <ChevronsUpDown />
                                            )
                                        ) : null}
                                    </div>
                                </TableHead>
                            )
                    )}
                </TableRow>
            ))}
        </TableHeader>
    )

    const renderTableBody = () => (
        <TableBody>
            {table.getRowModel().rows.map((row, index) => (
                <TableRow key={row.id + index}>
                    {row.getVisibleCells().map((cell) =>
                        hideColumns?.includes(cell.column.id) ? null : (
                            <TableCell
                                key={cell.id}
                                className={cn('w-fit', {
                                    'sticky right-0 shadow-md bg-white min-w-none':
                                        ['organizationId', 'id'].includes(
                                            cell.column.id
                                        ),
                                })}
                            >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </TableCell>
                        )
                    )}
                </TableRow>
            ))}
        </TableBody>
    )

    return (
        <>
            <div className="lg:hidden grid gap-[0.625rem] border-0 w-full">
                {isLoading ? (
                    skeletonElements.map((_, index) => (
                        <Fragment key={title + index}>
                            <CardSkeleton />
                        </Fragment>
                    ))
                ) : (
                    <div className="flex flex-col items-start space-y-3 w-full">
                        {partnerData && renderPartnerInfo()}
                        <div className="w-full rounded-lg space-y-3">
                            {data.map((value, index) => (
                                <Fragment key={title + index}>
                                    {transform(value)}
                                </Fragment>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {isLoading ? (
                <DataTableSkeleton columnCount={5} rowCount={5} />
            ) : (
                <div className="lg:grid hidden gap-[0.625rem]">
                    {partnerData && !hidden && (
                        <div className="flex items-center justify-between px-4">
                            <h1
                                className={`${
                                    hidden ? 'hidden' : ''
                                } font-normal text-[1.375rem] text-lynch-400 mt-[0.625rem]`}
                            >
                                {title}
                            </h1>
                            <div className="flex items-center gap-3">
                                {renderPartnerInfo()}
                                {back && (
                                    <CustomButton
                                        className="h-fit py-4 text-lynch-500 ml-1"
                                        label="Retour"
                                        IconLeft={ArrowLeft}
                                        variant="outline"
                                        onClick={handleBackClick}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                    {!partnerData && (
                        <div
                            className={`flex items-center w-full ${
                                !back ? 'justify-between' : 'justify-start'
                            }`}
                        >
                            <h1 className="font-normal text-[1.375rem] text-lynch-400 mt-[0.625rem]">
                                {title}
                            </h1>
                            {!back && (
                                <CustomButton
                                    className="h-fit py-4 text-lynch-500 ml-1"
                                    label="Retour"
                                    IconLeft={ArrowLeft}
                                    variant="outline"
                                    onClick={handleBackClick}
                                />
                            )}
                        </div>
                    )}
                    <div className="w-full overflow-auto rounded-[14px]">
                        <Table className="rounded-[14px] bg-white py-2">
                            {renderTableHeader()}
                            {renderTableBody()}
                        </Table>
                    </div>
                </div>
            )}
        </>
    )
}
