"use client";

import { createAdminKey } from "@/lib/server/actions/doctors/adminActions";
import { Admin } from "@/lib/server/type/admin/admin";
import { KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CreateKeyProps {
    admin: Admin;
}

export default function CreateKey({ admin }: CreateKeyProps) {
    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = async () => {
        try {
            setIsCreating(true);
            await createAdminKey(admin.id);
            router.refresh();
        } catch (error) {
            console.error('Error creating key:', error);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <button
            onClick={handleCreate}
            disabled={isCreating}
            className={`
                text-green-700 dark:text-green-400 
                hover:text-green-800 dark:hover:text-green-300 
                disabled:opacity-50
                transition-all duration-200
                ${isCreating ? 'animate-spin' : ''}
            `}
        >
            <KeyRound size={16} />
        </button>
    );
}