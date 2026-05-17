"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { Input } from "@/components/Inputs/inputs";
import Button from "@/components/Buttons/Button";
import { Guardian } from "@/lib/server/type/guardian/guardian";
import { updateGuardian } from "@/lib/server/actions/gurdians/guardianAction";
import { useEffect, useState } from "react";
import { getAllWilayas, Wilaya } from "@/lib/server/actions/wilaya/wilayaAcitons";
import { useTranslations } from "next-intl";
import { SimpleSelect } from "@/components/Inputs/SimpleSelect";

const updateGuardianSchema = z.object({
    name: z.string()
        .min(1, "name is required")
        .regex(/^[A-Z]/, "First letter must be capital")
        .regex(/^[A-Z][a-z]*$/, "Only letters are allowed"),
    last: z.string()
        .min(1, "Last name is required")
        .regex(/^[A-Z]/, "First letter must be capital")
        .regex(/^[A-Z][a-z]*$/, "Only letters are allowed"),
    date_of_birth: z.string(), // Format: YYYY-MM-DD
    wilaya_id : z.string(),
    baladya_id: z.string(),
});

type UpdateGuardianFormData = z.infer<typeof updateGuardianSchema>;

interface UpdateGuardianFormProps {
    guardian: Guardian;
}

export default function UpdateGuardianForm({ guardian }: UpdateGuardianFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<UpdateGuardianFormData>({
        resolver: zodResolver(updateGuardianSchema),
        defaultValues: {
            name: guardian.name,
            last: guardian.last,
            date_of_birth: guardian.date_of_birth,
            baladya_id: guardian.baladya_id.toString()
        },
    });
    const [wilayas, setWilayas] = useState<Wilaya[]>([])
   
    const t = useTranslations('Auth.join')
    useEffect(() => {
        const fetchWilayas = async () => {
            const response = await getAllWilayas()
            setWilayas(response.data)
            setValue('wilaya_id' , guardian.baladya.wilaya_id.toString())
            setValue('baladya_id' , guardian.baladya_id.toString())
        }
        fetchWilayas()
    }, [])

    console.log(errors)
    const onSubmit = async (data: UpdateGuardianFormData) => {
        try {
            await updateGuardian(guardian.id, data);

        } catch (error) {
            console.error('Error updating guardian:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-md">
            {isSubmitSuccessful && (
                <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-lg">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <p className="font-medium text-green-800 dark:text-green-200">Guardian updated successfully!</p>
                </div>
            )}
            <Input
                label="name"
                title={t('name_title')}
                placeholder={t('name_place_holder')}
                register={register}
                error={errors.name?.message}
            />
            <Input
                label="last"
                title={t('last_title')}
                placeholder={t('last_place_holder')}
                register={register}
                error={errors.last?.message}
            />
            <Input
                label="date_of_birth"
                title={t('date_of_birth_title')}
                placeholder={t('date_of_birth_place_holder')}
                type="date"
                register={register}
                error={errors.date_of_birth?.message}
            />
            <SimpleSelect
                label="wilaya_id"
                title={t('wilaya_id_title')}
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
                        label="baliday_id"
                        title={t('baladya_id_title')}
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
                {isSubmitting ? "Updating..." : "Update Guardian"}
            </Button>
        </form>
    );
}
