import Button from "@/components/Buttons/Button";
import { DashContent, DashContentAction, DashContenTitle, DashContentStat, DashContentStatItem, DashContentStatItemSkeleton, DashContentTableSkeleton } from "@/components/DashCrudContent";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Suspense } from "react";
import ChildrensTable from "@/components/local/children/Children/GuardiansTable";
import ChildrensStat from "@/components/local/children/Children/GuardianStat";

export default async function GuardianPage() {
    const locale = await getLocale();
    return (
        <DashContent>
            <DashContenTitle>Children</DashContenTitle>
            <Suspense fallback={<DashContentStatItemSkeleton />}>
                <ChildrensStat />
            </Suspense>
            <DashContentAction>
                <Button mode="filled">
                    <Link href={`/${locale}/guardian/children/create`}>Add Child</Link>
                </Button>
            </DashContentAction>
            <Suspense fallback={<DashContentTableSkeleton />}>
                <ChildrensTable />
            </Suspense>
        </DashContent>
    )
}