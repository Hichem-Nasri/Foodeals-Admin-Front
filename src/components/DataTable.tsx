import { FC, Fragment } from 'react'
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

interface DataTableProps<T> {
    title: string
    table: import('@tanstack/table-core').Table<T>
    data: T[]
    transform: (data: T) => JSX.Element[] | JSX.Element
    hideColumns?: string[]
    partnerData?: {
        name: string
        avatar: string
        city: string
    }
    hidden?: boolean
}

export const DataTable: FC<DataTableProps<any>> = ({
    title,
    transform,
    table,
    data,
    hideColumns,
    partnerData = undefined,
    hidden,
}) => {
    const router = useRouter()
    return (
        <>
            <div className="lg:hidden grid gap-[0.625rem] border-0">
                {data.map((value, index) => (
                    <Fragment key={title + index}>{transform(value)}</Fragment>
                ))}
            </div>
            <div className="lg:grid hidden gap-[0.625rem]">
                {partnerData && (
                    <div className="flex items-center justify-between">
                        <h1
                            className={`${
                                hidden && 'hidden'
                            } font-normal text-[1.375rem] text-lynch-400 mt-[0.625rem]`}
                        >
                            {title}
                        </h1>
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={partnerData.avatar} />
                                <AvatarFallback>
                                    {partnerData.name}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1">
                                <Label
                                    label={partnerData.name}
                                    className="text-base font-normal"
                                />
                                <Label
                                    label={partnerData.city}
                                    className="text-primary text-xs font-semibold"
                                />
                            </div>
                            <CustomButton
                                className="h-fit py-4 text-lynch-500 ml-1"
                                label="Retour"
                                IconLeft={ArrowLeft}
                                variant="outline"
                                onClick={() => router.back()}
                            />
                        </div>
                    </div>
                )}
                {!partnerData && (
                    <h1 className="font-normal text-[1.375rem] text-lynch-400 mt-[0.625rem]">
                        {title}
                    </h1>
                )}
                <div className="w-full overflow-auto rounded-[14px]">
                    <Table className="rounded-[14px] bg-white py-2">
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) =>
                                        hideColumns?.includes(header.id) ? (
                                            <></>
                                        ) : (
                                            <TableHead
                                                key={header.id}
                                                onClick={header.column.getToggleSortingHandler()}
                                                className={cn(
                                                    'cursor-pointer min-w-40',
                                                    header.column.id ===
                                                        'createdAt' ||
                                                        header.column.id ===
                                                            'date'
                                                        ? 'min-w-48'
                                                        : header.column.id ===
                                                          'logo'
                                                        ? 'min-w-28'
                                                        : header.id === 'id'
                                                        ? 'sticky right-0 shadow-md bg-white min-w-0 rounded-tl-[18px] w-fit'
                                                        : '',
                                                    header.column.id ===
                                                        'email' ||
                                                        header.column.id ===
                                                            'phone'
                                                        ? 'min-w-60'
                                                        : ''
                                                )}
                                            >
                                                <div className="flex justify-between items-center w-full">
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                              header.column
                                                                  .columnDef
                                                                  .header,
                                                              header.getContext()
                                                          )}
                                                    {(header.id !== 'id' &&
                                                        {
                                                            asc: <ChevronUp />,
                                                            desc: (
                                                                <ChevronDown />
                                                            ),
                                                        }[
                                                            header.column.getIsSorted() as string
                                                        ]) ?? (
                                                        <ChevronsUpDown />
                                                    )}
                                                </div>
                                            </TableHead>
                                        )
                                    )}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) =>
                                        hideColumns?.includes(
                                            cell.column.id
                                        ) ? (
                                            <></>
                                        ) : (
                                            <TableCell
                                                key={cell.id}
                                                className={cn(
                                                    'w-fit',
                                                    cell.column.id === 'id'
                                                        ? 'sticky right-0 shadow-md bg-white min-w-none'
                                                        : ''
                                                )}
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
                    </Table>
                </div>
            </div>
        </>
    )
}
