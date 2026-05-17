"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/Inputs/inputs";
import Button from "@/components/Buttons/Button";
import { createBraclet } from "@/lib/server/actions/braclets/bracletAction";

const createBracletSchema = z.object({
    mac: z.string(),
    status: z.enum(["on", "off"]),
});

type CreateBracletFormData = z.infer<typeof createBracletSchema>;

export default function CreateBracletForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<CreateBracletFormData>({
        resolver: zodResolver(createBracletSchema),
    });

    useEffect(() => {
        if (isSubmitSuccessful) {
            const timer = setTimeout(() => {
                router.refresh();
                router.push('/dashboard');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isSubmitSuccessful, router]);

    const onSubmit = async (data: CreateBracletFormData) => {
        try {
            await createBraclet(data);
        } catch (error) {
            console.error('Error creating braclet:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-md">
            {isSubmitSuccessful && (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 animate-fade-in">
                    <CheckCircle2 size={20} />
                    <span>Braclet created successfully!</span>
                </div>
            )}
            <Input
                label="mac"
                title="MAC Address"
                placeholder="Enter mac address "
                error={errors.mac?.message}
                register={register}
            />
            <Input
                label="status"
                title="Status"
                placeholder="Enter status  (on / off)"
                error={errors.status?.message}
                register={register}
            />
            <Button
                type="submit"
                mode="filled"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Creating..." : "Create Braclet"}
            </Button>
        </form>
    );
}