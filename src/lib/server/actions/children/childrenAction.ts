'use server'

import axiosInstance from '@/lib/server/tools/axios'
import { revalidatePath } from 'next/cache'
import { Children, CreateChildrenErrorResponse, CreateChildrenRequest } from '../../type/children/children'
export async function createChildren(childrenData: CreateChildrenRequest): Promise<Children | CreateChildrenErrorResponse> {
    try {
        const { data } = await axiosInstance.post<Children>(
            `/childrens`,
            childrenData
        )
        revalidatePath('/dashboard/childrens')
        return data
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'response' in error) {
            return (error as { response: { data: CreateChildrenErrorResponse } }).response.data
        }
        throw error
    }
}

export async function updateChildren(
    id: number,
    childrenData: Partial<CreateChildrenRequest>
): Promise<Children | CreateChildrenErrorResponse> {
    try {
        const { data } = await axiosInstance.put<Children>(
            `/childrens/${id}`,
            childrenData
        )
        revalidatePath('/dashboard/childrens')
        return data
    } catch (error: unknown) {
        if (
            typeof error === 'object' &&
            error !== null &&
            'response' in error &&
            (error as { response?: { data?: unknown } }).response?.data
        ) {
            return (error as { response: { data: CreateChildrenErrorResponse } }).response.data
        }
        throw error
    }
}

export async function deleteChildren(id: number): Promise<{ success: boolean }> {
    try {
        await axiosInstance.delete(`/childrens/${id}`)
        revalidatePath('/dashboard/childrens')
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

export async function createChildrenKey(id: number): Promise<{ success: boolean; key?: string }> {
    try {
        await axiosInstance.post<{ key: string }>(`/childrens/${id}/generate-key`)
        revalidatePath('/dashboard/childrens')
        return { success: true }
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'response' in error) {
            console.error('Error creating children key:', (error as { response: { data: unknown } }).response.data)
        } else {
            console.error('Error creating children key:', error)
        }
        throw error
    }
} 