"use client";

import { useLocale, useTranslations } from "use-intl";
import { UpBarItem } from "./UpBarItem";
import { useState } from "react";
import { logout } from "@/lib/server/join/logout";

export default function Logout() {
    const [logingout , setloginout] = useState(false);
    const locale = useLocale();
    const handleLogout = async() => {
        setloginout(true);
        await logout();
        
        window.location.href = `/${locale}/`;
    };
    const t = useTranslations('HomePage.UpBar');
    return (
        <UpBarItem mode="button" onClick={handleLogout} className={`${logingout && 'animate-pulse '}text-on-secondary dark:text-dark-on-secondary`}>{t('logout')}</UpBarItem>

    );
}