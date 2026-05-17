import { getTranslations } from "next-intl/server";
import { AuthCard, AuthTitle } from "../AuthComponents";
import GuardianJoinForm from "./Form";

export default async function GuardianIndex() {
    const t = await getTranslations('Auth.join')
    return (
        <AuthCard>
            <AuthTitle title={t('title')} />
            <GuardianJoinForm />
            <div
                className="text"
            >

            </div>
        </AuthCard>
    )
}