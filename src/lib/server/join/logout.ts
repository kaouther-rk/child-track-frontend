'use server'
import { cookies } from "next/headers"
import axiosInstance from "../tools/axios"
import { revalidatePath } from "next/cache"

export async function logout(): Promise<{ success: boolean }> {
    try {
        console.log("hi");
        const data = await axiosInstance.post('/auth/logout')
        console.log('Logout response:', data.data)
        // // Delete session cookie
        const cookieStore = await cookies()
        cookieStore.delete('session')
        cookieStore.delete('token')
        
        revalidatePath('/')
        return { success: true }
    } catch (error: any) {
        console.error('Error logging out:', error?.response?.data)
        throw error?.response?.data
    }
}