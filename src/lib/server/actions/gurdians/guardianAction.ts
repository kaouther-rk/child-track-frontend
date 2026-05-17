'use server'

import axiosInstance from '@/lib/server/tools/axios'
import { revalidatePath } from 'next/cache'
import { Guardian, CreateGuardianErrorResponse, CreateGuardianRequest } from '../../type/guardian/guardian'

export async function createGuardian(gurdianData: CreateGuardianRequest): Promise<Guardian | CreateGuardianErrorResponse> {
    try {
        const { data } = await axiosInstance.post<Guardian>(
            `/gurdians`,
            gurdianData
        )
        revalidatePath('/dashboard/gurdians')
        return data
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'response' in error) {
            return (error as { response: { data: CreateGuardianErrorResponse } }).response.data
        }
        throw error
    }
}

export async function updateGuardian(
    id: number,
    gurdianData: Partial<CreateGuardianRequest>
): Promise<Guardian | CreateGuardianErrorResponse> {
    try {
        const { data } = await axiosInstance.put<Guardian>(
            `/gurdians/${id}`,
            gurdianData
        )
        revalidatePath('/dashboard/gurdians')
        return data
    } catch (error: unknown) {
        if (
            typeof error === 'object' &&
            error !== null &&
            'response' in error &&
            (error as { response?: { data?: unknown } }).response?.data
        ) {
            return (error as { response: { data: CreateGuardianErrorResponse } }).response.data
        }
        throw error
    }
}

export async function deleteGuardian(id: number): Promise<{ success: boolean }> {
    try {
        await axiosInstance.delete(`/gurdians/${id}`)
        revalidatePath('/dashboard/gurdians')
        return { success: true }
    } catch (error: unknown) {
        if (
            typeof error === 'object' &&
            error !== null &&
            'response' in error &&
            (error as { response?: { data?: unknown } }).response?.data
        ) {
            // Optionally handle/log error here
        }
        throw error
    }
}

export async function createGuardianKey(id: number): Promise<{ success: boolean; key?: string }> {
    try {
        await axiosInstance.post<{ key: string }>(`/gurdians/${id}/generate-key`)
        revalidatePath('/dashboard/guardians')
        return { success: true }
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'response' in error) {
            console.error('Error creating gurdian key:', (error as { response: { data: unknown } }).response.data)
        } else {
            console.error('Error creating gurdian key:', error)
        }
        throw error
    }
} 