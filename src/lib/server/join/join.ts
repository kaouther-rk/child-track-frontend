'use server'

import axios from "axios"

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
})

export async function join({ data_ }: { data_: RegisterData }): Promise<{ error?: RegisterResponseError, success?: boolean }> {
    try {
        const {data} = await axiosInstance.post('/gurdians', data_)
        console.log(data)
        return { success: true }
    } catch (error) {
        // console.error('Register error:', error.response)
        if (axios.isAxiosError(error) && error.response?.data) {
            return { error: error.response.data as RegisterResponseError }
        }
        return {
            error: {
                message: "An unexpected error occurred",
                errors: {}
            }
        }
    }
}

export interface RegisterData {
    name: string
    last: string
    date_of_birth: string
    baladya_id: string
}

export interface RegisterResponseError {
    message: string
    errors: {
        name?: string[]
        last?: string[]
        date_of_birth?: string[]
        baladya_id?: string[]
    }
} 