import Button from "@/components/Buttons/Button";
import { DashContentAction, DashContenTitle, DashContentPaginationSkeleton, DashContentStatItemSkeleton, DashContentTableSkeleton } from "@/components/DashCrudContent";
import BracletPagination from "@/components/local/braclet/Braclets/BracletPagination";
import BracletsTable from "@/components/local/braclet/Braclets/BracletsTable";
import BracletStat from "@/components/local/braclet/Braclets/BracletStat";
import DashSection from "@/components/Section/Section";
import { getBraclets } from "@/lib/server/actions/braclets/getBracletss";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

interface PageProps {
    searchParams: Promise<{ page?: string }>
}

export default async function BracletPage({ searchParams }: PageProps) {
    const page = (await searchParams).page || "1";
    const braclets = await getBraclets(parseInt(page));

    return (
        <DashSection>
            <DashContenTitle>Braclets</DashContenTitle>
            <Suspense fallback={<DashContentStatItemSkeleton />}>
                <BracletStat />
            </Suspense>
            <DashContentAction>
                <CreateBraclet />
            </DashContentAction>
            <Suspense fallback={<DashContentTableSkeleton />}>
                <BracletsTable page={page} />
            </Suspense>
            <Suspense fallback={<DashContentPaginationSkeleton />}>
                <BracletPagination data={braclets} currentPage={parseInt(page)} />
            </Suspense>
        </DashSection>
    )
}

function CreateBraclet() {
    return (
        <Link href="/dashboard/braclets/create">
            <Button mode="filled" icon={<Plus />}>
                Create Braclet
            </Button>
        </Link>
    )
}