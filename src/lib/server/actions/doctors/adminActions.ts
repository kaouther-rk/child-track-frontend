'use server'

import axiosInstance from '@/lib/server/tools/axios'
import { revalidatePath } from 'next/cache'
import { Admin, AdminErrorResponse, CreateAdminRequest } from '../../type/admin/admin'
import type { AxiosError } from 'axios'

export async function createAdmin(adminData: CreateAdminRequest): Promise<Admin | AdminErrorResponse> {
    try {
        const { data } = await axiosInstance.post<Admin>(
            `/admins`,
            adminData
        )
        revalidatePath('/dashboard/admins')
        return data
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'response' in error) {
            const axiosError = error as AxiosError<AdminErrorResponse>
            if (axiosError.response?.data) {
                return axiosError.response.data
            }
        }
        throw error
    }
}

export async function updateAdmin(id: number, adminData: Partial<CreateAdminRequest>): Promise<Admin | AdminErrorResponse> {
    try {
        const { data } = await axiosInstance.put<Admin>(
            `/admins/${id}`,
            adminData
        )
        revalidatePath('/dashboard/admins')
        return data
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'response' in error) {
            const axiosError = error as AxiosError<AdminErrorResponse>
            if (axiosError.response?.data) {
                return axiosError.response.data
            }
        }
        throw error
    }
}

export async function deleteAdmin(id: number): Promise<{ success: boolean }> {
    try {
        await axiosInstance.delete(`/admins/${id}`)
        revalidatePath('/dashboard/admins')
        return { success: true }
    } catch (error) {
        throw error
    }
}

export async function createAdminKey(id: number): Promise<{ success: boolean; key?: string }> {
    try {
        await axiosInstance.post<{ key: string }>(`/admins/${id}/generate-key`)
        revalidatePath('/dashboard/admins')
        return { success: true }
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'response' in error) {
            const axiosError = error as AxiosError
            console.error('Error creating admin key:', axiosError.response?.data)
        } else {
            console.error('Error creating admin key:', error)
        }
        throw error
    }
}