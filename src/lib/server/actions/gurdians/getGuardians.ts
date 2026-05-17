'use server'

import axiosInstance from '@/lib/server/tools/axios'
import { GuardiansResponse } from '../../type/guardian/guardian'

export async function getGuardians(page: number = 1): Promise<GuardiansResponse> {
    try {
        const { data } = await axiosInstance.get<GuardiansResponse>(`/gurdians?page=${page}`)
        
        return data
    } catch (error: unknown) {
        if (error && typeof error === 'object' && 'response' in error) {
            // @ts-expect-error: error.response may exist
            console.error('Error fetching guardians:', error.response?.data)
            // @ts-expect-error: error.response may exist
            throw error.response?.data
        }
        throw error
    }
}