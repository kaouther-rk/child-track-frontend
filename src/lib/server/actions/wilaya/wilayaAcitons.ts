"use server";

import axiosInstance from "@/lib/server/tools/axios";
export type Baladya = {
  id: number;
  name: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  wilaya_id: number;
};

export type Wilaya = {
  id: number;
  name: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  baladya: Baladya[];
};

export type WilayaResponse = {
  message: string;
  data: Wilaya[];
};

export async function getAllWilayas(): Promise<WilayaResponse> {
    try {
        const { data } = await axiosInstance.get("/wilayas");
        return data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}