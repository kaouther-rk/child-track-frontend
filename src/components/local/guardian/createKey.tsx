"use client";

import { createGuardianKey } from "@/lib/server/actions/gurdians/guardianAction";
import { Guardian } from "@/lib/server/type/guardian/guardian";
import { Key } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CreateKeyProps {
    guardian: Guardian;
}

export default function CreateKey({ guardian }: CreateKeyProps) {
    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateKey = async () => {
        try {
            setIsCreating(true);
            const result = await createGuardianKey(guardian.id);
            if (result.success && result.key) {
                // You can handle the key here if needed
                console.log('New key created:', result.key);
            }
            router.refresh();
        } catch (error) {
            console.error('Error creating key:', error);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <button
            onClick={handleCreateKey}
            disabled={isCreating}
            className={`
                text-blue-700 dark:text-blue-400 
                hover:text-blue-800 dark:hover:text-blue-300 
                disabled:opacity-50
                transition-all duration-200
                ${isCreating ? 'animate-spin' : ''}
            `}
        >
            <Key size={16} />
        </button>
    );
} 