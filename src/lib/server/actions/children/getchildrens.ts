'use server'

import axiosInstance from '@/lib/server/tools/axios'
import { ChildrenResponse } from '../../type/children/children'

export async function getChildrens(page: number = 1): Promise<ChildrenResponse> {
    try {
        const { data } = await axiosInstance.get<ChildrenResponse>(`/childrens?page=${page}`)
        // console.log('childrens ' , data.data )
        return data
    } catch (error: unknown) {
        if (error && typeof error === 'object' && 'response' in error) {
            // @ts-expect-error: error.response may exist
            console.error('Error fetching childrens:', error.response?.data)
            // @ts-expect-error: error.response may exist
            throw error.response?.data
        }
        throw error
    }
}