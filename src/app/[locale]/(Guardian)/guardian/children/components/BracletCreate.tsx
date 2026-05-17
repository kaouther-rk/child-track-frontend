"use client";
import Button from "@/components/Buttons/Button";
import { Input } from "@/components/Inputs/inputs";
import Modal, { openModal } from "@/components/Modal/Modal";
import { linkBraclet } from "@/lib/server/actions/braclets/bracletAction";
import { Wilaya } from "@/lib/server/actions/wilaya/wilayaAcitons";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
const JoinGuardianShema = z.object({
    mac: z.string().min(2, "First name must be at least 2 characters"),
})
type JoinGuardianData = z.infer<typeof JoinGuardianShema>

export default function BracletCreate({ children_id }: { children_id: number }) {
   
    const { register, handleSubmit, setError, formState: { errors, isSubmitSuccessful, isSubmitting } } = useForm<JoinGuardianData>({
        resolver: zodResolver(JoinGuardianShema)
    })
    const onSubmit: SubmitHandler<JoinGuardianData> = async (data) => {
        try {
            const response = await linkBraclet({
                mac: data.mac,
                children_id: children_id.toString(),
            })
            if (response.error) {
                if (response.error.errors.mac) {
                    setError("mac", {
                        message: response.error.errors.mac[0]
                    });
                }
            }
        } catch (error) {
            throw error
        }
    }
    const t = useTranslations('Auth.join')

    return (
        <>
            <Button mode="outlined" onClick={() => { openModal('braclet-create-modal') }}>Add Breclet</Button>
            <Modal id="braclet-create-modal" >
                <div
                    className="bg-surface dark:bg-dark-surface rounded-lg p-4 flex flex-col gap-4"
                >
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4 w-full"
                    >
                        {isSubmitSuccessful && (
                            <div className="flex flex-col gap-2 py-4 items-center">
                                <div className="flex items-center gap-2  text-green-700 dark:text-dark-green-400">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span>Braclet linked to Child successfuly</span>
                                </div>
                            </div>
                        )}
                        <Input
                            label="mac"
                            title="Mac Address"
                            placeholder="Enter The Mac Address Of The Braclet"
                            register={register}
                            error={errors.mac?.message}
                        />

                        <Button
                            type="submit"
                            mode="filled"
                            icon={isSubmitting ? <Loader2 className="animate-spin" /> : undefined}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Registering..." : "Register"}
                        </Button>
                    </form>
                </div>
            </Modal>
        </>
    )
}