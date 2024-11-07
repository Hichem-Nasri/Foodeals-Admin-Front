'use client'
import React, { FC, useEffect } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationNext,
    PaginationEllipsis,
} from '../ui/pagination'
import { useQuery } from '@tanstack/react-query'
import api from '@/api/Auth'
import { cn } from '@/lib/utils'

interface PaginationDataProps {
    className?: string
    setCurrentPage: (page: number) => void
    currentPage: number
    totalPages: number
    pageSize: number
    refetch?: () => void
}

const PaginationData: FC<PaginationDataProps> = ({
    className,
    setCurrentPage,
    currentPage,
    totalPages,
    pageSize,
    refetch,
}) => {
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return
        setCurrentPage(page)
    }

    const pages = []
    if (currentPage > 1) pages.push(currentPage - 1)
    pages.push(currentPage)
    if (currentPage < totalPages) {
        pages.push(currentPage + 1)
        if (currentPage + 1 < totalPages) pages.push(currentPage + 2)
    }

    useEffect(() => {
        if (refetch) refetch()
    }, [currentPage])

    return (
        <div className={cn(`${totalPages < 2 && 'hidden'}`, className)}>
            <Pagination>
                <PaginationContent>
                    {currentPage > 1 && (
                        <PaginationItem>
                            <PaginationPrevious
                                className="cursor-pointer"
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                            />
                        </PaginationItem>
                    )}
                    {pages.map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                className="cursor-pointer"
                                onClick={() => handlePageChange(page)}
                                isActive={page === currentPage}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    {currentPage < totalPages && (
                        <>
                            {' '}
                            {currentPage + 2 < totalPages && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}
                            <PaginationItem>
                                <PaginationNext
                                    className="cursor-pointer"
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                />
                            </PaginationItem>
                        </>
                    )}
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default PaginationData
