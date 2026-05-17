'use server'
import { cookies } from "next/headers";
import { decrypt } from "./session";
import { getUser } from "../join/getUser";



export async function isAuth(): Promise<boolean> {
  try {
    const cookie = (await cookies()).get("session")?.value;
    if (!cookie) return false;

    const session = await decrypt(cookie);
    if (!session) return false;
    if (new Date(session.expiresAt as string) < new Date()) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Auth check failed:", error);
    return false;
  }
}

export async function isAdmin(): Promise<boolean> {
  try {
    const user = await getUser();
    return user?.user?.key.keyable_type === "admin";
  } catch (error) {
    console.error("Admin check failed:", error);
    return false;
  }
}





