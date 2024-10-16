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
import { useQuery, useQueryClient } from '@tanstack/react-query'
import api from '@/api/Auth'

interface PaginationDataProps {
    className?: string
    url?: string
    data?: any
    setData?: any
    setCurrentPage: (page: number) => void
    currentPage: number
    totalPages: number
    pageSize: number
}

const PaginationData: FC<PaginationDataProps> = ({
    className,
    url,
    data,
    setData,
    setCurrentPage,
    currentPage,
    totalPages,
    pageSize,
}) => {
    const {
        data: queryData,
        isLoading,
        error,
        isSuccess,
    } = useQuery({
        queryKey: ['prospects', currentPage, pageSize],
        queryFn: async () => {
            try {
                const response = await api
                    .get(
                        `${url}?page=${
                            currentPage - 1
                        }&size=${pageSize}&sort=createdAt,desc`
                    )
                    .then((res) => res.data)
                    .catch((e) => console.error(e))
                return response.content
            } catch (error) {
                console.error(error)
                throw error
            }
        },
    })
    useEffect(() => {
        if (isSuccess) setData(queryData)
    }, [isSuccess])
    const pages = []
    if (currentPage > 1) {
        pages.push(currentPage - 1)
    }
    pages.push(currentPage)
    if (currentPage < totalPages) {
        pages.push(currentPage + 1)
        if (currentPage + 1 < totalPages) {
            pages.push(currentPage + 2)
        }
    }
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return
        setCurrentPage(page)
    }
    return (
        <Pagination>
            <PaginationContent>
                {currentPage > 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            className="cursor-pointer"
                            onClick={() => handlePageChange(currentPage - 1)}
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
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                {currentPage < totalPages && (
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(currentPage + 1)}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationData
