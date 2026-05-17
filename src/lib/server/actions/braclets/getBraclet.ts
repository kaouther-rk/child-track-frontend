'use server'

import axiosInstance from '@/lib/server/tools/axios'
import { Braclet,  } from '../../type/braclet/braclet';

interface GetBracletResponse {
    message: string;
    braclet: Braclet;
}

export async function getBraclet(id: number): Promise<Braclet> {
    try {
        const { data } = await axiosInstance.get<Braclet>(
            `/braclets/${id}`
        )
        return data
    } catch (error: unknown) {
        console.error('Error fetching braclet:', error)
        throw error
    }
}