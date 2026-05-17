import { getTranslations } from "next-intl/server";
import { AuthCard, AuthTitle } from "../../AuthComponents";
import RegisterForm from "./Form";

export default async function RegisterIndex() {
    const t = await getTranslations('Auth.register')
    return (
        <AuthCard>
            <AuthTitle title={t('title')} />
            <RegisterForm />
            <div
                className="text"
            >

            </div>
        </AuthCard>
    )
}