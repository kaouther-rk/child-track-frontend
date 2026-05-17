'use server'

import axios from "axios"
import { cookies } from "next/headers"
import { decrypt } from "../tools/session"

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
})

export async function getUser(): Promise<{ user?: User, error?: string }> {
    try {
        const cookie = (await cookies()).get("session")?.value;
        const session = await decrypt(cookie);
        const token = session?.token;

        if (!token) {
            return { error: "No authentication token found" }
        }

        const response = await axiosInstance.get<UserResponse>('/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return { user: response.data.user }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
            return { error: error.response.data.message }
        }
        return { error: "Failed to fetch user data" }
    }
} 



export interface Keyable {
    id: number
    username: string
    name: string
    last: string
    created_at: string
    updated_at: string
}

export interface Key {
    id: number
    value: string
    status: 'used' | 'unused'
    keyable_type: string
    keyable_id: number
    used_at: string | null
    expires_at: string | null
    created_at: string
    updated_at: string
    keyable: Keyable
}

export interface User {
    id: number
    email: string
    email_verified_at: string | null
    created_at: string
    updated_at: string
    key_id: number
    key: Key
}

export interface UserResponse {
    user: User
} 