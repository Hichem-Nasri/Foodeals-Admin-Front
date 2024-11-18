import { FC } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton' // Ensure you have a Skeleton component

interface DataTableSkeletonProps {
    columnCount: number
    rowCount: number
}

export const DataTableSkeleton: FC<DataTableSkeletonProps> = ({
    columnCount,
    rowCount,
}) => {
    return (
        <div className="w-full overflow-auto rounded-[14px] lg:flex hidden flex-col justify-start items-start gap-[1.2rem]">
            <Skeleton className="h-12 w-full rounded-lg lg:w-60 bg-white flex justify-start items-center px-2">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-56 rounded" />
                </div>
            </Skeleton>
            <Table className="rounded-[14px] bg-white py-2">
                <TableHeader>
                    <TableRow>
                        {Array.from({ length: columnCount }).map((_, index) => (
                            <TableHead
                                key={index}
                                className={
                                    index === 0 ? 'min-w-48' : 'min-w-40'
                                }
                            >
                                <Skeleton
                                    className={`h-6 w-full rounded ${
                                        index === 0 ? 'lg:w-48' : 'lg:w-40'
                                    }`}
                                />
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: rowCount }).map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {Array.from({ length: columnCount }).map(
                                (_, cellIndex) => (
                                    <TableCell
                                        key={cellIndex}
                                        className={
                                            cellIndex === 0
                                                ? 'min-w-48'
                                                : 'min-w-40'
                                        }
                                    >
                                        <Skeleton
                                            className={`h-4 w-full rounded-full ${
                                                cellIndex === 0
                                                    ? 'lg:w-48'
                                                    : 'lg:w-40'
                                            }`}
                                        />
                                    </TableCell>
                                )
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
