"use client";

import { createBracletKey } from "@/lib/server/actions/braclets/bracletAction";
import { Braclet } from "@/lib/server/type/braclet/braclet";
import { KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CreateKeyProps {
    braclet: Braclet;
}

export default function CreateKey({ braclet }: CreateKeyProps) {
    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = async () => {
        try {
            setIsCreating(true);
            await createBracletKey(braclet.id);
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