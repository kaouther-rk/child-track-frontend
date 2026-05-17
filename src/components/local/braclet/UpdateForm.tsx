"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { Input } from "@/components/Inputs/inputs";
import Button from "@/components/Buttons/Button";
import { Braclet } from "@/lib/server/type/braclet/braclet";
import { updateBraclet } from "@/lib/server/actions/braclets/bracletAction";

const updateBracletSchema = z.object({
    mac: z.string(),
    status: z.enum(["on", "off"]),
});

type UpdateBracletFormData = z.infer<typeof updateBracletSchema>;

interface UpdateBracletFormProps {
    braclet: Braclet;
}

export default function UpdateBracletForm({ braclet }: UpdateBracletFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<UpdateBracletFormData>({
        resolver: zodResolver(updateBracletSchema),
        defaultValues: {
            mac: braclet.mac,
            status: braclet.status,
        },
    });

    const onSubmit = async (data: UpdateBracletFormData) => {
        try {
            await updateBraclet(braclet.id, data);

        } catch (error) {
            console.error('Error updating braclet:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-md">
            {isSubmitSuccessful && (
                <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-lg">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <p className="font-medium text-green-800 dark:text-green-200">Braclet updated successfully!</p>
                </div>
            )}
            <Input
                label="mac"
                title="Mac Address"
                placeholder="Enter Mac Address (First letter capital)"
                error={errors.mac?.message}
                register={register}
            />
            <Input
                label="status"
                title="Status"
                placeholder="Enter Status (on / off )"
                error={errors.status?.message}
                register={register}
            />
            <Button
                type="submit"
                mode="filled"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Updating..." : "Update Braclet"}
            </Button>
        </form>
    );
}
