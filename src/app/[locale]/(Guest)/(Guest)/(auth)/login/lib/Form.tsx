"use client";

import Button from "@/components/Buttons/Button";
import { Input } from "@/components/Inputs/inputs";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useLocale, useTranslations } from "next-intl";
import { login } from "@/lib/server/join/login";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/server/join/getUser";
import { isAdmin } from "@/lib/server/tools/auth";
const LoginShema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must at list 8 char")
})

type LoginData = z.infer<typeof LoginShema>
export default function LoginForm() {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<LoginData>({
        resolver: zodResolver(LoginShema)
    })
    const route = useRouter();
    const locale = useLocale();
    const onSubmit: SubmitHandler<LoginData> = async (data) => {
        try {
            const response = await login({
                data: {
                    email: data.email,
                    password: data.password
                }
            })
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
            } else {     
                console.log(response.type)           
                if (response.type === 'admin') {
                    route.push(`/${locale}/dashboard`)
                }else{
                    route.push(`/${locale}/guardian`)
                }
            }
        } catch (error) {
            throw error
        }
    }
    const t = useTranslations('Auth.login')
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full"
        >
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
            {
                isSubmitting ? (
                    <Button icon={<Loader2 className="animate-spin" />} disabled type="submit" mode="filled">
                        {t('submit')}
                    </Button>
                ) : (
                    <Button type="submit" mode="filled">
                        {t('submit')}
                    </Button>
                )

            }

        </form>
    )
}