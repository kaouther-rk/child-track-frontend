
"use server";

import axios from "axios";
import { createSession } from "../tools/session";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

export async function login({ data }: { data: LoginData }): Promise<{ error?: LoginResponseError, success?: boolean, type?: string }> {
    try {
        const response = await axiosInstance.post('/auth/login', data);
        const { token, user } = response.data;
        await createSession(user.id.toString(), token);
        return { success: true, type: user.key.keyable_type };
    } catch (error) {
        // console.error('Login error:', error.response.data);
        if (axios.isAxiosError(error) && error.response?.data) {
            return { error: error.response.data as LoginResponseError };
        }
        return {
            error: {
                message: "An unexpected error occurred",
                errors: {}
            }
        };
    }
}

export type LoginData = {
    email: string;
    password: string;
}

export type LoginResponseError = {
    message : string,
    errors : {
        email ? : string[],
        password ? : string[]
    }
}




