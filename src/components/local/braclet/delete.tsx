"use client";

import { deleteBraclet } from "@/lib/server/actions/braclets/bracletAction";
import { Braclet } from "@/lib/server/type/braclet/braclet";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteBracletProps {
    braclet: Braclet;
}

export default function DeleteBraclet({ braclet }: DeleteBracletProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteBraclet(braclet.id);
            router.refresh();
        } catch (error) {
            console.error('Error deleting braclet:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`
                text-red-700 dark:text-red-400 
                hover:text-red-800 dark:hover:text-red-300 
                disabled:opacity-50
                transition-all duration-200
                ${isDeleting ? 'animate-spin' : ''}
            `}
        >
            <Trash2 size={16} />
        </button>
    );
}