'use server'

import axiosInstance from '@/lib/server/tools/axios'
import { revalidatePath } from 'next/cache'
import { Braclet, CreateBracletErrorResponse, CreateBracletRequest } from '../../type/braclet/braclet'

export async function createBraclet(bracletData: CreateBracletRequest): Promise<Braclet | CreateBracletErrorResponse> {
    try {
        const { data } = await axiosInstance.post<Braclet>(
            `/braclets`,
            bracletData
        )
        revalidatePath('/dashboard/braclets')
        return data
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'response' in error) {
            return (error as { response: { data: CreateBracletErrorResponse } }).response.data
        }
        throw error
    }
}

export async function updateBraclet(
    id: number,
    bracletData: Partial<CreateBracletRequest>
): Promise<Braclet | CreateBracletErrorResponse> {
    try {
        const { data } = await axiosInstance.put<Braclet>(
            `/braclets/${id}`,
            bracletData
        )
        revalidatePath('/dashboard/braclets')
        return data
    } catch (error: unknown) {
        if (
            typeof error === 'object' &&
            error !== null &&
            'response' in error &&
            (error as { response?: { data?: unknown } }).response?.data
        ) {
            return (error as { response: { data: CreateBracletErrorResponse } }).response.data
        }
        throw error
    }
}

export async function deleteBraclet(id: number): Promise<{ success: boolean }> {
    try {
        await axiosInstance.delete(`/braclets/${id}`)
        revalidatePath('/dashboard/braclets')
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

export async function createBracletKey(id: number): Promise<{ success: boolean; key?: string }> {
    try {
        await axiosInstance.post<{ key: string }>(`/braclets/${id}/generate-key`)
        revalidatePath('/dashboard/braclets')
        return { success: true }
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'response' in error) {
            console.error('Error creating braclet key:', (error as { response: { data: unknown } }).response.data)
        } else {
            console.error('Error creating braclet key:', error)
        }
        throw error
    }
}

type LinkBracletRequest = {
    children_id: string;
    mac: string;
}
type LinkBracletRequestError = {
    message: string;
    errors: {
        mac?: string[];
    };
}

export async function linkBraclet(bracletData: LinkBracletRequest): Promise<{ error?: LinkBracletRequestError, success?: boolean }> {
    try {
        const response = await axiosInstance.post(`/braclets/${bracletData.children_id}/children`, bracletData);
        return { success: true };
    } catch (error: unknown) {
        if (
            typeof error === 'object' &&
            error !== null &&
            'response' in error &&
            typeof (error as any).response === 'object' &&
            (error as any).response !== null &&
            'data' in (error as any).response
        ) {
            console.error('Login error:', (error as any).response.data);
            return { error: (error as any).response.data as LinkBracletRequestError };
        }
        console.error('Login error:', error);
        return {
            error: {
                message: "An unexpected error occurred",
                errors: {}
            }
        };
    }
}

type AddDangerZoneRequest = {
    braclet_id: string;
    name: string;
    lat : number;
    lng: number
}
type AddDangerZoneRequestError = {
    message: string;
    errors: {
        braclet_id?: string;
        name?: string[];
    };
}

export async function addDangerZone(bracletData: AddDangerZoneRequest): Promise<{ error?: AddDangerZoneRequestError, success?: boolean }> {
    try {
        const response = await axiosInstance.post(`/braclets/${bracletData.braclet_id}/danger`, bracletData);
        return { success: true };
    } catch (error: unknown) {
        if (
            typeof error === 'object' &&
            error !== null &&
            'response' in error &&
            typeof (error as any).response === 'object' &&
            (error as any).response !== null &&
            'data' in (error as any).response
        ) {
            console.error('Login error:', (error as any).response.data);
            return { error: (error as any).response.data as AddDangerZoneRequestError };
        }
        console.error('Login error:', error);
        return {
            error: {
                message: "An unexpected error occurred",
                errors: {}
            }
        };
    }
}

type CircleUpdateLocationRequest = {
    circle_id: string;
    lat : number;
    lng: number;
    radius: number
}
type CircleUpdateLocationRequestError = {
    message: string;
    errors: {
        braclet_id?: string;
        name?: string[];
    };
}

export async function CircleUpdateLocation(bracletData: CircleUpdateLocationRequest): Promise<{ error?: CircleUpdateLocationRequestError, success?: boolean }> {
    try {
        const response = await axiosInstance.post(`/braclets/${bracletData.circle_id}/circleUpdate`, bracletData);
        return { success: true };
    } catch (error: unknown) {
        if (
            typeof error === 'object' &&
            error !== null &&
            'response' in error &&
            typeof (error as any).response === 'object' &&
            (error as any).response !== null &&
            'data' in (error as any).response
        ) {
            console.error('Login error:', (error as any).response.data);
            return { error: (error as any).response.data as CircleUpdateLocationRequestError };
        }
        console.error('Login error:', error);
        return {
            error: {
                message: "An unexpected error occurred",
                errors: {}
            }
        };
    }
}