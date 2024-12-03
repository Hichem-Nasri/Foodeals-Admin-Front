'use client'
import api from '@/lib/Auth'
import { CardTotalValue } from '@/components/payment/CardTotalValue'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
    RocketIcon,
    UserRoundCheck,
    UserRoundX,
    UsersRound,
} from 'lucide-react'
import React, { FC, useEffect, useState } from 'react'
import { API_URL } from '@/lib/api'

interface StatisticsProps {
    activeLeads: number
    total: number
    notConverted: number
    converted: number
}

const API_ENDPOINT = `${API_URL}/v1/crm/prospects/statistics`

interface FcStatisticsProps {
    type: string
    isFetching?: boolean
}

const Statistics: FC<FcStatisticsProps> = ({ type, isFetching }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['statistics'],
        queryFn: async () => {
            try {
                const response = await api.get(API_ENDPOINT + '?type=' + type)
                return response.data as StatisticsProps
            } catch (error) {
                console.error(error)
            }
        },
        refetchOnWindowFocus: false,
    })
    return (
        <div className="flex lg:flex-row flex-col items-center gap-3 w-full max-w-full">
            <CardTotalValue
                isLoading={isLoading || isFetching}
                Icon={UserRoundCheck}
                title="Nombre des leads"
                value={data?.total!}
                className="text-mountain-400 bg-mountain-400"
                currency={true}
            />
            <CardTotalValue
                isLoading={isLoading || isFetching}
                Icon={RocketIcon}
                title={'Lead active'}
                value={data?.activeLeads!}
                className="text-tulip-400 bg-tulip-400"
                currency={true}
            />
            <CardTotalValue
                isLoading={isLoading || isFetching}
                Icon={UserRoundX}
                title={'Prospect non convertis'}
                value={data?.notConverted!}
                className="text-coral-500 bg-coral-500"
                currency={true}
            />
            <CardTotalValue
                isLoading={isLoading || isFetching}
                Icon={UsersRound}
                title={'Prospect convertis'}
                value={data?.converted!}
                className="text-amethyst-500 bg-amethyst-500"
                currency={true}
            />
        </div>
    )
}

export default Statistics
