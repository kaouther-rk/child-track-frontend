import { UpBarItem } from "@/components/local/Navs/UpBar/UpBarItem";
import UpBar from "@/components/local/Navs/UpBar/UpBar";
import { getLocale, getTranslations } from "next-intl/server";

export default async function layout({ children }: { children: React.ReactNode }) {
    const locale = await getLocale();
    const t = await getTranslations('HomePage.UpBar')
    return (
        <>
            <UpBar>
                <UpBarItem href={`/${locale}`}>{t('home')}</UpBarItem>
            </UpBar>
            {children}
        </>
    )
}