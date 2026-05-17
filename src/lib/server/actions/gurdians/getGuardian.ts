'use server'

import axiosInstance from '@/lib/server/tools/axios'
import { Guardian } from '../../type/guardian/guardian';

interface GetGuardianResponse {
    message: string;
    guardian: Guardian;
}

export async function getGuardian(id: number): Promise<Guardian> {
    try {
        const { data } = await axiosInstance.get<GetGuardianResponse>(
            `/gurdians/${id}`
        )
        return data.guardian
    } catch (error: unknown) {
        console.error('Error fetching guardian:', error)
        throw error
    }
}