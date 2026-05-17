'use server'

import axios from "axios"

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
})

export async function registerFun({ data }: { data: RegisterData }): Promise<{ error?: RegisterResponseError, success?: boolean }> {
    try {
        await axiosInstance.post('/auth/register', data)
        return { success: true }
    } catch (error) {
        console.error('Register error:', error)
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
    email: string
    password: string
    password_confirmation: string
    key: string
}

export interface RegisterResponseError {
    message: string
    errors: {
        email?: string[]
        password?: string[]
        password_confirmation?: string[]
        key?: string[]
    }
} 