"use server";
import Link from "next/link";
import { Pencil } from "lucide-react";
import DeleteBraclet from "./delete";
import { Braclet } from "@/lib/server/type/braclet/braclet";

export default async function BracletActions({ braclet }: { braclet: Braclet }) {
    return (
        <div
            className="flex items-center gap-1"
        >
            <Link href={`/dashboard/braclets/${braclet.id}`}>
                <Pencil className="text-green-700 dark:text-green-400" size={16} />
            </Link>
            <DeleteBraclet braclet={braclet} />
        </div>
    )
}