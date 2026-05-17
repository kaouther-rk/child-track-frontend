'use server'

import axiosInstance from '@/lib/server/tools/axios'
import { AdminResponse } from '../../type/admin/admin'

export async function getAdmins(page: number = 1): Promise<AdminResponse> {
    try {
        const { data } = await axiosInstance.get<AdminResponse>(`/admins?page=${page}`)
        return data
    } catch (error: unknown) {
        if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
            console.error('Error fetching admins:', error.response.data);
            throw error.response.data;
        } else {
            console.error('Error fetching admins:', error);
            throw error;
        }
    }
} 