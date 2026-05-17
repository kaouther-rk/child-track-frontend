"use client";

import Button from "@/components/Buttons/Button";
import { Input } from "@/components/Inputs/inputs";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useLocale, useTranslations } from "next-intl";
import { registerFun } from "@/lib/server/join/register";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
const LoginShema = z.object({
    email: z.string().email(),
    key: z.string({ message: "key is required" }),
    password: z.string().min(8, "Password must at list 8 char"),
    confirm_password: z.string().min(8, "Password confirmation must at list 8 char"),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
})

type LoginData = z.infer<typeof LoginShema>
export default function RegisterForm() {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<LoginData>({
        resolver: zodResolver(LoginShema)
    })
    const onSubmit: SubmitHandler<LoginData> = async (data) => {
        try {
            const response = await registerFun({
                data: {
                    email: data.email,
                    password: data.password,
                    key: data.key,
                    password_confirmation: data.confirm_password
                }
            });
            if (response.error) {
                if (response.error.errors.email) {
                    setError("email", {
                        message: response.error.errors.email[0]
                    });
                }
                if (response.error.errors.password) {
                    setError("password", {
                        message: response.error.errors.password[0]
                    });
                }
                if (response.error.errors.password_confirmation) {
                    setError("confirm_password", {
                        message: response.error.errors.password_confirmation[0]
                    });
                }
                if (response.error.errors.key) {
                    setError("key", {
                        message: response.error.errors.key[0]
                    });
                }
            }
        } catch (error) {
            console.error('Register error:', error);
        }
    }
    const t = useTranslations('Auth.register')
    const locale = useLocale()
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full"
        >
            {isSubmitSuccessful && (
                <div className="flex flex-col gap-2 py-4 items-center">
                    <div className="flex items-center gap-2  text-green-700 dark:text-dark-green-400">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Registration successful!</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-on-surface dark:text-dark-on-surface">Login now</span>
                        <Link href={`/${locale}/login`} className="text-primary dark:text-dark-primary hover:underline">
                            Login here
                        </Link>
                    </div>
                </div>
            )}
            <Input
                label="email"
                title={t('email_title')}
                placeholder={t('email_place_holder')}
                type="email"
                register={register}
                error={errors.email?.message}
            />
            <Input
                label="password"
                title={t('password_title')}
                placeholder={t('password_place_holder')}
                type="password"
                register={register}
                error={errors.password?.message}
            />
            <Input
                label="confirm_password"
                title={t('password_confirmation_title')}
                placeholder={t('password_confirmation_place_holder')}
                type="password"
                register={register}
                error={errors.confirm_password?.message}
            />
            <Input
                label="key"
                title={t('key_title')}
                placeholder={t('key_place_holder')}
                register={register}
                error={errors.key?.message}
            />
            <Button
                type="submit"
                mode="filled"
                icon={isSubmitting ? <Loader2 className="animate-spin" /> : undefined}
                disabled={isSubmitting}
            >
                {isSubmitting ? "Registering..." : "Register"}
            </Button>
            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href={`/${locale}/login`} className="text-primary dark:text-dark-primary hover:underline">
                    Login here
                </Link>
            </div>
        </form>
    )
}