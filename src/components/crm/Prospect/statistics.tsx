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
import React, { useEffect, useState } from 'react'

interface StatisticsProps {
    activeLeads: number
    nonConverted: number
    total: number
    totalOfLeads: number
}

const API_ENDPOINT = 'http://localhost:8080/api/v1/crm/prospects/statistics'

const Statistics = () => {
    const [data, setData] = useState<StatisticsProps>({
        activeLeads: 0,
        nonConverted: 0,
        total: 0,
        totalOfLeads: 0,
    })
    const {
        data: query,
        isSuccess,
        error,
    } = useQuery({
        queryKey: ['statistics'],
        queryFn: async () => {
            try {
                const response = await api.get(API_ENDPOINT)
                return response.data
            } catch (error) {
                console.error(error)
                throw error
            }
        },
    })
    useEffect(() => {
        if (isSuccess && query) {
            setData(query)
        }
    }, [isSuccess, query])
    return (
        <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
            <CardTotalValue
                Icon={RocketIcon}
                title={'Lead active'}
                value={data.activeLeads}
                className="text-tulip-400 bg-tulip-400"
                currency={true}
            />
            <CardTotalValue
                Icon={UserRoundX}
                title={'Prospect non convertis'}
                value={data.nonConverted}
                className="text-coral-500 bg-coral-500"
                currency={true}
            />
            <CardTotalValue
                Icon={UsersRound}
                title={'Numbre des Prospect'}
                value={data.total}
                className="text-amethyst-500 bg-amethyst-500"
                currency={true}
            />
            <CardTotalValue
                Icon={UserRoundCheck}
                title="Nombre des leads"
                value={data.totalOfLeads}
                className="text-mountain-400 bg-mountain-400"
                currency={true}
            />
        </div>
    )
}

export default Statistics
