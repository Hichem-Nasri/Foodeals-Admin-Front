'use client'
import api from '@/api/Auth'
import { CardTotalValue } from '@/components/payment/CardTotalValue'
import { headers } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
    RocketIcon,
    UserRoundCheck,
    UserRoundX,
    UsersRound,
} from 'lucide-react'
import React, { FC, useEffect, useState } from 'react'

interface StatisticsProps {
    activeLeads: number
    total: number
    notConverted: number
    converted: number
}

const API_ENDPOINT = 'http://localhost:8080/api/v1/crm/prospects/statistics'

interface FcStatisticsProps {
    type: string
}

const Statistics: FC<FcStatisticsProps> = ({ type }) => {
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
    })
    return (
        <div className="flex lg:flex-row flex-col items-center gap-3 w-full max-w-full">
            <CardTotalValue
                isLoading={isLoading}
                Icon={UserRoundCheck}
                title="Nombre des leads"
                value={data?.total!}
                className="text-mountain-400 bg-mountain-400"
                currency={true}
            />
            <CardTotalValue
                isLoading={isLoading}
                Icon={RocketIcon}
                title={'Lead active'}
                value={data?.activeLeads!}
                className="text-tulip-400 bg-tulip-400"
                currency={true}
            />
            <CardTotalValue
                isLoading={isLoading}
                Icon={UserRoundX}
                title={'Prospect non convertis'}
                value={data?.notConverted!}
                className="text-coral-500 bg-coral-500"
                currency={true}
            />
            <CardTotalValue
                isLoading={isLoading}
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
