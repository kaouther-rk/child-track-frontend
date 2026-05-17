'use server'

import axiosInstance from '@/lib/server/tools/axios'
import { BracletsResponse } from '../../type/braclet/braclet'

export async function getBraclets(page: number = 1): Promise<BracletsResponse> {
    try {
        const { data } = await axiosInstance.get<BracletsResponse>(`/braclets?page=${page}`)
        
        return data
    } catch (error: unknown) {
        if (error && typeof error === 'object' && 'response' in error) {
            // @ts-expect-error: error.response may exist
            console.error('Error fetching braclets:', error.response?.data)
            // @ts-expect-error: error.response may exist
            throw error.response?.data
        }
        throw error
    }
}