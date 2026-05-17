import Button from "@/components/Buttons/Button";
import { DashContentAction, DashContenTitle, DashContentPaginationSkeleton, DashContentStatItemSkeleton, DashContentTableSkeleton } from "@/components/DashCrudContent";
import GuardianPagination from "@/components/local/guardian/Guardian/GuardianPagination";
import GuardiansTable from "@/components/local/guardian/Guardian/GuardiansTable";
import GuardianStat from "@/components/local/guardian/Guardian/GuardianStat";
import DashSection from "@/components/Section/Section";
import { getGuardians } from "@/lib/server/actions/gurdians/getGuardians";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

interface PageProps {
    searchParams: Promise<{ page?: string }>
}

export default async function GuardianPage({ searchParams }: PageProps) {
    const page = (await searchParams).page || "1";
    const guardians = await getGuardians(parseInt(page));

    return (
        <DashSection>
            <DashContenTitle>Guardians</DashContenTitle>
            <Suspense fallback={<DashContentStatItemSkeleton />}>
                <GuardianStat />
            </Suspense>
            <DashContentAction>
                <CreateGuardian />
            </DashContentAction>
            <Suspense fallback={<DashContentTableSkeleton />}>
                <GuardiansTable page={page} />
            </Suspense>
            <Suspense fallback={<DashContentPaginationSkeleton />}>
                <GuardianPagination data={guardians} currentPage={parseInt(page)} />
            </Suspense>
        </DashSection>
    )
}

function CreateGuardian() {
    return (
        <Link href="/dashboard/guardians/create">
            <Button mode="filled" icon={<Plus />}>
                Create Guardian
            </Button>
        </Link>
    )
}