import Button from "@/components/Buttons/Button";
import { DashContentAction, DashContenTitle, DashContentPaginationSkeleton, DashContentStatItemSkeleton, DashContentTableSkeleton } from "@/components/DashCrudContent";
import AdminPagination from "@/components/local/admin/Admin/AdminPagination";
import AdminsTable from "@/components/local/admin/Admin/AdminsTable";
import AdminStat from "@/components/local/admin/Admin/AdminStat";
import DashSection from "@/components/Section/Section";
import { getAdmins } from "@/lib/server/actions/doctors/getAdmins";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

interface PageProps {
    searchParams: Promise<{ page?: string }>
}

export default async function AdminPage({ searchParams }: PageProps) {
    const page = (await searchParams).page || "1";
    const admins = await getAdmins(parseInt(page));

    return (
        <DashSection>
            <DashContenTitle>Admins</DashContenTitle>
            <Suspense fallback={<DashContentStatItemSkeleton />}>
                <AdminStat />
            </Suspense>
            <DashContentAction>
                <CreateAdmin />
            </DashContentAction>
            <Suspense fallback={<DashContentTableSkeleton />}>
                <AdminsTable page={page} />
            </Suspense>
            <Suspense fallback={<DashContentPaginationSkeleton />}>
                <AdminPagination data={admins} currentPage={parseInt(page)} />
            </Suspense>
        </DashSection>
    )
}

function CreateAdmin() {
    return (
        <Link href="/dashboard/admins/create">
            <Button mode="filled" icon={<Plus />}>
                Create Admin
            </Button>
        </Link>
    )
}