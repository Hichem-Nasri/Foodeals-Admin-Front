import React, { FC } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationNext,
} from '../ui/pagination'

interface PaginationDataProps {
    className?: string
    url?: string
    data?: any
    setData?: any
}

const PaginationData: FC<PaginationDataProps> = ({
    className,
    url,
    data,
    setData,
}) => {
    return (
        <Pagination className={className}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                        onClick={() => console.log('clicked')}
                        isActive
                        className="hover:bg-mountain-400"
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationData
