import Lang from "@/components/local/Navs/Lang";
import Mode from "@/components/local/Navs/Mode";
import UpBar from "@/components/Navigations/NavBar/NavBar";
import NavBarGroup from "@/components/Navigations/NavBar/NavBarGroupd";
import NavBarItem from "@/components/Navigations/NavBar/NavBarItem";
import { getLocale } from "next-intl/server";
import React from "react";

export default async function GuardianPage({ children }: { children: React.ReactNode }) {
    const locale = await getLocale()

    return (
        <>
            <UpBar>
                <NavBarGroup>
                    <NavBarItem link={`/${locale}/guardian`} >Home</NavBarItem>
                    <NavBarItem link={`/${locale}/guardian/children`} >Children</NavBarItem>
                    <NavBarItem link={`/${locale}`} >Leave</NavBarItem>
                    <Mode className="text-on-surface dark:text-dark-on-surface"/>
                    <Lang className="text-on-surface dark:text-dark-on-surface"/>
                </NavBarGroup>
            </UpBar>
            {children}
        </>
    );
}