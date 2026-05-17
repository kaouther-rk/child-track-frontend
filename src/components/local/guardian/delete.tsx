"use client";

import { deleteGuardian } from "@/lib/server/actions/gurdians/guardianAction";
import { Guardian } from "@/lib/server/type/guardian/guardian";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteGuardianProps {
    guardian: Guardian;
}

export default function DeleteGuardian({ guardian }: DeleteGuardianProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteGuardian(guardian.id);
            router.refresh();
        } catch (error) {
            console.error('Error deleting guardian:', error);
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