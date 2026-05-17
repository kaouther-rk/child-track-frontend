"use client";

import { createGuardianKey } from "@/lib/server/actions/gurdians/guardianAction";
import { Guardian } from "@/lib/server/type/guardian/guardian";
import { KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CreateKeyProps {
    guardian: Guardian;
}

export default function CreateKey({ guardian }: CreateKeyProps) {
    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = async () => {
        try {
            setIsCreating(true);
            await createGuardianKey(guardian.id);
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