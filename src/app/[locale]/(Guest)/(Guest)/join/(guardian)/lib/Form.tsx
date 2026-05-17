"use client";

import Button from "@/components/Buttons/Button";
import { Input } from "@/components/Inputs/inputs";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useTranslations } from "next-intl";
import { SimpleSelect } from "@/components/Inputs/SimpleSelect";
import { useEffect, useState } from "react";
import { getAllWilayas, Wilaya } from "@/lib/server/actions/wilaya/wilayaAcitons";
import { join } from "@/lib/server/join/join";
import { CheckCircle2, Loader2 } from "lucide-react";
const JoinGuardianShema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    dateOfBirth: z.string().nonempty("Date of birth is required"),
    wilaya_id: z.string().min(1, "Wilaya  is required"),
    baladiya_id: z.string().min(1, "Baladiya  is required"),
})

type JoinGuardianData = z.infer<typeof JoinGuardianShema>
export default function GuardianJoinForm() {
    const [wilayas, setWilayas] = useState<Wilaya[]>([])
    const { register, handleSubmit, watch, setValue, setError, formState: { errors, isSubmitSuccessful ,isSubmitting } } = useForm<JoinGuardianData>({
        resolver: zodResolver(JoinGuardianShema)
    })
    const onSubmit: SubmitHandler<JoinGuardianData> = async (data) => {
        try {
            const response = await join({
                data_: {
                    name: data.firstName,
                    last: data.lastName,
                    date_of_birth: data.dateOfBirth,
                    baladya_id: data.baladiya_id
                }
            })
            if (response.error) {
                if (response.error.errors.name) {
                    setError("firstName", {
                        message: response.error.errors.name[0]
                    });
                }
                if (response.error.errors.last) {
                    setError("lastName", {
                        message: response.error.errors.last[0]
                    });
                }
                if (response.error.errors.date_of_birth) {
                    setError("dateOfBirth", {
                        message: response.error.errors.date_of_birth[0]
                    });
                }
                if (response.error.errors.baladya_id) {
                    setError("dateOfBirth", {
                        message: response.error.errors.baladya_id[0]
                    });
                }

            }
        } catch (error) {
            throw error
        }
    }
    const t = useTranslations('Auth.join')
    useEffect(() => {
        const fetchWilayas = async () => {
            const response = await getAllWilayas()
            setWilayas(response.data)
        }
        fetchWilayas()
    }, [])
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full"
        >
            {isSubmitSuccessful && (
                <div className="flex flex-col gap-2 py-4 items-center">
                    <div className="flex items-center gap-2  text-green-700 dark:text-dark-green-400">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Demand created successful! we will contact you soon</span>
                    </div>                   
                </div>
            )}
            <Input
                label="firstName"
                title={t('name_title')}
                placeholder={t('name_place_holder')}
                register={register}
                error={errors.firstName?.message}
            />
            <Input
                label="lastName"
                title={t('last_title')}
                placeholder={t('last_place_holder')}
                register={register}
                error={errors.lastName?.message}
            />
            <Input
                label="dateOfBirth"
                title={t('date_of_birth_title')}
                placeholder={t('date_of_birth_place_holder')}
                type="date"
                register={register}
                error={errors.dateOfBirth?.message}
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
                        register={register('baladiya_id')}
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
                icon={isSubmitting ? <Loader2 className="animate-spin" /> : undefined}
                disabled={isSubmitting}
            >
                {isSubmitting ? "Registering..." : "Register"}
            </Button>
        </form>
    )
}