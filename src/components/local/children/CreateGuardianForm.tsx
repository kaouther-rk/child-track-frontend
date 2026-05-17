"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/Inputs/inputs";
import Button from "@/components/Buttons/Button";
import { createChildren } from "@/lib/server/actions/children/childrenAction";
import { SimpleSelect } from "@/components/Inputs/SimpleSelect";
import { getAllWilayas, Wilaya } from "@/lib/server/actions/wilaya/wilayaAcitons";

const createChildrenSchema = z.object({
    name: z.string()
        .min(1, "Name is required")
        .regex(/^[A-Z]/, "First letter must be capital")
        .regex(/^[A-Z][a-z]*$/, "Only letters are allowed"),
    last: z.string()
        .min(1, "Last name is required")
        .regex(/^[A-Z]/, "First letter must be capital")
        .regex(/^[A-Z][a-z]*$/, "Only letters are allowed"),
    date_of_birth: z.string(), // Format: YYYY-MM-DD
    description: z.string(), // Format: YYYY-MM-DD
    wilaya_id: z.string(),
    baladya_id: z.string(),
});

type CreateChildrenFormData = z.infer<typeof createChildrenSchema>;

export default function CreateChildrenForm() {
    const [wilayas, setWilayas] = useState<Wilaya[]>([])
    const router = useRouter();
    const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitSuccessful, isSubmitting } } = useForm<CreateChildrenFormData>({
        resolver: zodResolver(createChildrenSchema),
    });

    useEffect(() => {
        if (isSubmitSuccessful) {
            const timer = setTimeout(() => {
                router.refresh();
                router.push('/dashboard');
            }, 2000);
            return () => clearTimeout(timer);
        }
        const fetchWilayas = async () => {
            const response = await getAllWilayas()
            setWilayas(response.data)
        }
        fetchWilayas()
    }, [isSubmitSuccessful, router]);

    const onSubmit = async (data: CreateChildrenFormData) => {
        try {
            await createChildren(data);
        } catch (error) {
            console.error('Error creating children:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-md">
            {isSubmitSuccessful && (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 animate-fade-in">
                    <CheckCircle2 size={20} />
                    <span>Children created successfully!</span>
                </div>
            )}
            <Input
                label="name"
                title="Name"
                placeholder="Enter name (First letter capital)"
                error={errors.name?.message}
                register={register}
            />
            <Input
                label="last"
                title="Last Name"
                placeholder="Enter last name (First letter capital)"
                error={errors.last?.message}
                register={register}
            />
            <Input
                label="date_of_birth"
                title="Date of Birth"
                error={errors.date_of_birth?.message}
                type="date"
                register={register}
            />
            <Input
                label="description"
                title="Description"
                placeholder="Enter short description"
                error={errors.description?.message}
                register={register}
            />
            <SimpleSelect
                label="wilaya_id"
                title={'Wilaya'}
                register={register('wilaya_id')}
                error={errors.wilaya_id?.message}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setValue("wilaya_id", e.target.value);
                }}
            >
                <option></option>
                {
                    wilayas?.map(wilaya =>
                        <option key={wilaya.id} value={wilaya.id}>{wilaya.name}</option>
                    )
                }
            </SimpleSelect>
            {
                watch("wilaya_id") && (
                    <SimpleSelect
                        label="balday_id"
                        title={'Baladya'}
                        register={register('baladya_id')}
                        error={errors.wilaya_id?.message}
                    >
                        <option></option>
                        {
                            wilayas?.find(wilaya => wilaya.id === +watch("wilaya_id"))?.baladya?.map(baladiya => (
                                <option key={baladiya.id} value={baladiya.id}>{baladiya.name}</option>
                            ))
                        }
                    </SimpleSelect>
                )
            }
            <Button
                type="submit"
                mode="filled"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Creating..." : "Create Children"}
            </Button>
        </form>
    );
}