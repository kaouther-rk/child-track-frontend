"use server";
import Link from "next/link";
import { Pencil } from "lucide-react";
import DeleteAdmin from "./delete";
import { Admin } from "@/lib/server/type/admin/admin";

export default async function AdminActions({ admin }: { admin: Admin }) {
    return (
        <div
            className="flex items-center gap-1"
        >
            <Link href={`/dashboard/admins/${admin.id}`}>
                <Pencil className="text-green-700 dark:text-green-400" size={16} />
            </Link>
            <DeleteAdmin admin={admin} />
        </div>
    )
}