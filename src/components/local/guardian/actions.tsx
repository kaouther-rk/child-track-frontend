"use server";
import Link from "next/link";
import { Pencil } from "lucide-react";
import DeleteGuardian from "./delete";
import { Guardian } from "@/lib/server/type/guardian/guardian";

export default async function GuardianActions({ guardian }: { guardian: Guardian }) {
    return (
        <div
            className="flex items-center gap-1"
        >
            <Link href={`/dashboard/guardians/${guardian.id}`}>
                <Pencil className="text-green-700 dark:text-green-400" size={16} />
            </Link>
            <DeleteGuardian guardian={guardian} />
        </div>
    )
}