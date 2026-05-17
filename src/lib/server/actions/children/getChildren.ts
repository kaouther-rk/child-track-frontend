'use server'

import axiosInstance from '@/lib/server/tools/axios'
import { Children, ChildrenResponse } from '../../type/children/children';

interface GetChildrenResponse {
    message: string;
    children: Children;
}

export async function getChildren(id: number): Promise<ChildrenResponse> {
    try {
        const { data } = await axiosInstance.get<ChildrenResponse>(
            `/childrens/${id}`
        )
        return data
    } catch (error: unknown) {
        console.error('Error fetching children:', error)
        throw error
    }
}