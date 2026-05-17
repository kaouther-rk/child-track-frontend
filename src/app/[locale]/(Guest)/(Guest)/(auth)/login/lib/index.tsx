import { getTranslations } from "next-intl/server";
import { AuthCard, AuthTitle } from "../../AuthComponents";
import LoginForm from "./Form";

export default async function LoginIndex() {
    const t = await getTranslations('Auth.login')
    return (
        <AuthCard>
            <AuthTitle title={t('title')} />
            <LoginForm />
            <div
                className="text"
            >

            </div>
        </AuthCard>
    )
}